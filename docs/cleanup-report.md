# Cleanup Report
  
Generated: 2025-09-10T22:17:28.321Z

## Summary

- **Files moved to trash**: 2
- **Duplicates found**: 2
- **Errors encountered**: 0

## Files Moved to Trash

- `public\images\projects\portfolio-web\.gitkeep` → `_trash\public\images\projects\portfolio-web\.gitkeep` _(Duplicate file)_
- `public\images\projects\tienda-online\.gitkeep` → `_trash\public\images\projects\tienda-online\.gitkeep` _(Duplicate file)_

## Duplicates Removed

- `public\images\projects\portfolio-web\.gitkeep` _(duplicate of public\images\projects\landing-barberia\.gitkeep)_
- `public\images\projects\tienda-online\.gitkeep` _(duplicate of public\images\projects\landing-barberia\.gitkeep)_

## Errors

_No errors occurred._

## How to Revert

To restore files from trash:

```bash
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
```

## How to Execute

```bash
node scripts/cleanup.mjs
```

This script is idempotent - running it multiple times won't cause issues.
