# Guía de Proyectos

Esta guía explica cómo agregar y gestionar proyectos en el portfolio usando Astro Content Collections.

## Estructura de Archivos

```
src/content/projects/       # Archivos .md de proyectos
public/images/projects/     # Imágenes organizadas por proyecto
  ├── proyecto-1/
  │   ├── cover.jpg        # Imagen principal
  │   ├── 1.jpg           # Capturas de pantalla
  │   └── 2.jpg
  └── proyecto-2/
      └── ...
```

## Crear un Nuevo Proyecto

### 1. Crear el archivo Markdown

Crea un archivo `.md` en `src/content/projects/` con el siguiente front-matter:

```yaml
---
title: "Nombre del Proyecto"
summary: "Descripción breve y atractiva del proyecto"
stack: ["Astro", "React", "Tailwind CSS"]  # Tecnologías utilizadas
demoUrl: "https://mi-proyecto.vercel.app/"  # URL del demo (opcional)
repoUrl: "https://github.com/usuario/repo"  # URL del repositorio
branch: "main"                              # Rama principal (opcional, default: "main")
codeFiles: [                               # Archivos de código a mostrar (máximo 3-5)
  "README.md",
  "src/pages/index.astro",
  "src/components/Hero.tsx"
]
cover: "/images/projects/mi-proyecto/cover.jpg"  # Imagen principal (opcional)
images: [                                        # Capturas de pantalla (opcional)
  "/images/projects/mi-proyecto/1.jpg",
  "/images/projects/mi-proyecto/2.jpg"
]
featured: true          # Si aparece como destacado
order: 100             # Orden de aparición (mayor = primero)
publishedAt: 2024-01-15  # Fecha de publicación (opcional)
tags: ["Web App", "E-commerce"]  # Etiquetas (opcional)
---

# Contenido del Proyecto

Aquí puedes escribir una descripción detallada del proyecto en Markdown.

## Características

- Lista de características
- Funcionalidades principales
- Tecnologías utilizadas

## Resultados

Métricas, feedback de clientes, etc.
```

### 2. Agregar Imágenes

1. Crea una carpeta en `public/images/projects/nombre-del-proyecto/`
2. Agrega las imágenes:
   - `cover.jpg`: Imagen principal del proyecto (recomendado: 800x450px)
   - `1.jpg`, `2.jpg`, etc.: Capturas de pantalla (recomendado: 1200x800px)

### 3. Configurar Archivos de Código

En `codeFiles`, especifica los archivos más importantes del proyecto:

```yaml
codeFiles: [
  "README.md",                    # Documentación
  "src/pages/index.astro",        # Página principal
  "src/components/Component.tsx", # Componente clave
  "src/styles/globals.css",       # Estilos
  "package.json"                  # Dependencias
]
```

**Recomendaciones:**
- Máximo 3-5 archivos para no abrumar
- Incluye siempre el README.md
- Prioriza archivos que muestren tu código mejor
- Evita archivos muy largos o generados automáticamente

## Configuración Avanzada

### Cambiar la Rama de GitHub

Por defecto se usa la rama `main`. Para usar otra rama:

```yaml
branch: "develop"  # o "master", "production", etc.
```

### Proyectos Destacados

Los proyectos con `featured: true` aparecen con una etiqueta especial y pueden tener prioridad visual.

### Ordenamiento

Los proyectos se ordenan por `order` (descendente). Valores sugeridos:
- 100+: Proyectos principales/comerciales
- 50-99: Proyectos personales importantes
- 1-49: Proyectos de práctica o experimentales

## URLs y Enlaces Externos

### Demo URL
- Debe ser una URL completa y funcional
- Si no tienes demo, omite este campo o déjalo vacío
- Se mostrará un iframe en la pestaña "Demo"

### Repo URL
- URL completa del repositorio en GitHub
- Se usa para generar enlaces a StackBlitz y VSCode Online
- También para obtener el código fuente de los archivos especificados

## Ejemplos de Proyectos

Revisa los proyectos de ejemplo en `src/content/projects/` para ver la estructura completa.

## Troubleshooting

### El proyecto no aparece
1. Verifica que el archivo esté en `src/content/projects/`
2. Comprueba que el front-matter tenga la sintaxis correcta
3. Ejecuta `npx astro check` para ver errores de validación

### Las imágenes no se muestran
1. Verifica que las rutas sean correctas (empiezan con `/`)
2. Asegúrate de que las imágenes estén en `public/images/projects/`
3. Comprueba los nombres de archivo (case-sensitive)

### El código no se carga
1. Verifica que `repoUrl` apunte a un repositorio público
2. Comprueba que los archivos en `codeFiles` existan en el repositorio
3. Asegúrate de que la rama especificada existe

## Comandos Útiles

```bash
# Verificar la configuración
npx astro check

# Desarrollo local
npm run dev

# Build para producción
npm run build

# Limpiar archivos innecesarios
node scripts/cleanup.mjs
```
