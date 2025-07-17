# ShipSaaS - Complete SaaS Development Platform

🚀 **Ship your SaaS in a weekend!** A comprehensive Next.js boilerplate with everything you need to build and launch profitable SaaS applications. Built with the latest technologies and production-ready features.

🌐 **Website**: [shipsaas.net](https://shipsaas.net)
📖 **中文文档**: [README-zh.md](./README-zh.md)
🎯 **Live Demo**: [demo.shipsaas.net](https://demo.shipsaas.net)

## ✨ Why Choose ShipSaaS?

### 🚀 Latest Technology Stack
- **Next.js 15.4.1** - Latest React framework with App Router and Server Components
- **React 19.1.0** - Latest React with concurrent features and improved performance
- **TypeScript 5** - Full type safety across the entire application
- **Tailwind CSS v4** - Latest utility-first CSS framework with modern features
- **Turbopack** - Ultra-fast bundler for lightning-speed development

### 🔐 Complete Authentication System
- **NextAuth.js v4.24.11** - Production-ready authentication with session management
- **Multi-Provider Support** - Google OAuth, GitHub OAuth, Email/Password
- **Google One-Tap** - Seamless one-click authentication experience
- **Secure Password Handling** - bcryptjs hashing with salt rounds
- **Session Management** - JWT-based sessions with database persistence

### 💳 Payment & Billing Integration
- **Stripe v18.3.0** - Complete payment processing with webhooks
- **Multiple Payment Methods** - Credit cards, Alipay, WeChat Pay (localized)
- **Subscription Management** - Recurring billing and plan management
- **Order Management** - Complete order lifecycle with activation system
- **Multi-Currency Support** - USD/CNY with proper exchange rate conversion

### 🌍 Internationalization (i18n)
- **next-intl v4.3.4** - Professional internationalization solution
- **Multi-Language Support** - English and Chinese (easily extensible)
- **Localized Routing** - SEO-friendly URLs with locale prefixes
- **Dynamic Content** - Localized pricing, payment methods, and content
- **RTL Support** - Ready for right-to-left languages

### 🗄️ Database & ORM
- **Prisma v6.11.1** - Type-safe database operations with auto-completion
- **PostgreSQL** - Production-grade database with full ACID compliance
- **Neon Integration** - Serverless PostgreSQL with automatic scaling
- **Migration System** - Version-controlled database schema changes
- **Seed Data** - Development and testing data setup

### 🎨 Premium UI Components
- **Shadcn/ui** - 50+ high-quality, accessible components
- **Radix UI** - Unstyled, accessible primitives for custom designs
- **Framer Motion v12.23.0** - Smooth animations and micro-interactions
- **Lucide React v0.525.0** - 525+ beautiful, consistent icons
- **Next Themes v0.4.6** - Seamless dark/light mode switching
- **Class Variance Authority** - Type-safe component variants

### � Email & Communication
- **Resend v4.6.0** - Modern email API for transactional emails
- **Newsletter System** - Subscriber management and email campaigns
- **Email Templates** - Beautiful, responsive email designs
- **SMTP Integration** - Flexible email provider configuration

### 🛠️ Developer Experience
- **TypeScript** - Full type safety with strict configuration
- **ESLint** - Code quality and consistency enforcement
- **PNPM** - Fast, efficient package management
- **Hot Reload** - Instant feedback during development
- **Error Boundaries** - Graceful error handling and recovery

## 🏗️ Architecture Overview

ShipSaaS follows a modern, scalable architecture designed for production SaaS applications:

```
� ShipSaaS Project Structure
├── 🌐 Frontend Layer (Next.js 15 + React 19)
│   ├── App Router with Server Components
│   ├── Client Components for interactivity
│   ├── Middleware for auth & i18n
│   └── Static generation for performance
├── 🔐 Authentication Layer (NextAuth.js)
│   ├── Multi-provider OAuth (Google, GitHub)
│   ├── Credentials-based auth
│   ├── Session management (JWT + Database)
│   └── Google One-Tap integration
├── 💾 Data Layer (Prisma + PostgreSQL)
│   ├── Type-safe database operations
│   ├── Migration system
│   ├── Connection pooling
│   └── Seed data management
├── 💳 Payment Layer (Stripe)
│   ├── Checkout sessions
│   ├── Webhook handling
│   ├── Subscription management
│   └── Multi-currency support
├── 🌍 Internationalization (next-intl)
│   ├── Server-side rendering
│   ├── Dynamic routing
│   ├── Message management
│   └── Locale detection
└── 📧 Communication Layer (Resend)
    ├── Transactional emails
    ├── Newsletter system
    ├── Template management
    └── Analytics tracking
```

### 📂 Detailed File Structure

```
src/
├── app/                           # Next.js App Router
│   ├── [locale]/                  # Internationalized routes
│   │   ├── layout.tsx            # Locale-specific layout
│   │   ├── page.tsx              # Landing page
│   │   ├── auth/                 # Authentication pages
│   │   ├── dashboard/            # User dashboard
│   │   ├── pricing/              # Pricing page
│   │   ├── orders/               # Order management
│   │   └── profile/              # User profile
│   ├── api/                      # API routes
│   │   ├── auth/                 # Authentication APIs
│   │   ├── stripe/               # Payment processing
│   │   ├── orders/               # Order management
│   │   └── newsletter/           # Email subscription
│   ├── globals.css               # Global styles & CSS variables
│   └── layout.tsx                # Root layout
├── components/                    # React components
│   ├── auth/                     # Authentication components
│   ├── blocks/                   # Page sections
│   ├── sections/                 # Layout sections
│   ├── ui/                       # Reusable UI components
│   └── providers.tsx             # Context providers
├── lib/                          # Utility libraries
│   ├── auth.ts                   # Authentication helpers
│   ├── prisma.ts                 # Database client
│   ├── stripe.ts                 # Payment helpers
│   ├── email.ts                  # Email utilities
│   └── utils.ts                  # General utilities
├── messages/                     # i18n message files
│   ├── en.json                   # English translations
│   └── zh.json                   # Chinese translations
├── i18n/                         # Internationalization config
│   ├── routing.ts                # Route configuration
│   └── request.ts                # Request configuration
├── types/                        # TypeScript definitions
│   ├── auth.ts                   # Authentication types
│   ├── stripe.ts                 # Payment types
│   └── global.ts                 # Global types
└── middleware.ts                 # Next.js middleware
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PNPM 10+ (recommended) or npm/yarn
- PostgreSQL database (or Neon.tech account)
- Stripe account for payment processing
- Google/GitHub developer accounts (for OAuth)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/shipsaasnet/shipsaas-starter.git
cd shipsaas-starter
```

2. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
```
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/shipsaas"

# Authentication
AUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:3000"
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_test_..."
STRIPE_PRIVATE_KEY="sk_test_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email (Resend)
RESEND_API_KEY="re_..."
```

3. Install dependencies:
```bash
pnpm install
```

4. Set up the database:
```bash
# Generate Prisma client
pnpm db:generate

# Push schema to database
pnpm db:push

# Seed database with test data
pnpm db:seed
```

5. Run the development server:
```bash
pnpm dev
```

6. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint
- `pnpm db:generate` - Generate Prisma client
- `pnpm db:push` - Push schema to database
- `pnpm db:migrate` - Run database migrations
- `pnpm db:studio` - Open Prisma Studio
- `pnpm db:seed` - Seed database with test data

## 🎨 Customization & Configuration

### Theme Configuration
ShipSaaS uses CSS variables for theming with dark/light mode support. Customize colors in `src/app/globals.css`:

```css
:root {
  --background: oklch(1 0 0);
  --foreground: oklch(0.145 0 0);
  --primary: oklch(0.205 0 0);
  --primary-foreground: oklch(1 0 0);
  /* ... more variables */
}

.dark {
  --background: oklch(0.1 0 0);
  --foreground: oklch(0.95 0 0);
  --primary: oklch(0.7 0.2 250);
  --primary-foreground: oklch(0.1 0 0);
  /* ... more variables */
}
```

### Component Variants
Components use Class Variance Authority (CVA) for type-safe variant management:

```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline: "border border-input hover:bg-accent hover:text-accent-foreground",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "underline-offset-4 hover:underline text-primary",
        glow: "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/35",
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)
```

### Internationalization
Add or modify translations in the `messages` directory:

```json
// messages/en.json
{
  "Index": {
    "title": "Ship your SaaS in a weekend",
    "description": "A complete Next.js boilerplate with everything you need to build and launch profitable SaaS applications."
  },
  "Pricing": {
    "title": "Simple, transparent pricing",
    "description": "No hidden fees, no surprises. Start for free, upgrade when you're ready.",
    "monthly": "Monthly",
    "annually": "Annually",
    "basic": "Basic",
    "standard": "Standard",
    "premium": "Premium"
  }
}
```

### Authentication Configuration
Configure authentication providers in `.env.local`:

```
# Enable/disable providers
NEXT_PUBLIC_AUTH_GOOGLE_ENABLED="true"
NEXT_PUBLIC_AUTH_GITHUB_ENABLED="true"
NEXT_PUBLIC_AUTH_GOOGLE_ONE_TAP_ENABLED="true"

# Provider credentials
AUTH_GOOGLE_ID="your-google-client-id"
AUTH_GOOGLE_SECRET="your-google-client-secret"
AUTH_GITHUB_ID="your-github-client-id"
AUTH_GITHUB_SECRET="your-github-client-secret"
```

## 📦 Complete Dependency List

### Core Framework
- **next**: `15.4.1` - React framework with App Router
- **react**: `19.1.0` - Latest React with concurrent features
- **react-dom**: `19.1.0` - React DOM renderer
- **typescript**: `5.x` - TypeScript language support

### Authentication & Security
- **next-auth**: `4.24.11` - Authentication for Next.js
- **bcryptjs**: `3.0.2` - Password hashing
- **jwt-decode**: `4.0.0` - JWT token decoding
- **uuid**: `11.1.0` - UUID generation

### Database & ORM
- **@prisma/client**: `6.11.1` - Prisma database client
- **prisma**: `6.11.1` - Prisma ORM toolkit

### Payment Processing
- **stripe**: `18.3.0` - Stripe server-side SDK
- **@stripe/stripe-js**: `7.4.0` - Stripe client-side SDK

### UI Components & Styling
- **@radix-ui/react-accordion**: `1.2.11` - Accessible accordion
- **@radix-ui/react-avatar**: `1.1.10` - Avatar component
- **@radix-ui/react-checkbox**: `1.3.2` - Checkbox component
- **@radix-ui/react-dialog**: `1.1.14` - Modal dialogs
- **@radix-ui/react-dropdown-menu**: `2.1.15` - Dropdown menus
- **@radix-ui/react-icons**: `1.3.2` - Radix icon set
- **@radix-ui/react-label**: `2.1.7` - Form labels
- **@radix-ui/react-navigation-menu**: `1.2.13` - Navigation menus
- **@radix-ui/react-select**: `2.2.5` - Select dropdowns
- **@radix-ui/react-separator**: `1.1.7` - Visual separators
- **@radix-ui/react-slot**: `1.2.3` - Slot component
- **@radix-ui/react-switch**: `1.2.5` - Toggle switches
- **@radix-ui/react-tooltip**: `1.2.7` - Tooltips
- **lucide-react**: `0.525.0` - Beautiful icon library
- **framer-motion**: `12.23.0` - Animation library
- **motion**: `12.23.3` - Motion components

### Styling & Theming
- **tailwindcss**: `4.x` - Utility-first CSS framework
- **@tailwindcss/postcss**: `4.x` - PostCSS plugin
- **tailwind-merge**: `3.3.1` - Merge Tailwind classes
- **tailwindcss-animate**: `1.0.7` - Animation utilities
- **tw-animate-css**: `1.3.5` - Additional animations
- **class-variance-authority**: `0.7.1` - Component variants
- **clsx**: `2.1.1` - Conditional classes
- **next-themes**: `0.4.6` - Theme switching

### Internationalization
- **next-intl**: `4.3.4` - Internationalization for Next.js

### Email & Communication
- **resend**: `4.6.0` - Modern email API

### Utilities & Helpers
- **date-fns**: `4.1.0` - Date utility library
- **zod**: `4.0.5` - Schema validation
- **sonner**: `2.0.6` - Toast notifications
- **@number-flow/react**: `0.5.10` - Animated numbers

### Documentation (Optional)
- **fumadocs-core**: `15.6.3` - Documentation core
- **fumadocs-mdx**: `11.6.10` - MDX processing
- **fumadocs-ui**: `15.6.3` - Documentation UI
- **@types/mdx**: `2.0.13` - MDX type definitions

### Development Dependencies
- **@types/node**: `20.x` - Node.js type definitions
- **@types/react**: `19.x` - React type definitions
- **@types/react-dom**: `19.x` - React DOM type definitions
- **@types/uuid**: `10.0.0` - UUID type definitions

## 🌟 Production-Ready Features

### 🔐 Authentication System
- **Multi-Provider OAuth**: Google, GitHub with one-click setup
- **Email/Password**: Secure credential-based authentication
- **Google One-Tap**: Seamless authentication experience
- **Session Management**: JWT tokens with database persistence
- **Password Security**: bcryptjs hashing with salt rounds
- **User Management**: Profile pages, avatar uploads, account settings

### 💳 Payment & Billing
- **Stripe Integration**: Complete payment processing with webhooks
- **Multiple Payment Methods**: Credit cards, Alipay, WeChat Pay
- **Subscription Management**: Recurring billing and plan upgrades
- **Multi-Currency**: USD/CNY support with exchange rate conversion
- **Order Management**: Complete order lifecycle with activation
- **Billing Dashboard**: Invoice history, payment methods, usage tracking

### 🌍 Internationalization
- **Multi-Language**: English and Chinese (easily extensible)
- **Localized Routing**: SEO-friendly URLs with locale prefixes
- **Dynamic Content**: Localized pricing, payment methods, and content
- **Server-Side Rendering**: Optimized for performance and SEO
- **Locale Detection**: Automatic language detection and switching

### 🎨 UI/UX Excellence
- **50+ Components**: Production-ready Shadcn/ui components
- **Dark/Light Mode**: Seamless theme switching with system preference
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Animations**: Smooth micro-interactions with Framer Motion
- **Accessibility**: WCAG compliant with keyboard navigation
- **Loading States**: Skeleton loaders and progress indicators

### 📊 Dashboard & Analytics
- **User Dashboard**: Account overview, billing, settings
- **Admin Panel**: User management, order tracking, analytics
- **Real-time Updates**: Live data with optimistic updates
- **Data Visualization**: Charts and metrics for business insights
- **Export Features**: CSV/PDF exports for reports

### 📧 Email System
- **Transactional Emails**: Welcome, password reset, order confirmations
- **Newsletter**: Subscriber management and email campaigns
- **Email Templates**: Beautiful, responsive email designs
- **Analytics**: Open rates, click tracking, engagement metrics

### 🛡️ Security & Performance
- **CSRF Protection**: Built-in security with NextAuth.js
- **Rate Limiting**: API protection against abuse
- **Input Validation**: Zod schema validation on all forms
- **Error Handling**: Graceful error boundaries and user feedback
- **Performance**: Optimized with Next.js 15 and React 19
- **SEO Optimized**: Meta tags, structured data, sitemap generation

## 🎯 Pricing Tiers

ShipSaaS offers three carefully crafted tiers to meet different needs:

### � Basic ($99)
Perfect for getting started with your SaaS journey
- Next.js 15 + React 19 + TypeScript
- TailwindCSS v4 with dark/light mode
- Internationalization (i18n) support
- Neon PostgreSQL database
- OAuth authentication (Google, GitHub)
- SEO optimization
- Stripe payment integration
- Email system with Resend

### ⭐ Standard ($169)
Enhanced with premium UI components and AI features
- Everything in Basic, plus:
- MagicUI premium components
- TailArk component library
- Animate-UI animations
- Vercel AI SDK integration
- ChatGPT functionality
- Advanced email templates
- Priority email support

### 💎 Premium ($299)
Complete SaaS platform with advanced features
- Everything in Standard, plus:
- User dashboard with analytics
- Admin management system
- Points/credits management
- API management system
- One-on-one consultation
- Priority support
- Custom integrations

## 📚 Documentation & Resources

### Official Documentation
- [ShipSaaS Documentation](https://docs.shipsaas.net) - Complete setup and usage guide
- [API Reference](https://docs.shipsaas.net/api) - Detailed API documentation
- [Component Library](https://ui.shipsaas.net) - Interactive component showcase

### Technology Stack Resources
- [Next.js 15 Documentation](https://nextjs.org/docs) - Latest Next.js features and API
- [React 19 Documentation](https://react.dev) - New React features and hooks
- [Tailwind CSS v4](https://tailwindcss.com/docs) - Utility-first CSS framework
- [Prisma Documentation](https://www.prisma.io/docs) - Database ORM and migrations
- [NextAuth.js Guide](https://authjs.dev) - Authentication setup and configuration
- [Stripe Documentation](https://stripe.com/docs) - Payment processing and webhooks
- [next-intl Guide](https://next-intl.dev) - Internationalization best practices

### Community & Support
- [GitHub Repository](https://github.com/shipsaasnet/shipsaas-starter) - Source code and issues
- [Discord Community](https://discord.gg/shipsaas) - Community support and discussions
- [Twitter Updates](https://twitter.com/shipsaas) - Latest news and updates
- [YouTube Tutorials](https://youtube.com/@shipsaas) - Video guides and tutorials

## 🚀 Deployment

### Vercel (Recommended)
The easiest way to deploy ShipSaaS is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Configure environment variables
4. Deploy with zero configuration

### Other Platforms
ShipSaaS works on any platform that supports Next.js:
- **Netlify**: Full-stack deployment with edge functions
- **Railway**: Database and application hosting
- **DigitalOcean**: App Platform deployment
- **AWS**: Amplify or custom EC2 setup
- **Google Cloud**: Cloud Run or App Engine

### Environment Variables for Production
```
# Database
DATABASE_URL="your-production-database-url"

# Authentication
AUTH_SECRET="your-production-secret"
NEXTAUTH_URL="https://yourdomain.com"

# Stripe
NEXT_PUBLIC_STRIPE_PUBLIC_KEY="pk_live_..."
STRIPE_PRIVATE_KEY="sk_live_..."
STRIPE_WEBHOOK_SECRET="whsec_..."

# Email
RESEND_API_KEY="re_..."
```

## 🤝 Contributing

We welcome contributions to ShipSaaS! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## 📄 License

ShipSaaS is available under the [MIT License](LICENSE). Feel free to use it for personal and commercial projects.

---

**Ready to ship your SaaS?** 🚀
Visit [shipsaas.net](https://shipsaas.net) to get started today!
