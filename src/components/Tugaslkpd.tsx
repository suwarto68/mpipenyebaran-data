/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Download, CheckCircle, Award, Sparkles, BookOpen, Clock, Users, RefreshCw, FileSpreadsheet } from 'lucide-react';

interface LKPDAnswer {
  soal1: string;
  soal2: string;
  soal3: string;
}

export default function Tugaslkpd() {
  const [answers, setAnswers] = useState<LKPDAnswer>({ soal1: '', soal2: '', soal3: '' });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  
  // Student identity fields
  const [namaSiswa, setNamaSiswa] = useState<string>(() => localStorage.getItem('student_nama') || '');
  const [kelas, setKelas] = useState<string>(() => localStorage.getItem('student_kelas') || '');
  const [noAbsen, setNoAbsen] = useState<string>(() => localStorage.getItem('student_absen') || '');

  // Google Sheets sync states
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'failed'>('idle');
  const [syncMessage, setSyncMessage] = useState<string>('');
  const [scriptUrl, setScriptUrl] = useState<string>('');

  // Load App Script URL and identities on mount
  useEffect(() => {
    const savedUrl = localStorage.getItem('guru_apps_script_url') || 'https://script.google.com/macros/s/AKfycbzCFQk_8XeUDOrecw4v1Cguq4f97gxTkuCr3dWr0YiTMPTluV_gAGcY-7r-6CAe5qTo/exec';
    setScriptUrl(savedUrl);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!answers.soal1.trim() || !answers.soal2.trim() || !answers.soal3.trim()) {
      alert("Harap lengkapi semua jawaban LKPD Anda sebelum mengirim!");
      return;
    }
    if (!namaSiswa.trim() || !kelas.trim() || !noAbsen.trim()) {
      alert("Harap isikan Identitas Siswa (Nama, Kelas, dan No. Absen) terlebih dahulu!");
      return;
    }

    setIsSubmitted(true);

    const currentScriptUrl = localStorage.getItem('guru_apps_script_url') || scriptUrl || 'https://script.google.com/macros/s/AKfycbzCFQk_8XeUDOrecw4v1Cguq4f97gxTkuCr3dWr0YiTMPTluV_gAGcY-7r-6CAe5qTo/exec';

    // Sync to Google Sheets if App Script Web App URL is connected
    if (currentScriptUrl) {
      setSyncStatus('syncing');
      setSyncMessage('Sedang mengirimkan jawaban LKPD Anda ke Google Spreadsheet Guru...');

      const payload = {
        type: 'lkpd',
        namaSiswa: namaSiswa.trim(),
        kelas: kelas,
        noAbsen: noAbsen.trim(),
        soal1: answers.soal1.trim(),
        soal2: answers.soal2.trim(),
        soal3: answers.soal3.trim(),
        timestamp: new Date().toLocaleString('id-ID', { timeZone: 'UTC' })
      };

      try {
        await fetch(currentScriptUrl, {
          method: 'POST',
          mode: 'no-cors', // standard way for simple Google Script triggers
          headers: {
            'Content-Type': 'text/plain',
          },
          body: JSON.stringify(payload),
        });

        setSyncStatus('success');
        setSyncMessage('Berhasil mengirimkan! Jawaban Anda telah tersimpan secara resmi di Google Spreadsheet Guru.');
      } catch (err: any) {
        console.error(err);
        setSyncStatus('failed');
        setSyncMessage(`Gagal mengirim secara otomatis ke spreadsheet: ${err.message || 'Cek koneksi internet Anda.'}`);
      }
    } else {
      setSyncStatus('failed');
      setSyncMessage('Pekerjaan Anda tersimpan lokal di peramban. Link Google Sheets belum dihubungkan oleh Guru.');
    }
  };

  const handleDownloadWorksheet = () => {
    const textContent = `===========================================================
LEMBAR KERJA PESERTA DIDIK (LKPD) - STATISTIKA KELAS 8
Guru Pengampu: Suwarto, S.Pd
Fase D - Matematika SMP
===========================================================

IDENTITAS SISWA:
- Nama Lengkap : ${namaSiswa}
- Kelas        : ${kelas}
- nomor Absen  : ${noAbsen}

-----------------------------------------------------------
JAWABAN TUGAS MANDIRI SISWA:
-----------------------------------------------------------

Masalah 1: Studi Kunjungan Perpustakaan Sekolah
Pertanyaan: Analisis statistik (Mean, Median, Modus) dan buat kesimpulan kapan buku paling banyak dipinjam.
Jawaban Anda:
${answers.soal1}

-----------------------------------------------------------
Masalah 2: Kasus Outlier Gaji Kurir Logistik
Pertanyaan: Jika ada kurir dengan upah Rp12jt sedangkan 5 kurir lain Rp2.5jt, ukuran apa yang paling adil mewakili upah kurir? Jelaskan!
Jawaban Anda:
${answers.soal2}

-----------------------------------------------------------
Masalah 3: Konstruksi Data Ketinggian Tanaman
Pertanyaan: Rancang 5 data tinggi tanaman yang memiliki Jangkauan = 8 cm dan Median = 15 cm.
Jawaban Anda:
${answers.soal3}

-----------------------------------------------------------
Selesai diunduh pada tanggal: ${new Date().toLocaleString('id-ID')}
Pemberitahuan: Silakan simpan file .TXT ini sebagai bukti pengerjaan resmi Anda, atau unggah ke Google Classroom jika ditugaskan oleh Pak Suwarto!
===========================================================`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `LKPD_Statistika_Kelas8_${namaSiswa.replace(/\s+/g, '_')}_Absen${noAbsen}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6 text-slate-700 font-sans text-sm leading-relaxed" id="tugas-lkpd-root">
      
      {/* Decorative Title Badge */}
      <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-xs flex flex-col md:flex-row gap-5 items-center justify-between" id="lkpd-top">
        <div className="space-y-1.5 text-center md:text-left">
          <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider">
            LKPD Mandiri Siswa
          </span>
          <h3 className="font-bold text-slate-800 text-base md:text-lg">
            Lembar Kerja Dinamis: Eksplorasi Ukuran Pemusatan
          </h3>
          <p className="text-xs text-slate-500 max-w-xl">
            Tugas mandiri ini telah diselaraskan dengan capaian pembelajaran Fase D Kurikulum Merdeka. Selesaikan masalah statistik kontekstual berikut lalu simpan hasilnya secara mandiri!
          </p>
        </div>

        <div className="flex gap-2 shrink-0" id="lkpd-visual-badges">
          <span className="flex items-center gap-1 bg-slate-50 border px-3 py-1.5 rounded-xl text-slate-500 text-xs font-semibold">
            <BookOpen className="w-4 h-4 text-indigo-500" /> 3 Soal
          </span>
          <span className="flex items-center gap-1 bg-slate-50 border px-3 py-1.5 rounded-xl text-slate-500 text-xs font-semibold">
            <Clock className="w-4 h-4 text-rose-500" /> 20 Menit
          </span>
        </div>
      </div>

      {isSubmitted ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          className="bg-emerald-50/50 border border-emerald-300 rounded-2xl p-6 text-center space-y-4 max-w-2xl mx-auto shadow-xs"
          id="lkpd-submitted-panel"
        >
          <div className="flex justify-center">
            <CheckCircle className="w-12 h-12 text-emerald-600 stroke-1 animate-pulse" />
          </div>
          <h4 className="font-bold text-emerald-900 text-base">Jawaban LKPD Berhasil Dikumpulkan!</h4>
          <p className="text-xs text-emerald-800 max-w-md mx-auto leading-relaxed">
            Pekerjaan atas nama <strong className="text-emerald-950">{namaSiswa} ({kelas})</strong> telah berhasil direkam di sistem pelajaran ini.
          </p>

          {/* Connection status inside submission window */}
          <div className="bg-white border border-slate-200 rounded-xl p-4 max-w-md mx-auto text-xs space-y-2">
            <div className="flex justify-between items-center text-slate-600 font-bold">
              <span className="flex items-center gap-1">
                <FileSpreadsheet className="w-4 h-4 text-emerald-600" /> Google Spreadsheet Sync
              </span>
              <span>
                {syncStatus === 'syncing' && <span className="text-amber-600">⏳ Sinkronisasi...</span>}
                {syncStatus === 'success' && <span className="text-emerald-600">✓ Berhasil Tersimpan</span>}
                {syncStatus === 'failed' && <span className="text-slate-500">Offline / Pending</span>}
              </span>
            </div>
            <p className="text-[11px] text-slate-500 leading-normal italic text-left">
              *{syncMessage || 'Jawaban Anda telah direkam lurus di sistem lokal. Anda disarankan untuk mengunduh berkas fisik di bawah ini sebagai bukti pengerjaan tertulis.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={handleDownloadWorksheet}
              className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 py-2 text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              id="btn-download-txt"
            >
              <Download className="w-4 h-4" /> Unduh Berkas Tugas (.TXT)
            </button>
            <button
              onClick={() => {
                setIsSubmitted(false);
                setSyncStatus('idle');
                setSyncMessage('');
              }}
              className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 rounded-lg px-4 py-2 text-xs font-semibold transition-all cursor-pointer"
            >
              Edit Jawaban Anda
            </button>
          </div>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-6" id="lkpd-form">
          
          {/* STUDENT IDENTITY PANEL */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-4" id="student-identity-panel">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <Users className="w-4.5 h-4.5 text-indigo-600" />
              Identitas Peserta Didik (Siswa)
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" id="student-inputs">
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Nama Lengkap Siswa:</label>
                <input
                  type="text"
                  required
                  value={namaSiswa}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNamaSiswa(val);
                    localStorage.setItem('student_nama', val);
                  }}
                  placeholder="Sesuai nama rapor..."
                  className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
              
              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Pilih Kelas:</label>
                <select
                  required
                  value={kelas}
                  onChange={(e) => {
                    const val = e.target.value;
                    setKelas(val);
                    localStorage.setItem('student_kelas', val);
                  }}
                  className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                >
                  <option value="">-- Pilih Kelas --</option>
                  <option value="Kelas 8A">Kelas 8A</option>
                  <option value="Kelas 8B">Kelas 8B</option>
                  <option value="Kelas 8C">Kelas 8C</option>
                  <option value="Kelas 8D">Kelas 8D</option>
                </select>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-600 block mb-1">Nomor Absen Siswa:</label>
                <input
                  type="number"
                  required
                  min="1"
                  max="50"
                  value={noAbsen}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNoAbsen(val);
                    localStorage.setItem('student_absen', val);
                  }}
                  placeholder="Contoh: 15"
                  className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
              </div>
            </div>
            
            {scriptUrl && (
              <p className="text-[10px] text-emerald-600 bg-emerald-50/50 p-2.5 rounded-lg border border-emerald-100 flex items-center gap-1.5 font-semibold">
                <FileSpreadsheet className="w-3.5 h-3.5" /> Google Spreadsheet terhubung! Jawaban Anda otomatis dikompilasi di tabel guru setelah klik kirim.
              </p>
            )}
          </div>

          {/* TANTANGAN 1 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3" id="chall-1">
            <div className="flex items-center gap-2 text-indigo-700 border-b pb-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center font-bold text-xs">1</span>
              <h4 className="font-bold text-slate-840 text-sm">Masalah 1: Studi Kunjungan Perpustakaan Sekolah</h4>
            </div>
            
            <p className="text-xs text-slate-600">
              Berikut data jumlah siswa yang berkunjung ke perpustakaan sekolah selama 6 hari sekolah berturut-turut:
              <span className="block mt-1 font-mono font-bold text-slate-755 bg-slate-50 p-2 rounded border border-slate-150">
                Senin: 25 siswa | Selasa: 40 siswa | Rabu: 30 siswa | Kamis: 25 siswa | Jumat: 20 siswa | Sabtu: 10 siswa
              </span>
            </p>
            
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block text-indigo-950">
                Pertanyaan: Hitung Mean, Median, dan Modusnya berdasarkan data di atas. Kemudian simpulkan interpretasimu, pada hari apa perpustakaan paling efektif dikunjungi siswa dan jelaskan argumentasimu!
              </label>
              <textarea
                required
                value={answers.soal1}
                onChange={(e) => setAnswers({ ...answers, soal1: e.target.value })}
                placeholder="Tuliskan jalan hitung Anda (Mean, Median, Modus) serta argumen penyimpulannya analisis disini..."
                className="w-full bg-white border border-slate-300 rounded-lg p-3 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none min-h-[100px]"
                id="text-answers-soal1"
              />
            </div>
          </div>

          {/* TANTANGAN 2 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3" id="chall-2">
            <div className="flex items-center gap-2 text-indigo-700 border-b pb-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center font-bold text-xs">2</span>
              <h4 className="font-bold text-slate-840 text-sm">Masalah 2: Kasus Outlier Upah Kurir Logistik</h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Sebuah diler logistik memiliki 6 kurir pengantar kiriman paket. Lima kurir masing-masing memperoleh upah tetap sebesar <strong>Rp2.500.000 / bulan</strong>. Namun, seorang kurir berprestasi sangat tinggi (menjabat kepala kurir) membawa pulang upah bulanan sebesar <strong>Rp12.000.000 / bulan</strong>.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block text-indigo-950">
                Pertanyaan: Jika Anda mewakili serikat pekerja, ukuran pemusatan mana (Mean, Median, atau Modus) yang paling tepat digunakan untuk menyuarakan upah keadilan kurir dan berikan argumen logis matematika Anda!
              </label>
              <textarea
                required
                value={answers.soal2}
                onChange={(e) => setAnswers({ ...answers, soal2: e.target.value })}
                placeholder="Berikan analisis logis Anda kenapa ukuran tersebut terpilih..."
                className="w-full bg-white border border-slate-300 rounded-lg p-3 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none min-h-[100px]"
                id="text-answers-soal2"
              />
            </div>
          </div>

          {/* TANTANGAN 3 */}
          <div className="bg-white border border-slate-200 rounded-2xl p-5 space-y-3" id="chall-3">
            <div className="flex items-center gap-2 text-indigo-700 border-b pb-2">
              <span className="w-6 h-6 rounded-lg bg-indigo-50 flex items-center justify-center font-bold text-xs">3</span>
              <h4 className="font-bold text-slate-840 text-sm">Masalah 3: Merancang Data Ketinggian Tanaman</h4>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed">
              Anda diminta oleh Pak Suwarto mempresentasikan hasil kebun Anda. Guru meminta Anda memproduksi draf simulasi pertumbuhan bibit.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-700 block text-indigo-950">
                Pertanyaan: Rancanglah **5 nilai data tinggi tanaman (dalam cm)** yang jika dikelompokkan akan menghasilkan nilai Jangkauan (selisih terjauh) = 8 cm, dan nilai Median (nilai tengah) = 15 cm. Buktikan lewat urutan datanya!
              </label>
              <textarea
                required
                value={answers.soal3}
                onChange={(e) => setAnswers({ ...answers, soal3: e.target.value })}
                placeholder="Sebutkan lima data tinggi tanaman tersebut dan buktikan perhitungannya..."
                className="w-full bg-white border border-slate-300 rounded-lg p-3 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none min-h-[100px]"
                id="text-answers-soal3"
              />
            </div>
          </div>

          <div className="text-center pt-2" id="lkpd-form-footer">
            <button
              type="submit"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl px-6 py-3 text-xs transition-all shadow-sm flex items-center justify-center gap-1.5 mx-auto cursor-pointer"
            >
              <CheckCircle className="w-4 h-4" /> Kunci & Kumpulkan Jawaban LKPD Anda
            </button>
          </div>

        </form>
      )}

    </div>
  );
}
