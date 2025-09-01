# Demo de Formularios - Validación y Estados

## 📋 **Descripción General**

Demo de formularios interactivos con validación nativa HTML5, estados de carga dinámicos y accesibilidad completa. Incluye ejemplos de formularios de reserva y pedido con envío a Google Apps Script.

## 🎯 **Características Principales**

### **Formularios Incluidos**
- **Formulario de Reserva**: Nombre, email, fecha, hora, personas, comentario
- **Formulario de Pedido**: Nombre, email, producto, cantidad, comentario

### **Funcionalidades JavaScript**
- ✅ **Validación Nativa**: HTML5 validation con mensajes personalizados
- ✅ **Estados Dinámicos**: Loading, success, error con feedback visual
- ✅ **Envío Seguro**: Integración con Google Apps Script
- ✅ **Accesibilidad**: Roles ARIA y navegación por teclado
- ✅ **Responsive**: Diseño adaptativo para todos los dispositivos

## 🏗️ **Estructura del Proyecto**

### **Archivos Creados**
```
src/
└── pages/
    └── demos/
        └── forms.astro          # Página principal
```

### **Configuración Requerida**
- **Variable de Entorno**: `PUBLIC_WEB_APP_URL` para Google Apps Script
- **Google Apps Script**: Endpoint para procesar formularios

## 🎨 **Diseño y UX**

### **Paleta de Colores**
- **Primario**: Azul (`blue-500`, `blue-600`)
- **Secundario**: Verde (`green-500`, `green-600`)
- **Fondo**: Gris oscuro (`gray-900`, `gray-800`)
- **Texto**: Blanco y gris claro

### **Componentes Visuales**
- **Formularios**: Cards con bordes y hover effects
- **Botones**: Estados loading con spinner animado
- **Validación**: Bordes de color según estado (rojo/verde)
- **Mensajes**: Estados de éxito y error con colores

## ♿ **Accesibilidad**

### **Características Implementadas**
- **ARIA Labels**: Descripción de elementos interactivos
- **ARIA Describedby**: Mensajes de error vinculados
- **ARIA Live**: Mensajes de estado dinámicos
- **Roles**: `status` para éxito, `alert` para errores
- **Navegación**: Focus management y keyboard navigation
- **Contraste**: Colores con ratio WCAG AA

### **Atributos ARIA**
```html
<!-- Mensajes de error -->
<div role="alert" aria-live="polite">Error message</div>

<!-- Estados de formulario -->
<div role="status" aria-live="polite">Success message</div>

<!-- Campos con errores -->
<input aria-describedby="field-error" />
<div id="field-error" role="alert">Error message</div>
```

## 🔧 **Funcionalidades JavaScript**

### **Validación Nativa**
```javascript
function validateForm(form, type) {
  const inputs = form.querySelectorAll('input[required], select[required]');
  let isValid = true;

  inputs.forEach(input => {
    if (!input.checkValidity()) {
      isValid = false;
      showFieldError(input, type);
    }
  });

  return isValid;
}
```

### **Estados de Formulario**
```javascript
function setFormState(state, config) {
  switch (state) {
    case 'loading':
      // Mostrar spinner, deshabilitar botón
      break;
    case 'success':
      // Mostrar mensaje de éxito, resetear formulario
      break;
    case 'error':
      // Mostrar mensaje de error, habilitar reintento
      break;
  }
}
```

### **Envío de Datos**
```javascript
async function submitForm(data, endpoint) {
  const response = await fetch(endpoint, {
    method: 'POST',
    mode: 'no-cors',
    headers: { 'Content-Type': 'text/plain;charset=utf-8' },
    body: JSON.stringify(data)
  });
  
  return response;
}
```

## 📱 **Responsive Design**

### **Breakpoints**
- **Mobile**: < 768px (1 columna)
- **Tablet**: 768px - 1024px (1 columna)
- **Desktop**: > 1024px (2 columnas lado a lado)

