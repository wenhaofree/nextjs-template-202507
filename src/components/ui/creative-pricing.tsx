import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import { toast } from "sonner";
import { BorderBeam, NumberTicker } from "@/components/magicui";
import { motion } from "framer-motion";
import { useTranslations } from 'next-intl';

interface PricingTier {
    name: string;
    icon: React.ReactNode;
    price: number;
    originalPrice?: number;
    discount?: number;
    description: string;
    features: string[];
    popular?: boolean;
    color: string;
}

function CreativePricing({
    tag = "Simple Pricing",
    title = "Make Short Videos That Pop",
    description = "Edit, enhance, and go viral in minutes",
    tiers,
}: {
    tag?: string;
    title?: string;
    description?: string;
    tiers: PricingTier[];
}) {
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const locale = pathname.split('/')[1] || "";
    const t = useTranslations('Pricing');

    const handlePayment = async (tier: PricingTier) => {
        // 检查登录状态
        if (!session) {
            toast.error(locale === "zh" ? "请先登录再进行购买" : "Please login before making a purchase");
            router.push(`/auth/signin?callbackUrl=${encodeURIComponent(pathname)}`);
            return;
        }

        try {
            // 调用 Stripe API 创建支付会话
            const response = await fetch("/api/stripe", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    price: tier.price,
                    email: session.user?.email,
                    productName: `${tier.name} - Creative Plan`,
                    successUrl: `${window.location.origin}/${locale}/dashboard/billing?session_id={CHECKOUT_SESSION_ID}&amount=${tier.price}`,
                    cancelUrl: `${window.location.origin}/${locale}/#pricing`,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || (locale === "zh" ? "支付请求失败" : "Payment request failed"));
            }

            const { url } = await response.json();
            if (url) {
                window.location.href = url;
            } else {
                throw new Error(locale === "zh" ? "未收到结账 URL" : "No checkout URL received");
            }
        } catch (error) {
            toast.error(error instanceof Error ? error.message : (locale === "zh" ? "支付失败，请重试" : "Payment failed. Please try again."));
        }
    };
    return (
        <div className="container-wide section-padding">
            <div className="text-center space-y-6 mb-16">
                <div className="font-handwritten text-xl text-brand rotate-[-1deg] animate-appear-fast opacity-0">
                    {tag}
                </div>
                <div className="relative">
                    <h2 className="text-4xl md:text-5xl font-bold font-handwritten text-gradient rotate-[-1deg] animate-appear-normal opacity-0" style={{ animationDelay: '200ms' }}>
                        {title}
                        <div className="absolute -right-12 top-0 text-amber-500 rotate-12">
                            ✨
                        </div>
                        <div className="absolute -left-8 bottom-0 text-brand -rotate-12">
                            ⭐️
                        </div>
                    </h2>
                    <div
                        className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-44 h-3 bg-brand/20
                        rotate-[-1deg] rounded-full blur-sm"
                    />
                </div>
                <p className="font-handwritten text-xl text-muted-foreground rotate-[-1deg] animate-appear-slow opacity-0" style={{ animationDelay: '400ms' }}>
                    {description}
                </p>
            </div>

            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
            >
                {tiers.map((tier, index) => (
                    <motion.div
                        key={tier.name}
                        initial={{ opacity: 0, y: 50, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        transition={{
                            delay: index * 0.1,
                            duration: 0.5,
                            type: "spring",
                            stiffness: 100
                        }}
                        whileHover={{
                            y: -8,
                            scale: 1.02,
                            transition: { duration: 0.2 }
                        }}
                        className={cn(
                            "relative group",
                            "transition-all duration-300",
                            index === 0 && "rotate-[-1deg]",
                            index === 1 && "rotate-[1deg]",
                            index === 2 && "rotate-[-2deg]"
                        )}
                    >
                        <div
                            className={cn(
                                "absolute inset-0 bg-white dark:bg-zinc-900",
                                "border-2 border-zinc-900 dark:border-white",
                                "rounded-lg shadow-[4px_4px_0px_0px] shadow-zinc-900 dark:shadow-white",
                                "transition-all duration-300",
                                "group-hover:shadow-[8px_8px_0px_0px]",
                                "group-hover:translate-x-[-4px]",
                                "group-hover:translate-y-[-4px]"
                            )}
                        >
                            {tier.popular && (
                                <BorderBeam size={250} duration={12} delay={9} />
                            )}
                        </div>

                        <div className="relative p-6">
                            {tier.popular && (
                                <div
                                    className="absolute -top-2 -right-2 bg-amber-400 text-zinc-900 
                                    font-handwritten px-3 py-1 rounded-full rotate-12 text-sm border-2 border-zinc-900"
                                >
                                    {t('labels.popular')}
                                </div>
                            )}

                            <div className="mb-6">
                                <div
                                    className={cn(
                                        "w-12 h-12 rounded-full mb-4",
                                        "flex items-center justify-center",
                                        "border-2 border-zinc-900 dark:border-white",
                                        `text-${tier.color}-500`
                                    )}
                                >
                                    {tier.icon}
                                </div>
                                <h3 className="font-handwritten text-2xl text-zinc-900 dark:text-white">
                                    {tier.name}
                                </h3>
                                <p className="font-handwritten text-zinc-600 dark:text-zinc-400">
                                    {tier.description}
                                </p>
                            </div>

                            {/* Price */}
                            <motion.div
                                className="mb-6 font-handwritten"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                            >
                                {tier.originalPrice && tier.discount && (
                                    <motion.div
                                        className="flex items-center gap-2 mb-2"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.1 + 0.4, duration: 0.3 }}
                                    >
                                        <span className="text-lg text-zinc-500 dark:text-zinc-400 line-through">
                                            ${tier.originalPrice}
                                        </span>
                                        <motion.div
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{
                                                delay: index * 0.1 + 0.5,
                                                duration: 0.3,
                                                type: "spring",
                                                stiffness: 200
                                            }}
                                        >
                                            <Badge
                                                variant="destructive"
                                                className="text-xs font-bold bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white shadow-lg animate-pulse"
                                            >
                                                -{tier.discount}% OFF
                                            </Badge>
                                        </motion.div>
                                    </motion.div>
                                )}
                                <motion.div
                                    className="flex items-baseline gap-1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                                >
                                    <span className="text-4xl font-bold text-zinc-900 dark:text-white">
                                        $<NumberTicker value={tier.price} />
                                    </span>
                                    <span className="text-zinc-600 dark:text-zinc-400 text-lg">
                                        /{t('labels.month')}
                                    </span>
                                </motion.div>
                                {tier.originalPrice && tier.discount && (
                                    <motion.div
                                        className="mt-1 text-sm text-green-600 dark:text-green-400 font-medium"
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        transition={{ delay: index * 0.1 + 0.6, duration: 0.3 }}
                                    >
                                        💰 {t('labels.save')} ${tier.originalPrice - tier.price}
                                    </motion.div>
                                )}
                            </motion.div>

                            <div className="space-y-3 mb-6">
                                {tier.features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="flex items-center gap-3"
                                    >
                                        <div
                                            className="w-5 h-5 rounded-full border-2 border-zinc-900 
                                            dark:border-white flex items-center justify-center"
                                        >
                                            <Check className="w-3 h-3" />
                                        </div>
                                        <span className="font-handwritten text-lg text-zinc-900 dark:text-white">
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <Button
                                onClick={() => handlePayment(tier)}
                                className={cn(
                                    "w-full h-12 font-handwritten text-lg relative",
                                    "border-2 border-zinc-900 dark:border-white",
                                    "transition-all duration-300",
                                    "shadow-[4px_4px_0px_0px] shadow-zinc-900 dark:shadow-white",
                                    "hover:shadow-[6px_6px_0px_0px]",
                                    "hover:translate-x-[-2px] hover:translate-y-[-2px]",
                                    tier.popular
                                        ? [
                                              "bg-amber-400 text-zinc-900",
                                              "hover:bg-amber-300",
                                              "active:bg-amber-400",
                                              "dark:hover:bg-amber-300",
                                              "dark:active:bg-amber-400",
                                          ]
                                        : [
                                              "bg-zinc-50 dark:bg-zinc-800",
                                              "text-zinc-900 dark:text-white",
                                              "hover:bg-white dark:hover:bg-zinc-700",
                                              "active:bg-zinc-50 dark:active:bg-zinc-800",
                                          ]
                                )}
                            >
                                {!session ? "Sign in to Purchase" : "Get Started"}
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
            <div className="absolute -z-10 inset-0 overflow-hidden">
                <motion.div
                    className="absolute top-40 left-20 text-4xl rotate-12"
                    initial={{ opacity: 0, rotate: 0, scale: 0 }}
                    animate={{ opacity: 0.3, rotate: 12, scale: 1 }}
                    transition={{ delay: 1, duration: 0.8, type: "spring" }}
                >
                    ✎
                </motion.div>
                <motion.div
                    className="absolute bottom-40 right-20 text-4xl -rotate-12"
                    initial={{ opacity: 0, rotate: 0, scale: 0 }}
                    animate={{ opacity: 0.3, rotate: -12, scale: 1 }}
                    transition={{ delay: 1.2, duration: 0.8, type: "spring" }}
                >
                    ✏️
                </motion.div>
            </div>
        </div>
    );
}


export { CreativePricing }
export type { PricingTier }