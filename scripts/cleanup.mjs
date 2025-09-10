#!/usr/bin/env node

import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const trashDir = path.join(projectRoot, '_trash');

// File patterns to clean up
const CLEANUP_PATTERNS = {
  // Binary files that shouldn't be in src/
  heavyBinaries: ['.psd', '.ai', '.zip', '.rar', '.7z', '.mp4', '.mov', '.webm'],
  // Temporary files
  tempFiles: ['.log', '.tmp', '.map'],
  // System files
  systemFiles: ['Thumbs.db', '.DS_Store'],
  // Build directories (only if not in .gitignore)
  buildDirs: ['dist', '.astro']
};

// Size limit for images in src/ (1.5MB in bytes)
const MAX_IMAGE_SIZE_IN_SRC = 1.5 * 1024 * 1024;

let movedFiles = [];
let duplicates = [];
let errors = [];

/**
 * Ensure trash directory exists
 */
async function ensureTrashDir() {
  try {
    await fs.access(trashDir);
  } catch {
    await fs.mkdir(trashDir, { recursive: true });
    console.log(`📁 Created trash directory: ${trashDir}`);
  }
}

/**
 * Generate unique filename if file already exists in trash
 */
async function getUniqueTrashPath(originalPath) {
  const relativePath = path.relative(projectRoot, originalPath);
  let trashPath = path.join(trashDir, relativePath);
  
  // Ensure directory structure exists in trash
  const trashFileDir = path.dirname(trashPath);
  await fs.mkdir(trashFileDir, { recursive: true });
  
  let counter = 1;
  let uniquePath = trashPath;
  
  while (true) {
    try {
      await fs.access(uniquePath);
      // File exists, try with counter
      const ext = path.extname(trashPath);
      const name = path.basename(trashPath, ext);
      const dir = path.dirname(trashPath);
      uniquePath = path.join(dir, `${name}-${counter}${ext}`);
      counter++;
    } catch {
      // File doesn't exist, we can use this path
      break;
    }
  }
  
  return uniquePath;
}

/**
 * Move file to trash safely
 */
async function moveToTrash(filePath, reason) {
  try {
    const trashPath = await getUniqueTrashPath(filePath);
    await fs.rename(filePath, trashPath);
    
    const relativePath = path.relative(projectRoot, filePath);
    const relativeTrashPath = path.relative(projectRoot, trashPath);
    
    movedFiles.push({
      original: relativePath,
      trash: relativeTrashPath,
      reason
    });
    
    console.log(`🗑️  Moved: ${relativePath} → ${relativeTrashPath} (${reason})`);
    return true;
  } catch (error) {
    errors.push({
      file: path.relative(projectRoot, filePath),
      error: error.message
    });
    console.error(`❌ Error moving ${filePath}: ${error.message}`);
    return false;
  }
}

/**
 * Check if file should be cleaned up based on extension
 */
function shouldCleanByExtension(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (CLEANUP_PATTERNS.heavyBinaries.includes(ext)) {
    return 'Heavy binary file';
  }
  
  if (CLEANUP_PATTERNS.tempFiles.includes(ext)) {
    return 'Temporary file';
  }
  
  return null;
}

/**
 * Check if file should be cleaned up based on name
 */
function shouldCleanByName(filePath) {
  const fileName = path.basename(filePath);
  
  if (CLEANUP_PATTERNS.systemFiles.includes(fileName)) {
    return 'System file';
  }
  
  return null;
}

/**
 * Check if large image in src/ should be moved to public/
 */
async function shouldMoveImage(filePath) {
  if (!filePath.includes(path.join('src', 'assets')) && !filePath.includes(path.join('src', 'images'))) {
    return null;
  }
  
  const ext = path.extname(filePath).toLowerCase();
  const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
  
  if (!imageExts.includes(ext)) {
    return null;
  }
  
  try {
    const stats = await fs.stat(filePath);
    if (stats.size > MAX_IMAGE_SIZE_IN_SRC) {
      return `Large image in src/ (${(stats.size / 1024 / 1024).toFixed(1)}MB)`;
    }
  } catch {
    // Ignore stat errors
  }
  
  return null;
}

/**
 * Recursively scan directory for files to clean
 */
async function scanDirectory(dirPath, skipDirs = []) {
  try {
    const entries = await fs.readdir(dirPath, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = path.join(dirPath, entry.name);
      
      if (entry.isDirectory()) {
        // Skip certain directories
        if (skipDirs.includes(entry.name) || entry.name.startsWith('.git')) {
          continue;
        }
        
        // Check if it's a build directory that should be moved
        if (CLEANUP_PATTERNS.buildDirs.includes(entry.name)) {
          // Only move if not already in .gitignore
          const gitignorePath = path.join(projectRoot, '.gitignore');
          try {
            const gitignoreContent = await fs.readFile(gitignorePath, 'utf-8');
            if (!gitignoreContent.includes(entry.name)) {
              await moveToTrash(fullPath, `Build directory not in .gitignore`);
              continue;
            }
          } catch {
            // .gitignore doesn't exist, move the directory
            await moveToTrash(fullPath, `Build directory`);
            continue;
          }
        }
        
        // Recurse into directory
        await scanDirectory(fullPath, skipDirs);
      } else if (entry.isFile()) {
        // Check various cleanup criteria
        let reason = shouldCleanByExtension(fullPath) || 
                    shouldCleanByName(fullPath) || 
                    await shouldMoveImage(fullPath);
        
        if (reason) {
          await moveToTrash(fullPath, reason);
        }
      }
    }
  } catch (error) {
    console.error(`❌ Error scanning ${dirPath}: ${error.message}`);
  }
}

