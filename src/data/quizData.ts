/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { QuestionData } from '../types';

export const quizQuestions: QuestionData[] = [
  // ==================== 10 PILIHAN GANDA (SINGLE ANSWER) ====================
  {
    id: 1,
    type: 'pilihan-ganda',
    difficulty: 'mudah',
    stimulus: `**Konteks: Analisis Hasil Evaluasi Matematika Kelas 8A**

Asesmen Nasional Berbasis Komputer (ANBK) bertujuan untuk membekali siswa dengan kemampuan literasi numerasi yang kuat dalam memecahkan masalah kehidupan nyata. Dalam rangka mempersiapkan kompetensi murid-murid di SMP Nusa Bangsa, Pak Suwarto, S.Pd., selaku guru pengampu mata pelajaran Matematika kelas 8, mengadakan sebuah simulasi evaluasi awal pada materi Statistika.

Pencatatan data numerik hasil belajar sangat berguna untuk memetakan sejauh mana pemahaman kognitif siswa mengenai ukuran pemusatan kelompok. Pak Suwarto mengumpulkan nilai murni hasil ulangan harian matematika dari 10 siswa perwakilan Kelas 8A. Ke-10 siswa ini dipilih secara acak guna mewakili sebaran kompetensi kelas secara keseluruhan agar program pendampingan berjalan tepat sasaran.

Berdasarkan hasil ujian harian tertulis penilaian harian statistika, berikut adalah daftar perolehan nilai mentah dari sepuluh siswa tersebut:
\`\`\`
70, 80, 75, 85, 90, 70, 80, 85, 75, 70
\`\`\`
Pak Suwarto mencermati bahwa nilai-nilai ini bervariasi dengan rentang yang cukup dinamis. Beliau ingin melakukan evaluasi dengan mencari nilai modus (data yang paling sering muncul). Modus ini nantinya akan digunakan sebagai indikator batas bawah untuk menentukan nilai yang paling umum diraih oleh siswa kelas 8A sehingga beliau dapat merekayasa strategi pengajaran kelompok remedial terfokus.`,
    questionText: 'Berapakah nilai modus dari data ulangan matematika tersebut?',
    options: [
      '70 (karena muncul paling banyak yaitu 3 kali)',
      '75 (karena berada di urutan tengah-tengah)',
      '80 (karena merupakan nilai rata-rata kelas)',
      '90 (karena merupakan nilai tertinggi siswa)'
    ],
    correctOption: 0
  },
  {
    id: 2,
    type: 'pilihan-ganda',
    difficulty: 'mudah',
    stimulus: `**Konteks: Berat Badan Anggota Regu Pramuka**

Kegiatan Kepramukaan merupakan sarana yang efektif untuk melatih kemandirian, kedisiplinan, dan kolaborasi bagi seluruh peserta didik di tingkat Sekolah Menengah Pertama (SMP). Pada hari Sabtu yang lalu, Regu Rajawali yang merupakan salah satu regu berprestasi dari kelas 8 mengadakan latihan fisik rutin sebagai persiapan menghadapi Jambore Cabang tingkat Kabupaten.

Untuk memastikan kesiapan fisik dan keselamatan anggotanya, Pak Suwarto selaku Pembina Penegak dan Pelatih Pramuka berinisiatif mengukur parameter fisik dasar mereka. Salah satu parameter krusial yang diukur adalah berat badan para anggota regu. Pak Suwarto memilih sampel acak yang terdiri dari 5 orang siswa perwakilan Regu Rajawali untuk didata terlebih dahulu berat badan murninya.

Berikut adalah data hasil penimbangan berat badan (dalam satuan kg) dari kelima siswa tersebut yang telah dicatat dan diurutkan secara cermat dari yang terkecil hingga yang terbesar:
\`\`\`
42 kg, 45 kg, 48 kg, 50 kg, 55 kg
\`\`\`
Data yang terkumpul ini akan dianalisis untuk menentukan titik tengah distribusi berat badan regu tersebut. Pengukuran nilai tengah (median) ini sangat penting untuk memastikan penentuan porsi beban berkemah (logistik kelompok) yang akan dipikul masing-masing anak secara proporsional.`,
    questionText: 'Berapakah nilai median (nilai tengah) dari berat badan siswa tersebut?',
    options: [
      '45 kg',
      '48 kg',
      '49 kg',
      '50 kg'
    ],
    correctOption: 1
  },
  {
    id: 3,
    type: 'pilihan-ganda',
    difficulty: 'mudah',
    stimulus: `**Konteks: Gemar Membaca dan Koleksi Komik**

Membaca adalah jendela dunia yang membantu membuka cakrawala berpikir peserta didik. Di SMP Tunas Bangsa, sebuah kampanye bertajuk "Satu Bulan Satu Buku" dicanangkan guna mendongkrak minat baca siswa yang sempat menurun selama masa liburan sekolah. Guna mendukung program literasi ini, Andi, ketua ekstrakurikuler majalah dinding kelas 8, melakukan jajak pendapat kecil-kecilan mengenai komik fiksi ilmiah ilmiah.

Andi ingin mengetahui seberapa aktif aktivitas membaca di luar lingkungan sekolah formal. Ia memilih 6 orang teman akrabnya di kelas untuk diawasi dan dicatat berapa jumlah buku komik atau novel bergambar yang berhasil diselesaikan dan dibaca secara tuntas dalam kurun waktu satu bulan penuh selama program berlangsung.

Adapun pencatatan jumlah buku komik yang dibaca oleh keenam rekannya adalah sebagai berikut:
\`\`\`
2, 4, 3, 5, 2, 8
\`\`\`
Andi ingin mengetahui jangkauan (range atau selisih) terjauh dari kebiasaan membaca ini. Langkah ini dilakukan agar ia dapat mengetahui kesenjangan intensitas membaca di antara teman-temannya kelas 8, sehingga ia dapat merencanakan kegiatan diskusi buku berkelompok yang lebih seragam untuk memperkecil ketertinggalan siswa yang jarang membaca.`,
    questionText: 'Berapakah nilai jangkauan (range) dari jumlah komik yang dibaca tersebut?',
    options: [
      '2 buku',
      '4 buku',
      '6 buku',
      '8 buku'
    ],
    correctOption: 2
  },
  {
    id: 4,
    type: 'pilihan-ganda',
    difficulty: 'sedang',
    stimulus: `**Konteks: Pengamatan Suhu Udara Maksimum Kota Sukabumi**

Pemanasan global merupakan isu rill yang berdampak langsung pada kehidupan kita sehari-hari, termasuk peningkatan fluktuasi suhu udara di perkotaan. Dinas Meteorologi, Klimatologi, dan Geofisika (BMKG) Cabang wilayah setempat bertugas mencatat dan melaporkan kondisi temperatur harian. Hal ini dilakukan demi mengedepankan kesiapsiagaan warga terhadap perubahan cuaca yang ekstrem.

Dalam satu pekan pengamatan aktif, petugas stasiun cuaca mencatatkan suhu udara maksimum harian (dalam satuan derajat Celsius) dari hari Senin hingga hari Minggu di pusat Kota Sukabumi. Data ini kemudian dihimpun oleh Pak Suwarto sebagai studi kasus kontekstual penerapan statistika realistik pada modul ajar geografi kuantitatif kelas 8 SMP.

Berikut adalah tabel data pencatatan suhu maksimum (°C) kota Sukabumi selama seminggu penuh:

| Parameter | Senin | Selasa | Rabu | Kamis | Jumat | Sabtu | Minggu |
| :--- | :---: | :----: | :--: | :---: | :---: | :---: | :----: |
| Suhu (°C) | 28 | 30 | 29 | 31 | 30 | 32 | 30 |

Melalui tabel di atas, Pak Suwarto melatih siswa untuk menentukan perwakilan kuantitatif suhu mingguan. Nilai rata-rata suhu harian ini sangat berguna sebagai dasar analisis ilmiah keberlangsungan lingkungan hidup guna dilaporkan ke instansi terkait.`,
    questionText: 'Hitunglah nilai rata-rata (mean) dari suhu harian udara di kota tersebut!',
    options: [
      '29,5 °C',
      '30,0 °C',
      '30,5 °C',
      '31,0 °C'
    ],
    correctOption: 1
  },
  {
    id: 5,
    type: 'pilihan-ganda',
    difficulty: 'sedang',
    stimulus: `**Konteks: Proyek Penelitian Biologi Tinggi Bibit Tanaman Cabai**

Pembelajaran berbasis proyek (Project-Based Learning) merupakan inti dari kurikulum Merdeka untuk melatih siswa berpikir logis dan sistematis. Dalam mata pelajaran Ilmu Pengetahuan Alam (IPA), Lani mendapatkan tugas proyek mandiri untuk meneliti laju pertumbuhan tanaman perkebunan harian. Lani memilih menanam bibit cabai menggunakan media tanah humus di halaman belakang rumahnya.

Setiap hari secara disiplin, Lani menyirami dan mengoleskan nutrisi organik pada tanaman-tanaman tersebut. Setelah memasuki minggu keempat masa tanam, Lani mengukur tinggi fisik dari 8 bibit tanaman cabai yang tumbuh paling subur untuk dievaluasi variasi pertumbuhannya. Pengukuran tinggi tanaman dihitung menggunakan penggaris presisi dalam satuan sentimeter (cm).

Berikut diperoleh hasil pengukuran tinggi kedelapan bibit cabai Lani:
\`\`\`
12, 15, 14, 18, 20, 16, 15, 22
\`\`\`
Lani ingin mengolah data acak ini menjadi statistik yang teratur. Langkah awal yang perlu dilakukannya adalah mengurutkan data tersebut dari tinggi yang paling rendah ke yang paling mulia, kemudian mencari letak nilai tengah (median) untuk disajikan sebagai perwakilan pertumbuhan biologis tinggi bibit cabai laporannya.`,
    questionText: 'Urutkan data tersebut dan tentukan nilai median dari tinggi bibit cabai ini!',
    options: [
      '15,0 cm',
      '15,5 cm',
      '16,0 cm',
      '17,0 cm'
    ],
    correctOption: 1
  },
  {
    id: 6,
    type: 'pilihan-ganda',
    difficulty: 'sedang',
    stimulus: `**Konteks: Performa Gol Tim Sepak Bola SMP Nusa Indah**

Olahraga selain menyehatkan tubuh juga melatih sportivitas dan jiwa kepemimpinan siswa sekolah. Tim sepak bola putra SMP Nusa Indah baru saja menyelesaikan babak kualifikasi turnamen sepak bola antarpelajar tingkat kabupaten. Sepanjang turnamen yang ketat tersebut, tim sekolah harus menghadapi perlawanan sengit dari berbagai sekolah rival lainnya dalam 9 sesi laga berturut-turut.

Koordinator olahraga sekolah secara rutin mencatat jumlah skor gol yang berhasil dilesakkan oleh para penyerang tim sepak bola ke gawang lawan pada tiap sesi pertandingan. Data gol ini sangat penting bagi jajaran pelatih sebagai bahan evaluasi taktis permainan guna menyusun strategi penyerangan yang lebih tajam pada kompetisi esok hari.

Rincian perolehan jumlah gol tim sepak bola sekolah dalam 9 kali pertandingan tersebut adalah sebagai berikut:
\`\`\`
1, 3, 0, 2, 4, 1, 2, 2, 3
\`\`\`
Asisten pelatih ingin memetakan penyebaran performa gol tim berdasarkan analisis ukuran tata letak kuartil data. Ia bermaksud menghitung nilai Kuartil Pertama (Q1) dari sekumpulan data gol tersebut setelah diurutkan, guna mengevaluasi batas pencapaian gol minimal pada sepertiga awal seluruh laga.`,
    questionText: 'Berapakah nilai kuartil pertama (Q1) dari jumlah gol yang dicetak tim tersebut?',
    options: [
      '1,0 gol',
      '1,5 gol',
      '2,0 gol',
      '2,5 gol'
    ],
    correctOption: 0
  },
  {
    id: 7,
    type: 'pilihan-ganda',
    difficulty: 'sedang',
    stimulus: `**Konteks: Profil Usia Karyawan Perusahaan Rintisan Digital**

Perusahaan rintisan digital (startup) dikenal memiliki kultur kerja dinamis dengan mayoritas tenaga kerja produktif di usia muda. Sebuah perusahaan teknologi yang bergerak di bidang sistem edukasi anak bangsa merekrut 10 talenta muda sebagai staf inti untuk mengembangkan produk kecerdasan buatan mereka. 

Manajer Sumber Daya Manusia (HRD) memerlukan analisis demografis usia tenaga kerja untuk merancang program jaminan kesehatan karyawan, asuransi, serta pemetaan jalur karir korporat yang selaras. Mengetahui ukuran penyebaran usia staf juga membantu manajemen memahami dinamika keragaman usia di kantor.

Berikut adalah daftar data usia produktif (dalam satuan tahun) dari kesepuluh karyawan baru tersebut yang telah resmi diurutkan dari yang termuda hingga yang tertua:
\`\`\`
22, 24, 25, 26, 28, 30, 31, 35, 40, 42
\`\`\`
Guna menghitung variabilitas rentang usia pekerja di lapisan tengah, tim HRD sepakat menghitung jangkauan interkuartil (hamparan) dari data tersebut. Rentang interkuartil yang diperoleh dari selisih Kuartil Ketiga (Q3) dan Kuartil Pertama (Q1) ini memberikan gambaran yang lebih stabil mengenai penyebaran umur staf inti perusahaan.`,
    questionText: 'Berapakah jangkauan interkuartil (hamparan) atau H = Q3 - Q1 dari usia karyawan tersebut?',
    options: [
      '10 tahun',
      '12 tahun',
      '13 tahun',
      '20 tahun'
    ],
    correctOption: 0
  },
  {
    id: 8,
    type: 'pilihan-ganda',
    difficulty: 'sulit',
    stimulus: `**Konteks: Evaluasi Penjualan Harian Toko Sepatu**

Analisis penjualan harian dalam dunia bisnis sangat penting untuk memproyeksikan target laba rugi bulanan dan mengelola ketersediaan stok barang di gudang. Sebuah toko ritel alas kaki dan sepatu olahraga "Langkah Nyaman" melakukan audit rutin atas volume transaksi penjualan harian mereka demi merancang promosi potongan harga akhir pekan.

Manajer penjualan mencatat performa penjualan harian toko tersebut selama 15 hari pertama pelacakan aktif. Berdasarkan rekalkulasi menyeluruh, diperoleh nilai rata-rata (mean) penjualan toko tersebut adalah sebesar 12 pasang sepatu per hari. Ini mencerminkan stabilitas minat pembeli normal sepanjang hari biasa.

Namun, pada hari ke-16 bertepatan dengan kampanye festival hari belanja daring nasional, toko sepatu tersebut mengalami lonjakan transaksi yang sangat besar dan berhasil menjual sebanyak 28 pasang sepatu dalam satu hari penuh. 

Data mengejutkan pada hari ke-16 ini akan digabungkan dengan lima belas data harian sebelumnya. Manajer toko harus menghitung kembali nilai rata-rata yang baru untuk mengevaluasi dampak lonjakan hari raya belanja daring tersebut terhadap rata-rata bulanan penjualan di toko mereka secara utuh.`,
    questionText: 'Tentukan rata-rata baru penjualan sepatu setelah ditambah data hari ke-16!',
    options: [
      '13 pasang sepatu',
      '13,5 pasang sepatu',
      '14 pasang sepatu',
      '15 pasang sepatu'
    ],
    correctOption: 0
  },
  {
    id: 9,
    type: 'pilihan-ganda',
    difficulty: 'sulit',
    stimulus: `**Konteks: Distribusi Pendapatan dan Fenomena Pencilan Gaji**

Ukuran pemusatan data sering kali dapat memberikan kesan yang salah (misleading) jika data yang dianalisis memiliki nilai ekstrem atau pencilan (outlier) yang sangat jauh dari kelompok data lainnya. Kasus ini sangat sering terjadi dalam statistik ekonomi sosial, khususnya saat menganalisis tingkat kesejahteraan pekerja di tempat industri.

Di sebuah unit pabrik konveksi kecil rumahan, pemilik usaha mempekerjakan 9 orang karyawan biasa sebagai operator jahit otomatis. Masing-masing dari kesembilan operator jahit ini menerima gaji pokok tetap bulanan sebesar Rp3.000.000. Sementara itu, terdapat satu orang bapak bertindak sebagai Manajer Produksi Senior (kepala operasional pabrik) yang membawa pulang upah bulanan sebesar Rp15.000.000.

Berikut adalah tabel rincian sebaran upah karyawan pabrik konveksi tersebut:

| Posisi Jabatan | Operator Jahit (9 Orang) | Manajer Senior (1 Orang) |
| :--- | :---: | :---: |
| Gaji Per Bulan | Rp3.000.000 per orang | Rp15.000.000 per orang |

Guna menarik minat para pelamar kerja baru di bursa lowongan kerja kabupaten, pemilik pabrik ingin mengumumkan "tingkat upah rata-rata (mean)" di perusahaannya yang bernilai tinggi akibat ditarik ke atas oleh gaji manajer senior. Namun, serikat pekerja menuntut kejujuran publik terkait penyajian statistik upah yang dirasakan sebagian besar karyawan.`,
    questionText: 'Manakah ukuran pemusatan data (mean, median, atau modus) yang paling jujur dan tepat digunakan untuk menggambarkan kondisi keuangan sebagian besar karyawan tersebut?',
    options: [
      'Mean, karena nilainya tinggi yaitu Rp4.200.000 sehingga memotivasi karyawan baru.',
      'Modus atau Median, keduanya adalah Rp3.000.000, yang mewakili kenyataan upah sebagian besar karyawan tanpa terpengaruh gaji manajer yang sangat tinggi (outlier).',
      'Range, karena dapat menunjukkan selisih gaji terbesar dan terkecil di pabrik tersebut.',
      'Mean atau Median, karena nilainya selalu sama pada data tunggal kelompok kecil.'
    ],
    correctOption: 1
  },
  {
    id: 10,
    type: 'pilihan-ganda',
    difficulty: 'sulit',
    stimulus: `**Konteks: Dinamika Rerata Nilai Kelompok Belajar**

Kolaborasi belajar dalam kelompok sangat dianjurkan untuk mempercepat transfer pengetahuan antarsiswa di lingkup kelas. Di SMP Sukamaju, sebuah kelompok belajar kecil yang menamakan dirinya kelompok "Cinta Matematika" dibentuk oleh siswa Kelas 8 untuk mempersiapkan Ujian Asesmen Akhir Semester materi aljabar dan geometri.

Pada sesi mula-mula, kelompok belajar mandiri ini hanya beranggotakan 4 orang anak berprestasi sedang. Setelah melakukan ujian tryout mini bersama-sama yang dikoordinasikan oleh ketua kelas, tercatat bahwa nilai rata-rata (mean) matematika dari keempat anak anggota awal kelompok belajar tersebut adalah sebesar 78. Nilai ini dirasa cukup baik namun masih memerlukan peningkatan.

Keesokan harinya, seorang siswa pintar bernama Budi memutuskan bergabung sebagai anggota baru kelima di kelompok studi tersebut. Kehadiran Budi memberikan pengaruh positif yang signifikan bagi kelompok. Setelah Budi ikut berkontribusi dalam pengerjaan tugas pasca-belajar bersama, Pak Suwarto menghitung ulang rata-rata nilai kelompok tersebut.

Tercatat bahwa dengan masuknya Budi, nilai rata-rata (mean) kelompok belajar Matematika tersebut kini naik menjadi 81. Kenaikan rata-rata ini dipicu oleh kontribusi nilai individu Budi yang berada di atas rata-rata kelompok sebelumnya. Pak Suwarto ingin melatih siswa menelusuri berapa nilai murni yang diperoleh Budi dari hasil rekap kenaikan rata-rata kelompok tersebut.`,
    questionText: 'Berapakah nilai ujian matematika yang diperoleh Budi sehingga mampu menaikkan rata-rata kelas?',
    options: [
      '85',
      '90',
      '93',
      '95'
    ],
    correctOption: 2
  },

  // ==================== 5 PILIHAN GANDA KOMPLEKS (MULTIPLE CHOICE) ====================
  {
    id: 11,
    type: 'pilihan-ganda-kompleks',
    difficulty: 'mudah',
    stimulus: `**Konteks: Sensus Saudara Kandung Siswa Kelas 8**

Kegiatan pengumpulan data secara langsung di lingkungan sekolah melatih siswa memahami dasar sensus kependudukan secara mikro. Pada mata pelajaran statistika terapan, anak-anak Kelompok B Kelas 8 ditugaskan melakukan pendataan sosiologis mengenai jumlah saudara kandung (kakak atau adik kandung) yang dimiliki oleh masing-masing siswa di barisan tempat duduk baris kedua mereka.

Jumlah anggota keluarga merupakan salah satu variabel diskrit statistika sosial yang sangat mudah diamati. Dengan memiliki data ini, siswa dapat belajar menghitung parameter penting seperti ukuran pemusatan dan ukuran penyebaran dari data populasi berukuran kecil (sampel data).

Adapun rincian catatan data jumlah saudara kandung dari 10 siswa yang menjadi responden tersebut adalah sebagai berikut:
\`\`\`
1, 3, 2, 0, 1, 2, 1, 4, 1, 2
\`\`\`
Siswa diminta mengkaji karakteristik sebaran ini dengan cermat. Nilai modus, nilai median, dan nilai jangkauan (range) perlu ditentukan secara teliti agar laporan presentasi kerja kelompok memperoleh kesimpulan deskriptif yang valid bagi kawan sekelas.`,
    questionText: 'Pilihlah DUA pernyataan berikut yang BENAR mengenai data jumlah saudara kandung di atas! (Pilih 2 jawaban)',
    options: [
      'Modus dari data tersebut adalah 1 anak.',
      'Median dari data tersebut adalah 2 anak.',
      'Jangkauan (range) data tersebut adalah 4.',
      'Jumlah total saudara kandung yang dimiliki semua siswa adalah 20.'
    ],
    correctOptions: [0, 2]
  },
  {
    id: 12,
    type: 'pilihan-ganda-kompleks',
    difficulty: 'mudah',
    stimulus: `**Konteks: Memahami Karakter Sifat Ukuran Pemusatan**

Dalam statistika deskriptif, ukuran pemusatan data (measures of central tendency) digunakan untuk merangkum sekumpulan data observasi menjadi satu representasi nilai tunggal yang paling mencerminkan pusat sebaran data tersebut. Sebelum masuk pada kalkulasi rumit, penting bagi murid tingkat SMP untuk memahami dasar konseptual teoretis masing-masing ukuran pemusatan.

Tiga ukuran pemusatan utama yang paling sering kita gunakan adalah Rata-rata (Mean), Nilai Tengah (Median), dan Modus. Masing-masing memiliki sifat unik:
- **Mean (Rata-rata)**: Sangat dipengaruhi oleh setiap nilai data tunggal di kelompoknya, termasuk jika ada nilai ekstrem tinggi/rendah.
- **Median (Nilai Tengah)**: Hanya dipengaruhi oleh urutan posisi data, sehingga kokoh dari gangguan nilai ekstrem.
- **Modus (Nilai Tersering)**: Hanya melihat kepadatan frekuensi kemunculan nilai tertentu dan tidak bergantung pada nilai lain.

Pak Suwarto memberikan ceramah interaktif singkat mengenai implikasi matematis dari sifat-sifat ini di kehidupan nyata sebelum memulai ujian ANBK. Siswa diminta menentukan secara teoretis manakah definisi dan karakteristik umum yang paling logis dan sahih terkait ketiga ukuran tersebut.`,
    questionText: 'Manakah dari pernyataan berikut yang TEPAT mengenai definisi ukuran pemusatan? (Pilih semua yang benar)',
    options: [
      'Mean adalah nilai rata-rata yang diperoleh dengan membagi jumlah semua data dengan banyak data.',
      'Median selalu bernilai lebih besar daripada Mean pada semua jenis kumpulan data.',
      'Modus adalah nilai atau data yang paling sering muncul (mempunyai frekuensi tertinggi).',
      'Data tunggal tidak mungkin memiliki lebih dari satu modus.'
    ],
    correctOptions: [0, 2]
  },
  {
    id: 13,
    type: 'pilihan-ganda-kompleks',
    difficulty: 'sedang',
    stimulus: `**Konteks: Jurnal Hidrasi dan Konsumsi Cairan Harian Murid**

Menjaga kecukupan cairan tubuh harian sangat penting untuk mempertahankan fokus dan daya konsentrasi belajar murid di sekolah. Oleh karena itu, dalam kegiatan Projek Penguatan Profil Pelajar Pancasila (P5) bertema Gaya Hidup Berkelanjutan di SMP Harapan Ibu, siswa kelas 8 mencatat konsumsi air mineral harian mereka dalam jurnal kesehatan kelas.

Pencatatan dilakukan menggunakan gelas atau botol ukur standar berkapasitas 600 mililiter (ml) sebagai satuan volume seragam. Sebanyak 8 siswa dipilih sebagai pelacak harian untuk mencatat seberapa banyak botol cairan yang berhasil mereka minum sepanjang hari sekolah dari pagi hari hingga malam hari sebelum istirahat.

Berikut adalah tabel komparasi volume minum botol (ukuran 600 ml) dari kedelapan siswa selama satu hari pengamatan:

| Siswa Responden | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 |
| :--- | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: |
| Botol Konsumsi (600 ml) | 3 | 4 | 2 | 5 | 3 | 4 | 6 | 3 |

Sebagai penilai projek, Pak Suwarto menantang siwa kelas 8 untuk menyajikan analisis statistik lengkap dari jurnal hidrasi ini, termasuk perhitungan nilai rata-rata, median, kuartil ketiga (atas), serta simpangan kuartil penyebaran data konsumsi tersebut.`,
    questionText: 'Analisis data konsumsi air minum tersebut. Manakah DUA dari hasil perhitungan statistik berikut yang benar? (Pilih 2 jawaban)',
    options: [
      'Nilai rata-rata (mean) konsumsi air minum harian adalah 3,75 botol.',
      'Nilai median data di atas adalah 3,0 botol.',
      'Nilai kuartil ketiga (Q3) data di atas adalah 4,5 botol.',
      'Simpangan kuartil (Qd) data tersebut adalah 1,5 botol.'
    ],
    correctOptions: [0, 2]
  },
  {
    id: 14,
    type: 'pilihan-ganda-kompleks',
    difficulty: 'sedang',
    stimulus: `**Konteks: Laporan Inventaris Penjualan Donat Kantin Pintar**

Unit Usaha Kesehatan Sekolah (UKS) dan Koperasi Siswa SMP Generasi Emas mengelola modal dagang kantin sehat secara transparan dan digital. Salah satu komoditas jajanan sehat yang paling digemari para siswa saat jam istirahat pertama adalah donat mini aneka rasa berbahan ubi ungu organik yang dipasok oleh kelompok pemberdayaan wanita tani setempat.

Pengurus koperasi berkewajiban mencatat performa dagang harian komoditas donat ini guna menyesuaikan volume pesanan ke produsen lokal pada minggu berikutnya agar tidak terjadi sisa donat basi (makanan mubazir) ataupun kekurangan pasokan donat saat siswa mengantre.

Kantin mencatat total jumlah donat mini ubi ungu yang terjual secara sukses selama 6 hari sekolah aktif berturut-turut (Senin sampai Sabtu) sebagai berikut:
\`\`\`
24, 28, 20, 32, 24, 34
\`\`\`
Anggota koperasi yang merupakan siswa kelas 8 ditugaskan membuat infografis laporan bulanan. Mereka harus menyusun analisis parameter pemusatan data dan melakukan verifikasi terhadap nilai rata-rata, nilai median, modus penjualan, serta rentang jangkauan donat terjual guna memastikan keakuratan pelaporan laba rugi bulanan.`,
    questionText: 'Pilihlah pernyataan-pernyataan berikut yang BENAR mengenai data penjualan tersebut! (Pilih semua yang benar)',
    options: [
      'Rata-rata (mean) penjualan donat per hari adalah 27,67 donat.',
      'Median dari penjualan donat tersebut adalah 26 donat.',
      'Modus penjualan donat adalah 24 donat.',
      'Jangkauan (range) donat terjual adalah 10 buah.'
    ],
    correctOptions: [1, 2]
  },
  {
    id: 15,
    type: 'pilihan-ganda-kompleks',
    difficulty: 'sulit',
    stimulus: `**Konteks: Kampanye Digitalisasi dan Pemantauan Sinyal Sekolah**

Konektivitas internet berkecepatan tinggi kini telah menjadi kebutuhan infrastruktur mutlak di lingkungan pendidikan guna menunjang kelancaran pelaksanaan ujian berbasis komputer (ANBK) serta kegiatan belajar mengajar secara daring. Guna mengoptimalkan jaringan, Kepala Sekolah bersama staf teknologi informasi melakukan pengukuran kecepatan internet.

Pengukuran dilakukan menggunakan aplikasi uji kecepatan standar industri (speedtest) dalam satuan megabit per detik (Mbps). Petugas mengukur kekuatan bandwidth di 5 titik ruangan sekolah yang berbeda secara acak guna memetakan potensi gangguan sinyal (noise) atau adanya area yang kurang terjangkau pemancar wifi.

Berikut tabel data rekaman kecepatan unduh (download speed) WiFi di lima lokasi berbeda sekolah:

| Area Lokasi | Perpustakaan | Kelas 8A | Kelas 8B | Laboratorium | Ruang Server |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Kecepatan (Mbps) | 15 Mbps | 20 Mbps | 25 Mbps | 35 Mbps | 80 Mbps |

Staf IT mengamati bahwa kecepatan WiFi di Ruang Server melesat hingga 80 Mbps. Kecepatan ini bertindak sebagai nilai pencilan (outlier) karena menggunakan koneksi kabel serat optik langsung (LAN), sementara area kelas biasa hanya mendapatkan persebaran sinyal nirkabel standar. Siswa diminta menganalisis apa dampak rill dari data ekstrem 80 Mbps ini terhadap perhitungan nilai Rata-rata (mean) dan Nilai Tengah (median) kecepatan internet sekolah keseluruhan.`,
    questionText: 'Berdasarkan dampak dari data pencilan (outlier) sebesar 80 Mbps tersebut, manakah efek yang BENAR di bawah ini? (Pilih 2 jawaban)',
    options: [
      'Rata-rata (mean) ditarik menjadi naik secara signifikan sehingga terkesan kecepatan internet seluruh ruangan sangat kencang (35 Mbps).',
      'Median (nilai tengah yaitu 25 Mbps) tidak terpengaruh secara ekstrem oleh nilai darmagala 80 Mbps, menjadikannya representasi yang lebih baik dari ruangan kelas biasa.',
      'Modus dari data tersebut berubah menjadi 80 Mbps.',
      'Jangkauan (range) menjadi sangat kecil karena adanya data ekstrim tersebut.'
    ],
    correctOptions: [0, 1]
  },

  // ==================== 5 BENAR / SALAH (3 STATEMENTS EACH) ====================
  {
    id: 16,
    type: 'benar-salah',
    difficulty: 'mudah',
    stimulus: `**Konteks: Konseptualisasi Jangkauan dan Nilai Batas Kuartil**

Kombinasi literasi dan numerasi matematis menghendaki siswa tidak sekadar pandai berhitung angka murni, melainkan juga menuntut kemampuan berpikir divergen dalam menafsirkan arti konsep-konsep ukuran penyebaran data. Statistika mengajarkan kita bahwa letak pusat data saja tidaklah cukup lengkap untuk mencerminkan karakteristik sebaran sekelompok sampel.

Dalam bab penyebaran data, siswa mempelajari konsep Kuartil dan Jangkauan (range). 
- **Kuartil** memotong susunan data terurut menjadi 4 kelompok persentase seimbang (masing-masing bagian mewakili 25% data).
- **Kuartil bawah (Q1)**, **Kuartil Tengah (Q2 atau Median)**, dan **Kuartil atas (Q3)** merupakan sekat posisi tersebut.
- **Jangkauan (Range)** adalah ukuran variasi yang paling sederhana dalam melihat rentang cakupan data mutlak.

Pak Suwarto menyusun beberapa pernyataan teoretis dasar sebagai bahan diskusi interaktif di kelas guna menguji kesiapan siswa dalam membedakan kaitan antara kuartil, jangkauan, dan hubungannya dengan nilai median data kelompok tunggal.`,
    questionText: 'Tentukan kebenaran dari pernyataan-pernyataan teoretis berikut ini!',
    tfStatements: [
      { id: '16_a', statement: 'Jangkauan (range) diperoleh dengan membagi nilai tertinggi dengan nilai terendah.', correctAnswer: 'salah' },
      { id: '16_b', statement: 'Kuartil adalah nilai-nilai batas yang membagi sekumpulan data yang telah terurut menjadi empat bagian yang sama besar.', correctAnswer: 'benar' },
      { id: '16_c', statement: 'Kuartil kedua (Q2) memiliki nilai yang selalu sama dengan nilai Median suatu data.', correctAnswer: 'benar' }
    ]
  },
  {
    id: 17,
    type: 'benar-salah',
    difficulty: 'mudah',
    stimulus: `**Konteks: Simulasi Ektrakurikuler Teori Peluang Dadu**

Teori peluang sangat erat kaitannya dengan statistika karena data eksperimen acak sering kali disajikan dalam bentuk tabel distribusi frekuensi numerik. Pada ekstrakurikuler pemodelan matematika sore hari, Budi bersama kawan-kawannya melakukan eksperimen praktis pelemparan sebuah dadu bermata enam dalam beberapa kali percobaan mandiri.

Budi melempar sebuah dadu standar bersisi enam (angka mata dadu 1 s.d 6) sebanyak 6 kali berturut-turut secara netral di atas meja kayu datar, lalu mencatatkan angka-angka mata dadu acak yang berhasil menghadap ke atas pada setiap lemparan. 

Hasil angka mata dadu yang muncul tercatat secara kronologis dalam urutan penemuan sebagai berikut:
\`\`\`
3, 5, 2, 6, 1, 4
\`\`\`
Eksperimen ini memberikan gambaran sampel acak dengan penyebaran angka unik tanpa adanya perulangan sama sekali. Murid dituntut menghitung secara matematis besaran rata-rata mata dadu, jangkauan sebaran lemparan, serta menafsirkan keberadaan modus dari hasil eksperimen teoretik pelemparan dadu Budi.`,
    questionText: 'Tentukan kebenaran pernyataan terkait hasil percobaan pelemparan dadu Budi!',
    tfStatements: [
      { id: '17_a', statement: 'Rata-rata (mean) dari mata dadu yang muncul adalah 3,5.', correctAnswer: 'benar' },
      { id: '17_b', statement: 'Nilai jangkauan (selisih terbesar & terkecil) dari mata dadu tersebut adalah 5.', correctAnswer: 'benar' },
      { id: '17_c', statement: 'Terdapat modus tunggal yang bernilai 6 pada percobaan ini.', correctAnswer: 'salah' }
    ]
  },
  {
    id: 18,
    type: 'benar-salah',
    difficulty: 'sedang',
    stimulus: `**Konteks: Profil Statistik Fisik Tim Utama Bola Basket**

Perolehan data antropometri seperti tinggi badan pemain olahraga sangat krusial dalam menyusun formasi bertahan dan menyerang tim bola basket sekolah. Pada turnamen perlombaan antarsekolah tingkat provinsi, pelatih tim basket putra SMP Nusa Bangsa melakukan audit fisik terhadap lima pemain inti (starter) sebelum berkas pendaftaran atlet diserahkan ke komite penyelenggara.

Tinggi badan yang ideal dan sebaran nilai yang seimbang memberikan keunggulan taktis di arena lapangan pertandingan. Penguasaan posisi rebound ditentukan oleh tinggi badan pemain Center, sedangkan kelincahan dribbling diisi oleh Point Guard berketinggian optimal.

Berikut tabel data tinggi badan pemain inti basket (dalam satuan cm) setelah ditimbang:

| Pemain Basket | Guard | Point Guard | Forward | Power Forward | Center |
| :--- | :---: | :---: | :---: | :---: | :---: |
| Tinggi (cm) | 175 | 172 | 178 | 172 | 183 |

Pelatih ingin mengetahui karakter penyebaran tinggi badan anak asuhnya demi melaporkannya pada dinas pemuda dan olahraga. Siswa diajak untuk memverifikasi kebenaran kalkulasi statistik dasar meliputi nilai rerata (mean), modus tinggi pemain, serta penatapan nilai tengah (median) sesudah baris data diurutkan.`,
    questionText: 'Tentukan kebenaran pernyataan mengenai statistik tinggi badan pemain basket tersebut!',
    tfStatements: [
      { id: '18_a', statement: 'Nilai modus dari tinggi badan pemain basket adalah 172 cm.', correctAnswer: 'benar' },
      { id: '18_b', statement: 'Median tinggi badan setelah data diurutkan adalah 178 cm.', correctAnswer: 'salah' },
      { id: '18_c', statement: 'Nilai mean (rata-rata) tinggi badan adalah 176 cm.', correctAnswer: 'benar' }
    ]
  },
  {
    id: 19,
    type: 'benar-salah',
    difficulty: 'sedang',
    stimulus: `**Konteks: Evaluasi Skor Latihan Ekstrakurikuler Memanah**

Ketepatan membidik sasaran dalam olahraga memanah menuntut ketenangan mental, kestabilan fisik, serta konsistensi latihan yang tiada henti. Dina, seorang atlet memanah andalan kelas 8 SMP Merdeka, mengikuti program seleksi ekstrakurikuler prestasi guna menghadapi kejuaraan pekan olahraga pelajar wilayah semester depan.

Dina melakukan latihan membidik papan sasaran lingkaran jarak 15 meter sebanyak 8 kali sesi latihan berulang secara disiplin. Pada tiap akhir sesi latihan, pelatih mencatatkan skor bidikan Dina (skala poin numerik antara 1 hingga 10 poin). Data skor ini kemudian disusun untuk menghitung tingkat konsistensi stabilitas bidikan target busur Dina.

Berikut baris angka hasil perolehan skor bidikan memanah Dina:
\`\`\`
8, 7, 9, 6, 8, 10, 7, 8
\`\`\`
Runtunan data ini akan dianalisis secara mendalam menggunakan instrumen statistik jangkauan antarkuartil. Analisis kuartil bawah (Q1), kuartil atas (Q3), serta besaran rentang Simpangan Kuartil (Qd) sangat berguna bagi pelatih untuk mengukur sejauh mana skor Dina menyimpang dari target presisi di pusat jangkauan tengah.`,
    questionText: 'Tentukan kebenaran analisis nilai kuartil dari skor latihan memanah tersebut!',
    tfStatements: [
      { id: '19_a', statement: 'Kuartil Pertama (Q1) dari skor latihan tersebut adalah 7.', correctAnswer: 'benar' },
      { id: '19_b', statement: 'Kuartil Ketiga (Q3) dari skor latihan tersebut adalah 9.', correctAnswer: 'salah' },
      { id: '19_c', statement: 'Simpangan kuartil (Qd) dari skor latihan memanah tersebut adalah 0,75.', correctAnswer: 'benar' }
    ]
  },
  {
    id: 20,
    type: 'benar-salah',
    difficulty: 'sulit',
    stimulus: `**Konteks: Transformasi Data dan Manipulasi Skoring Kelas**

Sebuah rahasia menarik dari teori ilmu statistika adalah perilaku parameter data (mean, median, jangkauan) ketika sekumpulan data awal mengalami transformasi matematika beraturan (operasi perkalian atau penjumlahan serentak). Guru matematika sering memanfaatkan karakteristik ini untuk melakukan penyesuaian nilai (skoring atau modifikasi kurva nilai) kelas hasil ujian harian siswa.

Dalam sebuah kelas simulasi evaluasi awal matematika yang berkapasitas 20 orang siswa Kelas 8C, rata-rata (mean) perolehan ujian siswa adalah sebesar 75. Pak Guru Suwarto berencana memberikan penghargaan apresiasi prestasi belajar dengan menaikkan seluruh nilai siswa secara seragam. Beliau menggunakan formula matematika linier transformatif: 

\`\`\`
Nilai_Baru = (Nilai_Awal × 1,1) + 2
\`\`\`

Setiap nilai murid murni mula-mula akan dikalikan dengan faktor pengali 1,1 (meningkatkan 10%), lalu ditambah dengan konstanta bonus 2 poin. Langkah ini dilakukan untuk mendongkrak motivasi akademik mereka. Siswa dituntut menganalisis secara kritis bagaimanakah perubahan parameter rata-rata (mean) baru kelas, sebaran median, serta nilai jangkauan (range) akhir kelas paska rekayasa skoring kurva nilai tersebut.`,
    questionText: 'Evaluasi kebenaran perubahan parameter statistik akibat transformasi data tersebut!',
    tfStatements: [
      { id: '20_a', statement: 'Rata-rata (mean) baru kelas tersebut menjadi 84,5.', correctAnswer: 'benar' },
      { id: '20_b', statement: 'Jika jangkauan awal data adalah 30, nilai jangkauan baru setelah transformasi juga ikut bertambah 2 menjadi 32.', correctAnswer: 'salah' },
      { id: '20_c', statement: 'Nilai median baru juga akan mengikuti rumus transformasi matematika yang sama.', correctAnswer: 'benar' }
    ]
  },

  // ==================== 5 MENJODOHKAN (MATCHING 4 MATCHES EACH) ====================
  {
    id: 21,
    type: 'menjodohkan',
    difficulty: 'mudah',
    stimulus: `**Konteks: Terminologi dan Kamus Besar Statistika**

Menguasai dasar-dasar glosarium bahasa ilmiah dalam dunia matematika sangat krusial agar siswa mampu menjalin komunikasi ilmiah yang padu dengan sesama akademisi. Statistika deskriptif memiliki berbagai macam parameter fungsional yang digunakan untuk mencirikan perilaku, pemusatan, serta penyebaran suatu populasi angka secara objektif.

Tanpa memahami peran fungsional murni masing-masing parameter, siswa akan kesulitan menentukan kapankah waktu yang cocok mengaplikasikan teori-teori ini pada persoalan industri di dunia kerja kelak. Beberapa istilah dasar yang paling mendasar adalah Rata-rata (Mean), Nilai Tengah (Median), Modus, dan Jangkauan (Range).

Pak Suwarto menuntut keseriusan belajar murid kelas 8 untuk mengingat kembali peran dan definisi konseptual mendalam dari keempat indikator utama statistik tersebut. Murid dipandu menjodohkan nama parameter di kolom sebelah kiri dengan kalimat penjelasan arti fungsinya di kolom sebelah kanan secara tepat.`,
    questionText: 'Jodohkan istilah statistik berikut dengan definisi penjelasan fungsinya yang sesuai!',
    matchingPairs: [
      { id: '21_1', premise: 'Rata-rata (Mean)', correctMatch: 'Jumlah seluruh nilai data dibagi dengan jumlah sampel data' },
      { id: '21_2', premise: 'Nilai Tengah (Median)', correctMatch: 'Nilai yang membagi data terurut menjadi dua bagian sama banyak' },
      { id: '21_3', premise: 'Modus', correctMatch: 'Nilai data yang memiliki frekuensi kemunculan paling tinggi' },
      { id: '21_4', premise: 'Jangkauan (Range)', correctMatch: 'Selisih antara nilai terbesar dengan nilai terkecil pada data' }
    ],
    matchingOptions: [
      'Jumlah seluruh nilai data dibagi dengan jumlah sampel data',
      'Nilai yang membagi data terurut menjadi dua bagian sama banyak',
      'Nilai data yang memiliki frekuensi kemunculan paling tinggi',
      'Selisih antara nilai terbesar dengan nilai terkecil pada data',
      'Nilai kuartil atas dikurangi kuartil bawah'
    ]
  },
  {
    id: 22,
    type: 'menjodohkan',
    difficulty: 'sedang',
    stimulus: `**Konteks: Analisis Ukuran Sepatu Kelompok Belajar**

Keseragaman ukuran seragam atau alas kaki di sebuah komunitas kecil dapat diprediksi sebarannya melalui penerapan matematika deskriptif. Guna merencanakan pengadaan bantuan sepatu bot keselamatan untuk bakti sosial pramuka di kawasan pegunungan, ketua kelas mengumpulkan contoh ukuran sepatu dari 6 murid perwakilan kelompok studi Matematika tangguh.

Ukuran sepatu merupakan jenis data berkelompok bertingkat diskrit yang nilainya berkisar antara ukuran 36 hingga 44. Analisis dari keenam sampel ukuran ini akan dijadikan instrumen pembanding bagi panitia bakti sosial dalam membeli paket bantuan ukuran sepatu siswa.

Berikut rincian kumpulan ukuran sepatu dari keenam siswa kelas 8 responden:
\`\`\`
36, 38, 38, 40, 42, 44
\`\`\`
Untuk melatih ketangkasan numeris operasional siswa, Pak Suwarto memberikan tantangan menjodohkan. Siswa ditantang menghubungkan jenis pencarian rumus statistik di kolom kiri (seperti Mean ukuran sepatu, letak Median, rentang Jangkauan, serta Modus ukuran sepatu) dengan hasil akhir kalkulasi angka yang tepat di sebelah kanan.`,
    questionText: 'Jodohkan operasi statistika kiri dengan hasil perhitungannya yang sesuai di sisi kanan!',
    matchingPairs: [
      { id: '22_1', premise: 'Rata-rata (Mean) ukuran sepatu', correctMatch: '39,67' },
      { id: '22_2', premise: 'Median dari data', correctMatch: '39' },
      { id: '22_3', premise: 'Jangkauan (Range) sepatu', correctMatch: '8' },
      { id: '22_4', premise: 'Modus data sepatu', correctMatch: '38' }
    ],
    matchingOptions: [
      '39,67',
      '39',
      '8',
      '38',
      '6',
      '40'
    ]
  },
  {
    id: 23,
    type: 'menjodohkan',
    difficulty: 'sedang',
    stimulus: `**Konteks: Evaluasi Skor Ujicoba Layanan Pelanggan Toko**

Peningkatan kualitas pelayanan (customer service) dan kepatuhan karyawan di industri retail modern memerlukan pemantauan berkala lewat instrumen ujian kompetensi tertulis. Sebuah jaringan toko pakaian "Gaya Gaul" mengadakan kuis pengawasan kualitas layanan digital mingguan berdurasi singkat yang diikuti oleh para personil staf lantai depan (frontliner).

Hasil kuis murni diserahkan kepada manajer toko sebagai basis evaluasi pemberian insentif bonus kepatuhan. Nilai kuis didata murni dalam sebaran teratur dengan jarak interval atau selisih kenaikan nilai yang simetris dari setiap anggota staf.

Berikut rincian perolehan sebaran skor kepatuhan dari 7 karyawan toko contoh:
\`\`\`
60, 65, 70, 75, 80, 85, 90
\`\`\`
Data yang berjarak sangat simetris memudahkan penentuan sekat kuartil. Manajer menghendaki siswa kelas 8 ikut membantu membagi performa karyawan menjadi beberapa kelompok kuadran dengan menjodohkan letak kuartil bawah (Q1), kuartil tengah (Q2/Median), kuartil atas (Q3), serta nilai Simpangan Kuartil (Qd) dengan nilai nominal angka matematisnya yang akurat di sebelah kanan.`,
    questionText: 'Sebutkan nilai-nilai kuartil dan simpangan kuartil berikut berdasarkan data di atas!',
    matchingPairs: [
      { id: '23_1', premise: 'Kuartil Bawah (Q1)', correctMatch: '65' },
      { id: '23_2', premise: 'Kuartil Tengah (Q2/Median)', correctMatch: '75' },
      { id: '23_3', premise: 'Kuartil Atas (Q3)', correctMatch: '85' },
      { id: '23_4', premise: 'Simpangan Kuartil (Qd)', correctMatch: '10' }
    ],
    matchingOptions: [
      '65',
      '75',
      '85',
      '10',
      '20',
      '30'
    ]
  },
  {
    id: 24,
    type: 'menjodohkan',
    difficulty: 'sedang',
    stimulus: `**Konteks: Laporan Hasil Produksi Susu Sapi Perah Harian**

Peternakan sapi perah modern "Susu Segar Boyolali" memanfaatkan sistem pencatatan berbasis komputer (digital logging) untuk mengawasi kondisi kesehatan kelompok hewan ternak perah mereka. Penurunan atau lonjakan volume air susu harian merupakan sinyal primer biologis yang menunjukkan apakah ransum pakan sapi terpenuhi gizinya dengan seimbang atau tidak.

Kepala pengawas peternakan melakukan pelacakan volume produksi susu harian (dihitung presisi dalam satuan liter) dari seekor sapi blasteran Friesian Holstein berprestasi tinggi selama 8 hari sekolah sekolah pendataan berturut-turut.

Adapun rincian perolehan volume susu harian sapi tersebut dipaparkan dalam runtunan data berikut:
\`\`\`
10, 12, 12, 15, 14, 16, 12, 17
\`\`\`
Manaseer peternakan ingin menghasilkan kesimpulan ringkasan data yang cepat dihadapan dewan direksi pakan ternak. Siswa diajak untuk menjodohkan variabel deskriptif deskripsi statistik di kolom kiri (seperti banyak hari n pengerjaan, volume rekor susu terbanyak, letak nilai median produksi susu, serta modus liter yang paling kerap diraih sapi) dengan angka pendampingnya yang persis di kolom sebelah kanan.`,
    questionText: 'Jodohkan deskripsi statistik produksi susu kiri dengan besaran nilai angka di sebelah kanan!',
    matchingPairs: [
      { id: '24_1', premise: 'Banyak Hari Pendataan (n)', correctMatch: '8 hari' },
      { id: '24_2', premise: 'Produksi Susu Terbanyak', correctMatch: '17 liter' },
      { id: '24_3', premise: 'Median Hasil Produksi', correctMatch: '13 liter' },
      { id: '24_4', premise: 'Modus Hasil Produksi', correctMatch: '12 liter' }
    ],
    matchingOptions: [
      '8 hari',
      '17 liter',
      '13 liter',
      '12 liter',
      '14 liter',
      '10 liter'
    ]
  },
  {
    id: 25,
    type: 'menjodohkan',
    difficulty: 'sedang',
    stimulus: `**Konteks: Laporan Buku Kas Keuangan Celengan Tabungan Berbagi**

Menanamkan nilai kegemaran menabung kepada generasi muda sejak usia dini merintis kemandirian literasi finansial yang baik dalam keluarga maslahat kelompok kreatif. Di kelas 8 SMP Tunas Karya, siswa dikoordinir untuk menyisihkan sebagian sisa uang saku jajan mingguan dalam kotak kotak celengan koin sosial bertajuk "Tabungan Berbagi Ibu".

Pada akhir bulan pertama, bendahara kelas merekap saldo uang tabungan dari empat orang anak perintis awal celengan tersebut. Tabungan yang disetor murni tercatat memiliki nilai yang variatif sebagai berikut: Rp2.000, Rp3.000, Rp5.000, dan Rp10.000. Data tabungan ini sangat berguna sebagai instrumen pembanding keuangan kelas.

Beberapa hari kemudian, tiga orang siswa lain memutuskan ikut menyusul berpartisipasi menyetor dana saldo masing-masing sebesar Rp5.000 untuk memperkokoh isi celengan. Masuknya ketiga donatur baru ini mendinamisasi distribusi rata-rata dan nilai tengah tabungan kelas.

Bendahara menuntut siswa untuk menguji perubahan parameter keuangan tabungan ini dengan menjodohkan pertanyaan analisis statistika di sebelah kiri (meliputi besaran modus saldo tabungan terbaru, rentang jangkauan mula-mula tabungan, nilai median baru pasca tiga siswa menyusul, serta rata-rata setoran tabungan pertama kali) dengan nilai rupiah padanannya di kolom kanan secara presisi.`,
    questionText: 'Pasangkan pertanyaan analisis statistik kiri dengan jawaban nominal rupiah di sebelah kanan!',
    matchingPairs: [
      { id: '25_1', premise: 'Modus uang tabungan terbaru', correctMatch: 'Rp5.000' },
      { id: '25_2', premise: 'Jangkauan (range) awal tabungan', correctMatch: 'Rp8.000' },
      { id: '25_3', premise: 'Median data setelah 3 siswa menyusul', correctMatch: 'Rp5.000' },
      { id: '25_4', premise: 'Rata-rata tabungan mula-mula', correctMatch: 'Rp5.000' }
    ],
    matchingOptions: [
      'Rp5.000',
      'Rp8.000',
      'Rp3.000',
      'Rp10.000',
      'Rp2.000',
      'Rp4.500'
    ]
  }
];
