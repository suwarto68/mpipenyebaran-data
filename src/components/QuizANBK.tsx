/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Users, BookOpen, Clock, AlertTriangle, ChevronLeft, ChevronRight, 
  CheckSquare, FileSpreadsheet, Award, Printer, LogIn, RefreshCcw, 
  HelpCircle, Eye, CheckCircle, Info
} from 'lucide-react';
import { quizQuestions } from '../data/quizData';
import { StudentInfo, QuizResponse, QuizSummary } from '../types';

const renderFormattedStimulus = (text: string) => {
  if (!text) return null;
  
  const lines = text.split('\n');
  const elements: React.JSX.Element[] = [];
  let currentTable: string[][] = [];
  let isInsideCode = false;
  let codeContent: string[] = [];

  const flushTable = (key: number) => {
    if (currentTable.length === 0) return null;
    
    // Check if the second row is an alignment indicator like |:---|
    let tableData = [...currentTable];
    if (tableData[1] && tableData[1].some(col => col.trim().startsWith(':') || col.trim().endsWith('-'))) {
      tableData.splice(1, 1); // remove alignment row
    }

    const headers = tableData[0];
    const rows = tableData.slice(1);

    const el = (
      <div key={`table-${key}`} className="my-4 overflow-x-auto border border-emerald-100 rounded-xl shadow-xs bg-white">
        <table className="min-w-full divide-y divide-emerald-100 text-[11px] font-sans text-center">
          <thead className="bg-emerald-50 text-emerald-800 font-bold uppercase tracking-wider text-[10px] border-b border-emerald-100">
            <tr>
              {headers.map((h, idx) => (
                <th key={idx} className="px-3 py-2.5 font-bold border-r last:border-r-0 border-emerald-100">{h.trim()}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-emerald-100 bg-white text-slate-700">
            {rows.map((row, rIdx) => (
              <tr key={rIdx} className={rIdx % 2 === 1 ? 'bg-emerald-50/10' : 'bg-white'}>
                {row.map((col, cIdx) => (
                  <td key={cIdx} className="px-3 py-2 border-r last:border-r-0 border-emerald-100 font-medium">{col.trim()}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    currentTable = [];
    return el;
  };

  const flushCode = (key: number) => {
    if (codeContent.length === 0) return null;
    const rawData = codeContent.join('\n');
    const el = (
      <div key={`code-${key}`} className="my-3 bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-inner text-center font-mono text-[11px] md:text-xs text-emerald-300 font-bold tracking-widest relative overflow-hidden">
        <div className="absolute top-0 left-0 bg-slate-800 text-slate-400 text-[8px] px-2.5 py-0.5 rounded-br font-sans font-semibold tracking-wider uppercase">BARIS DATA PENGAMATAN</div>
        <div className="pt-2">{rawData}</div>
      </div>
    );
    codeContent = [];
    return el;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Inside code block check
    if (line.trim().startsWith('```')) {
      if (isInsideCode) {
        isInsideCode = false;
        const compiled = flushCode(i);
        if (compiled) elements.push(compiled);
      } else {
        isInsideCode = true;
        const compiledTable = flushTable(i);
        if (compiledTable) elements.push(compiledTable);
      }
      continue;
    }

    if (isInsideCode) {
      codeContent.push(line);
      continue;
    }

    // Inside table markdown check
    if (line.trim().startsWith('|') && line.trim().endsWith('|')) {
      const cells = line
        .split('|')
        .slice(1, -1);
      currentTable.push(cells);
      continue;
    } else {
      const compiledTable = flushTable(i);
      if (compiledTable) elements.push(compiledTable);
    }

    // Bold context headers or titles
    if (line.trim().startsWith('**Konteks:') && line.trim().endsWith('**')) {
      const title = line.trim().substring(2, line.trim().length - 2).replace('Konteks:', '').trim();
      elements.push(
        <h4 key={`header-${i}`} className="text-xs font-extrabold text-[#0f172a] uppercase tracking-wide border-b border-indigo-100 pb-2 mb-3 mt-1 flex items-center gap-1.5 font-sans">
          <span className="w-1.5 h-3.5 bg-indigo-600 rounded-xs inline-block"></span>
          Konteks: {title}
        </h4>
      );
      continue;
    }

    // Other bold lines
    if (line.trim().startsWith('**') && line.trim().endsWith('**')) {
      elements.push(
        <strong key={`bold-${i}`} className="text-xs font-extrabold text-slate-800 block mt-3 mb-1 font-sans">
          {line.trim().replace(/\*\*/g, '')}
        </strong>
      );
      continue;
    }

    // Highlight inline bold words **word** within paragraphs
    if (line.trim().length > 0) {
      const parts = line.split('**');
      const inlineEls = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="font-bold text-slate-900 border-b border-indigo-100">{part}</strong>;
        }
        return part;
      });

      elements.push(
        <p key={`p-${i}`} className="text-xs text-slate-600 text-justify leading-relaxed tracking-normal mb-3 font-sans">
          {inlineEls}
        </p>
      );
    }
  }

  // Final flush in case file ends with table
  const compiledTable = flushTable(9999);
  if (compiledTable) elements.push(compiledTable);

  return <div className="space-y-1">{elements}</div>;
};

const DEFAULT_URL = 'https://script.google.com/macros/s/AKfycbyd1ud6i0YXP8padu9_7BindQBo6iD_Sm6twZ71LTFqLb-hbdyI-zvHkERj2M_OsXg2/exec';
const STALE_URLS = [
  'https://script.google.com/macros/s/AKfycbzCFQk_8XeUDOrecw4v1Cguq4f97gxTkuCr3dWr0YiTMPTluV_gAGcY-7r-6CAe5qTo/exec'
];

export const getActualScriptUrl = (): string => {
  const stored = localStorage.getItem('guru_apps_script_url');
  if (!stored) return DEFAULT_URL;
  if (STALE_URLS.includes(stored.trim())) {
    localStorage.setItem('guru_apps_script_url', DEFAULT_URL);
    return DEFAULT_URL;
  }
  return stored;
};

export default function QuizANBK() {
  // Candidate state
  const [student, setStudent] = useState<StudentInfo>(() => {
    const savedNama = localStorage.getItem('student_nama') || '';
    const savedKelas = localStorage.getItem('student_kelas') || '';
    return { nama: savedNama, kelas: savedKelas };
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  
  // Font scaling inside ANBK
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');

  // Test states
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [timeLeft, setTimeLeft] = useState<number>(3600); // 60 minutes
  const [responses, setResponses] = useState<QuizResponse[]>(() => 
    quizQuestions.map(q => ({
      questionId: q.id,
      isAnswered: false,
      isFlagged: false,
      selectedOptions: [],
      tfAnswers: {},
      matchingAnswers: {}
    }))
  );

  // Stats result state
  const [showSummary, setShowSummary] = useState<boolean>(false);
  const [quizResult, setQuizResult] = useState<QuizSummary | null>(null);
  
  // Google script sync tracking
  const [syncStatus, setSyncStatus] = useState<'idle' | 'syncing' | 'success' | 'failed'>('idle');
  const [syncMessage, setSyncMessage] = useState<string>('');
  const [scriptUrl, setScriptUrl] = useState<string>(() => getActualScriptUrl()); // Teachers paste App Script macro webapp URL here

  // Background timer ticking
  useEffect(() => {
    if (isLoggedIn && hasStarted && timeLeft > 0 && !showSummary) {
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
      return () => clearInterval(timer);
    } else if (timeLeft === 0 && !showSummary) {
      handleSubmitQuiz();
    }
  }, [isLoggedIn, hasStarted, timeLeft, showSummary]);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (student.nama.trim() && student.kelas.trim()) {
      localStorage.setItem('student_nama', student.nama.trim());
      localStorage.setItem('student_kelas', student.kelas.trim());
      setIsLoggedIn(true);
      setHasStarted(true);
      setTimeLeft(3600); // 60 min reset
    }
  };

  // Helper formatting for remaining seconds
  const formatTime = (secs: number) => {
    const min = Math.floor(secs / 60);
    const s = secs % 60;
    return `${min.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  // Current Question accessor
  const currentQuestion = quizQuestions[currentIdx];
  const currentResponse = responses[currentIdx];

  // Modify user responses
  const handleAnswerSelect = (optionIdx: number) => {
    const updated = [...responses];
    updated[currentIdx] = {
      ...updated[currentIdx],
      isAnswered: true,
      selectedOption: optionIdx
    };
    setResponses(updated);
  };

  const handleComplexSelect = (optionIdx: number) => {
    const updated = [...responses];
    const prev = updated[currentIdx].selectedOptions || [];
    let next: number[];
    if (prev.includes(optionIdx)) {
      next = prev.filter(x => x !== optionIdx);
    } else {
      next = [...prev, optionIdx];
    }
    
    updated[currentIdx] = {
      ...updated[currentIdx],
      isAnswered: next.length > 0,
      selectedOptions: next
    };
    setResponses(updated);
  };

  const handleTrueFalseSelect = (statementId: string, value: 'benar' | 'salah') => {
    const updated = [...responses];
    const answers = { ...updated[currentIdx].tfAnswers, [statementId]: value };
    
    // Check if all statements in current question have been addressed
    const expectedStatements = currentQuestion.tfStatements || [];
    const isAllAnswered = expectedStatements.every(stmt => answers[stmt.id] !== undefined);

    updated[currentIdx] = {
      ...updated[currentIdx],
      isAnswered: isAllAnswered,
      tfAnswers: answers
    };
    setResponses(updated);
  };

  const handleMatchingSelect = (premiseId: string, matchValue: string) => {
    const updated = [...responses];
    const answers = { ...updated[currentIdx].matchingAnswers, [premiseId]: matchValue };

    // Check if all premises matched
    const expectedPairs = currentQuestion.matchingPairs || [];
    const isAllAnswered = expectedPairs.every(pair => answers[pair.id] !== undefined && answers[pair.id] !== '');

    updated[currentIdx] = {
      ...updated[currentIdx],
      isAnswered: isAllAnswered,
      matchingAnswers: answers
    };
    setResponses(updated);
  };

  const toggleFlag = () => {
    const updated = [...responses];
    updated[currentIdx] = {
      ...updated[currentIdx],
      isFlagged: !updated[currentIdx].isFlagged
    };
    setResponses(updated);
  };

  // Navigations
  const goNext = () => {
    if (currentIdx < quizQuestions.length - 1) {
      setCurrentIdx(currentIdx + 1);
    }
  };

  const goPrev = () => {
    if (currentIdx > 0) {
      setCurrentIdx(currentIdx - 1);
    }
  };

  // GRADING FORMULA
  const handleSubmitQuiz = () => {
    // Confirm
    if (window.confirm && !window.confirm("Apakah Anda yakin ingin menyelesaikan ujian ANBK ini? Seluruh jawaban Anda akan terhitung.")) {
      return;
    }

    let correctTotal = 0;
    let wrongTotal = 0;
    let answeredTotal = 0;
    let flaggedTotal = 0;

    responses.forEach((resp, idx) => {
      const q = quizQuestions[idx];
      if (resp.isFlagged) flaggedTotal++;
      if (resp.isAnswered) answeredTotal++;

      if (q.type === 'pilihan-ganda') {
        const isCorrect = resp.selectedOption === q.correctOption;
        if (isCorrect) correctTotal++;
        else wrongTotal++;
      } 
      else if (q.type === 'pilihan-ganda-kompleks') {
        const userSel = resp.selectedOptions || [];
        const correctSel = q.correctOptions || [];
        // Must contain exact same indices
        const isCorrect = userSel.length === correctSel.length && 
                          userSel.every(v => correctSel.includes(v));
        if (isCorrect) correctTotal++;
        else wrongTotal++;
      }
      else if (q.type === 'benar-salah') {
        const tfAns = resp.tfAnswers || {};
        const tfStmts = q.tfStatements || [];
        const allCorrect = tfStmts.length > 0 && tfStmts.every(stmt => tfAns[stmt.id] === stmt.correctAnswer);
        if (allCorrect) correctTotal++;
        else wrongTotal++;
      }
      else if (q.type === 'menjodohkan') {
        const matchAns = resp.matchingAnswers || {};
        const pairs = q.matchingPairs || [];
        const allCorrect = pairs.length > 0 && pairs.every(pair => matchAns[pair.id] === pair.correctMatch);
        if (allCorrect) correctTotal++;
        else wrongTotal++;
      }
    });

    const unassignedCount = quizQuestions.length - answeredTotal;

    // Calculate score (0-100)
    const rawScore = (correctTotal / quizQuestions.length) * 100;
    const finalScore = Number(rawScore.toFixed(0));

    const todayStr = new Date().toLocaleString('id-ID', {
      timeZone: 'UTC',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });

    const summary: QuizSummary = {
      tanggalWaktu: todayStr,
      nama: student.nama,
      kelas: student.kelas,
      benar: correctTotal,
      salah: wrongTotal,
      terjawab: answeredTotal,
      raguRagu: flaggedTotal,
      belumTerjawab: unassignedCount,
      nilai: finalScore
    };

    setQuizResult(summary);
    setShowSummary(true);

    // Auto trigger posting to local emulation OR spreadsheet if scripturl configured
    postToGoogleSheets(summary);
  };

  const postToGoogleSheets = async (data: QuizSummary) => {
    const sheetPayload = {
      type: 'quiz',
      timestamp: data.tanggalWaktu,
      nama: data.nama,
      kelas: data.kelas,
      benar: data.benar,
      salah: data.salah,
      terjawab: data.terjawab,
      raguRagu: data.raguRagu,
      belumTerjawab: data.belumTerjawab,
      nilai: data.nilai,
      spreadsheetUrlId: "1mWJb0uh7btOGC07uITbEQh341wfG5euKXSQo4AC1e94"
    };

    const currentScriptUrl = getActualScriptUrl();

    // If teacher hasn't provided a Apps Script production Web App url yet, we simulate
    if (!currentScriptUrl) {
      setSyncStatus('failed');
      setSyncMessage('Belum terkirim ke Spreadsheet karena link Apps Script Web App kosong. Namun, data sudah tercatat lokal di sistem.');
      return;
    }

    setSyncStatus('syncing');
    setSyncMessage('Sedang mengirimkan skor ujian ke Google Spreadsheet Guru...');

    try {
      // Use standard fetch web app POST with CORS-safelisted content-type to avoid preflight blocks
      await fetch(currentScriptUrl, {
        method: 'POST',
        mode: 'no-cors', // standard way for simple Google Script triggers
        headers: {
          'Content-Type': 'text/plain',
        },
        body: JSON.stringify(sheetPayload),
      });

      setSyncStatus('success');
      setSyncMessage('Berhasil tersinkronisasi! Nilai dan nama Anda telah tersimpan secara resmi di Google Spreadsheet Guru.');
    } catch (err: any) {
      console.error(err);
      setSyncStatus('failed');
      setSyncMessage(`Gagal menyambungkan: ${err.message || 'Cek kembali URL Apps Script yang Anda pasang.'}`);
    }
  };

  const handleRetake = () => {
    if (window.confirm("Apakah Anda ingin mengulang kuis dari awal?")) {
      setCurrentIdx(0);
      setResponses(quizQuestions.map(q => ({
        questionId: q.id,
        isAnswered: false,
        isFlagged: false,
        selectedOptions: [],
        tfAnswers: {},
        matchingAnswers: {}
      })));
      setShowSummary(false);
      setQuizResult(null);
      setSyncStatus('idle');
      setSyncMessage('');
      setTimeLeft(3600);
    }
  };

  const handlePrintCertificate = () => {
    window.print();
  };

  // Text sizes classes based on dynamic scale
  const getFontSizeClass = () => {
    if (fontSize === 'large') return 'text-base md:text-lg';
    if (fontSize === 'xlarge') return 'text-lg md:text-xl';
    return 'text-xs md:text-sm';
  };

  const getHeadingSizeClass = () => {
    if (fontSize === 'large') return 'text-lg md:text-xl';
    if (fontSize === 'xlarge') return 'text-xl md:text-2xl';
    return 'text-sm md:text-base';
  };

  // Google Apps Script source code generator for teacher copy paste
  const googleAppsScriptCode = `/**
 * =========================================================================
 * GOOGLE APPS SCRIPT UNTUK PORTAL PORTFOLIO STATISTIK SUWARTO, S.Pd
 * =========================================================================
 * Script ini menerima seluruh data Ujian ANBK, Tugas LKPD, dan Refleksi Siswa!
 * 
 * Cara Penggunaan:
 * 1. Buka spreadsheet baru di Google Drive (Google Sheets) Anda.
 * 2. Klik menu "Extensions" -> "Apps Script" (Ekstensi -> Apps Script).
 * 3. Hapus semua kode default di dalam editor (myFunction).
 * 4. Salin dan tempel (paste) seluruh kode script di bawah ini.
 * 5. Klik ikon "Save" (Simpan) di toolbar.
 * 6. Klik tombol "Deploy" di kanan atas -> Pilih "New deployment" (Deployment baru).
 * 7. Konfigurasikan:
 *    - Select type: Web app
 *    - Description: Database Statistik Kelas 8
 *    - Execute as: Me (suwarto68@guru.smp.belajar.id atau email Anda)
 *    - Who has access: Anyone (Semua orang / Siapa saja, bahkan anonim - PENTING agar siswa bisa mengirim nilai).
 * 8. Klik "Deploy". 
 * 9. Klik "Authorize Access" dan pilih akun Google Anda. Jika ada panel peringatan "Google hasn't verified this app", klik "Advanced" -> "Go to ... (unsafe)" untuk menyetujui.
 * 10. Salin "Web app URL" (Web App URL) yang diberikan (contoh: https://script.google.com/macros/s/xxxx/exec).
 * 11. Tempelkan (paste) link tersebut ke form integrasi di portal pelajaran ini!
 * =========================================================================
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Tunggu sampai 10 detik jika ada bentrokan menulis data
  
  try {
    var jsonString = e.postData.contents;
    var data = JSON.parse(jsonString);
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Klasifikasikan jenis data dari payload
    var type = data.type || "";
    if (!type) {
      if (data.nilai !== undefined) {
        type = "quiz";
      } else if (data.soal1 !== undefined) {
        type = "lkpd";
      } else if (data.skorPemahaman !== undefined) {
        type = "refleksi";
      }
    }
    
    var timestamp = data.timestamp || new Date();
    
    if (type === "quiz" || type === "Kuis") {
      var sheet = ss.getSheetByName("Nilai Ujian") || ss.getSheetByName("Nilai Kuis") || ss.insertSheet("Nilai Kuis");
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Tanggal & Waktu", "Nama Siswa", "Kelas", "Benar", "Salah", "Terjawab", "Ragu-Ragu", "Belum Terjawab", "Nilai Akhir"]);
        styleHeader(sheet);
      }
      sheet.appendRow([
        timestamp,
        data.nama || data.namaSiswa,
        data.kelas,
        data.benar !== undefined ? data.benar : "",
        data.salah !== undefined ? data.salah : "",
        data.terjawab !== undefined ? data.terjawab : "",
        data.raguRagu !== undefined ? data.raguRagu : "",
        data.belumTerjawab !== undefined ? data.belumTerjawab : "",
        data.nilai !== undefined ? data.nilai : ""
      ]);
      
    } else if (type === "lkpd" || type === "Tugas") {
      var sheet = ss.getSheetByName("Tugas LKPD") || ss.insertSheet("Tugas LKPD");
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Tanggal & Waktu", "Nama Siswa", "Kelas", "No Absen", "Jawaban Masalah 1", "Jawaban Masalah 2", "Jawaban Masalah 3"]);
        styleHeader(sheet);
      }
      sheet.appendRow([
        timestamp,
        data.namaSiswa || data.nama,
        data.kelas,
        data.noAbsen || "",
        data.soal1 || "",
        data.soal2 || "",
        data.soal3 || ""
      ]);
      
    } else if (type === "refleksi" || type === "Refleksi") {
      var sheet = ss.getSheetByName("Refleksi") || ss.insertSheet("Refleksi");
      if (sheet.getLastRow() === 0) {
        sheet.appendRow(["Tanggal & Waktu", "Skor Pemahaman (Bintang)", "Topik Disukai", "Isi Jurnal Refleksi"]);
        styleHeader(sheet);
      }
      sheet.appendRow([
        timestamp,
        data.skorPemahaman || data.comprehensionScore || "",
        data.topikDisukai || "",
        data.pesanKesan || ""
      ]);
    } else {
      var sheet = ss.getActiveSheet();
      sheet.appendRow([timestamp, "Raw Data Backup", JSON.stringify(data)]);
    }
    
    // Atur ukuran kolom otomatis agar rapi
    var sheets = ss.getSheets();
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].getLastColumn() > 0) {
        sheets[i].autoResizeColumns(1, sheets[i].getLastColumn());
      }
    }
    
    return ContentService.createTextOutput(JSON.stringify({ "status": "success", "type": type }))
                         .setMimeType(ContentService.MimeType.JSON)
                         .setHeader("Access-Control-Allow-Origin", "*");
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON)
                         .setHeader("Access-Control-Allow-Origin", "*");
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ "status": "active", "message": "Portal Database Guru Suwarto Aktif!" }))
                       .setMimeType(ContentService.MimeType.JSON)
                       .setHeader("Access-Control-Allow-Origin", "*");
}

function styleHeader(sheet) {
  var range = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  range.setFontWeight("bold");
  range.setBackground("#f1f5f9");
  range.setFontColor("#1e293b");
  range.setHorizontalAlignment("center");
}
`;

  return (
    <div className="w-full max-w-5xl mx-auto text-slate-700 font-sans" id="anbk-quiz-root">
      
      {!isLoggedIn ? (
        // ==================== LOGIN WINDOW ====================
        <div className="max-w-md mx-auto bg-white rounded-2xl border border-slate-200 p-8 shadow-sm" id="anbk-login-box">
          <div className="text-center mb-6" id="anbk-login-header">
            <span className="inline-flex p-3 bg-indigo-50 text-indigo-600 rounded-full mb-3">
              <Users className="w-8 h-8" />
            </span>
            <h3 className="font-bold text-slate-800 text-lg uppercase tracking-wide">
              Gerbang Login Siswa (ANBK)
            </h3>
            <p className="text-xs text-slate-400 mt-1 max-w-xs mx-auto">
              Asesmen Nasional Kemendikbudristek Numerasi Statistika Kelas 8 Fase D. Guru Pengampu: Suwarto, S.Pd
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4" id="anbk-login-form">
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Nama Lengkap Siswa:</label>
              <input
                type="text"
                required
                value={student.nama}
                onChange={(e) => setStudent({ ...student, nama: e.target.value })}
                placeholder="Sesuaikan dengan nama rapor..."
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              />
            </div>
            
            <div>
              <label className="text-xs font-bold text-slate-600 block mb-1">Pilih Kelas:</label>
              <select
                required
                value={student.kelas}
                onChange={(e) => setStudent({ ...student, kelas: e.target.value })}
                className="w-full bg-white border border-slate-300 rounded-lg px-3.5 py-2 text-xs font-medium focus:ring-1 focus:ring-indigo-500 focus:outline-none"
              >
                <option value="">-- Pilih Kelas --</option>
                <option value="Kelas 8A">Kelas 8A</option>
                <option value="Kelas 8B">Kelas 8B</option>
                <option value="Kelas 8C">Kelas 8C</option>
                <option value="Kelas 8D">Kelas 8D</option>
              </select>
            </div>

            <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-100 flex items-start gap-2 text-[10px] text-slate-500" id="login-intel-card">
              <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
              <p className="leading-relaxed">
                Lembar ujian ANBK ini berisi **25 butir soal numerasi**. Setelah masuk, data pengerjaan akan disambungkan otomatis dengan Google Spreadsheet di link guru. Pastikan jaringan internet stabil.
              </p>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg py-2.5 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-sm"
              id="btn-login-submit"
            >
              <LogIn className="w-4 h-4" /> Masuk Portal ANBK
            </button>
          </form>
        </div>
      ) : showSummary && quizResult ? (
        // ==================== CERTIFICATE & SUMMARY WINDOW ====================
        <div className="space-y-6" id="anbk-summary-box">
          
          {/* Main Scoring banner */}
          <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm grid grid-cols-1 md:grid-cols-12 gap-6 items-center" id="summary-banner">
            <div className="md:col-span-8 space-y-2">
              <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                Ujian Selesai Diseleksi
              </span>
              <h3 className="font-bold text-slate-800 text-base md:text-lg">
                Rekap kelulusan evaluasi ANBK, {student.nama}!
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Anda menyelesaikan 25 Soal AKM Numerasi Matematika dengan baik pada tanggal {quizResult.tanggalWaktu}. Hasil Anda telah didaftarkan di log database sekolah.
              </p>

              {/* Data sheets connection alert */}
              <div className="bg-slate-50 p-3.5 rounded-xl border border-slate-150 text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-3">
                <div className="flex gap-2 items-center">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600 shrink-0" />
                  <div>
                    <strong className="block text-slate-700 text-[11px]">Database Google Sheets Guru</strong>
                    <span className="text-[10px] text-slate-400 block truncate max-w-[280px]">
                      https://docs.google.com/spreadsheets/d/1mWJb0uh7btOGC07uITbEQh341wfG5euKXSQo4AC1e94/
                    </span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  {syncStatus === 'syncing' && <span className="bg-amber-100 text-amber-800 text-[10px] font-bold px-2.5 py-1 rounded">⏳ Mengirim...</span>}
                  {syncStatus === 'success' && <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded">✓ Tersambung</span>}
                  {syncStatus === 'failed' && (
                    <div className="flex flex-col items-end gap-1">
                      <span className="bg-rose-100 text-rose-800 text-[9px] font-bold px-2 py-0.5 rounded">Sync Pending</span>
                    </div>
                  )}
                </div>
              </div>
              
              {syncMessage && (
                <p className="text-[10px] text-slate-400 italic">
                  *Status Sync: {syncMessage}
                </p>
              )}
            </div>

            <div className="md:col-span-4 bg-slate-50 p-4 border rounded-xl text-center" id="summary-hud-scores">
              <span className="text-[10px] text-slate-400 uppercase font-bold block mb-1">NILAI AKHIR</span>
              <strong className="text-4xl font-mono text-indigo-700 block">{quizResult.nilai}</strong>
              <div className="grid grid-cols-2 gap-2 mt-2 border-t pt-2 text-[10px] font-bold">
                <div className="text-emerald-600">Benar: {quizResult.benar}</div>
                <div className="text-rose-600">Salah: {quizResult.salah}</div>
              </div>
            </div>
          </div>

          {/* Certificate Generation Graphic (Premium CSS Card) */}
          <div className="bg-amber-50/20 border border-amber-300 rounded-2xl p-6 relative overflow-hidden" id="certificate-panel">
            <div className="absolute top-0 right-0 p-4 text-xs font-bold text-amber-800">No. Seri: ST/2026/{Math.floor(1000 + Math.random() * 9000)}</div>
            
            {/* Standard frame styling in print mode */}
            <div className="border shadow-md bg-white border-dashed border-amber-400 rounded-xl p-8 max-w-2xl mx-auto space-y-6 text-center shadow-lg relative print:shadow-none print:border-none print:bg-white" id="anbk-printable-certificate">
              
              <div className="space-y-1">
                <div className="flex justify-center mb-2">
                  <Award className="w-12 h-12 text-amber-500 stroke-1" />
                </div>
                <h2 className="font-serif font-bold text-amber-900 text-lg md:text-xl uppercase tracking-wide">
                  SERTIFIKAT PENGHARGAAN
                </h2>
                <h4 className="font-sans text-slate-400 font-medium tracking-widest text-[9px]">
                  KEMENDIKBUDRISTEK NUMERASI STATISTIKA - KELAS 8 PHASE D
                </h4>
              </div>

              <div className="py-2">
                <p className="text-xs text-slate-500 block italic">Diberikan secara penuh kepada siswa kelas 8:</p>
                <strong className="text-xl font-serif text-slate-800 border-b border-double border-slate-300 py-1 inline-block uppercase mt-1">
                  {student.nama}
                </strong>
                <span className="block text-xs font-bold text-indigo-600 mt-1">{student.kelas}</span>
              </div>

              <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                Atas penyelesaian asesmen interaktif materi **Ukuran Pemusatan dan Penyebaran Data** dengan perolehan hasil nilai asesmen kompetensi sebesar:
              </p>

              <div className="inline-block px-5 py-2.5 bg-amber-50/50 rounded-xl border border-amber-200">
                <span className="text-[10px] text-amber-800 font-bold block uppercase tracking-wide">Sertifikat Kelulusan</span>
                <span className="text-2xl font-serif font-bold text-amber-700">{quizResult.nilai} / 100</span>
              </div>

              <div className="grid grid-cols-2 pt-6 items-end text-xs">
                <div className="text-left py-2">
                  <span className="text-slate-400 block text-[9px]">Tanggal Menyelesaikan</span>
                  <span className="font-mono text-slate-600 font-semibold">{quizResult.tanggalWaktu}</span>
                </div>
                <div className="text-right py-2">
                  <span className="text-slate-400 block text-[9px]">Guru Bidang Studi</span>
                  <strong className="font-serif block border-b border-dashed border-slate-300 pb-0.5 mt-8 text-slate-700 text-xs">
                    SUWARTO, S.Pd
                  </strong>
                  <span className="text-slate-400 block text-[9px] mt-0.5">NIP. 19741212 199903 1 002</span>
                </div>
              </div>
            </div>

            {/* Print trigger button */}
            <div className="flex flex-col sm:flex-row justify-center gap-2.5 mt-6" id="cert-actions">
              <button
                onClick={handlePrintCertificate}
                className="bg-amber-600 hover:bg-amber-700 text-white font-bold rounded-lg px-4 py-2 text-xs flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
              >
                <Printer className="w-4 h-4" /> Cetak / Simpan Sertifikat
              </button>
              
              <button
                onClick={handleRetake}
                className="bg-slate-200 hover:bg-slate-300 text-slate-700 font-bold rounded-lg px-4 py-2 text-xs flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <RefreshCcw className="w-4 h-4" /> Ulangi Ujian ANBK
              </button>
            </div>
          </div>

          {/* Teacher Config Section for spreadsheet connector if needed */}
          <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 space-y-4" id="teacher-config-panel">
            <h4 className="font-bold text-slate-800 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              Kelolakan Integrasi Spreadsheet (Khusus Guru / Pak Suwarto)
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Jika Guru ingin agar nilai siswa otomatis masuk ke baris tabel spreadsheet asli, silakan masukkan **URL Apps Script Web App** Guru yang sudah dideploy di bawah ini. Jika belum ada, Anda bisa menyalin instruksi script di bawah ini.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-600 block">Link Deployment Apps Script Baru Anda:</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={scriptUrl}
                  onChange={(e) => {
                    const val = e.target.value;
                    setScriptUrl(val);
                    localStorage.setItem('guru_apps_script_url', val);
                  }}
                  placeholder="https://script.google.com/macros/s/.../exec"
                  className="flex-1 bg-white border border-slate-300 rounded-lg px-3 py-1.5 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none"
                />
                <button
                  onClick={() => postToGoogleSheets(quizResult)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg px-4 text-xs font-bold shrink-0 transition-colors cursor-pointer"
                >
                  Sinkronkan Ulang
                </button>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-xs font-bold text-slate-600 block mb-1">Kode Google Apps Script untuk Guru (Salin & Tempel):</span>
              <textarea
                readOnly
                value={googleAppsScriptCode}
                className="w-full h-24 bg-slate-900 text-slate-300 font-mono text-[10px] p-2 rounded-lg border focus:outline-none"
              />
            </div>
          </div>

        </div>
      ) : (
        // ==================== MAIN EXAMINATION LAYOUT ====================
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start" id="anbk-engine">
          
          {/* Top Panel - Scale controls, Timer & Personal info */}
          <div className="lg:col-span-12 bg-white border border-slate-200 rounded-2xl p-4 flex flex-col md:flex-row justify-between items-center gap-3 shadow-xs" id="anbk-hud-bar">
            {/* Candidate Badge */}
            <div className="flex items-center gap-3" id="hud-candidate">
              <span className="w-10 h-10 rounded-full bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                {student.nama.charAt(0).toUpperCase()}
              </span>
              <div>
                <strong className="text-xs block text-slate-800">{student.nama}</strong>
                <span className="text-[10px] text-slate-400 block">{student.kelas} | Ujian Numerasi</span>
              </div>
            </div>

            {/* Timer Banner */}
            <div className="flex items-center gap-1.5 bg-rose-50 text-rose-700 border border-rose-100 rounded-xl px-4 py-1.5 font-mono font-bold text-sm" id="hud-timer">
              <Clock className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>Sisa Waktu: {formatTime(timeLeft)}</span>
            </div>

            {/* Text Scale Buttons */}
            <div className="flex items-center gap-2" id="hud-fontscale">
              <span className="text-[11px] text-slate-400 font-medium font-sans">Ukuran Soal:</span>
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-1 rounded text-xs font-bold border transition-colors ${fontSize === 'normal' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
              >
                A-
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-1 rounded text-xs font-bold border transition-colors ${fontSize === 'large' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-1 rounded text-xs font-bold border transition-colors ${fontSize === 'xlarge' ? 'bg-indigo-600 text-white border-indigo-600' : 'bg-slate-50 text-slate-500 border-slate-200'}`}
              >
                A+
              </button>
            </div>
          </div>

          {/* LEFT COLUMN: Stimulus Readings (Markdown / Tables) */}
          <div className="lg:col-span-4 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs" id="anbk-left-pane">
            <div className="bg-slate-50 border-b p-3.5 flex justify-between items-center">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">
                Wacana / Stimulus Soal
              </span>
              <span className="bg-indigo-100 text-indigo-800 text-[10px] font-bold px-2 py-0.5 rounded">
                Soal {currentIdx + 1} of 25
              </span>
            </div>
            
            <div className="p-5 max-h-[360px] lg:max-h-[460px] overflow-y-auto space-y-4" id="left-pane-viewport">
              <div className="prose prose-indigo max-w-none text-slate-600" id="stimulus-markdown-body">
                {/* Dynamically parsed custom stimulus layout with responsive tables/styles */}
                {renderFormattedStimulus(currentQuestion.stimulus)}
              </div>

              {/* Dynamic decorative helper banner to increase ANBK look and feel */}
              <div className="p-3 bg-indigo-50/70 rounded-xl border border-indigo-100 flex items-center gap-2 mt-4 text-[11px] font-medium text-slate-600">
                <span className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse"></span>
                <span>Gunakan data pencatatan dan tabel stimulus di atas untuk menjawab soal.</span>
              </div>
            </div>
          </div>

          {/* CENTER COLUMN: Action Question inputs */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs" id="anbk-center-pane">
            <div className="bg-slate-50 border-b p-3.5 flex justify-between items-center">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest">
                Lembar Jawaban Ujian
              </span>
              <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                currentQuestion.difficulty === 'mudah' ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' :
                currentQuestion.difficulty === 'sedang' ? 'bg-amber-50 text-amber-700 border border-amber-200' :
                'bg-rose-50 text-rose-700 border border-rose-200'
              }`}>
                TK: {currentQuestion.difficulty}
              </span>
            </div>

            <div className="p-5 space-y-6" id="center-pane-viewport">
              <div className="space-y-2">
                <h4 className={`font-bold text-slate-800 leading-snug font-sans ${getHeadingSizeClass()}`} id="qtext">
                  {currentQuestion.questionText}
                </h4>
              </div>

              {/* INPUT TYPE SWITCHNODE */}
              <div className="space-y-3" id="input-switch-area">
                
                {/* 1. PILIHAN GANDA */}
                {currentQuestion.type === 'pilihan-ganda' && currentQuestion.options && (
                  <div className="space-y-2.5" id="options-stack-pg">
                    {currentQuestion.options.map((option, optionIdx) => {
                      const isSelected = currentResponse.selectedOption === optionIdx;
                      return (
                        <button
                          key={optionIdx}
                          onClick={() => handleAnswerSelect(optionIdx)}
                          className={`w-full text-left p-3 rounded-xl border flex items-start gap-3 transition-colors text-xs font-semibold cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] shrink-0 ${
                            isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300 text-slate-500'
                          }`}>
                            {String.fromCharCode(65 + optionIdx)}
                          </span>
                          <span className="font-sans leading-tight">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 2. PILIHAN GANDA KOMPLEKS (Checkboxes) */}
                {currentQuestion.type === 'pilihan-ganda-kompleks' && currentQuestion.options && (
                  <div className="space-y-2.5" id="options-stack-pg-complex">
                    <span className="text-[10px] text-slate-400 block font-bold mb-1">*Soal ini memiliki lebih dari 1 pilihan jawaban benar.</span>
                    {currentQuestion.options.map((option, optionIdx) => {
                      const selOps = currentResponse.selectedOptions || [];
                      const isSelected = selOps.includes(optionIdx);
                      return (
                        <button
                          key={optionIdx}
                          onClick={() => handleComplexSelect(optionIdx)}
                          className={`w-full text-left p-3 rounded-xl border flex items-start gap-3 transition-colors text-xs font-semibold cursor-pointer ${
                            isSelected
                              ? 'border-indigo-600 bg-indigo-50/50 text-indigo-900 font-bold'
                              : 'border-slate-200 hover:border-slate-300'
                          }`}
                        >
                          <span className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 ${
                            isSelected ? 'bg-indigo-600 text-white border-indigo-600' : 'border-slate-300'
                          }`}>
                            {isSelected && <span className="text-[9px]">✓</span>}
                          </span>
                          <span className="font-sans leading-tight">{option}</span>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* 3. BENAR / SALAH MATRIX */}
                {currentQuestion.type === 'benar-salah' && currentQuestion.tfStatements && (
                  <div className="space-y-4" id="matrix-tf">
                    <span className="text-[10px] text-slate-400 block font-bold mb-1">*PILIH BENAR ATAU SALAH UNTUK SETIAP PERNYATAAN DI BAWAH.</span>
                    <div className="border border-slate-200 rounded-lg overflow-hidden" id="tf-matrix-table">
                      {currentQuestion.tfStatements.map((stmt) => {
                        const savedAns = currentResponse.tfAnswers?.[stmt.id];
                        return (
                          <div key={stmt.id} className="grid grid-cols-1 md:grid-cols-12 md:items-center border-b last:border-0 p-3 gap-2 bg-white" id={`tf-stmt-${stmt.id}`}>
                            <div className="md:col-span-8 text-xs font-sans text-slate-700 leading-tight">
                              {stmt.statement}
                            </div>
                            <div className="md:col-span-4 flex justify-around gap-2" id={`tf-toggles-${stmt.id}`}>
                              <button
                                type="button"
                                onClick={() => handleTrueFalseSelect(stmt.id, 'benar')}
                                className={`flex-1 text-center py-1 text-[10px] font-bold rounded border transition-colors cursor-pointer ${
                                  savedAns === 'benar'
                                    ? 'bg-emerald-600 text-white border-emerald-600'
                                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                Benar
                              </button>
                              <button
                                type="button"
                                onClick={() => handleTrueFalseSelect(stmt.id, 'salah')}
                                className={`flex-1 text-center py-1 text-[10px] font-bold rounded border transition-colors cursor-pointer ${
                                  savedAns === 'salah'
                                    ? 'bg-rose-600 text-white border-rose-600'
                                    : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                                }`}
                              >
                                Salah
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 4. MENJODOHKAN (Dropdown connections) */}
                {currentQuestion.type === 'menjodohkan' && currentQuestion.matchingPairs && currentQuestion.matchingOptions && (
                  <div className="space-y-4" id="matching-stack">
                    <span className="text-[10px] text-slate-400 block font-bold mb-1">*PASANGKAN SETIAP PERNYATAAN KIRI DENGAN JAWABAN KANAN YANG COCOK.</span>
                    <div className="space-y-3" id="matching-rows">
                      {currentQuestion.matchingPairs.map((pair) => {
                        const savedMatch = currentResponse.matchingAnswers?.[pair.id] || '';
                        return (
                          <div key={pair.id} className="p-3 bg-slate-50 rounded-xl border border-slate-150 flex flex-col sm:flex-row sm:items-center justify-between gap-2" id={`match-pair-${pair.id}`}>
                            <span className="text-xs font-sans text-slate-800 leading-tight">
                              {pair.premise}
                            </span>
                            
                            <select
                              value={savedMatch}
                              onChange={(e) => handleMatchingSelect(pair.id, e.target.value)}
                              className="bg-white border border-slate-300 rounded-lg px-2.5 py-1 text-xs focus:ring-1 focus:ring-indigo-500 focus:outline-none focus:outline-none min-w-[140px] sm:max-w-[220px]"
                            >
                              <option value="">-- Jodohkan --</option>
                              {currentQuestion.matchingOptions?.map((opt, oIdx) => (
                                <option key={oIdx} value={opt}>{opt}</option>
                              ))}
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

              </div>
            </div>

            {/* Bottom Question Controls Bar */}
            <div className="border-t bg-slate-50 p-4 flex justify-between items-center gap-2" id="anbk-control-buttons">
              <button
                type="button"
                onClick={goPrev}
                disabled={currentIdx === 0}
                className="bg-white border text-slate-700 hover:bg-slate-50 disabled:opacity-50 hover:border-slate-300 px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" /> Sebelumnya
              </button>

              {/* UNCERTAIN CHECKBOX */}
              <label 
                className={`flex items-center gap-2 px-4 py-2 bg-amber-50 border border-amber-200 rounded-lg cursor-pointer hover:bg-amber-100/50 select-none ${
                  currentResponse.isFlagged ? 'ring-2 ring-amber-500 font-bold text-amber-900 bg-amber-100/30' : 'text-amber-800'
                }`}
                id="checkbox-ragu"
              >
                <input
                  type="checkbox"
                  checked={currentResponse.isFlagged}
                  onChange={toggleFlag}
                  className="w-3.5 h-3.5 text-amber-500 cursor-pointer accent-amber-500"
                />
                <span className="text-xs font-bold font-sans">Ragu-Ragu</span>
              </label>

              {currentIdx === quizQuestions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-lg text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
                >
                  <CheckSquare className="w-4 h-4" /> Selesai Tes
                </button>
              ) : (
                <button
                  type="button"
                  onClick={goNext}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-3.5 py-2.5 rounded-lg text-xs font-semibold flex items-center gap-1.5 cursor-pointer shadow-xs"
                >
                  Berikutnya <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* RIGHT COLUMN: Question Navigation Matrix Panel */}
          <div className="lg:col-span-3 bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-xs" id="anbk-right-pane">
            <div className="bg-slate-50 border-b p-3.5" id="nav-pane-header">
              <span className="text-xs font-extrabold text-slate-700 uppercase tracking-widest block text-center">
                Navigasi Soal ANBK
              </span>
            </div>

            <div className="p-4" id="nav-pane-gridbox">
              <div className="grid grid-cols-5 gap-2.5" id="nav-pane-matrix">
                {quizQuestions.map((q, idx) => {
                  const resp = responses[idx];
                  const isActive = currentIdx === idx;
                  
                  // Color configuration based on answered stats
                  let bgClass = 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700';
                  if (resp.isFlagged) {
                    bgClass = 'bg-amber-100 text-amber-900 border-amber-300';
                  } else if (resp.isAnswered) {
                    bgClass = 'bg-emerald-600 text-white border-emerald-600 hover:bg-emerald-700';
                  }

                  return (
                    <button
                      key={q.id}
                      onClick={() => setCurrentIdx(idx)}
                      className={`relative aspect-square rounded-lg border text-xs font-bold flex items-center justify-center font-mono cursor-pointer transition-all ${bgClass} ${
                        isActive ? 'ring-3 ring-indigo-500 scale-105' : ''
                      }`}
                      id={`nav-idx-${q.id}`}
                    >
                      {q.id}
                      
                      {/* Interactive little helper dots */}
                      {resp.isFlagged && (
                        <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-amber-500 rounded-full border border-white" />
                      )}
                    </button>
                  );
                })}
              </div>

              {/* Small grid legends description */}
              <div className="border-t mt-4 pt-3 space-y-1.5 text-[10px]" id="nav-legends">
                <span className="block font-bold text-slate-400 mb-1">Keterangan Status:</span>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 bg-emerald-600 border border-emerald-700 rounded block" />
                  <span className="text-slate-500 font-medium">Sudah Terjawab</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 bg-amber-100 border border-amber-300 rounded block" />
                  <span className="text-slate-500 font-medium">Flag Ragu-Ragu</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3.5 h-3.5 bg-slate-50 border border-slate-200 rounded block" />
                  <span className="text-slate-500 font-medium">Belum Dijawab</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  );
}
