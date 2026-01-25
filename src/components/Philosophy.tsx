import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { staggerContainer, fadeUp, lineReveal } from "@/lib/animations";

const philosophyItems = [
  {
    title: "Ingredients",
    description: "Sourced from Mediterranean shores and local farms. Every ingredient tells a story of sun, sea, and soil.",
  },
  {
    title: "Technique",
    description: "Open flame, patient timing, generations of knowledge. We cook as it was meant to be done.",
  },
  {
    title: "Experience",
    description: "Intimate tables, warm light, unhurried evenings. Dining that honors the moment.",
  },
];

const Philosophy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="philosophy" className="py-24 md:py-32 bg-charcoal-light">
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={ref} className="max-w-6xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center mb-20"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-xs tracking-[0.3em] uppercase text-ember mb-4 block"
            >
              Our Philosophy
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
            >
              Elemental Cooking
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-bone-muted max-w-2xl mx-auto text-lg leading-relaxed"
            >
              At Forno Nero, we believe cooking is an act of transformation. 
              Fire unlocks flavor, time builds depth, and craft creates memory.
            </motion.p>
          </motion.div>

          {/* Philosophy Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-8 md:gap-12"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {philosophyItems.map((item, index) => (
              <motion.div
                key={item.title}
                variants={fadeUp}
                className="group text-center md:text-left"
              >
                {/* Number with parallax-like effect on hover */}
                <motion.span
                  className="font-serif text-6xl text-ember/20 block mb-4 group-hover:text-ember/40 transition-colors duration-500"
                  whileHover={{ y: -5, transition: { duration: 0.3 } }}
                >
                  0{index + 1}
                </motion.span>
                
                {/* Title */}
                <h3 className="font-serif text-2xl md:text-3xl text-foreground mb-4">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="font-sans text-bone-muted leading-relaxed">
                  {item.description}
                </p>

                {/* Animated Divider line */}
                <motion.div
                  className="mt-8 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent md:from-border md:via-border md:to-transparent origin-left"
                  initial={{ scaleX: 0 }}
                  animate={isInView ? { scaleX: 1 } : {}}
                  transition={{ duration: 0.8, delay: 0.5 + index * 0.15 }}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Philosophy;
