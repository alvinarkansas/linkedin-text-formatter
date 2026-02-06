"use client";

import { useState, useMemo } from "react";
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

  return (
    <div className="flex flex-col items-center w-full">
      {/* Preview Mode Toggle - hidden on mobile screens */}
      <div className="hidden sm:flex items-center gap-2 mb-6">
        <span className="text-sm text-gray-600 mr-2">Post Preview</span>
        <div className="flex items-center bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setPreviewMode("mobile")}
            className={`p-2 rounded-md transition-colors ${
              previewMode === "mobile"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
            title="Mobile Preview"
          >
            <Smartphone size={18} />
          </button>
          <button
            onClick={() => setPreviewMode("desktop")}
            className={`p-2 rounded-md transition-colors ${
              previewMode === "desktop"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
            title="Desktop Preview"
          >
            <Monitor size={18} />
          </button>
        </div>
      </div>

      {/* LinkedIn Post Card */}
      <div
        className={`bg-white border border-gray-300 rounded-xl shadow-sm transition-all ${
          isMobile ? "w-[320px]" : "w-full max-w-[550px]"
        }`}
      >
        {/* Profile Header */}
        <div className="p-3 pb-0">
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
                <h3 className="font-semibold text-[14px] text-gray-900 hover:text-blue-600 hover:underline cursor-pointer">
                  Jonathan Chew
                </h3>
                <span className="text-gray-500 text-[14px]">• 1st</span>
              </div>
              <p className="text-[12px] text-gray-600 truncate">
                AI & Innovation Award Winner x 2 | MSc AI & EMBA | I help
                businesses implement & build lean AI that removes busywork and
                grows pipeline | Efficiency Solutions Architect | Tool-Agnostic
                | LinkedIn AI Top Voice
              </p>
              <div className="flex items-center gap-1 text-[12px] text-gray-500">
                <span>12h</span>
                <span>•</span>
                <Globe size={12} />
              </div>
            </div>
          </div>
        </div>

        {/* Post Content */}
        <div className="px-3 py-3">
          {/* Above fold content */}
          <div
            className="text-[14px] text-gray-900 leading-[1.4] whitespace-pre-wrap linkedin-content"
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
                <div className="flex-1 border-t border-dashed border-gray-300" />
                <span className="text-[14px] text-gray-500 hover:text-blue-600 cursor-pointer">
                  ...more
                </span>
              </div>

              {/* Below fold content */}
              <div
                className="text-[14px] text-gray-900 leading-[1.4] whitespace-pre-wrap linkedin-content"
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
        <div className="px-3 py-2 flex items-center justify-between text-[12px] text-gray-500 border-b border-gray-200">
          <div className="flex items-center gap-1">
            <div className="flex -space-x-1">
              <span className="text-base">👍</span>
              <span className="text-base">❤️</span>
            </div>
            <span>57</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="hover:text-blue-600 hover:underline cursor-pointer">
              24 comments
            </span>
            <span>•</span>
            <span className="hover:text-blue-600 hover:underline cursor-pointer">
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
    <button className="flex items-center gap-2 px-3 py-3 rounded hover:bg-gray-100 transition-colors text-gray-600 hover:text-gray-900">
      {icon}
      {!isMobile && <span className="text-[14px] hidden font-medium sm:inline">{label}</span>}
    </button>
  );
}
