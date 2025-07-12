"use client"

import { Mail, MapPin, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"

const iconMap = {
  mail: Mail,
  phone: Phone,
  mapPin: MapPin
}

type IconName = keyof typeof iconMap

interface ContactInfo {
  icon: IconName
  title: string
  details: string[]
  href?: string
}

interface ContactSectionProps {
  badge?: string
  title: string
  subtitle?: string
  description?: string
  contactInfo?: ContactInfo[]
  showForm?: boolean
  formAction?: string
  formMethod?: "POST" | "GET"
}

const ContactSection = ({
  badge,
  title,
  subtitle,
  description,
  contactInfo,
  showForm = true,
  formAction = "/api/contact",
  formMethod = "POST"
}: ContactSectionProps) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    // Handle form submission here
    console.log("Form submitted")
  }

  return (
    <section className="py-24 sm:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mx-auto max-w-3xl text-center">
          {badge && (
            <div className="mb-4 flex justify-center">
              <Badge variant="secondary" className="px-3 py-1 text-sm font-medium">
                {badge}
              </Badge>
            </div>
          )}
          
          <h2 className="mb-4 text-3xl font-bold tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            {title}
            {subtitle && (
              <span className="block bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {subtitle}
              </span>
            )}
          </h2>
          
          {description && (
            <p className="text-lg text-muted-foreground sm:text-xl">
              {description}
            </p>
          )}
        </div>

        <div className="mt-16 grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          {contactInfo && contactInfo.length > 0 && (
            <div className="space-y-8">
              <h3 className="text-2xl font-semibold text-foreground">
                Get in Touch
              </h3>
              
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
                      {(() => {
                        const IconComponent = iconMap[info.icon]
                        return <IconComponent className="h-6 w-6" />
                      })()}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-foreground">
                        {info.title}
                      </h4>
                      <div className="mt-1 space-y-1">
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-muted-foreground">
                            {info.href ? (
                              <a 
                                href={info.href} 
                                className="hover:text-primary transition-colors"
                              >
                                {detail}
                              </a>
                            ) : (
                              detail
                            )}
                          </p>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Contact Form */}
          {showForm && (
            <Card>
              <CardHeader>
                <CardTitle>Send us a Message</CardTitle>
                <CardDescription>
                  We'll get back to you as soon as possible.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        placeholder="John"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        placeholder="Doe"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="john@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Input
                      id="subject"
                      name="subject"
                      placeholder="How can we help you?"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea
                      id="message"
                      name="message"
                      placeholder="Tell us more about your inquiry..."
                      rows={5}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full">
                    Send Message
                  </Button>
                </form>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}

export default ContactSection
export type { ContactSectionProps, ContactInfo }
