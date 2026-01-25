import { motion, useScroll, useTransform } from "framer-motion";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-grill.jpg";
import { useRef } from "react";
import { textRevealContainer, textRevealChild } from "@/lib/animations";

const Hero = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.3]);

  const headlineWords = ["Fire.", "Time.", "Craft."];

  return (
    <section ref={containerRef} className="relative h-screen w-full overflow-hidden">
      {/* Background Image with Parallax */}
      <motion.div className="absolute inset-0" style={{ y: backgroundY }}>
        <motion.div
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: [0.25, 0.4, 0.25, 1] }}
          className="h-[120%] w-full"
        >
          <img
            src={heroImage}
            alt="Mediterranean grill with open flame"
            className="h-full w-full object-cover"
          />
        </motion.div>
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-background/30" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />
      </motion.div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full flex flex-col justify-end pb-24 md:pb-32"
        style={{ opacity }}
      >
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-3xl">
            {/* Main Headline with Text Reveal */}
            <motion.h1
              className="font-serif text-5xl md:text-7xl lg:text-8xl tracking-tight text-foreground mb-6"
              variants={textRevealContainer}
              initial="hidden"
              animate="visible"
            >
              {headlineWords.map((word, index) => (
                <motion.span
                  key={word}
                  className={`block overflow-hidden ${index === 2 ? "text-ember" : ""}`}
                  variants={textRevealChild}
                  style={{ perspective: 1000 }}
                >
                  {word}
                </motion.span>
              ))}
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
              className="font-sans text-lg md:text-xl text-bone-muted max-w-xl mb-10 leading-relaxed"
            >
              A modern Mediterranean kitchen built around flame. 
              Stone, wood, and iron—where ancient technique meets contemporary craft.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.1, ease: [0.25, 0.4, 0.25, 1] }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button variant="hero" size="xl">
                  View Menu
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button variant="ember" size="xl">
                  Reserve a Table
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase text-bone-muted">
            Scroll
          </span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-bone-muted to-transparent" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
