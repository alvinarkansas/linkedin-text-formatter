'use client';

import { useState, useRef, useEffect, useMemo } from 'react';

const EMOJI_CATEGORIES: { label: string; icon: string; emojis: string[] }[] = [
  {
    label: 'Smileys',
    icon: '😀',
    emojis: [
      '😀','😃','😄','😁','😆','😅','🤣','😂','🙂','🙃',
      '😉','😊','😇','🥰','😍','🤩','😘','😗','😚','😙',
      '🥲','😋','😛','😜','🤪','😝','🤑','🤗','🤭','🤫',
      '🤔','🫡','🤐','🤨','😐','😑','😶','🫥','😏','😒',
      '🙄','😬','🤥','😌','😔','😪','🤤','😴','😷','🤒',
      '🤕','🤢','🤮','🥵','🥶','🥴','😵','🤯','🤠','🥳',
      '🥸','😎','🤓','🧐','😕','🫤','😟','🙁','😮','😯',
      '😲','😳','🥺','🥹','😦','😧','😨','😰','😥','😢',
      '😭','😱','😖','😣','😞','😓','😩','😫','🥱','😤',
      '😡','😠','🤬','😈','👿','💀','☠️','💩','🤡','👹',
    ],
  },
  {
    label: 'Gestures',
    icon: '👋',
    emojis: [
      '👋','🤚','🖐️','✋','🖖','🫱','🫲','🫳','🫴','👌',
      '🤌','🤏','✌️','🤞','🫰','🤟','🤘','🤙','👈','👉',
      '👆','🖕','👇','☝️','🫵','👍','👎','✊','👊','🤛',
      '🤜','👏','🙌','🫶','👐','🤲','🤝','🙏','💪','🦾',
      '🖤','❤️','🧡','💛','💚','💙','💜','🤎','🖤','🤍',
      '💯','💥','💫','⭐','🌟','✨','💢','💬','💭','🗯️',
    ],
  },
  {
    label: 'People',
    icon: '👤',
    emojis: [
      '👶','🧒','👦','👧','🧑','👱','👨','🧔','👩','🧓',
      '👴','👵','🙍','🙎','🙅','🙆','💁','🙋','🧏','🙇',
      '🤦','🤷','👮','🕵️','💂','🥷','👷','🫅','🤴','👸',
      '👳','👲','🧕','🤵','👰','🤰','🫃','🫄','🤱','👼',
      '🎅','🤶','🦸','🦹','🧙','🧚','🧛','🧜','🧝','🧞',
    ],
  },
  {
    label: 'Work',
    icon: '💼',
    emojis: [
      '💼','📊','📈','📉','📋','📌','📎','🔗','📐','📏',
      '💡','🔑','🗝️','🔒','🔓','📝','✏️','🖊️','🖋️','📩',
      '📨','📧','💻','🖥️','⌨️','🖨️','📱','☎️','📞','📡',
      '🔋','🔌','💾','💿','🗂️','📂','📁','📅','📆','🗓️',
      '🏢','🏗️','🏭','🎯','🏆','🥇','🥈','🥉','🏅','🎖️',
      '⚡','🔥','🚀','💰','💵','💸','🤝','📣','📢','🔔',
    ],
  },
  {
    label: 'Nature',
    icon: '🌿',
    emojis: [
      '🌱','🌿','☘️','🍀','🌵','🌴','🌳','🌲','🏞️','🌊',
      '🌺','🌻','🌹','🌷','🌸','💐','🍄','🐶','🐱','🐭',
      '🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮','🐷',
      '🐸','🐵','🐔','🐧','🐦','🦅','🦆','🦉','🐝','🦋',
      '🌍','🌎','🌏','☀️','🌤️','⛅','🌈','⚡','❄️','💧',
    ],
  },
  {
    label: 'Food',
    icon: '🍕',
    emojis: [
      '🍎','🍐','🍊','🍋','🍌','🍉','🍇','🍓','🫐','🍈',
      '🍒','🍑','🥭','🍍','🥥','🥝','🍅','🥑','🍕','🍔',
      '🍟','🌭','🍿','🧁','🍰','🎂','🍩','🍪','🍫','🍬',
      '☕','🍵','🥤','🧃','🍺','🍷','🥂','🍾','🧊','🍽️',
    ],
  },
  {
    label: 'Travel',
    icon: '✈️',
    emojis: [
      '🚗','🚕','🚌','🏎️','🚓','🚑','🚒','🚐','🛻','🚚',
      '✈️','🛫','🛬','🚀','🛸','🚁','🛶','⛵','🚢','🏠',
      '🏡','🏢','🏣','🏥','🏦','🏨','🏪','🏫','🏬','🗼',
      '🗽','⛪','🕌','🕍','🏰','🏯','🗺️','🧭','⛰️','🏔️',
    ],
  },
  {
    label: 'Symbols',
    icon: '💡',
    emojis: [
      '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔',
      '❣️','💕','💞','💓','💗','💖','💘','💝','✅','❌',
      '⭕','❗','❓','‼️','⁉️','💲','🔴','🟠','🟡','🟢',
      '🔵','🟣','⚫','⚪','🟤','🔶','🔷','🔸','🔹','🔺',
      '➡️','⬅️','⬆️','⬇️','↗️','↘️','↙️','↖️','↕️','↔️',
      '♻️','⚠️','🚫','❎','✳️','❇️','🔰','♾️','🔱','⚜️',
    ],
  },
];

