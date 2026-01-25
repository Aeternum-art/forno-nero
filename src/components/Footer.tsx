import { motion, useInView } from "framer-motion";
import { Instagram, Facebook } from "lucide-react";
import { useRef } from "react";
import { staggerContainer, fadeUp } from "@/lib/animations";

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <footer ref={ref} className="py-16 md:py-20 bg-background border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-8"
            variants={staggerContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            {/* Logo */}
            <motion.a
              href="#"
              variants={fadeUp}
              whileHover={{ scale: 1.02 }}
              className="font-serif text-2xl tracking-[0.3em] text-foreground hover:text-ember transition-colors duration-300"
            >
              FORNO NERO
            </motion.a>

            {/* Tagline */}
            <motion.p
              variants={fadeUp}
              className="font-serif text-lg text-bone-muted italic"
            >
              Fire. Time. Craft.
            </motion.p>

            {/* Social Links */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-6"
            >
              <motion.a
                href="#"
                className="text-bone-muted hover:text-ember transition-colors duration-300"
                aria-label="Instagram"
                whileHover={{ scale: 1.2, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Instagram size={20} />
              </motion.a>
              <motion.a
                href="#"
                className="text-bone-muted hover:text-ember transition-colors duration-300"
                aria-label="Facebook"
                whileHover={{ scale: 1.2, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <Facebook size={20} />
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Divider with animated width */}
          <motion.div
            className="my-10 h-[1px] bg-gradient-to-r from-transparent via-border to-transparent origin-center"
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ duration: 1, delay: 0.4, ease: [0.25, 0.4, 0.25, 1] }}
          />

          {/* Bottom row */}
          <motion.div
            className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <p className="font-sans text-xs text-bone-muted tracking-wide">
              © 2026 Forno Nero. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <motion.a
                href="#"
                className="font-sans text-xs text-bone-muted hover:text-foreground tracking-wide transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Privacy Policy
              </motion.a>
              <motion.a
                href="#"
                className="font-sans text-xs text-bone-muted hover:text-foreground tracking-wide transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                Terms of Service
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
