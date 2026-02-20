"use client";

import { useState, useCallback, SubmitEvent } from "react";
import { X, Instagram, Youtube, Linkedin } from "lucide-react";
import Image from "next/image";

const STORAGE_KEY = "ai_minimalist/newsletter_dismissed";

export default function NewsletterModal() {
  const [visible, setVisible] = useState(() => {
    if (typeof window === "undefined") return false;
    try {
      return !localStorage.getItem(STORAGE_KEY);
    } catch {
      return true;
    }
  });
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const dismissPermanently = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }, []);

  const dismissTemporarily = useCallback(() => {
    setVisible(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: SubmitEvent<HTMLFormElement>) => {
      e.preventDefault();
      setError("");

      if (!email.trim()) {
        setError("Email is required.");
        return;
      }

      if (!agreed) {
        setError("Please agree to subscribe.");
        return;
      }

      setLoading(true);
      console.log("Newsletter subscription:", email);

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setLoading(false);
      dismissPermanently();
    },
    [email, agreed, dismissPermanently],
  );

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={dismissTemporarily}
    >
      <div
        className="relative bg-white w-full max-w-3xl mx-4 overflow-hidden shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={dismissPermanently}
          className="absolute top-4 right-4 z-10 p-1 text-black/40 hover:text-black transition-colors"
          aria-label="Close"
        >
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row">
          {/* Left content */}
          <div className="flex-1 p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-4xl md:text-5xl font-extralight tracking-tight text-black leading-tight font-[Montserrat]">
              AI MINIMALIST
            </h2>
            <p className="mt-4 text-sm md:text-base text-black/70 tracking-[0.2em] font-[Montserrat] leading-relaxed">
              Subscribe for practical AI systems that give you time back.
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-5">
              <div>
                <label
                  htmlFor="newsletter-email"
                  className="block text-sm text-black mb-1.5"
                >
                  Email <span className="text-black">*</span>
                </label>
                <input
                  id="newsletter-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full border border-black/20 px-3 py-2.5 text-sm text-black focus:outline-none focus:border-black transition-colors"
                />
              </div>

              <div className="flex items-center justify-between gap-4 flex-wrap">
                <label className="flex items-center gap-2.5 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={agreed}
                    onChange={(e) => setAgreed(e.target.checked)}
                    className="w-4 h-4 border border-black/30 accent-black cursor-pointer"
                  />
                  <span className="text-sm text-black">
                    Yes, subscribe me to the newsletter. <span>*</span>
                  </span>
                </label>

                <button
                  type="submit"
                  disabled={loading}
                  className="bg-black text-white text-sm font-medium px-6 py-2.5 hover:bg-black/80 transition-colors disabled:opacity-60"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </button>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
            </form>
          </div>

          {/* Right image */}
          <div className="hidden md:flex items-start justify-center shrink-0 w-75 p-8 pl-0 pt-20">
            <Image
              src="/robot-head.avif"
              alt="AI Minimalist"
              className="w-full h-auto object-contain"
              width={300}
              height={300}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-8 md:px-12 py-4 bg-black text-white text-xs">
          <div className="flex items-center gap-2 md:gap-2">
            <a
              href="https://www.instagram.com/the_ai_minimalist?igsh=ZTFoY3lhczB4cnZp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white/80 transition-colors font-[Montserrat]"
            >
              <Instagram size={16} className="md:hidden" />
              <span className="hidden md:inline">Instagram</span>
            </a>
            <span className="text-white/40 hidden md:inline">|</span>
            <a
              href="https://www.youtube.com/@BrandRevAI"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white/80 transition-colors font-[Montserrat]"
            >
              <Youtube size={16} className="md:hidden" />
              <span className="hidden md:inline">Youtube</span>
            </a>
            <span className="text-white/40 hidden md:inline">|</span>
            <a
              href="https://www.linkedin.com/in/jonathanchew/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white/80 transition-colors font-[Montserrat]"
            >
              <Linkedin size={16} className="md:hidden" />
              <span className="hidden md:inline">LinkedIn</span>
            </a>
            <span className="text-white/40 hidden md:inline">|</span>
            <a
              href="https://www.tiktok.com/@jonandromina_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline hover:text-white/80 transition-colors font-[Montserrat]"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 md:hidden"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 0 0-.79-.05A6.34 6.34 0 0 0 3.15 15a6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.34-6.34V8.98a8.21 8.21 0 0 0 4.76 1.52V7.05a4.84 4.84 0 0 1-1-.36Z"/></svg>
              <span className="hidden md:inline">TikTok</span>
            </a>
          </div>
          <span className="text-white/60">
            &copy; 2026 by{" "}
            <a
              href="http://brandrev.ai/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Brandrev.ai
            </a>
          </span>
        </div>
      </div>
    </div>
  );
}
