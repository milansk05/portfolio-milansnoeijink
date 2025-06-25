# Tailwind CSS 4 Migratie Oplossingen voor NextJS

Tailwind CSS 4 brengt fundamentele architectuurwijzigingen met zich mee die van JavaScript-configuratie naar CSS-first configuratie overstappen. Deze gids biedt praktische oplossingen voor alle veelvoorkomende migratieproblemen in NextJS projecten.

## De "Cannot apply unknown utility class" error oplossen

**Oorzaak:** Deze error ontstaat omdat Tailwind CSS 4 de manier waarop stylesheets worden verwerkt heeft veranderd. CSS bestanden die apart worden gebundeld (CSS modules, component stylesheets) hebben niet langer automatisch toegang tot theme variabelen en custom utilities.

**Primaire Oplossing: @reference directive**

```css
/* component.module.css */
@reference "../globals.css";

.my-component {
  @apply bg-background text-foreground p-4;
}
```

**Voor Vue/Svelte componenten:**

```vue
<style scoped>
@reference "../../app.css";

.component {
  @apply bg-primary text-white rounded-lg p-4;
}
</style>
```

**Alternatieve oplossing voor basic theme access:**

```css
@reference "tailwindcss";

.component {
  @apply text-2xl font-bold text-blue-500;
}
```

## CSS custom properties verschillen tussen versie 3 en 4

De grootste verandering is de **volledige overgang van JavaScript naar CSS-first configuratie**.

### Tailwind CSS 3 (oude manier)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
};
```

### Tailwind CSS 4 (nieuwe manier)

```css
/* app.css */
@import "tailwindcss";

@theme {
  --color-background: #ffffff;
  --color-foreground: #09090b;
}
```

**Belangrijke verschillen:**

- **Namespace vereisten**: Colors moeten `--color-*` prefix gebruiken
- **Automatische CSS variabelen**: Alle theme waarden worden automatisch beschikbaar als CSS custom properties
- **Moderne CSS features**: Gebruikt `@property`, `color-mix()`, en cascade layers
- **Geen RGB channel separatie**: Gebruik volledige kleurwaarden in plaats van gescheiden kanalen

## Configuratie voor background en foreground kleuren

**Complete werkende configuratie:**

```css
@import "tailwindcss";

@theme {
  /* Light theme */
  --color-background: #ffffff;
  --color-foreground: #09090b;
  --color-card: #ffffff;
  --color-card-foreground: #09090b;
  --color-primary: #0f172a;
  --color-primary-foreground: #f8fafc;
  --color-secondary: #f1f5f9;
  --color-secondary-foreground: #0f172a;
  --color-muted: #f1f5f9;
  --color-muted-foreground: #64748b;
  --color-border: #e2e8f0;
}

@layer base {
  .dark {
    --color-background: #09090b;
    --color-foreground: #fafafa;
    --color-card: #09090b;
    --color-card-foreground: #fafafa;
    --color-primary: #fafafa;
    --color-primary-foreground: #09090b;
    --color-secondary: #27272a;
    --color-secondary-foreground: #fafafa;
    --color-muted: #27272a;
    --color-muted-foreground: #a1a1aa;
    --color-border: #27272a;
  }
}
```

**Gebruik in componenten:**

```tsx
export default function Card() {
  return (
    <div className="bg-card text-card-foreground border border-border rounded-lg p-6">
      <h2 className="text-primary text-xl font-bold">Titel</h2>
      <p className="text-muted-foreground">Beschrijving tekst</p>
    </div>
  );
}
```

## Complete stap-voor-stap migratiegids

### Stap 1: Dependencies updaten

```bash
# Verwijder oude packages
npm uninstall tailwindcss postcss autoprefixer

# Installeer Tailwind CSS 4
npm install -D tailwindcss@latest @tailwindcss/postcss@latest
```

### Stap 2: PostCSS configuratie aanpassen

```javascript
// postcss.config.mjs (let op: .mjs extensie!)
export default {
  plugins: {
    "@tailwindcss/postcss": {},
  },
};
```

### Stap 3: CSS import vervangen

```css
/* Vervang deze v3 directives */
@tailwind base;
@tailwind components;
@tailwind utilities;

/* Met deze v4 import */
@import "tailwindcss";
```

### Stap 4: Configuratie migreren naar CSS

```css
@import "tailwindcss";

