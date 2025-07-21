"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"
import {
  Mail,
  Phone,
  MapPin,
  Download,
  Github,
  Linkedin,
  Code,
  Brain,
  Database,
  Globe,
  Settings,
  Languages,
  GraduationCap,
  Sparkles,
  Zap,
  Target,
  CheckCircle,
  Lock,
  TestTube,
  ImageIcon,
  Send,
  ArrowUp,
  Star,
  Camera,
  ArrowRight,
  Heart,
  Coffee,
  ExternalLink,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { jsPDF } from "jspdf"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const fadeInLeft = {
  initial: { opacity: 0, x: -60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const fadeInRight = {
  initial: { opacity: 0, x: 60 },
  animate: { opacity: 1, x: 0 },
  transition: { duration: 0.8, ease: [0.6, -0.05, 0.01, 0.99] },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1,
    },
  },
}

const FloatingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    animate={{
      y: [0, -15, 0],
      rotate: [0, 2, -2, 0],
      scale: [1, 1.05, 1],
    }}
    transition={{
      duration: 8,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
)

const PulsingElement = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    animate={{
      scale: [1, 1.1, 1],
      opacity: [0.8, 1, 0.8],
    }}
    transition={{
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      delay,
      ease: "easeInOut",
    }}
  >
    {children}
  </motion.div>
)

const SectionDivider = () => (
  <div className="flex items-center justify-center my-20">
    <motion.div
      className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 dark:via-amber-500 to-transparent"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
    <PulsingElement>
      <div className="mx-4 w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-600 rounded-full shadow-lg" />
    </PulsingElement>
    <motion.div
      className="flex-1 h-px bg-gradient-to-r from-transparent via-amber-400 dark:via-amber-500 to-transparent"
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      transition={{ duration: 1.5, ease: "easeInOut" }}
    />
  </div>
)

const Logo = () => (
  <motion.div
    whileHover={{ scale: 1.15, rotate: 10 }}
    whileTap={{ scale: 0.95 }}
    className="w-12 h-12 bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 rounded-xl flex items-center justify-center shadow-xl"
  >
    <motion.span
      className="text-white font-bold text-lg"
      animate={{
        textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 10px rgba(255,255,255,0.5)", "0 0 0px rgba(255,255,255,0)"],
      }}
      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
    >
      OB
    </motion.span>
  </motion.div>
)

export default function Portfolio() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle")
  const [showScrollTop, setShowScrollTop] = useState(false)

  const { scrollYProgress } = useScroll()
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"])

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("https://formspree.io/f/xldlgpdw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitStatus("success")
        setFormData({ name: "", email: "", message: "" })
      } else {
        setSubmitStatus("error")
      }
    } catch (error) {
      setSubmitStatus("error")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const downloadCV = () => {
    const doc = new jsPDF()

    // Set font and colors
    doc.setFont("helvetica")

    // Header
    doc.setFontSize(24)
    doc.setTextColor(245, 158, 11) // amber-500
    doc.text("Oumayma Bourmech", 20, 30)

    // Contact Info
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text("oumaimabourmech@aiesec.net | +216 99183285 | Tunisia", 20, 40)
    doc.text("linkedin.com/in/oumayma-bourmech-8b139b21a", 20, 45)

    // Summary
    doc.setFontSize(14)
    doc.setTextColor(245, 158, 11)
    doc.text("SUMMARY", 20, 60)
    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    const summaryText =
      "AI & Data Science professional with hands-on experience in machine learning, computer vision, deep learning, and full-stack AI development. Proven ability to design and deploy scalable models using PyTorch, YOLOv5, SQL/NoSQL, and modern web technologies. A quick learner with strong problem-solving skills and a drive to turn complex data into smart solutions."
    const splitSummary = doc.splitTextToSize(summaryText, 170)
    doc.text(splitSummary, 20, 70)

    // Professional Experience
    doc.setFontSize(14)
    doc.setTextColor(245, 158, 11)
    doc.text("PROFESSIONAL EXPERIENCE", 20, 95)

    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text("AI Developer Intern – KPIT (Volkswagen Project)", 20, 105)
    doc.setFontSize(10)
    doc.text("• Designed and built a test automation platform using Streamlit, Jenkins, and Excel tools.", 20, 112)
    doc.text("• Developed intelligent modules using PyTorch and deployed via Django and Electron + Next.js.", 20, 118)

    doc.setFontSize(12)
    doc.text("AI Research Intern – CRNS", 20, 130)
    doc.setFontSize(10)
    doc.text("• Researched and trained advanced GANs (StyleGAN2, CycleGAN, DCGAN) on real-world image data.", 20, 137)
    doc.text("• Applied motion-based deep learning to generate synthetic sequences for data augmentation.", 20, 143)

    doc.setFontSize(12)
    doc.text("Data Analyst Intern – Insurance & Reinsurance Company", 20, 155)
    doc.setFontSize(10)
    doc.text("• Reduced reporting time by 10% through optimized SQL/NoSQL pipelines and predictive modeling.", 20, 162)
    doc.text("• Built classification and recommendation tools using Python, pandas, and scikit-learn.", 20, 168)

    // Projects
    doc.setFontSize(14)
    doc.setTextColor(245, 158, 11)
    doc.text("PROJECTS", 20, 185)

    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text("Full-Stack AI Identity System", 20, 195)
    doc.setFontSize(10)
    doc.text("• Developed AI verification system with YOLOv5, PaddleOCR, dlib, and CompreFace", 20, 202)
    doc.text("• Integrated MongoDB & Hadoop for scalable biometric storage", 20, 208)
    doc.text("• Deployed using Docker on a Linux environment", 20, 214)

    doc.setFontSize(12)
    doc.text("YOLOv5 Data Labeling Pipeline", 20, 225)
    doc.setFontSize(10)
    doc.text("• Annotated 500+ images via MakeSense.ai for document detection", 20, 232)
    doc.text("• Cleaned and optimized dataset for better accuracy", 20, 238)

    // Education
    doc.setFontSize(14)
    doc.setTextColor(245, 158, 11)
    doc.text("EDUCATION", 20, 255)

    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text("Master's degree in Data Science, Higher Institute of Computer Science and Mathematics", 20, 265)
    doc.text("Bachelor's Degree in Applied Mathematics, Higher Institute of Computer Science and Mathematics", 20, 272)

    // Add new page for skills and more content
    doc.addPage()

    // Skills
    doc.setFontSize(14)
    doc.setTextColor(245, 158, 11)
    doc.text("SKILLS", 20, 30)

    doc.setFontSize(10)
    doc.setTextColor(0, 0, 0)
    doc.text(
      "AI & Machine Learning — PyTorch, scikit-learn, regression, classification, model evaluation, deep learning",
      20,
      40,
    )
    doc.text("Programming & Data Science — Python, pandas, NumPy, matplotlib, seaborn", 20, 47)
    doc.text("Computer Vision — YOLOv5, OpenCV, dlib, PaddleOCR, biometric image processing", 20, 54)
    doc.text("Databases & Big Data — MySQL, MongoDB, Hadoop, Apache Spark", 20, 61)
    doc.text("Web Development — Django, Electron, JavaScript, HTML, CSS", 20, 68)
    doc.text("Tools & Environments — Docker, Jenkins, Jupyter, Google Colab, Ubuntu/Linux", 20, 75)
    doc.text("Core Strengths — Quick learner, analytical thinker, problem solver, adaptable, team player", 20, 82)
    doc.text("Languages — English, French, Arabic", 20, 89)

    // Leadership & Volunteering
    doc.setFontSize(14)
    doc.setTextColor(245, 158, 11)
    doc.text("LEADERSHIP & VOLUNTEERING", 20, 110)

    doc.setFontSize(12)
    doc.setTextColor(0, 0, 0)
    doc.text("Global Classroom – AIESEC Turkey", 20, 120)
    doc.setFontSize(10)
    doc.text("Volunteered in a global classroom, teaching English and mathematics to diverse students.", 20, 127)

    doc.setFontSize(12)
    doc.text("Sales & International Relations Team Leader – AIESEC Tunisia", 20, 140)
    doc.setFontSize(10)
    doc.text("Led sales and international relations initiatives, developing leadership skills.", 20, 147)

    // Save the PDF
    doc.save("Oumayma_Bourmech_CV.pdf")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-100 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
      {/* Enhanced Background with More Animations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <motion.div
          style={{ y }}
          className="absolute inset-0 bg-gradient-to-r from-amber-600/8 via-orange-600/8 to-red-600/8"
          animate={{
            background: [
              "linear-gradient(to right, rgba(245, 158, 11, 0.08), rgba(234, 88, 12, 0.08), rgba(220, 38, 38, 0.08))",
              "linear-gradient(to right, rgba(234, 88, 12, 0.08), rgba(220, 38, 38, 0.08), rgba(245, 158, 11, 0.08))",
              "linear-gradient(to right, rgba(220, 38, 38, 0.08), rgba(245, 158, 11, 0.08), rgba(234, 88, 12, 0.08))",
            ],
          }}
          transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-20 left-20 w-72 h-72 bg-amber-500/15 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 6, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute bottom-20 right-20 w-96 h-96 bg-orange-600/15 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-red-500/10 rounded-full blur-3xl"
          animate={{
            x: [0, 100, 0],
            y: [0, -50, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      </div>

      {/* Navigation Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-amber-200 dark:border-amber-800"
      >
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Logo />
          <nav className="hidden md:flex items-center gap-8">
            {[
              { name: "About", href: "#about" },
              { name: "Projects", href: "#projects" },
              { name: "Skills", href: "#skills" },
              { name: "Contact", href: "#contact" },
            ].map((link, index) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="text-slate-600 dark:text-slate-300 hover:text-amber-600 dark:hover:text-amber-400 transition-all duration-300 relative"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                {link.name}
                <motion.div
                  className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500"
                  whileHover={{ width: "100%" }}
                  transition={{ duration: 0.3 }}
                />
              </motion.a>
            ))}
          </nav>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 py-20 pt-32">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            {/* Photo Section */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={fadeInLeft}
              className="flex justify-center lg:justify-end order-2 lg:order-1"
            >
              <div className="relative">
                <motion.div
                  className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden bg-gradient-to-br from-amber-500 via-orange-500 to-red-500 p-2 shadow-2xl"
                  animate={{
                    boxShadow: [
                      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                      "0 25px 50px -12px rgba(245, 158, 11, 0.4)",
                      "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
                    ],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                >
                  <div className="w-full h-full rounded-full bg-white dark:bg-slate-800 flex items-center justify-center overflow-hidden">
                    <img
                      src="/images/oumayma-profile.jpg"
                      alt="Oumayma Bourmech"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </motion.div>

                {/* Enhanced Floating decorative elements */}
                <FloatingElement delay={0}>
                  <motion.div
                    className="absolute -top-4 -right-4 w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.2, rotate: 180 }}
                  >
                    <Brain className="w-6 h-6 text-white" />
                  </motion.div>
                </FloatingElement>

                <FloatingElement delay={1}>
                  <motion.div
                    className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.2, rotate: -180 }}
                  >
                    <Code className="w-6 h-6 text-white" />
                  </motion.div>
                </FloatingElement>

                <FloatingElement delay={2}>
                  <motion.div
                    className="absolute top-1/2 -left-8 w-10 h-10 bg-gradient-to-br from-red-500 to-amber-500 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.3 }}
                  >
                    <Sparkles className="w-5 h-5 text-white" />
                  </motion.div>
                </FloatingElement>

                <FloatingElement delay={3}>
                  <motion.div
                    className="absolute top-1/4 -right-8 w-10 h-10 bg-gradient-to-br from-amber-600 to-orange-600 rounded-full flex items-center justify-center shadow-lg"
                    whileHover={{ scale: 1.3 }}
                  >
                    <Camera className="w-5 h-5 text-white" />
                  </motion.div>
                </FloatingElement>

                {/* Additional animated elements */}
                <motion.div
                  className="absolute top-10 left-10 w-6 h-6 bg-gradient-to-br from-yellow-400 to-orange-400 rounded-full opacity-60"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                />
                <motion.div
                  className="absolute bottom-10 right-10 w-4 h-4 bg-gradient-to-br from-red-400 to-pink-400 rounded-full opacity-60"
                  animate={{
                    scale: [0, 1, 0],
                    opacity: [0, 0.6, 0],
                  }}
                  transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: 2 }}
                />
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial="initial"
              animate="animate"
              variants={staggerContainer}
              className="text-center lg:text-left order-1 lg:order-2"
            >
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 px-4 py-2 rounded-full text-sm font-medium mb-8 border border-amber-200 dark:border-amber-700"
                whileHover={{ scale: 1.05 }}
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                >
                  <Star className="w-4 h-4" />
                </motion.div>
                Available for opportunities
              </motion.div>

              <motion.h1 variants={fadeInUp} className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
                <span className="text-slate-800 dark:text-white">👋 Hi, I'm</span>
                <br />
                <motion.span
                  className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 bg-clip-text text-transparent"
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                  style={{ backgroundSize: "200% 200%" }}
                >
                  Oumayma Bourmech
                </motion.span>
              </motion.h1>

              <motion.div variants={fadeInUp} className="space-y-4 mb-8">
                <motion.h2
                  className="text-2xl md:text-3xl text-slate-700 dark:text-slate-300 font-light"
                  whileHover={{ scale: 1.02 }}
                >
                  🎓 AI & Data Science Engineer
                </motion.h2>
                <motion.h3
                  className="text-xl md:text-2xl text-slate-600 dark:text-slate-400"
                  whileHover={{ scale: 1.02 }}
                >
                  👁️ Computer Vision Expert | Full-Stack Developer
                </motion.h3>
              </motion.div>

              <motion.p
                variants={fadeInUp}
                className="text-lg text-slate-600 dark:text-slate-400 mb-10 leading-relaxed max-w-2xl"
              >
                🚀 AI & Data Science professional with hands-on experience in machine learning, computer vision, deep
                learning, and full-stack AI development. Proven ability to design and deploy scalable models and turn
                complex data into smart solutions.
              </motion.p>

              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center lg:justify-start gap-6 mb-10">
                {[
                  { icon: MapPin, text: "Tunisia", color: "text-amber-500" },
                  { icon: Mail, text: "oumaimabourmech@aiesec.net", color: "text-orange-500" },
                  { icon: Phone, text: "+216 99183285", color: "text-red-500" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 text-slate-600 dark:text-slate-400"
                    whileHover={{ scale: 1.05, y: -2 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                    >
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </motion.div>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </motion.div>

              <motion.div variants={fadeInUp} className="flex flex-wrap justify-center lg:justify-start gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:via-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <a
                      href="https://linkedin.com/in/oumayma-bourmech-8b139b21a"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Linkedin className="w-5 h-5 mr-2" />
                      LinkedIn
                    </a>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    asChild
                    size="lg"
                    variant="outline"
                    className="border-2 border-slate-300 dark:border-slate-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-900/20 transition-all duration-300 bg-transparent"
                  >
                    <a href="https://github.com/oumaima221" target="_blank" rel="noopener noreferrer">
                      <Github className="w-5 h-5 mr-2" />
                      GitHub
                    </a>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={downloadCV}
                    size="lg"
                    className="bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    <motion.div
                      animate={{ y: [0, -2, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Download className="w-5 h-5 mr-2" />
                    </motion.div>
                    Download CV
                  </Button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* About Section */}
      <section id="about" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <motion.h2
                className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6"
                whileHover={{ scale: 1.02 }}
              >
                💡 About Me
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div variants={fadeInLeft} className="space-y-8">
                <motion.div
                  className="border-l-4 border-amber-500 pl-8 relative"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-orange-500 -ml-0.5"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                  />
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                    >
                      <Target className="w-8 h-8 text-amber-500" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-white">🎯 My Focus</h3>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    I'm a Master's student in <strong className="text-amber-600">Data Science</strong> with a strong
                    foundation in <strong className="text-orange-600">Applied Mathematics</strong>, specializing in
                    machine learning, computer vision, and full-stack AI development with proven ability to deploy
                    scalable models.
                  </p>
                </motion.div>

                <motion.div
                  className="border-l-4 border-orange-500 pl-8 relative"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500 -ml-0.5"
                    initial={{ height: 0 }}
                    whileInView={{ height: "100%" }}
                    transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                  />
                  <div className="flex items-center gap-4 mb-4">
                    <motion.div
                      animate={{
                        scale: [1, 1.2, 1],
                        rotate: [0, 180, 360],
                      }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                    >
                      <Zap className="w-8 h-8 text-orange-500" />
                    </motion.div>
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-white">⚡️ My Approach</h3>
                  </div>
                  <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    I combine creativity with cutting-edge technology, merging AI expertise with full-stack development
                    to deliver efficient, scalable solutions.
                  </p>
                </motion.div>
              </motion.div>

              <motion.div variants={fadeInRight} className="space-y-6">
                <motion.h3
                  className="text-3xl font-bold text-slate-800 dark:text-white mb-8"
                  whileHover={{ scale: 1.02 }}
                >
                  💻 What I've Built
                </motion.h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: Lock,
                      title: "🔐 Biometric ID Verification",
                      desc: "Full-stack systems with advanced security",
                      color: "from-amber-500 to-orange-500",
                    },
                    {
                      icon: TestTube,
                      title: "🧪 Test Report Platform",
                      desc: "Enterprise solutions for Volkswagen",
                      color: "from-orange-500 to-red-500",
                    },
                    {
                      icon: Brain,
                      title: "🧠 GAN-based Data Generation",
                      desc: "Research-grade AI model development",
                      color: "from-red-500 to-amber-500",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex items-start gap-4 p-6 bg-white/50 dark:bg-slate-800/50 rounded-2xl backdrop-blur-sm border border-amber-200/30 dark:border-amber-700/30"
                      whileHover={{
                        scale: 1.02,
                        y: -5,
                        boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                      }}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 }}
                    >
                      <motion.div
                        className={`w-12 h-12 bg-gradient-to-br ${item.color} rounded-lg flex items-center justify-center`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <item.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div>
                        <h4 className="text-xl font-bold text-slate-800 dark:text-white mb-2">{item.title}</h4>
                        <p className="text-slate-600 dark:text-slate-300">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Projects Section */}
      <section id="projects" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <motion.h2
                className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6"
                whileHover={{ scale: 1.02 }}
              >
                🚀 Featured Projects
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="space-y-20">
              {/* Project 1 */}
              <motion.div variants={fadeInUp} className="relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    className="space-y-6"
                    whileHover={{ x: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Lock className="w-8 h-8 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                          🔐 Biometric Identity Verification
                        </h3>
                        <p className="text-orange-600 dark:text-orange-400 font-medium">Personal Project</p>
                      </div>
                    </div>

                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      An advanced AI-powered system that authenticates users through ID card analysis and live facial
                      verification, ensuring secure and reliable identity confirmation.
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-slate-800 dark:text-white font-bold text-lg">✨ Key Features</h4>
                      <div className="space-y-3">
                        {[
                          "Real-time face detection & OCR processing",
                          "Advanced liveness detection using facial landmarks",
                          "Secure matching & storage via CompreFace & MongoDB",
                          "Containerized deployment with Docker on Linux",
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <CheckCircle className="w-5 h-5 text-amber-500" />
                            </motion.div>
                            <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {["YOLOv5", "PaddleOCR", "dlib", "CompreFace", "Django", "MongoDB", "Docker", "Hadoop"].map(
                        (tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
                              {tech}
                            </Badge>
                          </motion.div>
                        ),
                      )}
                    </div>

                    <div className="pt-4">
                      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                        <Button
                          asChild
                          variant="outline"
                          className="border-amber-500 text-amber-600 hover:bg-gradient-to-r hover:from-amber-50 hover:to-orange-50 dark:hover:from-amber-900/20 dark:hover:to-orange-900/20 bg-transparent"
                        >
                          <a
                            href="https://github.com/oumaima221/identity_verification"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <Github className="w-4 h-4 mr-2" />
                            View Repository
                            <ExternalLink className="w-4 h-4 ml-2" />
                          </a>
                        </Button>
                      </motion.div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="flex items-center justify-center p-12 bg-gradient-to-br from-amber-100/70 to-orange-100/70 dark:from-amber-900/20 dark:to-orange-900/20 rounded-3xl border border-amber-200/50 dark:border-amber-700/50"
                    whileHover={{ scale: 1.02, rotate: 1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                          scale: [1, 1.1, 1],
                        }}
                        transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Lock className="w-32 h-32 text-amber-500 mx-auto mb-6" />
                      </motion.div>
                      <p className="text-slate-600 dark:text-slate-400 italic">🔗 Open Source Repository Available</p>
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Project 2 */}
              <motion.div variants={fadeInUp} className="relative">
                <div className="grid lg:grid-cols-2 gap-12 items-center">
                  <motion.div
                    className="flex items-center justify-center p-12 bg-gradient-to-br from-orange-100/70 to-red-100/70 dark:from-orange-900/20 dark:to-red-900/20 rounded-3xl order-2 lg:order-1 border border-orange-200/50 dark:border-orange-700/50"
                    whileHover={{ scale: 1.02, rotate: -1 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="text-center">
                      <motion.div
                        animate={{
                          y: [0, -10, 0],
                          rotate: [0, 5, -5, 0],
                        }}
                        transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <TestTube className="w-32 h-32 text-orange-500 mx-auto mb-6" />
                      </motion.div>
                      <p className="text-slate-600 dark:text-slate-400 italic">🔒 Confidential - NDA Protected</p>
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-6 order-1 lg:order-2"
                    whileHover={{ x: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <TestTube className="w-8 h-8 text-white" />
                      </motion.div>
                      <div>
                      <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                          🧪 Test Report Platform
                        </h3>
                        <p className="text-orange-600 dark:text-orange-400 font-medium">
                          AI Developer Intern @ KPIT Technologies
                        </p>
                      </div>
                    </div>

                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      Developed a comprehensive test report platform for Volkswagen's automotive systems, enhancing quality assurance and reporting efficiency.
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-slate-800 dark:text-white font-bold text-lg">✨ Key Features</h4>
                      <div className="space-y-3">
                        {[
                          "Custom CI/CD test pipelines via Jenkins",
                          "Real-time analytics dashboard with Streamlit",
                          "Automated Excel-to-database data processing",
                          "Modern frontend with Electron + Next.js",
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <CheckCircle className="w-5 h-5 text-orange-500" />
                            </motion.div>
                            <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {["Streamlit", "Jenkins", "Python", "Excel Automation", "Django", "Electron", "Next.js"].map(
                        (tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            <Badge className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700">
                              {tech}
                            </Badge>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </motion.div>
                </div>
              </motion.div>

              {/* Continue with remaining projects with similar enhanced animations... */}
              {/* Project 3 */}
              <motion.div variants={fadeInUp} className="relative">
                <motion.div
                  className="max-w-4xl"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="space-y-6 p-8 bg-gradient-to-br from-red-50/50 to-amber-50/50 dark:from-red-900/10 dark:to-amber-900/10 rounded-3xl border border-red-200/30 dark:border-red-700/30">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-red-500 to-amber-500 rounded-2xl flex items-center justify-center shadow-xl"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <ImageIcon className="w-8 h-8 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                          🧠 GAN-Based Image Generation
                        </h3>
                        <p className="text-red-600 dark:text-red-400 font-medium">AI Research Intern @ CRNS</p>
                      </div>
                    </div>

                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      Advanced research project focused on training Generative Adversarial Networks to create synthetic
                      image sequences and enhance training datasets for computer vision applications.
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-slate-800 dark:text-white font-bold text-lg">✨ Key Achievements</h4>
                      <div className="space-y-3">
                        {[
                          "Successfully trained models on diverse real-world datasets",
                          "Generated motion-based outputs for data augmentation",
                          "Solved critical data scarcity issues in vision pipelines",
                        ].map((achievement, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <CheckCircle className="w-5 h-5 text-red-500" />
                            </motion.div>
                            <span className="text-slate-600 dark:text-slate-300">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {["StyleGAN2", "CycleGAN", "DCGAN", "PyTorch"].map((tech, index) => (
                        <motion.div
                          key={tech}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          transition={{ delay: index * 0.1 }}
                          whileHover={{ scale: 1.1, y: -2 }}
                        >
                          <Badge className="bg-gradient-to-r from-red-100 to-amber-100 dark:from-red-900/30 dark:to-amber-900/30 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-700">
                            {tech}
                          </Badge>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Project 4 - Data Analyst Intern */}
              <motion.div variants={fadeInUp} className="relative">
                <motion.div
                  className="max-w-4xl"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="space-y-6 p-8 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-3xl border border-amber-200/30 dark:border-amber-700/30">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center shadow-xl"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Database className="w-8 h-8 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                          📊 Data Analytics & Optimization
                        </h3>
                        <p className="text-amber-600 dark:text-amber-400 font-medium">
                          Data Analyst Intern @ Insurance & Reinsurance Company
                        </p>
                      </div>
                    </div>

                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      Optimized data pipelines and built predictive models to enhance business intelligence and reduce
                      reporting time by 10% through advanced SQL/NoSQL optimization.
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-slate-800 dark:text-white font-bold text-lg">✨ Key Achievements</h4>
                      <div className="space-y-3">
                        {[
                          "Reduced reporting time by 10% through optimized SQL/NoSQL pipelines",
                          "Built classification and recommendation tools using Python and scikit-learn",
                          "Implemented predictive modeling for business intelligence enhancement",
                        ].map((achievement, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <CheckCircle className="w-5 h-5 text-amber-500" />
                            </motion.div>
                            <span className="text-slate-600 dark:text-slate-300">{achievement}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {["Python", "pandas", "scikit-learn", "SQL", "NoSQL", "Predictive Modeling"].map(
                        (tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            <Badge className="bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/30 dark:to-orange-900/30 text-amber-700 dark:text-amber-300 border border-amber-200 dark:border-amber-700">
                              {tech}
                            </Badge>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Project 5 - YOLOv5 Data Labeling Pipeline */}
              <motion.div variants={fadeInUp} className="relative">
                <motion.div
                  className="max-w-4xl"
                  whileHover={{ scale: 1.01 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className="space-y-6 p-8 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10 rounded-3xl border border-orange-200/30 dark:border-orange-700/30">
                    <div className="flex items-center gap-4">
                      <motion.div
                        className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center shadow-xl"
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Target className="w-8 h-8 text-white" />
                      </motion.div>
                      <div>
                        <h3 className="text-3xl font-bold text-slate-800 dark:text-white">
                          🎯 YOLOv5 Data Labeling Pipeline
                        </h3>
                        <p className="text-orange-600 dark:text-orange-400 font-medium">Computer Vision Project</p>
                      </div>
                    </div>

                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      Comprehensive data preparation pipeline for document detection using YOLOv5, involving large-scale
                      image annotation and dataset optimization for enhanced model accuracy.
                    </p>

                    <div className="space-y-4">
                      <h4 className="text-slate-800 dark:text-white font-bold text-lg">✨ Key Features</h4>
                      <div className="space-y-3">
                        {[
                          "Annotated 500+ images via MakeSense.ai for document detection",
                          "Cleaned and optimized dataset for better accuracy",
                          "Implemented quality control measures for annotation consistency",
                        ].map((feature, index) => (
                          <motion.div
                            key={index}
                            className="flex items-center gap-3"
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ x: 5 }}
                          >
                            <motion.div
                              animate={{ rotate: 360 }}
                              transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                            >
                              <CheckCircle className="w-5 h-5 text-orange-500" />
                            </motion.div>
                            <span className="text-slate-600 dark:text-slate-300">{feature}</span>
                          </motion.div>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {["YOLOv5", "MakeSense.ai", "Data Annotation", "Computer Vision", "Dataset Optimization"].map(
                        (tech, index) => (
                          <motion.div
                            key={tech}
                            initial={{ opacity: 0, scale: 0 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.1, y: -2 }}
                          >
                            <Badge className="bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 text-orange-700 dark:text-orange-300 border border-orange-200 dark:border-orange-700">
                              {tech}
                            </Badge>
                          </motion.div>
                        ),
                      )}
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Skills Section */}
      <section id="skills" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <motion.h2
                className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6"
                whileHover={{ scale: 1.02 }}
              >
                🧰 Skills & Expertise
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
              {[
                {
                  icon: Brain,
                  title: "🧠 AI & Machine Learning",
                  skills: [
                    "PyTorch",
                    "scikit-learn",
                    "regression",
                    "classification",
                    "model evaluation",
                    "deep learning",
                  ],
                  color: "text-amber-500",
                  borderColor: "border-amber-500",
                  gradient: "from-amber-500 to-orange-500",
                },
                {
                  icon: Code,
                  title: "💻 Programming & Data Science",
                  skills: ["Python", "pandas", "NumPy", "matplotlib", "seaborn"],
                  color: "text-orange-500",
                  borderColor: "border-orange-500",
                  gradient: "from-orange-500 to-red-500",
                },
                {
                  icon: Sparkles,
                  title: "👁️ Computer Vision",
                  skills: ["YOLOv5", "OpenCV", "dlib", "PaddleOCR", "biometric processing"],
                  color: "text-red-500",
                  borderColor: "border-red-500",
                  gradient: "from-red-500 to-amber-500",
                },
                {
                  icon: Database,
                  title: "💾 Databases & Big Data",
                  skills: ["MySQL", "MongoDB", "Hadoop", "Apache Spark"],
                  color: "text-amber-600",
                  borderColor: "border-amber-600",
                  gradient: "from-amber-600 to-orange-600",
                },
                {
                  icon: Globe,
                  title: "🌐 Web Development",
                  skills: ["Django", "Electron", "JavaScript", "HTML", "CSS"],
                  color: "text-orange-600",
                  borderColor: "border-orange-600",
                  gradient: "from-orange-600 to-red-600",
                },
                {
                  icon: Settings,
                  title: "⚙️ Tools & Environments",
                  skills: ["Docker", "Jenkins", "Jupyter", "Google Colab", "Ubuntu/Linux"],
                  color: "text-red-600",
                  borderColor: "border-red-600",
                  gradient: "from-red-600 to-amber-600",
                },
              ].map((skill, index) => (
                <motion.div
                  key={index}
                  variants={fadeInUp}
                  className="space-y-4"
                  whileHover={{ scale: 1.02, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <motion.div
                    className={`border-l-4 ${skill.borderColor} pl-6 relative p-6 bg-white/30 dark:bg-slate-800/30 rounded-2xl backdrop-blur-sm border border-amber-200/30 dark:border-amber-700/30`}
                    initial={{ opacity: 0, x: -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <motion.div
                      className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${skill.gradient} -ml-0.5 rounded-full`}
                      initial={{ height: 0 }}
                      whileInView={{ height: "100%" }}
                      transition={{ duration: 1, ease: "easeInOut", delay: index * 0.1 }}
                    />
                    <div className="flex items-center gap-3 mb-4">
                      <motion.div
                        className={`w-10 h-10 bg-gradient-to-br ${skill.gradient} rounded-lg flex items-center justify-center shadow-lg`}
                        whileHover={{ rotate: 360, scale: 1.1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <skill.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <h3 className="text-xl font-bold text-slate-800 dark:text-white">{skill.title}</h3>
                    </div>
                    <div className="space-y-2">
                      {skill.skills.map((item, idx) => (
                        <motion.div
                          key={idx}
                          className="flex items-center gap-2"
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.1 + idx * 0.05 }}
                          whileHover={{ x: 5 }}
                        >
                          <motion.div
                            animate={{ rotate: [0, 180, 360] }}
                            transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          >
                            <ArrowRight className={`w-4 h-4 ${skill.color}`} />
                          </motion.div>
                          <span className="text-slate-600 dark:text-slate-300">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <motion.div
                variants={fadeInLeft}
                className="border-l-4 border-amber-500 pl-8 relative p-6 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-2xl"
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-orange-500 -ml-0.5 rounded-full"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{
                      rotate: [0, 360],
                      scale: [1, 1.1, 1],
                    }}
                    transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Star className="w-8 h-8 text-amber-500" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white">🌟 Core Strengths</h3>
                </div>
                <ul className="space-y-3">
                  {["Quick learner", "Analytical thinker", "Problem solver", "Adaptable team player"].map(
                    (strength, index) => (
                      <motion.li
                        key={index}
                        className="flex items-center gap-3"
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ x: 5, scale: 1.02 }}
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                        >
                          <CheckCircle className="w-5 h-5 text-amber-500" />
                        </motion.div>
                        <span className="text-lg text-slate-600 dark:text-slate-300">{strength}</span>
                      </motion.li>
                    ),
                  )}
                </ul>
              </motion.div>

              <motion.div
                variants={fadeInRight}
                className="border-l-4 border-orange-500 pl-8 relative p-6 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10 rounded-2xl"
                whileHover={{ scale: 1.02, x: -5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500 -ml-0.5 rounded-full"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                />
                <div className="flex items-center gap-4 mb-6">
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
                  >
                    <Languages className="w-8 h-8 text-orange-500" />
                  </motion.div>
                  <h3 className="text-3xl font-bold text-slate-800 dark:text-white">🗣️ Languages</h3>
                </div>
                <div className="space-y-4">
                  {[
                    {
                      lang: "Arabic",
                      level: "Native",
                      gradient: "from-amber-100 to-orange-100",
                      textColor: "text-amber-700",
                      darkGradient: "dark:from-amber-900/30 dark:to-orange-900/30",
                      darkTextColor: "dark:text-amber-300",
                    },
                    {
                      lang: "English",
                      level: "Professional",
                      gradient: "from-orange-100 to-red-100",
                      textColor: "text-orange-700",
                      darkGradient: "dark:from-orange-900/30 dark:to-red-900/30",
                      darkTextColor: "dark:text-orange-300",
                    },
                    {
                      lang: "French",
                      level: "Intermediate",
                      gradient: "from-red-100 to-amber-100",
                      textColor: "text-red-700",
                      darkGradient: "dark:from-red-900/30 dark:to-amber-900/30",
                      darkTextColor: "dark:text-red-300",
                    },
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      className="flex justify-between items-center"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02 }}
                    >
                      <span className="text-lg text-slate-600 dark:text-slate-300">{item.lang}</span>
                      <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
                        <Badge
                          className={`bg-gradient-to-r ${item.gradient} ${item.textColor} ${item.darkGradient} ${item.darkTextColor} border border-amber-200 dark:border-amber-700`}
                        >
                          {item.level}
                        </Badge>
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Education Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <motion.h2
                className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6"
                whileHover={{ scale: 1.02 }}
              >
                🎓 Education
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="space-y-12">
              <motion.div
                variants={fadeInUp}
                className="border-l-4 border-amber-500 pl-8 relative p-8 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-3xl border border-amber-200/30 dark:border-amber-700/30"
                whileHover={{ scale: 1.01, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-orange-500 -ml-0.5 rounded-full"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                <div className="flex items-start gap-6">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <GraduationCap className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-3xl font-bold text-slate-800 dark:text-white mb-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      🎓 Master's in Data Science
                    </motion.h3>
                    <p className="text-orange-600 dark:text-orange-400 text-xl font-medium mb-4">
                      🏫 Higher Institute of Computer Science and Mathematics – Monastir
                    </p>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      Advanced studies in machine learning, statistical analysis, and data engineering with focus on
                      practical applications in AI and computer vision.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="border-l-4 border-orange-500 pl-8 relative p-8 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10 rounded-3xl border border-orange-200/30 dark:border-orange-700/30"
                whileHover={{ scale: 1.01, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500 -ml-0.5 rounded-full"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                />
                <div className="flex items-start gap-6">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <GraduationCap className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-3xl font-bold text-slate-800 dark:text-white mb-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      🎓 Bachelor's in Applied Mathematics
                    </motion.h3>
                    <p className="text-orange-600 dark:text-orange-400 text-xl font-medium mb-4">
                      🏫 Higher Institute of Computer Science and Mathematics – Monastir
                    </p>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      Strong foundation in mathematical principles, statistical methods, and computational mathematics
                      providing the theoretical backbone for advanced AI applications.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Leadership & Volunteering Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <motion.h2
                className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6"
                whileHover={{ scale: 1.02 }}
              >
                🌟 Leadership & Volunteering
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 mx-auto rounded-full"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
            </motion.div>

            <div className="space-y-12">
              <motion.div
                variants={fadeInUp}
                className="border-l-4 border-amber-500 pl-8 relative p-8 bg-gradient-to-br from-amber-50/50 to-orange-50/50 dark:from-amber-900/10 dark:to-orange-900/10 rounded-3xl border border-amber-200/30 dark:border-amber-700/30"
                whileHover={{ scale: 1.01, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-amber-500 to-orange-500 -ml-0.5 rounded-full"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut" }}
                />
                <div className="flex items-start gap-6">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Globe className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-3xl font-bold text-slate-800 dark:text-white mb-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      🌍 Global Classroom Volunteer
                    </motion.h3>
                    <p className="text-amber-600 dark:text-amber-400 text-xl font-medium mb-4">🏢 AIESEC Turkey</p>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      Volunteered in a global classroom initiative, teaching English and mathematics to diverse
                      students, fostering cross-cultural understanding and educational development.
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                variants={fadeInUp}
                className="border-l-4 border-orange-500 pl-8 relative p-8 bg-gradient-to-br from-orange-50/50 to-red-50/50 dark:from-orange-900/10 dark:to-red-900/10 rounded-3xl border border-orange-200/30 dark:border-orange-700/30"
                whileHover={{ scale: 1.01, x: 5 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.div
                  className="absolute left-0 top-0 w-1 h-full bg-gradient-to-b from-orange-500 to-red-500 -ml-0.5 rounded-full"
                  initial={{ height: 0 }}
                  whileInView={{ height: "100%" }}
                  transition={{ duration: 1, ease: "easeInOut", delay: 0.3 }}
                />
                <div className="flex items-start gap-6">
                  <motion.div
                    className="w-16 h-16 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-xl"
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Target className="w-8 h-8 text-white" />
                  </motion.div>
                  <div>
                    <motion.h3
                      className="text-3xl font-bold text-slate-800 dark:text-white mb-2"
                      whileHover={{ scale: 1.02 }}
                    >
                      👥 Sales & International Relations Team Leader
                    </motion.h3>
                    <p className="text-orange-600 dark:text-orange-400 text-xl font-medium mb-4">🏢 AIESEC Tunisia</p>
                    <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                      Led sales and international relations initiatives, developing leadership skills while managing
                      cross-cultural partnerships and driving organizational growth.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <SectionDivider />

      {/* Contact Section */}
      <section id="contact" className="relative py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <motion.h2
                className="text-5xl md:text-6xl font-bold text-slate-800 dark:text-white mb-6"
                whileHover={{ scale: 1.02 }}
              >
                📬 Let's Connect
              </motion.h2>
              <motion.div
                className="w-24 h-1 bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 mx-auto rounded-full mb-6"
                initial={{ width: 0 }}
                whileInView={{ width: 96 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
              />
              <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
                Ready to collaborate on your next AI project? Let's discuss how we can bring your ideas to life.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-16">
              <motion.div variants={fadeInLeft} className="space-y-8">
                <motion.h3
                  className="text-3xl font-bold text-slate-800 dark:text-white mb-8"
                  whileHover={{ scale: 1.02 }}
                >
                  Get in Touch
                </motion.h3>

                <div className="space-y-6">
                  {[
                    {
                      icon: Mail,
                      label: "Email",
                      value: "oumaimabourmech@aiesec.net",
                      color: "text-amber-500",
                      borderColor: "border-amber-500",
                      gradient: "from-amber-500 to-orange-500",
                    },
                    {
                      icon: Phone,
                      label: "Phone",
                      value: "+216 99183285",
                      color: "text-orange-500",
                      borderColor: "border-orange-500",
                      gradient: "from-orange-500 to-red-500",
                    },
                    {
                      icon: Linkedin,
                      label: "LinkedIn",
                      value: "linkedin.com/in/oumayma-bourmech-8b139b21a",
                      color: "text-amber-500",
                      borderColor: "border-amber-500",
                      gradient: "from-amber-500 to-orange-500",
                      link: "https://linkedin.com/in/oumayma-bourmech-8b139b21a",
                    },
                    {
                      icon: Github,
                      label: "GitHub",
                      value: "github.com/oumaima221",
                      color: "text-orange-500",
                      borderColor: "border-orange-500",
                      gradient: "from-orange-500 to-red-500",
                      link: "https://github.com/oumaima221",
                    },
                  ].map((contact, index) => (
                    <motion.div
                      key={index}
                      className={`border-l-4 ${contact.borderColor} pl-6 relative p-4 bg-gradient-to-br from-white/50 to-amber-50/30 dark:from-slate-800/50 dark:to-amber-900/10 rounded-2xl backdrop-blur-sm`}
                      initial={{ opacity: 0, x: -50 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <motion.div
                        className={`absolute left-0 top-0 w-1 h-full bg-gradient-to-b ${contact.gradient} -ml-0.5 rounded-full`}
                        initial={{ height: 0 }}
                        whileInView={{ height: "100%" }}
                        transition={{ duration: 1, ease: "easeInOut", delay: index * 0.1 }}
                      />
                      <div className="flex items-center gap-4 mb-2">
                        <motion.div
                          animate={{
                            rotate: [0, 10, -10, 0],
                            scale: [1, 1.1, 1],
                          }}
                          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                        >
                          <contact.icon className={`w-6 h-6 ${contact.color}`} />
                        </motion.div>
                        <span className="text-slate-500 dark:text-slate-400 font-medium">{contact.label}</span>
                      </div>
                      {contact.link ? (
                        <motion.a
                          href={contact.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`${contact.color} hover:underline text-lg font-medium transition-colors`}
                          whileHover={{ scale: 1.02 }}
                        >
                          {contact.value}
                        </motion.a>
                      ) : (
                        <p className="text-slate-800 dark:text-white text-lg font-medium">{contact.value}</p>
                      )}
                    </motion.div>
                  ))}
                </div>

                <div className="pt-6">
                  <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <Button
                      onClick={downloadCV}
                      size="lg"
                      className="w-full bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:via-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                      <motion.div
                        animate={{ y: [0, -2, 0] }}
                        transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      >
                        <Download className="w-5 h-5 mr-2" />
                      </motion.div>
                      Download CV (PDF)
                    </Button>
                  </motion.div>
                </div>
              </motion.div>

              <motion.div variants={fadeInRight} className="space-y-6">
                <motion.h3
                  className="text-3xl font-bold text-slate-800 dark:text-white mb-8"
                  whileHover={{ scale: 1.02 }}
                >
                  📝 Send a Message
                </motion.h3>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                  >
                    <Input
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="h-14 bg-white/50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl focus:border-amber-500 dark:focus:border-amber-400 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                  >
                    <Input
                      name="email"
                      type="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="h-14 bg-white/50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl focus:border-amber-500 dark:focus:border-amber-400 transition-all duration-300"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                  >
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleInputChange}
                      required
                      rows={6}
                      className="bg-white/50 dark:bg-slate-800/50 border-2 border-slate-200 dark:border-slate-600 text-slate-800 dark:text-white placeholder:text-slate-500 dark:placeholder:text-slate-400 rounded-xl focus:border-amber-500 dark:focus:border-amber-400 transition-all duration-300 resize-none"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      size="lg"
                      className="w-full h-14 bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 hover:from-amber-700 hover:via-orange-700 hover:to-red-700 text-white shadow-lg hover:shadow-xl transition-all duration-300 rounded-xl"
                    >
                      {isSubmitting ? (
                        <>
                          <motion.div
                            className="w-5 h-5 mr-3 border-2 border-white border-t-transparent rounded-full"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          />
                          Sending Message...
                        </>
                      ) : (
                        <>
                          <motion.div
                            animate={{ x: [0, 5, 0] }}
                            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                          >
                            <Send className="w-5 h-5 mr-3" />
                          </motion.div>
                          Send Message
                        </>
                      )}
                    </Button>
                  </motion.div>

                  <AnimatePresence>
                    {submitStatus === "success" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border-l-4 border-amber-500 rounded-r-xl"
                      >
                        <p className="text-amber-700 dark:text-amber-300 font-medium">
                          ✅ Message sent successfully! I'll get back to you soon.
                        </p>
                      </motion.div>
                    )}

                    {submitStatus === "error" && (
                      <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.9 }}
                        className="p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-r-xl"
                      >
                        <p className="text-red-700 dark:text-red-300 font-medium">
                          ❌ Failed to send message. Please try again.
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </form>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="relative py-16 px-6 bg-gradient-to-r from-amber-900/15 to-red-900/15 border-t border-amber-200 dark:border-amber-800">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid md:grid-cols-3 gap-12 mb-12"
          >
            <motion.div variants={fadeInUp} className="space-y-6">
              <div className="flex items-center gap-3">
                <Logo />
                <span className="text-2xl font-bold text-slate-800 dark:text-white">Oumayma Bourmech</span>
              </div>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                AI & Data Science Engineer passionate about building intelligent systems that solve real-world problems.
              </p>
              <div className="flex items-center gap-4">
                {[
                  {
                    icon: Linkedin,
                    href: "https://linkedin.com/in/oumayma-bourmech-8b139b21a",
                    gradient: "from-amber-500 to-orange-500",
                    hoverGradient: "from-amber-600 to-orange-600",
                  },
                  {
                    icon: Github,
                    href: "https://github.com/oumaima221",
                    gradient: "from-orange-500 to-red-500",
                    hoverGradient: "from-orange-600 to-red-600",
                  },
                  {
                    icon: Mail,
                    href: "mailto:oumaimabourmech@aiesec.net",
                    gradient: "from-red-500 to-amber-500",
                    hoverGradient: "from-red-600 to-amber-600",
                  },
                ].map((social, index) => (
                  <motion.a
                    key={index}
                    whileHover={{ scale: 1.15, rotate: 10 }}
                    whileTap={{ scale: 0.9 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-10 h-10 bg-gradient-to-br ${social.gradient} hover:bg-gradient-to-br hover:${social.hoverGradient} rounded-full flex items-center justify-center text-white transition-all duration-300 shadow-lg hover:shadow-xl`}
                  >
                    <social.icon className="w-5 h-5" />
                  </motion.a>
                ))}
              </div>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <h4 className="text-xl font-bold text-slate-800 dark:text-white">Quick Links</h4>
              <nav className="space-y-3">
                {[
                  { name: "About", href: "#about" },
                  { name: "Projects", href: "#projects" },
                  { name: "Skills", href: "#skills" },
                  { name: "Contact", href: "#contact" },
                ].map((link, index) => (
                  <motion.a
                    key={link.name}
                    whileHover={{ x: 8, scale: 1.02 }}
                    href={link.href}
                    className="block text-slate-600 dark:text-slate-400 hover:bg-gradient-to-r hover:from-amber-600 hover:to-orange-600 hover:bg-clip-text hover:text-transparent transition-all duration-300 relative"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    {link.name}
                    <motion.div
                      className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500"
                      whileHover={{ width: "100%" }}
                      transition={{ duration: 0.3 }}
                    />
                  </motion.a>
                ))}
              </nav>
            </motion.div>

            <motion.div variants={fadeInUp} className="space-y-6">
              <h4 className="text-xl font-bold text-slate-800 dark:text-white">Let's Connect</h4>
              <div className="space-y-3">
                {[
                  { icon: MapPin, text: "Tunisia", color: "text-amber-500" },
                  { icon: Mail, text: "oumaimabourmech@aiesec.net", color: "text-orange-500" },
                  { icon: Phone, text: "+216 99183285", color: "text-red-500" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    className="flex items-center gap-3 text-slate-600 dark:text-slate-400"
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ x: 5, scale: 1.02 }}
                  >
                    <motion.div
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, delay: index * 0.5 }}
                    >
                      <item.icon className={`w-5 h-5 ${item.color}`} />
                    </motion.div>
                    <span>{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="pt-8 border-t border-amber-200 dark:border-amber-800 text-center"
          >
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-slate-500 dark:text-slate-400 flex items-center gap-2">
                © 2024 Oumayma Bourmech. Made with{" "}
                <motion.span
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Heart className="w-4 h-4 text-red-500 fill-current" />
                </motion.span>{" "}
                and{" "}
                <motion.span
                  animate={{ rotate: [0, 15, -15, 0] }}
                  transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Coffee className="w-4 h-4 text-amber-600" />
                </motion.span>
              </p>
              <motion.p className="text-slate-500 dark:text-slate-400" whileHover={{ scale: 1.05 }}>
                Powered by innovation & creativity
              </motion.p>
            </div>
          </motion.div>
        </div>
      </footer>

      {/* Enhanced Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0, rotate: -180 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            exit={{ opacity: 0, scale: 0, rotate: 180 }}
            whileHover={{ scale: 1.15, rotate: 360 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-amber-600 via-orange-600 to-red-600 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 flex items-center justify-center z-50"
          >
            <motion.div animate={{ y: [0, -2, 0] }} transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}>
              <ArrowUp className="w-6 h-6" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  )
}
