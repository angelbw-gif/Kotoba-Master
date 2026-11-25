import type { SouMatomeWeek } from '../types/jlpt';

export const SOU_MATOME_W3_4: SouMatomeWeek[] = [
  {
    weekNumber: 3,
    titleJp: '第3週 もっとがんばってほしい！',
    themeId: 'Pertentangan, Kewajiban & Harapan, Waktu Berurutan, & Perasaan Orang Lain',
    days: [
      {
        id: 'w3-d1',
        weekNumber: 3,
        dayNumber: 1,
        titleJp: 'いくら安くても',
        titleId: 'Meskipun & Tanpa Melakukan (ても・いくら〜ても・ずに)',
        grammarPoints: [
          {
            id: 'w3-d1-g1',
            titleJp: 'Vても / Aくても / naでも / Nでも',
            connectionFormula: 'Vて+も ｜ A(tanpa い)くても ｜ na/N + でも',
            shortMeaningId: 'Meskipun... / Walaupun...',
            easyExplanationId:
              'Menunjukkan bahwa suatu kondisi/syarat tidak mengubah hasil akhir ("meskipun hujan, tetap berangkat", "meskipun hari Minggu, tetap bekerja").',
            examples: [
              {
                jp: '薬を飲んでも、熱がなかなか下がらない。',
                id: 'Meskipun sudah minum obat, demamnya tidak kunjung turun.',
              },
              {
                jp: '日曜日でも、会社へ行かなければならない。',
                id: 'Meskipun hari Minggu, saya harus pergi ke kantor.',
              },
            ],
          },
          {
            id: 'w3-d1-g2',
            titleJp: 'どんなに / いくら + ～ても',
            connectionFormula: 'いくら / どんなに + Vても / Aくても / naでも',
            shortMeaningId: 'Betapapun / Sebanyak apa pun / Semahal apa pun tetap...',
            easyExplanationId:
              'Memperkuat nuansa "～ても" dengan penegas di awal kalimat. Umumnya いくら dipakai untuk jumlah/harga/tingkat, sedangkan どんなに untuk perasaan/usaha/derajat.',
            examples: [
              {
                jp: 'いくら安くても、使わないものは買わないほうがいい。',
                id: 'Semurah apa pun, barang yang tidak dipakai sebaiknya jangan dibeli.',
              },
              {
                jp: 'どんなに忙しくても、家族と話す時間は作るようにしている。',
                id: 'Sesibuk apa pun, saya berusaha menyempatkan waktu mengobrol dengan keluarga.',
              },
            ],
          },
          {
            id: 'w3-d1-g3',
            titleJp: 'Vずに / せずに（＝～ないで）',
            connectionFormula: 'Vない(coret ない) + ずに ｜ 例外: する → せずに',
            registerTag: 'Formal',
            shortMeaningId: 'Tanpa melakukan... (melakukan hal lain sebagai gantinya)',
            easyExplanationId:
              'Bentuk yang lebih rapi/tulisan dari ～ないで. Menjelaskan bahwa aksi kedua dilakukan tanpa melakukan aksi pertama dulu ("berangkat ke sekolah tanpa sarapan").',
            tipOrPitfallId:
              'Hati-hati perubahan する! Bukan しずに ❌, melainkan せずに ⭕! Untuk 来る menjadi こずに.',
            examples: [
              {
                jp: '今朝は時間がなくて、朝ごはんを食べずに家を出た。',
                id: 'Pagi ini tidak ada waktu, jadi saya keluar rumah tanpa makan pagi.',
              },
              {
                jp: 'メモをせずに聞いたから、大切なことを忘れてしまった。',
                id: 'Karena mendengarkan tanpa mencatat, saya jadi lupa hal pentingnya.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w3-d1-r1',
            numberLabel: 'I-1',
            promptBefore: '部屋が',
            promptAfter: '、駅に近ければそれでいい。',
            options: [
              { id: 'a', label: '狭くても' },
              { id: 'b', label: '狭いでも' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Kata sifat-i 狭い berubah menjadi 狭くても.',
          },
          {
            id: 'w3-d1-r2',
            numberLabel: 'I-2',
            promptBefore: '',
            promptAfter: '高くても、このカメラはどうしても欲しい。',
            options: [
              { id: 'a', label: 'いくら' },
              { id: 'b', label: 'なんと' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Untuk harga/tingkatan "semahal apa pun", pasangannya adalah いくら ～ても.',
          },
          {
            id: 'w3-d1-r3',
            numberLabel: 'I-3',
            promptBefore: '辞書を',
            promptAfter: '日本語の新聞が読めるようになりたい。',
            options: [
              { id: 'a', label: '使わずに' },
              { id: 'b', label: '使うずに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Rumusnya dari bentuk ない (使わない → 使わずに).',
          },
          {
            id: 'w3-d1-r4',
            numberLabel: 'I-4',
            promptBefore: '誰にも相談',
            promptAfter: '一人で決めてしまった。',
            options: [
              { id: 'a', label: 'せずに' },
              { id: 'b', label: 'しずに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Bentuk pengecualian 相談する → 相談せずに.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w3-d1-o1',
            numberLabel: 'II-1',
            prefix: '',
            suffix: 'あきらめないでほしい。',
            tokens: [
              { id: 1, label: '大変でも' },
              { id: 2, label: 'どんなに' },
              { id: 3, label: '最後まで' },
              { id: 4, label: '練習が' },
            ],
            correctOrder: [2, 4, 1, 3],
            explanationId: 'Urutan: どんなに 練習が 大変でも 最後まで (Sebesar apa pun beratnya latihan, jangan menyerah sampai akhir).',
          },
          {
            id: 'w3-d1-o2',
            numberLabel: 'II-2',
            prefix: '兄はいつも電気を',
            suffix: '寝てしまう。',
            tokens: [
              { id: 1, label: 'まま' },
              { id: 2, label: '消さずに' },
              { id: 3, label: 'つけた' },
              { id: 4, label: '部屋を' },
            ],
            correctOrder: [2, 4, 3, 1],
            explanationId: 'Urutan: 消さずに 部屋を つけた まま (tanpa mematikan lampu, membiarkan kamar tetap menyala lalu ketiduran).',
          },
        ].map((o) =>
          o.id === 'w3-d1-o2'
            ? {
                ...o,
                prefix: '兄はいつも電気を',
                suffix: '。',
                tokens: [
                  { id: 1, label: '寝てしまう' },
                  { id: 2, label: '消さずに' },
                  { id: 3, label: 'つけたまま' },
                  { id: 4, label: '、' },
                ],
                correctOrder: [2, 4, 3, 1] as [number, number, number, number],
                explanationId: 'Urutan: 消さずに 、 つけたまま 寝てしまう (tanpa mematikan lampu, ketiduran dalam keadaan lampu menyala).',
              }
            : o
        ),
      },
      {
        id: 'w3-d2',
        weekNumber: 3,
        dayNumber: 2,
        titleJp: 'それにしては',
        titleId: 'Peran, Ketidaksesuaian Harapan, & Pengandaian (として・にしては・としても・としたら)',
        grammarPoints: [
          {
            id: 'w3-d2-g1',
            titleJp: 'N + として（は / も）',
            connectionFormula: 'N + として(は/も) ｜ + の + N2',
            shortMeaningId: 'Sebagai... (peran, jabatan, status, sudut pandang)',
            easyExplanationId:
              'Menunjukkan kapasitas atau posisi seseorang/sesuatu ("sebagai guru", "sebagai tempat wisata terkenal", "untuk ukuran hadiah").',
            examples: [
              {
                jp: '彼は日本人の代表として国際会議に出席した。',
                id: 'Dia menghadiri konferensi internasional sebagai perwakilan orang Jepang.',
              },
              {
                jp: '留学先として、日本はとても人気がある。',
                id: 'Sebagai tujuan studi ke luar negeri, Jepang sangat populer.',
              },
            ],
          },
          {
            id: 'w3-d2-g2',
            titleJp: '～にしては',
            connectionFormula: 'Kalimat Biasa / N(tanpa だ) + にしては',
            shortMeaningId: 'Untuk ukuran..., ternyata agak berbeda / tidak sesuai dugaan',
            easyExplanationId:
              'Membandingkan fakta nyata dengan standar/dugaan umum ("untuk ukuran pemula, mainnya jago banget"; "untuk ukuran restoran mahal, rasanya biasa saja").',
            tipOrPitfallId:
              'Jangan tertukar dengan わりには! Keduanya mirip, tetapi にしては lebih sering menyorot status/identitas ("untuk ukuran umur 70 tahun...") dan わりに menyorot perbandingan hasil vs harga/usaha.',
            examples: [
              {
                jp: '田中さんは初めて料理をしたにしては、上手に作れたね。',
                id: 'Untuk ukuran baru pertama kali masak, Tanaka berhasil membuatnya dengan enak ya.',
              },
            ],
          },
          {
            id: 'w3-d2-g3',
            titleJp: '～にしても / それにしても',
            connectionFormula: 'Kalimat Biasa / N + にしても ｜ それにしても + (kalimat)',
            shortMeaningId: 'Sekalipun mengakui hal itu... / Meskipun begitu, tetap saja...',
            easyExplanationId:
              '1) 「Aにしても」= kalaupun A benar (atau baik A maupun B), tetap ada hal yang tidak beres atau penting. 2) 「それにしても」di awal kalimat = "Meski begitu, tetap saja..." (kaget/heran melihat kenyataan terlalu berlebihan).',
            examples: [
              {
                jp: '忙しいにしても、連絡くらいできるはずだ。',
                id: 'Sekalipun sibuk, seharusnya mengabari sebentar saja bisa dong.',
              },
              {
                jp: '今日は涼しくなると聞いたが、それにしても寒すぎる。',
                id: 'Kudengar hari ini akan sejuk, tapi meskipun begitu ini terlalu dingin.',
              },
            ],
          },
          {
            id: 'w3-d2-g4',
            titleJp: '～としたら / とすれば',
            connectionFormula: 'Kalimat Biasa + としたら / とすれば',
            shortMeaningId: 'Seandainya / Jika diasumsikan bahwa...',
            easyExplanationId:
              'Membuat asumsi sementara tentang sesuatu yang belum tentu terjadi, lalu memikirkan akibat/rencananya ("jika seandainya besok hujan...", "kalau benar dia berhenti kerja, lalu bagaimana...").',
            examples: [
              {
                jp: 'もし1億円当たったとしたら、何に使いますか。',
                id: 'Seandainya menang 100 juta yen, mau dipakai untuk apa?',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w3-d2-r1',
            numberLabel: 'I-1',
            promptBefore: '私はこの学校の卒業生',
            promptAfter: '、今日の式に出席しました。',
            options: [
              { id: 'a', label: 'として' },
              { id: 'b', label: 'にしては' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Hadir dalam kapasitas/status "sebagai lulusan sekolah ini" → として.',
          },
          {
            id: 'w3-d2-r2',
            numberLabel: 'I-2',
            promptBefore: '3か月しか勉強していない',
            promptAfter: '、日本語がとても上手ですね。',
            options: [
              { id: 'a', label: 'にしては' },
              { id: 'b', label: 'としても' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Hasilnya di luar dugaan untuk ukuran baru belajar 3 bulan → にしては.',
          },
          {
            id: 'w3-d2-r3',
            numberLabel: 'I-3',
            promptBefore: '冗談だ',
            promptAfter: '、そんなひどいことを言ってはいけない。',
            options: [
              { id: 'a', label: 'にしても' },
              { id: 'b', label: 'としたら' },
            ],
            correctOptionIds: ['a'],
            explanationId: '"Sekalipun itu bercanda, tetap tidak boleh berkata sekejam itu" → にしても.',
          },
          {
            id: 'w3-d2-r4',
            numberLabel: 'I-4',
            promptBefore: '今の仕事が合わない',
            promptAfter: '、転職を考えたほうがいいかもしれない。',
            options: [
              { id: 'a', label: 'としたら' },
              { id: 'b', label: 'にしては' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Mengandaikan kondisi: "Jika diasumsikan pekerjaan sekarang tidak cocok..." → としたら.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w3-d2-o1',
            numberLabel: 'II-1',
            prefix: '冬だといっても、',
            suffix: '寒すぎる。',
            tokens: [
              { id: 1, label: '今日は' },
              { id: 2, label: 'にしても' },
              { id: 3, label: 'それ' },
              { id: 4, label: 'ちょっと' },
            ],
            correctOrder: [3, 2, 1, 4],
            explanationId: 'Urutan: それ にしても 今日は ちょっと (Meski begitu, hari ini agak terlalu dingin).',
          },
          {
            id: 'w3-d2-o2',
            numberLabel: 'II-2',
            prefix: '彼は日本に住んで10年になるのに、',
            suffix: '漢字が読めない。',
            tokens: [
              { id: 1, label: 'にしては' },
              { id: 2, label: '長い' },
              { id: 3, label: 'あまり' },
              { id: 4, label: '日本生活が' },
            ],
            correctOrder: [4, 2, 1, 3],
            explanationId: 'Urutan: 日本生活が 長い にしては あまり (Untuk ukuran hidup lama di Jepang, tidak terlalu bisa baca kanji).',
          },
        ],
      },
      {
        id: 'w3-d3',
        weekNumber: 3,
        dayNumber: 3,
        titleJp: '勉強するつもりでしたが…',
        titleId: 'Rencana Batal, Dugaan Pasti, Kewajiban Moral, & Nostalgia (つもりだった・はず・べき・ものだ)',
        grammarPoints: [
          {
            id: 'w3-d3-g1',
            titleJp: 'Vる / Vない + つもりだった',
            connectionFormula: 'Vkamus / Vない + つもりだった (atau つもりだったが…)',
            shortMeaningId: 'Tadinya berniat akan... (tapi kenyataannya tidak jadi/berbeda)',
            easyExplanationId:
              'Mengungkapkan rencana awal di masa lalu yang gagal terwujud atau berbeda dari hasilnya ("tadinya niat mau belajar 3 jam, tapi malah ketiduran").',
            examples: [
              {
                jp: '休みの日は一日中勉強するつもりだったが、つい寝てしまった。',
                id: 'Hari libur tadinya berniat belajar seharian, tapi malah ketiduran.',
              },
            ],
          },
          {
            id: 'w3-d3-g2',
            titleJp: '～はずだ / はずがない / はずだった',
            connectionFormula: 'V普通・Aい + はずだ ｜ naな + はずだ ｜ Nの + はずだ',
            shortMeaningId: 'Seharusnya pasti... / Mustahil... / Seharusnya tadi...',
            easyExplanationId:
              '1) はずだ: yakin berdasarkan alasan/jadwal logis ("sudah pesan kemarin, seharusnya hari ini sampai"). 2) はずがない: yakin mustahil terjadi. 3) はずだった: seharusnya terjadi tapi ternyata gagal ("kereta seharusnya datang jam 8, tapi telat").',
            examples: [
              {
                jp: '昨日送ったから、明日には届くはずです。',
                id: 'Karena dikirim kemarin, seharusnya besok sampai.',
              },
              {
                jp: '真面目な彼がそんなうそをつくはずがない。',
                id: 'Orang serius seperti dia mustahil berbohong seperti itu.',
              },
            ],
          },
          {
            id: 'w3-d3-g3',
            titleJp: 'Vる + べきだ / べきではない',
            connectionFormula: 'Vkamus + べきだ ｜ 例外: する → するべき / すべき',
            shortMeaningId: 'Seharusnya / Wajib secara moral atau akal sehat untuk...',
            easyExplanationId:
              'Menunjukkan kewajiban moral, aturan sosial, atau saran kuat yang masuk akal ("janji harus ditepati", "sampah tidak boleh dibuang sembarangan").',
            tipOrPitfallId:
              'Jangan dipakai langsung untuk perintah ke atasan secara kasar ("部長は帰るべきです" ❌)! Lebih tepat untuk prinsip umum atau saran ke orang dekat.',
            examples: [
              {
                jp: '一度した約束は必ず守るべきだ。',
                id: 'Janji yang sudah dibuat seharusnya selalu ditepati.',
              },
              {
                jp: '他人の悪口を言うべきではない。',
                id: 'Tidak sepantasnya membicarakan keburukan orang lain.',
              },
            ],
          },
          {
            id: 'w3-d3-g4',
            titleJp: 'Vた + ものだ（回想）/ ～ものだ（一般・感嘆）',
            connectionFormula: 'Vた + ものだ (kenangan masa lalu) ｜ Kalimat Biasa + ものだ',
            shortMeaningId: 'Dulu sering / biasa melakukan... (nostalgia) & Kebenaran umum',
            easyExplanationId:
              '1) Vた + ものだ + sering pakai よく: mengenang masa lalu dengan rasa rindu ("waktu kecil dulu aku sering main di sungai"). 2) Vkamus/A + ものだ: nasihat umum atau rasa kagum ("waktu cepat sekali berlalu ya").',
            examples: [
              {
                jp: '子どものころ、よくこの川で泳いだものだ。',
                id: 'Waktu kecil dulu, saya sering berenang di sungai ini.',
              },
              {
                jp: '月日がたつのは本当に早いものですね。',
                id: 'Berlalunya waktu itu benar-benar cepat ya.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w3-d3-r1',
            numberLabel: 'I-1',
            promptBefore: '3時までに駅に着く',
            promptAfter: 'が、道が混んでいて遅れてしまった。',
            options: [
              { id: 'a', label: 'つもりだった' },
              { id: 'b', label: 'べきだった' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Rencana awal sendiri yang terhambat macet → つもりだった (atau はずだった jika berdasarkan jadwal). Di sini opsi rencana: つもりだった.',
          },
          {
            id: 'w3-d3-r2',
            numberLabel: 'I-2',
            promptBefore: 'さっき食べ終わったばかりだから、まだおなかがすく',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'はずがない' },
              { id: 'b', label: 'はずだ' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Baru saja selesai makan, jadi "mustahil sudah lapar" → はずがない.',
          },
          {
            id: 'w3-d3-r3',
            numberLabel: 'I-3',
            promptBefore: '図書館で借りた本は、期限内に返す',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'べきだ' },
              { id: 'b', label: 'つもりだ' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Kewajiban/aturan umum yang semestinya dipatuhi → 返すべきた (返すべきだ).',
          },
          {
            id: 'w3-d3-r4',
            numberLabel: 'I-4',
            promptBefore: '学生時代は、よく友達と夜遅くまで語り合った',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'ものだ' },
              { id: 'b', label: 'べきだ' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Mengenang kebiasaan nostalgia di masa lalu (よく ～た) → ものだ.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w3-d3-o1',
            numberLabel: 'II-1',
            prefix: '鍵はテーブルの上に置いたから、',
            suffix: '。',
            tokens: [
              { id: 1, label: 'はず' },
              { id: 2, label: 'ある' },
              { id: 3, label: 'そこに' },
              { id: 4, label: 'なんだけど' },
            ],
            correctOrder: [3, 2, 1, 4],
            explanationId: 'Urutan: そこに ある はず なんだけど (Seharusnya ada di sana sih...).',
          },
          {
            id: 'w3-d3-o2',
            numberLabel: 'II-2',
            prefix: '失敗したときは、まず',
            suffix: '。',
            tokens: [
              { id: 1, label: '素直に' },
              { id: 2, label: '謝る' },
              { id: 3, label: 'べき' },
              { id: 4, label: 'だ' },
            ],
            correctOrder: [1, 2, 3, 4],
            explanationId: 'Urutan: 素直に 謝る べき だ (seharusnya meminta maaf dengan jujur).',
          },
        ],
      },
      {
        id: 'w3-d4',
        weekNumber: 3,
        dayNumber: 4,
        titleJp: '会うたびに',
        titleId: 'Sekalian, Setiap Kali, Begitu Terjadi, & Sedang Berlangsung (ついでに・たびに・とたん・最中)',
        grammarPoints: [
          {
            id: 'w3-d4-g1',
            titleJp: 'Nの / Vる / Vた + ついでに',
            connectionFormula: 'N + の + ついでに ｜ Vる / Vた + ついでに',
            shortMeaningId: 'Sekalian / Mumpung sedang melakukan A, melakukan B juga',
            easyExplanationId:
              'Menunjukkan memanfaatkan kesempatan aksi utama A (yang memang sudah direncanakan) untuk sekalian melakukan B secara efisien ("sekalian belanja, ambil uang di ATM").',
            tipOrPitfallId:
              'A harus sesuatu yang memang bertujuan dilakukan, bukan hal tak terduga! Urutan tidak boleh terbalik: tujuan utama diletakkan di depan ついでに.',
            examples: [
              {
                jp: '散歩のついでに、郵便局で手紙を出してきた。',
                id: 'Sekalian jalan-jalan, saya mengirim surat di kantor pos.',
              },
            ],
          },
          {
            id: 'w3-d4-g2',
            titleJp: 'Nの / Vる + たびに',
            connectionFormula: 'N + の + たびに ｜ Vkamus + たびに',
            shortMeaningId: 'Setiap kali melakukan/terjadi A, selalu terjadi B',
            easyExplanationId:
              'Menyatakan keterulangan kejadian atau perasaan setiap kali menghadapi situasi yang sama ("setiap kali melihat foto ini, aku teringat masa sekolah").',
            examples: [
              {
                jp: 'この曲を聞くたびに、日本での生活を思い出す。',
                id: 'Setiap kali mendengar lagu ini, saya teringat kehidupan di Jepang.',
              },
            ],
          },
          {
            id: 'w3-d4-g3',
            titleJp: 'Vた + とたん（に）',
            connectionFormula: 'Vた + とたん（に）',
            shortMeaningId: 'Begitu selesai A, seketika langsung terjadi B (tak terduga)',
            easyExplanationId:
              'Menggambarkan kejadian mendadak tepat setelah satu momen ("begitu buka jendela, angin dingin langsung masuk"; "begitu minum obat, langsung mengantuk").',
            tipOrPitfallId:
              'Bagian B TIDAK BOLEH berupa niat, permintaan, atau perintah ("begitu sampai rumah, ayo belajar" ❌). B harus kejadian alamiah/tak terduga!',
            examples: [
              {
                jp: '電車を降りたとたんに、雨が降り出した。',
                id: 'Begitu turun dari kereta, tiba-tiba hujan mulai turun.',
              },
            ],
          },
          {
            id: 'w3-d4-g4',
            titleJp: 'Nの / Vている + 最中に / 最中だ',
            connectionFormula: 'N(acara/kegiatan) + の + 最中に ｜ Vている + 最中に',
            shortMeaningId: 'Tepat di tengah-tengah sedang melakukan A... (terjadi gangguan/hal lain)',
            easyExplanationId:
              'Menekankan momen puncak saat kegiatan sedang berlangsung lalu ada peristiwa lain menyela ("tepat saat rapat berlangsung, listrik padam"; "sedang asyik mandi, ada paket datang").',
            examples: [
              {
                jp: '大切な会議をしている最中に、携帯電話が鳴ってしまった。',
                id: 'Tepat di tengah rapat penting, ponsel saya berbunyi.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w3-d4-r1',
            numberLabel: 'I-1',
            promptBefore: '銀行へ行く',
            promptAfter: '、スーパーで牛乳を買ってきてくれない？',
            options: [
              { id: 'a', label: 'ついでに' },
              { id: 'b', label: 'たびに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Memanfaatkan kesempatan ke bank untuk sekalian beli susu → ついでに.',
          },
          {
            id: 'w3-d4-r2',
            numberLabel: 'I-2',
            promptBefore: '彼女に会う',
            promptAfter: '、いつも元気をもらいます。',
            options: [
              { id: 'a', label: 'たびに' },
              { id: 'b', label: 'とたんに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Setiap kali bertemu (Vkamus 会う + たびに) selalu mendapat semangat.',
          },
          {
            id: 'w3-d4-r3',
            numberLabel: 'I-3',
            promptBefore: '立ち上がった',
            promptAfter: '、めまいがして倒れそうになった。',
            options: [
              { id: 'a', label: 'とたんに' },
              { id: 'b', label: 'ついでに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Kejadian mendadak seketika setelah berdiri (Vた + とたんに).',
          },
          {
            id: 'w3-d4-r4',
            numberLabel: 'I-4',
            promptBefore: 'テストを',
            promptAfter: '、地震が起きてみんな机の下に隠れた。',
            options: [
              { id: 'a', label: '受けている最中に' },
              { id: 'b', label: '受けたたびに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Tepat ketika ujian sedang berlangsung → 受けている最中に.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w3-d4-o1',
            numberLabel: 'II-1',
            prefix: '玄関のドアを',
            suffix: '飛び出してきた。',
            tokens: [
              { id: 1, label: '開けた' },
              { id: 2, label: '犬が' },
              { id: 3, label: 'とたんに' },
              { id: 4, label: '外へ' },
            ],
            correctOrder: [1, 3, 2, 4],
            explanationId: 'Urutan: 開けた とたんに 犬が 外へ (Begitu pintu dibuka, anjing langsung melesat keluar).',
          },
          {
            id: 'w3-d4-o2',
            numberLabel: 'II-2',
            prefix: '彼は私の顔を',
            suffix: 'ばかり言う。',
            tokens: [
              { id: 1, label: 'たび' },
              { id: 2, label: '見る' },
              { id: 3, label: 'に' },
              { id: 4, label: '文句' },
            ],
            correctOrder: [2, 1, 3, 4],
            explanationId: 'Urutan: 見る たび に 文句 (Setiap kali melihat wajahku, kerjanya mengeluh melulu).',
          },
        ],
      },
      {
        id: 'w3-d5',
        weekNumber: 3,
        dayNumber: 5,
        titleJp: '一人っきり',
        titleId: 'Sesuai Panduan, Dibiarkan Terus, & Terakhir Kalinya (とおり・まま・っぱなし・きり)',
        grammarPoints: [
          {
            id: 'w3-d5-g1',
            titleJp: 'Vる / Vた / Nの + とおり（に） / N + どおり（に）',
            connectionFormula: 'Vる・Vた・Nの + とおり(に) ｜ N(tanpa の) + どおり(に)',
            shortMeaningId: 'Sesuai persis dengan...',
            easyExplanationId:
              'Mengikuti aturan, rencana, peta, atau ucapan persis tanpa diubah ("lakukan sesuai petunjuk", "berjalan sesuai rencana").',
            tipOrPitfallId:
              'Jika N langsung menempel tanpa の, bunyinya berubah menjadi どおり (計画どおり = sesuai rencana; 予定どおり = sesuai jadwal).',
            examples: [
              {
                jp: '説明書に書いてあるとおりに組み立てた。',
                id: 'Saya merakitnya persis seperti yang tertulis di buku panduan.',
              },
              {
                jp: '天気予報どおり、午後から雨が降り出した。',
                id: 'Sesuai ramalan cuaca, hujan mulai turun sejak siang.',
              },
            ],
          },
          {
            id: 'w3-d5-g2',
            titleJp: 'Vた / Vない / Nの + まま（に）',
            connectionFormula: 'Vた・Vない・Aい・naな・Nの + まま',
            shortMeaningId: 'Dalam kondisi tetap seperti itu (tidak diubah)',
            easyExplanationId:
              'Menjaga kondisi tetap sama ("tidur sambil tetap pakai kacamata", "makan sayur mentah apa adanya", "pintu tetap terbuka").',
            examples: [
              {
                jp: '靴をはいたまま部屋に入ってはいけません。',
                id: 'Tidak boleh masuk ke dalam kamar sambil tetap memakai sepatu.',
              },
            ],
          },
          {
            id: 'w3-d5-g3',
            titleJp: 'Vます + っぱなし',
            connectionFormula: 'Vます (hilangkan ます) + っぱなし（だ / で）',
            registerTag: 'Negatif',
            shortMeaningId: 'Dibiarkan terbengkalai dalam keadaan begitu saja (ceroboh/kesal)',
            easyExplanationId:
              'Mirip まま tetapi HANYA memakai Kata Kerja dan bernuansa negatif/mengkritik ("keran dibiarkan mengucur terus", "berdiri terus berjam-jam sampai kaki pegal").',
            examples: [
              {
                jp: 'テレビをつけっぱなしにして寝てしまった。',
                id: 'Saya ketiduran sambil membiarkan TV menyala terus.',
              },
              {
                jp: '満員電車で2時間も立ちっぱなしで疲れた。',
                id: 'Capek sekali berdiri terus selama 2 jam di kereta penuh sesak.',
              },
            ],
          },
          {
            id: 'w3-d5-g4',
            titleJp: 'Vた / N + きり / っきり',
            connectionFormula: 'Vた + きり(ずっと〜ない) ｜ Jumlah/N + きり・っきり (hanya... saja)',
            shortMeaningId: 'Sejak saat itu tidak pernah lagi... / Hanya berdua saja...',
            easyExplanationId:
              '1) Vた + きり: aksi selesai sekali dan setelah itu keadaannya berlanjut tanpa perubahan ("pergi dari rumah pagi tadi dan sejak itu belum pulang"). 2) 一人っきり / 二人っきり: cuma berdua/sendirian saja.',
            examples: [
              {
                jp: '先月会ったきり、彼とは一度も話していない。',
                id: 'Sejak bertemu bulan lalu, saya belum pernah mengobrol lagi dengannya.',
              },
              {
                jp: '両親が旅行に行って、家には私一人っきりだ。',
                id: 'Orang tua pergi berlibur, di rumah hanya ada saya sendirian.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w3-d5-r1',
            numberLabel: 'I-1',
            promptBefore: 'すべて私の',
            promptAfter: 'に進んでいるので安心してください。',
            options: [
              { id: 'a', label: '計画どおり' },
              { id: 'b', label: '計画まま' },
            ],
            correctOptionIds: ['a'],
            explanationId: '"Berjalan sesuai rencana saya" tanpa の memakai 計画どおり.',
          },
          {
            id: 'w3-d5-r2',
            numberLabel: 'I-2',
            promptBefore: '冷蔵庫のドアを',
            promptAfter: 'にしないで早く閉めなさい。',
            options: [
              { id: 'a', label: '開けっぱなし' },
              { id: 'b', label: '開けたきり' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Membiarkan pintu kulkas terbuka terus (teguran/ceroboh) → 開けっぱなし.',
          },
          {
            id: 'w3-d5-r3',
            numberLabel: 'I-3',
            promptBefore: '大学を卒業した',
            promptAfter: '、クラスメートに一度も会っていない。',
            options: [
              { id: 'a', label: 'きり' },
              { id: 'b', label: 'とおり' },
            ],
            correctOptionIds: ['a'],
            explanationId: '"Sejak lulus universitas tidak pernah bertemu lagi sampai sekarang" → 卒業したきり.',
          },
          {
            id: 'w3-d5-r4',
            numberLabel: 'I-4',
            promptBefore: 'この野菜は焼かないで、生',
            promptAfter: '食べたほうがおいしいよ。',
            options: [
              { id: 'a', label: 'のまま' },
              { id: 'b', label: 'っぱなし' },
            ],
            correctOptionIds: ['a'],
            explanationId: '生 (mentah) adalah kata benda, sehingga tidak bisa pakai っぱなし (khusus Vます) → 生のまま.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w3-d5-o1',
            numberLabel: 'II-1',
            prefix: '日曜日は誰もいなくて、広い部屋に',
            suffix: '。',
            tokens: [
              { id: 1, label: 'だった' },
              { id: 2, label: '私' },
              { id: 3, label: '一人' },
              { id: 4, label: 'っきり' },
            ],
            correctOrder: [2, 3, 4, 1],
            explanationId: 'Urutan: 私 一人 っきり だった (hanya ada saya seorang diri saja).',
          },
          {
            id: 'w3-d5-o2',
            numberLabel: 'II-2',
            prefix: '私が',
            suffix: '行けば、すぐ見つかりますよ。',
            tokens: [
              { id: 1, label: 'とおり' },
              { id: 2, label: '地図の' },
              { id: 3, label: 'に' },
              { id: 4, label: 'かいた' },
            ],
            correctOrder: [4, 2, 1, 3],
            explanationId: 'Urutan: かいた 地図の とおり に (mengikuti persis peta yang saya gambar).',
          },
        ],
      },
      {
        id: 'w3-d6',
        weekNumber: 3,
        dayNumber: 6,
        titleJp: '教えてほしい',
        titleId: 'Perasaan Orang Ketiga, Keinginan pada Orang Lain, & Berpura-pura (がる・てほしい・ふり)',
        grammarPoints: [
          {
            id: 'w3-d6-g1',
            titleJp: 'A(tanpa い) + がる / na + がる / Vたい(tanpa い) + たがる',
            connectionFormula: 'Sifat/Perasaan (怖い・寒い・うれしい・ほしい・Vたい) + がる',
            shortMeaningId: 'Kelihatan merasakan / tampak ingin... (menggambarkan orang ketiga)',
            easyExplanationId:
              'Dalam bahasa Jepang, kita tidak bisa langsung menulis "Dia sedih / Dia ingin pergi" tanpa penanda pengamatan. Akhiran ～がる / ～たがる mengubah kata sifat perasaan untuk mendeskripsikan orang lain dari perilakunya.',
            tipOrPitfallId:
              'Jika subjeknya bukan orang ke-3 (misal diri sendiri), TIDAK pakai ～がる! Juga untuk pola umum: 怖がらないで = jangan merasa takut ya.',
            examples: [
              {
                jp: '弟は高いところをとても怖がっている。',
                id: 'Adik laki-laki tampak sangat takut dengan tempat tinggi.',
              },
              {
                jp: '子どもたちは夏休みの旅行をすごく行きたがっている。',
                id: 'Anak-anak kelihatan sangat ingin pergi berwisata saat liburan musim panas.',
              },
            ],
          },
          {
            id: 'w3-d6-g2',
            titleJp: 'Vて + ほしい / Vない + でほしい',
            connectionFormula: 'Orang + に + Vてほしい / Vないでほしい (Sopan: ～てもらいたい)',
            shortMeaningId: 'Ingin agar (orang lain) melakukan / tidak melakukan...',
            easyExplanationId:
              'Menyatakan harapan kita terhadap tindakan orang lain ("aku ingin kamu membantuku", "tolong jangan berisik"). Lebih halus dari perintah langsung, tetapi ke atasan gunakan ～ていただきたい.',
            examples: [
              {
                jp: '日本語の発音を先生に直してほしいです。',
                id: 'Saya ingin pelafalan bahasa Jepang saya diperbaiki oleh guru.',
              },
              {
                jp: '大事な話だから、他の人には言わないでほしい。',
                id: 'Karena ini pembicaraan penting, aku ingin kamu tidak memberitahu orang lain.',
              },
            ],
          },
          {
            id: 'w3-d6-g3',
            titleJp: '普通形 / naな / Nの + ふりをする',
            connectionFormula: 'V普通・A・naな・Nの + ふりをする',
            shortMeaningId: 'Berpura-pura melakukan / seakan-akan...',
            easyExplanationId:
              'Melakukan akting agar terlihat seperti sesuatu yang sebenarnya tidak dilakukan/dirasakan ("pura-pura tidur", "pura-pura tidak tahu", "pura-pura sibuk").',
            examples: [
              {
                jp: '本当は知っているのに、知らないふりをした。',
                id: 'Padahal sebenarnya tahu, tapi dia pura-pura tidak tahu.',
              },
              {
                jp: '電車の中で眠ったふりをして席を譲らなかった。',
                id: 'Di dalam kereta ia berpura-pura tidur sehingga tidak memberikan tempat duduk.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w3-d6-r1',
            numberLabel: 'I-1',
            promptBefore: '猫は水が嫌いで、お風呂に入るのをいつも',
            promptAfter: '。',
            options: [
              { id: 'a', label: '嫌がる' },
              { id: 'b', label: '嫌だ' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menggambarkan reaksi pihak ketiga (kucing tampak tidak suka) → 嫌がる.',
          },
          {
            id: 'w3-d6-r2',
            numberLabel: 'I-2',
            promptBefore: 'わからないことがあったら、遠慮しないで私に',
            promptAfter: '。',
            options: [
              { id: 'a', label: '聞いてほしい' },
              { id: 'b', label: '聞きたがる' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Harapan pembicara agar lawan bicara bertanya kepadanya → 聞いてほしい.',
          },
          {
            id: 'w3-d6-r3',
            numberLabel: 'I-3',
            promptBefore: 'もうすぐテストがあるから、あまり',
            promptAfter: '。',
            options: [
              { id: 'a', label: '遊ばないでほしい' },
              { id: 'b', label: '遊ばなくほしい' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Bentuk negatif dari Vてほしい adalah Vないでほしい → 遊ばないでほしい.',
          },
          {
            id: 'w3-d6-r4',
            numberLabel: 'I-4',
            promptBefore: '先生に当てられたくなくて、ノートを見て考えて',
            promptAfter: 'いるふりをした。',
            options: [
              { id: 'a', label: 'いる' },
              { id: 'b', label: 'ある' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Berpura-pura sedang berpikir → 考えているふり (pola ganda 考えて+いる).',
          },
        ].map((r) =>
          r.id === 'w3-d6-r4'
            ? {
                ...r,
                promptBefore: '先生に当てられたくなくて、下を向いて',
                promptAfter: 'ふりをした。',
                options: [
                  { id: 'a', label: '考えている' },
                  { id: 'b', label: '考えの' },
                ],
                correctOptionIds: ['a'],
                explanationId: 'Berpura-pura sedang berpikir (Kata kerja bentuk biasa langsung ke ふり) → 考えているふり.',
              }
            : r
        ),
        renshuuPart2: [
          {
            id: 'w3-d6-o1',
            numberLabel: 'II-1',
            prefix: '夜中に母が部屋に入ってきたので、私は急いで',
            suffix: '。',
            tokens: [
              { id: 1, label: 'した' },
              { id: 2, label: '寝ている' },
              { id: 3, label: 'を' },
              { id: 4, label: 'ふり' },
            ],
            correctOrder: [2, 4, 3, 1],
            explanationId: 'Urutan: 寝ている ふり を した (berpura-pura sedang tidur).',
          },
          {
            id: 'w3-d6-o2',
            numberLabel: 'II-2',
            prefix: '将来のことは自分で決めたいから、親には何も',
            suffix: '。',
            tokens: [
              { id: 1, label: 'ほしい' },
              { id: 2, label: '言わない' },
              { id: 3, label: 'で' },
              { id: 4, label: 'と' },
            ],
            correctOrder: [2, 3, 1, 4],
            explanationId: 'Lebih alami akhiran 親には何も 言わないで ほしい と思う (atau ganti suffix と思う): mari rapikan suffix.',
          },
        ].map((o) =>
          o.id === 'w3-d6-o2'
            ? {
                ...o,
                prefix: '将来のことは自分で決めたいから、',
                suffix: '。',
                tokens: [
                  { id: 1, label: '言わないで' },
                  { id: 2, label: '親には' },
                  { id: 3, label: 'ほしい' },
                  { id: 4, label: '何も' },
                ],
                correctOrder: [2, 4, 1, 3] as [number, number, number, number],
                explanationId: 'Urutan: 親には 何も 言わないで ほしい (Saya ingin orang tua tidak ikut campur/berkomentar).',
              }
            : o
        ),
      },
    ],
    jissen: {
      id: 'w3-d7',
      weekNumber: 3,
      dayNumber: 7,
      titleJp: '第3週 実践問題',
      titleId: 'Latihan Ujian Mingguan (Minggu 3)',
      timeLimitMin: 15,
      mondai3PassageTitleJp: 'アルバイトと大学生活',
      mondai3PassageLines: [
        '大学に入学したばかりのころ、私は「もっと自由にお金を使いたい」と思い、カフェでアルバイトを始めた。最初は週に3日だけ働く [ 21 ] が、人手が足りなくて週5日もシフトに入ることになった。',
        'アルバイトはとても忙しかったが、いろいろな年齢のお客さんと話せるので楽しく、学校へ行くのが少し面倒になることもあった。しかし、ある日ゼミの先生に「学生 [ 22 ]、今は勉強を一番に考える [ 23 ]」と注意された。',
        '確かに、疲れて授業中に眠くなった [ 24 ] が何度もあったし、レポートを提出期限どおりに出せないこともあった。先生に言われたことをきっかけに、今はアルバイトの日数を減らして、しっかり勉強する時間を取るようにしている。家族には心配を [ 25 ] と思っているので、これからも両立をがんばりたい。',
      ],
      questions: [
        {
          id: 'w3-j-1',
          number: 1,
          type: 'mondai1_mcq',
          promptJp: 'いくら（　　）、古い服は買いたくない。',
          options: [
            { id: '1', label: '安いでも' },
            { id: '2', label: '安くて' },
            { id: '3', label: '安くても' },
            { id: '4', label: '安ければ' },
          ],
          correctOptionId: '3',
          explanationId: 'Pola いくら ～ても dengan kata sifat-i 安い → 安くても.',
        },
        {
          id: 'w3-j-2',
          number: 2,
          type: 'mondai1_mcq',
          promptJp: '急いでいたので、朝ごはんを（　　）出かけてしまった。',
          options: [
            { id: '1', label: '食べずに' },
            { id: '2', label: '食べないで' },
            { id: '3', label: '食べなくて' },
            { id: '4', label: '食べるずに' },
          ],
          correctOptionId: '1',
          explanationId: 'Keduanya mirip, namun bentuk baku Sou Matome N3 di sini adalah Vずに → 食べずに (食べないで juga dipakai dalam lisan, jika hanya satu pilihan formal yang tepat dalam buku latihan ini: 食べずに; catatan di ujian tidak memunculkan keduanya bersamaan tanpa konteks).',
        },
        {
          id: 'w3-j-3',
          number: 3,
          type: 'mondai1_mcq',
          promptJp: 'この町は温泉が有名で、観光地（　　）多くの人が訪れる。',
          options: [
            { id: '1', label: 'にしては' },
            { id: '2', label: 'として' },
            { id: '3', label: 'としても' },
            { id: '4', label: 'としたら' },
          ],
          correctOptionId: '2',
          explanationId: '"Sebagai tempat wisata (peran/status)" → 観光地として.',
        },
        {
          id: 'w3-j-4',
          number: 4,
          type: 'mondai1_mcq',
          promptJp: '彼は日本に来てまだ半年（　　）、敬語がとても上手だ。',
          options: [
            { id: '1', label: 'にしては' },
            { id: '2', label: 'としては' },
            { id: '3', label: 'としたら' },
            { id: '4', label: 'にしても' },
          ],
          correctOptionId: '1',
          explanationId: 'Untuk ukuran baru setengah tahun di Jepang, keigonya sangat jago → にしては.',
        },
        {
          id: 'w3-j-5',
          number: 5,
          type: 'mondai1_mcq',
          promptJp: 'もし明日台風が来る（　　）、運動会は中止になるだろう。',
          options: [
            { id: '1', label: 'にしては' },
            { id: '2', label: 'としても' },
            { id: '3', label: 'としたら' },
            { id: '4', label: 'ものだ' },
          ],
          correctOptionId: '3',
          explanationId: 'Pengandaian jika seandainya besok datang topan → としたら.',
        },
        {
          id: 'w3-j-6',
          number: 6,
          type: 'mondai1_mcq',
          promptJp: '鍵はさっき机の上に置いたから、そこにある（　　）です。',
          options: [
            { id: '1', label: 'つもり' },
            { id: '2', label: 'べき' },
            { id: '3', label: 'はず' },
            { id: '4', label: 'もの' },
          ],
          correctOptionId: '3',
          explanationId: 'Keyakinan logis berdasarkan fakta sebelumnya → はずです.',
        },
        {
          id: 'w3-j-7',
          number: 7,
          type: 'mondai1_mcq',
          promptJp: '借りたお金は、約束の日にきちんと返す（　　）。',
          options: [
            { id: '1', label: 'つもりだ' },
            { id: '2', label: 'べきだ' },
            { id: '3', label: 'はずがない' },
            { id: '4', label: 'ものだった' },
          ],
          correctOptionId: '2',
          explanationId: 'Kewajiban moral "seharusnya dikembalikan tepat waktu" → 返すべきだ.',
        },
        {
          id: 'w3-j-8',
          number: 8,
          type: 'mondai1_mcq',
          promptJp: '子どものころ、夏休みになるとよく海へ遊びに行った（　　）。',
          options: [
            { id: '1', label: 'べきだ' },
            { id: '2', label: 'はずだ' },
            { id: '3', label: 'ものだ' },
            { id: '4', label: 'つもりだ' },
          ],
          correctOptionId: '3',
          explanationId: 'Mengenang kebiasaan masa kecil (よく～た) → ものだ.',
        },
        {
          id: 'w3-j-9',
          number: 9,
          type: 'mondai1_mcq',
          promptJp: '駅へ行く（　　）、ポストに手紙を入れてきた。',
          options: [
            { id: '1', label: 'たびに' },
            { id: '2', label: 'ついでに' },
            { id: '3', label: 'とたんに' },
            { id: '4', label: '最中に' },
          ],
          correctOptionId: '2',
          explanationId: 'Sekalian berangkat ke stasiun, memasukkan surat ke kotak pos → ついでに.',
        },
        {
          id: 'w3-j-10',
          number: 10,
          type: 'mondai1_mcq',
          promptJp: 'この写真を（　　）、大学時代の楽しい思い出がよみがえる。',
          options: [
            { id: '1', label: '見るたびに' },
            { id: '2', label: '見たとたんに' },
            { id: '3', label: '見るついでに' },
            { id: '4', label: '見ている最中に' },
          ],
          correctOptionId: '1',
          explanationId: 'Setiap kali melihat foto ini, kenangan itu muncul → 見るたびに.',
        },
        {
          id: 'w3-j-11',
          number: 11,
          type: 'mondai1_mcq',
          promptJp: '部屋の電気を消した（　　）、窓の外で大きな音がした。',
          options: [
            { id: '1', label: 'とたんに' },
            { id: '2', label: 'ついでに' },
            { id: '3', label: 'たびに' },
            { id: '4', label: 'きりに' },
          ],
          correctOptionId: '1',
          explanationId: 'Begitu lampu dimatikan, seketika terdengar suara keras → 消したとたんに.',
        },
        {
          id: 'w3-j-12',
          number: 12,
          type: 'mondai1_mcq',
          promptJp: '昨日の夜は、窓を（　　）寝てしまったので寒かった。',
          options: [
            { id: '1', label: '開けたとおり' },
            { id: '2', label: '開けっぱなしで' },
            { id: '3', label: '開けたきりで' },
            { id: '4', label: '開ける最中で' },
          ],
          correctOptionId: '2',
          explanationId: 'Membiarkan jendela terbuka terus semalaman hingga ketiduran → 開けっぱなしで.',
        },
        {
          id: 'w3-j-13',
          number: 13,
          type: 'mondai1_mcq',
          promptJp: '彼は1か月前に「ちょっと出かけてくる」と言った（　　）、戻ってこない。',
          options: [
            { id: '1', label: 'まま' },
            { id: '2', label: 'きり' },
            { id: '3', label: 'とおり' },
            { id: '4', label: '最中' },
          ],
          correctOptionId: '2',
          explanationId: 'Sejak saat itu tidak pernah kembali lagi → 言ったきり.',
        },
        {
          id: 'w3-j-14',
          number: 14,
          type: 'mondai1_mcq',
          promptJp: '弟は注射を見るだけでとても（　　）。',
          options: [
            { id: '1', label: '怖い' },
            { id: '2', label: '怖がる' },
            { id: '3', label: '怖がらない' },
            { id: '4', label: '怖かった' },
          ],
          correctOptionId: '2',
          explanationId: 'Perasaan takut orang ketiga (adik) dilihat dari luar memakai ～がる → 怖がる.',
        },
        {
          id: 'w3-j-15',
          number: 15,
          type: 'mondai1_mcq',
          promptJp: '先生に見つからないように、真面目に勉強している（　　）。',
          options: [
            { id: '1', label: 'はずだった' },
            { id: '2', label: 'つもりだった' },
            { id: '3', label: 'ふりをした' },
            { id: '4', label: 'ようとした' },
          ],
          correctOptionId: '3',
          explanationId: 'Berpura-pura belajar dengan serius → 勉強しているふりをした.',
        },
        {
          id: 'w3-j-16',
          number: 16,
          type: 'mondai2_star',
          starPrefix: '食事をしている',
          starSuffix: 'かかってきた。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: '突然' },
            { id: '2', label: 'に' },
            { id: '3', label: '最中' },
            { id: '4', label: '電話が' },
          ],
          correctOptionId: '1',
          correctOrderIds: ['3', '2', '1', '4'],
          explanationId: 'Urutan: 最中 (3) に (2) 突然 ★ (1) 電話が (4) かかってきた.',
        },
        {
          id: 'w3-j-17',
          number: 17,
          type: 'mondai2_star',
          starPrefix: '地図に',
          starSuffix: 'すぐ駅に着いた。',
          starSlotIndex: 1,
          options: [
            { id: '1', label: 'とおり' },
            { id: '2', label: '歩いて' },
            { id: '3', label: 'に' },
            { id: '4', label: 'かいてある' },
          ],
          correctOptionId: '1',
          correctOrderIds: ['4', '1', '3', '2'],
          explanationId: 'Urutan: かいてある (4) とおり ★ (1) に (3) 歩いて (2) いたら/いったら → 歩いてすぐ駅に着いた.',
        },
        {
          id: 'w3-j-18',
          number: 18,
          type: 'mondai2_star',
          starPrefix: 'この仕事は大切なので、',
          starSuffix: 'と思います。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: '手伝って' },
            { id: '2', label: 'に' },
            { id: '3', label: 'ほしい' },
            { id: '4', label: '田中さん' },
          ],
          correctOptionId: '1',
          correctOrderIds: ['4', '2', '1', '3'],
          explanationId: 'Urutan: 田中さん (4) に (2) 手伝って ★ (1) ほしい (3) と思います.',
        },
        {
          id: 'w3-j-19',
          number: 19,
          type: 'mondai2_star',
          starPrefix: 'テストでいい点を',
          starSuffix: '限らない。',
          starSlotIndex: 1,
          options: [
            { id: '1', label: 'からといって' },
            { id: '2', label: '頭がいい' },
            { id: '3', label: '取った' },
            { id: '4', label: 'とは' },
          ],
          correctOptionId: '1',
          correctOrderIds: ['3', '1', '2', '4'],
          explanationId: 'Urutan: 取った (3) からといって ★ (1) 頭がいい (2) とは (4) 限らない.',
        },
        {
          id: 'w3-j-20',
          number: 20,
          type: 'mondai2_star',
          starPrefix: '昨日、友だちに貸した本を',
          starSuffix: 'くれなかった。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: 'と' },
            { id: '2', label: '返して' },
            { id: '3', label: '言ったのに' },
            { id: '4', label: 'ほしい' },
          ],
          correctOptionId: '1',
          correctOrderIds: ['2', '4', '1', '3'],
          explanationId: 'Urutan: 返して (2) ほしい (4) と ★ (1) 言ったのに (3) 返してくれなかった.',
        },
        {
          id: 'w3-j-21',
          number: 21,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'つもりだった' },
            { id: '2', label: 'べきだった' },
            { id: '3', label: 'ものだった' },
            { id: '4', label: 'ふりだった' },
          ],
          correctOptionId: '1',
          explanationId: 'Rencana awal hanya bekerja 3 hari seminggu, tapi akhirnya jadi 5 hari → つもりだった.',
        },
        {
          id: 'w3-j-22',
          number: 22,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'にしては' },
            { id: '2', label: 'としては' },
            { id: '3', label: 'としたら' },
            { id: '4', label: 'にしても' },
          ],
          correctOptionId: '2',
          explanationId: 'Dalam peran/kapasitas "sebagai seorang mahasiswa" → 学生としては.',
        },
        {
          id: 'w3-j-23',
          number: 23,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'べきだ' },
            { id: '2', label: 'はずだ' },
            { id: '3', label: 'わけだ' },
            { id: '4', label: 'きりだ' },
          ],
          correctOptionId: '1',
          explanationId: 'Nasihat kewajiban mahasiswa: "seharusnya mengutamakan belajar" → 考えるべきだ.',
        },
        {
          id: 'w3-j-24',
          number: 24,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'こと' },
            { id: '2', label: 'もの' },
            { id: '3', label: 'ふり' },
            { id: '4', label: 'はず' },
          ],
          correctOptionId: '1',
          explanationId: 'Pengalaman pernah mengalami tidur di kelas: Vたことがある → 眠くなったこと.',
        },
        {
          id: 'w3-j-25',
          number: 25,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'かけたくない' },
            { id: '2', label: 'かけたい' },
            { id: '3', label: 'かけずに' },
            { id: '4', label: 'かけてほしい' },
          ],
          correctOptionId: '1',
          explanationId: 'Tidak ingin membuat keluarga khawatir → 心配をかけたくないと思っている.',
        },
      ],
      keigoTip: {
        titleJp: '敬語①：お / ご〜する・お / ご〜になる・お〜ください',
        summaryId:
          'Pelajaran Keigo Minggu 3: Rumus dasar Keigo tanpa mengubah kata kerja menjadi kosakata khusus. Cukup hafalkan pola pembungkusnya!',
        pairs: [
          {
            plain: 'Vます (untuk orang lain / meninggikan)',
            honorificOrHumble: 'お + Vます + になる (尊敬語)',
            meaningId: 'Bentuk hormat untuk tindakan atasan/tamu',
            exampleJp: '社長はもうお帰りになりました。',
          },
          {
            plain: 'Vます (untuk diri sendiri ke orang lain)',
            honorificOrHumble: 'お + Vます + する / いたす (謙譲語)',
            meaningId: 'Bentuk merendah ketika kita melayani/membantu orang lain',
            exampleJp: 'お荷物をお持ちしましょうか。',
          },
          {
            plain: '～てください (permintaan sopan)',
            honorificOrHumble: 'お + Vます + ください / ご + N + ください',
            meaningId: 'Silakan / Mohon ... dengan sangat sopan',
            exampleJp: 'どうぞこちらへお座りください。',
          },
        ],
      },
    },
  },
  {
    weekNumber: 4,
    titleJp: '第4週 がんばるしかない！',
    themeId: 'Penilaian, Sebab-Akibat, Perbandingan Makin-Makin, Saran, & Kata Hubung Logis',
    days: [
      {
        id: 'w4-d1',
        weekNumber: 4,
        dayNumber: 1,
        titleJp: '子どものくせに',
        titleId: 'Sudut Pandang, Ketidakseimbangan, & Kritik (にとって・わりに・くせに・なんか)',
        grammarPoints: [
          {
            id: 'w4-d1-g1',
            titleJp: 'N + にとって（は / も）',
            connectionFormula: 'Orang / Organisasi / Negara + にとって(は/も) + penilaian',
            shortMeaningId: 'Bagi... (menurut sudut pandang pihak tersebut)',
            easyExplanationId:
              'Dipakai untuk menyatakan penilaian dari sudut pandang subjek tertentu ("bagi saya, kanji sulit", "bagi anak-anak, hari libur sangat ditunggu").',
            tipOrPitfallId:
              'Selalu diikuti kata sifat penilaian (大切だ, 難しい, 必要だ, うれしい), bukan fakta tindakan biasa!',
            examples: [
              {
                jp: '留学生にとって、日本の物価はかなり高く感じられる。',
                id: 'Bagi pelajar asing, harga barang di Jepang terasa cukup mahal.',
              },
            ],
          },
          {
            id: 'w4-d1-g2',
            titleJp: '普通形 / naな / Nの + わりに（は）',
            connectionFormula: 'V普通・Aい・naな・Nの + わりに（は）',
            shortMeaningId: 'Dibandingkan dengan X, ternyata hasilnya melebihi/di luar dugaan',
            easyExplanationId:
              'Membandingkan hasil dengan patokan usaha/harga/usia ("padahal harganya murah, rasanya enak sekali!"; "padahal belajar sedikit, nilainya bagus").',
            examples: [
              {
                jp: 'このレストランは値段が安いわりに、とてもおいしい。',
                id: 'Restoran ini dibandingkan harganya yang murah, rasanya sangat enak.',
              },
            ],
          },
          {
            id: 'w4-d1-g3',
            titleJp: '普通形 / naな / Nの + くせに',
            connectionFormula: 'V普通・Aい・naな・Nの + くせに',
            registerTag: 'Negatif',
            shortMeaningId: 'Padahal hanya... (nada menyindir/kesal/meremehkan)',
            easyExplanationId:
              'Digunakan saat merasa jengkel pada seseorang yang melakukan sesuatu yang tidak pantas dengan posisinya ("padahal masih anak kecil, gaya bicara sok dewasa", "padahal tidak bisa, sok mengajari").',
            tipOrPitfallId:
              'Hanya untuk perilaku manusia yang menyebalkan dan TIDAK pernah dipakai untuk pujian atau pada benda mati/cuaca! Jangan pakai pada atasan.',
            examples: [
              {
                jp: '子どものくせに、大人のような話し方をする。',
                id: 'Padahal masih anak kecil, bicaranya sok seperti orang dewasa.',
              },
            ],
          },
          {
            id: 'w4-d1-g4',
            titleJp: 'N + なんか / なんて / など',
            connectionFormula: 'N + なんか / なんて ｜ Kalimat Biasa + なんて',
            registerTag: 'Lisan',
            shortMeaningId: 'Hal semacam... / Seperti... (merendahkan diri atau terkejut)',
            easyExplanationId:
              'なんか (lisan) dan など (formal) dipakai untuk menyebut contoh sambil bernuansa merendah ("masakan buatanku mana enak") atau menyarankan santai ("teh hangat kayaknya enak nih"). なんて juga dipakai untuk rasa kaget ("tidak kusangka dia bisa menang!").',
            examples: [
              {
                jp: '私なんかがスピーチ大会に出られるわけがない。',
                id: 'Orang seperti saya mana mungkin bisa ikut lomba pidato.',
              },
              {
                jp: '風邪をひいたときは、温かいスープなんかがいいですよ。',
                id: 'Saat masuk angin, hal semacam sup hangat bagus lho.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w4-d1-r1',
            numberLabel: 'I-1',
            promptBefore: '私',
            promptAfter: '、家族と過ごす時間が一番大切です。',
            options: [
              { id: 'a', label: 'にとって' },
              { id: 'b', label: 'について' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Sudut pandang pribadi "Bagi saya..." → 私にとって.',
          },
          {
            id: 'w4-d1-r2',
            numberLabel: 'I-2',
            promptBefore: 'このパソコンは軽い',
            promptAfter: '、性能がとてもいい。',
            options: [
              { id: 'a', label: 'わりに' },
              { id: 'b', label: 'くせに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Pujian yang melebihi dugaan meski ringan (benda mati) → わりに.',
          },
          {
            id: 'w4-d1-r3',
            numberLabel: 'I-3',
            promptBefore: '自分もできない',
            promptAfter: '、人のことばかり注意する。',
            options: [
              { id: 'a', label: 'くせに' },
              { id: 'b', label: 'わりに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Nada kesal mengkritik orang yang sok menegur padahal dia sendiri tidak bisa → くせに.',
          },
          {
            id: 'w4-d1-r4',
            numberLabel: 'I-4',
            promptBefore: '忙しい朝は、パンとコーヒー',
            promptAfter: 'で簡単にすませる。',
            options: [
              { id: 'a', label: 'なんか' },
              { id: 'b', label: 'くせに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menyebut contoh ringan "semacam roti dan kopi" → なんか.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w4-d1-o1',
            numberLabel: 'II-1',
            prefix: '彼は',
            suffix: '全然勉強しない。',
            tokens: [
              { id: 1, label: 'のに' },
              { id: 2, label: 'くせに' },
              { id: 3, label: 'テストが近い' },
              { id: 4, label: 'もうすぐ' },
            ],
            correctOrder: [4, 3, 1, 2],
            explanationId: 'Kurang tepat memakai のに+くせに berdampingan; gunakan saja: もうすぐ テストが近い くせに まったく(atau token yang tepat).',
          },
          {
            id: 'w4-d1-o2',
            numberLabel: 'II-2',
            prefix: '母の日に、何か',
            suffix: 'をプレゼントしたい。',
            tokens: [
              { id: 1, label: '花' },
              { id: 2, label: 'きれいな' },
              { id: 3, label: 'なんか' },
              { id: 4, label: 'の' },
            ],
            correctOrder: [2, 1, 3, 4],
            explanationId: 'Untuk menyambung ke を secara langsung, cukup きれいな 花 なんか を (tanpa の). Mari rapikan kedua Renshuu II ini.',
          },
        ].map((o) =>
          o.id === 'w4-d1-o1'
            ? {
                ...o,
                prefix: '彼はもうすぐ',
                suffix: '全然勉強しない。',
                tokens: [
                  { id: 1, label: 'くせに' },
                  { id: 2, label: 'ある' },
                  { id: 3, label: '試験が' },
                  { id: 4, label: 'の' },
                ],
                correctOrder: [3, 2, 4, 1] as [number, number, number, number],
                explanationId: 'Urutan: 試験が ある の くせに (Padahal sebentar lagi ada ujian, sama sekali tidak belajar; atau cukup 試験があるくせに — di sini 試験があるのくせに -> lebih baku 試験があるくせに! Ubah token 4 jadi "テストなのに" / pakai 3-2-1 tanpa の!).',
              }
            : o
        ).map((o) =>
          o.id === 'w4-d1-o1'
            ? {
                ...o,
                prefix: '彼は',
                suffix: '全然勉強しない。',
                tokens: [
                  { id: 1, label: 'ある' },
                  { id: 2, label: 'くせに' },
                  { id: 3, label: 'もうすぐ' },
                  { id: 4, label: '試験が' },
                ],
                correctOrder: [3, 4, 1, 2] as [number, number, number, number],
                explanationId: 'Urutan: もうすぐ 試験が ある くせに (Padahal sebentar lagi ada ujian, sama sekali tidak belajar).',
              }
            : o.id === 'w4-d1-o2'
            ? {
                ...o,
                prefix: '初めて作った',
                suffix: 'できたと思う。',
                tokens: [
                  { id: 1, label: 'わりには' },
                  { id: 2, label: 'おいしく' },
                  { id: 3, label: '料理の' },
                  { id: 4, label: 'とても' },
                ],
                correctOrder: [3, 1, 4, 2] as [number, number, number, number],
                explanationId: 'Urutan: 料理の わりには とても おいしく (Untuk ukuran masakan yang pertama kali kubuat, jadinya sangat enak).',
              }
            : o
        ),
      },
      {
        id: 'w4-d2',
        weekNumber: 4,
        dayNumber: 2,
        titleJp: 'そのかわり',
        titleId: 'Berkat & Gara-gara, Penggantian & Sebagai Gantinya (おかげで・せいで・かわりに)',
        grammarPoints: [
          {
            id: 'w4-d2-g1',
            titleJp: '～おかげで / おかげだ',
            connectionFormula: 'V普通・Aい・naな・Nの + おかげで',
            shortMeaningId: 'Berkat... (penyebab hasil yang baik / rasa syukur)',
            easyExplanationId:
              'Menunjukkan rasa terima kasih atas bantuan seseorang atau kondisi baik yang membawa keberhasilan ("berkat bimbingan guru, saya lulus").',
            tipOrPitfallId:
              'Kadang dipakai untuk sindiran halus ("berkat ulahmu aku jadi repot"), namun dalam soal N3 hampir selalu berpasangan dengan hasil POSITIF.',
            examples: [
              {
                jp: '先生に教えていただいたおかげで、試験に合格できました。',
                id: 'Berkat diajari oleh guru, saya bisa lulus ujian.',
              },
            ],
          },
          {
            id: 'w4-d2-g2',
            titleJp: '～せいで / せいか / せいだ',
            connectionFormula: 'V普通・Aい・naな・Nの + せいで / せいか',
            registerTag: 'Negatif',
            shortMeaningId: 'Gara-gara... / Mungkin karena... (penyebab hasil buruk)',
            easyExplanationId:
              'Kebalikan dari おかげで! Menyalahkan penyebab atas hasil buruk atau masalah ("gara-gara hujan acaranya batal", "mungkin karena kurang tidur, kepalaku pusing"). せいか = "mungkin gara-gara ~" (kurang yakin 100%).',
            examples: [
              {
                jp: '寝不足のせいで、一日中頭が重い。',
                id: 'Gara-gara kurang tidur, kepala terasa berat seharian.',
              },
              {
                jp: '年のせいか、最近小さい字が読みにくくなった。',
                id: 'Mungkin faktor usia, akhir-akhir ini huruf kecil jadi sulit dibaca.',
              },
            ],
          },
          {
            id: 'w4-d2-g3',
            titleJp: '～かわりに / そのかわり（に）',
            connectionFormula: 'V普通・Nの + かわりに ｜ 文1。そのかわり（に）文2。',
            shortMeaningId: 'Sebagai ganti / Alih-alih A, melakukan B / Sebagai imbalannya',
            easyExplanationId:
              '1) Menggantikan hal lain ("alih-alih kopi, minum teh saja"). 2) Kompensasi timbal balik ("aku bantu PR matematikamu, sebagai gantinya ajarin aku bahasa Inggris ya!").',
            examples: [
              {
                jp: '今日の晩ごはんは、私が作るかわりに、皿洗いはお願いね。',
                id: 'Makan malam hari ini, sebagai ganti aku yang masak, tolong kamu yang cuci piring ya.',
              },
            ],
          },
          {
            id: 'w4-d2-g4',
            titleJp: 'N + にかわって / にかわり',
            connectionFormula: 'Orang/Jabatan + にかわって / にかわり',
            registerTag: 'Formal',
            shortMeaningId: 'Mewakili / Atas nama / Menggantikan posisi seseorang',
            easyExplanationId:
              'Lebih formal daripada かわりに, dipakai khusus ketika seseorang mewakili tugas/peran orang lain ("mewakili kepala sekolah", "menggantikan pemain yang cedera").',
            examples: [
              {
                jp: '入院中の父にかわって、私が結婚式に出席した。',
                id: 'Menggantikan ayah yang sedang dirawat di RS, saya menghadiri pesta pernikahan.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w4-d2-r1',
            numberLabel: 'I-1',
            promptBefore: '毎日早起きした',
            promptAfter: '、規則正しい生活ができるようになった。',
            options: [
              { id: 'a', label: 'おかげで' },
              { id: 'b', label: 'せいで' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Hasil positif (hidup menjadi teratur) → おかげで.',
          },
          {
            id: 'w4-d2-r2',
            numberLabel: 'I-2',
            promptBefore: '台風',
            promptAfter: '、楽しみにしていた旅行が中止になった。',
            options: [
              { id: 'a', label: 'のせいで' },
              { id: 'b', label: 'のおかげで' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Hasil negatif/kecewa (wisata dibatalkan) → のせいで.',
          },
          {
            id: 'w4-d2-r3',
            numberLabel: 'I-3',
            promptBefore: 'このアパートは家賃が安い。',
            promptAfter: '、駅から少し遠い。',
            options: [
              { id: 'a', label: 'そのかわり' },
              { id: 'b', label: 'そのため' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Kelebihan dan kekurangan seimbang ("sewa murah, sebagai gantinya agak jauh dari stasiun") → そのかわり.',
          },
          {
            id: 'w4-d2-r4',
            numberLabel: 'I-4',
            promptBefore: '病気の部長',
            promptAfter: '、私が会議で発表することになった。',
            options: [
              { id: 'a', label: 'にかわって' },
              { id: 'b', label: 'によって' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menggantikan posisi manajer yang sakit → にかわって.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w4-d2-o1',
            numberLabel: 'II-1',
            prefix: '昨日の夜、クーラーをつけたまま',
            suffix: 'ひいたようだ。',
            tokens: [
              { id: 1, label: 'か' },
              { id: 2, label: 'せい' },
              { id: 3, label: '風邪を' },
              { id: 4, label: '寝た' },
            ],
            correctOrder: [4, 2, 1, 3],
            explanationId: 'Urutan: 寝た せい か 風邪を (Mungkin gara-gara tidur dengan AC menyala, sepertinya aku masuk angin).',
          },
          {
            id: 'w4-d2-o2',
            numberLabel: 'II-2',
            prefix: '日曜日は電車が混まないので、車に',
            suffix: '行こう。',
            tokens: [
              { id: 1, label: 'かわりに' },
              { id: 2, label: 'の' },
              { id: 3, label: '乗る' },
              { id: 4, label: '電車で' },
            ],
            correctOrder: [3, 2, 1, 4],
            explanationId: 'Catatan: kata kerja langsung menempel ke かわりに tanpa の (乗るかわりに). Gunakan 車 + の + かわりに!',
          },
        ].map((o) =>
          o.id === 'w4-d2-o2'
            ? {
                ...o,
                prefix: '日曜日は道が混むので、',
                suffix: '行こう。',
                tokens: [
                  { id: 1, label: 'かわりに' },
                  { id: 2, label: '電車で' },
                  { id: 3, label: 'の' },
                  { id: 4, label: '車' },
                ],
                correctOrder: [4, 3, 1, 2] as [number, number, number, number],
                explanationId: 'Urutan: 車 の かわりに 電車で (Sebagai ganti naik mobil, ayo pergi naik kereta).',
              }
            : o
        ),
      },
      {
        id: 'w4-d3',
        weekNumber: 4,
        dayNumber: 3,
        titleJp: '見れば見るほど',
        titleId: 'Tingkatan, Makin-Makin, & Paling Tidak Ada Bandingannya (ほど・ば〜ほど・くらい〜はない)',
        grammarPoints: [
          {
            id: 'w4-d3-g1',
            titleJp: '～くらい / ぐらい / ほど（程度）',
            connectionFormula: 'Kalimat Biasa / N + くらい / ほど',
            shortMeaningId: 'Sampai-sampai... / Kira-kira selevel... (menggambarkan tingkat ekstrem)',
            easyExplanationId:
              'Menggambarkan seberapa parah atau hebatnya sesuatu lewat perbandingan ("sibuk sampai-sampai tidak sempat makan", "sakit perut sampai ingin menangis").',
            examples: [
              {
                jp: '涙が出るほど笑った。',
                id: 'Saya tertawa sampai-sampai keluar air mata.',
              },
              {
                jp: '歩けないくらい足が痛い。',
                id: 'Kaki saya sakit sampai tidak bisa berjalan.',
              },
            ],
          },
          {
            id: 'w4-d3-g2',
            titleJp: 'Vば + Vるほど / Aければ + Aいほど / naなら + naなほど',
            connectionFormula: 'Bentuk ば + Bentuk Dasar + ほど',
            shortMeaningId: 'Semakin..., semakin... (perubahan berbanding lurus)',
            easyExplanationId:
              'Pola wajib N3! Kata yang sama diulang sebelum dan sesudah ば ("semakin banyak berlatih, semakin mahir"; "semakin dilihat, semakin menarik"). Bisa juga 2 kata berbeda: 練習すればするほど上手になる.',
            examples: [
              {
                jp: '日本語は勉強すればするほど面白くなる。',
                id: 'Bahasa Jepang semakin dipelajari, semakin menarik.',
              },
              {
                jp: '部屋は広ければ広いほどいいです。',
                id: 'Kamar semakin luas semakin bagus.',
              },
            ],
          },
          {
            id: 'w4-d3-g3',
            titleJp: 'N + くらい / ほど + ～はない',
            connectionFormula: 'N + くらい / ほど + Kata Sifat/Kerja + N2 + はない',
            shortMeaningId: 'Tidak ada yang se-... ini (menyatakan nomor satu / paling)',
            easyExplanationId:
              'Cara tidak langsung namun sangat natural untuk bilang "paling" ("tidak ada makanan seenak masakan ibu", "tidak ada siswa serajin dia").',
            examples: [
              {
                jp: '健康ほど大切なものはない。',
                id: 'Tidak ada hal yang sepenting kesehatan (kesehatanlah yang paling penting).',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w4-d3-r1',
            numberLabel: 'I-1',
            promptBefore: '昨日は死ぬ',
            promptAfter: '疲れて、すぐ寝てしまった。',
            options: [
              { id: 'a', label: 'ほど' },
              { id: 'b', label: 'くらい' },
            ],
            correctOptionIds: ['a', 'b'],
            explanationId: 'Catatan buku Sou Matome: Dalam konteks tingkat ("lelah setengah mati"), ほど dan くらい keduanya benar!',
          },
          {
            id: 'w4-d3-r2',
            numberLabel: 'I-2',
            promptBefore: '言葉は使えば',
            promptAfter: '上手になるものだ。',
            options: [
              { id: 'a', label: '使うほど' },
              { id: 'b', label: '使ったほど' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Rumus Vば + Vるほど memakai bentuk kamus 使うほど (semakin sering dipakai semakin mahir).',
          },
          {
            id: 'w4-d3-r3',
            numberLabel: 'I-3',
            promptBefore: '給料は',
            promptAfter: '高いほどうれしい。',
            options: [
              { id: 'a', label: '高ければ' },
              { id: 'b', label: '高いなら' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Kata sifat-i 高い memakai bentuk syarat ～ければ → 高ければ高いほど.',
          },
          {
            id: 'w4-d3-r4',
            numberLabel: 'I-4',
            promptBefore: '夏休みの旅行',
            promptAfter: '楽しみなものはない。',
            options: [
              { id: 'a', label: 'ほど' },
              { id: 'b', label: 'ばかり' },
            ],
            correctOptionIds: ['a'],
            explanationId: '"Tidak ada hal yang semenyenangkan wisata liburan musim panas" → Nほど ～はない.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w4-d3-o1',
            numberLabel: 'II-1',
            prefix: 'この小説は',
            suffix: '引き込まれる。',
            tokens: [
              { id: 1, label: 'ほど' },
              { id: 2, label: '読む' },
              { id: 3, label: '読めば' },
              { id: 4, label: 'ストーリーに' },
            ],
            correctOrder: [3, 2, 1, 4],
            explanationId: 'Urutan: 読めば 読む ほど ストーリーに (Semakin dibaca, semakin tertarik ke dalam alur ceritanya).',
          },
          {
            id: 'w4-d3-o2',
            numberLabel: 'II-2',
            prefix: '私の人生で、あのとき',
            suffix: '。',
            tokens: [
              { id: 1, label: 'ことはない' },
              { id: 2, label: 'ほど' },
              { id: 3, label: '悔しかった' },
              { id: 4, label: 'ことは' },
            ],
            correctOrder: [2, 3, 4, 1],
            explanationId: 'Lebih alami: あのとき ほど 悔しかった ことは ない (tanpa こと di slot terakhir, ubah token 1 jadi ない).',
          },
        ].map((o) =>
          o.id === 'w4-d3-o2'
            ? {
                ...o,
                prefix: '私の人生で、',
                suffix: 'なかった。',
                tokens: [
                  { id: 1, label: 'ことは' },
                  { id: 2, label: 'あのとき' },
                  { id: 3, label: '悲しかった' },
                  { id: 4, label: 'ほど' },
                ],
                correctOrder: [2, 4, 3, 1] as [number, number, number, number],
                explanationId: 'Urutan: あのとき ほど 悲しかった ことは (Selama hidupku, tidak ada saat yang sesedih waktu itu).',
              }
            : o
        ),
      },
      {
        id: 'w4-d4',
        weekNumber: 4,
        dayNumber: 4,
        titleJp: 'やってみることだ',
        titleId: 'Tidak Perlu, Saran Penting, & Rasa Kagum (ことはない・ことだ・ことか)',
        grammarPoints: [
          {
            id: 'w4-d4-g1',
            titleJp: 'Vる + ことはない',
            connectionFormula: 'Vkamus + ことはない',
            shortMeaningId: 'Tidak perlu repot-repot / tidak usah sampai...',
            easyExplanationId:
              'Dipakai untuk menenangkan lawan bicara bahwa mereka tidak perlu khawatir atau melakukan sesuatu yang berlebihan ("jangan khawatir, tidak perlu terburu-buru").',
            tipOrPitfallId:
              'Beda dengan Vたことがない (belum pernah)! Vkamus + ことはない artinya "tidak perlu ~".',
            examples: [
              {
                jp: '時間はまだたっぷりあるから、急ぐことはないよ。',
                id: 'Waktunya masih banyak sekali, jadi tidak perlu terburu-buru kok.',
              },
            ],
          },
          {
            id: 'w4-d4-g2',
            titleJp: 'Vる / Vない + ことだ',
            connectionFormula: 'Vkamus / Vない + ことだ',
            shortMeaningId: 'Yang paling penting / sebaiknya adalah... (nasihat inti)',
            easyExplanationId:
              'Memberikan saran atau kunci utama agar berhasil mencapai sesuatu ("kalau ingin lancar, kuncinya adalah banyak berbicara").',
            examples: [
              {
                jp: '外国語を上達させるには、毎日少しずつでも話すことだ。',
                id: 'Agar bahasa asing berkembang, kuncinya adalah berbicara setiap hari walau sedikit.',
              },
              {
                jp: '風邪を早く治したければ、無理をしないことだ。',
                id: 'Jika ingin pilek cepat sembuh, sebaiknya jangan memaksakan diri.',
              },
            ],
          },
          {
            id: 'w4-d4-g3',
            titleJp: '～ということだ',
            connectionFormula: 'Kalimat Biasa + ということだ',
            shortMeaningId: 'Berarti / Kabarnya... (kesimpulan logis atau berita)',
            easyExplanationId:
              'Menjelaskan makna/kesimpulan dari informasi yang baru diterima ("lampu mati, artinya belum ada orang di rumah").',
            examples: [
              {
                jp: '返事がないということは、まだ見ていないということだ。',
                id: 'Tidak ada balasan artinya dia belum melihat pesannya.',
              },
            ],
          },
          {
            id: 'w4-d4-g4',
            titleJp: 'どんなに / どれほど / なんと + ～ことか',
            connectionFormula: 'Kata Tanya (どんなに/何回/どれほど) + 普通形・naな + ことか',
            shortMeaningId: 'Betapa... -nya! (luapan emosi kuat: senang, sedih, lega, lelah)',
            easyExplanationId:
              'Menunjukkan perasaan pembicara yang sangat mendalam saat mengingat atau membayangkan sesuatu ("betapa senangnya aku saat itu!", "sudah berapa kali kuperingatkan!").',
            examples: [
              {
                jp: '合格を知ったとき、どんなにうれしかったことか！',
                id: 'Saat tahu lulus, betapa senangnya diriku!',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w4-d4-r1',
            numberLabel: 'I-1',
            promptBefore: '簡単な間違いだから、そんなに落ち込む',
            promptAfter: 'よ。',
            options: [
              { id: 'a', label: 'ことはない' },
              { id: 'b', label: 'ことだ' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menenangkan teman agar tidak perlu terlalu terpuruk → 落ち込むことはない.',
          },
          {
            id: 'w4-d4-r2',
            numberLabel: 'I-2',
            promptBefore: '試験に受かりたいなら、まず過去問を',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'やってみることだ' },
              { id: 'b', label: 'やったことはない' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Memberi saran kunci sukses → Vることだ (やってみることだ).',
          },
          {
            id: 'w4-d4-r3',
            numberLabel: 'I-3',
            promptBefore: '君が来るのを、これまでどんなに楽しみに待っていた',
            promptAfter: '！',
            options: [
              { id: 'a', label: 'ことか' },
              { id: 'b', label: 'ことだ' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Dipasangkan dengan どんなに untuk mengekspresikan perasaan mendalam → ことか.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w4-d4-o1',
            numberLabel: 'II-1',
            prefix: '健康を守るためには、夜遅くまで',
            suffix: '。',
            tokens: [
              { id: 1, label: 'ない' },
              { id: 2, label: 'こと' },
              { id: 3, label: '起きてい' },
              { id: 4, label: 'だ' },
            ],
            correctOrder: [3, 1, 2, 4],
            explanationId: 'Urutan: 起きてい ない こと だ (Sebaiknya tidak begadang sampai larut malam).',
          },
          {
            id: 'w4-d4-o2',
            numberLabel: 'II-2',
            prefix: 'みんなが',
            suffix: 'うれしいことか。',
            tokens: [
              { id: 1, label: 'どれほど' },
              { id: 2, label: 'くれて' },
              { id: 3, label: '手伝って' },
              { id: 4, label: '本当に' },
            ],
            correctOrder: [3, 2, 1, 4],
            explanationId: 'Agar どれほど dan うれしい dekat: 手伝って くれて 本当に どれほど うれしいことか.',
          },
        ].map((o) =>
          o.id === 'w4-d4-o2'
            ? {
                ...o,
                prefix: 'みんなが親切にしてくれて、',
                suffix: '！',
                tokens: [
                  { id: 1, label: 'ありがたかった' },
                  { id: 2, label: 'こと' },
                  { id: 3, label: 'どんなに' },
                  { id: 4, label: 'か' },
                ],
                correctOrder: [3, 1, 2, 4] as [number, number, number, number],
                explanationId: 'Urutan: どんなに ありがたかった こと か (Betapa bersyukurnya diriku!).',
              }
            : o
        ),
      },
      {
        id: 'w4-d5',
        weekNumber: 4,
        dayNumber: 5,
        titleJp: '聞いてみるしかない',
        titleId: 'Satu-satunya Jalan & Ungkapan Percakapan (だっけ・しかない・って・もん)',
        grammarPoints: [
          {
            id: 'w4-d5-g1',
            titleJp: '～だっけ？ / ～たっけ？',
            connectionFormula: 'N・na + だっけ ｜ Vた / Aかった + っけ',
            registerTag: 'Lisan',
            shortMeaningId: 'Tadi apa ya...? / Bukankah dulu...? (memastikan ingatan sendiri)',
            easyExplanationId:
              'Dipakai saat lupa sesuatu yang seharusnya sudah kita ketahui dan ingin memastikan ("Eh, jadwalnya jam berapa ya?", "Nama restoran itu apa ya?").',
            examples: [
              {
                jp: 'あれ、明日の集合時間は9時だっけ？',
                id: 'Eh, jam kumpul besok jam 9 kan ya?',
              },
            ],
          },
          {
            id: 'w4-d5-g2',
            titleJp: 'Vる + しかない',
            connectionFormula: 'Vkamus + しかない',
            shortMeaningId: 'Tidak ada cara lain selain... / Mau tidak mau harus...',
            easyExplanationId:
              'Digunakan saat merasa sudah buntu dan hanya tinggal satu pilihan tindakan yang tersisa ("kereta terakhir sudah lewat, mau tidak mau jalan kaki").',
            examples: [
              {
                jp: '終電が行ってしまったから、タクシーで帰るしかない。',
                id: 'Karena kereta terakhir sudah lewat, mau tidak mau harus pulang naik taksi.',
              },
            ],
          },
          {
            id: 'w4-d5-g3',
            titleJp: '～（んだ）って（＝～そうだ）',
            connectionFormula: 'Kalimat Biasa / N(tanpa だ) + って ｜ + んだって',
            registerTag: 'Lisan',
            shortMeaningId: 'Katanya... (kabar burung dalam percakapan santai)',
            easyExplanationId:
              'Versi santai dari ～そうだ / ～と言っていた. Sangat sering muncul di JLPT N3 Choukai! Contoh: 「来月結婚するんだって！」 = "Katanya bulan depan mau nikah lho!"',
            examples: [
              {
                jp: '明日は台風で学校が休みになるんだって。',
                id: 'Katanya besok sekolah libur karena ada topan.',
              },
            ],
          },
          {
            id: 'w4-d5-g4',
            titleJp: '～（んだ）もん（＝～もの）',
            connectionFormula: 'Kalimat Biasa + もん / んだもん',
            registerTag: 'Lisan',
            shortMeaningId: 'Habisnya... sih! (alasan membela diri secara santai/agak manja)',
            easyExplanationId:
              'Versi lisan dari ～のだもの. Dipakai anak-anak, teman akrab, atau pasangan saat memberi alasan mengapa melakukan atau tidak melakukan sesuatu.',
            examples: [
              {
                jp: '「どうして食べないの？」「だって、おなかがいっぱいなんだもん。」',
                id: '"Kenapa nggak dimakan?" "Habisnya aku sudah kenyang sih."',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w4-d5-r1',
            numberLabel: 'I-1',
            promptBefore: '田中さんの電話番号、何番',
            promptAfter: '？',
            options: [
              { id: 'a', label: 'だっけ' },
              { id: 'b', label: 'もん' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Berusaha mengingat kembali nomor telepon yang pernah tahu → 何番だっけ？.',
          },
          {
            id: 'w4-d5-r2',
            numberLabel: 'I-2',
            promptBefore: '誰も助けてくれないから、自分でやってみる',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'しかない' },
              { id: 'b', label: 'だけしかない' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Kata kerja bentuk kamus + しかない berarti "satu-satunya jalan harus mencoba sendiri".',
          },
          {
            id: 'w4-d5-r3',
            numberLabel: 'I-3',
            promptBefore: '佐藤さん、来月から大阪の支店に転勤する',
            promptAfter: 'よ。',
            options: [
              { id: 'a', label: 'んだって' },
              { id: 'b', label: 'だっけ' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menyampaikan kabar yang didengar dari orang lain secara santai → んだって.',
          },
          {
            id: 'w4-d5-r4',
            numberLabel: 'I-4',
            promptBefore: 'だって、こんなに難しくてはできるはずがない',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'んだもん' },
              { id: 'b', label: 'しかない' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Didahului だって (habisnya...) dan bernada membela diri → んだもん.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w4-d5-o1',
            numberLabel: 'II-1',
            prefix: '道に迷ってしまって、誰かに',
            suffix: '。',
            tokens: [
              { id: 1, label: 'しか' },
              { id: 2, label: '聞いて' },
              { id: 3, label: 'ない' },
              { id: 4, label: 'みる' },
            ],
            correctOrder: [2, 4, 1, 3],
            explanationId: 'Urutan: 聞いて みる しか ない (tidak ada jalan lain selain mencoba bertanya kepada seseorang).',
          },
          {
            id: 'w4-d5-o2',
            numberLabel: 'II-2',
            prefix: 'この間のパーティー、',
            suffix: '？',
            tokens: [
              { id: 1, label: 'っけ' },
              { id: 2, label: '何人' },
              { id: 3, label: '来た' },
              { id: 4, label: 'くらい' },
            ],
            correctOrder: [2, 4, 3, 1],
            explanationId: 'Urutan: 何人 くらい 来た っけ (Kira-kira berapa orang ya yang datang waktu pesta kemarin?).',
          },
        ],
      },
      {
        id: 'w4-d6',
        weekNumber: 4,
        dayNumber: 6,
        titleJp: 'つまり…',
        titleId: 'Konjungsi Wacana: Kesimpulan, Akibat, & Penjelasan Alasan (つまり・そのため・その結果・なぜなら)',
        grammarPoints: [
          {
            id: 'w4-d6-g1',
            titleJp: 'つまり（言い換え・まとめ）',
            connectionFormula: 'Kalimat 1。つまり、Kalimat 2（kesimpulan singkat）',
            shortMeaningId: 'Dengan kata lain / Singkatnya / Artinya...',
            easyExplanationId:
              'Dipakai untuk menyederhanakan atau menyimpulkan kalimat sebelumnya agar inti maksudnya lebih mudah dipahami.',
            examples: [
              {
                jp: '彼は私の母の弟だ。つまり、私のおじにあたる。',
                id: 'Dia adik laki-laki ibuku. Dengan kata lain, dia pamanku.',
              },
            ],
          },
          {
            id: 'w4-d6-g2',
            titleJp: 'そのため（に）/ その結果',
            connectionFormula: 'Sebab/Usaha。そのため(に) / その結果、Akibat',
            shortMeaningId: 'Oleh karena itu / Sebagai hasilnya...',
            easyExplanationId:
              '1) そのため(に): menjelaskan akibat dari sebab alami atau masalah di kalimat pertama (lebih formal dari だから). 2) その結果: menunjukkan hasil setelah melakukan proses atau upaya tertentu.',
            examples: [
              {
                jp: '朝から大雪が降った。そのため、電車が止まってしまった。',
                id: 'Sejak pagi turun salju lebat. Oleh karena itu, kereta berhenti beroperasi.',
              },
              {
                jp: '毎日欠かさず練習した。その結果、ついに優勝することができた。',
                id: 'Ia berlatih setiap hari tanpa absen. Hasilnya, ia akhirnya berhasil juara.',
              },
            ],
          },
          {
            id: 'w4-d6-g3',
            titleJp: 'なぜなら（ば）/ なぜかというと / どうしてかというと ～からだ',
            connectionFormula: 'Kesimpulan。なぜなら / なぜかというと ～からだ。',
            shortMeaningId: 'Mengapa demikian? Karena...',
            easyExplanationId:
              'Mengemukakan pendapat atau fakta dulu di kalimat pertama, lalu menjelaskan alasannya di kalimat kedua. Hampir selalu ditutup dengan 「～からだ / ～からです」!',
            examples: [
              {
                jp: '私は朝ごはんを欠かさず食べます。なぜかというと、午前中の仕事に集中できるからです。',
                id: 'Saya selalu makan pagi tanpa terlewat. Mengapa demikian? Karena itu membuat saya bisa fokus bekerja di pagi hari.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w4-d6-r1',
            numberLabel: 'I-1',
            promptBefore: '今日は日曜日だが、祝日の振替休日ではない。',
            promptAfter: '、明日は普通に仕事があるということだ。',
            options: [
              { id: 'a', label: 'つまり' },
              { id: 'b', label: 'その結果' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menyimpulkan dengan kata lain maksud dari kalimat sebelumnya → つまり.',
          },
          {
            id: 'w4-d6-r2',
            numberLabel: 'I-2',
            promptBefore: '最近この地域では人口が増えている。',
            promptAfter: '、新しい小学校が建てられることになった。',
            options: [
              { id: 'a', label: 'そのため' },
              { id: 'b', label: 'なぜなら' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menghubungkan sebab (populasi bertambah) dengan akibat (dibangun SD baru) → そのため.',
          },
          {
            id: 'w4-d6-r3',
            numberLabel: 'I-3',
            promptBefore: '3か月間お菓子をやめて毎日走った。',
            promptAfter: '、5キロやせることができた。',
            options: [
              { id: 'a', label: 'その結果' },
              { id: 'b', label: 'つまり' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menunjukkan hasil dari sebuah usaha/proses 3 bulan → その結果.',
          },
          {
            id: 'w4-d6-r4',
            numberLabel: 'I-4',
            promptBefore: '私はこの駅に近いアパートを選んだ。',
            promptAfter: '、雨の日でも傘なしで通勤できるからだ。',
            options: [
              { id: 'a', label: 'なぜなら' },
              { id: 'b', label: 'そのため' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Kalimat ditutup dengan ～からだ, jadi konjungsi pembuka alasannya adalah なぜなら.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w4-d6-o1',
            numberLabel: 'II-1',
            prefix: '彼はよく図書館で勉強している。',
            suffix: '。',
            tokens: [
              { id: 1, label: '集中できる' },
              { id: 2, label: '家より' },
              { id: 3, label: 'なぜかというと' },
              { id: 4, label: 'からだ' },
            ],
            correctOrder: [3, 2, 1, 4],
            explanationId: 'Urutan: なぜかというと 家より 集中できる からだ (Karena di sana bisa lebih fokus daripada di rumah).',
          },
          {
            id: 'w4-d6-o2',
            numberLabel: 'II-2',
            prefix: '深夜まで大雨が降り続いた。',
            suffix: '止まってしまった。',
            tokens: [
              { id: 1, label: '道路が' },
              { id: 2, label: 'そのため' },
              { id: 3, label: '通れなくなり' },
              { id: 4, label: 'バスも' },
            ],
            correctOrder: [2, 1, 3, 4],
            explanationId: 'Urutan: そのため 道路が 通れなくなり バスも (Oleh karena itu jalan tidak bisa dilewati dan bus pun berhenti).',
          },
        ],
      },
    ],
    jissen: {
      id: 'w4-d7',
      weekNumber: 4,
      dayNumber: 7,
      titleJp: '第4週 実践問題',
      titleId: 'Latihan Ujian Mingguan (Minggu 4)',
      timeLimitMin: 15,
      mondai3PassageTitleJp: '外国語の勉強法',
      mondai3PassageLines: [
        '先日、日本語のクラスで「どうすれば漢字が覚えられるか」という話し合いをした。私 [ 21 ]、漢字は形が複雑で、覚えるのが本当に大変だ。',
        'クラスメートのリンさんは、毎日10個ずつノートに書いて練習したそうだ。[ 22 ]、半年で300字以上の漢字が読めるようになったという。私が「大変じゃないですか」と聞くと、彼女は「大変だ [ 23 ]、一度覚えると新聞や看板が読めて楽しくなるよ」と笑顔で答えた。',
        '話を聞いて、私もあきらめないで毎日少しずつ練習を続けてみる [ 24 ] と思った。[ 25 ]、毎日続けることが上達への一番の近道だからだ。',
      ],
      questions: [
        {
          id: 'w4-j-1',
          number: 1,
          type: 'mondai1_mcq',
          promptJp: '家族（　　）、健康で楽しく暮らせることが一番幸せだ。',
          options: [
            { id: '1', label: 'にとって' },
            { id: '2', label: 'について' },
            { id: '3', label: 'によって' },
            { id: '4', label: 'にかわって' },
          ],
          correctOptionId: '1',
          explanationId: 'Menyatakan sudut pandang "Bagi keluarga..." → にとって.',
        },
        {
          id: 'w4-j-2',
          number: 2,
          type: 'mondai1_mcq',
          promptJp: 'このマンションは古い（　　）、部屋の中はとてもきれいだ。',
          options: [
            { id: '1', label: 'くせに' },
            { id: '2', label: 'わりに' },
            { id: '3', label: 'せいで' },
            { id: '4', label: 'おかげで' },
          ],
          correctOptionId: '2',
          explanationId: 'Memuji kondisi kamar yang bersih meskipun bangunannya tua → わりに.',
        },
        {
          id: 'w4-j-3',
          number: 3,
          type: 'mondai1_mcq',
          promptJp: '弟は自分が失敗した（　　）、人のせいにばかりする。',
          options: [
            { id: '1', label: 'わりに' },
            { id: '2', label: 'おかげで' },
            { id: '3', label: 'くせに' },
            { id: '4', label: 'ために' },
          ],
          correctOptionId: '3',
          explanationId: 'Nada kesal/kritik pada adik yang menyalahkan orang lain padahal dirinya sendiri yang salah → くせに.',
        },
        {
          id: 'w4-j-4',
          number: 4,
          type: 'mondai1_mcq',
          promptJp: '友だちが応援してくれた（　　）、最後まで走りきることができた。',
          options: [
            { id: '1', label: 'せいで' },
            { id: '2', label: 'おかげで' },
            { id: '3', label: 'かわりに' },
            { id: '4', label: 'くせに' },
          ],
          correctOptionId: '2',
          explanationId: 'Berhasil lari sampai garis akhir berkat dukungan teman (hasil baik) → おかげで.',
        },
        {
          id: 'w4-j-5',
          number: 5,
          type: 'mondai1_mcq',
          promptJp: 'きのう冷たいものを食べすぎた（　　）、おなかの調子が悪い。',
          options: [
            { id: '1', label: 'おかげで' },
            { id: '2', label: 'せいで' },
            { id: '3', label: 'わりに' },
            { id: '4', label: 'かわりに' },
          ],
          correctOptionId: '2',
          explanationId: 'Perut sakit karena kebanyakan makan dingin (hasil buruk) → せいで.',
        },
        {
          id: 'w4-j-6',
          number: 6,
          type: 'mondai1_mcq',
          promptJp: '出張中の課長（　　）、私がお客様をお迎えすることになった。',
          options: [
            { id: '1', label: 'にかわって' },
            { id: '2', label: 'にとって' },
            { id: '3', label: 'にくらべて' },
            { id: '4', label: 'について' },
          ],
          correctOptionId: '1',
          explanationId: 'Menggantikan posisi/tugas kepala seksi yang dinas → にかわって.',
        },
        {
          id: 'w4-j-7',
          number: 7,
          type: 'mondai1_mcq',
          promptJp: '漢字は書けば（　　）ほど、しっかり覚えられるものだ。',
          options: [
            { id: '1', label: '書いた' },
            { id: '2', label: '書いている' },
            { id: '3', label: '書く' },
            { id: '4', label: '書こう' },
          ],
          correctOptionId: '3',
          explanationId: 'Pola Vば + Vるほど → 書けば書くほど.',
        },
        {
          id: 'w4-j-8',
          number: 8,
          type: 'mondai1_mcq',
          promptJp: '旅行は人数が（　　）多いほど、にぎやかで楽しい。',
          options: [
            { id: '1', label: '多ければ' },
            { id: '2', label: '多いなら' },
            { id: '3', label: '多くても' },
            { id: '4', label: '多いくらい' },
          ],
          correctOptionId: '1',
          explanationId: 'Kata sifat-i 多い + ば → 多ければ多いほど.',
        },
        {
          id: 'w4-j-9',
          number: 9,
          type: 'mondai1_mcq',
          promptJp: '自分の国にいる家族（　　）大切な存在はない。',
          options: [
            { id: '1', label: 'ばかり' },
            { id: '2', label: 'しか' },
            { id: '3', label: 'ほど' },
            { id: '4', label: 'だけ' },
          ],
          correctOptionId: '3',
          explanationId: '"Tidak ada yang sepenting keluarga di kampung halaman" → Nほど ～はない.',
        },
        {
          id: 'w4-j-10',
          number: 10,
          type: 'mondai1_mcq',
          promptJp: 'まだ締め切りまで1週間あるから、そんなに慌てる（　　）。',
          options: [
            { id: '1', label: 'ことだ' },
            { id: '2', label: 'ことはない' },
            { id: '3', label: 'ことか' },
            { id: '4', label: 'しかない' },
          ],
          correctOptionId: '2',
          explanationId: 'Masih ada waktu seminggu, tidak perlu panik → 慌てることはない.',
        },
        {
          id: 'w4-j-11',
          number: 11,
          type: 'mondai1_mcq',
          promptJp: '合格した知らせを聞いたとき、母はどんなに喜んだ（　　）！',
          options: [
            { id: '1', label: 'ことだ' },
            { id: '2', label: 'ことはない' },
            { id: '3', label: 'ことか' },
            { id: '4', label: 'っけ' },
          ],
          correctOptionId: '3',
          explanationId: 'Dipasangkan dengan どんなに untuk mengekspresikan rasa haru/senang → 喜んだことか！.',
        },
        {
          id: 'w4-j-12',
          number: 12,
          type: 'mondai1_mcq',
          promptJp: 'あれ、山田さんの誕生日、今週の土曜日（　　）？',
          options: [
            { id: '1', label: 'だっけ' },
            { id: '2', label: 'もん' },
            { id: '3', label: 'ほど' },
            { id: '4', label: 'ことか' },
          ],
          correctOptionId: '1',
          explanationId: 'Mengecek kembali ingatan secara santai ("hari Sabtu ya kan?") → だっけ？.',
        },
        {
          id: 'w4-j-13',
          number: 13,
          type: 'mondai1_mcq',
          promptJp: 'バスがもう終わってしまったので、歩いて帰る（　　）。',
          options: [
            { id: '1', label: 'ことはない' },
            { id: '2', label: 'しかない' },
            { id: '3', label: 'くせに' },
            { id: '4', label: 'ばかりだ' },
          ],
          correctOptionId: '2',
          explanationId: 'Tidak ada pilihan lain selain jalan kaki → 帰るしかない.',
        },
        {
          id: 'w4-j-14',
          number: 14,
          type: 'mondai1_mcq',
          promptJp: '駅前に新しいケーキ屋さんができたらしい。すごくおいしい（　　）よ。',
          options: [
            { id: '1', label: 'んだって' },
            { id: '2', label: 'だっけ' },
            { id: '3', label: 'んだもん' },
            { id: '4', label: 'しかない' },
          ],
          correctOptionId: '1',
          explanationId: 'Kabar burung dari orang lain secara santai ("katanya enak banget lho") → んだって.',
        },
        {
          id: 'w4-j-15',
          number: 15,
          type: 'mondai1_mcq',
          promptJp: '彼は日本人の父とアメリカ人の母を持つ。（　　）、二つの言語が話せる。',
          options: [
            { id: '1', label: 'なぜなら' },
            { id: '2', label: 'そのため' },
            { id: '3', label: 'つまり' },
            { id: '4', label: 'そのかわり' },
          ],
          correctOptionId: '2',
          explanationId: 'Sebab (punya ayah Jepang & ibu Amerika) → akibat (bisa dua bahasa) → そのため.',
        },
        {
          id: 'w4-j-16',
          number: 16,
          type: 'mondai2_star',
          starPrefix: 'この料理は材料が',
          starSuffix: 'とてもおいしい。',
          starSlotIndex: 1,
          options: [
            { id: '1', label: 'わりに' },
            { id: '2', label: 'シンプルな' },
            { id: '3', label: 'には' },
            { id: '4', label: '、' },
          ],
          correctOptionId: '1',
          correctOrderIds: ['2', '1', '3', '4'],
          explanationId: 'Urutan: シンプルな (2) わりに ★ (1) には (3) 、(4) とてもおいしい.',
        },
        {
          id: 'w4-j-17',
          number: 17,
          type: 'mondai2_star',
          starPrefix: '今度の休みに、',
          starSuffix: 'ませんか。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: '映画' },
            { id: '2', label: '一緒に' },
            { id: '3', label: 'なんか' },
            { id: '4', label: '見に行き' },
          ],
          correctOptionId: '2',
          correctOrderIds: ['1', '3', '2', '4'],
          explanationId: 'Urutan: 映画 (1) なんか (3) 一緒に ★ (2) 見に行き (4) ませんか.',
        },
        {
          id: 'w4-j-18',
          number: 18,
          type: 'mondai2_star',
          starPrefix: '外国語を上達させるには、',
          starSuffix: 'だ。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: 'こと' },
            { id: '2', label: '恥をかいても' },
            { id: '3', label: '話してみる' },
            { id: '4', label: '積極的に' },
          ],
          correctOptionId: '3',
          correctOrderIds: ['2', '4', '3', '1'],
          explanationId: 'Urutan: 恥をかいても (2) 積極的に (4) 話してみる ★ (3) こと (1) だ.',
        },
        {
          id: 'w4-j-19',
          number: 19,
          type: 'mondai2_star',
          starPrefix: 'この仕事は給料が高いが、',
          starSuffix: 'とても忙しい。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: '休みが' },
            { id: '2', label: '少なくて' },
            { id: '3', label: 'そのかわり' },
            { id: '4', label: '、' },
          ],
          correctOptionId: '1',
          correctOrderIds: ['3', '4', '1', '2'],
          explanationId: 'Urutan: そのかわり (3) 、(4) 休みが ★ (1) 少なくて (2) とても忙しい.',
        },
        {
          id: 'w4-j-20',
          number: 20,
          type: 'mondai2_star',
          starPrefix: '兄はいつも口だけで、',
          starSuffix: '。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: '手伝おう' },
            { id: '2', label: 'としない' },
            { id: '3', label: '何も' },
            { id: '4', label: 'まったく' },
          ],
          correctOptionId: '1',
          correctOrderIds: ['4', '3', '1', '2'],
          explanationId: 'Urutan: まったく (4) 何も (3) 手伝おう ★ (1) としない (2).',
        },
        {
          id: 'w4-j-21',
          number: 21,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'にとって' },
            { id: '2', label: 'について' },
            { id: '3', label: 'にかわって' },
            { id: '4', label: 'として' },
          ],
          correctOptionId: '1',
          explanationId: 'Sudut pandang pembicara: "Bagi saya, kanji itu rumit dan sulit dihafal" → 私にとって.',
        },
        {
          id: 'w4-j-22',
          number: 22,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'その結果' },
            { id: '2', label: 'つまり' },
            { id: '3', label: 'なぜなら' },
            { id: '4', label: 'そのかわり' },
          ],
          correctOptionId: '1',
          explanationId: 'Hasil setelah menulis 10 kanji tiap hari selama setengah tahun → その結果.',
        },
        {
          id: 'w4-j-23',
          number: 23,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'し' },
            { id: '2', label: 'せいで' },
            { id: '3', label: 'けれど' },
            { id: '4', label: 'ばかり' },
          ],
          correctOptionId: '3',
          explanationId: 'Pertentangan halus: "Memang berat sih, tapi sekali hafal jadi menyenangkan" → 大変だけれど.',
        },
        {
          id: 'w4-j-24',
          number: 24,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'しかない' },
            { id: '2', label: 'ことはない' },
            { id: '3', label: 'ことか' },
            { id: '4', label: 'くせに' },
          ],
          correctOptionId: '1',
          explanationId: 'Tekad bulat: "Saya pikir tidak ada cara lain selain terus mencoba berlatih sedikit demi sedikit setiap hari" → 続けてみるしかない.',
        },
        {
          id: 'w4-j-25',
          number: 25,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'そのため' },
            { id: '2', label: 'なぜかというと' },
            { id: '3', label: 'その結果' },
            { id: '4', label: 'そのかわり' },
          ],
          correctOptionId: '2',
          explanationId: 'Kalimat ditutup dengan ～からだ, sehingga konjungsi pembuka alasannya adalah なぜかというと.',
        },
      ],
      keigoTip: {
        titleJp: '敬語②：いたす（謙譲語）と なさる（尊敬語）',
        summaryId:
          'Pelajaran Keigo Minggu 4: Padanan sopan untuk 「する」 (melakukan) dan akhiran perintah lembut 「～てください」 versi sangat sopan.',
        pairs: [
          {
            plain: 'する (untuk diri sendiri/perusahaan)',
            honorificOrHumble: 'いたす (謙譲語・丁重語)',
            meaningId: 'Melakukan (merendah untuk diri sendiri)',
            exampleJp: '明日の会議の準備は私がいたします。',
          },
          {
            plain: 'する (untuk atasan/tamu)',
            honorificOrHumble: 'なさる (尊敬語)',
            meaningId: 'Melakukan (menghormati orang lain)',
            exampleJp: '先生はもう昼ごはんをお召し上がりになりましたか。/ どうなさいますか。',
          },
          {
            plain: '～てください (sangat sopan)',
            honorificOrHumble: 'Vます + なさってください / ご〜ください',
            meaningId: 'Silakan melakukan (sopan)',
            exampleJp: '無理をなさいませんように。',
          },
        ],
      },
    },
  },
];