/**
 * Find and handle duplicate files in public/images/
 */
async function findDuplicates() {
  const imagesDir = path.join(projectRoot, 'public', 'images');
  
  try {
    await fs.access(imagesDir);
  } catch {
    return; // Images directory doesn't exist
  }
  
  const fileHashes = new Map();
  
  async function scanForDuplicates(dir) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true });
      
      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name);
        
        if (entry.isDirectory()) {
          await scanForDuplicates(fullPath);
        } else if (entry.isFile()) {
          // Simple duplicate detection by name and size
          const stats = await fs.stat(fullPath);
          const key = `${entry.name}-${stats.size}`;
          
          if (fileHashes.has(key)) {
            // Found duplicate
            const original = fileHashes.get(key);
            duplicates.push({
              original: path.relative(projectRoot, original),
              duplicate: path.relative(projectRoot, fullPath)
            });
            await moveToTrash(fullPath, 'Duplicate file');
          } else {
            fileHashes.set(key, fullPath);
          }
        }
      }
    } catch (error) {
      console.error(`❌ Error scanning for duplicates in ${dir}: ${error.message}`);
    }
  }
  
  await scanForDuplicates(imagesDir);
}

/**
 * Generate cleanup report
 */
async function generateReport() {
  const reportPath = path.join(projectRoot, 'docs', 'cleanup-report.md');
  const timestamp = new Date().toISOString();
  
  let report = `# Cleanup Report
  
Generated: ${timestamp}

## Summary

- **Files moved to trash**: ${movedFiles.length}
- **Duplicates found**: ${duplicates.length}
- **Errors encountered**: ${errors.length}

## Files Moved to Trash

${movedFiles.length > 0 ? movedFiles.map(f => 
  `- \`${f.original}\` → \`${f.trash}\` _(${f.reason})_`
).join('\n') : '_No files were moved._'}

## Duplicates Removed

${duplicates.length > 0 ? duplicates.map(d => 
  `- \`${d.duplicate}\` _(duplicate of ${d.original})_`
).join('\n') : '_No duplicates found._'}

## Errors

${errors.length > 0 ? errors.map(e => 
  `- \`${e.file}\`: ${e.error}`
).join('\n') : '_No errors occurred._'}

## How to Revert

To restore files from trash:

\`\`\`bash
# Restore individual file
move "_trash/path/to/file" "original/path/to/file"

# Restore all files (PowerShell)
Get-ChildItem -Path "_trash" -Recurse -File | ForEach-Object {
    $relativePath = $_.FullName.Substring((Resolve-Path "_trash").Path.Length + 1)
    $targetPath = Join-Path "." $relativePath
    $targetDir = Split-Path $targetPath -Parent
    if (!(Test-Path $targetDir)) { New-Item -ItemType Directory -Path $targetDir -Force }
    Move-Item $_.FullName $targetPath
}
\`\`\`

## How to Execute

\`\`\`bash
node scripts/cleanup.mjs
\`\`\`

This script is idempotent - running it multiple times won't cause issues.
`;

  try {
    await fs.writeFile(reportPath, report, 'utf-8');
    console.log(`📄 Report generated: ${path.relative(projectRoot, reportPath)}`);
  } catch (error) {
    console.error(`❌ Error generating report: ${error.message}`);
  }
}

/**
 * Update .gitignore if needed
 */
async function updateGitignore() {
  const gitignorePath = path.join(projectRoot, '.gitignore');
  const requiredEntries = [
    'node_modules/',
    'dist/',
    '.astro/',
    '.env',
    '.env.*',
    '.vercel/',
    '.netlify/',
    '_trash/',
    '*.log',
    'Thumbs.db',
    '.DS_Store'
  ];
  
  let currentContent = '';
  try {
    currentContent = await fs.readFile(gitignorePath, 'utf-8');
  } catch {
    // .gitignore doesn't exist, create it
  }
  
  const missingEntries = requiredEntries.filter(entry => 
    !currentContent.includes(entry)
  );
  
  if (missingEntries.length > 0) {
    const newContent = currentContent + '\n\n# Added by cleanup script\n' + 
                      missingEntries.join('\n') + '\n';
    
    await fs.writeFile(gitignorePath, newContent, 'utf-8');
    console.log(`📝 Updated .gitignore with ${missingEntries.length} entries`);
  }
}

/**
 * Main cleanup function
 */
async function cleanup() {
  console.log('🧹 Starting cleanup process...\n');
  
  try {
    // Ensure trash directory exists
    await ensureTrashDir();
    
    // Update .gitignore
    await updateGitignore();
    
    // Scan for files to clean, skip node_modules and .git
    await scanDirectory(projectRoot, ['node_modules', '.git', '_trash', 'scripts']);
    
    // Find and remove duplicates
    await findDuplicates();
    
    // Generate report
    await generateReport();
    
    console.log('\n✅ Cleanup completed!');
    console.log(`📊 Summary: ${movedFiles.length} files moved, ${duplicates.length} duplicates removed, ${errors.length} errors`);
    
    if (movedFiles.length > 0) {
      console.log('📄 Check docs/cleanup-report.md for details');
    }
    
  } catch (error) {
    console.error('❌ Cleanup failed:', error.message);
    process.exit(1);
  }
}

// Run cleanup if script is executed directly
if (process.argv[1] === __filename) {
  cleanup();
}
