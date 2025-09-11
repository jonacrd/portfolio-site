# 📸 Instrucciones para Agregar tu Imagen de Perfil

## ✅ Cambios Realizados

He actualizado el portfolio para usar tu imagen de perfil `jonadevel.jpg` en:

1. **Página Principal** (`/`) - Avatar en el hero section
2. **Página Sobre Mí** (`/sobre-mi`) - Imagen de perfil principal

## 🔧 Cómo Agregar tu Imagen Real

### Paso 1: Coloca tu imagen
1. Copia tu archivo `jonadevel.jpg` a la carpeta:
   ```
   apps/portfolio-site/public/jonadevel.jpg
   ```

### Paso 2: Verifica el formato
- **Formato recomendado**: JPG o PNG
- **Tamaño recomendado**: 400x400 píxeles (cuadrada)
- **Peso recomendado**: Menos de 500KB para mejor rendimiento

### Paso 3: Fallback incluido
Si la imagen no se carga, automáticamente se mostrará:
- Las iniciales "JG" en un círculo con gradiente
- Esto asegura que el diseño siempre se vea bien

## 🎨 Características de la Imagen

### En la Página Principal
- **Tamaño**: 160x160 píxeles (w-40 h-40)
- **Forma**: Círculo perfecto
- **Efectos**: 
  - Borde con gradiente animado
  - Efecto de pulso (pulse-glow)
  - Elementos orbitales animados

### En la Página Sobre Mí
- **Tamaño**: 320x320 píxeles (w-80 h-80)
- **Forma**: Círculo perfecto
- **Efectos**:
  - Borde con gradiente animado
  - Efecto de pulso (pulse-glow)
  - Elementos flotantes animados

## 🚀 Resultado

Una vez que agregues tu imagen real, verás:
- Tu foto de perfil profesional en ambas páginas
- Animaciones suaves y efectos modernos
- Diseño responsive que se adapta a todos los dispositivos
- Fallback automático si hay problemas con la imagen

## 📝 Nota Técnica

El código incluye un `onerror` handler que:
1. Oculta la imagen si no se puede cargar
2. Muestra automáticamente las iniciales "JG" como fallback
3. Mantiene el diseño intacto en cualquier situación

¡Tu portfolio ya está listo para mostrar tu imagen profesional! 🎉





