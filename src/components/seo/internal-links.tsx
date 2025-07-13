import Link from 'next/link'
import { useLocale } from 'next-intl'

interface InternalLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  title?: string
  'aria-label'?: string
}

export function InternalLink({ 
  href, 
  children, 
  className, 
  title, 
  'aria-label': ariaLabel 
}: InternalLinkProps) {
  const locale = useLocale()
  
  // 确保内部链接包含语言前缀
  const localizedHref = href.startsWith('/') && !href.startsWith(`/${locale}`) 
    ? `/${locale}${href}` 
    : href

  return (
    <Link 
      href={localizedHref}
      className={className}
      title={title}
      aria-label={ariaLabel}
    >
      {children}
    </Link>
  )
}

// SEO优化的关键词链接组件
interface KeywordLinkProps {
  keyword: string
  href: string
  className?: string
}

export function KeywordLink({ keyword, href, className }: KeywordLinkProps) {
  const locale = useLocale()
  
  const localizedHref = href.startsWith('/') && !href.startsWith(`/${locale}`) 
    ? `/${locale}${href}` 
    : href

  return (
    <Link 
      href={localizedHref}
      className={className}
      title={`Learn more about ${keyword}`}
      aria-label={`Navigate to ${keyword} page`}
    >
      {keyword}
    </Link>
  )
}

// 面包屑导航组件
interface BreadcrumbItem {
  name: string
  href: string
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[]
  className?: string
}

export function Breadcrumbs({ items, className }: BreadcrumbsProps) {
  const locale = useLocale()

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
        {items.map((item, index) => {
          const isLast = index === items.length - 1
          const localizedHref = item.href.startsWith('/') && !item.href.startsWith(`/${locale}`) 
            ? `/${locale}${item.href}` 
            : item.href

          return (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <span className="mx-2 text-muted-foreground/50">/</span>
              )}
              {isLast ? (
                <span className="font-medium text-foreground" aria-current="page">
                  {item.name}
                </span>
              ) : (
                <Link
                  href={localizedHref}
                  className="hover:text-foreground transition-colors"
                  title={`Navigate to ${item.name}`}
                >
                  {item.name}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}

// 相关链接组件
interface RelatedLink {
  title: string
  href: string
  description?: string
}

interface RelatedLinksProps {
  links: RelatedLink[]
  title?: string
  className?: string
}

export function RelatedLinks({ links, title = "Related Links", className }: RelatedLinksProps) {
  const locale = useLocale()

  return (
    <div className={className}>
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <ul className="space-y-3">
        {links.map((link) => {
          const localizedHref = link.href.startsWith('/') && !link.href.startsWith(`/${locale}`) 
            ? `/${locale}${link.href}` 
            : link.href

          return (
            <li key={link.href}>
              <Link
                href={localizedHref}
                className="block p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                title={link.description || link.title}
              >
                <div className="font-medium text-foreground">{link.title}</div>
                {link.description && (
                  <div className="text-sm text-muted-foreground mt-1">
                    {link.description}
                  </div>
                )}
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
