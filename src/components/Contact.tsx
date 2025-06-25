// src/components/Contact.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send,
  Check,
  AlertCircle,
  Mail,
  MapPin,
  MessageCircle,
  User,
  Loader2,
  Sparkles,
  Shield,
  Clock,
} from "lucide-react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import { useDarkMode } from "@/components/DarkModeContext";

// Definities voor types en constanten
interface FormData {
  name: string;
  email: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
  recaptcha?: string;
}

const SUSPICIOUS_DOMAINS = [
  "10minutemail.com",
  "guerrillamail.com",
  "tempmail.org",
  "mailinator.com",
];

const SUSPICIOUS_PATTERNS = [
  /^[a-zA-Z]+\d{3,}@/,
  /test.*@/,
  /admin.*@/,
  /noreply.*@/,
];

// Discord icon component
const DiscordIcon = ({ size = 20 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 50 50" fill="currentColor">
    <path d="M 41.625 10.769531 C 37.644531 7.566406 31.347656 7.023438 31.078125 7.003906 C 30.660156 6.96875 30.261719 7.203125 30.089844 7.589844 C 30.074219 7.613281 29.9375 7.929688 29.785156 8.421875 C 32.417969 8.867188 35.652344 9.761719 38.578125 11.578125 C 39.046875 11.867188 39.191406 12.484375 38.902344 12.953125 C 38.710938 13.261719 38.386719 13.429688 38.050781 13.429688 C 37.871094 13.429688 37.6875 13.378906 37.523438 13.273438 C 32.492188 10.15625 26.210938 10 25 10 C 23.789063 10 17.503906 10.15625 12.476563 13.273438 C 12.007813 13.5625 11.390625 13.417969 11.101563 12.953125 C 10.808594 12.484375 10.953125 11.867188 11.421875 11.578125 C 14.347656 9.761719 17.582031 8.867188 20.214844 8.421875 C 20.0625 7.929688 19.925781 7.617188 19.914063 7.589844 C 19.738281 7.203125 19.34375 6.960938 18.921875 7.003906 C 18.652344 7.023438 12.355469 7.566406 8.320313 10.8125 C 6.214844 12.761719 2 24.152344 2 34 C 2 34.175781 2.046875 34.34375 2.132813 34.496094 C 5.039063 39.605469 12.972656 40.941406 14.78125 41 C 14.789063 41 14.800781 41 14.8125 41 C 15.132813 41 15.433594 40.847656 15.621094 40.589844 L 17.449219 38.074219 C 12.515625 36.800781 9.996094 34.636719 9.851563 34.507813 C 9.4375 34.144531 9.398438 33.511719 9.765625 33.097656 C 10.128906 32.683594 10.761719 32.644531 11.175781 33.007813 C 11.234375 33.0625 15.875 37 25 37 C 34.140625 37 38.765625 33.046875 38.808594 33.007813 C 39.222656 32.648438 39.855469 32.683594 40.21875 33.101563 C 40.578125 33.515625 40.542969 34.144531 40.125 34.507813 C 39.996094 34.636719 37.484375 36.800781 32.550781 38.074219 L 34.378906 40.589844 C 34.566406 40.847656 34.867188 41 35.1875 41 C 35.199219 41 35.210938 41 35.21875 41 C 37.027344 40.941406 44.960938 39.605469 47.867188 34.496094 C 47.953125 34.34375 48 34.175781 48 34 C 48 24.152344 43.785156 12.761719 41.625 10.769531 Z M 18.5 30 C 16.566406 30 15 28.210938 15 26 C 15 23.789063 16.566406 22 18.5 22 C 20.433594 22 22 23.789063 22 26 C 22 28.210938 20.433594 30 18.5 30 Z M 31.5 30 C 29.566406 30 28 28.210938 28 26 C 28 23.789063 29.566406 22 31.5 22 C 33.433594 22 35 23.789063 35 26 C 35 28.210938 33.433594 30 31.5 30 Z"></path>
  </svg>
);

// Contact form skeleton loader
const ContactFormSkeleton = ({ darkMode }: { darkMode: boolean }) => (
  <div className="space-y-6">
    {/* Naam veld */}
    <div className="space-y-2">
      <div
        className={`h-4 rounded w-16 animate-pulse ${
          darkMode
            ? "bg-gradient-to-r from-gray-700 to-gray-600"
            : "bg-gradient-to-r from-gray-200 to-gray-300"
        }`}
      />
      <div
        className={`h-12 rounded-lg animate-pulse ${
          darkMode
            ? "bg-gradient-to-r from-gray-700 to-gray-600"
            : "bg-gradient-to-r from-gray-200 to-gray-300"
        }`}
      />
    </div>

    {/* Email veld */}
    <div className="space-y-2">
      <div
        className={`h-4 rounded w-20 animate-pulse ${
          darkMode
            ? "bg-gradient-to-r from-gray-700 to-gray-600"
            : "bg-gradient-to-r from-gray-200 to-gray-300"
        }`}
      />
      <div
        className={`h-12 rounded-lg animate-pulse ${
          darkMode
            ? "bg-gradient-to-r from-gray-700 to-gray-600"
            : "bg-gradient-to-r from-gray-200 to-gray-300"
        }`}
      />
    </div>

    {/* Bericht veld */}
    <div className="space-y-2">
      <div
        className={`h-4 rounded w-16 animate-pulse ${
          darkMode
            ? "bg-gradient-to-r from-gray-700 to-gray-600"
            : "bg-gradient-to-r from-gray-200 to-gray-300"
        }`}
      />
      <div
        className={`h-32 rounded-lg animate-pulse ${
          darkMode
            ? "bg-gradient-to-r from-gray-700 to-gray-600"
            : "bg-gradient-to-r from-gray-200 to-gray-300"
        }`}
      />
    </div>

    {/* reCAPTCHA */}
    <div
      className={`h-20 rounded-lg animate-pulse ${
        darkMode
          ? "bg-gradient-to-r from-gray-700 to-gray-600"
          : "bg-gradient-to-r from-gray-200 to-gray-300"
      }`}
    />

    {/* Submit knop */}
    <div
      className={`h-12 rounded-lg animate-pulse ${
        darkMode
          ? "bg-gradient-to-r from-blue-700 to-blue-600"
          : "bg-gradient-to-r from-blue-200 to-blue-300"
      }`}
    />
  </div>
);

// Contact info skeleton loader
const ContactInfoSkeleton = ({ darkMode }: { darkMode: boolean }) => (
  <div className="space-y-8">
    <div
      className={`h-6 rounded w-32 animate-pulse ${
        darkMode
          ? "bg-gradient-to-r from-gray-700 to-gray-600"
          : "bg-gradient-to-r from-gray-200 to-gray-300"
      }`}
    />

    {/* Contact items */}
    {Array.from({ length: 3 }).map((_, i) => (
      <motion.div
        key={i}
        className="space-y-3"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: i * 0.2 }}
      >
        <div className="flex items-center space-x-4">
          <div
            className={`w-10 h-10 rounded-full animate-pulse ${
              darkMode
                ? "bg-gradient-to-br from-blue-700 to-blue-600"
                : "bg-gradient-to-br from-blue-200 to-blue-300"
            }`}
          />
          <div className="flex-1 space-y-2">
            <div
              className={`h-5 rounded w-24 animate-pulse ${
                darkMode
                  ? "bg-gradient-to-r from-gray-700 to-gray-600"
                  : "bg-gradient-to-r from-gray-200 to-gray-300"
              }`}
            />
            <div
              className={`h-4 rounded w-40 animate-pulse ${
                darkMode
                  ? "bg-gradient-to-r from-gray-700 to-gray-600"
                  : "bg-gradient-to-r from-gray-200 to-gray-300"
              }`}
            />
          </div>
        </div>
      </motion.div>
    ))}

    {/* Sociale media */}
    <div
      className={`pt-6 border-t space-y-4 ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div
        className={`h-5 rounded w-32 animate-pulse ${
          darkMode
            ? "bg-gradient-to-r from-gray-700 to-gray-600"
            : "bg-gradient-to-r from-gray-200 to-gray-300"
        }`}
      />
      <div className="flex space-x-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className={`w-10 h-10 rounded-full animate-pulse ${
              darkMode
                ? "bg-gradient-to-br from-gray-700 to-gray-600"
                : "bg-gradient-to-br from-gray-200 to-gray-300"
            }`}
          />
        ))}
      </div>
    </div>

    {/* Quote */}
    <div
      className={`pt-6 border-t space-y-3 ${
        darkMode ? "border-gray-700" : "border-gray-200"
      }`}
    >
      <div
        className={`h-4 rounded w-full animate-pulse ${
          darkMode
            ? "bg-gradient-to-r from-gray-700 to-gray-600"
            : "bg-gradient-to-r from-gray-200 to-gray-300"
        }`}
      />
      <div
        className={`h-4 rounded w-3/4 animate-pulse ${
          darkMode
            ? "bg-gradient-to-r from-gray-700 to-gray-600"
            : "bg-gradient-to-r from-gray-200 to-gray-300"
        }`}
      />
    </div>
  </div>
);

// Contact loader met thematische elementen
const ContactLoader = ({ darkMode }: { darkMode: boolean }) => (
  <div className="flex flex-col items-center justify-center py-16">
    <motion.div
      className="relative mb-8"
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div className="relative">
        {/* Zwevende email iconen */}
        {Array.from({ length: 3 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 text-5xl"
            style={{ left: i * 25, top: i * -5 }}
            animate={{
              opacity: [0, 1, 0],
              scale: [0, 1.2, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.8,
              ease: "easeInOut",
            }}
          >
            💌
          </motion.div>
        ))}

        {/* Centrale sparkle effect */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Sparkles
            className={`${darkMode ? "text-blue-400" : "text-blue-500"}`}
            size={32}
          />
        </motion.div>
      </motion.div>
    </motion.div>

    <motion.div
      className="text-center space-y-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <motion.p
        className={`text-xl font-semibold ${
          darkMode ? "text-gray-100" : "text-gray-900"
        }`}
        animate={{ opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        Contact formulier wordt voorbereid...
      </motion.p>

      {/* Stappen indicator */}
      <div className="flex items-center justify-center space-x-6 mt-6">
        {[
          { icon: User, label: "Formulier", delay: 0 },
          { icon: Shield, label: "Beveiliging", delay: 0.6 },
          { icon: Mail, label: "Email Service", delay: 1.2 },
        ].map(({ icon: Icon, label, delay }) => (
          <motion.div
            key={label}
            className="flex flex-col items-center space-y-2"
            initial={{ opacity: 0.3, scale: 0.8 }}
            animate={{
              opacity: [0.3, 1, 0.3],
              scale: [0.8, 1, 0.8],
            }}
            transition={{
              duration: 2.4,
              repeat: Infinity,
              delay: delay,
              ease: "easeInOut",
            }}
          >
            <div
              className={`p-3 rounded-full ${
                darkMode ? "bg-blue-900/30" : "bg-blue-100"
              }`}
            >
              <Icon
                className={`${darkMode ? "text-blue-400" : "text-blue-600"}`}
                size={20}
              />
            </div>
            <span
              className={`text-sm font-medium ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              {label}
            </span>
          </motion.div>
        ))}
      </div>

      {/* Progress bar */}
      <div className="w-64 mx-auto mt-8">
        <div
          className={`h-2 rounded-full overflow-hidden ${
            darkMode ? "bg-gray-700" : "bg-gray-200"
          }`}
        >
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </motion.div>
  </div>
);