### **Adaptaciones**
- **Grid Responsive**: Formularios apilados en móvil
- **Inputs Touch**: Tamaños optimizados para touch
- **Botones**: Tamaños accesibles en móvil
- **Espaciado**: Márgenes y padding adaptativos

## 🔍 **Validación de Campos**

### **Formulario de Reserva**
- **Nombre**: Requerido, mínimo 2 caracteres
- **Email**: Requerido, formato válido
- **Fecha**: Requerida, fecha futura
- **Hora**: Requerida, selección de horarios
- **Personas**: Requerido, selección de 1-7+
- **Comentario**: Opcional

### **Formulario de Pedido**
- **Nombre**: Requerido, mínimo 2 caracteres
- **Email**: Requerido, formato válido
- **Producto**: Requerido, selección de productos
- **Cantidad**: Requerida, rango 1-10
- **Comentario**: Opcional

### **Mensajes de Error Personalizados**
```javascript
const errorMessages = {
  nombre: 'El nombre es obligatorio',
  email: 'Por favor, introduce un email válido',
  fecha: 'La fecha es obligatoria',
  hora: 'La hora es obligatoria',
  personas: 'El número de personas es obligatorio',
  producto: 'El producto es obligatorio',
  cantidad: 'La cantidad debe estar entre 1 y 10'
};
```

## 🚀 **Cómo Usar**

### **1. Visitar la Página**
```
/demos/forms
```

### **2. Probar Formularios**
- **Reserva**: Completar datos de reserva
- **Pedido**: Seleccionar producto y cantidad
- **Validación**: Ver mensajes de error en tiempo real
- **Envío**: Probar estados de carga y éxito

### **3. Verificar Accesibilidad**
- **Navegación por teclado**: Tab entre campos
- **Screen Reader**: Mensajes de error y estado
- **Focus**: Indicadores visuales de foco

## 🔧 **Configuración Técnica**

### **Variable de Entorno**
```bash
# .env
PUBLIC_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### **Google Apps Script**
```javascript
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  
  // Agregar timestamp
  const timestamp = new Date();
  
  // Insertar datos según tipo
  if (data.tipo === 'reserva') {
    sheet.appendRow([timestamp, data.nombre, data.email, data.fecha, data.hora, data.personas, data.comentario]);
  } else if (data.tipo === 'pedido') {
    sheet.appendRow([timestamp, data.nombre, data.email, data.producto, data.cantidad, data.comentario]);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ok: true}))
    .setMimeType(ContentService.MimeType.JSON);
}
```

## 🎯 **Casos de Uso**

### **Para Restaurantes**
- **Reservas Online**: Sistema de reservas automatizado
- **Pedidos**: Formularios de pedido para delivery
- **Feedback**: Formularios de contacto y sugerencias
- **Eventos**: Registro para eventos especiales

### **Para Desarrolladores**
- **Portfolio**: Demostrar habilidades de formularios
- **Template**: Base para proyectos con formularios
- **Aprendizaje**: Ejemplo de validación y estados
- **Referencia**: Patrones de accesibilidad

## 🔮 **Próximas Mejoras**

### **Funcionalidades Adicionales**
- [ ] **Validación Avanzada**: Regex personalizados
- [ ] **Archivos**: Upload de archivos
- [ ] **Captcha**: Protección anti-spam
- [ ] **Autocompletado**: Sugerencias de campos
- [ ] **Guardado Local**: Drafts automáticos
- [ ] **Analytics**: Tracking de conversiones

### **Optimizaciones**
- [ ] **Debounce**: Validación optimizada
- [ ] **Cache**: Respuestas en caché
- [ ] **Offline**: Funcionalidad offline
- [ ] **PWA**: Instalación como app

## 📞 **Soporte**

Para preguntas o mejoras sobre este demo:
- **Documentación**: Revisar este archivo
- **Código**: Comentar en el repositorio
- **Issues**: Reportar bugs o sugerencias

---

**Demo creado con ❤️ usando Astro, Tailwind CSS y JavaScript vanilla**





