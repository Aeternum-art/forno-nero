import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import wineCellarImage from "@/assets/wine-cellar.jpg";
import fireCookingImage from "@/assets/fire-cooking.jpg";
import dishesImage from "@/assets/dishes-overhead.jpg";
import { staggerContainer, fadeUp } from "@/lib/animations";

const experiences = [
  {
    image: fireCookingImage,
    title: "Fire Cooking",
    caption: "Open flame, patient craft. Our kitchen is built around the hearth.",
  },
  {
    image: wineCellarImage,
    title: "Wine Selection",
    caption: "Mediterranean vintages curated to complement every dish.",
  },
  {
    image: dishesImage,
    title: "Intimate Dining",
    caption: "Warm light, unhurried moments. An evening to remember.",
  },
];

const Experience = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  return (
    <section id="experience" ref={containerRef} className="py-24 md:py-32 bg-charcoal-light overflow-hidden">
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={ref} className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center mb-16 md:mb-20"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-xs tracking-[0.3em] uppercase text-ember mb-4 block"
            >
              The Experience
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground"
            >
              More Than a Meal
            </motion.h2>
          </motion.div>

          {/* Experience Grid */}
          <motion.div
            className="grid md:grid-cols-3 gap-6 md:gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {experiences.map((exp, index) => {
              // Different parallax amounts for each card
              const y = useTransform(
                scrollYProgress,
                [0, 1],
                [index % 2 === 0 ? 50 : -50, index % 2 === 0 ? -50 : 50]
              );

              return (
                <motion.div
                  key={exp.title}
                  variants={fadeUp}
                  className="group relative overflow-hidden"
                  style={{ y: index === 1 ? y : undefined }}
                >
                  {/* Image with hover effect */}
                  <motion.div
                    className="aspect-[4/5] overflow-hidden"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.5 }}
                  >
                    <motion.img
                      src={exp.image}
                      alt={exp.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.12 }}
                      transition={{ duration: 0.7 }}
                    />
                    {/* Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent"
                      initial={{ opacity: 0.8 }}
                      whileHover={{ opacity: 0.5 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>

                  {/* Content */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                    <motion.h3
                      className="font-serif text-2xl md:text-3xl text-foreground mb-2"
                      initial={{ y: 0 }}
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      {exp.title}
                    </motion.h3>
                    <motion.p
                      className="font-sans text-sm text-bone-muted leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                    >
                      {exp.caption}
                    </motion.p>
                  </div>

                  {/* Hover border effect */}
                  <motion.div
                    className="absolute inset-0 border-2 border-ember/0 pointer-events-none"
                    whileHover={{ borderColor: "hsl(var(--ember) / 0.3)" }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
