import { TestimonialsColumn } from "@/components/blocks/testimonials-columns-1";
import { motion } from "motion/react";

const testimonials = [
  {
    text: "ShipSaaS transformed our development process! We launched our SaaS product in just 2 weeks instead of months. The pre-built components and authentication system saved us countless hours.",
    image: "https://randomuser.me/api/portraits/women/1.jpg",
    name: "Sarah Chen",
    role: "Startup Founder",
  },
  {
    text: "The code quality and documentation are exceptional. ShipSaaS gave us a solid foundation with Next.js, TypeScript, and all the modern tools we needed. Highly recommended!",
    image: "https://randomuser.me/api/portraits/men/2.jpg",
    name: "Michael Rodriguez",
    role: "Lead Developer",
  },
  {
    text: "As a solo developer, ShipSaaS was a game-changer. The Stripe integration, database setup, and UI components are production-ready. I focused on my unique features instead of boilerplate code.",
    image: "https://randomuser.me/api/portraits/women/3.jpg",
    name: "Emily Johnson",
    role: "Indie Developer",
  },
  {
    text: "ShipSaaS helped us validate our MVP quickly and efficiently. The internationalization support and responsive design made our global launch seamless. Worth every penny!",
    image: "https://randomuser.me/api/portraits/men/4.jpg",
    name: "David Kim",
    role: "Product Manager",
  },
  {
    text: "The customer support is outstanding! The team was incredibly helpful during setup and answered all our questions promptly. The community is also very supportive.",
    image: "https://randomuser.me/api/portraits/women/5.jpg",
    name: "Lisa Thompson",
    role: "CTO",
  },
  {
    text: "We've built three successful SaaS products using ShipSaaS. The consistent architecture and best practices have made our development process so much more efficient.",
    image: "https://randomuser.me/api/portraits/women/6.jpg",
    name: "Jessica Martinez",
    role: "Engineering Manager",
  },
  {
    text: "The SEO optimization and performance out of the box are incredible. Our landing pages rank well and load fast. ShipSaaS really understands what modern SaaS needs.",
    image: "https://randomuser.me/api/portraits/men/7.jpg",
    name: "Alex Wilson",
    role: "Marketing Lead",
  },
  {
    text: "ShipSaaS made our transition from idea to paying customers incredibly smooth. The payment integration and user management features work flawlessly. Couldn't be happier!",
    image: "https://randomuser.me/api/portraits/women/8.jpg",
    name: "Rachel Green",
    role: "Business Owner",
  },
  {
    text: "The dark mode, theme customization, and component library are top-notch. Our design team loves how easy it is to maintain brand consistency across our platform.",
    image: "https://randomuser.me/api/portraits/men/9.jpg",
    name: "James Anderson",
    role: "Design Director",
  },
];


const firstColumn = testimonials.slice(0, 3);
const secondColumn = testimonials.slice(3, 6);
const thirdColumn = testimonials.slice(6, 9);


const Testimonials = () => {
  return (
    <section className="bg-background my-20 relative">

      <div className="container z-10 mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          viewport={{ once: true }}
          className="flex flex-col items-center justify-center max-w-[540px] mx-auto"
        >
          <div className="flex justify-center">
            <div className="border py-1 px-4 rounded-lg">Testimonials</div>
          </div>

          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter mt-5">
            What our users say
          </h2>
          <p className="text-center mt-5 opacity-75">
            See what our customers have to say about us.
          </p>
        </motion.div>

        <div className="flex justify-center gap-6 mt-10 [mask-image:linear-gradient(to_bottom,transparent,black_25%,black_75%,transparent)] max-h-[740px] overflow-hidden">
          <TestimonialsColumn testimonials={firstColumn} duration={15} />
          <TestimonialsColumn testimonials={secondColumn} className="hidden md:block" duration={19} />
          <TestimonialsColumn testimonials={thirdColumn} className="hidden lg:block" duration={17} />
        </div>
      </div>
    </section>
  );
};

export { Testimonials };