# Demo de Restaurante - La Nave del Sabor

## 📋 **Descripción General**

Demo de una carta digital interactiva para restaurante con filtros por categoría, modal de detalles accesible y funcionalidades JavaScript avanzadas.

## 🎯 **Características Principales**

### **Secciones**
- **Hero Section**: Diseño atractivo con gradiente y patrón de fondo
- **Carta Digital**: Grid responsive de platos con filtros
- **Modal Accesible**: Detalles completos de cada plato

### **Funcionalidades JavaScript**
- ✅ **Filtro por Categorías**: Todos, Entradas, Platos, Bebidas, Postres
- ✅ **Modal Interactivo**: Apertura/cierre con teclado (Escape)
- ✅ **Focus Trap**: Navegación accesible por teclado
- ✅ **Animaciones**: Transiciones suaves y efectos hover
- ✅ **Responsive**: Diseño adaptativo para todos los dispositivos

## 🏗️ **Estructura del Proyecto**

### **Archivos Creados**
```
src/
├── data/
│   └── menu.json              # Datos de 20 platos
├── pages/
│   └── demos/
│       └── restaurante.astro  # Página principal
public/
└── demos/
    └── restaurante/
        ├── README.md          # Instrucciones de imágenes
        └── *.webp            # 20 imágenes de platos
```

### **Datos del Menú**
- **20 platos** organizados en 4 categorías
- **Estructura JSON** con id, nombre, categoría, precio, imagen y descripción
- **Precios en euros** con formato decimal
- **Imágenes optimizadas** en formato WebP

## 🎨 **Diseño y UX**

### **Paleta de Colores**
- **Primario**: Ámbar/Oro (`amber-500`, `amber-600`)
- **Secundario**: Naranja/Rojo (`orange-800`, `red-900`)
- **Fondo**: Gris oscuro (`gray-900`, `gray-800`)
- **Texto**: Blanco y gris claro

### **Componentes Visuales**
- **Cards de Platos**: Hover effects y transformaciones
- **Botones de Filtro**: Estados activo/inactivo
- **Modal**: Overlay con backdrop blur
- **Notificaciones**: Toast messages para acciones

## ♿ **Accesibilidad**

### **Características Implementadas**
- **ARIA Labels**: Descripción de elementos interactivos
- **Focus Management**: Navegación por teclado completa
- **Focus Trap**: Modal con trap de foco
- **Keyboard Navigation**: Enter, Escape, Tab
- **Screen Reader**: Roles y atributos semánticos
- **Contraste**: Colores con ratio WCAG AA

### **Navegación por Teclado**
- **Tab**: Navegar entre elementos
- **Enter/Space**: Activar botones y cards
- **Escape**: Cerrar modal
- **Shift+Tab**: Navegación inversa

## 🔧 **Funcionalidades JavaScript**

### **Sistema de Filtros**
```javascript
function filterPlatos(categoria) {
  // Filtra platos por categoría
  // Actualiza visibilidad de cards
  // Aplica animaciones
}
```

### **Gestión del Modal**
```javascript
function openModal(platoId) {
  // Carga datos del plato
  // Configura focus trap
  // Previene scroll del body
}

function closeModal() {
  // Restaura scroll
  // Enfoca elemento anterior
  // Limpia estado
}
```

### **Focus Trap**
```javascript
function setupModalFocusTrap() {
  // Identifica elementos focusables
  // Configura navegación circular
  // Maneja Tab y Shift+Tab
}
```

## 📱 **Responsive Design**

### **Breakpoints**
- **Mobile**: < 768px (1 columna)
- **Tablet**: 768px - 1024px (2 columnas)
- **Desktop**: > 1024px (3 columnas)

### **Adaptaciones**
- **Grid Responsive**: Columnas adaptativas
- **Modal Mobile**: Scroll interno
- **Botones Touch**: Tamaños optimizados
- **Imágenes**: Lazy loading y dimensiones fijas

## 🖼️ **Optimización de Imágenes**

### **Especificaciones**
- **Formato**: WebP (mejor compresión)
- **Dimensiones**: 400x300px (aspect ratio 4:3)
- **Lazy Loading**: Carga bajo demanda
- **Alt Text**: Descripciones accesibles

### **Lista de Imágenes Requeridas**
1. **Entradas** (4): ensalada-cesar, carpaccio-res, sopa-mariscos, bruschetta
2. **Platos** (6): filete-res, pasta-carbonara, salmon-plancha, pollo-marsala, paella-valenciana, risotto-champinones
3. **Bebidas** (4): limonada-natural, vino-tinto, cerveza-artesanal, cafe-espresso
4. **Postres** (6): tiramisu, creme-brulee, chocolate-lava, cheesecake-frutos, flan-casero, helado-artesanal

## 🚀 **Cómo Usar**

### **1. Visitar la Página**
```
/demos/restaurante
```

### **2. Navegar por Categorías**
- Hacer clic en botones de filtro
- Ver animaciones de transición
- Explorar diferentes categorías

### **3. Ver Detalles**
- Hacer clic en cualquier plato
- Modal se abre con información completa
- Usar Escape para cerrar

### **4. Interactuar**
- Probar navegación por teclado
- Verificar focus trap en modal
- Comprobar responsividad

## 🔍 **Características Técnicas**

### **Performance**
- **Lazy Loading**: Imágenes cargan bajo demanda
- **CSS Optimizado**: Clases utilitarias de Tailwind
- **JavaScript Eficiente**: Event delegation y optimizaciones
- **Build Optimizado**: Código minificado y comprimido

### **SEO**
- **Meta Tags**: Title y description optimizados
- **Semantic HTML**: Estructura semántica correcta
- **Sitemap**: Incluido en sitemap.xml
- **Alt Text**: Imágenes con descripciones

### **Mantenibilidad**
- **Código Modular**: Funciones separadas y reutilizables
- **Comentarios**: Documentación inline
- **Estructura Clara**: Organización lógica de archivos
- **Configuración**: Datos separados del código

## 🎯 **Casos de Uso**

### **Para Restaurantes**
- **Carta Digital**: Reemplazar menús físicos
- **Actualizaciones**: Cambiar precios y platos fácilmente
- **Experiencia**: Mejorar UX de clientes
- **Accesibilidad**: Incluir a usuarios con discapacidades

### **Para Desarrolladores**
- **Portfolio**: Demostrar habilidades técnicas
- **Template**: Base para proyectos similares
- **Aprendizaje**: Ejemplo de buenas prácticas
- **Referencia**: Patrones de accesibilidad

## 🔮 **Próximas Mejoras**

### **Funcionalidades Adicionales**
- [ ] **Carrito de Compras**: Sistema completo de pedidos
- [ ] **Reservas**: Sistema de reservas online
- [ ] **Búsqueda**: Filtro por texto y precio
- [ ] **Favoritos**: Guardar platos favoritos
- [ ] **Reviews**: Sistema de valoraciones
- [ ] **PWA**: Instalación como app

### **Optimizaciones**
- [ ] **Cache**: Implementar service worker
- [ ] **Analytics**: Tracking de interacciones
- [ ] **A/B Testing**: Variantes de diseño
- [ ] **Performance**: Métricas de Core Web Vitals

## 📞 **Soporte**

Para preguntas o mejoras sobre este demo:
- **Documentación**: Revisar este archivo
- **Código**: Comentar en el repositorio
- **Issues**: Reportar bugs o sugerencias

---

**Demo creado con ❤️ usando Astro, Tailwind CSS y JavaScript vanilla**