// Flat list for searching
const ALL_EMOJIS = EMOJI_CATEGORIES.flatMap((c) =>
  c.emojis.map((e) => ({ emoji: e, category: c.label }))
);

// Simple keyword map for search (emoji -> keywords)
const EMOJI_KEYWORDS: Record<string, string> = {
  '😀': 'grin happy smile',
  '😃': 'smile happy',
  '😄': 'laugh happy smile',
  '😁': 'grin beam smile',
  '😆': 'laugh squint',
  '😅': 'sweat smile nervous',
  '🤣': 'rofl laugh rolling',
  '😂': 'joy laugh cry tears',
  '🙂': 'slight smile',
  '😉': 'wink',
  '😊': 'blush happy smile',
  '😍': 'heart eyes love',
  '🤩': 'star struck excited',
  '😘': 'kiss love blow',
  '😎': 'cool sunglasses',
  '🤔': 'think thinking hmm',
  '😢': 'cry sad tear',
  '😭': 'sob cry loud',
  '😡': 'angry rage mad',
  '😱': 'scream fear shock',
  '🥳': 'party celebrate',
  '🤯': 'exploding mind blown',
  '👋': 'wave hello hi bye',
  '👍': 'thumbs up good yes approve like',
  '👎': 'thumbs down bad no disapprove dislike',
  '👏': 'clap applause bravo',
  '🙌': 'raised hands hooray celebrate',
  '🤝': 'handshake deal agree',
  '🙏': 'pray please hope thanks',
  '💪': 'strong muscle flex power',
  '❤️': 'red heart love',
  '🔥': 'fire hot flame lit',
  '⭐': 'star',
  '✨': 'sparkle shine magic',
  '💯': 'hundred perfect score',
  '🚀': 'rocket launch startup fast',
  '💡': 'idea light bulb',
  '🎯': 'target dart goal bullseye',
  '🏆': 'trophy winner champion cup',
  '💼': 'briefcase work business job',
  '📊': 'chart bar graph data analytics',
  '📈': 'chart up growth increase trending',
  '📉': 'chart down decrease decline',
  '💰': 'money bag rich',
  '💵': 'dollar money cash',
  '💸': 'money fly spend',
  '🔑': 'key',
  '🔗': 'link chain connect',
  '📣': 'megaphone announce',
  '📢': 'loudspeaker announce',
  '✅': 'check done complete',
  '❌': 'cross no wrong cancel',
  '⚡': 'lightning bolt energy zap fast',
  '💻': 'laptop computer tech',
  '📱': 'phone mobile cell',
  '☕': 'coffee hot beverage',
  '🌍': 'globe earth world',
  '🎉': 'party tada celebration',
  '📝': 'memo note write',
  '💬': 'speech bubble chat talk comment',
  '👀': 'eyes look see watch',
};

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  onClose: () => void;
  anchorRef: React.RefObject<HTMLButtonElement | null>;
}

