import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, Users, Phone } from "lucide-react";
import { staggerContainer, fadeUp, scaleIn } from "@/lib/animations";

const Reservation = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    name: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle reservation submission
    console.log("Reservation:", formData);
  };

  const inputVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: 0.3 + i * 0.1,
        ease: [0.25, 0.4, 0.25, 1] as const,
      },
    }),
  };

  return (
    <section id="reserve" className="py-24 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative ember glow with pulse animation */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-ember/5 rounded-full blur-3xl pointer-events-none"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <div className="container mx-auto px-6 lg:px-12 relative z-10">
        <div ref={ref} className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease: [0.25, 0.4, 0.25, 1] }}
            className="text-center mb-12 md:mb-16"
          >
            <motion.span
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="font-sans text-xs tracking-[0.3em] uppercase text-ember mb-4 block"
            >
              Reservations
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-serif text-4xl md:text-5xl lg:text-6xl text-foreground mb-6"
            >
              Reserve Your Table
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="font-sans text-bone-muted max-w-xl mx-auto leading-relaxed"
            >
              Join us for an evening of fire, flavor, and intimate dining. 
              We recommend booking at least 3 days in advance.
            </motion.p>
          </motion.div>

          {/* Reservation Form with scale-in animation */}
          <motion.form
            variants={scaleIn}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            onSubmit={handleSubmit}
            className="bg-charcoal-light border border-border p-8 md:p-12"
          >
            <div className="grid md:grid-cols-3 gap-6 mb-8">
              {/* Date */}
              <motion.div
                className="space-y-2"
                custom={0}
                variants={inputVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <label className="font-sans text-xs tracking-[0.15em] uppercase text-bone-muted flex items-center gap-2">
                  <Calendar size={14} />
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground font-sans focus:border-ember focus:outline-none transition-colors"
                  required
                />
              </motion.div>

              {/* Time */}
              <motion.div
                className="space-y-2"
                custom={1}
                variants={inputVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <label className="font-sans text-xs tracking-[0.15em] uppercase text-bone-muted flex items-center gap-2">
                  <Clock size={14} />
                  Time
                </label>
                <select
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground font-sans focus:border-ember focus:outline-none transition-colors appearance-none"
                  required
                >
                  <option value="">Select time</option>
                  <option value="18:00">6:00 PM</option>
                  <option value="18:30">6:30 PM</option>
                  <option value="19:00">7:00 PM</option>
                  <option value="19:30">7:30 PM</option>
                  <option value="20:00">8:00 PM</option>
                  <option value="20:30">8:30 PM</option>
                  <option value="21:00">9:00 PM</option>
                  <option value="21:30">9:30 PM</option>
                </select>
              </motion.div>

              {/* Guests */}
              <motion.div
                className="space-y-2"
                custom={2}
                variants={inputVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <label className="font-sans text-xs tracking-[0.15em] uppercase text-bone-muted flex items-center gap-2">
                  <Users size={14} />
                  Guests
                </label>
                <select
                  value={formData.guests}
                  onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
                  className="w-full bg-background border border-border px-4 py-3 text-foreground font-sans focus:border-ember focus:outline-none transition-colors appearance-none"
                  required
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                  <option value="9+">9+ Guests</option>
                </select>
              </motion.div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Name */}
              <motion.div
                className="space-y-2"
                custom={3}
                variants={inputVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <label className="font-sans text-xs tracking-[0.15em] uppercase text-bone-muted">
                  Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full bg-background border border-border px-4 py-3 text-foreground font-sans placeholder:text-muted-foreground focus:border-ember focus:outline-none transition-colors"
                  required
                />
              </motion.div>

              {/* Email */}
              <motion.div
                className="space-y-2"
                custom={4}
                variants={inputVariants}
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
              >
                <label className="font-sans text-xs tracking-[0.15em] uppercase text-bone-muted">
                  Email
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full bg-background border border-border px-4 py-3 text-foreground font-sans placeholder:text-muted-foreground focus:border-ember focus:outline-none transition-colors"
                  required
                />
              </motion.div>
            </div>

            {/* Phone */}
            <motion.div
              className="space-y-2 mb-10"
              custom={5}
              variants={inputVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <label className="font-sans text-xs tracking-[0.15em] uppercase text-bone-muted flex items-center gap-2">
                <Phone size={14} />
                Phone (Optional)
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                placeholder="+27 67 123 4526"
                className="w-full bg-background border border-border px-4 py-3 text-foreground font-sans placeholder:text-muted-foreground focus:border-ember focus:outline-none transition-colors"
              />
            </motion.div>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 items-center justify-between"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
            >
              <p className="text-bone-muted text-sm font-sans">
                For parties of 9 or more, please call us directly.
              </p>
              <motion.div
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.98 }}
              >
                <Button type="submit" variant="ember" size="xl">
                  Request Reservation
                </Button>
              </motion.div>
            </motion.div>
          </motion.form>
        </div>
      </div>
    </section>
  );
};

export default Reservation;
