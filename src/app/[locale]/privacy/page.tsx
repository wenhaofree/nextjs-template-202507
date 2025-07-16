import { getTranslations } from 'next-intl/server'
import { setRequestLocale } from 'next-intl/server'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { Badge } from '@/components/ui/badge'
import { Shield, Database, Users, Lock, Eye, FileText, Phone, Settings } from 'lucide-react'
import { SiteHeader } from '@/components'

interface PrivacyPageProps {
  params: Promise<{ locale: string }>
}

const PrivacyPage = async ({ params }: PrivacyPageProps) => {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('Privacy')

  const sections = [
    {
      key: 'introduction',
      icon: FileText,
      color: 'bg-blue-500/10 text-blue-600 dark:text-blue-400'
    },
    {
      key: 'informationCollection',
      icon: Database,
      color: 'bg-green-500/10 text-green-600 dark:text-green-400'
    },
    {
      key: 'useOfInformation',
      icon: Settings,
      color: 'bg-purple-500/10 text-purple-600 dark:text-purple-400'
    },
    {
      key: 'teamData',
      icon: Users,
      color: 'bg-orange-500/10 text-orange-600 dark:text-orange-400'
    },
    {
      key: 'dataSecurity',
      icon: Shield,
      color: 'bg-red-500/10 text-red-600 dark:text-red-400'
    },
    {
      key: 'dataRetention',
      icon: Lock,
      color: 'bg-indigo-500/10 text-indigo-600 dark:text-indigo-400'
    },
    {
      key: 'yourRights',
      icon: Eye,
      color: 'bg-cyan-500/10 text-cyan-600 dark:text-cyan-400'
    },
    {
      key: 'contactUs',
      icon: Phone,
      color: 'bg-violet-500/10 text-violet-600 dark:text-violet-400'
    }
  ]

  return (
    <div className="min-h-screen bg-background">
      <SiteHeader />
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Shield className="h-8 w-8 text-primary" />
            </div>
          </div>
          <h1 className="text-4xl font-bold tracking-tight mb-2">{t('title')}</h1>
          <p className="text-xl text-muted-foreground mb-4">{t('subtitle')}</p>
          <Badge variant="secondary" className="text-sm">
            {t('lastUpdated')}
          </Badge>
        </div>

        <Separator className="mb-8" />

        {/* Table of Contents */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Table of Contents
            </CardTitle>
            <CardDescription>
              Navigate through our privacy policy sections
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {sections.map((section) => (
                <a
                  key={section.key}
                  href={`#${section.key}`}
                  className="flex items-center gap-2 p-2 rounded-md hover:bg-muted transition-colors text-sm"
                >
                  <section.icon className="h-4 w-4 text-muted-foreground" />
                  {t(`sections.${section.key}.title`)}
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Privacy Sections */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <Card key={section.key} id={section.key} className="scroll-mt-20">
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${section.color}`}>
                    <section.icon className="h-5 w-5" />
                  </div>
                  <span className="text-lg">
                    {index + 1}. {t(`sections.${section.key}.title`)}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="prose prose-gray dark:prose-invert max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    {t(`sections.${section.key}.content`)}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 pt-8 border-t">
          <div className="text-center text-sm text-muted-foreground">
            <p>
              For questions about this privacy policy, please contact us at{' '}
              <a 
                href="mailto:hi@shipsaas.net" 
                className="text-primary hover:underline"
              >
                hi@shipsaas.net
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PrivacyPage

export async function generateMetadata({ params }: PrivacyPageProps) {
  const { locale } = await params
  
  const title = locale === 'zh' ? '隐私政策 | ShipSaaS' : 'Privacy Policy | ShipSaaS'
  const description = locale === 'zh' 
    ? '了解 ShipSaaS 如何收集、使用和保护您的个人信息，包括团队数据处理政策。'
    : 'Learn how ShipSaaS collects, uses, and protects your personal information, including team data handling policies.'

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: 'website',
    },
    twitter: {
      card: 'summary',
      title,
      description,
    },
  }
}
