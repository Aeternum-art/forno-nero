import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import dishesImage from "@/assets/dishes-overhead.jpg";
import { staggerContainerFast, fadeUp, slideInLeft, slideInRight, scaleIn } from "@/lib/animations";

const menuCategories = [
  {
    name: "From the Fire",
    items: [
      { name: "Lamb Chops", description: "Wood-fired, rosemary, garlic jus", price: "450" },
      { name: "Bone-In Ribeye", description: "Dry-aged 45 days, charred shallots", price: "700" },
      { name: "Whole Branzino", description: "Lemon, capers, olive oil", price: "520" },
    ],
  },
  {
    name: "Small Plates",
    items: [
      { name: "Burrata", description: "San Marzano, basil oil, grilled bread", price: "150" },
      { name: "Charred Octopus", description: "Fingerling, chorizo, paprika", price: "220" },
      { name: "Grilled Artichokes", description: "Lemon aioli, sea salt", price: "100" },
    ],
  },
  {
    name: "Mains",
    items: [
      { name: "Pappardelle", description: "Slow-braised oxtail, pecorino", price: "455" },
      { name: "Duck Breast", description: "Cherry reduction, roasted beets", price: "480" },
      { name: "Eggplant Parmigiana", description: "House-made ricotta, tomato", price: "240" },
    ],
  },
];

const MenuPreview = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [activeCategory, setActiveCategory] = useState(0);

  return (
    <section id="menu" className="py-24 md:py-32 bg-background">
      <div className="container mx-auto px-6 lg:px-12">
        <div ref={ref} className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            {/* Image Side with scale animation */}
            <motion.div
              variants={slideInLeft}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="relative order-2 lg:order-1"
            >
              <motion.div
                className="aspect-square overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.5 }}
              >
                <motion.img
                  src={dishesImage}
                  alt="Mediterranean dishes"
                  className="w-full h-full object-cover"
                  whileHover={{ scale: 1.08 }}
                  transition={{ duration: 0.7 }}
                />
              </motion.div>
              {/* Decorative frame with fade-in */}
              <motion.div
                className="absolute -bottom-4 -right-4 w-full h-full border border-ember/30 -z-10"
                initial={{ opacity: 0, x: 20, y: 20 }}
                animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>

            {/* Menu Side */}
            <motion.div
              variants={slideInRight}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
              className="order-1 lg:order-2"
            >
              {/* Section Header */}
              <motion.span
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="font-sans text-xs tracking-[0.3em] uppercase text-ember mb-4 block"
              >
                The Menu
              </motion.span>
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-serif text-4xl md:text-5xl text-foreground mb-8"
              >
                Curated Selections
              </motion.h2>

              {/* Category Tabs */}
              <motion.div
                className="flex flex-wrap gap-4 mb-10"
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                {menuCategories.map((category, index) => (
                  <motion.button
                    key={category.name}
                    onClick={() => setActiveCategory(index)}
                    className={`relative font-sans text-xs tracking-[0.15em] uppercase pb-2 transition-colors duration-300 ${
                      activeCategory === index
                        ? "text-foreground"
                        : "text-bone-muted hover:text-foreground"
                    }`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {category.name}
                    {/* Animated underline */}
                    {activeCategory === index && (
                      <motion.div
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-ember"
                        layoutId="menuUnderline"
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      />
                    )}
                  </motion.button>
                ))}
              </motion.div>

              {/* Menu Items with AnimatePresence */}
              <div className="space-y-6 mb-10 min-h-[280px]">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeCategory}
                    variants={staggerContainerFast}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, y: -10, transition: { duration: 0.2 } }}
                    className="space-y-6"
                  >
                    {menuCategories[activeCategory].items.map((item) => (
                      <motion.div
                        key={item.name}
                        variants={fadeUp}
                        className="group"
                      >
                        <div className="flex justify-between items-baseline mb-1">
                          <h4 className="font-serif text-xl text-foreground group-hover:text-ember transition-colors duration-300">
                            {item.name}
                          </h4>
                          <span className="font-sans text-sm text-ember ml-4">
                            R{item.price}
                          </span>
                        </div>
                        <p className="font-sans text-sm text-bone-muted">
                          {item.description}
                        </p>
                        <motion.div
                          className="mt-4 h-[1px] bg-border/50 origin-left"
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ duration: 0.6, delay: 0.3 }}
                        />
                      </motion.div>
                    ))}
                  </motion.div>
                </AnimatePresence>
              </div>

              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button variant="hero" size="lg">
                  View Full Menu
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MenuPreview;
