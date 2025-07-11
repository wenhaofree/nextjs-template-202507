# Next.js Template 2025

A modern Next.js template with premium UI components built with React, TypeScript, and Tailwind CSS. This template provides a solid foundation for building beautiful, responsive web applications with the latest technologies.

## ✨ Features

### 🚀 Core Technologies
- **Next.js 15.3.5** - Latest React framework with App Router
- **React 19** - Latest React version with new features
- **TypeScript 5** - Type-safe development
- **Tailwind CSS v4** - Latest utility-first CSS framework
- **Turbopack** - Ultra-fast bundler for development

### 🎨 UI Components & Design System
- **Shadcn/ui** - High-quality, accessible UI components
- **Radix UI** - Unstyled, accessible components
  - Checkbox, Label, Select, Slot, Switch components
- **Lucide React** - Beautiful icon library (525+ icons)
- **Framer Motion** - Smooth animations and transitions
- **Class Variance Authority (CVA)** - Component variant management
- **Next Themes** - Dark/light mode support

### 🧩 Custom Components
- **Hero Section** - Landing page hero with badge, title, description, and actions
- **Button** - Multiple variants (default, destructive, outline, secondary, ghost, link, glow)
- **Badge** - Status and notification badges
- **Mockup & MockupFrame** - Device mockups for showcasing apps
- **Glow Effects** - Beautiful gradient glow components
- **Ghost 404 Page** - Animated 404 error page with Framer Motion
- **Flow Button** - Modern animated button with hover effects
- **Icons Collection** - Custom SVG icons (GitHub, Twitter, React, Tailwind, etc.)

### 🛠 Development Tools
- **PNPM** - Fast, disk space efficient package manager
- **PostCSS** - CSS processing with Tailwind CSS plugin
- **ESLint** - Code linting and formatting
- **TypeScript Config** - Optimized TypeScript configuration

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with fonts
│   ├── page.tsx           # Home page with Hero Section
│   ├── not-found.tsx      # Custom 404 page
│   └── globals.css        # Global styles and CSS variables
├── components/
│   ├── blocks/            # Page sections
│   │   └── hero-section.tsx
│   └── ui/                # Reusable UI components
│       ├── button.tsx
│       ├── badge.tsx
│       ├── card.tsx
│       ├── input.tsx
│       ├── label.tsx
│       ├── select.tsx
│       ├── switch.tsx
│       ├── mockup.tsx
│       ├── glow.tsx
│       ├── flow-button.tsx
│       ├── ghost-404-page.tsx
│       └── icons.tsx
└── lib/
    └── utils.ts           # Utility functions (cn, clsx, twMerge)
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PNPM (recommended) or npm/yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd nextjs-template-202507
```

2. Install dependencies:
```bash
pnpm install
# or
npm install
# or
yarn install
```

3. Run the development server:
```bash
pnpm dev
# or
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🎨 Customization

### Theme Configuration
The project uses CSS variables for theming. Customize colors in `src/app/globals.css`:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  /* ... more variables */
}
```

### Component Variants
Components use Class Variance Authority (CVA) for variant management:

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        glow: "bg-primary text-primary-foreground shadow-lg shadow-primary/25",
      },
    },
  }
)
```

## 📦 Dependencies

### Production Dependencies
- `@radix-ui/react-*` - Accessible UI primitives
- `class-variance-authority` - Component variant management
- `clsx` - Conditional className utility
- `framer-motion` - Animation library
- `lucide-react` - Icon library
- `next-themes` - Theme switching
- `tailwind-merge` - Tailwind class merging

### Development Dependencies
- `@tailwindcss/postcss` - Tailwind CSS PostCSS plugin
- `@types/*` - TypeScript type definitions
- `tw-animate-css` - Additional Tailwind animations

## 🌟 Key Features Explained

### Hero Section
A flexible hero component with:
- Optional badge with action link
- Gradient text title
- Description text
- Multiple action buttons with variants
- Responsive image with light/dark mode support
- Glow effects and animations

### 404 Page
An animated 404 page featuring:
- Framer Motion animations
- Interactive ghost character
- Smooth transitions and hover effects
- Responsive design

### Button System
Comprehensive button component with:
- Multiple variants (default, glow, outline, etc.)
- Size options (sm, default, lg, icon)
- Icon support
- Accessibility features

## 📚 Learn More

To learn more about the technologies used:

- [Next.js Documentation](https://nextjs.org/docs) - Learn about Next.js features and API
- [Tailwind CSS](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Shadcn/ui](https://ui.shadcn.com/) - Re-usable components built with Radix UI
- [Framer Motion](https://www.framer.com/motion/) - Animation library for React
- [Radix UI](https://www.radix-ui.com/) - Low-level UI primitives

## 🚀 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
