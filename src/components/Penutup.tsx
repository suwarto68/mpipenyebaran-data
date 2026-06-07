/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { BookOpen, CheckCircle, FileText, Send, Sparkles, Smile, Star, Link as LinkIcon, FileSpreadsheet, Users } from 'lucide-react';

export default function Penutup() {
  const [reflectionText, setReflectionText] = useState<string>('');
  const [comprehensionScore, setComprehensionScore] = useState<number>(3); // 1-5 stars
  const [isSent, setIsSent] = useState<boolean>(false);
  const [googleFormUrl, setGoogleFormUrl] = useState<string>(''); // For teacher custom google form embed
  const [isEditingUrl, setIsEditingUrl] = useState<boolean>(false);

  // Student identities
  const [namaSiswa, setNamaSiswa] = useState<string>(() => localStorage.getItem('student_nama') || '');
  const [kelas, setKelas] = useState<string>(() => localStorage.getItem('student_kelas') || '');

  // Google Script states
  const [scriptUrl, setScriptUrl] = useState<string>('');
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'failed'>('idle');
  const [syncMessage, setSyncMessage] = useState<string>('');

  // Default lesson review options
  const lessonsLoved = [
    { label: "Kalkulator Mean, Median, Modus", key: "calc" },
    { label: "Simulisme Slider Outlier Gaji", key: "outlier" },
    { label: "Simulator Dinamis Kolom Tinggi Anak", key: "slider" },
    { label: "Kuis ANBK dengan Penghargaan Sertifikat", key: "kuis" }
  ];
  const [selectedLoves, setSelectedLoves] = useState<string[]>([]);

  // Load configuration on mount
  useEffect(() => {
    const savedUrl = localStorage.getItem('guru_apps_script_url') || 'https://script.google.com/macros/s/AKfycbzCFQk_8XeUDOrecw4v1Cguq4f97gxTkuCr3dWr0YiTMPTluV_gAGcY-7r-6CAe5qTo/exec';
    setScriptUrl(savedUrl);
  }, []);

  const handleToggleLove = (key: string) => {
    setSelectedLoves(prev => 
      prev.includes(key) ? prev.filter(k => k !== key) : [...prev, key]
    );
  };

  const handleReflectionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reflectionText.trim()) return;
    if (!namaSiswa.trim() || !kelas.trim()) {
      alert("Harap isikan terlebih dahulu Identitas Siswa (Nama dan Kelas) di bagian atas refleksi!");
      return;
    }

    setIsSent(true);

    const currentScriptUrl = localStorage.getItem('guru_apps_script_url') || scriptUrl || 'https://script.google.com/macros/s/AKfycbzCFQk_8XeUDOrecw4v1Cguq4f97gxTkuCr3dWr0YiTMPTluV_gAGcY-7r-6CAe5qTo/exec';

    if (currentScriptUrl) {
      setSyncStatus('syncing');
      setSyncMessage('Sedang mengirimkan jurnal refleksi Anda ke Google Sheets Guru...');

      const textLoves = selectedLoves.map(key => {
        const found = lessonsLoved.find(l => l.key === key);
        return found ? found.label : key;
      }).join(", ");

      const payload = {
        type: 'refleksi',
        nama: namaSiswa.trim(),
        kelas: kelas,
        comprehensionScore: `${comprehensionScore} Bintang`,
        topikDisukai: textLoves || "Tidak ada yang dipilih",
        pesanKesan: reflectionText.trim(),
        timestamp: new Date().toLocaleString('id-ID', { timeZone: 'UTC' })
      };

      try {
        await fetch(currentScriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify(payload),
        });

        setSyncStatus('success');
        setSyncMessage('Terima kasih! Jurnal refleksi Anda berhasil masuk ke Spreadsheet Guru secara live.');
      } catch (err: any) {
        console.error(err);
        setSyncStatus('failed');
        setSyncMessage(`Refleksi terkirim lokal. Gagal diunggah ke Google Sheets: ${err.message || 'Koneksi gagal.'}`);
      }
    } else {
      setSyncStatus('failed');
      setSyncMessage('Pekerjaan Anda tersimpan secara lokal. Link Google Sheets belum dihubungkan oleh Guru.');
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-slate-700 font-sans text-sm leading-relaxed" id="penutup-root">
      
      {/* 1. PARAGRAF RANGKUMAN */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-4" id="summarization-card">
        <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2 border-b pb-2">
          <BookOpen className="w-4.5 h-4.5 text-indigo-600" />
          Rangkuman Materi: Statistika Kelas 8 Fase D
        </h3>
        <p className="text-xs text-slate-600 leading-relaxed" id="summary-paragraph">
          Selamat! Kamu telah menyelesaikan petualangan belajar Statistika Ukuran Pemusatan dan Ukuran Penyebaran Data. Melalui media interaktif ini, kita dapat menyimpulkan bahwa **Mean (rata-rata)**, **Median (nilai tengah)**, dan **Modus (data tersering muncul)** bekerja bersama guna merepresentasikan kondisi umum suatu kelompok data. Kita juga belajar bahwa Mean sangat sensitif terhadap data pencilan (outlier), sementara Median dan Modus lebih kebal dari distorsi ekstrem. Di sisi lain, **Jangkauan**, **Kuartil (Q1, Q2, Q3)**, dan **Simpangan Kuartil (Qd)** memberikan kita wawasan yang mendalam mengenai bagaimana data itu menyebar dan bervariasi dari titik tengahnya.
        </p>

        {/* Bullet points of crucial formulas */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-[11px]" id="formulas-summary-grid">
          <div className="p-3 bg-slate-50 border rounded-xl" id="box-forml-1">
            <strong className="block text-indigo-900 mb-1">Rerata (Mean) Kelompok</strong>
            <span className="text-slate-500">Jumlahkan semua nilai, lalu bagi dengan banyak data (n). Amat rentan terdistorsi pencilan.</span>
          </div>
          <div className="p-3 bg-slate-50 border rounded-xl" id="box-forml-2">
            <strong className="block text-indigo-900 mb-1">Simpangan Kuartil (Qd)</strong>
            <span className="text-slate-500">Setengah dari jangkauan interkuartil: <code>Qd = 0.5 × (Q3 - Q1)</code>. Menggambarkan deviasi nilai tengah.</span>
          </div>
        </div>
      </div>

      {/* 2. REFLEKSI PEMBELAJARAN (Built-in + Google Form option) */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs space-y-6" id="reflection-card">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between border-b pb-3 gap-2" id="reflection-header">
          <div>
            <h3 className="font-bold text-slate-800 text-sm uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4.5 h-4.5 text-indigo-600" />
              Lembar Refleksi Pembelajaran Siswa
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              Refleksikan pemahaman belajarmu hari ini agar Pak Suwarto dapat mengevaluasi metode pelajaran selanjutnya.
            </p>
          </div>

          <button
            onClick={() => setIsEditingUrl(!isEditingUrl)}
            className="text-xs font-semibold text-slate-500 hover:text-indigo-600 border px-3 py-1.5 bg-slate-50 rounded-lg transition-colors cursor-pointer"
          >
            {isEditingUrl ? 'Batal Custom Formulir' : 'Hubungkan Google Form'}
          </button>
        </div>

        {isEditingUrl && (
          <div className="bg-slate-50 p-4 rounded-xl border border-dashed text-xs space-y-2" id="google-form-config-box">
            <span className="font-bold text-slate-700 block">Masukkan Tautan Embed Google Form Guru:</span>
            <div className="flex gap-2">
              <input
                type="text"
                value={googleFormUrl}
                onChange={(e) => setGoogleFormUrl(e.target.value)}
                placeholder="https://docs.google.com/forms/d/e/.../viewform?embedded=true"
                className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
              <button
                onClick={() => setIsEditingUrl(false)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg px-4 font-bold transition-colors cursor-pointer"
              >
                Simpan
              </button>
            </div>
            <p className="text-[10px] text-slate-400">
              *Jika Guru sudah membuat kuesioner Google Form refleksi beralaskan instansi sekolah, pasang tautan embed-nya di atas agar Google Form termuat di jendela bawah ini.
            </p>
          </div>
        )}

        {/* If custom Google Form is loaded, show both or switch */}
        {googleFormUrl ? (
          <div className="space-y-4" id="google-form-viewport-section">
            <div className="bg-indigo-50/40 p-3 rounded-lg text-xs font-semibold text-indigo-900 border border-indigo-150 flex items-center gap-1.5">
              <LinkIcon className="w-4 h-4" /> Guru telah memuat Form Kuesioner Eksternal dari Google Forms.
            </div>
            <div className="w-full relative aspect-[4/3] max-h-[500px] border border-slate-200 rounded-xl overflow-hidden bg-slate-50">
              <iframe
                src={googleFormUrl}
                className="w-full h-full border-0 absolute top-0 left-0"
                title="Google Form Student Reflection Form"
              >
                Memuat Google Form...
              </iframe>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6" id="embed-reflection-panel">
            {/* Built-in Interactive Form (Craftsmanship default!) */}
            <div className="md:col-span-7 font-sans" id="native-reflect-form">
              {isSent ? (
                <div className="p-6 bg-emerald-50/45 border border-emerald-200 rounded-xl text-center space-y-4" id="reflect-success">
                  <Smile className="w-10 h-10 text-emerald-600 mx-auto animate-bounce" />
                  <h4 className="font-bold text-emerald-950 text-xs uppercase tracking-wider">Jurnal Refleksi Terkunci</h4>
                  <p className="text-xs text-emerald-800 leading-relaxed">
                    Terima kasih <strong className="text-emerald-950 font-bold">{namaSiswa} ({kelas})</strong> telah berpartisipasi mengungkapkan jurnal refleksimu! Hasil refleksi ini sangat berharga bagi Pak Suwarto dalam merancang konten numerasi yang seru ke depannya.
                  </p>

                  <div className="bg-white border border-slate-200 rounded-lg p-3 text-xs text-left text-slate-500 font-sans max-w-sm mx-auto space-y-1">
                    <div className="flex justify-between font-bold text-slate-650">
                      <span className="flex items-center gap-1"><FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Sinkronisasi Google Sheets:</span>
                      <span>{syncStatus === 'success' ? 'Selesai' : 'Lokal'}</span>
                    </div>
                    <p className="text-[10px] leading-relaxed italic">
                      *{syncMessage || 'Tersimpan aman di peramban privat Anda secara offline.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      setIsSent(false);
                      setSyncStatus('idle');
                      setSyncMessage('');
                    }}
                    className="text-[10px] bg-white border border-slate-300 hover:bg-slate-50 p-2 rounded-lg font-bold text-slate-650 transition-all cursor-pointer"
                  >
                    Tulis Refleksi Baru
                  </button>
                </div>
              ) : (
                <form onSubmit={handleReflectionSubmit} className="space-y-4 font-sans" id="reflection-form">
                  
                  {/* Student Identity Prefill Box right in the Reflection Frame */}
                  <div className="bg-slate-50 border border-slate-150 p-4 rounded-xl space-y-3" id="reflection-identities">
                    <span className="text-xs font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                      <Users className="w-4 h-4 text-indigo-500" />
                      Data Pengirim Jurnal:
                    </span>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 block mb-0.5">Nama Lengkap:</label>
                        <input
                          type="text"
                          required
                          value={namaSiswa}
                          onChange={(e) => {
                            const val = e.target.value;
                            setNamaSiswa(val);
                            localStorage.setItem('student_nama', val);
                          }}
                          placeholder="Nama rapormu..."
                          className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[11px] font-bold text-slate-500 block mb-0.5">Pilih Kelas:</label>
                        <select
                          required
                          value={kelas}
                          onChange={(e) => {
                            const val = e.target.value;
                            setKelas(val);
                            localStorage.setItem('student_kelas', val);
                          }}
                          className="w-full bg-white border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                        >
                          <option value="">-- Kelas --</option>
                          <option value="Kelas 8A">Kelas 8A</option>
                          <option value="Kelas 8B">Kelas 8B</option>
                          <option value="Kelas 8C">Kelas 8C</option>
                          <option value="Kelas 8D">Kelas 8D</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Rating Pemahaman */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-600 block">
                      1. Seberapa paham kamu dengan materi statistika hari ini?
                    </label>
                    <div className="flex gap-1.5" id="star-rating-box">
                      {[1, 2, 3, 4, 5].map((starValue) => (
                        <button
                          type="button"
                          key={starValue}
                          onClick={() => setComprehensionScore(starValue)}
                          className="p-1 rounded hover:bg-slate-50 shrink-0 text-slate-300 transition-colors"
                          id={`star-${starValue}`}
                        >
                          <Star 
                            className={`w-6 h-6 ${
                              starValue <= comprehensionScore ? 'text-amber-400 fill-amber-400' : 'text-slate-200'
                            }`} 
                          />
                        </button>
                      ))}
                      <span className="text-xs font-bold text-amber-800 ml-2 self-center font-mono">
                        ({comprehensionScore} dari 5 Bintang)
                      </span>
                    </div>
                  </div>

                  {/* Multi Select Loved lessons */}
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-slate-600 block">
                      2. Bagian materi/fitur mana saja yang paling kamu sukai? (Pilih semua yang disukai)
                    </label>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2" id="loves-grid">
                      {lessonsLoved.map((love) => {
                        const isChosen = selectedLoves.includes(love.key);
                        return (
                          <button
                            type="button"
                            key={love.key}
                            onClick={() => handleToggleLove(love.key)}
                            className={`p-2.5 rounded-xl border text-left text-xs transition-colors flex items-center gap-2 cursor-pointer font-semibold ${
                              isChosen 
                                ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold' 
                                : 'border-slate-200 text-slate-650 hover:bg-slate-50/50'
                            }`}
                          >
                            <span className={`w-3.5 h-3.5 rounded border shrink-0 flex items-center justify-center text-[9px] ${isChosen ? 'bg-indigo-600 text-white' : 'bg-white'}`}>
                              {isChosen && '✓'}
                            </span>
                            {love.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Text Reflection */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-slate-705 block">
                      3. Tuliskan pesan kesan atau kendala belajarmu hari ini secara jujur:
                    </label>
                    <textarea
                      required
                      value={reflectionText}
                      onChange={(e) => setReflectionText(e.target.value)}
                      placeholder="Contoh: Saya paling suka saat menggeser gaji pemimpin pabrik dan melihat mean-nya melonjak. Sangat seru Pak Suwarto!"
                      className="w-full bg-white border border-slate-300 rounded-lg p-3 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none min-h-[90px]"
                      id="text-input-reflection"
                    />
                  </div>

                  {scriptUrl && (
                    <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1 bg-emerald-50/40 p-2 rounded-lg border border-emerald-100">
                      <FileSpreadsheet className="w-3.5 h-3.5" /> Google Sheets aktif! Jurnal refleksi akan langsung terunggah ke tab guru.
                    </p>
                  )}

                  <button
                    type="submit"
                    className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg px-4 py-2.5 text-xs transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-xs"
                    id="btn-submit-reflect"
                  >
                    <Send className="w-3.5 h-3.5" /> Kirim Jurnal Refleksi Siswa
                  </button>
                </form>
              )}
            </div>

            {/* Educational Info widget beside form */}
            <div className="md:col-span-5 bg-gradient-to-br from-indigo-50 to-indigo-100/50 p-5 rounded-xl border border-indigo-150 flex flex-col justify-between" id="reflection-intel-side">
              <div className="space-y-3">
                <h4 className="font-bold text-indigo-950 text-xs uppercase tracking-wider flex items-center gap-1">
                  <Sparkles className="w-4 h-4 text-indigo-600" /> Kenapa Merenung Itu Penting?
                </h4>
                <p className="text-xs text-indigo-900/80 leading-relaxed">
                  Refleksi membantu melipatgandakan kekuatan ingatan belajarmu. Mengulas kembali bagian mana yang tersulit (dan mana yang paling memicu antusiasmemu) memperkuat sinapsis kognitif di otak, mengubah hafalan statistik jangka pendek menjadi pemahaman intuitif statistika jangka panjang yang mendalam.
                </p>
              </div>

              <div className="border-t border-indigo-200/50 pt-4 mt-4 text-[10px] text-slate-400 font-mono flex items-center gap-2">
                <FileText className="w-3.5 h-3.5 text-indigo-600" />
                <span>Kelas Matematika 8 Kembdikbudristek</span>
              </div>
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