@theme {
  --color-primary: #3b82f6;
  --color-secondary: #ef4444;
  --font-sans: "Inter", sans-serif;
  --spacing-custom: 4.5rem;
  --radius-card: 0.75rem;
}
```

### Stap 5: Component stylesheets fixen

Voeg `@reference` toe aan elke component CSS file:

```css
/* component.module.css */
@reference "../globals.css";

.container {
  @apply flex items-center justify-center bg-background;
}
```

### Stap 6: Dark mode configuratie

```css
@layer base {
  .dark {
    --color-background: #0a0a0a;
    --color-foreground: #fafafa;
    /* Andere dark mode kleuren */
  }
}
```

### Stap 7: Testen en debuggen

```bash
# Clear Next.js cache
rm -rf .next

# Restart development server
npm run dev
```

## NextJS 15 compatibiliteit overwegingen

**✅ Officieel ondersteund:** NextJS 15 en Tailwind CSS 4 zijn officieel compatibel volgens Vercel documentatie.

**⚠️ Bekende issues:**

- **Turbopack compatibility**: Disable `--turbopack` flag als je style problemen hebt
- **Safari issues**: Enkele Safari-specifieke problemen met Turbopack
- **Module resolution**: Clear `.next` cache bij "Module not found" errors

**Aanbevolen NextJS configuratie:**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Disable turbopack temporarily if needed
  // experimental: {
  //   turbo: false
  // }
};

export default nextConfig;
```

**Browser support vereisten:**

- Safari 16.4+
- Chrome 111+
- Firefox 128+

**Belangrijk:** Als je oudere browsers moet ondersteunen, overweeg dan om bij Tailwind CSS 3.4 te blijven.

## CSS variabelen configuratie met var(--background)

### Methode 1: Directe theme configuratie (aanbevolen)

```css
@import "tailwindcss";

@theme {
  --color-background: #ffffff;
  --color-foreground: #000000;
}

/* Nu werken bg-background en text-foreground automatisch */
```

### Methode 2: Externe CSS variabelen koppelen

```css
:root {
  --my-background: #ffffff;
  --my-foreground: #000000;
}

@theme {
  --color-background: var(--my-background);
  --color-foreground: var(--my-foreground);
}
```

### Methode 3: Arbitrary values gebruiken

```html
<!-- Als je bestaande CSS variabelen wilt behouden -->
<div className="bg-[var(--background)] text-[var(--foreground)]">Content</div>
```

### Methode 4: Mixed approach voor complex projects

```css
@import "tailwindcss";

/* Reguliere CSS variabelen */
:root {
  --background: #ffffff;
  --foreground: #000000;
}

/* Theme variabelen die utilities genereren */
@theme {
  --color-background: var(--background);
  --color-foreground: var(--foreground);
}

.dark {
  --background: #000000;
  --foreground: #ffffff;
}
```

## Alternatieve oplossingen: wanneer downgraden overwegen

**Blijf bij Tailwind CSS 3.4 als:**

- Je oudere browsers moet ondersteunen (Safari < 16.4, Chrome < 111)
- Je complexe Sass/Less preprocessing gebruikt
- Je veel third-party plugins hebt die nog niet v4-compatible zijn
- Je tijdskritische projecten hebt en geen tijd voor uitgebreide testing

**Upgrade naar v4 als:**

- Je moderne browsers target
- Je performance verbeteringen wilt (5x snellere builds)
- Je nieuwe CSS features wilt gebruiken
- Je een cleaner, CSS-native configuratie wilt

## Praktische troubleshooting tips

### Debug CSS variabelen

```javascript
// In browser console
const styles = getComputedStyle(document.documentElement);
console.log(styles.getPropertyValue("--color-primary"));
```

### Verifieer @reference paths

```css
/* Zorg dat paths relatief zijn ten opzichte van het CSS bestand */
@reference "../globals.css"; /* ✅ Correct */
@reference "./src/globals.css"; /* ❌ Fout */
```

### Migratie tool gebruiken

```bash
# Automatische migratie (voorzichtig gebruiken)
npx @tailwindcss/upgrade@next

# Check resultaten grondig na
git diff
```

### Performance optimalisatie

```javascript
// vite.config.js (als je Vite gebruikt)
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
});
```

Met deze configuraties en oplossingen zou je alle Tailwind CSS 4 migratieproblemen in je NextJS project moeten kunnen oplossen. De sleutel is het correct gebruik van de `@reference` directive en de nieuwe `@theme` configuratie pattern.