// src/components/Contact.tsx
"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Mail,
  MapPin,
  Briefcase,
  Loader2,
  Check,
  X,
  User,
  MessageSquare,
} from "lucide-react";

// Contact form skeleton
const ContactFormSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      </div>
      <div className="space-y-2">
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
        <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
      </div>
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-20 animate-pulse" />
      <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
    </div>
    <div className="space-y-2">
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-16 animate-pulse" />
      <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded-lg animate-pulse" />
    </div>
    <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded-full w-32 animate-pulse" />
  </div>
);

// Contact info skeleton
const ContactInfoSkeleton = () => (
  <div className="space-y-6">
    <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-32 animate-pulse" />
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="w-5 h-5 bg-gray-200 dark:bg-gray-700 rounded animate-pulse" />
          <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-24 animate-pulse" />
        </div>
        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-40 ml-8 animate-pulse" />
      </div>
    ))}
  </div>
);

// Thematische contact loader
const ContactLoader = () => (
  <div className="flex flex-col items-center justify-center py-16">
    <div className="relative">
      {/* Envelope animation */}
      <motion.div
        className="relative w-24 h-16"
        animate={{
          y: [0, -8, 0],
          rotateY: [0, 10, 0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Envelope body */}
        <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg relative overflow-hidden">
          {/* Envelope flap */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-br from-blue-600 to-purple-600"
            style={{
              clipPath: "polygon(0 0, 50% 70%, 100% 0)",
            }}
            animate={{
              rotateX: [0, -20, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1,
            }}
          />

          {/* Message lines */}
          <div className="absolute inset-0 flex flex-col justify-center items-center space-y-1 p-2">
            {[0.6, 0.8, 0.4].map((width, i) => (
              <motion.div
                key={i}
                className="bg-white/30 rounded"
                style={{ width: `${width * 100}%`, height: "2px" }}
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  delay: i * 0.3,
                }}
              />
            ))}
          </div>
        </div>

        {/* Flying hearts/message indicators */}
        {[1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute text-red-400 text-sm"
            initial={{
              x: 0,
              y: 0,
              opacity: 0,
              scale: 0,
            }}
            animate={{
              x: [0, 20 * i, 40 * i],
              y: [0, -10 * i, -20 * i],
              opacity: [0, 1, 0],
              scale: [0, 1, 0],
            }}
            transition={{
              duration: 2.5,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeOut",
            }}
          >
            💌
          </motion.div>
        ))}
      </motion.div>
    </div>

    <motion.p
      className="text-lg font-medium text-gray-900 dark:text-gray-100 mt-6"
      animate={{ opacity: [0.5, 1, 0.5] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      Contact formulier laden...
    </motion.p>

    <div className="flex items-center space-x-2 mt-4">
      {["Formulier", "Validatie", "Verzenden"].map((step, index) => (
        <motion.div
          key={step}
          className="flex items-center"
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 2,
            repeat: Infinity,
            delay: index * 0.6,
            ease: "easeInOut",
          }}
        >
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {step}
          </span>
          {index < 2 && (
            <motion.div
              className="w-2 h-2 mx-3 bg-blue-500 rounded-full"
              animate={{ scale: [0, 1, 0] }}
              transition={{
                duration: 1,
                repeat: Infinity,
                delay: index * 0.6 + 0.3,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  </div>
);

const Contact = () => {
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    // Simuleer form loading
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = "Naam is verplicht";
    if (!formData.email.trim()) newErrors.email = "E-mail is verplicht";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Ongeldig e-mailadres";
    if (!formData.subject.trim()) newErrors.subject = "Onderwerp is verplicht";
    if (!formData.message.trim()) newErrors.message = "Bericht is verplicht";
    else if (formData.message.length < 10)
      newErrors.message = "Bericht moet minimaal 10 karakters bevatten";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      // Simuleer API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simuleer success (in werkelijkheid zou je hier je API aanroepen)
      setSubmitStatus("success");
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  if (loading) {
    return (
      <section id="contact" className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">Contact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Heb je een vraag, voorstel of wil je gewoon in contact komen? Ik
            hoor graag van je!
          </p>
        </motion.div>

        <ContactLoader />

        {/* Skeleton form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <div className="lg:col-span-2">
            <div className="bg-card rounded-lg shadow-lg p-6">
              <ContactFormSkeleton />
            </div>
          </div>

          <div>
            <div className="bg-card rounded-lg shadow-lg p-6">
              <ContactInfoSkeleton />
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <AnimatePresence mode="wait">
      <motion.section
        id="contact"
        className="mb-20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl font-bold text-foreground mb-2">Contact</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Heb je een vraag, voorstel of wil je gewoon in contact komen? Ik
            hoor graag van je!
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact formulier */}
          <motion.div
            className="lg:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="bg-card rounded-lg shadow-lg p-6 text-card-foreground">
              <motion.h3
                className="text-xl font-bold mb-6 text-accent-foreground flex items-center gap-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 }}
              >
                <MessageSquare className="w-5 h-5" />
                Stuur een bericht
              </motion.h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Naam */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                  >
                    <label
                      htmlFor="name"
                      className="text-sm font-medium text-accent-foreground mb-2 flex items-center gap-2"
                    >
                      <User className="w-4 h-4" />
                      Naam *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                        errors.name ? "border-red-500" : "border-border"
                      }`}
                      placeholder="Je volledige naam"
                    />
                    <AnimatePresence>
                      {errors.name && (
                        <motion.p
                          className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <X className="w-3 h-3" />
                          {errors.name}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>

                  {/* E-mail */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                  >
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-accent-foreground mb-2 flex items-center gap-2"
                    >
                      <Mail className="w-4 h-4" />
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                        errors.email ? "border-red-500" : "border-border"
                      }`}
                      placeholder="je@email.com"
                    />
                    <AnimatePresence>
                      {errors.email && (
                        <motion.p
                          className="text-red-500 text-sm mt-1 flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <X className="w-3 h-3" />
                          {errors.email}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </motion.div>
                </div>

                {/* Onderwerp */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <label
                    htmlFor="subject"
                    className="text-sm font-medium text-accent-foreground mb-2"
                  >
                    Onderwerp *
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all ${
                      errors.subject ? "border-red-500" : "border-border"
                    }`}
                    placeholder="Waar gaat je bericht over?"
                  />
                  <AnimatePresence>
                    {errors.subject && (
                      <motion.p
                        className="text-red-500 text-sm mt-1 flex items-center gap-1"
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                      >
                        <X className="w-3 h-3" />
                        {errors.subject}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>

                {/* Bericht */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                >
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-accent-foreground mb-2"
                  >
                    Bericht *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 border rounded-lg bg-background text-foreground placeholder-muted-foreground focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none ${
                      errors.message ? "border-red-500" : "border-border"
                    }`}
                    placeholder="Vertel me over je project, vraag of idee..."
                  />
                  <div className="flex justify-between items-center mt-1">
                    <AnimatePresence>
                      {errors.message && (
                        <motion.p
                          className="text-red-500 text-sm flex items-center gap-1"
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -10 }}
                        >
                          <X className="w-3 h-3" />
                          {errors.message}
                        </motion.p>
                      )}
                    </AnimatePresence>
                    <span
                      className={`text-xs ${
                        formData.message.length < 10
                          ? "text-red-500"
                          : "text-muted-foreground"
                      }`}
                    >
                      {formData.message.length}/500 karakters
                    </span>
                  </div>
                </motion.div>

                {/* Submit button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-full hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary/20"
                    whileHover={!isSubmitting ? { scale: 1.05, y: -2 } : {}}
                    whileTap={!isSubmitting ? { scale: 0.95 } : {}}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 size={18} className="animate-spin" />
                        <span>Versturen...</span>
                      </>
                    ) : (
                      <>
                        <Send size={18} />
                        <span>Verstuur bericht</span>
                      </>
                    )}
                  </motion.button>
                </motion.div>

                {/* Status messages */}
                <AnimatePresence>
                  {submitStatus !== "idle" && (
                    <motion.div
                      className={`mt-4 p-4 rounded-lg flex items-center gap-2 ${
                        submitStatus === "success"
                          ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                          : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                      }`}
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.3 }}
                    >
                      {submitStatus === "success" ? (
                        <>
                          <Check className="w-5 h-5" />
                          <span>
                            Je bericht is verzonden! Ik neem zo snel mogelijk
                            contact met je op.
                          </span>
                        </>
                      ) : (
                        <>
                          <X className="w-5 h-5" />
                          <span>
                            Er is iets misgegaan. Probeer opnieuw of neem
                            contact op via e-mail.
                          </span>
                        </>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>

          {/* Contact informatie */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
          >
            <div className="bg-card rounded-lg shadow-lg p-6 h-full text-card-foreground">
              <motion.h3
                className="text-xl font-bold mb-6 text-accent-foreground border-b border-border pb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Contact Info
              </motion.h3>

              <div className="space-y-6">
                {[
                  {
                    icon: Mail,
                    title: "E-mail",
                    value: "snoeijinkmilan@gmail.com",
                    href: "mailto:snoeijinkmilan@gmail.com",
                    description: "Voor algemene vragen en samenwerkingen",
                  },
                  {
                    icon: MapPin,
                    title: "Locatie",
                    value: "Groningen, Nederland",
                    description: "Beschikbaar voor lokale en remote projecten",
                  },
                  {
                    icon: Briefcase,
                    title: "Stage",
                    value: "HQ-Online",
                    href: "https://www.hq-online.nl",
                    description: "Momenteel actief bij dit bedrijf",
                  },
                ].map((item, index) => (
                  <motion.div
                    key={item.title}
                    className="group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 + index * 0.1 }}
                  >
                    <div className="flex items-start space-x-3 p-3 rounded-lg hover:bg-secondary/50 transition-colors">
                      <motion.div
                        className="p-2 bg-primary/10 rounded-lg group-hover:bg-primary/20 transition-colors"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                      >
                        <item.icon className="w-5 h-5 text-primary" />
                      </motion.div>
                      <div className="flex-1">
                        <h4 className="text-lg font-semibold mb-1 text-accent-foreground">
                          {item.title}
                        </h4>
                        {item.href ? (
                          <motion.a
                            href={item.href}
                            target={
                              item.href.startsWith("http")
                                ? "_blank"
                                : undefined
                            }
                            rel={
                              item.href.startsWith("http")
                                ? "noopener noreferrer"
                                : undefined
                            }
                            className="text-primary hover:text-primary/80 font-medium transition-colors"
                            whileHover={{ scale: 1.02 }}
                          >
                            {item.value}
                          </motion.a>
                        ) : (
                          <p className="text-accent-foreground/80 font-medium">
                            {item.value}
                          </p>
                        )}
                        <p className="text-sm text-accent-foreground/60 mt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}

                {/* Beschikbaarheid indicator */}
                <motion.div
                  className="mt-8 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 1 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <motion.div
                      className="w-3 h-3 bg-green-500 rounded-full"
                      animate={{
                        scale: [1, 1.2, 1],
                        opacity: [1, 0.6, 1],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                      }}
                    />
                    <span className="font-semibold text-green-800 dark:text-green-300">
                      Beschikbaar voor projecten
                    </span>
                  </div>
                  <p className="text-sm text-green-700 dark:text-green-400">
                    Ik ben momenteel beschikbaar voor nieuwe projecten en
                    samenwerkingen. Reactietijd binnen 24 uur.
                  </p>
                </motion.div>

                {/* Response tijd */}
                <motion.div
                  className="text-center p-4 bg-secondary/30 rounded-lg"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.2 }}
                >
                  <div className="text-2xl mb-2">⚡</div>
                  <p className="text-sm text-muted-foreground">
                    <strong>Snelle reactie:</strong>
                    <br />
                    Meestal binnen 2-4 uur
                  </p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Contact;