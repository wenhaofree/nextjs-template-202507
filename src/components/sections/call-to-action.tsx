// Update the import path to the correct location of Button
import { Button } from '../ui/button'
import Link from 'next/link'
 
export default function CallToAction() {
    return (
        <section className="py-16">
            <div className="mx-auto max-w-5xl rounded-3xl border px-6 py-12 md:py-20 lg:py-32">
                <div className="text-center">
                    <h2 className="text-balance text-4xl font-semibold lg:text-5xl">Kickstart Your SaaS Journey</h2>
                    <p className="mt-4">Build, manage, and scale your SaaS product faster with ShipSaaS. Focus on innovation and growth—leave the setup to us.</p>
                    <div className="mt-12 flex flex-wrap justify-center gap-4">
                        <Button
                            asChild
                            size="lg">
                            <Link href="/" target='_blank'>
                                <span>Get ShipSaaS Now</span>
                            </Link>
                        </Button>

                        <Button
                            asChild
                            size="lg"
                            variant="outline">
                            <Link href="/docs" target="_blank" rel="noopener noreferrer">
                                <span>Read the Docs</span>
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
        </section>
    )
}
