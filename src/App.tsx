/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Menu, X, BookOpen, GraduationCap, Home, Info, 
  Layers, Lightbulb, PlayCircle, HelpCircle, FileText, CheckCircle 
} from 'lucide-react';

// Subcomponents import
import MoodSelector from './components/MoodSelector';
import MateriAccordion from './components/MateriAccordion';
import ExplorationModule from './components/ExplorationModule';
import QuizANBK from './components/QuizANBK';
import Tugaslkpd from './components/Tugaslkpd';
import Penutup from './components/Penutup';

type SectionKey = 'beranda' | 'pendahuluan' | 'materi' | 'eksplorasi' | 'kuis' | 'tugas' | 'penutup';

interface NavItem {
  key: SectionKey;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
}

export default function App() {
  const [activeSection, setActiveSection] = useState<SectionKey>('beranda');
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const navItems: NavItem[] = [
    { key: 'beranda', label: 'Beranda', icon: Home },
    { key: 'pendahuluan', label: 'Pendahuluan', icon: Info },
    { key: 'materi', label: 'Materi', icon: Layers },
    { key: 'eksplorasi', label: 'Eksplorasi', icon: PlayCircle },
    { key: 'kuis', label: 'Kuis ANBK', icon: HelpCircle },
    { key: 'tugas', label: 'Tugas', icon: FileText },
    { key: 'penutup', label: 'Penutup', icon: CheckCircle },
  ];

  const handleNavClick = (key: SectionKey) => {
    setActiveSection(key);
    setMobileMenuOpen(false);
    // Scroll to top of window smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50/60 flex flex-col font-sans" id="applet-viewport">
      
      {/* ==================== GLOBAL EDUCATION TOPHEADER ==================== */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-2xs" id="main-header">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20" id="header-row-container">
            
            {/* School Brand Badge */}
            <div className="flex items-center gap-3" id="header-brand">
              <span className="w-12 h-12 rounded-xl bg-indigo-650 text-white flex items-center justify-center shadow-xs shrink-0" id="brand-logo-icon">
                <GraduationCap className="w-7 h-7" />
              </span>
              <div>
                <h1 className="font-sans font-extrabold text-slate-800 text-xs sm:text-sm tracking-tight leading-tight uppercase" id="header-main-title">
                  UKURAN PENYEBARAN DAN PEMUSATAN DATA (STATISTIK)
                </h1>
                <div className="flex flex-wrap items-center gap-x-2.5 gap-y-0.5 text-[10px] text-slate-400 font-medium" id="header-meta-info">
                  <span className="text-indigo-600 font-bold bg-indigo-50 px-1.5 py-0.5 rounded">Kelas 8 Fase D MATEMATIKA</span>
                  <span className="border-l border-slate-200 pl-2.5">Guru: <strong>SUWARTO, S.Pd</strong></span>
                </div>
              </div>
            </div>

            {/* DESKTOP NAVIGATION BAR (Horizontal) */}
            <nav className="hidden lg:flex items-center gap-1" id="desktop-nav">
              {navItems.map((item) => {
                const isActive = activeSection === item.key;
                const Icon = item.icon;
                return (
                  <button
                    key={item.key}
                    id={`nav-link-desktop-${item.key}`}
                    onClick={() => handleNavClick(item.key)}
                    className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                      isActive 
                        ? 'bg-indigo-600 text-white shadow-xs scale-105' 
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }`}
                  >
                    <Icon className="w-4 h-4 shrink-0 animate-duration-300" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </nav>

            {/* MOBILE HAMBURGER BUTTON (Garis 3) */}
            <div className="lg:hidden flex items-center" id="mobile-hamburger-trigger">
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 rounded-lg text-slate-600 hover:bg-slate-100 hover:text-slate-900 focus:outline-none transition-colors cursor-pointer"
                aria-label="Toggle Navigation Menu"
                id="btn-hamburger"
              >
                {mobileMenuOpen ? <X className="w-6 h-6 animate-spin-once" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>

          </div>
        </div>

        {/* MOBILE MENU DROPDOWN PANEL (Slide-in / Dropdown) */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-t border-slate-100 overflow-hidden shadow-lg"
              id="mobile-nav-panel"
            >
              <div className="px-3 py-4 space-y-1.5" id="mobile-nav-list">
                {navItems.map((item) => {
                  const isActive = activeSection === item.key;
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.key}
                      id={`nav-link-mobile-${item.key}`}
                      onClick={() => handleNavClick(item.key)}
                      className={`w-full text-left px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-3 transition-colors cursor-pointer ${
                        isActive
                          ? 'bg-indigo-600 text-white'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-950'
                      }`}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* ==================== SCREEN SWITCHBOARD VIEWPORT ==================== */}
      <main className="flex-1 py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full" id="main-content-viewport">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="w-full"
            id={`section-${activeSection}`}
          >
            
            {/* 1. SECTION: BERANDA */}
            {activeSection === 'beranda' && (
              <div className="space-y-8" id="sec-beranda-body">
                {/* Greeting banner */}
                <div className="bg-gradient-to-tr from-indigo-900 via-indigo-950 to-indigo-900 text-white p-8 md:p-12 rounded-3xl relative overflow-hidden shadow-md" id="beranda-hero">
                  <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none transform translate-x-12 translate-y-12" id="hero-decor">
                    < GraduationCap className="w-80 h-80" />
                  </div>
                  
                  <div className="max-w-2xl space-y-4 relative z-10" id="hero-headlines">
                    <span className="bg-indigo-700 text-indigo-150 uppercase tracking-widest text-[10px] font-bold px-3 py-1 rounded-full border border-indigo-600/40" id="tagline-fase">
                      Matematika Kurikulum Merdeka
                    </span>
                    <h2 className="text-xl md:text-3xl font-bold font-sans tracking-tight leading-tight" id="hero-title">
                      Selamat Datang di Portal Statistik Interaktif Kelas 8!
                    </h2>
                    <p className="text-xs md:text-sm text-indigo-200/90 leading-relaxed font-sans font-medium" id="hero-para-caption">
                      Halo anak-anak berprestasi! Berjumpa lagi bersama Bapak Suwarto, S.Pd dalam modul digital interaktif materi **Ukuran Penyebaran dan Pemusatan Data**. Di portal ini, kalian akan belajar eksplorasi data secara visual, memanipulasi rentang angka pada simulator, berlatih menjawab soal latihan berformat ANBK, serta mengisi portofolio lembar refleksi dengan asyik dan mandiri.
                    </p>
                  </div>
                </div>

                {/* Mood Selector Module */}
                <MoodSelector />
              </div>
            )}

            {/* 2. SECTION: PENDAHULUAN */}
            {activeSection === 'pendahuluan' && (
              <div className="space-y-6" id="sec-pendahuluan-body">
                {/* Tujuan Pembelajaran Card (replacement for mockup AI tools) */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs space-y-5" id="pend-tujuan-pembelajaran">
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-3" id="tujuan-header">
                    <span className="p-2.5 bg-indigo-50 text-indigo-600 rounded-xl" id="tujuan-decor-icon">
                      <GraduationCap className="w-5 h-5" />
                    </span>
                    <div>
                      <h3 className="font-bold text-slate-800 text-base">Tujuan Pembelajaran (Fase D)</h3>
                      <p className="text-xs text-slate-400 mt-0.5">Sesuai dengan target kurikulum Asesmen Nasional Kemendikbudristek</p>
                    </div>
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed" id="tujuan-p-general">
                    Di akhir kegiatan pembelajaran ini, siswa diharapkan memiliki kecakapan numerasi untuk:
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans font-medium text-slate-700" id="goals-grid">
                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-150" id="goal-item-1">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 font-bold text-indigo-700 flex items-center justify-center mb-2 font-mono text-xs">1</div>
                      <p className="leading-relaxed">Menentukan ukuran pemusatan data (mean, median, modus) dari sekumpulan data tunggal matematika secara tepat.</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-150" id="goal-item-2">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 font-bold text-indigo-700 flex items-center justify-center mb-2 font-mono text-xs">2</div>
                      <p className="leading-relaxed">Menganalisis dan menjustifikasi jenis ukuran pemusatan (Mean/Median/Modus) yang paling cocok mewakili karakteristik suatu kelompok data (outlier analysis).</p>
                    </div>

                    <div className="p-4 bg-slate-50 rounded-xl border border-slate-150" id="goal-item-3">
                      <div className="w-7 h-7 rounded-full bg-indigo-100 font-bold text-indigo-700 flex items-center justify-center mb-2 font-mono text-xs">3</div>
                      <p className="leading-relaxed">Menghitung dan memetakan pola distribusi sebaran data tunggal yang mencakup Jangkauan, Kuartil (Q1, Q2, Q3), serta Simpangan Kuartil (Qd).</p>
                    </div>
                  </div>
                </div>

                {/* Paragraf Apersepsi */}
                <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-xs space-y-4" id="pend-apersepsi">
                  <h4 className="font-bold text-slate-800 text-sm flex items-center gap-2" id="apersepsi-title">
                    <Lightbulb className="w-4.5 h-4.5 text-amber-500" />
                    Apersepsi Harian: Mengapa Kita Butuh Statistika?
                  </h4>
                  <p className="text-xs text-slate-600 leading-relaxed font-sans" id="apersepsi-para">
                    Anak-anak sekalian, pernahkah kamu bertanya-tanya bagaimana sebuah diler donat di kantin mengetahui rasa apa yang harus diproduksi paling banyak setiap pagi agar habis terjual? Atau bagaimana guru kelas menentukan nilai rata-rata ulangan kelasmu? Semua keputusan penting di dunia nyata—mulai dari memprediksi cuaca, menghitung pengeluaran belanja keluarga, hingga riset vaksin medis—diambil berdasarkan pola data yang dikumpulkan. Di bab ini, kita akan membuka rahasia di balik angka-angka tersebut untuk menemukan struktur tersembunyi lewat statistika dasar yang sangat asyik!
                  </p>
                </div>
              </div>
            )}

            {/* 3. SECTION: MATERI */}
            {activeSection === 'materi' && (
              <div className="space-y-6" id="sec-materi-body">
                <div className="text-center max-w-xl mx-auto space-y-1" id="materi-header-caption">
                  <h3 className="font-bold text-slate-800 text-base md:text-lg">Katalog Panduan Belajar Statistik</h3>
                  <p className="text-xs text-slate-500">Klik setiap tab modul di bawah untuk menguraikan materi pelajaran dan menggunakan kalkulator interaktif</p>
                </div>
                <MateriAccordion />
              </div>
            )}

            {/* 4. SECTION: EKSPLORASI */}
            {activeSection === 'eksplorasi' && (
              <div id="sec-eksplorasi-body">
                <ExplorationModule />
              </div>
            )}

            {/* 5. SECTION: KUIS */}
            {activeSection === 'kuis' && (
              <div id="sec-kuis-body">
                <QuizANBK />
              </div>
            )}

            {/* 6. SECTION: TUGAS */}
            {activeSection === 'tugas' && (
              <div id="sec-tugas-body">
                <Tugaslkpd />
              </div>
            )}

            {/* 7. SECTION: PENUTUP */}
            {activeSection === 'penutup' && (
              <div id="sec-penutup-body">
                <Penutup />
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </main>

      {/* ==================== GLOBAL FOOTER AND SYSTEM ACCORD ==================== */}
      <footer className="bg-white border-t border-slate-205 py-6 mt-12 text-center" id="global-footer">
        <div className="max-w-7xl mx-auto px-4 text-xs text-slate-400 space-y-1">
          <p>© 2026 Portal Belajar Matematika Interaktif. Dikembangkan bersama Wali Kelas 8 SMP.</p>
          <p className="text-[10px] text-slate-300">Didesain dengan Cinta Matematika untuk Siswa Indonesia &bull; Guru Pengampu: Suwarto S.Pd</p>
        </div>
      </footer>

    </div>
  );
}
