'use client';

import { useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import LinkedInPreview from '@/components/LinkedInPreview';

export default function Home() {
  const [content, setContent] = useState(
    '<p>Start writing and your post will appear here</p><p>Set your text to <strong>bold</strong>, <em>italic</em>, or <s>strike through it</s></p><p>This line will appear below the more...</p>'
  );

  return (
    <div className="min-h-screen bg-[#f3f2ef]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 text-center">
            LinkedIn Text Formatter
          </h1>
          <p className="text-gray-600 text-center mt-1 text-sm sm:text-base">
            Easily format the text of your LinkedIn post with bold, italic, underlined and more for free.
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6 lg:h-[calc(100vh-160px)]">
          {/* Editor Pane */}
          <div className="flex-1 min-h-[400px] bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
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
