"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";
import Image from "next/image";

const STORAGE_KEY = "ai_minimalist/newsletter_dismissed";

export default function NewsletterModal() {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (!dismissed) {
      setVisible(true);
    }
  }, []);

  const dismissPermanently = useCallback(() => {
    localStorage.setItem(STORAGE_KEY, "1");
    setVisible(false);
  }, []);

  const dismissTemporarily = useCallback(() => {
    setVisible(false);
  }, []);

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
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
          <div className="flex items-center gap-2">
            <a
              href="https://www.instagram.com/the_ai_minimalist?igsh=ZTFoY3lhczB4cnZp"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Instagram
            </a>
            <span className="text-white/40">|</span>
            <a
              href="https://www.youtube.com/@BrandRevAI"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              Youtube
            </a>
            <span className="text-white/40">|</span>
            <a
              href="https://www.linkedin.com/in/jonathanchew/"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
            <span className="text-white/40">|</span>
            <a
              href="https://www.tiktok.com/@jonandromina_ai"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline"
            >
              TikTok
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
