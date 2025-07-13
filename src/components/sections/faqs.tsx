"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { useTranslations } from 'next-intl';
import Link from 'next/link';

const FAQsFour = () => {
    const t = useTranslations('FAQs');
    const faqItems = t.raw('items') as Array<{
        id: string;
        question: string;
        answer: string;
    }>;

    return (
        <section className="py-16 md:py-24">
            <div className="mx-auto max-w-5xl px-4 md:px-6">
                <div className="mx-auto max-w-xl text-center">
                    <h2 className="text-balance text-3xl font-bold md:text-4xl lg:text-5xl">
                        {t('header.title')}
                    </h2>
                    <p className="text-muted-foreground mt-4 text-balance">
                        {t('header.description')}
                    </p>
                </div>

                <div className="mx-auto mt-12 max-w-xl">
                    <Accordion
                        type="single"
                        collapsible
                        className="bg-muted dark:bg-muted/50 w-full rounded-2xl p-1"
                    >
                        {faqItems.map((item) => (
                            <div
                                className="group"
                                key={item.id}
                            >
                                <AccordionItem
                                    value={item.id}
                                    className="data-[state=open]:bg-card dark:data-[state=open]:bg-muted peer rounded-xl border-none px-7 py-1 data-[state=open]:border-none data-[state=open]:shadow-sm"
                                >
                                    <AccordionTrigger className="cursor-pointer text-base hover:no-underline">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent>
                                        <p className="text-base">{item.answer}</p>
                                    </AccordionContent>
                                </AccordionItem>
                                <hr className="mx-7 border-dashed group-last:hidden peer-data-[state=open]:opacity-0" />
                            </div>
                        ))}
                    </Accordion>

                    <p className="text-muted-foreground mt-6 px-8">
                        {t('contact.text')}{' '}
                        <Link
                            href="/contact"
                            className="text-primary font-medium hover:underline"
                        >
                            {t('contact.linkText')}
                        </Link>
                    </p>
                </div>
            </div>
        </section>
    );
};

export default FAQsFour;
