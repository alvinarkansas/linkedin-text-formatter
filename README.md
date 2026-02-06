# LinkedIn Text Formatter

A beautiful, real-time LinkedIn post formatter and previewer that lets you style your posts with bold, italic, underline, and strikethrough text — then copy it with Unicode formatting that works directly on LinkedIn.

## ✨ Features

- **Rich Text Editor** — WYSIWYG editor with formatting toolbar (bold, italic, underline, strikethrough, lists)
- **Live Preview** — See exactly how your post will look on LinkedIn as you type
- **Mobile/Desktop Toggle** — Preview your post in different screen sizes
- **Unicode Copy** — Copies formatted text as Unicode characters that retain styling when pasted into LinkedIn
- **LinkedIn-Accurate Mockup** — Pixel-perfect recreation of LinkedIn's post UI including profile header, engagement stats, and action buttons
- **"See More" Simulation** — Shows how LinkedIn truncates longer posts with the familiar "...more" indicator

## 🛠️ Tech Stack

| Technology | Purpose |
|------------|---------|
| ⚛️ **Next.js 16** | React framework with App Router |
| 🎨 **Tailwind CSS 4** | Utility-first styling |
| ✏️ **TipTap** | Headless rich text editor |
| 🎯 **Lucide React** | Beautiful icon library |
| 📘 **TypeScript** | Type-safe development |

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/linkedin-text-formatter.git
   cd linkedin-text-formatter
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   ```

3. **Run the development server**
   ```bash
   pnpm dev
   ```

4. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
src/
├── app/
│   ├── globals.css       # Global styles + TipTap editor styles
│   ├── layout.tsx        # Root layout with metadata
│   └── page.tsx          # Main page with two-pane layout
├── components/
│   ├── RichTextEditor.tsx    # TipTap WYSIWYG editor
│   └── LinkedInPreview.tsx   # LinkedIn post mockup
└── utils/
    └── unicodeConverter.ts   # HTML to Unicode conversion
```

## 📝 Usage

1. Write your post in the left editor pane
2. Use the toolbar to format text (Bold, Italic, Underline, Strikethrough, Lists)
3. See the live preview update on the right
4. Click **"Copy text"** to copy your formatted post
5. Paste directly into LinkedIn — formatting preserved!

## 📄 License

MIT
