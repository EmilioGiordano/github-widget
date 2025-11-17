# Componente de Contribuciones de GitHub

Un componente React que replica el gráfico de contribuciones de GitHub con todas sus funcionalidades, mostrando **datos reales** de cualquier usuario de GitHub.

## 🚀 Características

- ✅ **Datos reales de GitHub** usando la API de contribuciones
- ✅ Cuadrícula de contribuciones con 365 días del último año
- ✅ 5 niveles de color basados en la cantidad de contribuciones
- ✅ Tooltip interactivo al hacer hover mostrando fecha y contribuciones
- ✅ Etiquetas de meses dinámicas
- ✅ Leyenda "Menos/Más" con escala de colores
- ✅ Fuentes personalizables para meses, contribuciones y leyenda
- ✅ Estado de carga mientras obtiene los datos
- ✅ Badge con el nombre de usuario
- ✅ Totalmente responsive
- ✅ Estilo idéntico al de GitHub

## 📦 Instalación

```bash
npm install
```

## 🏃‍♂️ Ejecutar en desarrollo

```bash
npm run dev
```

## 🏗️ Build para producción

```bash
npm run build
```

## 📝 Uso

### Uso básico (con usuario por defecto)

```tsx
import GitHubContributions from './components/GitHubContributions'

function App() {
  // Por defecto usa el usuario 'EmilioGiordano'
  return <GitHubContributions />
}
```

### Con un usuario específico

```tsx
<GitHubContributions 
  username="torvalds"
/>
```

### Con fuentes personalizadas

```tsx
<GitHubContributions 
  username="EmilioGiordano"
  monthsFont="Arial, sans-serif"
  contributionsFont="Georgia, serif"
  legendFont="'Courier New', monospace"
/>
```

### Con total de contribuciones personalizado (sin API)

```tsx
<GitHubContributions 
  username=""
  totalContributions={947}
  monthsFont="'JetBrains Mono', monospace"
/>
```

## 🎨 Props

| Prop | Tipo | Por defecto | Descripción |
|------|------|-------------|-------------|
| `username` | `string` | `'EmilioGiordano'` | Usuario de GitHub del cual obtener contribuciones |
| `totalContributions` | `number` | Calculado desde API | Total de contribuciones (sobrescribe datos de la API) |
| `monthsFont` | `string` | `'JetBrains Mono', monospace` | Fuente para las etiquetas de meses |
| `contributionsFont` | `string` | `'JetBrains Mono', monospace` | Fuente para el texto de contribuciones |
| `legendFont` | `string` | `'JetBrains Mono', monospace` | Fuente para la leyenda "Menos/Más" |

## 🎯 Funcionalidades

1. **API de GitHub**: El componente obtiene automáticamente las contribuciones reales usando:
   - API: `https://github-contributions-api.deno.dev/${username}.json`
   - No requiere autenticación
   - Datos actualizados del último año

2. **Hover interactivo**: Al pasar el mouse sobre cualquier día, se muestra un tooltip con:
   - Número de contribuciones ese día
   - Fecha completa en español

3. **Colores de nivel**: Los días se colorean según las contribuciones (igual que GitHub):
   - Nivel 0: Sin contribuciones (gris oscuro `#161b22`)
   - Nivel 1: Pocas contribuciones (verde muy oscuro `#0e4429`)
   - Nivel 2: Contribuciones moderadas (verde oscuro `#006d32`)
   - Nivel 3: Muchas contribuciones (verde medio `#26a641`)
   - Nivel 4: Contribuciones máximas (verde brillante `#39d353`)

4. **Estado de carga**: Muestra un spinner mientras carga los datos de GitHub

5. **Responsive**: El componente es scrolleable horizontalmente en pantallas pequeñas

6. **Fallback**: Si no puede obtener datos de la API, genera datos ficticios para demostración

## 🛠️ Tecnologías

- React 18
- TypeScript
- Vite
- CSS

