/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  RotateCcw, Sparkles, Check, HelpCircle, TrendingUp, 
  Coins, Scissors, Sliders, ArrowUpDown, Info, Globe, AlertTriangle
} from 'lucide-react';

// Interfaces for our 3 simulator modes
interface StudentHeight {
  id: string;
  name: string;
  height: number;
}

interface WorkerSalary {
  id: string;
  role: string;
  salary: number; // in Millions Rupiah (Juta)
}

interface PlantHeight {
  id: string;
  label: string;
  height: number; // 10 - 100 cm
}

type ModeKey = 'pemusatan' | 'outlier' | 'penyebaran';

export default function ExplorationModule() {
  const [activeMode, setActiveMode] = useState<ModeKey>('pemusatan');

  // ==================== STATE SIMULATOR 1 ====================
  const initialStudents: StudentHeight[] = [
    { id: '1', name: 'Alif', height: 145 },
    { id: '2', name: 'Beni', height: 155 },
    { id: '3', name: 'Chika', height: 140 },
    { id: '4', name: 'Dewi', height: 165 },
    { id: '5', name: 'Edo', height: 148 },
    { id: '6', name: 'Fitri', height: 160 },
    { id: '7', name: 'Galih', height: 152 },
    { id: '8', name: 'Hana', height: 150 },
  ];
  const [students, setStudents] = useState<StudentHeight[]>(initialStudents);

  // ==================== STATE SIMULATOR 2 ====================
  const initialSalaries: WorkerSalary[] = [
    { id: 'w1', role: 'Staff Kebun A', salary: 4.0 },
    { id: 'w2', role: 'Staff Kebun B', salary: 4.2 },
    { id: 'w3', role: 'Staff Kebun C', salary: 4.5 },
    { id: 'w4', role: 'Supervisor', salary: 5.5 },
    { id: 'w5', role: 'Direktur Utama (Outlier)', salary: 12.0 }, // This will be the manipulatable outlier
  ];
  const [salaries, setSalaries] = useState<WorkerSalary[]>(initialSalaries);

  // ==================== STATE SIMULATOR 3 ====================
  const initialPlants: PlantHeight[] = [
    { id: 'p1', label: 'Pot Merah', height: 25 },
    { id: 'p2', label: 'Pot Biru', height: 45 },
    { id: 'p3', label: 'Pot Kuning', height: 60 },
    { id: 'p4', label: 'Pot Hijau', height: 85 },
    { id: 'p5', label: 'Pot Ungu', height: 75 },
  ];
  const [plants, setPlants] = useState<PlantHeight[]>(initialPlants);

  // GeoGebra state Integration (Optional additional laboratory helper)
  const [embedUrl, setEmbedUrl] = useState<string>('');
  const [savedEmbedUrl, setSavedEmbedUrl] = useState<string>('https://www.geogebra.org/material/iframe/id/twn6u2es/width/800/height/500/border/888888/smb/false/stb/false/stbh/false/ai/false/asb/false/sri/true/rc/false/ld/false/sdz/true/ctl/false');
  const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);

  // ==================== CALCULATIONS SIMULATOR 1 ====================
  const sValues = students.map(s => s.height);
  const sNum = sValues.length;
  const sSorted = [...sValues].sort((a, b) => a - b);
  const sMean = Number((sValues.reduce((acc, v) => acc + v, 0) / sNum).toFixed(1));
  const sMid = Math.floor(sNum / 2);
  const sMedian = sNum % 2 === 0 ? (sSorted[sMid - 1] + sSorted[sMid]) / 2 : sSorted[sMid];

  // Modus Calculation
  const getModus = (arr: number[]) => {
    const counts: { [key: number]: number } = {};
    let maxCount = 0;
    arr.forEach(val => {
      counts[val] = (counts[val] || 0) + 1;
      if (counts[val] > maxCount) {
        maxCount = counts[val];
      }
    });
    if (maxCount <= 1) return 'Tidak ada (semua muncul 1x)';
    const modes = Object.keys(counts)
      .filter(key => counts[Number(key)] === maxCount)
      .map(Number);
    return `${modes.join(', ')} cm (${maxCount}x muncul)`;
  };
  const sModus = getModus(sValues);

  // ==================== CALCULATIONS SIMULATOR 2 ====================
  const salValues = salaries.map(s => s.salary);
  const salNum = salValues.length;
  const salSorted = [...salValues].sort((a, b) => a - b);
  const salMean = Number((salValues.reduce((acc, v) => acc + v, 0) / salNum).toFixed(2));
  const salMid = Math.floor(salNum / 2);
  const salMedian = salNum % 2 === 0 ? (salSorted[salMid - 1] + salSorted[salMid]) / 2 : salSorted[salMid];

  // ==================== CALCULATIONS SIMULATOR 3 ====================
  // For Quartiles, we strictly sort plant heights
  const pSortedObj = [...plants].sort((a, b) => a.height - b.height);
  const pHeightsSorted = pSortedObj.map(p => p.height);
  
  // formulas for N=5 (Odd data tunggal)
  // Xmin = pHeightsSorted[0]
  // Q1 = median of bottom half [x1, x2] = (x1 + x2)/2
  // Q2 = Median = pHeightsSorted[2]
  // Q3 = median of top half [x4, x5] = (x4 + x5)/2
  // Xmax = pHeightsSorted[4]
  const pMin = pHeightsSorted[0];
  const pQ1 = Number(((pHeightsSorted[0] + pHeightsSorted[1]) / 2).toFixed(1));
  const pQ2 = pHeightsSorted[2];
  const pQ3 = Number(((pHeightsSorted[3] + pHeightsSorted[4]) / 2).toFixed(1));
  const pMax = pHeightsSorted[4];
  
  const pRange = pMax - pMin;
  const pHamparan = Number((pQ3 - pQ1).toFixed(1)); // IQR
  const pQd = Number((pHamparan / 2).toFixed(1)); // Simpangan Kuartil

  const handleSaveUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (embedUrl.trim()) {
      setSavedEmbedUrl(embedUrl.trim());
      setIsEditingUrl(false);
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 text-slate-700 font-sans" id="exploration-root">
      
      {/* Intro Header */}
      <div className="bg-indigo-50 border border-indigo-100 rounded-3xl p-6 sm:p-8" id="explor-header">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h3 className="text-base sm:text-lg font-bold text-indigo-950 flex items-center gap-2" id="explor-title">
              <Sparkles className="w-5.5 h-5.5 text-indigo-600 animate-pulse" />
              Laboratorium Eksplorasi Statistika Interaktif
            </h3>
            <p className="text-xs text-indigo-900/80 max-w-2xl" id="explor-desc">
              Koneksi otomatis antara teori dan simulasi! Geser penggeser di bawah untuk bereksperimen langsung dengan rumus statistika yang telah kamu pelajari di bagian materi.
            </p>
          </div>
          
          <div className="flex font-mono text-[10px] bg-white border border-slate-200 p-2 rounded-xl items-center gap-2 shadow-2xs self-start shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping"></span>
            <span className="font-bold text-slate-500">LAB KONEKTIVITY AKTIF</span>
          </div>
        </div>

        {/* Tab Selector matched directly to the course syllabus topics */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mt-6" id="simulator-tab-selectors">
          <button
            onClick={() => setActiveMode('pemusatan')}
            className={`px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 justify-center transition-all cursor-pointer ${
              activeMode === 'pemusatan'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
            id="tab-mode-pemusatan"
          >
            <TrendingUp className="w-4 h-4" />
            <span>1. Simulasi Pemusatan Data</span>
          </button>
          
          <button
            onClick={() => setActiveMode('outlier')}
            className={`px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 justify-center transition-all cursor-pointer ${
              activeMode === 'outlier'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
            id="tab-mode-outlier"
          >
            <Coins className="w-4 h-4" />
            <span>2. Efek Outlier (Pencilan)</span>
          </button>

          <button
            onClick={() => setActiveMode('penyebaran')}
            className={`px-4 py-3 rounded-2xl text-xs font-bold flex items-center gap-2 justify-center transition-all cursor-pointer ${
              activeMode === 'penyebaran'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-100'
                : 'bg-white text-slate-600 border border-slate-200 hover:bg-slate-50'
            }`}
            id="tab-mode-penyebaran"
          >
            <Scissors className="w-4 h-4" />
            <span>3. Kuartil & Penyebaran Data</span>
          </button>
        </div>
      </div>

      {/* Simulator Viewports */}
      <AnimatePresence mode="wait">
        
        {/* ==================== 1. MODE: PEMUSATAN DATA ==================== */}
        {activeMode === 'pemusatan' && (
          <motion.div
            key="pemusatan"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            id="viewport-pemusatan"
          >
            {/* Control Column */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                    Tinggi Badan 8 Siswa
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Atur tinggi badan acak tiap anak (130-180 cm)</p>
                </div>
                <button
                  onClick={() => setStudents(initialStudents)}
                  className="text-[10px] font-bold text-indigo-600 bg-indigo-50/70 hover:bg-indigo-100/70 px-2.5 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              {/* Slider lists */}
              <div className="space-y-3 max-h-[310px] overflow-y-auto pr-1">
                {students.map((student) => (
                  <div key={student.id} className="p-3 bg-slate-50/50 hover:bg-slate-50 rounded-xl border border-slate-100 transition-colors">
                    <div className="flex justify-between items-center text-xs font-semibold mb-1">
                      <span className="text-slate-700">Siswa {student.name}</span>
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                        {student.height} cm
                      </span>
                    </div>
                    <input
                      type="range"
                      min="130"
                      max="180"
                      value={student.height}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setStudents(prev => prev.map(s => s.id === student.id ? { ...s, height: val } : s));
                      }}
                      className="w-full h-1.5 cursor-pointer accent-indigo-600 bg-slate-200 rounded-lg appearance-none"
                    />
                  </div>
                ))}
              </div>

              {/* Live Calculator Stats Box */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl space-y-3 font-mono text-xs shadow-md">
                <span className="text-[9px] uppercase font-sans font-extrabold tracking-widest text-indigo-400 block border-b border-white/10 pb-1.5">
                  Live Matematika Statistik (N = 8)
                </span>
                <div className="flex justify-between items-center bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-400 font-sans">1. Rerata (Mean):</span>
                  <div className="text-right">
                    <span className="text-blue-400 font-bold text-sm block">{sMean} cm</span>
                    <span className="text-[8px] text-slate-500 font-sans block">Total {sValues.reduce((a,b)=>a+b, 0)} &divide; 8</span>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-400 font-sans">2. Nilai Tengah (Median):</span>
                  <div className="text-right">
                    <span className="text-amber-400 font-bold text-sm block">{sMedian} cm</span>
                    <span className="text-[8px] text-slate-500 font-sans block">Data posisi ke-(4 + 5) &divide; 2</span>
                  </div>
                </div>
                <div className="flex justify-between items-center bg-slate-800/40 p-2 rounded-lg">
                  <span className="text-slate-400 font-sans">3. Modus (Paling Sering):</span>
                  <div className="text-right">
                    <span className="text-emerald-400 font-bold block">{sModus}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Dynamic Graph Chart Panel */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-5 flex flex-col justify-between shadow-xs">
              <div>
                <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
                  <div>
                    <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                      Grafik Balok Dinamis & Garis Batas
                    </h4>
                    <p className="text-[10px] text-slate-400">Garis bertitik menandakan kedudukan ukuran pemusatan di sumbu data</p>
                  </div>
                  <div className="flex gap-2.5 text-[9px] font-bold">
                    <span className="flex items-center gap-1 text-blue-600"><span className="w-2.5 h-0.5 bg-blue-500 rounded block"></span> Mean</span>
                    <span className="flex items-center gap-1 text-amber-600"><span className="w-2.5 h-0.5 bg-amber-500 rounded block"></span> Median</span>
                  </div>
                </div>

                {/* Plot Area */}
                <div className="h-[230px] relative border-b border-l border-slate-200 flex items-end justify-around px-2 pt-8" id="chart-viewport-pemusatan">
                  
                  {/* Grid Lines */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between" id="chart-gridlines">
                    <div className="w-full border-t border-slate-100 text-[8px] text-slate-400 pt-0.5 pl-1">180 cm</div>
                    <div className="w-full border-t border-slate-100 text-[8px] text-slate-400 pt-0.5 pl-1">155 cm</div>
                    <div className="w-full border-t border-slate-100 text-[8px] text-slate-400 pt-0.5 pl-1">130 cm</div>
                  </div>

                  {/* Lines projections */}
                  {(() => {
                    const bLim = 130;
                    const tLim = 180;
                    const meanPct = Math.min(Math.max(((sMean - bLim) / (tLim - bLim)) * 100, 0), 100);
                    const medPct = Math.min(Math.max(((sMedian - bLim) / (tLim - bLim)) * 100, 0), 100);

                    return (
                      <>
                        {/* Mean Line */}
                        <div
                          className="absolute left-0 w-full border-t-2 border-dotted border-blue-500 pointer-events-none z-10 transition-all duration-300"
                          style={{ bottom: `${meanPct}%` }}
                        >
                          <span className="absolute right-1 -top-3 bg-blue-600 text-white font-mono text-[8px] px-1 py-0.5 rounded font-extrabold shadow-sm">
                            Mean: {sMean}
                          </span>
                        </div>

                        {/* Median Line */}
                        <div
                          className="absolute left-0 w-full border-t-2 border-dotted border-amber-500 pointer-events-none z-10 transition-all duration-300"
                          style={{ bottom: `${medPct}%` }}
                        >
                          <span className="absolute left-1 -top-3 bg-amber-600 text-white font-mono text-[8px] px-1 py-0.5 rounded font-extrabold shadow-sm">
                            Median: {sMedian}
                          </span>
                        </div>
                      </>
                    );
                  })()}

                  {/* Display Bars */}
                  {students.map((student) => {
                    const bLim = 130;
                    const tLim = 180;
                    const ratio = Math.min(Math.max((student.height - bLim) / (tLim - bLim), 0.05), 1);
                    const pctHeight = ratio * 100;

                    // Highlight dynamic modus if heights matches modus values
                    const countMatches = sValues.filter(v => v === student.height).length;
                    const isModusVal = countMatches > 1 && sValues.filter(v => v === student.height).length === Math.max(...sValues.map(x => sValues.filter(z => z === x).length));

                    return (
                      <div key={student.id} className="flex flex-col items-center w-full group relative z-2">
                        <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[9px] font-mono px-1.5 py-0.5 rounded z-30 pointer-events-none text-center">
                          {student.name}
                          <strong className="block text-[10px] text-indigo-300">{student.height} cm</strong>
                        </div>

                        {/* Animated column */}
                        <div 
                          className={`w-4 sm:w-8 rounded-t-lg transition-all duration-300 shadow-2xs ${
                            isModusVal 
                              ? 'bg-gradient-to-t from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700' 
                              : 'bg-gradient-to-t from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700'
                          }`}
                          style={{ height: `${pctHeight}%` }}
                        />

                        <span className="text-[9px] text-slate-500 font-medium mt-1 select-none">
                          {student.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Informative Guidance */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-4 space-y-2 text-xs">
                <span className="font-bold text-slate-700 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  Misi Eksperimen Mandiri:
                </span>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  Coba atur tinggi badan <strong>Fitri</strong> dan <strong>Hana</strong> menjadi nilai yang sama (misalkan 160 cm). Amati grafik balok berwarna hijau! Itu adalah visualisasi otomatis nilai <strong>Modus</strong> karena muncul paling banyak di antara semua data.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== 2. MODE: EFEK OUTLIER (PENCILAN) ==================== */}
        {activeMode === 'outlier' && (
          <motion.div
            key="outlier"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            id="viewport-outlier"
          >
            {/* Control Column */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider text-amber-700">
                    Skenario Upah Bulanan
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Mengeksplorasi kestabilan Median vs sensitivitas Mean</p>
                </div>
                <button
                  onClick={() => setSalaries(initialSalaries)}
                  className="text-[10px] font-bold text-amber-750 bg-amber-50 hover:bg-amber-100/70 px-2.5 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <RotateCcw className="w-3 h-3" /> Reset
                </button>
              </div>

              <div className="bg-amber-50/50 border border-amber-100 rounded-2xl p-3.5 text-xs text-amber-900 space-y-1">
                <span className="font-bold flex items-center gap-1 text-[11px]">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
                  Materi Outlier (Pencilan):
                </span>
                <p className="leading-relaxed text-[10px]">
                  Dalam kelompok beranggotakan 5 orang ini, 4 orang bekerja sebagai staf biasa dengan upah rata-rata Rp4 Juta-an. Satu orang adalah Direktur Utama dengan upah yang sangat ekstrem. Geser upah Direktur di bawah ini untuk melihat dampaknya!
                </p>
              </div>

              {/* Sliders Container */}
              <div className="space-y-3">
                {/* Fixed Staff list for clarity */}
                <div className="space-y-2 bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="text-[9px] font-extrabold text-slate-400 uppercase tracking-widest block mb-2">Upah Staff (Stabil / Fixed)</span>
                  {salaries.slice(0, 4).map(sub => (
                    <div key={sub.id} className="flex justify-between items-center text-[11px] font-medium text-slate-600 py-1 border-b border-slate-100/60 last:border-0">
                      <span>{sub.role}</span>
                      <span className="font-mono bg-slate-200/80 px-1.5 py-0.5 rounded text-[10px]">Rp{sub.salary.toFixed(1)} Juta</span>
                    </div>
                  ))}
                </div>

                {/* Manipulatable Outlier Slider (Direktur Utama) */}
                <div className="p-4 bg-amber-50/40 border border-amber-200/80 rounded-2xl space-y-2">
                  <div className="flex justify-between items-center text-xs font-bold">
                    <span className="text-amber-800">💼 Gaji Direktur Utama (Pencilan)</span>
                    <span className="font-mono text-emerald-705 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200 animate-pulse text-[11px]">
                      Rp{salaries[4].salary.toFixed(1)} Juta
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="45"
                    step="1"
                    value={salaries[4].salary}
                    onChange={(e) => {
                      const val = Number(e.target.value);
                      setSalaries(prev => prev.map(s => s.id === 'w5' ? { ...s, salary: val } : s));
                    }}
                    className="w-full h-2 cursor-pointer accent-amber-600 bg-slate-200 rounded-lg appearance-none"
                  />
                  <div className="flex justify-between text-[8px] text-slate-400 font-mono">
                    <span>Min: Rp5.0 Juta</span>
                    <span>Sangat Ekstrem: Rp45.0 Juta</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Live Chart Comparison Panel */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-5 flex flex-col justify-between shadow-xs">
              <div>
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                    Dampak Pencilan pada Nilai Rerata vs Nilai Tengah
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Dua indikator ukuran pusat ini bersaing untuk mewakili karakteristik data kelompok</p>
                </div>

                {/* Main Visualizer: Comparison Bars */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-4" id="outlier-stat-cards">
                  
                  {/* Mean box */}
                  <div className="border border-blue-105 bg-blue-50/30 p-4 rounded-2xl relative overflow-hidden transition-all">
                    <span className="text-[9px] uppercase font-bold text-blue-500 block mb-1">Rata-Rata (Mean)</span>
                    <h5 className="font-mono text-xl sm:text-2xl font-extrabold text-blue-800 tracking-tight leading-none">
                      Rp {salMean.toFixed(2)} Juta
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                      Sifat: <strong className="text-red-500">Sensitif Pencilan!</strong> Jumlah seluruh gaji dibagi 5 orang. Karena ditarik oleh gaji Direktur yang sangat fantastis, nilai rata-rata ini seolah menunjukkan seluruh kelompok berkecukupan tinggi.
                    </p>
                    <div className="absolute right-3 top-3 opacity-15">
                      <TrendingUp className="w-10 h-10 text-blue-600" />
                    </div>
                  </div>

                  {/* Median box */}
                  <div className="border border-amber-105 bg-amber-50/30 p-4 rounded-2xl relative overflow-hidden transition-all">
                    <span className="text-[9px] uppercase font-bold text-amber-600 block mb-1">Nilai Tengah (Median)</span>
                    <h5 className="font-mono text-xl sm:text-2xl font-extrabold text-amber-800 tracking-tight leading-none">
                      Rp {salMedian.toFixed(2)} Juta
                    </h5>
                    <p className="text-[10px] text-slate-500 mt-2 leading-relaxed">
                      Sifat: <strong className="text-emerald-600">Kokoh & Konsisten!</strong> Upah pekerja ke-3 setelah diurutkan. Meskipun gaji Direktur melambung setinggi langit, median tetap menggambarkan kondisi nyata sebagian besar staf biasa.
                    </p>
                    <div className="absolute right-3 top-3 opacity-15">
                      <ArrowUpDown className="w-10 h-10 text-amber-600" />
                    </div>
                  </div>

                </div>

                {/* Horizontal data bars projection to visualize weights */}
                <div className="space-y-2 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                  <span className="text-[9px] font-bold text-slate-400 block mb-1 uppercase tracking-wider">Perbandingan Sebaran Data Sebenarnya</span>
                  <div className="space-y-2.5">
                    {salSorted.map((sal, idx) => {
                      const pctWidth = Math.min((sal / 45) * 100, 100);
                      const isOutlier = sal === salaries[4].salary;
                      return (
                        <div key={idx} className="flex items-center gap-2 text-[10px]">
                          <span className="w-18 text-slate-400 font-mono text-[9px] shrink-0 text-right">Data ke-{idx+1} [diurutkan]</span>
                          <div className="flex-1 bg-slate-200 h-3 rounded-full overflow-hidden relative">
                            <div 
                              className={`h-full rounded-full transition-all duration-300 ${
                                isOutlier ? 'bg-amber-500' : 'bg-indigo-500'
                              }`}
                              style={{ width: `${pctWidth}%` }}
                            />
                          </div>
                          <span className={`w-14 font-mono font-bold text-right shrink-0 ${isOutlier ? 'text-amber-600' : 'text-indigo-600'}`}>
                            Rp{sal.toFixed(1)} Jt
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Informative Guidance */}
              <div className="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 mt-4 space-y-2 text-xs">
                <span className="font-bold text-emerald-900 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  Kesimpulan Matematika Konseptual:
                </span>
                <p className="text-emerald-800 leading-relaxed text-[11px]">
                  Saat gaji Direktur Utama melesat di atas Rp35 Juta, rata-rata (Mean) kelompok ini melewati Rp10 Juta! Namun, <strong>tidak ada satu pun staff biasa</strong> yang gajinya mendekati Rp10 Juta tersebut. Dalam kasus ini, **Median (Rp4.5 Juta)** adalah representasi yang jauh lebih jujur dan akurat dibanding Mean!
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* ==================== 3. MODE: KUARTIL & PENYEBARAN DATA ==================== */}
        {activeMode === 'penyebaran' && (
          <motion.div
            key="penyebaran"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
            id="viewport-penyebaran"
          >
            {/* Control Column */}
            <div className="lg:col-span-5 bg-white border border-slate-200/80 rounded-3xl p-5 space-y-4 shadow-xs">
              <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                <div>
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider text-indigo-700">
                    Sawah 5 Pot Tanaman
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Memahami jangkauan suku Kuartil Q1, Q2, Q3, dan Qd</p>
                </div>
                <button
                  onClick={() => setPlants(initialPlants)}
                  className="text-[10px] font-bold text-indigo-750 bg-indigo-50 hover:bg-indigo-100/70 px-2.5 py-1 rounded-xl transition-all cursor-pointer flex items-center gap-1 shrink-0"
                >
                  <RotateCcw className="w-3 h-3" /> Reset Pot
                </button>
              </div>

              <p className="text-xs text-slate-500 leading-relaxed">
                Di bawah ini adalah 5 pot tanaman di taman sekolah. Atur tinggi masing-masing tanaman (10 - 100 cm). Sistem akan langsung **mengurutkan tanaman tersebut secara geometris** dan memotong nilainya menjadi kuartil secara live!
              </p>

              {/* Sliders Container */}
              <div className="space-y-3 max-h-[290px] overflow-y-auto pr-1">
                {plants.map((plant) => (
                  <div key={plant.id} className="p-3 bg-slate-50 hover:bg-slate-50/80 rounded-xl border border-slate-100 transition-colors">
                    <div className="flex justify-between items-center text-xs font-semibold mb-1">
                      <span className="text-slate-700">{plant.label}</span>
                      <span className="font-mono font-bold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded text-[10px]">
                        {plant.height} cm
                      </span>
                    </div>
                    <input
                      type="range"
                      min="10"
                      max="100"
                      value={plant.height}
                      onChange={(e) => {
                        const val = Number(e.target.value);
                        setPlants(prev => prev.map(p => p.id === plant.id ? { ...p, height: val } : p));
                      }}
                      className="w-full h-1.5 cursor-pointer accent-indigo-600 bg-slate-200 rounded-lg appearance-none"
                    />
                  </div>
                ))}
              </div>

              {/* Box Plot stats live values */}
              <div className="bg-slate-900 text-white p-4 rounded-2xl font-mono text-xs space-y-2.5">
                <span className="text-[9px] uppercase font-sans font-extrabold tracking-widest text-[#f59e0b] block border-b border-white/10 pb-1.5">
                  Formula Sebaran Kuartil (Data Terurut)
                </span>
                
                <div className="grid grid-cols-2 gap-2 text-[10px] text-slate-300">
                  <div className="bg-slate-800/60 p-2 rounded">
                    <span className="text-slate-400 block text-[8px] uppercase">Terendah (Min)</span>
                    <strong className="text-white text-xs">{pMin} cm</strong>
                  </div>
                  <div className="bg-slate-800/60 p-2 rounded">
                    <span className="text-slate-400 block text-[8px] uppercase">Tertinggi (Max)</span>
                    <strong className="text-white text-xs">{pMax} cm</strong>
                  </div>
                  <div className="bg-slate-800/60 p-2 rounded">
                    <span className="text-teal-400 block text-[8px] uppercase">Kuartil Bawah (Q1)</span>
                    <strong className="text-white text-xs">{pQ1} cm</strong>
                  </div>
                  <div className="bg-slate-800/60 p-2 rounded">
                    <span className="text-amber-400 block text-[8px] uppercase">Kuartil Atas (Q3)</span>
                    <strong className="text-white text-xs">{pQ3} cm</strong>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-2 space-y-1.5 text-[11px]">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jangkauan (Max - Min) :</span>
                    <span className="text-white font-bold">{pRange} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Jangkauan Antarkuartil (QR) :</span>
                    <span className="text-cyan-405 font-bold text-cyan-405">{pHamparan} cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-amber-400">Simpangan Kuartil (Qd) :</span>
                    <span className="text-amber-400 font-bold">0.5 &times; {pHamparan} = {pQd} cm</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Plants Visualization & Cut lines Panel */}
            <div className="lg:col-span-7 bg-white border border-slate-200/80 rounded-3xl p-5 flex flex-col justify-between shadow-xs">
              <div>
                <div className="border-b border-slate-100 pb-3 mb-4">
                  <h4 className="font-extrabold text-slate-800 text-xs uppercase tracking-wider">
                    Visualisasi Tanaman Terurut & Pembagi Kuartil
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-0.5">Suku kuartil membagi kelompok tanaman menjadi 4 bagian sama besar setelah diurutkan!</p>
                </div>

                {/* Pot Plants Display (Ordered Live!) */}
                <div className="h-[230px] relative border-b border-slate-200 flex items-end justify-around px-2 pt-10 bg-gradient-to-t from-slate-50/50 to-white rounded-t-2xl" id="plants-viewport">
                  
                  {/* Grid background lines */}
                  <div className="absolute inset-0 pointer-events-none flex flex-col justify-between" id="plants-grid">
                    <div className="w-full border-t border-slate-100 text-[8px] text-slate-400 pt-0.5 pl-1">100 cm</div>
                    <div className="w-full border-t border-indigo-50/70 text-[8px] text-slate-400 pt-0.5 pl-1">50 cm</div>
                    <div className="w-full border-b border-slate-100 text-[8px] text-slate-400 pb-0.5 pl-1">10 cm</div>
                  </div>

                  {/* Lines projections for Q1, Q2, Q3 */}
                  {(() => {
                    const bLim = 10;
                    const tLim = 100;
                    const q1Pct = Math.min(Math.max(((pQ1 - bLim) / (tLim - bLim)) * 100, 0), 100);
                    const q2Pct = Math.min(Math.max(((pQ2 - bLim) / (tLim - bLim)) * 100, 0), 100);
                    const q3Pct = Math.min(Math.max(((pQ3 - bLim) / (tLim - bLim)) * 100, 0), 100);

                    return (
                      <>
                        {/* Q1 Line */}
                        <div
                          className="absolute left-0 w-full border-t border-dashed border-teal-500 pointer-events-none z-10 transition-all duration-300"
                          style={{ bottom: `${q1Pct}%` }}
                        >
                          <span className="absolute left-1/4 -top-3 bg-teal-600 text-white font-mono text-[8px] px-1.5 py-0.2 rounded font-extrabold shadow-sm">
                            Q1 (Bawah): {pQ1} cm
                          </span>
                        </div>

                        {/* Q2 Median Line */}
                        <div
                          className="absolute left-0 w-full border-t-2 border-dotted border-[#f59e0b] pointer-events-none z-10 transition-all duration-300"
                          style={{ bottom: `${q2Pct}%` }}
                        >
                          <span className="absolute left-2/4 -translate-x-1/2 -top-4 bg-[#f59e0b] text-white font-mono text-[8px] px-2 py-0.5 rounded font-extrabold shadow-sm">
                            Q2 (Median): {pQ2} cm
                          </span>
                        </div>

                        {/* Q3 Line */}
                        <div
                          className="absolute left-0 w-full border-t border-dashed border-pink-500 pointer-events-none z-10 transition-all duration-300"
                          style={{ bottom: `${q3Pct}%` }}
                        >
                          <span className="absolute right-1/4 -top-3 bg-pink-600 text-white font-mono text-[8px] px-1.5 py-0.2 rounded font-extrabold shadow-sm">
                            Q3 (Atas): {pQ3} cm
                          </span>
                        </div>
                      </>
                    );
                  })()}

                  {/* Render 5 ordered plants */}
                  {pSortedObj.map((plant, orderIdx) => {
                    const bLim = 10;
                    const tLim = 100;
                    const ratio = Math.min(Math.max((plant.height - bLim) / (tLim - bLim), 0.05), 1);
                    const pctHeight = ratio * 100;

                    return (
                      <div key={plant.id} className="flex flex-col items-center w-full group relative z-2">
                        <div className="absolute bottom-full mb-1 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[9px] font-mono px-2 py-0.5 rounded z-30 pointer-events-none text-center">
                          {plant.label} (Asli)
                          <strong className="block text-[10px] text-teal-300">{plant.height} cm</strong>
                          <span className="text-[8px] text-slate-400 block">Posisi terurut ke-{orderIdx + 1}</span>
                        </div>

                        {/* Plant Stem Trunk */}
                        <div className="relative w-2.5 sm:w-4 flex flex-col justify-end" style={{ height: `${pctHeight}%` }}>
                          
                          {/* Leaves decors on top of the stem */}
                          <div className="w-5 h-5 sm:w-7 sm:h-7 bg-emerald-500 hover:bg-emerald-600 rounded-full flex items-center justify-center -mb-2.5 absolute top-0 left-1/2 -translate-x-1/2 shadow-xs border border-emerald-400">
                            <span className="text-[8px] sm:text-[9px] text-white font-mono font-bold">{plant.height}</span>
                          </div>

                          {/* Green trunk bar */}
                          <div className="w-1.5 sm:w-2 bg-gradient-to-t from-emerald-600 to-green-400 h-full mx-auto rounded-t shadow-3xs" />
                        </div>

                        {/* Pot Base */}
                        <div className="w-5 sm:w-8 h-4 bg-amber-700/90 rounded-b-md rounded-t-xs border border-amber-800 shadow-2xs mt-0.5" />

                        {/* Sub label of sorted index */}
                        <span className="text-[9px] text-slate-500 font-bold mt-1.5">
                          Data ke-{orderIdx + 1}
                        </span>
                        <span className="text-[8px] text-slate-400">
                          ({plant.label})
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Informative Guidance */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 mt-4 space-y-2 text-xs">
                <span className="font-bold text-slate-755 flex items-center gap-1">
                  <Info className="w-3.5 h-3.5 text-indigo-600 shrink-0" />
                  Materi Simpangan Kuartil (Qd):
                </span>
                <p className="text-slate-600 leading-relaxed text-[11px]">
                  <strong>Simpangan Kuartil ($Q_d$)</strong> berukuran setengah dari rentang jangkauan data tengah (interkuartil). Nilai ini memberi gambaran tepercaya tentang seberapa padat rentang ketinggian pot tanaman di bagian tengah!
                </p>
              </div>
            </div>
          </motion.div>
        )}

      </AnimatePresence>

      {/* Embed section for additional 3D simulators (GeoGebra) */}
      <div className="bg-white border border-slate-200 rounded-3xl p-6 shadow-xs" id="embed-module-box">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-3 mb-4 gap-2">
          <div>
            <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
              <Globe className="w-5 h-5 text-indigo-600" />
              Laboratorium Virtual Tambahan (GeoGebra Kelas Dunia)
            </h4>
            <p className="text-xs text-slate-450 mt-0.5">
              Butuh asisten grafik tambahan? Pelajari visualisasi sebaran kuartil dan boxplot komprehensif lewat platform interaktif ini.
            </p>
          </div>
          
          <button
            onClick={() => setIsEditingUrl(!isEditingUrl)}
            className="text-xs font-bold text-slate-500 hover:text-indigo-600 border border-slate-200 px-3 py-1.5 bg-slate-50 hover:bg-slate-100 rounded-xl transition-colors cursor-pointer"
          >
            {isEditingUrl ? 'Batal Edit' : 'Edit Tautan Iframe'}
          </button>
        </div>

        {isEditingUrl && (
          <form onSubmit={handleSaveUrl} className="mb-4 bg-slate-50 p-4 rounded-2xl border border-dashed border-slate-200 space-y-3">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Tautan Embed Iframe Baru:</label>
              <input
                type="text"
                value={embedUrl}
                onChange={(e) => setEmbedUrl(e.target.value)}
                placeholder="https://www.geogebra.org/material/iframe/..."
                className="w-full bg-white border border-slate-300 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none font-mono"
              />
            </div>
            <p className="text-[10px] text-slate-400">
              *Hanya rekomendasikan protokol HTTPS untuk tautan aman dari Geogebra atau Edutech tepercaya lainnya.
            </p>
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl px-4 py-1.5 text-xs font-bold transition-all cursor-pointer flex items-center gap-1"
            >
              <Check className="w-3.5 h-3.5" /> Terapkan URL Baru
            </button>
          </form>
        )}

        {/* Embedded Viewport */}
        <div className="w-full relative aspect-video bg-slate-50 rounded-2xl overflow-hidden border border-slate-200 shadow-inner" id="iframe-viewport-box">
          {savedEmbedUrl ? (
            <iframe
              src={savedEmbedUrl}
              className="w-full h-full border-0 absolute top-0 left-0"
              title="GeoGebra Interactive Statistics Simulator"
              allowFullScreen
              referrerPolicy="no-referrer"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
              <HelpCircle className="w-12 h-12 text-slate-300 mb-2 stroke-1 animate-bounce" />
              <h5 className="font-bold text-slate-600 text-xs">Iframe Simulasi Belum Dikonfigurasi</h5>
              <p className="text-[11px] text-slate-400 max-w-sm mt-1">
                Silakan masukkan link iframe interaktif visual dari GeoGebra atau phet-simulations kelas statistika dengan menekan tombol Edit Tautan Iframe.
              </p>
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