export default function EmojiPicker({ onSelect, onClose, anchorRef }: EmojiPickerProps) {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState(0);
  const [position, setPosition] = useState<{ top: number; left: number } | null>(null);
  const pickerRef = useRef<HTMLDivElement>(null);
  const searchRef = useRef<HTMLInputElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Compute fixed position from anchor button
  useEffect(() => {
    function updatePosition() {
      if (!anchorRef.current) return;
      const rect = anchorRef.current.getBoundingClientRect();
      const pickerWidth = 320;
      // Default: align left edge to button left
      let left = rect.left;
      // If it would overflow the right edge, shift left
      if (left + pickerWidth > window.innerWidth - 8) {
        left = window.innerWidth - pickerWidth - 8;
      }
      if (left < 8) left = 8;
      setPosition({ top: rect.bottom + 4, left });
    }
    updatePosition();
    window.addEventListener('resize', updatePosition);
    window.addEventListener('scroll', updatePosition, true);
    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition, true);
    };
  }, [anchorRef]);

  useEffect(() => {
    searchRef.current?.focus();
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(e.target as Node) &&
        !anchorRef.current?.contains(e.target as Node)
      ) {
        onClose();
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onClose, anchorRef]);

  const filteredEmojis = useMemo(() => {
    if (!search.trim()) return null;
    const q = search.toLowerCase();
    return ALL_EMOJIS.filter(({ emoji }) => {
      const keywords = EMOJI_KEYWORDS[emoji] || '';
      return emoji.includes(q) || keywords.includes(q);
    });
  }, [search]);

  const scrollToCategory = (index: number) => {
    setActiveCategory(index);
    setSearch('');
    const el = document.getElementById(`emoji-cat-${index}`);
    el?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  if (!position) return null;

  return (
    <div
      ref={pickerRef}
      className="fixed z-50 bg-white border border-black/10 shadow-lg w-[320px] flex flex-col"
      style={{ top: position.top, left: position.left }}
    >
      {/* Search */}
      <div className="p-2 border-b border-black/5">
        <input
          ref={searchRef}
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search emoji..."
          className="w-full px-3 py-1.5 text-sm border border-black/10 focus:outline-none focus:border-black"
        />
      </div>

      {/* Category tabs */}
      {!search.trim() && (
        <div className="flex items-center gap-0.5 px-2 py-1 border-b border-black/5">
          {EMOJI_CATEGORIES.map((cat, i) => (
            <button
              key={cat.label}
              onClick={() => scrollToCategory(i)}
              title={cat.label}
              className={`p-1 text-base hover:bg-black/5 transition-colors ${
                activeCategory === i ? 'bg-black/5' : ''
              }`}
            >
              {cat.icon}
            </button>
          ))}
        </div>
      )}

      {/* Emoji grid */}
      <div
        ref={gridRef}
        className="overflow-y-auto p-2"
        style={{ maxHeight: '240px' }}
        onScroll={() => {
          if (search.trim() || !gridRef.current) return;
          const container = gridRef.current;
          const scrollTop = container.scrollTop;
          for (let i = EMOJI_CATEGORIES.length - 1; i >= 0; i--) {
            const el = document.getElementById(`emoji-cat-${i}`);
            if (el && el.offsetTop - container.offsetTop <= scrollTop + 4) {
              setActiveCategory(i);
              break;
            }
          }
        }}
      >
        {search.trim() ? (
          filteredEmojis && filteredEmojis.length > 0 ? (
            <div className="grid grid-cols-8 gap-0.5">
              {filteredEmojis.map(({ emoji }, i) => (
                <button
                  key={`${emoji}-${i}`}
                  onClick={() => onSelect(emoji)}
                  className="p-1 text-xl hover:bg-black/5 transition-colors text-center leading-none"
                >
                  {emoji}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-sm text-black/40 text-center py-4">No emoji found</p>
          )
        ) : (
          EMOJI_CATEGORIES.map((cat, catIndex) => (
            <div key={cat.label} id={`emoji-cat-${catIndex}`}>
              <p className="text-xs font-medium text-black/50 py-1 sticky top-0 bg-white">
                {cat.label}
              </p>
              <div className="grid grid-cols-8 gap-0.5">
                {cat.emojis.map((emoji, i) => (
                  <button
                    key={`${emoji}-${i}`}
                    onClick={() => onSelect(emoji)}
                    className="p-1 text-xl hover:bg-black/5 transition-colors text-center leading-none"
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
