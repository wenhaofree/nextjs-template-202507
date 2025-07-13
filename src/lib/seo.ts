import { Metadata } from 'next'

export interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  canonical?: string
  locale?: string
  type?: 'website' | 'article'
  image?: string
  author?: string
  publishedTime?: string
  modifiedTime?: string
  section?: string
  tags?: string[]
}

export const defaultSEO = {
  siteName: 'ShipSaaS',
  siteUrl: 'https://shipsaas.net',
  defaultTitle: 'ShipSaaS - Complete Next.js SaaS Boilerplate with AI Integration',
  defaultDescription: 'Build profitable SaaS products in a weekend with ShipSaaS. Complete Next.js boilerplate featuring AI integration, authentication, payments, i18n, dashboard, blog, docs, and more.',
  defaultKeywords: [
    'shipsaas',
    'saas boilerplate',
    'nextjs saas',
    'ai saas',
    'saas template',
    'nextjs template',
    'saas starter',
    'react saas',
    'typescript saas',
    'saas development',
    'ai integration',
    'stripe payments',
    'nextauth',
    'prisma',
    'tailwindcss',
    'shadcn ui',
    'saas dashboard',
    'saas blog',
    'saas documentation',
    'internationalization',
    'i18n saas',
    'multi-language saas',
    'saas seo',
    'saas marketing',
    'saas analytics'
  ],
  twitterHandle: '@shipsaas',
  author: 'ShipSaaS Team',
  defaultImage: '/og-image.png',
}

export function generateMetadata(config: SEOConfig): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonical,
    locale = 'en',
    type = 'website',
    image,
    author,
    publishedTime,
    modifiedTime,
    section,
    tags = [],
  } = config

  const fullTitle = title.includes(defaultSEO.siteName) 
    ? title 
    : `${title} | ${defaultSEO.siteName}`
  
  const fullDescription = description || defaultSEO.defaultDescription
  const fullKeywords = [...defaultSEO.defaultKeywords, ...keywords]
  const fullImage = image || defaultSEO.defaultImage
  const fullUrl = canonical || defaultSEO.siteUrl

  return {
    title: fullTitle,
    description: fullDescription,
    keywords: fullKeywords.join(', '),
    authors: [{ name: author || defaultSEO.author }],
    creator: defaultSEO.author,
    publisher: defaultSEO.siteName,
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    metadataBase: new URL(defaultSEO.siteUrl),
    alternates: {
      canonical: fullUrl,
      languages: {
        'en': '/',
        'zh': '/zh',
      },
    },
    openGraph: {
      title: fullTitle,
      description: fullDescription,
      url: fullUrl,
      siteName: defaultSEO.siteName,
      images: [
        {
          url: fullImage,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: locale,
      type: type,
      ...(type === 'article' && {
        publishedTime,
        modifiedTime,
        authors: [author || defaultSEO.author],
        section,
        tags,
      }),
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description: fullDescription,
      images: [fullImage],
      creator: defaultSEO.twitterHandle,
      site: defaultSEO.twitterHandle,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: process.env.GOOGLE_SITE_VERIFICATION,
      yandex: process.env.YANDEX_VERIFICATION,
      yahoo: process.env.YAHOO_SITE_VERIFICATION,
    },
  }
}

export function generateStructuredData(config: SEOConfig & { 
  breadcrumbs?: Array<{ name: string; url: string }> 
}) {
  const { title, description, image, author, publishedTime, type, breadcrumbs } = config
  
  const baseStructuredData = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: defaultSEO.siteName,
    url: defaultSEO.siteUrl,
    description: defaultSEO.defaultDescription,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${defaultSEO.siteUrl}/search?q={search_term_string}`,
      'query-input': 'required name=search_term_string',
    },
  }

  const organizationData = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: defaultSEO.siteName,
    url: defaultSEO.siteUrl,
    logo: `${defaultSEO.siteUrl}/logo.png`,
    description: defaultSEO.defaultDescription,
    sameAs: [
      'https://twitter.com/shipsaas',
      'https://github.com/shipsaas',
    ],
  }

  const structuredData = [baseStructuredData, organizationData]

  if (type === 'article' && publishedTime) {
    const articleData = {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: description,
      image: image || defaultSEO.defaultImage,
      author: {
        '@type': 'Person',
        name: author || defaultSEO.author,
      },
      publisher: {
        '@type': 'Organization',
        name: defaultSEO.siteName,
        logo: {
          '@type': 'ImageObject',
          url: `${defaultSEO.siteUrl}/logo.png`,
        },
      },
      datePublished: publishedTime,
      dateModified: publishedTime,
    }
    structuredData.push(articleData as any)
  }

  if (breadcrumbs && breadcrumbs.length > 0) {
    const breadcrumbData = {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbs.map((crumb, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: crumb.name,
        item: `${defaultSEO.siteUrl}${crumb.url}`,
      })),
    }
    structuredData.push(breadcrumbData as any)
  }

  return structuredData
}
