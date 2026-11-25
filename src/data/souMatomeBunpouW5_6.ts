import type { SouMatomeWeek } from '../types/jlpt';

export const SOU_MATOME_W5_6: SouMatomeWeek[] = [
  {
    weekNumber: 5,
    titleJp: '第5週 もっとがんばればよかった！',
    themeId: 'Penambahan & Kontras, Kata Kerja Majemuk, Penyesalan/Harapan, Waktu/Tempat, & Pengandaian',
    days: [
      {
        id: 'w5-d1',
        weekNumber: 5,
        dayNumber: 1,
        titleJp: '子どもばかりか',
        titleId: 'Bukan Hanya & Perbandingan Kontras (もちろん・ばかりか・に比べて・に対して)',
        grammarPoints: [
          {
            id: 'w5-d1-g1',
            titleJp: 'N1 + はもちろん + N2 + も',
            connectionFormula: 'N1(hal yang jelas) + はもちろん + N2(hal tambahan) + も',
            shortMeaningId: 'Tentu saja N1, bahkan N2 juga...',
            easyExplanationId:
              'Memperkenalkan hal yang sudah pasti (N1), lalu menambahkan hal lain (N2) yang setara atau lebih luas ("tentu saja anak-anak, orang dewasa pun suka anime ini").',
            examples: [
              {
                jp: 'この映画は子どもはもちろん、大人にも大人気だ。',
                id: 'Film ini tentu saja anak-anak, bagi orang dewasa pun sangat populer.',
              },
            ],
          },
          {
            id: 'w5-d1-g2',
            titleJp: '～ばかりか…（も） / ばかりでなく',
            connectionFormula: 'V普通・Aい・naな・N + ばかりか / ばかりでなく ～(も・さえ)',
            shortMeaningId: 'Bukan hanya..., tetapi juga...',
            easyExplanationId:
              'Lebih kuat dan bernuansa terkejut dibanding だけでなく ("bukan hanya bahasa Inggris, bahasa Jepang dan Mandarin pun fasih!"). Bisa juga hal negatif ("bukan hanya tidak minta maaf, malah marah").',
            examples: [
              {
                jp: '彼は日本語ばかりか、中国語や韓国語も話せる。',
                id: 'Dia bukan hanya bahasa Jepang, tetapi juga bisa berbicara bahasa Mandarin dan Korea.',
              },
            ],
          },
          {
            id: 'w5-d1-g3',
            titleJp: 'N + に比べて / 比べ',
            connectionFormula: 'N1 + は + N2 + に比べて（比べ）',
            shortMeaningId: 'Dibandingkan dengan N2...',
            easyExplanationId:
              'Membandingkan dua hal untuk menunjukkan perbedaan jumlah, harga, suhu, atau kemampuan ("dibandingkan tahun lalu, musim panas ini lebih sejuk").',
            examples: [
              {
                jp: '去年に比べて、今年は台風が少ない。',
                id: 'Dibandingkan tahun lalu, tahun ini topannya lebih sedikit.',
              },
            ],
          },
          {
            id: 'w5-d1-g4',
            titleJp: 'N + に対して / 対する N',
            connectionFormula: 'N + に対して ｜ N + に対する + N2',
            shortMeaningId: 'Terhadap (sikap) / Berbanding terbalik dengan...',
            easyExplanationId:
              'Punya dua arti: (1) Sikap atau tindakan tertuju kepada siapa ("ramah terhadap tamu", "pertanyaan terhadap aturan baru"), dan (2) Kontras dua sisi ("kakak rajin, sebaliknya adik malas").',
            examples: [
              {
                jp: '店員はお客さんに対して丁寧な言葉で話すべきだ。',
                id: 'Pegawai toko seharusnya berbicara dengan bahasa sopan terhadap pelanggan.',
              },
              {
                jp: '活発な姉に対して、妹はおとなしい性格だ。',
                id: 'Berkebalikan dengan kakaknya yang aktif, sang adik berkepribadian pendiam.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w5-d1-r1',
            numberLabel: 'I-1',
            promptBefore: '漢字',
            promptAfter: '、ひらがなもまだ全部覚えられていない。',
            options: [
              { id: 'a', label: 'はもちろん' },
              { id: 'b', label: 'に対して' },
            ],
            correctOptionIds: ['a'],
            explanationId: '"Kanji tentu saja (apalagi), hiragana saja belum hafal semua" → はもちろん.',
          },
          {
            id: 'w5-d1-r2',
            numberLabel: 'I-2',
            promptBefore: '弟は野菜',
            promptAfter: '、果物もほとんど食べない。',
            options: [
              { id: 'a', label: 'ばかりか' },
              { id: 'b', label: 'に比べて' },
            ],
            correctOptionIds: ['a'],
            explanationId: '"Bukan hanya sayur, buah-buahan pun hampir tidak makan" → ばかりか.',
          },
          {
            id: 'w5-d1-r3',
            numberLabel: 'I-3',
            promptBefore: '東京',
            promptAfter: '、私のふるさとには高いビルがほとんどない。',
            options: [
              { id: 'a', label: 'に比べて' },
              { id: 'b', label: 'ばかりか' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Membandingkan Tokyo dengan kampung halaman → 東京に比べて.',
          },
          {
            id: 'w5-d1-r4',
            numberLabel: 'I-4',
            promptBefore: '新しいルール',
            promptAfter: '、学生から多くの反対意見が出た。',
            options: [
              { id: 'a', label: 'に対して' },
              { id: 'b', label: 'はもちろん' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Pendapat yang ditujukan terhadap aturan baru → に対して.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w5-d1-o1',
            numberLabel: 'II-1',
            prefix: 'この仕事は',
            suffix: 'とても大変です。',
            tokens: [
              { id: 1, label: '体力的にも' },
              { id: 2, label: 'ばかりか' },
              { id: 3, label: '時間が' },
              { id: 4, label: '長い' },
            ],
            correctOrder: [3, 4, 2, 1],
            explanationId: 'Urutan: 時間が 長い ばかりか 体力的にも (Bukan hanya waktunya lama, secara fisik juga sangat berat).',
          },
          {
            id: 'w5-d1-o2',
            numberLabel: 'II-2',
            prefix: '先週は毎日雨だったが、それに',
            suffix: '。',
            tokens: [
              { id: 1, label: 'いい天気が' },
              { id: 2, label: '比べて' },
              { id: 3, label: '今週は' },
              { id: 4, label: '続いている' },
            ],
            correctOrder: [2, 3, 1, 4],
            explanationId: 'Urutan: (それに) 比べて 今週は いい天気が 続いている (Dibandingkan minggu lalu, minggu ini cuaca cerah terus berlangsung).',
          },
        ],
      },
      {
        id: 'w5-d2',
        weekNumber: 5,
        dayNumber: 2,
        titleJp: '炊きたて',
        titleId: 'Akhiran Kata Kerja Majemuk (上がる・切る・かける・たて)',
        grammarPoints: [
          {
            id: 'w5-d2-g1',
            titleJp: 'Vます + 上げる / 上がる',
            connectionFormula: 'Vます (tanpa ます) + 上げる (transitif) / 上がる (intransitif)',
            shortMeaningId: 'Selesai dibuat sepenuhnya / rampung sempurna',
            easyExplanationId:
              'Menunjukkan proses membuat/menulis/membangun selesai sampai akhir (書き上げる = selesai menulis; 出来上がる = kue/karya sudah matang jadi!).',
            examples: [
              {
                jp: 'やっと卒業論文を書き上げた！',
                id: 'Akhirnya skripsi selesai saya tulis!',
              },
              {
                jp: 'おいしいパンが焼き上がりましたよ。',
                id: 'Roti lezat sudah matang terpanggang lho.',
              },
            ],
          },
          {
            id: 'w5-d2-g2',
            titleJp: 'Vます + 切る / 切れる / 切れない',
            connectionFormula: 'Vます + 切る (tuntas) / 切れる (sanggup tuntas) / 切れない (tidak sanggup habis)',
            shortMeaningId: 'Sampai habis tuntas / Terlalu banyak sehingga tidak sanggup menyelesaikan semua',
            easyExplanationId:
              '1) Vます切る = melakukan sampai titik akhir (42km 走りきる = lari sampai finis; 信じきる = percaya 100%). 2) Vます切れない = jumlahnya terlalu banyak/besar sampai tak habis dihitung/dimakan/dibawa.',
            examples: [
              {
                jp: 'こんなにたくさんの料理は、一人では食べきれない。',
                id: 'Masakan sebanyak ini tidak sanggup dihabiskan sendirian.',
              },
              {
                jp: '彼女は苦しい練習を乗り越えて、最後まで走りきった。',
                id: 'Ia melewati latihan berat dan berhasil berlari hingga garis finis.',
              },
            ],
          },
          {
            id: 'w5-d2-g3',
            titleJp: 'Vます + かける / かけの N / かけだ',
            connectionFormula: 'Vます + かける / かけの + N',
            shortMeaningId: 'Baru mulai setengah jalan (belum selesai) / Hampir hampir...',
            easyExplanationId:
              'Menggambarkan benda/aksi yang berhenti di tengah jalan ("kopi yang baru diminum setengah: 飲みかけ", "buku yang baru dibaca separuh: 読みかけ") atau hal yang nyaris terjadi ("lampu hampir mati").',
            examples: [
              {
                jp: '机の上に読みかけの本が置いてある。',
                id: 'Di atas meja tergeletak buku yang baru dibaca setengah.',
              },
            ],
          },
          {
            id: 'w5-d2-g4',
            titleJp: 'Vます + たての N / たてだ',
            connectionFormula: 'Vます + たて (hanya pada kata kerja seperti 焼く・作る・炊く・採る・入る)',
            shortMeaningId: 'Baru saja matang / dipetik / jadi (segar hangat!)',
            easyExplanationId:
              'Khusus menonjolkan kesegaran atau kondisi baru saja terjadi ("nasi baru matang mengepul / 炊きたて", "roti baru keluar dari oven / 焼きたて", "karyawan baru masuk / 入社したて").',
            examples: [
              {
                jp: '炊きたてのごはんは本当においしいですね。',
                id: 'Nasi yang baru saja matang benar-benar enak ya.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w5-d2-r1',
            numberLabel: 'I-1',
            promptBefore: '注文したスーツが来週',
            promptAfter: '予定だ。',
            options: [
              { id: 'a', label: '出来上がる' },
              { id: 'b', label: '出来かける' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Setelan jas dijadwalkan "selesai dibuat" minggu depan → 出来上がる.',
          },
          {
            id: 'w5-d2-r2',
            numberLabel: 'I-2',
            promptBefore: '冷蔵庫に入り',
            promptAfter: 'ほどたくさん食べ物を買ってしまった。',
            options: [
              { id: 'a', label: 'きれない' },
              { id: 'b', label: 'たて' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Tidak muat seluruhnya masuk ke dalam kulkas → 入りきれない.',
          },
          {
            id: 'w5-d2-r3',
            numberLabel: 'I-3',
            promptBefore: '子どもが',
            promptAfter: 'のリンゴをテーブルに置いたまま遊びに行った。',
            options: [
              { id: 'a', label: '食べかけ' },
              { id: 'b', label: '食べたて' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Apel yang baru dimakan setengah dan ditinggal main → 食べかけのリンゴ.',
          },
          {
            id: 'w5-d2-r4',
            numberLabel: 'I-4',
            promptBefore: 'このケーキは',
            promptAfter: 'だから、まだ温かくておいしいですよ。',
            options: [
              { id: 'a', label: '焼きたて' },
              { id: 'b', label: '焼きかけ' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Masih hangat karena baru saja matang dipanggang → 焼きたて.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w5-d2-o1',
            numberLabel: 'II-1',
            prefix: 'このパン屋さんの',
            suffix: '香りがする。',
            tokens: [
              { id: 1, label: 'の' },
              { id: 2, label: 'とても' },
              { id: 3, label: 'パンは' },
              { id: 4, label: '焼きたて' },
            ],
            correctOrder: [4, 1, 3, 2],
            explanationId: 'Urutan: 焼きたて の パンは とても (いい)香りがする. Tambah いい di suffix agar pas.',
          },
          {
            id: 'w5-d2-o2',
            numberLabel: 'II-2',
            prefix: '図書館で借りた本を全部',
            suffix: '。',
            tokens: [
              { id: 1, label: 'しまった' },
              { id: 2, label: '一日で' },
              { id: 3, label: '読み' },
              { id: 4, label: 'きって' },
            ],
            correctOrder: [2, 3, 4, 1],
            explanationId: 'Urutan: 一日で 読み きって しまった (Selesai kubaca habis semua dalam satu hari).',
          },
        ].map((o) =>
          o.id === 'w5-d2-o1' ? { ...o, suffix: 'いい香りがする。' } : o
        ),
      },
      {
        id: 'w5-d3',
        weekNumber: 5,
        dayNumber: 3,
        titleJp: '受かっていたらいいなあ',
        titleId: 'Harapan & Penyesalan (たらいいなあ・ばよかった・ば〜のに・かなあ)',
        grammarPoints: [
          {
            id: 'w5-d3-g1',
            titleJp: '～たら / ば + いい（のに）なあ',
            connectionFormula: 'Vたら / Vば / Vていたら + いいなあ / いいのになあ',
            registerTag: 'Lisan',
            shortMeaningId: 'Andai saja / Semoga saja... (harapan santai atau angan-angan)',
            easyExplanationId:
              'Mengucapkan angan-angan pribadi atau doa ringan ("semoga besok cerah ya", "andai saja lulus ujiannya"). Tambahan のに menyiratkan kemungkinan kecil terwujud.',
            examples: [
              {
                jp: '試験に受かっていたらいいなあ。',
                id: 'Wah, semoga saja saya lulus ujiannya ya.',
              },
              {
                jp: 'もう少し家の家賃が安ければいいのになあ。',
                id: 'Andai saja sewa rumahnya sedikit lebih murah ya.',
              },
            ],
          },
          {
            id: 'w5-d3-g2',
            titleJp: '～ば / たら + よかった',
            connectionFormula: 'Bentuk ば / Bentuk たら + よかった（のに）',
            shortMeaningId: 'Menyesal! Seharusnya dulu melakukan/tidak melakukan...',
            easyExplanationId:
              'Menyesali keputusan masa lalu ("tahu gitu tadi bawa payung", "menyesal tidak belajar lebih rajin"). Gunakan bentuk negatif なければよかった untuk penyesalan "harusnya tidak beli".',
            examples: [
              {
                jp: '雨が降ってきた。傘を持ってくればよかった。',
                id: 'Wah turun hujan. Tahu gitu tadi aku bawa payung.',
              },
              {
                jp: 'あんな高い靴、買わなければよかった。',
                id: 'Sepatu semahal itu seharusnya dulu tidak kubeli.',
              },
            ],
          },
          {
            id: 'w5-d3-g3',
            titleJp: '～ば / たら + ～のに',
            connectionFormula: 'Syarat ば / たら + Kenyataan yang diharapkan + のに',
            shortMeaningId: 'Kalau saja A terjadi, padahal B bisa terjadi (penyesalan/pengandaian)',
            easyExplanationId:
              'Menunjukkan hal yang berlawanan dengan fakta saat ini ("kalau saja tidak sakit, aku bisa ikut bertanding; padahal sayang sekali!").',
            examples: [
              {
                jp: 'もっと時間があれば、ゆっくり観光できたのに。',
                id: 'Kalau saja ada waktu lebih banyak, padahal bisa jalan-jalan dengan santai.',
              },
            ],
          },
          {
            id: 'w5-d3-g4',
            titleJp: 'Vる / Vない + かな（あ）',
            connectionFormula: 'Kalimat Biasa + かな（あ）',
            registerTag: 'Lisan',
            shortMeaningId: 'Kira-kira apakah...? / Semoga ya... (monolog bertanya pada diri sendiri)',
            easyExplanationId:
              'Gumaman ringan saat bertanya pada diri sendiri atau berharap ("apakah dia mau datang ya?", "kira-kira hari ini panas nggak ya?").',
            examples: [
              {
                jp: '明日は晴れるかなあ。',
                id: 'Besok kira-kira cerah nggak ya.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w5-d3-r1',
            numberLabel: 'I-1',
            promptBefore: 'ボーナスがもう少し増えたら',
            promptAfter: 'なあ。',
            options: [
              { id: 'a', label: 'いい' },
              { id: 'b', label: 'よかった' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Harapan untuk masa depan (semoga bonusnya naik) → 増えたらいいなあ.',
          },
          {
            id: 'w5-d3-r2',
            numberLabel: 'I-2',
            promptBefore: '道に迷ってしまった。家を出る前に地図を調べて',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'おけばよかった' },
              { id: 'b', label: 'おいたらいい' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menyesali hal yang sudah terjadi (tersesat karena tidak cek peta) → おけばよかった.',
          },
          {
            id: 'w5-d3-r3',
            numberLabel: 'I-3',
            promptBefore: '昨日あんなにたくさんお酒を',
            promptAfter: '、頭が痛い。',
            options: [
              { id: 'a', label: '飲まなければよかったのに' },
              { id: 'b', label: '飲めばよかったのに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menyesal karena kemarin minum terlalu banyak → 飲まなければよかったのに.',
          },
          {
            id: 'w5-d3-r4',
            numberLabel: 'I-4',
            promptBefore: 'そろそろ山田さんが来る',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'かなあ' },
              { id: 'b', label: 'ことか' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Bertanya/bergumam pada diri sendiri "Apakah sebentar lagi Yamada datang ya?" → かなあ.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w5-d3-o1',
            numberLabel: 'II-1',
            prefix: 'セールで買った服が小さかった。',
            suffix: '。',
            tokens: [
              { id: 1, label: 'よかった' },
              { id: 2, label: '試着して' },
              { id: 3, label: 'から' },
              { id: 4, label: '買えば' },
            ],
            correctOrder: [2, 3, 4, 1],
            explanationId: 'Urutan: 試着して から 買えば よかった (Seharusnya kucoba dulu baru beli).',
          },
          {
            id: 'w5-d3-o2',
            numberLabel: 'II-2',
            prefix: '日本へ帰ってしまう前に、もう一度',
            suffix: '。',
            tokens: [
              { id: 1, label: 'のに' },
              { id: 2, label: 'よかった' },
              { id: 3, label: '会えれば' },
              { id: 4, label: 'なあ' },
            ],
            correctOrder: [3, 2, 1, 4],
            explanationId: 'Lebih pas: 会えたら いい のに なあ! Karena di sini ada よかった + のに + なあ, sebenarnya di Jepang dipakai 会えれば いい のに なあ — ubah token 2 menjadi "いい"!',
          },
        ].map((o) =>
          o.id === 'w5-d3-o2'
            ? {
                ...o,
                tokens: [
                  { id: 1, label: 'のに' },
                  { id: 2, label: 'いい' },
                  { id: 3, label: '会えたら' },
                  { id: 4, label: 'なあ' },
                ],
                correctOrder: [3, 2, 1, 4] as [number, number, number, number],
                explanationId: 'Urutan: 会えたら いい のに なあ (Andai saja bisa bertemu sekali lagi sebelum pulang...).',
              }
            : o
        ),
      },
      {
        id: 'w5-d4',
        weekNumber: 5,
        dayNumber: 4,
        titleJp: '今晩から明日の朝にかけて',
        titleId: 'Rentang Batas Waktu & Lokasi Kejadian (まで・にかけて・において)',
        grammarPoints: [
          {
            id: 'w5-d4-g1',
            titleJp: 'Vるまで / Nまで',
            connectionFormula: 'Vkamus + まで ｜ Waktu/Tempat + まで',
            shortMeaningId: 'Sampai / Hingga saat... (batas akhir berlangsungnya keadaan)',
            easyExplanationId:
              'Keadaan atau aksi di belakang berlangsung terus-menerus hingga titik waktu/batas yang disebut di depan まで ("menunggu di stasiun sampai hujan reda").',
            tipOrPitfallId:
              'Bedakan dengan までに (batas deadline terakhir: "kumpulkan paling lambat jam 5" = 5時までに出す; sedangkan 5時まで待つ = menunggu terus sampai jam 5).',
            examples: [
              {
                jp: '雨がやむまで、このカフェで待っていましょう。',
                id: 'Mari menunggu di kafe ini sampai hujannya reda.',
              },
            ],
          },
          {
            id: 'w5-d4-g2',
            titleJp: 'N1 + から + N2 + にかけて',
            connectionFormula: 'Waktu/Tempat 1 + から + Waktu/Tempat 2 + にかけて',
            shortMeaningId: 'Mulai dari N1 sampai sekitar N2 (rentang perkiraan/cuaca/musim)',
            easyExplanationId:
              'Berbeda dengan から～まで yang batasnya tegas dan pasti, から～にかけて dipakai untuk rentang waktu/wilayah yang garis batasnya samar ("dari malam nanti sampai besok pagi akan turun salju", "dari Kanto sampai Tohoku").',
            examples: [
              {
                jp: '今晩から明日の朝にかけて、強い風が吹くでしょう。',
                id: 'Mulai malam ini hingga besok pagi, diperkirakan akan bertiup angin kencang.',
              },
              {
                jp: '3月から4月にかけて、桜がきれいに咲きます。',
                id: 'Dari bulan Maret hingga sekitar April, bunga sakura mekar dengan indah.',
              },
            ],
          },
          {
            id: 'w5-d4-g3',
            titleJp: 'N + において（は / も） / における N',
            connectionFormula: 'Tempat/Bidang/Era + において ｜ + の / における + N',
            registerTag: 'Formal',
            shortMeaningId: 'Di / Pada / Dalam bidang... (padanan formal partikel で)',
            easyExplanationId:
              'Bahasa tulisan resmi, berita, atau pidato yang setara dengan partikel で untuk tempat acara resmi, zaman, atau bidang keilmuan ("upacara akan diadakan di aula", "dalam dunia bisnis modern").',
            examples: [
              {
                jp: '入学式は来週の月曜日、体育館において行われます。',
                id: 'Upacara penerimaan siswa baru akan diadakan Senin depan di gedung olahraga.',
              },
              {
                jp: '現代社会においては、インターネットが欠かせない。',
                id: 'Dalam masyarakat modern, internet adalah hal yang tak tergantikan.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w5-d4-r1',
            numberLabel: 'I-1',
            promptBefore: '電車が動き出す',
            promptAfter: '、駅で1時間ほど待った。',
            options: [
              { id: 'a', label: 'まで' },
              { id: 'b', label: 'までに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menunggu secara terus-menerus hingga kereta jalan lagi → まで.',
          },
          {
            id: 'w5-d4-r2',
            numberLabel: 'I-2',
            promptBefore: '今夜から明日の昼',
            promptAfter: '、広い範囲で大雨が降る見込みです。',
            options: [
              { id: 'a', label: 'にかけて' },
              { id: 'b', label: 'において' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Rentang waktu perkiraan cuaca dari malam hingga besok siang → から ～にかけて.',
          },
          {
            id: 'w5-d4-r3',
            numberLabel: 'I-3',
            promptBefore: '国際会議は東京のホテル',
            promptAfter: '開かれた。',
            options: [
              { id: 'a', label: 'において' },
              { id: 'b', label: 'にかけて' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Lokasi penyelenggaraan acara resmi → において (bentuk formal dari で).',
          },
          {
            id: 'w5-d4-r4',
            numberLabel: 'I-4',
            promptBefore: '21世紀',
            promptAfter: '最大の課題は環境問題だと言われている。',
            options: [
              { id: 'a', label: 'における' },
              { id: 'b', label: 'において' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menerangkan kata benda 最大の課題 secara langsung → における.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w5-d4-o1',
            numberLabel: 'II-1',
            prefix: '今週末は',
            suffix: '天気になりそうだ。',
            tokens: [
              { id: 1, label: '関東から' },
              { id: 2, label: '東北' },
              { id: 3, label: '荒れた' },
              { id: 4, label: 'にかけて' },
            ],
            correctOrder: [1, 2, 4, 3],
            explanationId: 'Urutan: 関東から 東北 にかけて 荒れた (Dari Kanto hingga Tohoku cuaca tampaknya akan buruk).',
          },
          {
            id: 'w5-d4-o2',
            numberLabel: 'II-2',
            prefix: 'このコンテストは、来月',
            suffix: '。',
            tokens: [
              { id: 1, label: '行われます' },
              { id: 2, label: '市民ホール' },
              { id: 3, label: 'おいて' },
              { id: 4, label: 'に' },
            ],
            correctOrder: [2, 4, 3, 1],
            explanationId: 'Urutan: 市民ホール に おいて 行われます (akan diselenggarakan di aula kota).',
          },
        ],
      },
      {
        id: 'w5-d5',
        weekNumber: 5,
        dayNumber: 5,
        titleJp: 'たとえ高くても',
        titleId: 'Pengandaian Kuat, Kemungkinan, Pengecualian, & Perumpamaan (たとえ・もしかすると・とは限らない・まるで)',
        grammarPoints: [
          {
            id: 'w5-d5-g1',
            titleJp: 'たとえ + ～ても / でも',
            connectionFormula: 'たとえ + Vても・Aくても・naでも・Nでも',
            shortMeaningId: 'Kalaupun / Sekalipun misalnya... tetap saja...',
            easyExplanationId:
              'Membuat pengandaian ekstrem ("kalaupun gagal, aku tidak akan menyesal"; "sekalipun semua orang menentang, aku tetap maju").',
            examples: [
              {
                jp: 'たとえ時間がかかっても、自分の力でやり遂げたい。',
                id: 'Kalaupun memakan waktu, saya ingin menyelesaikannya dengan kekuatan sendiri.',
              },
            ],
          },
          {
            id: 'w5-d5-g2',
            titleJp: 'もしかすると / もしかしたら + ～かもしれない',
            connectionFormula: 'もしかすると / もしかしたら + Kalimat Biasa + かもしれない',
            shortMeaningId: 'Jangan-jangan / Mungkin saja...',
            easyExplanationId:
              'Dipakai saat punya firasat atau dugaan tentang kemungkinan yang tidak terduga (sering hal kurang baik atau kabar mengejutkan).',
            examples: [
              {
                jp: '連絡がないから、もしかしたら彼はもう帰ってしまったかもしれない。',
                id: 'Karena tidak ada kabar, jangan-jangan dia sudah pulang.',
              },
            ],
          },
          {
            id: 'w5-d5-g3',
            titleJp: '必ずしも + ～とは限らない',
            connectionFormula: '必ずしも + Kalimat Biasa + とは限らない',
            shortMeaningId: 'Belum tentu / Tidak selalu demikian...',
            easyExplanationId:
              'Menyangkal anggapan umum dengan sopan ("barang mahal belum tentu awet"; "orang pintar belum tentu jadi guru yang baik").',
            examples: [
              {
                jp: '高ければ必ずしもおいしいとは限らない。',
                id: 'Jika mahal belum tentu selalu enak.',
              },
            ],
          },
          {
            id: 'w5-d5-g4',
            titleJp: 'まるで + ～ようだ / みたいだ',
            connectionFormula: 'まるで + Nの / Kalimat Biasa + ようだ / みたいだ',
            shortMeaningId: 'Bagaikan / Benar-benar persis seperti... (metafora kuat)',
            easyExplanationId:
              'Mengumpamakan sesuatu secara hidup ("pemandangannya indah bagaikan lukisan", "wajahnya merah seperti apel").',
            examples: [
              {
                jp: 'ここの景色は、まるで絵のようだ。',
                id: 'Pemandangan di sini benar-benar bagaikan lukisan.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w5-d5-r1',
            numberLabel: 'I-1',
            promptBefore: '',
            promptAfter: '雨が降っても、明日の試合は行います。',
            options: [
              { id: 'a', label: 'たとえ' },
              { id: 'b', label: 'まるで' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Berpasangan dengan ～ても untuk pengandaian kuat → たとえ.',
          },
          {
            id: 'w5-d5-r2',
            numberLabel: 'I-2',
            promptBefore: '有名な店で食べたからといって、',
            promptAfter: 'とは限らない。',
            options: [
              { id: 'a', label: '必ずしも満足できる' },
              { id: 'b', label: 'もしかすると満足できる' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Pasangan kata keterangan dengan ～とは限らない adalah 必ずしも (belum tentu selalu).',
          },
          {
            id: 'w5-d5-r3',
            numberLabel: 'I-3',
            promptBefore: '',
            promptAfter: '、彼は電車に乗り遅れたのかもしれない。',
            options: [
              { id: 'a', label: 'もしかしたら' },
              { id: 'b', label: '必ずしも' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Berpasangan dengan ～かもしれない untuk dugaan "jangan-jangan" → もしかしたら.',
          },
          {
            id: 'w5-d5-r4',
            numberLabel: 'I-4',
            promptBefore: '雪が降った朝は、町全体が',
            promptAfter: '白く見える。',
            options: [
              { id: 'a', label: 'まるで夢の世界のようで' },
              { id: 'b', label: 'たとえ夢の世界でも' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Perumpamaan puitis memakai まるで ～ようだ → まるで夢の世界のようで.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w5-d5-o1',
            numberLabel: 'II-1',
            prefix: 'たくさん',
            suffix: 'ではない。',
            tokens: [
              { id: 1, label: '限らない' },
              { id: 2, label: 'とは' },
              { id: 3, label: 'お金があれば' },
              { id: 4, label: '幸せになれる' },
            ],
            correctOrder: [3, 4, 2, 1],
            explanationId: 'Urutan: お金があれば 幸せになれる とは 限らない (Kalimat akhir tidak butuh ではない jika memakai 限らない — rapikan suffix menjadi 。).',
          },
          {
            id: 'w5-d5-o2',
            numberLabel: 'II-2',
            prefix: '彼はとても寒いのか、',
            suffix: 'ふるえている。',
            tokens: [
              { id: 1, label: 'ように' },
              { id: 2, label: '子犬の' },
              { id: 3, label: 'まるで' },
              { id: 4, label: 'ブルブル' },
            ],
            correctOrder: [3, 2, 1, 4],
            explanationId: 'Urutan: まるで 子犬の ように ブルブル ふるえている (menggigil persis seperti anak anjing).',
          },
        ].map((o) =>
          o.id === 'w5-d5-o1'
            ? {
                ...o,
                prefix: 'たくさん',
                suffix: '。',
                tokens: [
                  { id: 1, label: 'とは限らない' },
                  { id: 2, label: '健康にいい' },
                  { id: 3, label: '食べれば' },
                  { id: 4, label: '必ずしも' },
                ],
                correctOrder: [3, 4, 2, 1] as [number, number, number, number],
                explanationId: 'Urutan: 食べれば 必ずしも 健康にいい とは限らない (Banyak makan belum tentu baik untuk kesehatan).',
              }
            : o
        ),
      },
      {
        id: 'w5-d6',
        weekNumber: 5,
        dayNumber: 6,
        titleJp: 'ところで…',
        titleId: 'Kata Sambung Kalimat: Tapi, Karena Itu, Namun Ternyata, & Ngomong-ngomong',
        grammarPoints: [
          {
            id: 'w5-d6-g1',
            titleJp: 'A。だけど B。（逆接・口語）',
            connectionFormula: 'Kalimat 1。だけど、Kalimat 2',
            registerTag: 'Lisan',
            shortMeaningId: 'Tapi... / Namun... (gaya percakapan sehari-hari)',
            easyExplanationId:
              'Lebih santai daripada しかし / でも. Dipakai saat mengobrol untuk menyambungkan fakta yang berlawanan atau alasan penolakan halus.',
            examples: [
              {
                jp: 'この靴はデザインがとてもいい。だけど、ちょっと値段が高いな。',
                id: 'Sepatu ini desainnya bagus banget. Tapi, harganya agak mahal ya.',
              },
            ],
          },
          {
            id: 'w5-d6-g2',
            titleJp: 'A。ですから B。（順接・丁寧）',
            connectionFormula: 'Kalimat 1 (Alasan)。ですから、Kalimat 2 (Hasil/Ajakan)',
            registerTag: 'Formal',
            shortMeaningId: 'Oleh karena itu / Maka dari itu... (versi sopan dari だから)',
            easyExplanationId:
              'Menyambungkan alasan dengan kesimpulan/permintaan secara sopan dalam pembicaraan maupun email sopan.',
            examples: [
              {
                jp: '明日は朝から会議があります。ですから、今日は早く帰って休みます。',
                id: 'Besok ada rapat sejak pagi. Oleh karena itu, hari ini saya pulang cepat dan beristirahat.',
              },
            ],
          },
          {
            id: 'w5-d6-g3',
            titleJp: 'A。ところが B。（予想外の展開）',
            connectionFormula: 'Kalimat 1 (Harapan/Prediksi)。ところが、Kalimat 2 (Kenyataan tak terduga)',
            shortMeaningId: 'Akan tetapi ternyata... (di luar dugaan / mengejutkan)',
            easyExplanationId:
              'Berbeda dengan だけど yang sekadar kontras biasa, ところが dipakai khusus saat Kalimat 2 terjadi DI LUAR DUGAAN atau berkebalikan drastis dari perkiraan ("tadi langit cerah sekali; tapi ternyata turun hujan deras!").',
            examples: [
              {
                jp: '簡単なテストだと思っていた。ところが、受けてみたらとても難しかった。',
                id: 'Kusangka tesnya mudah. Akan tetapi begitu dicoba, ternyata sangat sulit.',
              },
            ],
          },
          {
            id: 'w5-d6-g4',
            titleJp: 'A。ところで B。（話題転換）',
            connectionFormula: 'Kalimat 1。ところで、Kalimat 2 (Topik baru)',
            shortMeaningId: 'Ngomong-ngomong... / Omong-omong... (ganti topik)',
            easyExplanationId:
              'Membelokkan pembicaraan dari topik A ke topik B yang tidak berhubungan langsung ("ngomong-ngomong, akhir pekan ini kamu ada rencana?").',
            examples: [
              {
                jp: '今日は本当に寒いですね。ところで、来週の旅行の準備はもう終わりましたか。',
                id: 'Hari ini dingin sekali ya. Ngomong-ngomong, persiapan wisata minggu depan sudah selesai?',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w5-d6-r1',
            numberLabel: 'I-1',
            promptBefore: '天気予報では晴れと言っていた。',
            promptAfter: '、午後から急に雨が降り出した。',
            options: [
              { id: 'a', label: 'ところが' },
              { id: 'b', label: 'ですから' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Kejadian yang bertolak belakang jauh dari dugaan ramalan cuaca → ところが.',
          },
          {
            id: 'w5-d6-r2',
            numberLabel: 'I-2',
            promptBefore: '明日は始発の電車に乗らなければなりません。',
            promptAfter: '、今夜はもう寝ます。',
            options: [
              { id: 'a', label: 'ですから' },
              { id: 'b', label: 'ところで' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Alasan logis menuju keputusan sopan ("Oleh karena itu...") → ですから.',
          },
          {
            id: 'w5-d6-r3',
            numberLabel: 'I-3',
            promptBefore: 'このケーキはおいしそうだね。',
            promptAfter: '、もうすぐ夕ごはんだから今は我慢しよう。',
            options: [
              { id: 'a', label: 'だけど' },
              { id: 'b', label: 'ところで' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Pertentangan lisan ("Kelihatannya enak, tapi...") → だけど.',
          },
          {
            id: 'w5-d6-r4',
            numberLabel: 'I-4',
            promptBefore: '仕事の話はここまで。',
            promptAfter: '、最近いい映画を見ましたか。',
            options: [
              { id: 'a', label: 'ところで' },
              { id: 'b', label: 'ところが' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Mengganti topik dari pekerjaan ke film → ところで.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w5-d6-o1',
            numberLabel: 'II-1',
            prefix: '駅までは遠くないので',
            suffix: '。',
            tokens: [
              { id: 1, label: '、' },
              { id: 2, label: '歩けます' },
              { id: 3, label: '雨が降ったら' },
              { id: 4, label: 'だけど' },
            ],
            correctOrder: [2, 1, 4, 3],
            explanationId: 'Susun akhir kalimat agar lengkap: 歩けます。だけど 雨が降ったら (tambahkan 困る di suffix).',
          },
          {
            id: 'w5-d6-o2',
            numberLabel: 'II-2',
            prefix: '先週の日曜日は公園へ行った。',
            suffix: '閉まっていた。',
            tokens: [
              { id: 1, label: 'ところが' },
              { id: 2, label: '工事中で' },
              { id: 3, label: '入り口が' },
              { id: 4, label: '、' },
            ],
            correctOrder: [1, 4, 2, 3],
            explanationId: 'Urutan: ところが 、 工事中で 入り口が (閉まっていた) (Namun ternyata sedang renovasi sehingga pintu masuknya tutup).',
          },
        ].map((o) =>
          o.id === 'w5-d6-o1'
            ? {
                ...o,
                prefix: '駅までは近いから歩けます。',
                suffix: '乗ります。',
                tokens: [
                  { id: 1, label: 'バスに' },
                  { id: 2, label: 'だけど' },
                  { id: 3, label: '雨の日は' },
                  { id: 4, label: '、' },
                ],
                correctOrder: [2, 4, 3, 1] as [number, number, number, number],
                explanationId: 'Urutan: だけど 、 雨の日は バスに 乗ります (Tapi kalau hari hujan naik bus).',
              }
            : o
        ),
      },
    ],
    jissen: {
      id: 'w5-d7',
      weekNumber: 5,
      dayNumber: 7,
      titleJp: '第5週 実践問題',
      titleId: 'Latihan Ujian Mingguan (Minggu 5)',
      timeLimitMin: 15,
      mondai3PassageTitleJp: '富士山の思い出',
      mondai3PassageLines: [
        '去年の夏、私は友だちと3人で初めて富士山に登った。登る前は「日本一高い山だから、自分には無理かもしれない」と思っていた。[ 21 ]、休憩をとりながらゆっくり登ったら、無事に頂上までたどり着くことができた。',
        '頂上から見た朝日は、言葉で表せないほど美しく、[ 22 ] 絵画のようだった。しかし、夏といっても頂上はとても寒く、持っていった上着だけでは足りないくらいだった。「もっと厚いセーターを持って [ 23 ]」と少し後悔した。',
        '下山するときは足が痛くて大変だったが、最後まで自分の力で歩き [ 24 ]。登った経験のある人が言うように、富士山は「一度は登る価値がある山」だが、山登りは準備が大切で、夏だからといって [ 25 ] 安全だとは限らないとよくわかった。',
      ],
      questions: [
        {
          id: 'w5-j-1',
          number: 1,
          type: 'mondai1_mcq',
          promptJp: '漢字（　　）、カタカナもまだ正確に書けないものがある。',
          options: [
            { id: '1', label: 'はもちろん' },
            { id: '2', label: 'に比べて' },
            { id: '3', label: 'に対して' },
            { id: '4', label: 'において' },
          ],
          correctOptionId: '1',
          explanationId: '"Kanji tentu saja (apalagi), katakana pun masih ada yang belum bisa ditulis tepat" → はもちろん.',
        },
        {
          id: 'w5-j-2',
          number: 2,
          type: 'mondai1_mcq',
          promptJp: '彼女は英語（　　）、フランス語やドイツ語も話せるそうだ。',
          options: [
            { id: '1', label: 'ばかりか' },
            { id: '2', label: 'にとって' },
            { id: '3', label: 'にくらべ' },
            { id: '4', label: 'にしたがって' },
          ],
          correctOptionId: '1',
          explanationId: '"Bukan hanya bahasa Inggris, tapi juga bahasa Prancis & Jerman" → ばかりか.',
        },
        {
          id: 'w5-j-3',
          number: 3,
          type: 'mondai1_mcq',
          promptJp: '去年の冬（　　）、今年の冬はそれほど寒くない。',
          options: [
            { id: '1', label: 'に対して' },
            { id: '2', label: 'に比べて' },
            { id: '3', label: 'にかけて' },
            { id: '4', label: 'において' },
          ],
          correctOptionId: '2',
          explanationId: 'Membandingkan musim dingin tahun lalu dan tahun ini → に比べて.',
        },
        {
          id: 'w5-j-4',
          number: 4,
          type: 'mondai1_mcq',
          promptJp: '彼は自分の意見をはっきり言うの（　　）、妹はとてもおとなしい。',
          options: [
            { id: '1', label: 'にくらべて' },
            { id: '2', label: 'に対して' },
            { id: '3', label: 'ばかりか' },
            { id: '4', label: 'をはじめ' },
          ],
          correctOptionId: '2',
          explanationId: 'Kontras berlawanan dua orang (dia tegas, sebaliknya adiknya pendiam) → に対して (の+に対して).',
        },
        {
          id: 'w5-j-5',
          number: 5,
          type: 'mondai1_mcq',
          promptJp: '3か月かけて、やっと新しいホームページを（　　）。',
          options: [
            { id: '1', label: '作り上げた' },
            { id: '2', label: '作りかけた' },
            { id: '3', label: '作りたてだ' },
            { id: '4', label: '作りっぱなしだ' },
          ],
          correctOptionId: '1',
          explanationId: 'Menyelesaikan pembuatan website dari awal sampai tuntas → 作り上げた.',
        },
        {
          id: 'w5-j-6',
          number: 6,
          type: 'mondai1_mcq',
          promptJp: '一人で食べるには多すぎて、とても（　　）。',
          options: [
            { id: '1', label: '食べあげた' },
            { id: '2', label: '食べきれない' },
            { id: '3', label: '食べかけた' },
            { id: '4', label: '食べたてだ' },
          ],
          correctOptionId: '2',
          explanationId: 'Terlalu banyak sehingga tidak sanggup dihabiskan → 食べきれない.',
        },
        {
          id: 'w5-j-7',
          number: 7,
          type: 'mondai1_mcq',
          promptJp: 'テーブルの上に（　　）のコーヒーが置いてある。',
          options: [
            { id: '1', label: '飲みたて' },
            { id: '2', label: '飲みかけ' },
            { id: '3', label: '飲みあげ' },
            { id: '4', label: '飲みきり' },
          ],
          correctOptionId: '2',
          explanationId: 'Kopi yang baru diminum setengah / belum habis → 飲みかけ.',
        },
        {
          id: 'w5-j-8',
          number: 8,
          type: 'mondai1_mcq',
          promptJp: 'この店はいつでも（　　）のおいしいパンが買えます。',
          options: [
            { id: '1', label: '焼きかけ' },
            { id: '2', label: '焼ききり' },
            { id: '3', label: '焼きたて' },
            { id: '4', label: '焼きっぱなし' },
          ],
          correctOptionId: '3',
          explanationId: 'Roti hangat segar yang baru saja matang dipanggang → 焼きたて.',
        },
        {
          id: 'w5-j-9',
          number: 9,
          type: 'mondai1_mcq',
          promptJp: '昨日、もっと早く寝て（　　）。今とても眠い。',
          options: [
            { id: '1', label: 'いればいいなあ' },
            { id: '2', label: 'いればよかった' },
            { id: '3', label: 'いるかなあ' },
            { id: '4', label: 'いるところだ' },
          ],
          correctOptionId: '2',
          explanationId: 'Penyesalan atas masa lalu ("seharusnya kemarin tidur lebih cepat") → いればよかった.',
        },
        {
          id: 'w5-j-10',
          number: 10,
          type: 'mondai1_mcq',
          promptJp: '来月の面接に合格（　　）。',
          options: [
            { id: '1', label: 'できたらいいなあ' },
            { id: '2', label: 'できたらよかった' },
            { id: '3', label: 'できたところだ' },
            { id: '4', label: 'できたばかりだ' },
          ],
          correctOptionId: '1',
          explanationId: 'Harapan untuk masa depan (wawancara bulan depan) → できたらいいなあ.',
        },
        {
          id: 'w5-j-11',
          number: 11,
          type: 'mondai1_mcq',
          promptJp: '雨が（　　）、ここで少し休みましょう。',
          options: [
            { id: '1', label: 'やむまで' },
            { id: '2', label: 'やむまでに' },
            { id: '3', label: 'やむにかけて' },
            { id: '4', label: 'やむにおいて' },
          ],
          correctOptionId: '1',
          explanationId: 'Istirahat terus hingga hujan reda → やむまで.',
        },
        {
          id: 'w5-j-12',
          number: 12,
          type: 'mondai1_mcq',
          promptJp: '来年の春、この会場（　　）卒業式が行われます。',
          options: [
            { id: '1', label: 'にかけて' },
            { id: '2', label: 'において' },
            { id: '3', label: 'にとって' },
            { id: '4', label: 'について' },
          ],
          correctOptionId: '2',
          explanationId: 'Tempat acara resmi berlangsung (formal untuk で) → において.',
        },
        {
          id: 'w5-j-13',
          number: 13,
          type: 'mondai1_mcq',
          promptJp: '（　　）値段が高くても、体に安全な食品を選びたい。',
          options: [
            { id: '1', label: 'まるで' },
            { id: '2', label: '必ずしも' },
            { id: '3', label: 'たとえ' },
            { id: '4', label: 'もしかすると' },
          ],
          correctOptionId: '3',
          explanationId: 'Pasangan kata penegas di depan ～ても adalah たとえ.',
        },
        {
          id: 'w5-j-14',
          number: 14,
          type: 'mondai1_mcq',
          promptJp: '値段が高いものが、すべて良い商品（　　）。',
          options: [
            { id: '1', label: 'とは限らない' },
            { id: '2', label: 'かもしれない' },
            { id: '3', label: 'のようだ' },
            { id: '4', label: 'にちがいない' },
          ],
          correctOptionId: '1',
          explanationId: '"Tidak selalu / belum tentu semua barang mahal itu bagus" → とは限らない.',
        },
        {
          id: 'w5-j-15',
          number: 15,
          type: 'mondai1_mcq',
          promptJp: 'この問題はとても難しいですね。（　　）、お昼ごはんはどこで食べますか。',
          options: [
            { id: '1', label: 'ところが' },
            { id: '2', label: 'ですから' },
            { id: '3', label: 'ところで' },
            { id: '4', label: 'それに' },
          ],
          correctOptionId: '3',
          explanationId: 'Berpindah ke topik baru (makan siang di mana) → ところで.',
        },
        {
          id: 'w5-j-16',
          number: 16,
          type: 'mondai2_star',
          starPrefix: '今夜の天気は、夕方から',
          starSuffix: '見込みです。',
          starSlotIndex: 1,
          options: [
            { id: '1', label: 'にかけて' },
            { id: '2', label: '明日の朝' },
            { id: '3', label: '降る' },
            { id: '4', label: '雪が' },
          ],
          correctOptionId: '1',
          correctOrderIds: ['2', '1', '4', '3'],
          explanationId: 'Urutan: 明日の朝 (2) にかけて ★ (1) 雪が (4) 降る (3) 見込みです.',
        },
        {
          id: 'w5-j-17',
          number: 17,
          type: 'mondai2_star',
          starPrefix: '彼は日本へ留学経験が',
          starSuffix: 'とても流暢だ。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: '、' },
            { id: '2', label: '日本人' },
            { id: '3', label: 'ないのに' },
            { id: '4', label: 'みたいに' },
          ],
          correctOptionId: '2',
          correctOrderIds: ['3', '1', '2', '4'],
          explanationId: 'Urutan: ないのに (3) 、(1) 日本人 ★ (2) みたいに (4) とても流暢だ.',
        },
        {
          id: 'w5-j-18',
          number: 18,
          type: 'mondai2_star',
          starPrefix: 'もう少しよく考えてから',
          starSuffix: '悔やんでいる。',
          starSlotIndex: 1,
          options: [
            { id: '1', label: 'よかった' },
            { id: '2', label: 'と' },
            { id: '3', label: '返事を' },
            { id: '4', label: 'すれば' },
          ],
          correctOptionId: '4',
          correctOrderIds: ['3', '4', '1', '2'],
          explanationId: 'Urutan: 返事を (3) すれば ★ (4) よかった (1) と (2) 悔やんでいる.',
        },
        {
          id: 'w5-j-19',
          number: 19,
          type: 'mondai2_star',
          starPrefix: 'あの人の顔はよく覚えている。',
          starSuffix: 'どうしても思い出せない。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: '、' },
            { id: '2', label: '名前が' },
            { id: '3', label: 'ところが' },
            { id: '4', label: 'なぜか' },
          ],
          correctOptionId: '2',
          correctOrderIds: ['3', '1', '2', '4'],
          explanationId: 'Urutan: ところが (3) 、(1) 名前が ★ (2) なぜか (4) どうしても思い出せない.',
        },
        {
          id: 'w5-j-20',
          number: 20,
          type: 'mondai2_star',
          starPrefix: '駅でずっと待っていたが、',
          starSuffix: '来なかった。',
          starSlotIndex: 1,
          options: [
            { id: '1', label: '彼女は' },
            { id: '2', label: 'とうとう' },
            { id: '3', label: '遅く' },
            { id: '4', label: 'なるまで' },
          ],
          correctOptionId: '4',
          correctOrderIds: ['3', '4', '1', '2'],
          explanationId: 'Urutan: 遅く (3) なるまで ★ (4) 彼女は (1) とうとう (2) 来なかった.',
        },
        {
          id: 'w5-j-21',
          number: 21,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'ところが' },
            { id: '2', label: 'ですから' },
            { id: '3', label: 'ところで' },
            { id: '4', label: 'つまり' },
          ],
          correctOptionId: '1',
          explanationId: 'Awalnya mengira mustahil sampai puncak, akan tetapi ternyata berhasil sampai puncak → ところが.',
        },
        {
          id: 'w5-j-22',
          number: 22,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'たとえ' },
            { id: '2', label: 'まるで' },
            { id: '3', label: '必ずしも' },
            { id: '4', label: 'もしかすると' },
          ],
          correctOptionId: '2',
          explanationId: 'Perumpamaan まるで 絵画のようだった (bagaikan sebuah lukisan).',
        },
        {
          id: 'w5-j-23',
          number: 23,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'くればよかった' },
            { id: '2', label: 'くればいいなあ' },
            { id: '3', label: 'きてもよかった' },
            { id: '4', label: 'くるはずだった' },
          ],
          correctOptionId: '1',
          explanationId: 'Menyesal karena lupa membawa sweter tebal → 持ってくればよかった.',
        },
        {
          id: 'w5-j-24',
          number: 24,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'きった' },
            { id: '2', label: 'かけた' },
            { id: '3', label: 'たてだ' },
            { id: '4', label: 'あげた' },
          ],
          correctOptionId: '1',
          explanationId: 'Berjalan tuntas sampai akhir/bawah meskipun kaki sakit → 歩ききった.',
        },
        {
          id: 'w5-j-25',
          number: 25,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: '必ずしも' },
            { id: '2', label: 'たとえ' },
            { id: '3', label: 'まるで' },
            { id: '4', label: 'もちろん' },
          ],
          correctOptionId: '1',
          explanationId: 'Pasangan dengan とは限らない ("meski musim panas belum tentu aman") → 必ずしも.',
        },
      ],
      keigoTip: {
        titleJp: '敬語：伺う（うかがう）',
        summaryId:
          'Pelajaran Keigo Minggu 5: Kata kerja merendah (謙譲語) serbaguna yang memiliki TIGA arti sekaligus saat ditujukan ke atasan, guru, atau klien!',
        pairs: [
          {
            plain: '聞く (bertanya)',
            honorificOrHumble: '伺う (謙譲語)',
            meaningId: 'Bertanya kepada atasan/guru/staf',
            exampleJp: 'ちょっとお伺いしたいことがあるのですが。',
          },
          {
            plain: '聞く (mendengar)',
            honorificOrHumble: '伺う (謙譲語)',
            meaningId: 'Mendengar / menyimak cerita orang lain',
            exampleJp: '先生から面白いお話を伺いました。',
          },
          {
            plain: '行く / 訪問する (mengunjungi)',
            honorificOrHumble: '伺う (謙譲語)',
            meaningId: 'Mengunjungi rumah/kantor pihak lain',
            exampleJp: 'あした3時にそちらへ伺います。',
          },
        ],
      },
    },
  },
  {
    weekNumber: 6,
    titleJp: '第6週 もっとがんばることにした！',
    themeId: 'Keputusan & Aturan, Momen Kejadian, Alasan Logis (わけ), Negatif Mutlak, & Urutan Wacana',
    days: [
      {
        id: 'w6-d1',
        weekNumber: 6,
        dayNumber: 1,
        titleJp: 'もし私じゃなかったら',
        titleId: 'Beragam Kalimat Pengandaian "Jika" (もし〜なら・としても・もしものこと)',
        grammarPoints: [
          {
            id: 'w6-d1-g1',
            titleJp: 'もし + ～（た）なら / たら',
            connectionFormula: 'もし + 普通形 + なら ｜ もし + Vた・Aかった・Nだった + ら',
            shortMeaningId: 'Kalau / Jika seandainya...',
            easyExplanationId:
              'Memberi penekanan kata "jika" di awal kalimat pengandaian. Jika mengandaikan masa lalu atau hal yang bertentangan dengan kenyataan ("kalau aku bukan diriku..."), pakai もし + たら / なら.',
            examples: [
              {
                jp: 'もしタイムマシンがあるなら、過去の自分を見てみたい。',
                id: 'Jika ada mesin waktu, saya ingin melihat diri saya di masa lalu.',
              },
              {
                jp: 'もし私じゃなかったら、きっと怒っていたと思う。',
                id: 'Jika itu bukan aku, pasti orang lain sudah marah.',
              },
            ],
          },
          {
            id: 'w6-d1-g2',
            titleJp: 'もし + ～としても / としたって',
            connectionFormula: 'もし + Kalimat Biasa + としても / としたって (lisan)',
            shortMeaningId: 'Kalaupun misalnya hal itu benar terjadi, tetap saja...',
            easyExplanationId:
              'Mengakui kemungkinan kondisi ekstrem tersebut untuk sementara, lalu menegaskan bahwa kesimpulan atau sikap kita tidak berubah ("kalaupun terlambat, tetap harus beri kabar").',
            examples: [
              {
                jp: 'もし遅れるとしても、必ず事前に連絡してください。',
                id: 'Kalaupun terlambat, harap pasti menghubungi sebelumnya.',
              },
            ],
          },
          {
            id: 'w6-d1-g3',
            titleJp: 'もしも + ～なら / たら / ても & もしものこと',
            connectionFormula: 'もしも ～たら ｜ もしものこと / もしもの時 (keadaan darurat)',
            shortMeaningId: 'Seandainya / Bagaimana kalau terjadi hal tak terduga (darurat)',
            easyExplanationId:
              'もしも sedikit lebih puitis atau bernada lebih serius/emosional dari もし. Bentuk kata benda もしものこと / もしもの時 berarti "jika terjadi sesuatu yang darurat/tak diinginkan".',
            examples: [
              {
                jp: 'もしもの時のために、非常用の水を用意しておこう。',
                id: 'Untuk berjaga-jaga kalau terjadi keadaan darurat, mari siapkan air darurat.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w6-d1-r1',
            numberLabel: 'I-1',
            promptBefore: 'もし明日雨が',
            promptAfter: '、ハイキングは来週に延期します。',
            options: [
              { id: 'a', label: '降ったなら' },
              { id: 'b', label: '降るても' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Pengandaian jika besok hujan → 降ったなら (atau 降ったら).',
          },
          {
            id: 'w6-d1-r2',
            numberLabel: 'I-2',
            promptBefore: 'もし彼が来られない',
            promptAfter: '、私たちだけで始めましょう。',
            options: [
              { id: 'a', label: 'としても' },
              { id: 'b', label: 'からには' },
            ],
            correctOptionIds: ['a'],
            explanationId: '"Kalaupun misalnya dia tidak bisa datang, mari kita mulai berdua saja" → としても.',
          },
          {
            id: 'w6-d1-r3',
            numberLabel: 'I-3',
            promptBefore: '',
            promptAfter: 'の時のために、家族の連絡先をメモしてある。',
            options: [
              { id: 'a', label: 'もしも' },
              { id: 'b', label: 'もしは' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Ungkapan baku もしもの時 (saat keadaan darurat).',
          },
        ],
        renshuuPart2: [
          {
            id: 'w6-d1-o1',
            numberLabel: 'II-1',
            prefix: 'もし',
            suffix: 'とても嬉しいだろう。',
            tokens: [
              { id: 1, label: '空を飛べた' },
              { id: 2, label: '鳥のように' },
              { id: 3, label: 'なら' },
              { id: 4, label: '自由に' },
            ],
            correctOrder: [2, 4, 1, 3],
            explanationId: 'Urutan: 鳥のように 自由に 空を飛べた なら (Jika saja bisa terbang bebas di langit seperti burung).',
          },
          {
            id: 'w6-d1-o2',
            numberLabel: 'II-2',
            prefix: 'もし',
            suffix: 'あきらめずにまた挑戦したい。',
            tokens: [
              { id: 1, label: '合格できない' },
              { id: 2, label: 'として' },
              { id: 3, label: 'も' },
              { id: 4, label: '今年' },
            ],
            correctOrder: [4, 1, 2, 3],
            explanationId: 'Urutan: 今年 合格できない として も (Kalaupun tahun ini belum bisa lulus).',
          },
        ],
      },
      {
        id: 'w6-d2',
        weekNumber: 6,
        dayNumber: 2,
        titleJp: '話せることは話せますが…',
        titleId: 'Keputusan, Ketentuan, & Pengakuan Parsial (ことになる・ことにする・VことはVが)',
        grammarPoints: [
          {
            id: 'w6-d2-g1',
            titleJp: 'Vる / Vない + ことになる / ことになっている',
            connectionFormula: 'Vkamus / Vない + ことになる（keputusan pihak luar/aturan）',
            shortMeaningId: 'Diputuskan bahwa... / Sudah menjadi aturan bahwa...',
            easyExplanationId:
              '1) ことになる: keputusan diambil bukan semata oleh pembicara (diputuskan rapat, perusahaan, pemerintah, atau keadaan). 2) ことになっている: aturan, tradisi, atau jadwal tetap yang sudah berlaku ("di sekolah ini dilarang pakai sandal").',
            examples: [
              {
                jp: '来月から東京本社で働くことになりました。',
                id: 'Diputuskan bahwa mulai bulan depan saya akan bekerja di kantor pusat Tokyo.',
              },
              {
                jp: 'この図書館では、飲食は禁止ということになっている。',
                id: 'Di perpustakaan ini aturannya dilarang makan dan minum.',
              },
            ],
          },
          {
            id: 'w6-d2-g2',
            titleJp: 'Vる / Vない + ことにする / ことにしている',
            connectionFormula: 'Vkamus / Vない + ことにする（keputusan sendiri）',
            shortMeaningId: 'Memutuskan sendiri untuk... / Membiasakan diri (rutin)...',
            easyExplanationId:
              '1) ことにする: keputusan diambil oleh kemauan diri sendiri ("hari ini aku memutuskan pulang naik taksi"). 2) ことにしている: aturan pribadi/kebiasaan rutin yang terus dijalani ("aku membiasakan minum 2L air sehari").',
            tipOrPitfallId:
              'Bandingkan! ことにする = keputusan pribadi; ことになる = keputusan kantor/pihak luar/aturan.',
            examples: [
              {
                jp: '健康のため、毎日30分歩くことにしている。',
                id: 'Demi kesehatan, saya memutuskan rutin berjalan kaki 30 menit setiap hari.',
              },
            ],
          },
          {
            id: 'w6-d2-g3',
            titleJp: 'Vことは Vが / Aいことは Aいが',
            connectionFormula: 'Kata yang sama diulang: V/A + ことは + V/A + が / けれど',
            shortMeaningId: 'Memang sih... tetapi... (mengakui hal depan sebelum membatasi)',
            easyExplanationId:
              'Mengakui fakta secara parsial ("memang bisa sih berbicara bahasa Jepang, tetapi kalau baca koran kanji masih susah"; "memang murah sih, tapi kualitasnya biasa saja").',
            examples: [
              {
                jp: '日本語を話せることは話せますが、敬語はまだ苦手です。',
                id: 'Memang bisa sih berbahasa Jepang, tetapi keigo masih kurang mahir.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w6-d2-r1',
            numberLabel: 'I-1',
            promptBefore: '会社の命令で、来月から大阪へ転勤する',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'ことになった' },
              { id: 'b', label: 'ことにした' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Mutasi kerja karena perintah perusahaan (pihak luar) → ことになった.',
          },
          {
            id: 'w6-d2-r2',
            numberLabel: 'I-2',
            promptBefore: '太ってきたので、今日から甘いものを食べない',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'ことにした' },
              { id: 'b', label: 'ことになった' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Keputusan pribadi pembicara sendiri → ことにした.',
          },
          {
            id: 'w6-d2-r3',
            numberLabel: 'I-3',
            promptBefore: 'このマンションではペットを飼ってはいけない',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'ことになっている' },
              { id: 'b', label: 'ことにしている' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menyatakan aturan umum yang berlaku di apartemen → ことになっている.',
          },
          {
            id: 'w6-d2-r4',
            numberLabel: 'I-4',
            promptBefore: 'その本は、',
            promptAfter: '、内容をほとんど覚えていない。',
            options: [
              { id: 'a', label: '読んだことは読んだが' },
              { id: 'b', label: '読むことにしたが' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Pengakuan parsial ("memang sudah baca sih, tapi hampir tidak ingat isinya") → 読んだことは読んだが.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w6-d2-o1',
            numberLabel: 'II-1',
            prefix: 'この部屋は',
            suffix: '、駅からは少し遠い。',
            tokens: [
              { id: 1, label: 'だが' },
              { id: 2, label: 'ことは' },
              { id: 3, label: 'きれい' },
              { id: 4, label: 'きれいな' },
            ],
            correctOrder: [4, 2, 3, 1],
            explanationId: 'Urutan kata sifat-na: きれいな ことは きれい だが (Memang bersih sih, tapi agak jauh dari stasiun).',
          },
          {
            id: 'w6-d2-o2',
            numberLabel: 'II-2',
            prefix: '日本人の友達と話すときは、',
            suffix: '。',
            tokens: [
              { id: 1, label: 'できるだけ' },
              { id: 2, label: 'している' },
              { id: 3, label: '日本語を使う' },
              { id: 4, label: 'ことに' },
            ],
            correctOrder: [1, 3, 4, 2],
            explanationId: 'Urutan: できるだけ 日本語を使う ことに している (Saya membiasakan diri sebisa mungkin memakai bahasa Jepang).',
          },
        ],
      },
      {
        id: 'w6-d3',
        weekNumber: 6,
        dayNumber: 3,
        titleJp: 'もう少しで乗り遅れるところだった',
        titleId: 'Momen Kritis, Pengalaman Pertama, & Selagi (ところだった・てはじめて・うちに)',
        grammarPoints: [
          {
            id: 'w6-d3-g1',
            titleJp: 'Vた + ところ / Vる + ところだった',
            connectionFormula: 'Vた + ところ (baru saja) ｜ もう少しで + Vる + ところだった (nyaris)',
            shortMeaningId: 'Baru saja selesai... / Hampir saja nyaris terjadi... (selamat!)',
            easyExplanationId:
              '1) Vたところ: baru saja selesai detik ini ("barusan saja pulang ke rumah"). 2) もう少しで + Vるところだった: hampir saja mengalami celaka/hal buruk, tapi untungnya tidak jadi terjadi ("untung lari, nyaris ketinggalan kereta!").',
            examples: [
              {
                jp: 'もう少しで終電に乗り遅れるところだった。',
                id: 'Sedikit lagi aku nyaris ketinggalan kereta terakhir (untung sempat naik!).',
              },
              {
                jp: '今ちょうど昼ごはんを食べ終わったところです。',
                id: 'Saya barusan saja selesai makan siang.',
              },
            ],
          },
          {
            id: 'w6-d3-g2',
            titleJp: 'Vて + はじめて',
            connectionFormula: 'Vて + はじめて + (kesadaran/perubahan)',
            shortMeaningId: 'Baru menyadari / mengerti untuk pertama kalinya setelah melakukan...',
            easyExplanationId:
              'Menunjukkan bahwa sebelum mengalami peristiwa A, kita tidak pernah mengerti atau merasakannya ("setelah sakit keras, baru aku sadar betapa berharganya kesehatan").',
            examples: [
              {
                jp: '一人暮らしを始めて、はじめて親のありがたみがわかった。',
                id: 'Setelah mulai hidup mandiri, barulah saya mengerti berharganya jasa orang tua.',
              },
            ],
          },
          {
            id: 'w6-d3-g3',
            titleJp: '～うちに',
            connectionFormula: 'Vる・Vている・Vない・Aい・naな・Nの + うちに',
            shortMeaningId: 'Selagi masih... (lakukan sebelum berubah!) / Tanpa terasa saat...',
            easyExplanationId:
              '1) Lakukan A selagi kondisi B masih berlangsung sebelum terlambat ("makan selagi hangat", "selagi masih muda, coba banyak hal"). 2) Vているうちに: saat sedang berlangsung tanpa disadari muncul hal baru ("sambil ngobrol, tahu-tahu hari sudah gelap").',
            examples: [
              {
                jp: '料理が冷めないうちに、どうぞ召し上がってください。',
                id: 'Selagi masakannya belum dingin, silakan disantap.',
              },
              {
                jp: '本を読んでいるうちに、眠くなってしまった。',
                id: 'Selagi sedang membaca buku, tanpa terasa saya jadi mengantuk.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w6-d3-r1',
            numberLabel: 'I-1',
            promptBefore: '道が凍っていて、もう少しで転ぶ',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'ところだった' },
              { id: 'b', label: 'ばかりだった' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Pasangan もう少しで ("hampir saja jatuh karena jalan beku") → ところだった.',
          },
          {
            id: 'w6-d3-r2',
            numberLabel: 'I-2',
            promptBefore: '日本に来て',
            promptAfter: '、日本の文化の細かさに気づいた。',
            options: [
              { id: 'a', label: 'はじめて' },
              { id: 'b', label: 'うちに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Baru menyadari setelah benar-benar datang ke Jepang → Vてはじめて.',
          },
          {
            id: 'w6-d3-r3',
            numberLabel: 'I-3',
            promptBefore: '雨が降らない',
            promptAfter: '、洗濯物を取り込んでしまおう。',
            options: [
              { id: 'a', label: 'うちに' },
              { id: 'b', label: 'ところに' },
            ],
            correctOptionIds: ['a'],
            explanationId: '"Selagi belum turun hujan, ayo angkat jemurannya" → Vない + うちに.',
          },
          {
            id: 'w6-d3-r4',
            numberLabel: 'I-4',
            promptBefore: '今、ちょうど会議が',
            promptAfter: 'ところです。',
            options: [
              { id: 'a', label: '終わった' },
              { id: 'b', label: '終わって' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Baru saja selesai detik ini (今ちょうど) → Vたところです (終わったところ).',
          },
        ],
        renshuuPart2: [
          {
            id: 'w6-d3-o1',
            numberLabel: 'II-1',
            prefix: '熱いうちに食べようと急いでいて、',
            suffix: '。',
            tokens: [
              { id: 1, label: 'ところ' },
              { id: 2, label: '火傷する' },
              { id: 3, label: 'だった' },
              { id: 4, label: 'もう少しで' },
            ],
            correctOrder: [4, 2, 1, 3],
            explanationId: 'Urutan: もう少しで 火傷する ところ だった (Sedikit lagi nyaris melepuh/terbakar lidahku!).',
          },
          {
            id: 'w6-d3-o2',
            numberLabel: 'II-2',
            prefix: '親元を離れて',
            suffix: 'ありがたさがわかった。',
            tokens: [
              { id: 1, label: '生活して' },
              { id: 2, label: 'の' },
              { id: 3, label: '親' },
              { id: 4, label: 'はじめて' },
            ],
            correctOrder: [1, 4, 3, 2],
            explanationId: 'Urutan: 生活して はじめて 親 の ありがたさがわかった (Setelah hidup jauh dari orang tua, barulah mengerti betapa berharganya orang tua).',
          },
        ],
      },
      {
        id: 'w6-d4',
        weekNumber: 6,
        dayNumber: 4,
        titleJp: 'できるわけがない',
        titleId: 'Keluarga Pola "わけ" (わけだ・わけではない・わけがない・わけにはいかない)',
        grammarPoints: [
          {
            id: 'w6-d4-g1',
            titleJp: '～わけだ',
            connectionFormula: 'V普通・Aい・naな・Nの + わけだ',
            shortMeaningId: 'Pantas saja... / Jadi artinya... (kesimpulan wajar)',
            easyExplanationId:
              'Dipakai saat kita baru paham alasan di balik suatu kenyataan ("oh dia lahir di Tokyo, pantas saja bahasa Jepangnya bagus"; "berarti total harganya jadi 5.000 yen ya").',
            examples: [
              {
                jp: '彼は10年も日本に住んでいたのか。日本語が上手なわけだ。',
                id: 'Oh dia tinggal di Jepang selama 10 tahun ya. Pantas saja bahasa Jepangnya lancar.',
              },
            ],
          },
          {
            id: 'w6-d4-g2',
            titleJp: '～わけではない',
            connectionFormula: 'Kalimat Biasa / naな / Nの + わけではない',
            shortMeaningId: 'Bukan berarti... / Tidak sepenuhnya begitu',
            easyExplanationId:
              'Menghaluskan penyangkalan agar pendengar tidak salah paham total ("bukan berarti aku benci sayur, cuma kurang suka tomat saja"; "meski tinggal di Tokyo, bukan berarti tahu semua jalan").',
            examples: [
              {
                jp: '日本料理が嫌いなわけではないが、毎日だと飽きてしまう。',
                id: 'Bukan berarti tidak suka masakan Jepang, tapi kalau tiap hari jadi bosan.',
              },
            ],
          },
          {
            id: 'w6-d4-g3',
            titleJp: '～わけがない / わけはない',
            connectionFormula: 'Kalimat Biasa / naな / Nの + わけがない',
            shortMeaningId: 'Mana mungkin! / Tidak mungkin sekali...',
            easyExplanationId:
              'Penyangkalan keras atas sesuatu yang menurut akal sehat mustahil ("anak SD mana mungkin bisa mengerjakan soal universitas!"). Mirip はずがない tapi lebih kuat/emosional.',
            examples: [
              {
                jp: '全然練習しなかったのに、試合に勝てるわけがない。',
                id: 'Padahal sama sekali tidak latihan, mana mungkin bisa menang bertanding!',
              },
            ],
          },
          {
            id: 'w6-d4-g4',
            titleJp: 'Vる / Vない + わけにはいかない',
            connectionFormula: 'Vkamus / Vない + わけにはいかない',
            shortMeaningId: 'Tidak bisa begitu saja... / Terpaksa tidak boleh (karena alasan moral/tanggung jawab)',
            easyExplanationId:
              '1) Vるわけにはいかない: secara moral/sosial tidak boleh melakukannya meski ingin ("besok ujian penting, tidak boleh tidur santai/tidak belajar"; "rahasia teman tidak boleh dibocorkan"). 2) Vないわけにはいかない: mau tidak mau harus melakukannya ("sudah janji, tidak bisa tidak hadir").',
            examples: [
              {
                jp: '大切な仕事があるから、風邪くらいで会社を休むわけにはいかない。',
                id: 'Karena ada pekerjaan penting, tidak bisa begitu saja izin libur hanya karena pilek ringan.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w6-d4-r1',
            numberLabel: 'I-1',
            promptBefore: 'あ、今日は祝日か。だから道がすいている',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'わけだ' },
              { id: 'b', label: 'わけがない' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Mengerti sebabnya secara logis ("Pantas saja jalanan sepi!") → わけだ.',
          },
          {
            id: 'w6-d4-r2',
            numberLabel: 'I-2',
            promptBefore: '決して仕事が嫌な',
            promptAfter: 'が、家族との時間を増やしたいと思った。',
            options: [
              { id: 'a', label: 'わけではない' },
              { id: 'b', label: 'わけにはいかない' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Meluruskan kesalahpahaman ("bukan berarti benci pekerjaan...") → わけではない.',
          },
          {
            id: 'w6-d4-r3',
            numberLabel: 'I-3',
            promptBefore: '10分でこの難しいレポートが書ける',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'わけがない' },
              { id: 'b', label: 'わけではない' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Mustahil selesai dalam 10 menit → わけがない.',
          },
          {
            id: 'w6-d4-r4',
            numberLabel: 'I-4',
            promptBefore: '部長に頼まれた仕事だから、途中でやめる',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'わけにはいかない' },
              { id: 'b', label: 'わけがない' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Karena tanggung jawab sosial/tugas dari atasan, tidak bisa berhenti di tengah jalan → わけにはいかない.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w6-d4-o1',
            numberLabel: 'II-1',
            prefix: '大切な約束があるので、今日は',
            suffix: '。',
            tokens: [
              { id: 1, label: 'いかない' },
              { id: 2, label: '帰る' },
              { id: 3, label: 'わけに' },
              { id: 4, label: 'は' },
            ],
            correctOrder: [2, 3, 4, 1],
            explanationId: 'Urutan: 帰る わけに は いかない (hari ini tidak bisa langsung pulang begitu saja).',
          },
          {
            id: 'w6-d4-o2',
            numberLabel: 'II-2',
            prefix: '日本に住んでいるからといって、',
            suffix: '。',
            tokens: [
              { id: 1, label: 'みんな' },
              { id: 2, label: '日本語が' },
              { id: 3, label: 'ではない' },
              { id: 4, label: 'ペラペラなわけ' },
            ],
            correctOrder: [1, 2, 4, 3],
            explanationId: 'Urutan: みんな 日本語が ペラペラなわけ ではない (Bukan berarti semua yang tinggal di Jepang fasih bahasa Jepang).',
          },
        ],
      },
      {
        id: 'w6-d5',
        weekNumber: 6,
        dayNumber: 5,
        titleJp: 'めったに行かない',
        titleId: 'Kata Keterangan Penegas Negatif (決して・まったく・めったに・少しも/ちっとも)',
        grammarPoints: [
          {
            id: 'w6-d5-g1',
            titleJp: '決して + ～ない',
            connectionFormula: '決して + Kalimat Negatif（～ない / ～ません）',
            registerTag: 'Negatif',
            shortMeaningId: 'Sekali-kali tidak akan pernah... (tekad atau larangan keras)',
            easyExplanationId:
              'Menekankan tekad pribadi yang sangat kuat ("tidak akan pernah lupa seumur hidup") atau larangan tegas ("sekali-kali jangan beri tahu siapa pun").',
            examples: [
              {
                jp: 'この恩は一生決して忘れません。',
                id: 'Budi baik ini sekali-kali tidak akan pernah saya lupakan seumur hidup.',
              },
            ],
          },
          {
            id: 'w6-d5-g2',
            titleJp: 'まったく + ～ない',
            connectionFormula: 'まったく + Vない / Aくない / Nではない',
            registerTag: 'Negatif',
            shortMeaningId: 'Sama sekali tidak... (0%)',
            easyExplanationId:
              'Menyangkal 100% tanpa sisa ("sama sekali tidak tahu", "sama sekali tidak mengerti"). Catatan: まったく bisa juga muncul di kalimat positif dalam arti "sungguh benar-benar..." (まったくその通りだ).',
            examples: [
              {
                jp: '初めて聞く話だったので、まったくわからなかった。',
                id: 'Karena itu hal yang pertama kali kudengar, aku sama sekali tidak mengerti.',
              },
            ],
          },
          {
            id: 'w6-d5-g3',
            titleJp: 'めったに + ～ない',
            connectionFormula: 'めったに + Vない / めったにない (jarang terjadi)',
            registerTag: 'Negatif',
            shortMeaningId: 'Sangat jarang / Hampir tidak pernah terjadi...',
            easyExplanationId:
              'Menunjukkan frekuensi yang sangat langka, hanya sesekali dalam jangka lama ("saya jarang sekali makan di restoran mewah", "kesempatan langka").',
            examples: [
              {
                jp: '忙しいので、家族と外食することはめったにない。',
                id: 'Karena sibuk, saya sangat jarang makan di luar bersama keluarga.',
              },
            ],
          },
          {
            id: 'w6-d5-g4',
            titleJp: '少しも / ちっとも + ～ない',
            connectionFormula: '少しも / ちっとも + Vない / Aくない',
            registerTag: 'Negatif',
            shortMeaningId: 'Sedikit pun tidak... (ちっとも lebih kasual & bernada kecewa)',
            easyExplanationId:
              'Sama-sama berarti "tidak berubah sedikit pun", tapi ちっとも lebih bersifat percakapan dan sering disertai rasa jengkel atau mengeluh ("sudah minum obat tapi demamnya tidak turun sedikit pun").',
            examples: [
              {
                jp: '毎日水をやっているのに、花がちっとも咲かない。',
                id: 'Padahal disiram tiap hari, tapi bunganya sedikit pun tidak mekar.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w6-d5-r1',
            numberLabel: 'I-1',
            promptBefore: 'この秘密は誰にも',
            promptAfter: '言わないでください。',
            options: [
              { id: 'a', label: '決して' },
              { id: 'b', label: 'めったに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Larangan keras agar tidak membocorkan rahasia → 決して ～ないで.',
          },
          {
            id: 'w6-d5-r2',
            numberLabel: 'I-2',
            promptBefore: '普段は車で通勤しているので、電車には',
            promptAfter: '乗らない。',
            options: [
              { id: 'a', label: 'めったに' },
              { id: 'b', label: '決して' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menyatakan frekuensi yang sangat jarang → めったに ～ない.',
          },
          {
            id: 'w6-d5-r3',
            numberLabel: 'I-3',
            promptBefore: '昨日から熱があるが、薬を飲んでも',
            promptAfter: 'よくならない。',
            options: [
              { id: 'a', label: 'ちっとも' },
              { id: 'b', label: 'めったに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Keadaan tidak membaik sedikit pun (keluhan) → ちっとも ～ない.',
          },
          {
            id: 'w6-d5-r4',
            numberLabel: 'I-4',
            promptBefore: '専門用語が多すぎて、新聞の記事が',
            promptAfter: '理解できなかった。',
            options: [
              { id: 'a', label: 'まったく' },
              { id: 'b', label: 'めったに' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Sama sekali tidak bisa memahami (0%) → まったく.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w6-d5-o1',
            numberLabel: 'II-1',
            prefix: 'こんな美しい景色は',
            suffix: '。',
            tokens: [
              { id: 1, label: 'ない' },
              { id: 2, label: 'めったに' },
              { id: 3, label: '見られる' },
              { id: 4, label: 'ものでは' },
            ],
            correctOrder: [2, 3, 4, 1],
            explanationId: 'Urutan: めったに 見られる ものでは ない (bukan hal yang bisa sering-sering dilihat / sangat langka).',
          },
          {
            id: 'w6-d5-o2',
            numberLabel: 'II-2',
            prefix: 'いくら友達に勧められても、私は',
            suffix: '。',
            tokens: [
              { id: 1, label: 'つもりだ' },
              { id: 2, label: '決して' },
              { id: 3, label: '行かない' },
              { id: 4, label: 'そこへは' },
            ],
            correctOrder: [4, 2, 3, 1],
            explanationId: 'Urutan: そこへは 決して 行かない つもりだ (saya bertekad sekali-kali tidak akan pergi ke sana).',
          },
        ],
      },
      {
        id: 'w6-d6',
        weekNumber: 6,
        dayNumber: 6,
        titleJp: 'その上…',
        titleId: 'Konjungsi Penambah & Pilihan (それと/あと・それとも・その上)',
        grammarPoints: [
          {
            id: 'w6-d6-g1',
            titleJp: 'A。それと B。 / あと B。',
            connectionFormula: 'Kalimat 1。それと / あと、Kalimat 2（tambahan info）',
            registerTag: 'Lisan',
            shortMeaningId: 'Lalu satu lagi... / Dan juga... (menambah hal yang teringat)',
            easyExplanationId:
              'Dipakai saat menjelaskan daftar tugas, pesanan, atau informasi lalu menambahkan poin tambahan yang baru teringat ("beli susu dan roti. Lalu, telur juga ya!"). あと lebih santai lagi dari それと.',
            examples: [
              {
                jp: '明日はノートと筆記用具を持ってきてください。それと、学生証も忘れずに。',
                id: 'Besok tolong bawa buku catatan dan alat tulis. Lalu, jangan lupa kartu pelajarnya juga.',
              },
            ],
          },
          {
            id: 'w6-d6-g2',
            titleJp: 'A？ それとも B？',
            connectionFormula: 'Pilihan 1 (？) それとも、Pilihan 2 (？)',
            shortMeaningId: 'Atau apakah memilih B? (kalimat tanya pilihan)',
            easyExplanationId:
              'Menghubungkan dua kalimat tanya atau pilihan yang berbeda. Berbeda dengan か dalam kalimat berita ("A atau B"), それとも khusus dipakai untuk menanyakan pilihan di antara dua kalimat/opsi.',
            examples: [
              {
                jp: '飲み物はコーヒーにしますか。それとも、紅茶にしますか。',
                id: 'Minumannya mau kopi? Atau mau teh?',
              },
            ],
          },
          {
            id: 'w6-d6-g3',
            titleJp: 'A。その上 B。（累加・強調）',
            connectionFormula: 'Sifat/Fakta A。その上、Sifat/Fakta B（yang searah）',
            shortMeaningId: 'Selain itu / Ditambah lagi... (sama-sama nilai plus atau sama-sama minus)',
            easyExplanationId:
              'Menumpuk hal baik di atas hal baik, ATAU hal buruk di atas hal buruk ("apartemennya dekat stasiun; ditambah lagi murah dan luas!"; "dompet hilang; ditambah lagi kehujanan!").',
            tipOrPitfallId:
              'Hal A dan B HARUS searah (+ dengan +, atau - dengan -)! Tidak boleh menggabungkan kelebihan dan kekurangan dengan その上.',
            examples: [
              {
                jp: 'このレストランは料理がおいしい。その上、店員の態度もとても親切だ。',
                id: 'Restoran ini masakannya enak. Ditambah lagi, sikap pelayannya juga sangat ramah.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w6-d6-r1',
            numberLabel: 'I-1',
            promptBefore: '旅行は北海道に行きたいですか。',
            promptAfter: '、沖縄のほうがいいですか。',
            options: [
              { id: 'a', label: 'それとも' },
              { id: 'b', label: 'その上' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Kalimat tanya yang menawarkan dua pilihan alternatif → それとも.',
          },
          {
            id: 'w6-d6-r2',
            numberLabel: 'I-2',
            promptBefore: 'このスマートフォンは画面がきれいだし、軽い。',
            promptAfter: '、バッテリーも長持ちする。',
            options: [
              { id: 'a', label: 'その上' },
              { id: 'b', label: 'それとも' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menambah keunggulan baru di atas keunggulan sebelumnya → その上.',
          },
          {
            id: 'w6-d6-r3',
            numberLabel: 'I-3',
            promptBefore: 'スーパーで牛乳を買ってきて。',
            promptAfter: '、パンも切れていたからお願いね。',
            options: [
              { id: 'a', label: 'あと' },
              { id: 'b', label: 'それとも' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menambah titipan belanja dalam percakapan santai → あと.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w6-d6-o1',
            numberLabel: 'II-1',
            prefix: '今日は電車で帰りますか。',
            suffix: '帰りますか。',
            tokens: [
              { id: 1, label: 'タクシー' },
              { id: 2, label: 'で' },
              { id: 3, label: '、' },
              { id: 4, label: 'それとも' },
            ],
            correctOrder: [4, 3, 1, 2],
            explanationId: 'Urutan: それとも 、 タクシー で 帰りますか (Atau pulang naik taksi?).',
          },
          {
            id: 'w6-d6-o2',
            numberLabel: 'II-2',
            prefix: '昨日は財布をなくした。',
            suffix: '風邪までひいてしまった。',
            tokens: [
              { id: 1, label: '、' },
              { id: 2, label: '傘を忘れて' },
              { id: 3, label: 'その上' },
              { id: 4, label: 'ぬれて' },
            ],
            correctOrder: [3, 1, 2, 4],
            explanationId: 'Urutan: その上 、 傘を忘れて ぬれて (Ditambah lagi lupa bawa payung sampai basah kehujanan lalu masuk angin).',
          },
        ],
      },
    ],
    jissen: {
      id: 'w6-d7',
      weekNumber: 6,
      dayNumber: 7,
      titleJp: '第6週 実践問題',
      titleId: 'Latihan Ujian Mingguan (Minggu 6)',
      timeLimitMin: 15,
      mondai3PassageTitleJp: '新しい生活への決心',
      mondai3PassageLines: [
        '大学の卒業を来月にひかえ、私は4月から東京の会社で働く [ 21 ]。初めての一人暮らしなので不安もあるが、自分で選んだ道だから、途中で簡単にあきらめる [ 22 ] と思っている。',
        'アルバイトをしていたころは、何か困ったことがあるとすぐ先輩に頼っていた。しかし、一人暮らしを始めて親元を離れて [ 23 ]、自分のことはすべて自分でやらなければならないと実感するだろう。',
        '慣れるまでは大変かもしれないが、新しい仕事はやりがいがある。[ 24 ]、尊敬できる先輩たちと一緒に働けるのも楽しみだ。まだ若い [ 25 ] たくさんの経験を積んで成長したい。',
      ],
      questions: [
        {
          id: 'w6-j-1',
          number: 1,
          type: 'mondai1_mcq',
          promptJp: '（　　）100万円あったら、世界中を旅行してみたい。',
          options: [
            { id: '1', label: 'もしも' },
            { id: '2', label: 'まるで' },
            { id: '3', label: '決して' },
            { id: '4', label: 'ちっとも' },
          ],
          correctOptionId: '1',
          explanationId: 'Pengandaian di depan bentuk たら ("Seandainya punya 1 juta yen...") → もしも.',
        },
        {
          id: 'w6-j-2',
          number: 2,
          type: 'mondai1_mcq',
          promptJp: 'もし試合に負けた（　　）、悔いのないように全力を出したい。',
          options: [
            { id: '1', label: 'としても' },
            { id: '2', label: 'わけにはいかない' },
            { id: '3', label: 'からには' },
            { id: '4', label: 'ことになった' },
          ],
          correctOptionId: '1',
          explanationId: '"Kalaupun misalnya kalah dalam pertandingan, ingin berjuang sekuat tenaga agar tak menyesal" → としても.',
        },
        {
          id: 'w6-j-3',
          number: 3,
          type: 'mondai1_mcq',
          promptJp: '今度の会議は来週の火曜日に開く（　　）。',
          options: [
            { id: '1', label: 'ことになった' },
            { id: '2', label: 'ことにした' },
            { id: '3', label: 'ところだった' },
            { id: '4', label: 'わけがない' },
          ],
          correctOptionId: '1',
          explanationId: 'Jadwal rapat yang diputuskan organisasi/pihak kantor → ことになった.',
        },
        {
          id: 'w6-j-4',
          number: 4,
          type: 'mondai1_mcq',
          promptJp: '健康のため、毎朝起きたらすぐコップ一杯の水を飲む（　　）。',
          options: [
            { id: '1', label: 'ことにしている' },
            { id: '2', label: 'ことになっている' },
            { id: '3', label: 'わけになっている' },
            { id: '4', label: 'ところになっている' },
          ],
          correctOptionId: '1',
          explanationId: 'Kebiasaan pribadi rutin yang diputuskan sendiri → ことにしている.',
        },
        {
          id: 'w6-j-5',
          number: 5,
          type: 'mondai1_mcq',
          promptJp: 'このパソコンは（　　）、少し動きが遅くなってきた。',
          options: [
            { id: '1', label: '使えることは使えるが' },
            { id: '2', label: '使うことになるが' },
            { id: '3', label: '使わないわけがないが' },
            { id: '4', label: '使うところだったが' },
          ],
          correctOptionId: '1',
          explanationId: 'Pengakuan parsial: "Memang masih bisa dipakai sih, tapi agak mulai lemot" → 使えることは使えるが.',
        },
        {
          id: 'w6-j-6',
          number: 6,
          type: 'mondai1_mcq',
          promptJp: 'もう少しで電車に傘を（　　）。あぶないところだった。',
          options: [
            { id: '1', label: '忘れるところだった' },
            { id: '2', label: '忘れたところだった' },
            { id: '3', label: '忘れるわけだった' },
            { id: '4', label: '忘れることになった' },
          ],
          correctOptionId: '1',
          explanationId: 'Hampir saja nyaris ketinggalan payung (untung tersadar tepat waktu) → 忘れるところだった.',
        },
        {
          id: 'w6-j-7',
          number: 7,
          type: 'mondai1_mcq',
          promptJp: '病気になって（　　）、健康の大切さがよくわかった。',
          options: [
            { id: '1', label: 'はじめて' },
            { id: '2', label: 'うちに' },
            { id: '3', label: 'ばかり' },
            { id: '4', label: 'ところ' },
          ],
          correctOptionId: '1',
          explanationId: '"Baru benar-benar mengerti setelah jatuh sakit" → てはじめて.',
        },
        {
          id: 'w6-j-8',
          number: 8,
          type: 'mondai1_mcq',
          promptJp: '冷めない（　　）、温かいうちに召し上がってください。',
          options: [
            { id: '1', label: 'うちに' },
            { id: '2', label: 'ところに' },
            { id: '3', label: 'わけで' },
            { id: '4', label: 'はじめて' },
          ],
          correctOptionId: '1',
          explanationId: 'Selagi belum dingin → 冷めないうちに.',
        },
        {
          id: 'w6-j-9',
          number: 9,
          type: 'mondai1_mcq',
          promptJp: '彼は日本人の母を持つ。だから、漢字も詳しい（　　）。',
          options: [
            { id: '1', label: 'わけだ' },
            { id: '2', label: 'わけではない' },
            { id: '3', label: 'わけがない' },
            { id: '4', label: 'わけにはいかない' },
          ],
          correctOptionId: '1',
          explanationId: '"Oh pantas saja ia paham kanji!" (kesimpulan logis) → わけだ.',
        },
        {
          id: 'w6-j-10',
          number: 10,
          type: 'mondai1_mcq',
          promptJp: '甘いものが嫌いな（　　）が、ダイエット中なので食べないようにしている。',
          options: [
            { id: '1', label: 'わけだ' },
            { id: '2', label: 'わけではない' },
            { id: '3', label: 'わけがない' },
            { id: '4', label: 'わけにはいかない' },
          ],
          correctOptionId: '2',
          explanationId: '"Bukan berarti tidak suka makanan manis, hanya saja sedang diet" → わけではない.',
        },
        {
          id: 'w6-j-11',
          number: 11,
          type: 'mondai1_mcq',
          promptJp: '一度も練習していないのだから、上手に弾ける（　　）。',
          options: [
            { id: '1', label: 'わけだ' },
            { id: '2', label: 'わけではない' },
            { id: '3', label: 'わけがない' },
            { id: '4', label: 'わけにはいかない' },
          ],
          correctOptionId: '3',
          explanationId: '"Mana mungkin bisa main dengan lancar!" → わけがない.',
        },
        {
          id: 'w6-j-12',
          number: 12,
          type: 'mondai1_mcq',
          promptJp: '友達に頼まれた大切な約束なので、行かない（　　）。',
          options: [
            { id: '1', label: 'わけにはいかない' },
            { id: '2', label: 'わけではない' },
            { id: '3', label: 'わけがない' },
            { id: '4', label: 'わけだ' },
          ],
          correctOptionId: '1',
          explanationId: 'Secara tanggung jawab moral tidak bisa tidak hadir → 行かないわけにはいかない.',
        },
        {
          id: 'w6-j-13',
          number: 13,
          type: 'mondai1_mcq',
          promptJp: 'ここは田舎なので、夜9時を過ぎると人が（　　）歩かない。',
          options: [
            { id: '1', label: 'めったに' },
            { id: '2', label: '決して' },
            { id: '3', label: 'ちっとも' },
            { id: '4', label: 'もしも' },
          ],
          correctOptionId: '1',
          explanationId: 'Sangat jarang ada orang lewat di atas jam 9 malam → めったに ～ない.',
        },
        {
          id: 'w6-j-14',
          number: 14,
          type: 'mondai1_mcq',
          promptJp: 'このマンションは駅から近い。（　　）、周りにスーパーや銀行もあって便利だ。',
          options: [
            { id: '1', label: 'それとも' },
            { id: '2', label: 'その上' },
            { id: '3', label: 'ところが' },
            { id: '4', label: 'しかし' },
          ],
          correctOptionId: '2',
          explanationId: 'Menambah nilai plus di atas nilai plus sebelumnya → その上.',
        },
        {
          id: 'w6-j-15',
          number: 15,
          type: 'mondai1_mcq',
          promptJp: 'お支払いは現金になさいますか。（　　）、カードになさいますか。',
          options: [
            { id: '1', label: 'それとも' },
            { id: '2', label: 'その上' },
            { id: '3', label: 'それと' },
            { id: '4', label: 'ですから' },
          ],
          correctOptionId: '1',
          explanationId: 'Kalimat tanya pilihan: "Tunai? Atau pakai kartu?" → それとも.',
        },
        {
          id: 'w6-j-16',
          number: 16,
          type: 'mondai2_star',
          starPrefix: '今度の休みに旅行へ行くなら、',
          starSuffix: '。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: 'ホテルを' },
            { id: '2', label: '予約した' },
            { id: '3', label: '早めに' },
            { id: '4', label: 'ほうがいい' },
          ],
          correctOptionId: '2',
          correctOrderIds: ['3', '1', '2', '4'],
          explanationId: 'Urutan: 早めに (3) ホテルを (1) 予約した ★ (2) ほうがいい (4).',
        },
        {
          id: 'w6-j-17',
          number: 17,
          type: 'mondai2_star',
          starPrefix: '日本語を勉強するなら、',
          starSuffix: '覚えたほうがいい。',
          starSlotIndex: 1,
          options: [
            { id: '1', label: '今の' },
            { id: '2', label: 'うちに' },
            { id: '3', label: '基本を' },
            { id: '4', label: 'しっかり' },
          ],
          correctOptionId: '2',
          correctOrderIds: ['1', '2', '3', '4'],
          explanationId: 'Urutan: 今の (1) うちに ★ (2) 基本を (3) しっかり (4) 覚えたほうがいい.',
        },
        {
          id: 'w6-j-18',
          number: 18,
          type: 'mondai2_star',
          starPrefix: '今日は体調が悪いので、',
          starSuffix: '。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: 'お酒は' },
            { id: '2', label: '飲まない' },
            { id: '3', label: 'にする' },
            { id: '4', label: 'こと' },
          ],
          correctOptionId: '4',
          correctOrderIds: ['1', '2', '4', '3'],
          explanationId: 'Urutan: お酒は (1) 飲まない (2) こと ★ (4) にする (3).',
        },
        {
          id: 'w6-j-19',
          number: 19,
          type: 'mondai2_star',
          starPrefix: 'お医者さんに止められているから、',
          starSuffix: '。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: 'わけには' },
            { id: '2', label: '食べる' },
            { id: '3', label: '甘いものを' },
            { id: '4', label: 'いかない' },
          ],
          correctOptionId: '1',
          correctOrderIds: ['3', '2', '1', '4'],
          explanationId: 'Urutan: 甘いものを (3) 食べる (2) わけには ★ (1) いかない (4).',
        },
        {
          id: 'w6-j-20',
          number: 20,
          type: 'mondai2_star',
          starPrefix: '1時間以上待ったのに、彼は',
          starSuffix: '。',
          starSlotIndex: 1,
          options: [
            { id: '1', label: '電話も' },
            { id: '2', label: '来ないし' },
            { id: '3', label: 'ちっとも' },
            { id: '4', label: 'くれない' },
          ],
          correctOptionId: '2',
          correctOrderIds: ['3', '2', '1', '4'],
          explanationId: 'Urutan: ちっとも (3) 来ないし ★ (2) 電話も (1) くれない (4).',
        },
        {
          id: 'w6-j-21',
          number: 21,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'ことになった' },
            { id: '2', label: 'ことにした' },
            { id: '3', label: 'ところだった' },
            { id: '4', label: 'わけがない' },
          ],
          correctOptionId: '1',
          explanationId: 'Sudah diterima dan diputuskan bekerja di perusahaan Tokyo mulai bulan April → ことになった.',
        },
        {
          id: 'w6-j-22',
          number: 22,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'わけにはいかない' },
            { id: '2', label: 'わけではない' },
            { id: '3', label: 'わけだ' },
            { id: '4', label: 'はずだ' },
          ],
          correctOptionId: '1',
          explanationId: 'Tekad tanggung jawab: "Karena jalan yang kupilih sendiri, tidak boleh menyerah begitu saja di tengah jalan" → あきらめるわけにはいかない.',
        },
        {
          id: 'w6-j-23',
          number: 23,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'はじめて' },
            { id: '2', label: 'うちに' },
            { id: '3', label: 'からには' },
            { id: '4', label: 'ところ' },
          ],
          correctOptionId: '1',
          explanationId: '"Setelah jauh dari orang tua, barulah benar-benar terasa..." → 離れてはじめて.',
        },
        {
          id: 'w6-j-24',
          number: 24,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'その上' },
            { id: '2', label: 'それとも' },
            { id: '3', label: 'ところが' },
            { id: '4', label: 'だけど' },
          ],
          correctOptionId: '1',
          explanationId: 'Menambah hal positif baru (pekerjaan memuaskan + rekan senior yang dikagumi) → その上.',
        },
        {
          id: 'w6-j-25',
          number: 25,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'うちに' },
            { id: '2', label: 'ところに' },
            { id: '3', label: 'ばかりに' },
            { id: '4', label: 'ために' },
          ],
          correctOptionId: '1',
          explanationId: '"Selagi masih muda, ingin menumpuk banyak pengalaman dan berkembang" → 若いうちに.',
        },
      ],
      keigoTip: {
        titleJp: '敬語：いただく・Vていただく・Vさせていただく',
        summaryId:
          'Pelajaran Keigo Minggu 6 (Penutup): Bentuk merendah (謙譲語) dari 「もらう」 saat menerima bantuan/izin dari guru, atasan, atau klien.',
        pairs: [
          {
            plain: 'もらう (menerima benda)',
            honorificOrHumble: 'いただく (謙譲語)',
            meaningId: 'Menerima sesuatu dari pihak yang dihormati',
            exampleJp: '先生からすてきな本をいただきました。',
          },
          {
            plain: 'Vてもらう (minta tolong/dibantu)',
            honorificOrHumble: 'Vていただく (謙譲語)',
            meaningId: 'Dibantu oleh / memohon kesediaan orang lain melakukan V',
            exampleJp: '先生に日本語を直していただきました。',
          },
          {
            plain: 'Vさせてもらう (minta izin melakukan)',
            honorificOrHumble: 'Vさせていただく (謙譲語)',
            meaningId: 'Memohon izin untuk melakukan V dengan sangat sopan',
            exampleJp: '明日、会社を休ませていただきたいのですが。',
          },
        ],
      },
    },
  },
];
