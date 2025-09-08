# 📁 Sistema de Proyectos - Guía de Uso

## 🎯 Descripción General

El sistema de proyectos permite gestionar una galería navegable de proyectos con páginas de detalle que incluyen pestañas para Demo, Capturas y Código. Utiliza Astro Content Collections para una gestión eficiente del contenido.

## 📂 Estructura de Archivos

```
src/
├── content/
│   ├── config.ts                    # Configuración de Content Collections
│   └── projects/                    # Archivos de proyectos
│       ├── ejemplo-1.md
│       └── ejemplo-2.md
├── pages/
│   └── proyectos/
│       ├── index.astro              # Listado de proyectos
│       └── [slug].astro             # Página de detalle
└── components/
    └── CodeViewer.astro             # Visor de código
```

## 🚀 Rutas Generadas

- `/proyectos` - Listado de todos los proyectos
- `/proyectos/[slug]` - Página de detalle de un proyecto específico

## 📝 Cómo Agregar un Proyecto

### 1. Crear el Archivo

Crea un nuevo archivo `.md` en `src/content/projects/` con el nombre del proyecto (usar kebab-case):

```bash
src/content/projects/mi-nuevo-proyecto.md
```

### 2. Front-matter (Metadatos)

Cada proyecto debe incluir el siguiente front-matter:

```yaml
---
title: "Nombre del Proyecto"
summary: "Descripción breve del proyecto (máximo 160 caracteres)"
stack: ["React", "Node.js", "MongoDB"]
demoUrl: "https://demo.example.com"  # Opcional
repoUrl: "https://github.com/owner/repo"
codeFiles: [                         # Opcional
  "src/App.jsx",
  "src/components/Header.jsx"
]
cover: "/images/proyecto-cover.jpg"  # Opcional
images: [                            # Opcional
  "/images/screenshot-1.jpg",
  "/images/screenshot-2.jpg"
]
featured: true                       # Opcional, default: false
order: 100                          # Opcional, default: 0
publishedAt: 2024-01-15             # Opcional
tags: ["react", "fullstack"]        # Opcional
---
```

### 3. Contenido del Proyecto

Después del front-matter, escribe el contenido en Markdown:

```markdown
## Descripción del Proyecto

Aquí puedes describir tu proyecto en detalle...

## Características Principales

- Característica 1
- Característica 2

## Tecnologías Utilizadas

- **Frontend**: React, Tailwind CSS
- **Backend**: Node.js, Express
```

## 🔧 Configuración de codeFiles

### ¿Qué archivos incluir?

Incluye los archivos más importantes y representativos de tu proyecto:

```yaml
codeFiles: [
  "src/App.jsx",                    # Componente principal
  "src/components/Header.jsx",      # Componentes clave
  "src/services/api.js",            # Lógica de negocio
  "package.json",                   # Dependencias
  "README.md"                       # Documentación
]
```

### Mejores Prácticas

1. **Máximo 5-7 archivos** para no sobrecargar la interfaz
2. **Incluye archivos representativos** de diferentes partes del proyecto
3. **Evita archivos muy largos** (>500 líneas)
4. **Incluye archivos de configuración** importantes (package.json, etc.)

### Ejemplos por Tipo de Proyecto

#### React/Vue App
```yaml
codeFiles: [
  "src/App.jsx",
  "src/components/ProductCard.jsx",
  "src/hooks/useProducts.js",
  "src/services/api.js",
  "package.json"
]
```

#### Full-stack App
```yaml
codeFiles: [
  "client/src/App.jsx",
  "client/src/components/Dashboard.jsx",
  "server/routes/products.js",
  "server/models/Product.js",
  "package.json"
]
```

#### Static Site
```yaml
codeFiles: [
  "index.html",
  "styles/main.css",
  "scripts/app.js",
  "config.json"
]
```

## 🌿 Cambiar Branch

Para cambiar la rama de GitHub (por defecto es "main"):

### Opción 1: En el Front-matter
```yaml
---
# ... otros campos
branch: "develop"  # Si quieres especificar una rama específica
---
```

### Opción 2: Modificar el Componente

Edita `src/components/CodeViewer.astro` y cambia el valor por defecto:

```typescript
const { repoUrl, files, branch = "develop" } = Astro.props; // Cambiar "main" por "develop"
```

## 🎨 Personalización de Estilos

### Clases CSS Disponibles

El sistema utiliza las clases CSS ya existentes en el proyecto:

- `.card` - Para tarjetas de proyecto
- `.btn` - Para botones
- `.pill` - Para badges de tecnologías
- `.reveal` - Para animaciones de entrada

### Agregar Estilos Personalizados

Si necesitas estilos específicos, agrégalos en el componente correspondiente:

```astro
<style>
  .mi-clase-personalizada {
    /* Estilos específicos */
  }
</style>
```

## 📱 Responsive Design

El sistema está optimizado para todos los dispositivos:

- **Desktop**: Grid de 3 columnas
- **Tablet**: Grid de 2 columnas  
- **Mobile**: Grid de 1 columna

## 🔗 Enlaces Externos

### GitHub
- **Abrir en GitHub**: Enlace directo al repositorio
- **Abrir en StackBlitz**: Para edición online
- **Ver como VSCode**: Interfaz similar a VSCode

### URLs Generadas Automáticamente

```javascript
// Para repo: https://github.com/owner/repo
const urls = {
  github: "https://github.com/owner/repo",
  stackblitz: "https://stackblitz.com/github/owner/repo",
  vscode: "https://github1s.com/owner/repo",
  raw: "https://raw.githubusercontent.com/owner/repo/main/file.js"
};
```

## 🚨 Solución de Problemas

### Error: "Collection not found"
- Verifica que `src/content/config.ts` esté configurado correctamente
- Asegúrate de que el archivo esté en `src/content/projects/`

### Error: "Invalid GitHub URL"
- Verifica que `repoUrl` tenga el formato: `https://github.com/owner/repo`
- No incluyas `.git` al final de la URL

### Archivos de código no cargan
- Verifica que los archivos existan en el repositorio
- Asegúrate de que la rama especificada sea correcta
- Verifica que los archivos no sean muy grandes (>1MB)

### Imágenes no se muestran
- Verifica que las rutas de las imágenes sean correctas
- Asegúrate de que las imágenes estén en la carpeta `public/`
- Usa rutas absolutas desde la raíz: `/images/proyecto.jpg`

## 📊 Ordenamiento de Proyectos

Los proyectos se ordenan por el campo `order` (descendente):

```yaml
---
order: 100  # Aparece primero
---

---
order: 50   # Aparece segundo
---

---
order: 0    # Aparece último (valor por defecto)
---
```

## 🏷️ Etiquetas y Filtros

### Usar Tags
```yaml
---
tags: ["react", "fullstack", "ecommerce", "pwa"]
---
```

### Proyectos Destacados
```yaml
---
featured: true  # Aparece con badge "Destacado"
---
```

## 🔄 Comandos para Ejecutar

```bash
# Desarrollo
npm run dev

# Build
npm run build

# Preview
npm run preview
```

## 📈 Próximas Mejoras

- [ ] Filtros por tecnología
- [ ] Búsqueda de proyectos
- [ ] Paginación para muchos proyectos
- [ ] Integración con más plataformas de código
- [ ] Estadísticas de visualización

---

**Nota**: Este sistema está diseñado para ser extensible y fácil de mantener. Si necesitas funcionalidades adicionales, consulta la documentación de Astro Content Collections.

