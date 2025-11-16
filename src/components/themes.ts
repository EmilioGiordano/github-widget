// Sistema de temas para el gráfico de contribuciones
// Cada tema define los colores para los 5 niveles de contribución

export interface Theme {
  name: string
  displayName: string
  levels: {
    0: string // Sin contribuciones
    1: string // Primer cuartil
    2: string // Segundo cuartil
    3: string // Tercer cuartil
    4: string // Cuarto cuartil (máximo)
  }
}

export const themes: Record<string, Theme> = {
  'github-dark': {
    name: 'github-dark',
    displayName: 'GitHub Dark',
    levels: {
      0: '#161b22', // Gris muy oscuro
      1: '#0e4429', // Verde muy oscuro
      2: '#006d32', // Verde oscuro
      3: '#26a641', // Verde medio
      4: '#39d353', // Verde brillante
    },
  },
  'github-bright': {
    name: 'github-bright',
    displayName: 'GitHub Bright',
    levels: {
      0: '#ebedf0', // Gris muy claro (sin contribuciones)
      1: '#9be9a8', // Verde claro (pocas)
      2: '#40c463', // Verde medio
      3: '#30a14e', // Verde oscuro
      4: '#216e39', // Verde muy oscuro (máximo)
    },
  },
  'ocean-dark': {
    name: 'ocean-dark',
    displayName: 'Ocean Dark',
    levels: {
      0: '#0d1117', // Negro azulado
      1: '#0c2a3e', // Azul muy oscuro
      2: '#1a4d6b', // Azul oscuro
      3: '#2d7fb8', // Azul medio
      4: '#4da6ff', // Azul brillante
    },
  },
  'purple-dark': {
    name: 'purple-dark',
    displayName: 'Purple Dark',
    levels: {
      0: '#1a0d1a', // Negro violáceo
      1: '#2d1b2d', // Púrpura muy oscuro
      2: '#4a2c4a', // Púrpura oscuro
      3: '#7a3d7a', // Púrpura medio
      4: '#b84db8', // Púrpura brillante
    },
  },
  'amber-dark': {
    name: 'amber-dark',
    displayName: 'Amber Dark',
    levels: {
      0: '#1a1610', // Negro amarronado
      1: '#3d2e1a', // Ámbar muy oscuro
      2: '#6b4d1a', // Ámbar oscuro
      3: '#b8860b', // Ámbar medio
      4: '#ffd700', // Ámbar brillante
    },
  },
}

export const defaultTheme = 'github-dark'

