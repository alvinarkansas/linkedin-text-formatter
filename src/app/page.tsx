"use client";

import { useState } from "react";
import RichTextEditor from "@/components/RichTextEditor";
import LinkedInPreview from "@/components/LinkedInPreview";
import NewsletterModal from "@/components/NewsletterModal";
import { Home as HomeIcon } from "lucide-react";
import Link from "next/link";

export default function Home() {
  const [content, setContent] = useState(
    "<p>Start writing and your post will appear here</p><p>Set your text to <strong>bold</strong>, <em>italic</em>, or <s>strike through it</s></p><p>This line will appear below the more...</p>",
  );

  return (
    <div className="min-h-screen bg-white">
      <NewsletterModal />
      {/* Header */}
      <header className="bg-white border-b border-black/10 sticky top-0 z-10 font-[Montserrat] flex justify-between items-center px-5 py-5">
        <div className="max-w-7xl">
          <h1 className="text-2xl text-black">LINKEDIN TEXT FORMATTER</h1>
          <p className="hidden sm:block text-black/60 mt-1 text-sm sm:text-base">
            Easily format the text of your LinkedIn post with bold, italic,
            underlined and more for free.
          </p>
        </div>
        <div>
          <Link href="https://www.ai-minimalist.com/">
            <button className="flex items-center justify-center gap-2 w-full sm:w-auto px-4 sm:px-6 py-2.5 border border-black/25 hover:bg-black/10 text-black font-medium transition-colors">
              <HomeIcon size={18} />
              <span className="hidden sm:inline">Home</span>
            </button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-160px)]">
          {/* Editor Pane */}
          <div className="flex-1 min-h-100 bg-white border border-black/10 shadow-sm overflow-hidden">
            <RichTextEditor onUpdate={setContent} />
          </div>

          {/* Preview Pane */}
          <div className="flex-1 flex justify-center items-start py-4 lg:overflow-auto">
            <LinkedInPreview content={content} />
          </div>
        </div>
      </main>
    </div>
  );
}
