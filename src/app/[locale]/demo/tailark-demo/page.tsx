import {
  HeroSection,
  FeaturesSection,
  PricingSection,
  ContactSection
} from "@/components/tailark"

export default function TailarkDemoPage() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <HeroSection
        badge="🚀 New Release"
        title="Modern Solutions for"
        subtitle="Customer Engagement"
        description="Highly customizable components for building modern websites and applications that look and feel the way you mean it."
        primaryCta={{
          text: "Start Building",
          href: "#features"
        }}
        secondaryCta={{
          text: "Watch Demo",
          href: "#demo"
        }}
        image={{
          src: "/app-light.png",
          alt: "App Screenshot"
        }}
        logoCloud={{
          title: "Trusted by leading companies",
          logos: [
            { src: "https://html.tailus.io/blocks/customers/nvidia.svg", alt: "Nvidia" },
            { src: "https://html.tailus.io/blocks/customers/github.svg", alt: "GitHub" },
            { src: "https://html.tailus.io/blocks/customers/nike.svg", alt: "Nike" },
            { src: "https://html.tailus.io/blocks/customers/openai.svg", alt: "OpenAI" }
          ]
        }}
      />

      {/* Features Section */}
      <FeaturesSection
        badge="Features"
        title="Everything you need to"
        subtitle="build amazing products"
        description="Our platform provides all the tools and features you need to create exceptional user experiences."
        features={[
          {
            icon: "zap",
            title: "Lightning Fast",
            description: "Built for speed with optimized performance and minimal load times.",
            badge: "Fast"
          },
          {
            icon: "shield",
            title: "Secure by Default",
            description: "Enterprise-grade security with end-to-end encryption and compliance.",
            badge: "Secure"
          },
          {
            icon: "rocket",
            title: "Easy to Deploy",
            description: "Deploy anywhere with our simple one-click deployment process.",
            badge: "Simple"
          },
          {
            icon: "users",
            title: "Team Collaboration",
            description: "Work together seamlessly with real-time collaboration features.",
            badge: "Team"
          }
        ]}
        layout="grid"
        columns={2}
      />

      {/* Pricing Section */}
      <PricingSection
        badge="Pricing"
        title="Choose the perfect"
        subtitle="plan for you"
        description="Start free and scale as you grow. No hidden fees, no surprises."
        showYearlyToggle={true}
        yearlyDiscount="Save 20%"
        plans={[
          {
            name: "Starter",
            description: "Perfect for individuals and small projects",
            price: { monthly: 0, yearly: 0 },
            features: [
              { name: "Up to 3 projects", included: true },
              { name: "5GB storage", included: true },
              { name: "Community support", included: true },
              { name: "Advanced analytics", included: false },
              { name: "Priority support", included: false }
            ],
            cta: { text: "Get Started", href: "/signup", variant: "outline" }
          },
          {
            name: "Pro",
            description: "Best for growing teams and businesses",
            price: { monthly: 29, yearly: 290 },
            badge: "Popular",
            popular: true,
            features: [
              { name: "Unlimited projects", included: true },
              { name: "100GB storage", included: true },
              { name: "Priority support", included: true },
              { name: "Advanced analytics", included: true },
              { name: "Custom integrations", included: false }
            ],
            cta: { text: "Start Free Trial", href: "/signup?plan=pro" }
          },
          {
            name: "Enterprise",
            description: "For large organizations with custom needs",
            price: { monthly: 99, yearly: 990 },
            features: [
              { name: "Everything in Pro", included: true },
              { name: "Unlimited storage", included: true },
              { name: "24/7 phone support", included: true },
              { name: "Custom integrations", included: true },
              { name: "SLA guarantee", included: true }
            ],
            cta: { text: "Contact Sales", href: "/contact", variant: "outline" }
          }
        ]}
      />

      {/* Contact Section */}
      <ContactSection
        badge="Contact"
        title="Get in touch"
        subtitle="with our team"
        description="Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible."
        contactInfo={[
          {
            icon: "mail",
            title: "Email",
            details: ["hello@example.com", "support@example.com"],
            href: "mailto:hello@example.com"
          },
          {
            icon: "phone",
            title: "Phone",
            details: ["+1 (555) 123-4567", "Mon-Fri 9am-6pm EST"],
            href: "tel:+15551234567"
          },
          {
            icon: "mapPin",
            title: "Office",
            details: ["123 Business St", "San Francisco, CA 94105"]
          }
        ]}
        showForm={true}
      />
    </div>
  )
}
