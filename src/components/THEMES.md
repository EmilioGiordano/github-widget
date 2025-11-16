# Sistema de Temas

El sistema de temas permite cambiar los colores del gráfico de contribuciones de forma fácil y escalable.

## Cómo agregar un nuevo tema

1. Abre `src/components/themes.ts`
2. Agrega un nuevo objeto al objeto `themes`:

```typescript
'nombre-del-tema': {
  name: 'nombre-del-tema',
  displayName: 'Nombre para Mostrar',
  levels: {
    0: '#color-sin-contribuciones',
    1: '#color-primer-cuartil',
    2: '#color-segundo-cuartil',
    3: '#color-tercer-cuartil',
    4: '#color-cuarto-cuartil',
  },
},
```

## Temas disponibles

- **github-dark**: Estilo oscuro de GitHub (por defecto)
- **github-bright**: Estilo claro de GitHub
- **ocean-dark**: Tema oscuro con tonos azules
- **purple-dark**: Tema oscuro con tonos púrpura
- **amber-dark**: Tema oscuro con tonos ámbar/dorado

## Uso

```tsx
<GitHubContributions theme="github-dark" />
<GitHubContributions theme="ocean-dark" />
```

## Estructura

Cada tema define 5 niveles de color (0-4) que corresponden a:
- 0: Sin contribuciones
- 1: Primer cuartil (pocas contribuciones)
- 2: Segundo cuartil
- 3: Tercer cuartil
- 4: Cuarto cuartil (máximas contribuciones)

