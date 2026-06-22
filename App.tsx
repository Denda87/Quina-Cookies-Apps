import { useState } from "react";
import type { ComponentType } from "react";
import { motion } from "motion/react";
import { Circle, Globe, GitFork, Eye, EyeOff } from "lucide-react";

// ─── Reusable components ──────────────────────────────────────────────────────

function StepItem({
  number,
  text,
  active = false,
}: {
  number: number;
  text: string;
  active?: boolean;
}) {
  return (
    <div
      className={[
        "flex items-center gap-3 px-4 py-3 rounded-xl transition-all",
        active
          ? "bg-white text-black border border-white"
          : "bg-brand-gray text-white",
      ].join(" ")}
    >
      <span
        className={[
          "w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold flex-shrink-0",
          active ? "bg-black text-white" : "bg-white/10 text-white/40",
        ].join(" ")}
      >
        {number}
      </span>
      <span className="text-sm font-medium">{text}</span>
    </div>
  );
}

function SocialButton({
  icon: Icon,
  label,
}: {
  icon: ComponentType<{ size?: number }>;
  label: string;
}) {
  return (
    <button
      type="button"
      className="flex items-center justify-center gap-2 w-full h-11 bg-black border border-white/10 rounded-xl hover:bg-white/5 transition-colors text-sm font-medium text-white"
    >
      <Icon size={16} />
      {label}
    </button>
  );
}

function InputGroup({
  label,
  placeholder,
  type = "text",
}: {
  label: string;
  placeholder: string;
  type?: string;
}) {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-white">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        className="w-full bg-brand-gray border-none rounded-xl h-11 px-4 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 outline-none"
      />
    </div>
  );
}

// ─── Animation variants ───────────────────────────────────────────────────────

const heroContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const heroItem = {
  hidden: { opacity: 0, y: 10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// ─── App ──────────────────────────────────────────────────────────────────────

export default function App() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <main className="flex min-h-screen w-full bg-black selection:bg-white/30 p-2 transition-all duration-500 lg:h-screen lg:overflow-hidden lg:p-4">
      {/* ── Left Column ───────────────────────────────────────────────────── */}
      <div className="hidden lg:flex w-[52%] relative flex-col items-center justify-end pb-32 px-12 rounded-3xl overflow-hidden shadow-2xl h-full">
        {/* Background video — no overlay, plays purely */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260506_081238_406ed0e3-5d83-436e-a512-0bbff7ec5b95.mp4"
            type="video/mp4"
          />
        </video>

        {/* Hero content */}
        <motion.div
          className="relative z-10 w-full max-w-xs space-y-8"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Brand */}
          <motion.div variants={heroItem} className="flex items-center gap-2">
            <Circle size={20} className="fill-white text-white" />
            <span className="text-xl font-semibold tracking-tight">Aurora</span>
          </motion.div>

          {/* Heading block */}
          <motion.div variants={heroItem} className="space-y-2">
            <h1 className="text-4xl font-medium tracking-tight whitespace-nowrap">
              Join Aurora
            </h1>
            <p className="text-white/60 text-sm leading-relaxed px-4">
              Follow these 3 quick phases to activate your space.
            </p>
          </motion.div>

          {/* Steps */}
          <motion.div variants={heroItem} className="space-y-3">
            <StepItem number={1} text="Register your identity" active />
            <StepItem number={2} text="Configure your studio" />
            <StepItem number={3} text="Finalize your profile" />
          </motion.div>
        </motion.div>
      </div>

      {/* ── Right Column ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center py-12 lg:py-6 px-4 sm:px-12 lg:px-16 xl:px-24 overflow-y-auto lg:overflow-hidden">
        <motion.div
          className="w-full max-w-xl space-y-8 lg:space-y-6 sm:space-y-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="space-y-2">
            <h2 className="text-3xl font-medium tracking-tight">
              Create New Profile
            </h2>
            <p className="text-white/40 text-sm">
              Input your basic details to begin the journey.
            </p>
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-4">
            <SocialButton icon={Globe} label="Google" />
            <SocialButton icon={GitFork} label="Github" />
          </div>

          {/* Divider */}
          <div className="relative flex items-center">
            <div className="flex-1 border-t border-white/10" />
            <span className="bg-black px-4 text-xs font-medium text-white/40 uppercase tracking-widest">
              Or
            </span>
            <div className="flex-1 border-t border-white/10" />
          </div>

          {/* Form */}
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            {/* Name row */}
            <div className="grid grid-cols-2 gap-4">
              <InputGroup label="First Name" placeholder="Alex" />
              <InputGroup label="Last Name" placeholder="Morgan" />
            </div>

            {/* Email */}
            <InputGroup
              label="Email"
              placeholder="alex@aurora.space"
              type="email"
            />

            {/* Password */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-white">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  className="w-full bg-brand-gray border-none rounded-xl h-11 px-4 pr-12 text-white placeholder:text-white/20 focus:ring-2 focus:ring-white/20 outline-none"
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <p className="text-white/30 text-xs">
                Requires at least 8 symbols.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full h-14 bg-white text-black font-semibold rounded-xl hover:bg-white/90 active:scale-[0.98] mt-4 transition-all"
            >
              Create Account
            </button>
          </form>

          {/* Footer link */}
          <p className="text-center text-white/40 text-sm">
            Member of the team?{" "}
            <a
              href="#"
              className="text-white underline underline-offset-4 hover:text-white/70 transition-colors"
            >
              Log in
            </a>
          </p>
        </motion.div>
      </div>
    </main>
  );
}