const Contact = () => {
  const { darkMode } = useDarkMode();
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSending, setIsSending] = useState(false);
  const [success, setSuccess] = useState<boolean | null>(null);
  const [recaptchaToken, setRecaptchaToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const recaptchaRef = useRef<ReCAPTCHA>(null);

  // Simuleer loading tijd
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Real-time validatie fout wissen
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};

    // Naam validatie
    if (!formData.name.trim()) {
      errors.name = "Naam is verplicht";
    } else if (formData.name.trim().length < 2) {
      errors.name = "Naam moet minimaal 2 tekens bevatten";
    }

    // Email validatie
    if (!formData.email.trim()) {
      errors.email = "E-mail is verplicht";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = "Voer een geldig e-mailadres in";
    } else {
      // Check verdachte patronen
      const domain = formData.email.split("@")[1].toLowerCase();
      const isSuspiciousPattern = SUSPICIOUS_PATTERNS.some((pattern) =>
        pattern.test(formData.email.toLowerCase())
      );
      const isSuspiciousDomain = SUSPICIOUS_DOMAINS.includes(domain);

      if (isSuspiciousPattern || isSuspiciousDomain) {
        errors.email =
          "Dit e-mailadres lijkt niet geldig. Gebruik een persoonlijk of zakelijk e-mailadres.";
      }
    }

    // Bericht validatie
    if (!formData.message.trim()) {
      errors.message = "Bericht is verplicht";
    } else if (formData.message.trim().length < 10) {
      errors.message = "Bericht moet minimaal 10 tekens bevatten";
    }

    // reCAPTCHA validatie
    if (!recaptchaToken) {
      errors.recaptcha = "Bevestig dat je geen robot bent";
    }

    return errors;
  };

  const handleRecaptchaChange = (token: string | null) => {
    setRecaptchaToken(token);
    if (errors.recaptcha) {
      setErrors((prev) => ({ ...prev, recaptcha: undefined }));
    }
  };

  const handleRecaptchaExpired = () => {
    setRecaptchaToken(null);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSending(true);

    try {
      const templateParams = {
        name: formData.name,
        email: formData.email,
        message: formData.message,
        "g-recaptcha-response": recaptchaToken,
      };

      const response = await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        templateParams,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || ""
      );
      console.log("Email sent successfully:", response);
      setSuccess(true);
      setFormData({ name: "", email: "", message: "" });
      setErrors({});
      setRecaptchaToken(null);

      // Reset reCAPTCHA
      if (recaptchaRef.current) {
        recaptchaRef.current.reset();
      }
    } catch (error) {
      setSuccess(false);
      console.error("Error sending email:", error);
    }

    setIsSending(false);
  };

  // Loading state
  if (loading) {
    return (
      <section id="contact" className="mb-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-4xl font-bold text-center mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Contacteer mij
          </h2>
          <p
            className={`text-center mb-8 max-w-2xl mx-auto leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Heb je vragen, een interessant project, of wil je gewoon even
            kennismaken?
            <br />
            Stuur me een bericht via het contactformulier of neem contact op via
            e-mail of sociale media.
          </p>
        </motion.div>

        <ContactLoader darkMode={darkMode} />

        {/* Loading skeleton */}
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-12">
            <div className="lg:col-span-2">
              <div
                className={`backdrop-blur-sm rounded-2xl shadow-xl p-8 border ${
                  darkMode
                    ? "bg-gray-900/90 border-gray-700/50"
                    : "bg-white/90 border-gray-200/50"
                }`}
              >
                <div
                  className={`h-6 rounded w-40 animate-pulse mb-8 ${
                    darkMode
                      ? "bg-gradient-to-r from-gray-700 to-gray-600"
                      : "bg-gradient-to-r from-gray-200 to-gray-300"
                  }`}
                />
                <ContactFormSkeleton darkMode={darkMode} />
              </div>
            </div>

            <div className="lg:col-span-1">
              <div
                className={`backdrop-blur-sm rounded-2xl shadow-xl p-8 h-full border ${
                  darkMode
                    ? "bg-gray-900/90 border-gray-700/50"
                    : "bg-white/90 border-gray-200/50"
                }`}
              >
                <ContactInfoSkeleton darkMode={darkMode} />
              </div>
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
        key="contact-loaded"
      >
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
            Laten we in contact komen
          </h2>
          <div className="flex items-center justify-center space-x-4 mb-6">
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 max-w-32" />
            <MessageCircle className="text-blue-500" size={24} />
            <div className="h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent flex-1 max-w-32" />
          </div>
          <p
            className={`text-center text-lg max-w-2xl mx-auto leading-relaxed ${
              darkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Heb je vragen, een interessant project, of wil je gewoon even
            kennismaken? Ik sta altijd open voor nieuwe kansen en
            samenwerkingen.
          </p>
        </motion.div>

        <motion.div
          className="max-w-6xl mx-auto px-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact formulier */}
            <motion.div
              className="lg:col-span-2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div
                className={`backdrop-blur-sm rounded-2xl shadow-xl p-8 border hover:shadow-2xl transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-900/90 border-gray-700/50"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-3 mb-6">
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? "bg-blue-900/30" : "bg-blue-100"
                    }`}
                  >
                    <Send
                      className={`${
                        darkMode ? "text-blue-400" : "text-blue-600"
                      }`}
                      size={20}
                    />
                  </div>
                  <h3
                    className={`text-2xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Stuur een bericht
                  </h3>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Naam veld */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <label
                      htmlFor="name"
                      className={`flex items-center text-sm font-semibold mb-2 ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <User size={16} className="mr-2 text-blue-500" />
                      Naam *
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 placeholder-gray-400 ${
                        errors.name
                          ? `border-red-500 ${
                              darkMode
                                ? "bg-red-900/10 text-white"
                                : "bg-red-50 text-gray-900"
                            }`
                          : `focus:border-blue-500 ${
                              darkMode
                                ? "border-gray-600 bg-gray-800/50 text-white"
                                : "border-gray-300 bg-white text-gray-900"
                            }`
                      }`}
                      placeholder="Jouw volledige naam"
                    />
                    {errors.name && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2 flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {errors.name}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Email veld */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <label
                      htmlFor="email"
                      className={`flex items-center text-sm font-semibold mb-2 ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <Mail size={16} className="mr-2 text-blue-500" />
                      E-mailadres *
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 placeholder-gray-400 ${
                        errors.email
                          ? `border-red-500 ${
                              darkMode
                                ? "bg-red-900/10 text-white"
                                : "bg-red-50 text-gray-900"
                            }`
                          : `focus:border-blue-500 ${
                              darkMode
                                ? "border-gray-600 bg-gray-800/50 text-white"
                                : "border-gray-300 bg-white text-gray-900"
                            }`
                      }`}
                      placeholder="jouw@email.com"
                    />
                    {errors.email && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2 flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {errors.email}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Bericht veld */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <label
                      htmlFor="message"
                      className={`flex items-center text-sm font-semibold mb-2 ${
                        darkMode ? "text-gray-200" : "text-gray-700"
                      }`}
                    >
                      <MessageCircle size={16} className="mr-2 text-blue-500" />
                      Bericht *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all duration-200 placeholder-gray-400 resize-none ${
                        errors.message
                          ? `border-red-500 ${
                              darkMode
                                ? "bg-red-900/10 text-white"
                                : "bg-red-50 text-gray-900"
                            }`
                          : `focus:border-blue-500 ${
                              darkMode
                                ? "border-gray-600 bg-gray-800/50 text-white"
                                : "border-gray-300 bg-white text-gray-900"
                            }`
                      }`}
                      placeholder="Vertel me over jouw project of stel jouw vraag..."
                    />
                    {errors.message && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2 flex items-center"
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {errors.message}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* reCAPTCHA */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex justify-center"
                  >
                    <div className="transform scale-90">
                      <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={
                          process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""
                        }
                        onChange={handleRecaptchaChange}
                        onExpired={handleRecaptchaExpired}
                        theme={darkMode ? "dark" : "light"}
                      />
                    </div>
                    {errors.recaptcha && (
                      <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-red-500 text-sm mt-2 flex items-center absolute"
                        style={{ top: "100%" }}
                      >
                        <AlertCircle size={16} className="mr-1" />
                        {errors.recaptcha}
                      </motion.p>
                    )}
                  </motion.div>

                  {/* Submit knop */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 }}
                    className="pt-4"
                  >
                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl text-lg font-semibold px-8 py-4 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center space-x-3 shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98]"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="animate-spin" size={20} />
                          <span>Bericht wordt verzonden...</span>
                        </>
                      ) : (
                        <>
                          <Send size={20} />
                          <span>Verstuur bericht</span>
                        </>
                      )}
                    </button>
                  </motion.div>

                  {/* Success/Error bericht */}
                  <AnimatePresence>
                    {success !== null && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className={`p-4 rounded-xl flex items-center space-x-3 ${
                          success
                            ? `border ${
                                darkMode
                                  ? "bg-green-900/20 text-green-200 border-green-700"
                                  : "bg-green-100 text-green-800 border-green-300"
                              }`
                            : `border ${
                                darkMode
                                  ? "bg-red-900/20 text-red-200 border-red-700"
                                  : "bg-red-100 text-red-800 border-red-300"
                              }`
                        }`}
                      >
                        {success ? (
                          <>
                            <Check
                              className={`${
                                darkMode ? "text-green-400" : "text-green-600"
                              }`}
                              size={20}
                            />
                            <div>
                              <p className="font-semibold">
                                Bericht verzonden!
                              </p>
                              <p className="text-sm opacity-90">
                                Bedankt voor je bericht. Ik neem zo snel
                                mogelijk contact met je op.
                              </p>
                            </div>
                          </>
                        ) : (
                          <>
                            <AlertCircle
                              className={`${
                                darkMode ? "text-red-400" : "text-red-600"
                              }`}
                              size={20}
                            />
                            <div>
                              <p className="font-semibold">
                                Er is iets misgegaan
                              </p>
                              <p className="text-sm opacity-90">
                                Probeer het opnieuw of neem direct contact op
                                via e-mail.
                              </p>
                            </div>
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
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div
                className={`backdrop-blur-sm rounded-2xl shadow-xl p-8 h-full border hover:shadow-2xl transition-all duration-300 ${
                  darkMode
                    ? "bg-gray-900/90 border-gray-700/50"
                    : "bg-white border-gray-200"
                }`}
              >
                <div className="flex items-center space-x-3 mb-8">
                  <div
                    className={`p-2 rounded-lg ${
                      darkMode ? "bg-green-900/30" : "bg-green-100"
                    }`}
                  >
                    <MessageCircle
                      className={`${
                        darkMode ? "text-green-400" : "text-green-600"
                      }`}
                      size={20}
                    />
                  </div>
                  <h3
                    className={`text-2xl font-bold ${
                      darkMode ? "text-white" : "text-gray-900"
                    }`}
                  >
                    Contact informatie
                  </h3>
                </div>

                {/* Contact details */}
                <div className="space-y-6">
                  {/* E-mail */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="group"
                  >
                    <div
                      className={`flex items-start space-x-4 p-4 rounded-xl transition-colors duration-200 ${
                        darkMode
                          ? "bg-gray-800/50 hover:bg-blue-900/10"
                          : "bg-blue-50 hover:bg-blue-100"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          darkMode
                            ? "bg-blue-900/30 group-hover:bg-blue-900/50"
                            : "bg-blue-100 group-hover:bg-blue-200"
                        }`}
                      >
                        <Mail
                          className={`${
                            darkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                          size={20}
                        />
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-semibold text-sm uppercase tracking-wide mb-1 ${
                            darkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          E-mail
                        </h4>
                        <a
                          href="mailto:milansk05@gmail.com"
                          className={`hover:underline font-medium ${
                            darkMode ? "text-blue-400" : "text-blue-600"
                          }`}
                        >
                          milansk05@gmail.com
                        </a>
                      </div>
                    </div>
                  </motion.div>

                  {/* Locatie */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="group"
                  >
                    <div
                      className={`flex items-start space-x-4 p-4 rounded-xl transition-colors duration-200 ${
                        darkMode
                          ? "bg-gray-800/50 hover:bg-green-900/10"
                          : "bg-green-50 hover:bg-green-100"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          darkMode
                            ? "bg-green-900/30 group-hover:bg-green-900/50"
                            : "bg-green-100 group-hover:bg-green-200"
                        }`}
                      >
                        <MapPin
                          className={`${
                            darkMode ? "text-green-400" : "text-green-600"
                          }`}
                          size={20}
                        />
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-semibold text-sm uppercase tracking-wide mb-1 ${
                            darkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          Locatie
                        </h4>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Elsen, Overijssel, Nederland
                        </p>
                      </div>
                    </div>
                  </motion.div>

                  {/* Responstijd */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="group"
                  >
                    <div
                      className={`flex items-start space-x-4 p-4 rounded-xl transition-colors duration-200 ${
                        darkMode
                          ? "bg-gray-800/50 hover:bg-purple-900/10"
                          : "bg-purple-50 hover:bg-purple-100"
                      }`}
                    >
                      <div
                        className={`p-2 rounded-lg transition-colors duration-200 ${
                          darkMode
                            ? "bg-purple-900/30 group-hover:bg-purple-900/50"
                            : "bg-purple-100 group-hover:bg-purple-200"
                        }`}
                      >
                        <Clock
                          className={`${
                            darkMode ? "text-purple-400" : "text-purple-600"
                          }`}
                          size={20}
                        />
                      </div>
                      <div className="flex-1">
                        <h4
                          className={`font-semibold text-sm uppercase tracking-wide mb-1 ${
                            darkMode ? "text-gray-200" : "text-gray-700"
                          }`}
                        >
                          Responstijd
                        </h4>
                        <p
                          className={`font-medium ${
                            darkMode ? "text-gray-300" : "text-gray-600"
                          }`}
                        >
                          Binnen 24 uur
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Sociale media */}
                <div
                  className={`mt-8 pt-8 border-t ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                >
                  <h4
                    className={`font-semibold text-sm uppercase tracking-wide mb-4 flex items-center ${
                      darkMode ? "text-gray-200" : "text-gray-700"
                    }`}
                  >
                    <Sparkles size={16} className="mr-2 text-blue-500" />
                    Volg mij op social media
                  </h4>
                  <div className="flex space-x-3">
                    {[
                      {
                        href: "https://github.com/milansk05",
                        label: "GitHub profiel",
                        icon: (
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="inline-block"
                          >
                            <path d="M12 2C6.477 2 2 6.484 2 12.021c0 4.428 2.865 8.184 6.839 9.504.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.342-3.369-1.342-.454-1.154-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.004.07 1.532 1.032 1.532 1.032.892 1.53 2.341 1.088 2.91.832.091-.647.35-1.088.636-1.339-2.221-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.987 1.029-2.687-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.025A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.295 2.748-1.025 2.748-1.025.546 1.378.203 2.397.1 2.65.64.7 1.028 1.594 1.028 2.687 0 3.847-2.337 4.695-4.566 4.944.359.309.678.919.678 1.852 0 1.336-.012 2.417-.012 2.747 0 .267.18.577.688.479C19.138 20.2 22 16.447 22 12.021 22 6.484 17.523 2 12 2z" />
                          </svg>
                        ),
                        color: darkMode
                          ? "hover:bg-gray-700"
                          : "hover:bg-gray-100",
                      },
                      {
                        href: "https://www.linkedin.com/in/milan-snoeijink-797315292/",
                        label: "LinkedIn profiel",
                        icon: (
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="inline-block"
                          >
                            <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z" />
                          </svg>
                        ),
                        color: darkMode
                          ? "hover:bg-blue-900/30"
                          : "hover:bg-blue-100",
                      },
                      {
                        href: "https://instagram.com/milan.sk19",
                        label: "Instagram profiel",
                        icon: (
                          <svg
                            width={20}
                            height={20}
                            viewBox="0 0 24 24"
                            fill="currentColor"
                            className="inline-block"
                          >
                            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 1.366.062 2.633.334 3.608 1.308.974.974 1.246 2.241 1.308 3.608.058 1.266.069 1.646.069 4.85s-.012 3.584-.07 4.85c-.062 1.366-.334 2.633-1.308 3.608-.974.974-2.241 1.246-3.608 1.308-1.266.058-1.646.069-4.85.069s-3.584-.012-4.85-.07c-1.366-.062-2.633-.334-3.608-1.308-.974-.974-1.246-2.241-1.308-3.608C2.175 15.647 2.163 15.267 2.163 12s.012-3.584.07-4.85c.059-1.281.353-2.393 1.334-3.374.981-.981 2.093-1.275 3.374-1.334C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.741 0 8.332.013 7.052.072 5.771.131 4.659.425 3.678 1.406c-.981.981-1.275 2.093-1.334 3.374C2.013 5.668 2 6.077 2 12c0 5.923.013 6.332.072 7.612.059 1.281.353 2.393 1.334 3.374.981.981 2.093 1.275 3.374 1.334C8.332 23.987 8.741 24 12 24s3.668-.013 4.948-.072c1.281-.059 2.393-.353 3.374-1.334.981-.981 1.275-2.093 1.334-3.374.059-1.28.072-1.689.072-7.612 0-5.923-.013-6.332-.072-7.612-.059-1.281-.353-2.393-1.334-3.374-.981-.981-2.093-1.275-3.374-1.334C15.668.013 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zm0 10.162a3.999 3.999 0 1 1 0-7.998 3.999 3.999 0 0 1 0 7.998zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
                          </svg>
                        ),
                        color: darkMode
                          ? "hover:bg-pink-900/30"
                          : "hover:bg-pink-100",
                      },
                      {
                        href: "https://discord.com/users/mrllama.",
                        label: "Discord profiel",
                        icon: <DiscordIcon size={20} />,
                        color: darkMode
                          ? "hover:bg-indigo-900/30"
                          : "hover:bg-indigo-100",
                      },
                    ].map((social) => (
                      <motion.a
                        key={social.href}
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-3 rounded-xl transition-all duration-200 ${
                          social.color
                        } transform hover:scale-110 active:scale-95 ${
                          darkMode
                            ? "text-gray-400 hover:text-white"
                            : "text-gray-600 hover:text-gray-900"
                        }`}
                        aria-label={social.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 }}
                        whileHover={{ y: -2 }}
                      >
                        {social.icon}
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Inspirerende quote */}
                <motion.div
                  className={`mt-8 pt-8 border-t ${
                    darkMode ? "border-gray-700" : "border-gray-200"
                  }`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="relative">
                    <div className="absolute -top-2 -left-2 text-3xl text-blue-500/30 font-serif">
                      &quot;
                    </div>
                    <p
                      className={`italic text-sm leading-relaxed pl-4 ${
                        darkMode ? "text-gray-400" : "text-gray-600"
                      }`}
                    >
                      Ik sta altijd open voor interessante projecten, nieuwe
                      samenwerkingen en creatieve uitdagingen. Laten we samen
                      iets moois bouwen!
                    </p>
                    <div className="absolute -bottom-4 -right-2 text-3xl text-blue-500/30 font-serif rotate-180">
                      &quot;
                    </div>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </motion.section>
    </AnimatePresence>
  );
};

export default Contact;
