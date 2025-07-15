"use client";

import { Button } from '../ui/button'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Icons } from '../ui/icons'

export default function CallToAction() {
    const t = useTranslations('CallToAction');

    return (
        <section className="relative py-12 md:py-16 overflow-hidden bg-background">
            {/* Background gradient - more subtle and theme consistent */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted/30 via-background to-accent/20" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,hsl(var(--muted-foreground)/0.1)_1px,transparent_0)] [background-size:24px_24px] opacity-30" />

            <div className="relative mx-auto max-w-5xl px-6">
                <div className="relative rounded-2xl border border-border bg-card/50 backdrop-blur-sm shadow-lg shadow-muted/20 px-6 py-12 md:py-16 lg:py-20">
                    {/* Decorative elements - more subtle */}
                    <div className="absolute -top-4 -left-4 w-8 h-8 bg-primary/10 rounded-full blur-lg" />
                    <div className="absolute -bottom-4 -right-4 w-10 h-10 bg-accent/10 rounded-full blur-lg" />

                    <div className="text-center space-y-6">
                        {/* Badge */}
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-muted border border-border text-foreground text-sm font-medium">
                            <Icons.rocket className="w-4 h-4 text-primary" />
                            <span>Ready to Ship</span>
                        </div>

                        {/* Title */}
                        <h2 className="text-balance text-3xl font-bold tracking-tight lg:text-5xl text-foreground">
                            {t('title')}
                        </h2>

                        {/* Description */}
                        <p className="mx-auto max-w-xl text-base text-muted-foreground leading-relaxed">
                            {t('description')}
                        </p>

                        {/* Action buttons */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-6">
                            <Button
                                asChild
                                size="lg"
                                className="group relative overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 min-w-[180px]">
                                <Link href="/#pricing">
                                    <Icons.rocket className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                                    <span>{t('buttons.getStarted')}</span>
                                </Link>
                            </Button>

                            <Button
                                asChild
                                size="lg"
                                variant="outline"
                                className="group hover:bg-muted transition-all duration-300 min-w-[180px]">
                                <Link href="/docs" target="_blank" rel="noopener noreferrer">
                                    <Icons.book className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                                    <span>{t('buttons.readDocs')}</span>
                                </Link>
                            </Button>
                        </div>

                        {/* Trust indicators */}
                        <div className="flex flex-wrap items-center justify-center gap-6 pt-8 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1.5">
                                <Icons.shield className="w-4 h-4 text-primary" />
                                <span>Production Ready</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Icons.zap className="w-4 h-4 text-primary" />
                                <span>Fast Setup</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Icons.code className="w-4 h-4 text-primary" />
                                <span>Developer Friendly</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
