"use client";

import { useState, useMemo, useCallback } from "react";
import {
  Globe,
  ThumbsUp,
  MessageCircle,
  Repeat2,
  Send,
  Smartphone,
  Monitor,
} from "lucide-react";
import Image from "next/image";
import { htmlToUnicode } from "@/utils/unicodeConverter";

interface LinkedInPreviewProps {
  content: string;
}

// Split content into above/below fold based on paragraph count
function splitContent(html: string, maxParagraphs: number = 2): { above: string; below: string } {
  const paragraphs = html.split(/<\/p>/i);

  if (paragraphs.length <= maxParagraphs + 1) {
    return { above: html, below: "" };
  }

  const aboveFold = paragraphs.slice(0, maxParagraphs).join("</p>") + "</p>";
  const belowFold = paragraphs.slice(maxParagraphs).join("</p>");

  return { above: aboveFold, below: belowFold };
}

export default function LinkedInPreview({ content }: LinkedInPreviewProps) {
  const [previewMode, setPreviewMode] = useState<"desktop" | "mobile">(
    "desktop",
  );

  const isMobile = previewMode === "mobile";

  const { above, below } = useMemo(() => splitContent(content, 2), [content]);
  const hasMoreContent = below.trim().length > 0;

  const handleCopy = useCallback((e: React.ClipboardEvent) => {
    const selection = window.getSelection();
    if (!selection || selection.isCollapsed) return;

    const range = selection.getRangeAt(0);
    const container = document.createElement("div");
    container.appendChild(range.cloneContents());
    const html = container.innerHTML;

    const unicodeText = htmlToUnicode(html);

    e.clipboardData.setData("text/plain", unicodeText);
    e.preventDefault();
  }, []);

  return (
    <div className="flex flex-col items-center w-full">
      {/* Preview Mode Toggle - hidden on mobile screens */}
      <div className="hidden sm:flex items-center gap-2 mb-6">
        <span className="text-sm text-black/60 mr-2">Post Preview</span>
        <div className="flex items-center bg-black/5 p-1">
          <button
            onClick={() => setPreviewMode("mobile")}
            className={`p-2 transition-colors ${
              previewMode === "mobile"
                ? "bg-white shadow-sm text-black"
                : "text-black/50 hover:text-black/70"
            }`}
            title="Mobile Preview"
          >
            <Smartphone size={18} />
          </button>
          <button
            onClick={() => setPreviewMode("desktop")}
            className={`p-2 transition-colors ${
              previewMode === "desktop"
                ? "bg-white shadow-sm text-black"
                : "text-black/50 hover:text-black/70"
            }`}
            title="Desktop Preview"
          >
            <Monitor size={18} />
          </button>
        </div>
      </div>

      {/* LinkedIn Post Card */}
      <div
        className={`bg-white border border-black/15 shadow-sm transition-all ${
          isMobile ? "w-[320px]" : "w-full max-w-[550px]"
        }`}
      >
        {/* Profile Header */}
        <a
          href="https://www.linkedin.com/in/jonathanchew/"
          target="_blank"
          rel="noopener noreferrer"
          className="block p-3 pb-0 hover:bg-black/[0.02] transition-colors"
        >
          <div className="flex items-start gap-3">
            {/* Avatar */}
            <Image
              src="/avatar.jpeg"
              alt="Jonathan Chew"
              className="w-12 h-12 rounded-full object-cover shrink-0"
              width={160}
              height={160}
            />

            {/* Profile Info */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1">
                <h3 className="font-semibold text-[14px] text-black hover:underline cursor-pointer">
                  Jonathan Chew
                </h3>
                <span className="text-black/50 text-[14px]">• 1st</span>
              </div>
              <p className="text-[12px] text-black/60 truncate">
                AI & Innovation Award Winner x 2 | MSc AI & EMBA | I help
                businesses implement & build lean AI that removes busywork and
                grows pipeline | Efficiency Solutions Architect | Tool-Agnostic
                | LinkedIn AI Top Voice
              </p>
              <div className="flex items-center gap-1 text-[12px] text-black/50">
                <span>12h</span>
                <span>•</span>
                <Globe size={12} />
              </div>
            </div>
          </div>
        </a>

        {/* Post Content */}
        <div className="px-3 py-3" onCopy={handleCopy}>
          {/* Above fold content */}
          <div
            className="text-[14px] text-black leading-[1.4] whitespace-pre-wrap linkedin-content"
            style={{
              fontFamily:
                '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
            }}
            dangerouslySetInnerHTML={{ __html: above }}
          />

          {/* ...more button with dashed divider */}
          {hasMoreContent && (
            <>
              <div className="flex items-center gap-2 my-1">
                <div className="flex-1 border-t border-dashed border-black/20" />
                <span className="text-[14px] text-black/50 hover:text-black cursor-pointer">
                  ...more
                </span>
              </div>

              {/* Below fold content */}
              <div
                className="text-[14px] text-black leading-[1.4] whitespace-pre-wrap linkedin-content"
                style={{
                  fontFamily:
                    '-apple-system, system-ui, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
                }}
                dangerouslySetInnerHTML={{ __html: below }}
              />
            </>
          )}
        </div>

        {/* Engagement Stats */}
        <div className="px-3 py-2 flex items-center justify-between text-[12px] text-black/50 border-b border-black/10">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <span className="text-base">👍</span>
              <span className="text-base">❤️</span>
            </div>
            <span>57</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hover:text-black hover:underline cursor-pointer">
              24 comments
            </span>
            <span>•</span>
            <span className="hover:text-black hover:underline cursor-pointer">
              6 reposts
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="px-2 py-1 flex items-center justify-between">
          <ActionButton icon={<ThumbsUp size={18} />} label="Like" isMobile={isMobile} />
          <ActionButton icon={<MessageCircle size={18} />} label="Comment" isMobile={isMobile} />
          <ActionButton icon={<Repeat2 size={18} />} label="Repost" isMobile={isMobile} />
          <ActionButton icon={<Send size={18} />} label="Send" isMobile={isMobile} />
        </div>
      </div>
    </div>
  );
}

function ActionButton({
  icon,
  label,
  isMobile
}: {
  icon: React.ReactNode;
  label: string;
  isMobile?: boolean;
}) {
  return (
    <button className="flex items-center gap-2 px-3 py-3 hover:bg-black/5 transition-colors text-black/60 hover:text-black">
      {icon}
      {!isMobile && <span className="text-[14px] hidden font-medium sm:inline">{label}</span>}
    </button>
  );
}
