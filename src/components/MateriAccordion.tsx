/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, BookOpen, AlertCircle, TrendingUp, Sparkles, Plus, Trash2 } from 'lucide-react';

export default function MateriAccordion() {
  const [activeTab, setActiveTab] = useState<number | null>(0);

  // Widget 1 state: Data Tunggal Input
  const [numbers1, setNumbers1] = useState<number[]>([12, 15, 14, 18, 20, 16, 15, 22]);
  const [inputValue1, setInputValue1] = useState<string>('');

  const calculateStats = (arr: number[]) => {
    if (arr.length === 0) return { mean: 0, median: 0, mode: 'Tidak ada' };
    
    // Sort
    const sorted = [...arr].sort((a, b) => a - b);
    
    // Mean
    const total = sorted.reduce((sum, val) => sum + val, 0);
    const mean = Number((total / sorted.length).toFixed(2));
    
    // Median
    const midIdx = Math.floor(sorted.length / 2);
    const median = sorted.length % 2 === 0 
      ? (sorted[midIdx - 1] + sorted[midIdx]) / 2 
      : sorted[midIdx];

    // Modus
    const counts: Record<number, number> = {};
    let maxCount = 0;
    sorted.forEach(num => {
      counts[num] = (counts[num] || 0) + 1;
      if (counts[num] > maxCount) maxCount = counts[num];
    });
    
    const modes: number[] = [];
    if (maxCount > 1) {
      Object.keys(counts).forEach(key => {
        if (counts[Number(key)] === maxCount) {
          modes.push(Number(key));
        }
      });
    }

    const modeStr = modes.length > 0 ? modes.join(', ') + ` (muncul ${maxCount} kali)` : 'Tidak ada (Semua data muncul 1 kali)';
    
    return { mean, median, mode: modeStr, sorted };
  };

  const handleAddNumber1 = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputValue1);
    if (!isNaN(val) && val >= 0 && val <= 100) {
      setNumbers1([...numbers1, val]);
      setInputValue1('');
    }
  };

  const handleResetNumbers1 = () => {
    setNumbers1([12, 15, 14, 18, 20, 16, 15, 22]);
  };

  const handleRemoveNumber1 = (idx: number) => {
    const nextArr = [...numbers1];
    nextArr.splice(idx, 1);
    setNumbers1(nextArr);
  };

  const stats1 = calculateStats(numbers1);

  // Widget 2: Outlier Demo State
  const [outlierVal, setOutlierVal] = useState<number>(3000000); // 3 juta to 15 juta
  const normalSalaries = [3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000, 3000000]; // 9 staff
  
  const getOutlierMetrics = () => {
    const salaries = [...normalSalaries, outlierVal];
    const mean = salaries.reduce((s, v) => s + v, 0) / salaries.length;
    
    const sorted = [...salaries].sort((a, b) => a - b);
    const median = (sorted[4] + sorted[5]) / 2; // n = 10
    
    return { mean, median };
  };
  const outlierMetrics = getOutlierMetrics();

  // Widget 3: Kuartil state
  const [numbers3, setNumbers3] = useState<number[]>([10, 12, 12, 14, 15, 16, 17, 19]);
  const [inputValue3, setInputValue3] = useState<string>('');

  const calculateSpreadStats = (arr: number[]) => {
    if (arr.length < 2) return { q1: 0, q2: 0, q3: 0, qd: 0, range: 0, sorted: [] };
    const sorted = [...arr].sort((a, b) => a - b);
    const n = sorted.length;
    
    // Range
    const range = sorted[n - 1] - sorted[0];

    // Functions to find position depending on interpolation
    // Using Indonesia Kemendikbud standard for school statistics
    // Median (Q2)
    const mid = Math.floor(n / 2);
    const q2 = n % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];

    // Splitting data depending on odd or even
    let lowerHalf: number[] = [];
    let upperHalf: number[] = [];

    if (n % 2 === 0) {
      lowerHalf = sorted.slice(0, mid);
      upperHalf = sorted.slice(mid);
    } else {
      // In school math, when odd, the median can be excluded or included based on conventions. 
      // Usually, median is excluded.
      lowerHalf = sorted.slice(0, mid);
      upperHalf = sorted.slice(mid + 1);
    }

    const getMedian = (subArr: number[]) => {
      if (subArr.length === 0) return 0;
      const len = subArr.length;
      const h = Math.floor(len / 2);
      return len % 2 === 0 ? (subArr[h - 1] + subArr[h]) / 2 : subArr[h];
    };

    const q1 = getMedian(lowerHalf);
    const q3 = getMedian(upperHalf);
    const qd = Number(((q3 - q1) / 2).toFixed(2));

    return { q1, q2, q3, qd, range, sorted };
  };

  const handleAddNumber3 = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(inputValue3);
    if (!isNaN(val)) {
      setNumbers3([...numbers3, val]);
      setInputValue3('');
    }
  };

  const handleResetNumbers3 = () => {
    setNumbers3([10, 12, 12, 14, 15, 16, 17, 19]);
  };

  const handleRemoveNumber3 = (idx: number) => {
    const nextArr = [...numbers3];
    nextArr.splice(idx, 1);
    setNumbers3(nextArr);
  };

  const stats3 = calculateSpreadStats(numbers3);

  const toggleTab = (id: number) => {
    setActiveTab(activeTab === id ? null : id);
  };

  const formatRupiah = (val: number) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(val);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-4" id="materi-accordion-root">
      
      {/* SECTION 1 */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs" id="materi-sec-1">
        <button
          onClick={() => toggleTab(0)}
          className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-white text-left font-sans font-medium hover:bg-slate-50/80 transition-colors focus:outline-none"
          id="materi-btn-1"
        >
          <div className="flex items-center gap-3">
            <div className="bg-indigo-100 text-indigo-700 p-2 rounded-lg" id="icon-container-1">
              <span className="font-bold text-sm">1</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">
                Ukuran Pemusatan Data (Mean, Median, Modus)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Menentukan mean, median, modus data tunggal serta cara menginterpretasikannya.
              </p>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeTab === 0 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {activeTab === 0 && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="p-6 border-t border-slate-100 space-y-6 text-sm text-slate-700 leading-relaxed font-sans" id="materi-body-1">
                {/* Penjelasan Materi */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="cards-pemusatan">
                  <div className="p-4 bg-blue-50/50 rounded-xl border border-blue-100" id="card-mean">
                    <h4 className="font-bold text-blue-900 flex items-center gap-2 mb-2 text-sm">
                      <span className="bg-blue-100 px-1.5 py-0.5 rounded text-xs">A</span> Mean (Rata-rata)
                    </h4>
                    <p className="text-xs text-slate-600 mb-3">
                      Wakil nilai dari sekumpulan data yang paling sering digunakan, dihitung dengan menjumlahkan seluruh nilai dibagi dengan banyaknya data.
                    </p>
                    <div className="bg-white p-2.5 rounded-lg text-center border border-blue-100">
                      <span className="text-xs text-slate-400 block font-mono">Rumus:</span>
                      <code className="text-xs text-indigo-700 font-bold font-mono">Mean (x̄) = Σx / n</code>
                    </div>
                  </div>

                  <div className="p-4 bg-amber-50/50 rounded-xl border border-amber-100" id="card-median">
                    <h4 className="font-bold text-amber-900 flex items-center gap-2 mb-2 text-sm">
                      <span className="bg-amber-100 px-1.5 py-0.5 rounded text-xs">B</span> Median (Nilai Tengah)
                    </h4>
                    <p className="text-xs text-slate-600 mb-3">
                      Nilai tengah setelah data **diurutkan** dari terkecil ke terbesar. Jika jumlah data genap, median adalah rata-rata dari dua data tengah.
                    </p>
                    <div className="bg-white p-2.5 rounded-lg text-center border border-amber-100">
                      <span className="text-xs text-slate-400 block font-mono">Langkah:</span>
                      <span className="text-xs text-indigo-700 font-bold font-mono">Urutkan → Ambil Tengah</span>
                    </div>
                  </div>

                  <div className="p-4 bg-emerald-50/50 rounded-xl border border-emerald-100" id="card-modus">
                    <h4 className="font-bold text-emerald-900 flex items-center gap-2 mb-2 text-sm">
                      <span className="bg-emerald-100 px-1.5 py-0.5 rounded text-xs">C</span> Modus (Sering Muncul)
                    </h4>
                    <p className="text-xs text-slate-600 mb-3">
                      Data yang memiliki frekuensi kemunculan paling tinggi. Sebuah kumpulan data bisa memiliki satu modus, banyak modus, atau tidak memiliki modus sama sekali.
                    </p>
                    <div className="bg-white p-2.5 rounded-lg text-center border border-emerald-100">
                      <span className="text-xs text-slate-400 block font-mono">Ciri-ciri:</span>
                      <span className="text-xs text-indigo-700 font-bold font-mono">Frekuensi Tertinggi</span>
                    </div>
                  </div>
                </div>

                {/* Interactive Calculator Simulator */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200" id="interactive-calculator-1">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-5 h-5 text-indigo-600 animate-pulse" />
                      <h4 className="font-bold text-slate-800 text-sm">Kalkulator Interaktif Statistika Sekolah</h4>
                    </div>
                    <button
                      onClick={handleResetNumbers1}
                      className="text-xs font-semibold text-slate-500 hover:text-indigo-600 border border-slate-200 hover:border-indigo-400 bg-white px-2.5 py-1 rounded transition-colors"
                    >
                      Reset Data Awal
                    </button>
                  </div>
                  
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Masukkan beberapa angka nilai/data sekolah siswa (contoh: 70, 80, 85, lalu klik tambah). Perhatikan bagaimana mean, median, dan modus terhitung seketika!
                  </p>

                  <form onSubmit={handleAddNumber1} className="flex gap-2 mb-4" id="form-calc-1">
                    <input
                      type="number"
                      value={inputValue1}
                      onChange={(e) => setInputValue1(e.target.value)}
                      placeholder="Masukkan nilai siswa (0 - 100)"
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                      min="0"
                      max="100"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah Data
                    </button>
                  </form>

                  {/* Badges of current numbers */}
                  <div className="mb-5">
                    <span className="text-xs font-semibold text-slate-500 block mb-2">Banyak Data (n = {numbers1.length})</span>
                    <div className="flex flex-wrap gap-2" id="data-tunggal-list">
                      {numbers1.map((num, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1 shadow-2xs"
                        >
                          <span className="text-xs font-bold font-mono text-slate-800">{num}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveNumber1(idx)}
                            className="text-slate-400 hover:text-red-500 rounded p-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {numbers1.length === 0 && (
                        <div className="text-xs text-red-500 font-medium italic">Data kosong! Masukkan nilai di atas.</div>
                      )}
                    </div>
                  </div>

                  {/* Calculations panel */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-4 border-t border-slate-200 bg-white p-4 rounded-xl shadow-xs" id="calc-results-1">
                    <div className="text-center p-3 rounded-lg bg-blue-50/50 border border-blue-100">
                      <span className="text-xs uppercase text-blue-800 tracking-wider font-semibold block mb-1">RATA-RATA (MEAN)</span>
                      <strong className="text-xl font-mono text-blue-900">{stats1.mean}</strong>
                      <span className="text-[10px] text-slate-400 block mt-1">Suhu rata-rata / Nilai kelompok</span>
                    </div>
                    
                    <div className="text-center p-3 rounded-lg bg-amber-50/50 border border-amber-100">
                      <span className="text-xs uppercase text-amber-800 tracking-wider font-semibold block mb-1">MEDIAN</span>
                      <strong className="text-xl font-mono text-amber-900">{stats1.median}</strong>
                      <span className="text-[10px] text-slate-400 block mt-1">Nilai tengah yang memotong 50% data</span>
                    </div>

                    <div className="text-center p-3 rounded-lg bg-emerald-50/50 border border-emerald-100">
                      <span className="text-xs uppercase text-emerald-800 tracking-wider font-semibold block mb-1">MODUS</span>
                      <strong className="text-sm font-sans block text-emerald-900 font-bold truncate">{stats1.mode}</strong>
                      <span className="text-[10px] text-slate-400 block mt-1">Item paling dominan / sering dibeli</span>
                    </div>
                  </div>

                  <div className="mt-3 bg-indigo-50/40 p-3 rounded-xl border border-indigo-100/40 flex items-center gap-2.5" id="sorted-helper-info">
                    <span className="text-xs font-semibold text-indigo-800">Visualisasi Urutan Data:</span>
                    <span className="font-mono text-xs text-slate-600 bg-white px-2 py-0.5 rounded border border-indigo-100">
                      {stats1.sorted.join(' ➔ ')}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SECTION 2 */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs" id="materi-sec-2">
        <button
          onClick={() => toggleTab(1)}
          className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-white text-left font-sans font-medium hover:bg-slate-50/80 transition-colors focus:outline-none"
          id="materi-btn-2"
        >
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 text-amber-700 p-2 rounded-lg" id="icon-container-2">
              <span className="font-bold text-sm">2</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">
                Menganalisis Kesesuaian Penggunaan Mean, Median, Modus
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Kapan sebaiknya kita memakai rata-rata kelompok, nilai tengah, atau data modus?
              </p>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeTab === 1 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {activeTab === 1 && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="p-6 border-t border-slate-100 space-y-5 text-sm text-slate-700 leading-relaxed font-sans" id="materi-body-2">
                <p id="paragraf-apersepsi-2">
                  Tidak semua data cocok dihitung rata-ratanya. Sebagai contoh, jika Anda memiliki data gaji 9 staf pabrik yaitu Rp3 juta dan 1 orang direktur utama yaitu Rp100 juta per bulan. Jika kita menghitung rata-ratanya:
                </p>

                <div className="p-4 bg-indigo-50 rounded-xl border border-indigo-100 font-mono text-xs space-y-1" id="box-perhitungan-demo">
                  <p><strong>Total Gaji:</strong> (9 × Rp3.000.000) + Rp100.000.000 = Rp127.000.000</p>
                  <p><strong>Rata-rata (Mean):</strong> Rp127.000.000 ÷ 10 orang = <strong>Rp12.700.000 / bulan</strong></p>
                </div>

                <p id="p-explanation-analisis">
                  Mengeklaim gaji rata-rata staf adalah Rp12.700.000 tentu **menyesatkan**, karena kenyataannya 90% karyawan hanya berpenghasilan Rp3.000.000. Rata-rata terdistorsi oleh data ekstrem / pencilan (outlier).
                </p>

                {/* Table Perbandingan */}
                <div className="overflow-x-auto border border-slate-150 rounded-xl" id="table-kriteria">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-100 border-b border-slate-200">
                      <tr>
                        <th className="p-3 font-semibold text-slate-700">Jenis</th>
                        <th className="p-3 font-semibold text-slate-700">Kapan Paling Cocok Digunakan?</th>
                        <th className="p-3 font-semibold text-slate-700">Kelebihan</th>
                        <th className="p-3 font-semibold text-slate-700">Kelemahan</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      <tr>
                        <td className="p-3 font-bold text-blue-700">Mean</td>
                        <td className="p-3 text-slate-600">Terbuka untuk data yang menyebar normal / seragam (tidak ada pencilan).</td>
                        <td className="p-3 text-slate-600">Melibatkan matematika seluruh elemen data secara teoretis.</td>
                        <td className="p-3 text-slate-600 font-medium text-red-600">Sangat mudah terdistorsi oleh nilai ekstrem tunggal.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-amber-700">Median</td>
                        <td className="p-3 text-slate-600">Terdapat data pencilan atau sebaran data yang jomplang/skewed.</td>
                        <td className="p-3 text-slate-600">Kebal terhadap nilai ekstrim (tidak terpengaruh gaji direktur).</td>
                        <td className="p-3 text-slate-600">Tidak sensitif terhadap perubahan nilai selain data tengah.</td>
                      </tr>
                      <tr>
                        <td className="p-3 font-bold text-emerald-700">Modus</td>
                        <td className="p-3 text-slate-600">Data berskala kategorik (contoh: ukuran kaos terbanyak, menu favorit, warna).</td>
                        <td className="p-3 text-slate-600">Menunjukkan apa yang paling sering atau lumrah dipilih masyarakat.</td>
                        <td className="p-3 text-slate-600">Tidak selalu ada, atau terkadang terlalu banyak modus.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Interactive Outlier Scenario Tool */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200" id="interactive-scenario-outlier">
                  <div className="flex items-center gap-1.5 mb-2">
                    <TrendingUp className="w-5 h-5 text-indigo-600" />
                    <h4 className="font-bold text-slate-800 text-sm">Eksperimen Outlier: Geser Gaji Pemimpin Pabrik</h4>
                  </div>
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Lihatlah grafik virtual ini. Ada 9 staf pabrik bergaji tetap Rp3.000.000. Sisanya adalah 1 Pemimpin yang gajinya dapat Anda geser di bawah. Perhatikan bagaimana pergeseran ini memengaruhi Mean tapi tidak dengan Median!
                  </p>

                  <div className="space-y-4 bg-white p-4 rounded-xl border border-slate-100 shadow-2xs" id="slider-outlier-container">
                    <div className="flex items-center justify-between text-xs" id="slider-labels">
                      <span className="font-semibold text-slate-600">Gaji Pemimpin:</span>
                      <strong className="font-mono text-indigo-700 text-sm">{formatRupiah(outlierVal)}</strong>
                    </div>
                    
                    <input
                      type="range"
                      min="3000000"
                      max="30000000"
                      step="1000000"
                      value={outlierVal}
                      onChange={(e) => setOutlierVal(Number(e.target.value))}
                      className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600"
                    />

                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-slate-100 text-center" id="stat-outlier-results">
                      <div className="p-2.5 rounded bg-blue-50/40 border border-blue-100">
                        <span className="text-[11px] font-bold text-blue-900 block">RERATA (MEAN) KELOMPOK</span>
                        <strong className="text-lg font-mono text-blue-700">{formatRupiah(outlierMetrics.mean)}</strong>
                        <span className="text-[10px] text-red-500/80 block mt-0.5">*(Ikut membengkak parah)</span>
                      </div>
                      
                      <div className="p-2.5 rounded bg-amber-50/40 border border-amber-100">
                        <span className="text-[11px] font-bold text-amber-900 block">MEDIAN KELOMPOK</span>
                        <strong className="text-lg font-mono text-amber-700">{formatRupiah(outlierMetrics.median)}</strong>
                        <span className="text-[10px] text-emerald-600 block mt-0.5">*(Stabil di Rp3 Juta!)</span>
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* SECTION 3 */}
      <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-xs" id="materi-sec-3">
        <button
          onClick={() => toggleTab(2)}
          className="w-full flex items-center justify-between p-5 bg-gradient-to-r from-slate-50 to-white text-left font-sans font-medium hover:bg-slate-50/80 transition-colors focus:outline-none"
          id="materi-btn-3"
        >
          <div className="flex items-center gap-3">
            <div className="bg-emerald-100 text-emerald-700 p-2 rounded-lg" id="icon-container-3">
              <span className="font-bold text-sm">3</span>
            </div>
            <div>
              <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">
                Ukuran Penyebaran Data (Jangkauan, Kuartil, Simpangan Kuartil)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Menemukan keragaman data tunggal dengan jangkauan, batas kuartil atas, dan simpangan kuartil.
              </p>
            </div>
          </div>
          <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform ${activeTab === 2 ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {activeTab === 2 && (
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: "auto" }}
              exit={{ height: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="p-6 border-t border-slate-100 space-y-6 text-sm text-slate-700 leading-relaxed font-sans" id="materi-body-3">
                
                {/* Visual Math Card */}
                <div className="bg-gradient-to-br from-indigo-900 to-indigo-955 text-white p-6 rounded-2xl relative overflow-hidden shadow-md" id="spread-math-card">
                  <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-5 translate-y-5" id="decor-box-3">
                    <BookOpen className="w-48 h-48" />
                  </div>
                  
                  <h4 className="font-sans font-medium text-indigo-200 uppercase tracking-widest text-xs mb-1" id="subcard-title">Kamus Kuartil (Kuartal Pembagian 4)</h4>
                  <p className="text-sm font-sans mb-4 leading-relaxed" id="subcard-p">
                    Apabila data yang diurutkan dibelah oleh median, kita mendapatkan 2 kelompok. Batas tengah kelompok kiri adalah **Kuartil Bawah (Q1)**, dan batas tengah kelompok kanan adalah **Kuartil Atas (Q3)**.
                  </p>

                  <div className="space-y-2 text-xs" id="formula-list-3">
                    <div className="flex justify-between items-center bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-700/30">
                      <span>📏 <strong>Jangkauan (Range):</strong> Selisih ujung terbesar & terkecil</span>
                      <code className="text-amber-300 font-mono font-bold">R = Xmax - Xmin</code>
                    </div>
                    <div className="flex justify-between items-center bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-700/30">
                      <span>📉 <strong>Hamparan (Jangkauan Interkuartil):</strong> Panjang daerah aman tengah</span>
                      <code className="text-amber-300 font-mono font-bold">H = Q3 - Q1</code>
                    </div>
                    <div className="flex justify-between items-center bg-indigo-950/40 p-2.5 rounded-lg border border-indigo-700/30">
                      <span>🌓 <strong>Simpangan Kuartil:</strong> Setengah hamparan penyimpangan</span>
                      <code className="text-amber-300 font-mono font-bold">Qd = 0.5 × (Q3 - Q1)</code>
                    </div>
                  </div>
                </div>

                {/* Interactive Kuartil Calculator */}
                <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200" id="interactive-kuartil-calc">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-1.5">
                      <Sparkles className="w-5 h-5 text-indigo-600" />
                      <h4 className="font-bold text-slate-800 text-sm">Mesin Pemecah Kuartil & Simpangan</h4>
                    </div>
                    <button
                      onClick={handleResetNumbers3}
                      className="text-xs font-semibold text-slate-500 hover:text-indigo-600 bg-white border border-slate-200 px-2.5 py-1 rounded transition-colors"
                    >
                      Reset Data Awal
                    </button>
                  </div>
                  
                  <p className="text-xs text-slate-500 mb-4 leading-relaxed">
                    Masukkan beberapa baris tinggi tanaman, produksi susu, atau berat siswa untuk menghitung jangkauan luar, letak Q1, Q2, Q3 dan Qd secara detail.
                  </p>

                  <form onSubmit={handleAddNumber3} className="flex gap-2 mb-4" id="form-calc-3">
                    <input
                      type="number"
                      value={inputValue3}
                      onChange={(e) => setInputValue3(e.target.value)}
                      placeholder="Masukkan angka data numerik bebas"
                      className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                    />
                    <button
                      type="submit"
                      className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 py-1.5 text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Tambah
                    </button>
                  </form>

                  <div className="mb-4">
                    <span className="text-xs font-semibold text-slate-500 block mb-2">Kumpulan Data (n = {numbers3.length})</span>
                    <div className="flex flex-wrap gap-2" id="data-tunggal-list-3">
                      {numbers3.map((num, idx) => (
                        <div
                          key={idx}
                          className="flex items-center gap-1.5 bg-white border border-slate-200 rounded-lg px-2.5 py-1 shadow-2xs"
                        >
                          <span className="text-xs font-bold font-mono text-slate-800">{num}</span>
                          <button
                            type="button"
                            onClick={() => handleRemoveNumber3(idx)}
                            className="text-slate-400 hover:text-red-500 rounded p-0.5"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      ))}
                      {numbers3.length === 0 && (
                        <div className="text-xs text-red-500 font-medium italic">Data kosong!</div>
                      )}
                    </div>
                  </div>

                  {numbers3.length >= 2 ? (
                    <div className="space-y-4" id="stats-outlier-panel-3">
                      {/* Interactive Visual steps */}
                      <div className="bg-white p-4 rounded-xl border border-slate-100 flex flex-col md:flex-row gap-4 items-center justify-between shadow-2xs">
                        <div className="text-left">
                          <span className="text-xs font-semibold text-slate-400">Data Terurut (Sorted)</span>
                          <div className="flex items-center gap-1.5 mt-1 font-mono text-xs text-indigo-700 bg-indigo-50/50 px-2.5 py-1 rounded border border-indigo-100/50">
                            {stats3.sorted.join(' ➔ ')}
                          </div>
                        </div>

                        <div className="text-left w-full md:w-auto">
                          <span className="text-xs font-semibold text-slate-400">Taksiran Nilai Batas</span>
                          <div className="grid grid-cols-4 gap-2 mt-1 text-center font-mono text-xs">
                            <div className="bg-slate-100 p-1 rounded font-bold">
                              <span className="text-[9px] text-slate-400 block font-sans font-normal">Min</span>
                              {stats3.sorted[0]}
                            </div>
                            <div className="bg-blue-50 p-1 border border-blue-100 rounded font-bold text-blue-700">
                              <span className="text-[9px] text-blue-400 block font-sans font-normal">Q1</span>
                              {stats3.q1}
                            </div>
                            <div className="bg-amber-100 p-1 border border-amber-200 rounded font-bold text-amber-700">
                              <span className="text-[9px] text-amber-400 block font-sans font-normal">Q2</span>
                              {stats3.q2}
                            </div>
                            <div className="bg-blue-50 p-1 border border-blue-100 rounded font-bold text-blue-700">
                              <span className="text-[9px] text-blue-400 block font-sans font-normal">Q3</span>
                              {stats3.q3}
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Display calculations box */}
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                        <div className="p-3 bg-white border border-slate-150 rounded-xl text-center shadow-2xs">
                          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">JANGKAUAN (R)</span>
                          <strong className="text-base font-mono text-slate-800">{stats3.range}</strong>
                          <span className="text-[9px] text-slate-400 block mt-0.5">({stats3.sorted[stats3.sorted.length - 1]} - {stats3.sorted[0]})</span>
                        </div>

                        <div className="p-3 bg-white border border-slate-150 rounded-xl text-center shadow-2xs">
                          <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider">HAMPARAN (Q3 - Q1)</span>
                          <strong className="text-base font-mono text-slate-800">{stats3.q3 - stats3.q1}</strong>
                          <span className="text-[9px] text-slate-400 block mt-0.5">({stats3.q3} - {stats3.q1})</span>
                        </div>

                        <div className="p-3 bg-indigo-50 border border-indigo-150 rounded-xl text-center shadow-2xs col-span-2 md:col-span-1">
                          <span className="text-[10px] text-indigo-800 block font-bold uppercase tracking-wider">SIMPANGAN KUARTIL (QD)</span>
                          <strong className="text-lg font-mono text-indigo-900">{stats3.qd}</strong>
                          <span className="text-[9px] text-indigo-500 block mt-0.5">0.5 × ({stats3.q3 - stats3.q1})</span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center p-6 bg-amber-50 rounded-xl border border-amber-200 text-xs text-amber-800 font-medium" id="alert-calc-3">
                      ⚠️ Masukkan minimal 2 angka atau lebih untuk memulai memetakan jangkauan kuartil data!
                    </div>
                  )}

                </div>

              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
}
