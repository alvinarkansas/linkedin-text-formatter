'use client';

import { useState } from 'react';
import RichTextEditor from '@/components/RichTextEditor';
import LinkedInPreview from '@/components/LinkedInPreview';

export default function Home() {
  const [content, setContent] = useState(
    '<p>I finally released <strong>my first AI project</strong>!</p><p>It\'s not something I work overnight or just hours. I put my heart and soul into this. You can now post your LinkedIn post with bold, italic, underlined and more for free.</p><p>See my project here</p>'
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
        <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-160px)]">
          {/* Editor Pane */}
          <div className="flex-1 bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
            <RichTextEditor onUpdate={setContent} />
          </div>

          {/* Preview Pane */}
          <div className="flex-1 flex justify-center items-start py-4 overflow-auto">
            <LinkedInPreview content={content} />
          </div>
        </div>
      </main>
    </div>
  );
}
