/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Smile, Heart, ThumbsUp, AlertCircle } from 'lucide-react';

interface MoodState {
  emoji: string;
  label: string;
  color: string;
  bgHex: string;
  borderColor: string;
  motivation: string;
  subMotivation: string;
}

const moods: MoodState[] = [
  {
    emoji: "😢",
    label: "Sedih",
    color: "from-blue-400 to-blue-600",
    bgHex: "bg-blue-50 text-blue-800",
    borderColor: "border-blue-300",
    motivation: "Tingkat rata-rata (mean) kebahagiaanmu hari ini mungkin sedang turun, tapi tidak apa-apa! Kesedihan adalah pencilan (outlier) sementara saja.",
    subMotivation: "Mari belajar statistika perlahan-lahan. Setiap langkah kecil belajarmu hari ini akan menaikkan nilai rata-rata pemahamanmu di kemudian hari! Semangat ya! 💙"
  },
  {
    emoji: "😐",
    label: "Biasa Saja",
    color: "from-amber-400 to-amber-600",
    bgHex: "bg-amber-50 text-amber-800",
    borderColor: "border-amber-300",
    motivation: "Wah, suasana hatimu sedang berada di titik median (nilai tengah) yang stabil dan seimbang hari ini!",
    subMotivation: "Sifat data yang stabil ini sangat bagus untuk berkonsentrasi penuh. Mari kita eksplorasi jangkauan kuartil data matematika hari ini untuk menambah insight serumu! 🧐"
  },
  {
    emoji: "😊",
    label: "Senang",
    color: "from-emerald-400 to-emerald-600",
    bgHex: "bg-emerald-50 text-emerald-800",
    borderColor: "border-emerald-300",
    motivation: "Luar biasa! Modus (data paling sering muncul) hari ini adalah energi positif dan senyuman ceria di wajahmu!",
    subMotivation: "Gunakan frekuensi kebahagiaan yang melimpah ini untuk menyelesaikan kuis numerasi kelas 8 hari ini dengan gemilang. Kamu pasti bisa! 🌟"
  }
];

export default function MoodSelector() {
  const [selectedIdx, setSelectedIdx] = useState<number | null>(null);

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-sm border border-slate-100" id="mood-selector-container">
      <h3 className="text-center font-sans font-medium text-slate-800 mb-4 text-base" id="mood-title">
        Bagaimana perasaanmu sebelum memulai belajar hari ini?
      </h3>
      
      <div className="grid grid-cols-3 gap-3" id="mood-buttons-grid">
        {moods.map((mood, idx) => {
          const isSelected = selectedIdx === idx;
          return (
            <motion.button
              key={mood.label}
              id={`mood-btn-${mood.label.toLowerCase()}`}
              onClick={() => setSelectedIdx(idx)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`relative flex flex-col items-center justify-center p-4 rounded-xl border text-center transition-all cursor-pointer ${
                isSelected 
                  ? 'border-indigo-500 ring-2 ring-indigo-505/20 bg-indigo-50/40' 
                  : 'border-slate-200 hover:border-indigo-200 hover:bg-slate-50/50'
              }`}
            >
              <span className="text-3xl mb-1 filter drop-shadow-sm select-none" role="img" aria-label={mood.label}>
                {mood.emoji}
              </span>
              <span className={`text-xs font-medium ${isSelected ? 'text-indigo-700' : 'text-slate-600'}`}>
                {mood.label}
              </span>
              
              {isSelected && (
                <motion.div 
                  layoutId="active-dot" 
                  className="absolute -top-1 -right-1 w-3 h-3 bg-indigo-600 rounded-full"
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                />
              )}
            </motion.button>
          );
        })}
      </div>

      <div className="mt-5 min-h-[140px] flex items-center justify-center" id="mood-message-box">
        <AnimatePresence mode="wait">
          {selectedIdx !== null ? (
            <motion.div
              key={selectedIdx}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              className={`p-4 rounded-xl border w-full ${moods[selectedIdx].bgHex} ${moods[selectedIdx].borderColor}`}
              id="mood-active-message"
            >
              <div className="flex items-start gap-3">
                <span className="mt-0.5 text-lg">💡</span>
                <div>
                  <h4 className="font-bold text-sm uppercase tracking-wide opacity-90 mb-1 flex items-center gap-1.5">
                    {selectedIdx === 0 && <AlertCircle className="w-4 h-4" />}
                    {selectedIdx === 1 && <ThumbsUp className="w-4 h-4" />}
                    {selectedIdx === 2 && <Smile className="w-4 h-4" />}
                    Mood Tracker Matematika: {moods[selectedIdx].label}
                  </h4>
                  <p className="text-sm font-sans font-medium leading-relaxed">
                    {moods[selectedIdx].motivation}
                  </p>
                  <p className="text-xs italic mt-2 opacity-80 border-t pt-1.5 border-current/10">
                    {moods[selectedIdx].subMotivation}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div 
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-slate-400 text-xs py-4 px-2"
              id="mood-empty-message"
            >
              <Heart className="w-6 h-6 mx-auto mb-2 text-rose-300 stroke-1 animate-pulse" />
              Pilihlah salah satu suasana hati di atas untuk mengaktifkan kata-kata motivasi belajar dari Pak Suwarto!
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
