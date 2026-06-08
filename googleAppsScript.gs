/**
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
                         .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({ "status": "active", "message": "Portal Database Guru Suwarto Aktif!" }))
                       .setMimeType(ContentService.MimeType.JSON);
}

function styleHeader(sheet) {
  var range = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  range.setFontWeight("bold");
  range.setBackground("#f1f5f9");
  range.setFontColor("#1e293b");
  range.setHorizontalAlignment("center");
}
