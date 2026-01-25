import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { MapPin, Clock, Phone, Car } from "lucide-react";
import { staggerContainer, fadeUp, slideInLeft, slideInRight } from "@/lib/animations";

const Location = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Subtle parallax for map
  const mapY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  const info = [
    {
      icon: MapPin,
      title: "Address",
      lines: ["421 Mediterranean Lane", "Downtown Arts District", "FS, Koffiefontein 9986"],
    },
    {
      icon: Clock,
      title: "Hours",
      lines: [
        "Tue – Thu: 5:30pm – 10:00pm",
        "Fri – Sat: 5:30pm – 11:00pm",
        "Sun: 5:00pm – 9:00pm",
        "Monday: Closed",
      ],
    },
    {
      icon: Phone,
      title: "Contact",
      lines: ["+27 67 123 4526", "hello@fornonero.com"],
    },
    {
      icon: Car,
      title: "Parking",
      lines: ["Valet parking available", "Public lot on 4th Street"],
    },
  ];

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-charcoal-light">
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={ref} className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Map Placeholder with parallax */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              style={{ y: mapY }}
              className="relative aspect-square lg:aspect-auto lg:h-full min-h-[400px] bg-background overflow-hidden"
            >
              {/* Stylized map placeholder */}
              <div className="absolute inset-0 bg-gradient-to-br from-charcoal to-charcoal-light">
                <div className="absolute inset-0 opacity-10">
                  {/* Grid pattern */}
                  <div className="h-full w-full" style={{
                    backgroundImage: `
                      linear-gradient(to right, hsl(var(--bone) / 0.2) 1px, transparent 1px),
                      linear-gradient(to bottom, hsl(var(--bone) / 0.2) 1px, transparent 1px)
                    `,
                    backgroundSize: '40px 40px'
                  }} />
                </div>
                {/* Center marker with enhanced animation */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                  <div className="relative">
                    <motion.div
                      className="w-4 h-4 bg-ember rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        boxShadow: [
                          "0 0 0 0 hsl(var(--ember) / 0.4)",
                          "0 0 0 20px hsl(var(--ember) / 0)",
                          "0 0 0 0 hsl(var(--ember) / 0)",
                        ],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                    <motion.div
                      className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-ember/30 rounded-full"
                      animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeOut",
                      }}
                    />
                  </div>
                </div>
              </div>
              
              {/* Overlay text */}
              <motion.div
                className="absolute bottom-6 left-6 right-6"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <p className="font-serif text-2xl text-foreground mb-2">Downtown Arts District</p>
                <p className="font-sans text-sm text-bone-muted">Koffiefontein, FS</p>
              </motion.div>
            </motion.div>

            {/* Info Grid */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-sans text-xs tracking-[0.3em] uppercase text-ember mb-4 block"
              >
                Find Us
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif text-4xl md:text-5xl text-foreground mb-12"
              >
                Location & Hours
              </motion.h2>

              <motion.div
                className="grid sm:grid-cols-2 gap-8"
                variants={staggerContainer}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                {info.map((item, index) => (
                  <motion.div
                    key={item.title}
                    variants={fadeUp}
                    className="group"
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        initial={{ rotate: -10, scale: 0.8 }}
                        animate={isInView ? { rotate: 0, scale: 1 } : {}}
                        transition={{ duration: 0.5, delay: 0.3 + index * 0.1, type: "spring" }}
                      >
                        <item.icon className="w-5 h-5 text-ember" />
                      </motion.div>
                      <h4 className="font-sans text-xs tracking-[0.2em] uppercase text-foreground">
                        {item.title}
                      </h4>
                    </div>
                    <div className="space-y-1 pl-8">
                      {item.lines.map((line, i) => (
                        <motion.p
                          key={i}
                          className="font-sans text-sm text-bone-muted"
                          initial={{ opacity: 0, x: -10 }}
                          animate={isInView ? { opacity: 1, x: 0 } : {}}
                          transition={{ duration: 0.4, delay: 0.5 + index * 0.1 + i * 0.05 }}
                        >
                          {line}
                        </motion.p>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
