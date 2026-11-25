import type { SouMatomeWeek } from '../types/jlpt';

export const SOU_MATOME_W1_2: SouMatomeWeek[] = [
  {
    weekNumber: 1,
    titleJp: '第1週 がんばらなくちゃ！',
    themeId: 'Pasif, Bentuk Lisan Sehari-hari, Kemiripan, & Perubahan Keadaan (ように)',
    days: [
      {
        id: 'w1-d1',
        weekNumber: 1,
        dayNumber: 1,
        titleJp: 'ぼくにもやらせて',
        titleId: 'Kalimat Pasif & Meminta Izin (～れる・～させてください)',
        grammarPoints: [
          {
            id: 'w1-d1-g1',
            titleJp: '～れる / ～られる（受身・Netral）',
            connectionFormula: 'V1: a段+れる ｜ V2: 語幹+られる ｜ くる→こられる ｜ する→される',
            shortMeaningId: 'Di-... (kalimat pasif netral / fakta umum)',
            easyExplanationId:
              'Dipakai saat benda, acara, atau orang menjadi subjek yang menerima tindakan. Cocok untuk menjelaskan berita, aturan, atau bangunan/buku yang dibuat oleh seseorang (pakai によって jika pembuatnya disebut).',
            tipOrPitfallId:
              'Jangan bingung dengan bentuk potensial (bisa)! Pada V2 & する, kalimat pasif memakai konteks "dikenai tindakan", sering diikuti partikel に atau が.',
            examples: [
              {
                jp: 'この本は多くの若者に読まれている。',
                id: 'Buku ini banyak dibaca oleh anak muda.',
              },
              {
                jp: '会議は来週の月曜日に開かれる予定です。',
                id: 'Rapat dijadwalkan akan diadakan hari Senin minggu depan.',
              },
            ],
          },
          {
            id: 'w1-d1-g2',
            titleJp: '(Nに) Vれる / Vられる（迷惑の受身）',
            connectionFormula: 'Pelaku + に + Vpasif (sering dirasakan merugikan/mengganggu)',
            registerTag: 'Perhatian',
            shortMeaningId: 'Mengalami hal tidak enak / terganggu karena ulah seseorang',
            easyExplanationId:
              'Khas bahasa Jepang! Menunjukkan pembicara merasa terganggu, sedih, atau kerepotan oleh tindakan orang lain atau kejadian alam (seperti hujan). Kata kerja intransitif seperti 泣く (menangis), 降る (turun hujan), 死ぬ (meninggal) juga bisa dibuat pasif.',
            tipOrPitfallId:
              'Jika ada objek yang dikenai tindakan (misal dompet saya dicuri), subjek tetap 私 (saya), bukan dompetnya: 私はどろぼうに財布を盗まれた.',
            examples: [
              {
                jp: '電車の中で隣の人に足を踏まれた。',
                id: 'Di dalam kereta, kaki saya terinjak oleh orang di sebelah.',
              },
              {
                jp: '傘を持っていないときに雨に降られて困った。',
                id: 'Repot sekali karena kehujanan saat tidak membawa payung.',
              },
            ],
          },
          {
            id: 'w1-d1-g3',
            titleJp: 'V(さ)せてください / V(さ)せてもらえますか',
            connectionFormula: 'V1: a段+せる ｜ V2: 語幹+させる ｜ くる→こさせる ｜ する→させる (+ てください)',
            registerTag: 'Formal',
            shortMeaningId: 'Tolong izinkan saya melakukan...',
            easyExplanationId:
              'Digunakan saat meminta izin dengan sopan agar lawan bicara membolehkan kita melakukan sesuatu (pulang lebih awal, mencoba ikut, beristirahat). させていただけませんか lebih halus lagi untuk atasan.',
            tipOrPitfallId:
              'Khusus kata kerja kelompok 1 yang berakhiran ～う, berubah menjadi ～わ + せる (contoh: 買う → 買わせてください, bukan 買あせて).',
            examples: [
              {
                jp: '気分が悪いので、今日は早退させてください。',
                id: 'Karena tidak enak badan, tolong izinkan saya pulang lebih awal hari ini.',
              },
              {
                jp: '面白いゲームですね。ぼくにもやらせてもらえますか。',
                id: 'Game yang menarik ya. Bolehkah saya juga ikut mencobanya?',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w1-d1-r1',
            numberLabel: 'I-1',
            promptBefore: '日本のマンガは世界中で',
            promptAfter: 'いる。',
            options: [
              { id: 'a', label: '読んで' },
              { id: 'b', label: '読まれて' },
            ],
            correctOptionIds: ['b'],
            explanationId: 'Subjeknya benda (日本のマンガ), jadi menggunakan bentuk pasif 読まれている (dibaca).',
          },
          {
            id: 'w1-d1-r2',
            numberLabel: 'I-2',
            promptBefore: '夜遅くまで隣の部屋で騒がれて、よく',
            promptAfter: '。',
            options: [
              { id: 'a', label: '眠れなかった' },
              { id: 'b', label: '眠られなかった' },
            ],
            correctOptionIds: ['a'],
            explanationId: '眠る (V1) bentuk potensialnya "tidak bisa tidur" adalah 眠れなかった.',
          },
          {
            id: 'w1-d1-r3',
            numberLabel: 'I-3',
            promptBefore: '会議でわたしの意見がみんなに',
            promptAfter: '。',
            options: [
              { id: 'a', label: '反対した' },
              { id: 'b', label: '反対された' },
            ],
            correctOptionIds: ['b'],
            explanationId: 'Pendapat saya "ditentang oleh semua orang (みんなに)", jadi pakai bentuk pasif 反対された.',
          },
          {
            id: 'w1-d1-r4',
            numberLabel: 'I-4',
            promptBefore: 'ちょっと気分が悪いので、ここで少し',
            promptAfter: 'ください。',
            options: [
              { id: 'a', label: '休ませて' },
              { id: 'b', label: '休まれて' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Meminta izin untuk beristirahat memakai bentuk kausatif + てください → 休ませてください.',
          },
          {
            id: 'w1-d1-r5',
            numberLabel: 'I-5',
            promptBefore: 'すみませんが、来週の金曜日、会社を',
            promptAfter: 'もらえませんか。',
            options: [
              { id: 'a', label: '休ませて' },
              { id: 'b', label: '休んで' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Meminta izin libur kepada pihak kantor memakai pola V(さ)せてもらえませんか → 休ませてもらえませんか.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w1-d1-o1',
            numberLabel: 'II-1',
            prefix: '電車の中で赤ちゃんに',
            suffix: '困った。',
            tokens: [
              { id: 1, label: '大きい' },
              { id: 2, label: '声で' },
              { id: 3, label: '泣かれて' },
              { id: 4, label: 'ずっと' },
            ],
            correctOrder: [4, 1, 2, 3],
            explanationId: 'Urutan alami: ずっと 大きい 声で 泣かれて (terus menangis dengan suara keras → pasif meiwaku).',
          },
          {
            id: 'w1-d1-o2',
            numberLabel: 'II-2',
            prefix: 'この仕事、とても面白そうなので、ぜひ',
            suffix: '。',
            tokens: [
              { id: 1, label: '私にも' },
              { id: 2, label: 'ください' },
              { id: 3, label: 'させて' },
              { id: 4, label: '手伝いを' },
            ],
            correctOrder: [1, 4, 3, 2],
            explanationId: 'Urutan lengkap: 私にも 手伝いを させて ください (Izinkan saya juga membantu).',
          },
        ],
      },
      {
        id: 'w1-d2',
        weekNumber: 1,
        dayNumber: 2,
        titleJp: 'そこに置いといて',
        titleId: 'Bentuk Singkat Percakapan (～なくちゃ・～ちゃう・～とく)',
        grammarPoints: [
          {
            id: 'w1-d2-g1',
            titleJp: 'Vないと / Vなくちゃ（＝Vなければ）',
            connectionFormula: 'Vない (tanpa い) + なくちゃ / Vない + と',
            registerTag: 'Lisan',
            shortMeaningId: 'Harus... / Kalau tidak..., tidak bisa',
            easyExplanationId:
              'Bentuk percakapan santai dari ～なければならない. Bagian いけない/だめ sering dihilangkan sehingga langsung berhenti di ないと atau なくちゃ.',
            tipOrPitfallId:
              'Jangan dipakai untuk tulisan resmi atau ke atasan; hanya untuk teman dekat atau monolog (gumaman sendiri).',
            examples: [
              {
                jp: 'あ、もう7時だ。早く出かけなくちゃ！',
                id: 'Ah, sudah jam 7. Aku harus cepat berangkat!',
              },
              {
                jp: 'あしたテストだから、今夜はちゃんと勉強しないと。',
                id: 'Karena besok tes, malam ini harus belajar dengan benar.',
              },
            ],
          },
          {
            id: 'w1-d2-g2',
            titleJp: 'Vちゃう / Vじゃう（＝Vてしまう・Vでしまう）',
            connectionFormula: 'Vて → Vちゃう ｜ Vで → Vじゃう （Lampau: ちゃった・じゃった）',
            registerTag: 'Lisan',
            shortMeaningId: 'Terlanjur... / Selesai tuntas...',
            easyExplanationId:
              'Singkatan lisan dari ～てしまう / ～でしまう. Dipakai untuk dua hal: (1) penyesalan karena tidak sengaja/terlanjur, atau (2) menyelesaikan sesuatu sampai tuntas.',
            examples: [
              {
                jp: '宿題、まだ半分残ってるけど、今日中にやっちゃうつもりだ。',
                id: 'PR-nya masih sisa setengah, tapi rencananya mau kuselesaikan hari ini juga.',
              },
              {
                jp: '大事な約束をうっかり忘れちゃった。',
                id: 'Aku tidak sengaja lupa janji penting.',
              },
            ],
          },
          {
            id: 'w1-d2-g3',
            titleJp: 'Vとく / Vどく（＝Vておく・Vでおく）',
            connectionFormula: 'Vて → Vとく ｜ Vで → Vどく （Perintah halus: といて・どいて）',
            registerTag: 'Lisan',
            shortMeaningId: 'Melakukan dulu sebagai persiapan / membiarkan tetap begitu',
            easyExplanationId:
              'Singkatan lisan dari ～ておく (melakukan lebih dulu untuk persiapan, atau membiarkan suatu kondisi tetap ada). Bentuk perintahnya adalah Vといて (tolong taruh/siapkan dulu).',
            examples: [
              {
                jp: '荷物はそこのテーブルの上に置いといてね。',
                id: 'Barang-barangnya tolong taruh saja dulu di atas meja sebelah sana ya.',
              },
              {
                jp: '明日の会議の資料、コピーしといたよ。',
                id: 'Materi rapat besok sudah aku fotokopi duluan lho.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w1-d2-r1',
            numberLabel: 'I-1',
            promptBefore: 'もうすぐ試験だから、毎日復習',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'しなくちゃ' },
              { id: 'b', label: 'しちゃう' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Karena sebentar lagi ujian, artinya "harus mengulang setiap hari" → しなくちゃ.',
          },
          {
            id: 'w1-d2-r2',
            numberLabel: 'I-2',
            promptBefore: 'あ、急いで走ったから、お財布を',
            promptAfter: 'みたい。',
            options: [
              { id: 'a', label: '落としといた' },
              { id: 'b', label: '落としちゃった' },
            ],
            correctOptionIds: ['b'],
            explanationId: 'Menjatuhkan dompet adalah ketidaksengajaan/penyesalan (～てしまった) → 落としちゃった.',
          },
          {
            id: 'w1-d2-r3',
            numberLabel: 'I-3',
            promptBefore: 'お客さんが来る前に、部屋をきれいに',
            promptAfter: '。',
            options: [
              { id: 'a', label: '片付けとこう' },
              { id: 'b', label: '片付けなくちゃ' },
            ],
            correctOptionIds: ['a', 'b'],
            explanationId: 'Keduanya wajar secara makna ("ayo bereskan dulu sebelum tamu datang" / "harus dibereskan"), utama dari buku: 片付けとこう (persiapan ～ておこう).',
          },
          {
            id: 'w1-d2-r4',
            numberLabel: 'I-4',
            promptBefore: 'ビールは飲む前に冷蔵庫で',
            promptAfter: 'ほうがいいよ。',
            options: [
              { id: 'a', label: '冷やしといた' },
              { id: 'b', label: '冷やしちゃった' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Mendinginkan minuman terlebih dahulu sebagai persiapan → 冷やしといたほうがいい.',
          },
          {
            id: 'w1-d2-r5',
            numberLabel: 'I-5',
            promptBefore: 'あ、その資料、あとで使うから机の上に',
            promptAfter: '。',
            options: [
              { id: 'a', label: '出しまっといて' },
              { id: 'b', label: '出しといて' },
            ],
            correctOptionIds: ['b'],
            explanationId: '出す → 出しておく → 出しといて (keluarkan/biarkan di atas meja dulu).',
          },
        ],
        renshuuPart2: [
          {
            id: 'w1-d2-o1',
            numberLabel: 'II-1',
            prefix: 'すみません、あした朝早いので、',
            suffix: '。',
            tokens: [
              { id: 1, label: '帰らなくちゃ' },
              { id: 2, label: 'もう' },
              { id: 3, label: 'いけない' },
              { id: 4, label: 'んです' },
            ],
            correctOrder: [2, 1, 3, 4],
            explanationId: 'Urutan: もう 帰らなくちゃ いけない んです (Saya sudah harus pulang).',
          },
          {
            id: 'w1-d2-o2',
            numberLabel: 'II-2',
            prefix: 'このケーキ、すごくおいしそうだから、弟が帰る前に',
            suffix: '。',
            tokens: [
              { id: 1, label: 'みんな' },
              { id: 2, label: '食べちゃおう' },
              { id: 3, label: '一人で' },
              { id: 4, label: 'よ' },
            ],
            correctOrder: [3, 1, 2, 4],
            explanationId: 'Urutan: 一人で みんな 食べちゃおう よ (Ayo kita makan habis semua sendirian!).',
          },
        ],
      },
      {
        id: 'w1-d3',
        weekNumber: 1,
        dayNumber: 3,
        titleJp: '女らしい',
        titleId: 'Menyatakan Kemiripan & Sifat Khas (みたい・らしい・っぽい)',
        grammarPoints: [
          {
            id: 'w1-d3-g1',
            titleJp: 'N / 普通形 + みたいだ',
            connectionFormula: 'N + みたいだ ｜ V・A・na(tanpa だ) + みたいだ ｜ + なN / + にV',
            registerTag: 'Lisan',
            shortMeaningId: 'Seperti... / Sepertinya... (penampilan atau dugaan santai)',
            easyExplanationId:
              'Versi percakapan dari ～ようだ. Bisa berarti perumpamaan ("tangannya dingin seperti es") maupun dugaan dari apa yang dilihat/didengar ("sepertinya hujan").',
            tipOrPitfallId:
              'Untuk Kata Benda & na-adj, TIDAK pakai の atau な sebelum みたい (⭕ 学生みたい, ❌ 学生のみたい). Tapi jika diikuti Kata Benda baru pakai な: 夢みたいな話.',
            examples: [
              {
                jp: 'この犬はぬいぐるみみたいでかわいい。',
                id: 'Anjing ini lucu seperti boneka.',
              },
              {
                jp: '外はなんだか寒そうだね。雪が降るみたいだよ。',
                id: 'Di luar kelihatannya dingin ya. Sepertinya akan turun salju.',
              },
            ],
          },
          {
            id: 'w1-d3-g2',
            titleJp: 'N + らしい',
            connectionFormula: 'N + らしい (berubah seperti A-i: ～らしく、～らしかった)',
            shortMeaningId: 'Memiliki sifat khas / mencerminkan identitas aslinya',
            easyExplanationId:
              'Menyatakan bahwa N benar-benar menunjukkan ciri khas idealnya ("hari ini hangat, sangat terasa seperti musim semi"; "sikapnya jantan/dewasa seperti laki-laki sejati").',
            tipOrPitfallId:
              'Bedakan dengan らしい di akhir kalimat bentuk biasa (kabar burung: "katanya dia menikah"). Di sini N + らしい artinya "berjiwa/khas N".',
            examples: [
              {
                jp: '今日はポカポカして、本当に春らしい天気ですね。',
                id: 'Hari ini hangat nyaman, benar-benar cuaca khas musim semi ya.',
              },
              {
                jp: '田中さんはいつも自分の意見をはっきり言う。実に男らしい人だ。',
                id: 'Tanaka selalu menyampaikan pendapatnya dengan jelas. Benar-benar orang yang jantan.',
              },
            ],
          },
          {
            id: 'w1-d3-g3',
            titleJp: 'N / Vます / Aい(tanpa い) + っぽい',
            connectionFormula: 'N + っぽい ｜ Vます + っぽい ｜ A(tanpa い) + っぽい',
            registerTag: 'Lisan',
            shortMeaningId: 'Terlihat agak seperti... / Mudah sekali... (sering bernuansa negatif/kekanak-kanakan)',
            easyExplanationId:
              'Dipakai untuk: (1) mirip meski sebenarnya bukan ("jus ini encer seperti air / 水っぽい", "baju gaya anak muda" tapi dipakai orang tua: 若っぽい), atau (2) mudah melakukan sifat tertentu (忘れっぽい = pelupa, 怒りっぽい = pemarah).',
            tipOrPitfallId:
              '男っぽい pada wanita = tomboi (agak kasar/berperilaku seperti pria), sedangkan 男らしい pada pria = jantan/gentleman (pujian!).',
            examples: [
              {
                jp: 'このカレーはちょっと水っぽくておいしくない。',
                id: 'Kari ini agak terlalu berair (encer) dan tidak enak.',
              },
              {
                jp: '最近、年をとったせいか、とても忘れっぽくなった。',
                id: 'Akhir-akhir ini mungkin karena bertambah tua, aku jadi sangat pelupa.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w1-d3-r1',
            numberLabel: 'I-1',
            promptBefore: '山田さんは学生',
            promptAfter: '見えますが、実は会社員だそうです。',
            options: [
              { id: 'a', label: 'みたいに' },
              { id: 'b', label: 'らしく' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Bukan mahasiswa sungguhan, hanya "terlihat seperti" mahasiswa → みたいに.',
          },
          {
            id: 'w1-d3-r2',
            numberLabel: 'I-2',
            promptBefore: '彼女はいつも優しいし、とても女の子',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'らしい' },
              { id: 'b', label: 'っぽい' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Nuansa pujian bahwa dia punya sifat khas kewanitaan yang baik → 女の子らしい.',
          },
          {
            id: 'w1-d3-r3',
            numberLabel: 'I-3',
            promptBefore: 'このコーヒー、薄くて',
            promptAfter: 'ね。',
            options: [
              { id: 'a', label: '水らしい' },
              { id: 'b', label: '水っぽい' },
            ],
            correctOptionIds: ['b'],
            explanationId: 'Kopi encer/seperti air (nuansa kurang enak) menggunakan ～っぽい → 水っぽい.',
          },
          {
            id: 'w1-d3-r4',
            numberLabel: 'I-4',
            promptBefore: 'あの子はもう高校生なのに、まだ',
            promptAfter: 'ことばかり言っている。',
            options: [
              { id: 'a', label: '子供っぽい' },
              { id: 'b', label: '子供らしい' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Sudah SMA tapi masih kekanak-kanakan (kritik/negatif) → 子供っぽい.',
          },
          {
            id: 'w1-d3-r5',
            numberLabel: 'I-5',
            promptBefore: '彼はちょっと',
            promptAfter: 'ので、すぐけんかになる。',
            options: [
              { id: 'a', label: '怒りみたい' },
              { id: 'b', label: '怒りっぽい' },
            ],
            correctOptionIds: ['b'],
            explanationId: 'Vます + っぽい = mudah marah (pemarah) → 怒りっぽい.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w1-d3-o1',
            numberLabel: 'II-1',
            prefix: '今日は',
            suffix: '。',
            tokens: [
              { id: 1, label: 'ですね' },
              { id: 2, label: '日' },
              { id: 3, label: '秋らしい' },
              { id: 4, label: '本当に' },
            ],
            correctOrder: [4, 3, 2, 1],
            explanationId: 'Urutan: 本当に 秋らしい 日 ですね (Benar-benar hari yang terasa khas musim gugur ya).',
          },
          {
            id: 'w1-d3-o2',
            numberLabel: 'II-2',
            prefix: 'あの店のラーメンは',
            suffix: '。',
            tokens: [
              { id: 1, label: 'ない' },
              { id: 2, label: 'おいしく' },
              { id: 3, label: '油っぽくて' },
              { id: 4, label: 'あまり' },
            ],
            correctOrder: [3, 4, 2, 1],
            explanationId: 'Urutan: 油っぽくて あまり おいしく ない (Terlalu berminyak sehingga tidak begitu enak).',
          },
        ],
      },
      {
        id: 'w1-d4',
        weekNumber: 1,
        dayNumber: 4,
        titleJp: 'できるようになった！',
        titleId: 'Usaha, Tujuan Keadaan, & Perubahan (ようにする・ように・ようになる)',
        grammarPoints: [
          {
            id: 'w1-d4-g1',
            titleJp: 'Vる / Vない + ようにする',
            connectionFormula: 'Vkamus / Vない + ようにする (Kebiasaan: ～ようにしている)',
            shortMeaningId: 'Berusaha membiasakan diri untuk... / berusaha tidak...',
            easyExplanationId:
              'Menunjukkan usaha rutin atau tekad pribadi agar membiasakan diri melakukan hal positif atau menjauhi hal buruk (seperti tidur cukup, tidak telat).',
            tipOrPitfallId:
              'JANGAN pakai ために! Untuk menjaga kebiasaan, bahasa Jepang memakai ようにしている (⭕ 健康のために毎日歩くようにしている, ❌ 歩くために気をつけている).',
            examples: [
              {
                jp: '健康のために、毎日野菜をたくさん食べるようにしている。',
                id: 'Demi kesehatan, saya berusaha makan banyak sayur setiap hari.',
              },
              {
                jp: '大切なことは忘れないようにメモするようにしてください。',
                id: 'Hal penting tolong usahakan dicatat agar tidak lupa.',
              },
            ],
          },
          {
            id: 'w1-d4-g2',
            titleJp: 'Vる / Vない / Vれる + ように（目的）',
            connectionFormula: 'Vpotensial / Vない / V(keadaan non-kemauan) + ように + Vaksi',
            shortMeaningId: 'Supaya / Agar bisa... (tujuan berupa keadaan)',
            easyExplanationId:
              'Menjelaskan tujuan yang berupa "keadaan" atau "kemampuan" (agar bisa paham, agar tidak masuk angin, agar terdengar sampai belakang).',
            tipOrPitfallId:
              'Beda ように vs ために: ために memakai kata kerja kemauan sendiri dengan subjek sama (日本へ行くために貯金する). ように memakai bentuk potensial/negatif/intransitif (日本語が話せるように勉強する).',
            examples: [
              {
                jp: '後ろの人にも聞こえるように、大きい声で話した。',
                id: 'Saya berbicara dengan suara keras supaya terdengar oleh orang di belakang juga.',
              },
              {
                jp: '風邪をひかないように、暖かい服を着て出かけた。',
                id: 'Saya keluar memakai baju hangat agar tidak masuk angin.',
              },
            ],
          },
          {
            id: 'w1-d4-g3',
            titleJp: 'Vる / Vない / Vれる + ようになる',
            connectionFormula: 'Vkamus / Vない / Vpotensial + ようになる',
            shortMeaningId: 'Menjadi bisa... / mulai terbiasa... (perubahan alami/bertahap)',
            easyExplanationId:
              'Menggambarkan perubahan dari "dulu tidak bisa / tidak dilakukan" menjadi "sekarang bisa / sudah dilakukan" (biasanya karena latihan atau bertambahnya waktu).',
            examples: [
              {
                jp: '毎日練習して、やっと漢字が書けるようになった。',
                id: 'Karena berlatih setiap hari, akhirnya aku menjadi bisa menulis kanji.',
              },
              {
                jp: '日本に来てから、納豆が食べられるようになりました。',
                id: 'Sejak datang ke Jepang, saya jadi bisa makan natto.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w1-d4-r1',
            numberLabel: 'I-1',
            promptBefore: '太らない',
            promptAfter: '、夜9時以降は何も食べないようにしている。',
            options: [
              { id: 'a', label: 'ように' },
              { id: 'b', label: 'ために' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Bentuk negatif Vない (太らない) memakai ように, bukan ために.',
          },
          {
            id: 'w1-d4-r2',
            numberLabel: 'I-2',
            promptBefore: '日本の新聞が読める',
            promptAfter: '、今一生懸命勉強している。',
            options: [
              { id: 'a', label: 'ようになる' },
              { id: 'b', label: 'ように' },
            ],
            correctOptionIds: ['b'],
            explanationId: 'Menghubungkan tujuan dengan aksi belajar → 読めるように勉強している.',
          },
          {
            id: 'w1-d4-r3',
            numberLabel: 'I-3',
            promptBefore: '前はコーヒーが飲めなかったが、最近少しずつ',
            promptAfter: '。',
            options: [
              { id: 'a', label: '飲めるようになった' },
              { id: 'b', label: '飲めるようにした' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Perubahan kemampuan secara bertahap (dulu tidak bisa → sekarang bisa) memakai ようになった.',
          },
          {
            id: 'w1-d4-r4',
            numberLabel: 'I-4',
            promptBefore: '遅刻しない',
            promptAfter: '、毎朝6時に起きるようにしています。',
            options: [
              { id: 'a', label: 'ように' },
              { id: 'b', label: 'ようになって' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Agar tidak terlambat (tujuan keadaan negatif) → 遅れない/遅刻しないように.',
          },
          {
            id: 'w1-d4-r5',
            numberLabel: 'I-5',
            promptBefore: '電気代を節約する',
            promptAfter: '、使わない部屋の電気はこまめに消すようにしている。',
            options: [
              { id: 'a', label: 'ために' },
              { id: 'b', label: 'ように' },
            ],
            correctOptionIds: ['a'],
            explanationId: '節約する adalah kata kerja kemauan/tindakan langsung, jadi pasangannya ために (untuk menghemat).',
          },
        ],
        renshuuPart2: [
          {
            id: 'w1-d4-o1',
            numberLabel: 'II-1',
            prefix: '健康のために、毎日',
            suffix: '。',
            tokens: [
              { id: 1, label: 'しています' },
              { id: 2, label: '運動を' },
              { id: 3, label: 'する' },
              { id: 4, label: 'ように' },
            ],
            correctOrder: [2, 3, 4, 1],
            explanationId: 'Urutan: 運動を する ように しています (Berusaha berolahraga setiap hari).',
          },
          {
            id: 'w1-d4-o2',
            numberLabel: 'II-2',
            prefix: '赤ちゃんが',
            suffix: '歩いた。',
            tokens: [
              { id: 1, label: '起きない' },
              { id: 2, label: '静かに' },
              { id: 3, label: 'ように' },
              { id: 4, label: 'そっと' },
            ],
            correctOrder: [1, 3, 2, 4],
            explanationId: 'Urutan: 起きない ように 静かに そっと (berjalan pelan-pelan dan tenang supaya tidak terbangun).',
          },
        ],
      },
      {
        id: 'w1-d5',
        weekNumber: 1,
        dayNumber: 5,
        titleJp: '言ったように',
        titleId: 'Sesuai Contoh, Instruksi Halus, & Doa (ように)',
        grammarPoints: [
          {
            id: 'w1-d5-g1',
            titleJp: 'Nの / V普通形 + ように',
            connectionFormula: 'N + の + ように ｜ V普通形 + ように',
            shortMeaningId: 'Seperti yang dikatakan/dilakukan/diketahui...',
            easyExplanationId:
              'Dipakai saat mengacu pada perkataan seseorang, gambar panduan, atau pengetahuan umum ("lakukan seperti yang saya contohkan", "seperti yang kalian lihat di grafik").',
            examples: [
              {
                jp: 'さっき説明したように、来週の授業は休みです。',
                id: 'Seperti yang baru saja dijelaskan tadi, kelas minggu depan libur.',
              },
              {
                jp: 'この図のように紙を折ってください。',
                id: 'Tolong lipat kertasnya seperti pada gambar ini.',
              },
            ],
          },
          {
            id: 'w1-d5-g2',
            titleJp: 'Vる / Vない + ように。（指示・注意）',
            connectionFormula: 'Vkamus / Vない + ように（なっています・してください）',
            registerTag: 'Tulisan',
            shortMeaningId: 'Harap melakukan... / Dilarang... (pengumuman/instruksi)',
            easyExplanationId:
              'Bentuk pendek untuk pengumuman tertulis, aturan sekolah/kantor, atau catatan di papan pengumuman. Diakhiri langsung dengan ように。 (sebenarnya kependekan dari ～ようにしてください).',
            examples: [
              {
                jp: '教室の中では携帯電話の電源を切るように。',
                id: 'Di dalam kelas harap matikan daya ponsel.',
              },
              {
                jp: '提出期限に遅れないように。',
                id: 'Harap tidak terlambat dari batas waktu pengumpulan.',
              },
            ],
          },
          {
            id: 'w1-d5-g3',
            titleJp: 'Vます / Vません / Vれます + ように。（願い）',
            connectionFormula: 'Vます (sopan) + ように。 (sering didahului どうか / どうぞ)',
            shortMeaningId: 'Semoga... (doa atau harapan kuat)',
            easyExplanationId:
              'Digunakan untuk mengungkapkan doa/harapan (saat ulang tahun, menulis tanzaku Tanabata, atau mendoakan kesuksesan/kesembuhan orang lain).',
            tipOrPitfallId:
              'Beda penting dengan ように instruksi: untuk DOA biasanya memakai bentuk sopan ます / ません / れます + ように！',
            examples: [
              {
                jp: '志望校に合格できますように。',
                id: 'Semoga saya dapat lulus ke sekolah pilihan.',
              },
              {
                jp: 'おばあちゃんの病気が早く治りますように。',
                id: 'Semoga penyakit nenek cepat sembuh.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w1-d5-r1',
            numberLabel: 'I-1',
            promptBefore: '先生が',
            promptAfter: 'ように発音してみてください。',
            options: [
              { id: 'a', label: '言った' },
              { id: 'b', label: '言いの' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Kata kerja bentuk biasa langsung menempel ke ように → 先生が言ったように.',
          },
          {
            id: 'w1-d5-r2',
            numberLabel: 'I-2',
            promptBefore: '明日の試合に',
            promptAfter: 'ように。（お祈り）',
            options: [
              { id: 'a', label: '勝てます' },
              { id: 'b', label: '勝つ' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Karena merupakan doa/harapan, pakai bentuk sopan ～ます + ように → 勝てますように.',
          },
          {
            id: 'w1-d5-r3',
            numberLabel: 'I-3',
            promptBefore: '図書館では静かに',
            promptAfter: 'ように。（掲示板の注意）',
            options: [
              { id: 'a', label: 'します' },
              { id: 'b', label: 'する' },
            ],
            correctOptionIds: ['b'],
            explanationId: 'Pengumuman aturan / instruksi tertulis memakai bentuk kamus/nai → 静かにするように.',
          },
          {
            id: 'w1-d5-r4',
            numberLabel: 'I-4',
            promptBefore: 'ご存じ',
            promptAfter: '、来月から新しい規則が始まります。',
            options: [
              { id: 'a', label: 'のように' },
              { id: 'b', label: 'ように' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'ご存じ (pengetahuan) adalah kata benda → wajib memakai の sebelum ように (ご存じのように = seperti yang Anda ketahui).',
          },
        ],
        renshuuPart2: [
          {
            id: 'w1-d5-o1',
            numberLabel: 'II-1',
            prefix: '今年の夏休みは、ぜひ家族みんなで',
            suffix: '。',
            tokens: [
              { id: 1, label: '旅行に' },
              { id: 2, label: 'ように' },
              { id: 3, label: '楽しい' },
              { id: 4, label: '行けます' },
            ],
            correctOrder: [3, 1, 4, 2],
            explanationId: 'Urutan: 楽しい 旅行に 行けます ように (Semoga kami bisa pergi berlibur yang menyenangkan).',
          },
          {
            id: 'w1-d5-o2',
            numberLabel: 'II-2',
            prefix: '壁の張り紙に「ゴミは必ず',
            suffix: '」と書いてあった。',
            tokens: [
              { id: 1, label: 'ように' },
              { id: 2, label: 'ゴミ箱に' },
              { id: 3, label: '捨てる' },
              { id: 4, label: '決められた' },
            ],
            correctOrder: [4, 2, 3, 1],
            explanationId: 'Urutan: 決められた ゴミ箱に 捨てる ように (Harap membuang sampah di tempat sampah yang sudah ditentukan).',
          },
        ],
      },
      {
        id: 'w1-d6',
        weekNumber: 1,
        dayNumber: 6,
        titleJp: '話を聞こうとしない',
        titleId: 'Niat & Upaya Melakukan Sesuatu (ようと思う・ようとする・ようとしない)',
        grammarPoints: [
          {
            id: 'w1-d6-g1',
            titleJp: 'Vようと思う / Vようと思っている',
            connectionFormula: 'Bentuk Maksud (意向形: よう/おう) + と思う / と思っている',
            shortMeaningId: 'Bermaksud / berencana untuk...',
            easyExplanationId:
              '思う dipakai saat keputusan terlintas di saat bicara atau rencana pribadi; と思っている dipakai untuk niat yang sudah dipikirkan sejak lama atau rencana orang ketiga.',
            tipOrPitfallId:
              'Jika menceritakan niat orang lain (seperti saudara/teman), WAJIB pakai ～ようと思っている (bukan と思う).',
            examples: [
              {
                jp: '来年の夏、北海道へ旅行に行こうと思っている。',
                id: 'Musim panas tahun depan saya berencana pergi berwisata ke Hokkaido.',
              },
              {
                jp: 'あ、雨が降ってきた。タクシーに乗ろうと思う。',
                id: 'Wah, turun hujan. Sepertinya aku mau naik taksi saja.',
              },
            ],
          },
          {
            id: 'w1-d6-g2',
            titleJp: 'Vようとする',
            connectionFormula: 'Bentuk Maksud (意向形) + とする',
            shortMeaningId: 'Mencoba untuk... / Tepat akan segera...',
            easyExplanationId:
              'Mempunyai dua makna utama: (1) berusaha melakukan sesuatu ("mencoba membuka pintu tapi terkunci"), atau (2) keadaan tepat menjelang terjadi ("tepat saat kereta akan berangkat", "matahari akan terbenam").',
            examples: [
              {
                jp: '家を出ようとしたとき、電話がかかってきた。',
                id: 'Tepat ketika hendak keluar rumah, telepon berdering.',
              },
              {
                jp: '重いスーツケースを持ち上げようとしたが、重すぎて無理だった。',
                id: 'Saya mencoba mengangkat koper berat itu, tapi terlalu berat sehingga tidak bisa.',
              },
            ],
          },
          {
            id: 'w1-d6-g3',
            titleJp: 'Vようとしない',
            connectionFormula: 'Bentuk Maksud (意向形) + としない',
            registerTag: 'Negatif',
            shortMeaningId: 'Sama sekali tidak mau berusaha / menolak untuk...',
            easyExplanationId:
              'Menunjukkan sikap keras kepala atau kurangnya niat/upaya dari seseorang (atau mesin yang macet tidak mau menyala). Nada pembicara biasanya kecewa atau kesal.',
            examples: [
              {
                jp: '弟は注意しても、まったく私の話を聞こうとしない。',
                id: 'Adik saya meskipun diperingatkan, sama sekali tidak mau mendengarkan omongan saya.',
              },
              {
                jp: 'いくら修理しても、この古いパソコンは動こうとしない。',
                id: 'Sebanyak apa pun diperbaiki, komputer tua ini tidak mau juga hidup.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w1-d6-r1',
            numberLabel: 'I-1',
            promptBefore: '妹は来年、大学を卒業したら留学',
            promptAfter: 'いるそうだ。',
            options: [
              { id: 'a', label: 'しようと思って' },
              { id: 'b', label: 'しようと思っては' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Membicarakan niat orang ketiga (adik) memakai Vようと思っている.',
          },
          {
            id: 'w1-d6-r2',
            numberLabel: 'I-2',
            promptBefore: '今、お風呂に',
            promptAfter: 'としたら、友だちが遊びに来た。',
            options: [
              { id: 'a', label: '入ろう' },
              { id: 'b', label: '入った' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Bentuk maksud + としたら berarti "tepat saat akan masuk kamar mandi" → 入ろう.',
          },
          {
            id: 'w1-d6-r3',
            numberLabel: 'I-3',
            promptBefore: '彼は自分の失敗を認め',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'ようとしない' },
              { id: 'b', label: 'ないとする' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Tidak mau mengakui kesalahan → bentuk maksud 認めよう + としない.',
          },
          {
            id: 'w1-d6-r4',
            numberLabel: 'I-4',
            promptBefore: '何度やり方を教えても、自分で',
            promptAfter: 'しないので困っている。',
            options: [
              { id: 'a', label: '覚えようと' },
              { id: 'b', label: '覚えようとばかり' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Rumusnya adalah 意向形 + としない → 覚えようとしない.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w1-d6-o1',
            numberLabel: 'II-1',
            prefix: '駅に着いて切符を',
            suffix: '財布がなかった。',
            tokens: [
              { id: 1, label: 'とした' },
              { id: 2, label: '買おう' },
              { id: 3, label: 'ら' },
              { id: 4, label: 'ポケットに' },
            ],
            correctOrder: [2, 1, 3, 4],
            explanationId: 'Urutan: 買おう とした ら ポケットに (Ketika hendak membeli tiket, ternyata di saku tidak ada dompet).',
          },
          {
            id: 'w1-d6-o2',
            numberLabel: 'II-2',
            prefix: '何度呼んでも犬は家の中に',
            suffix: '。',
            tokens: [
              { id: 1, label: 'と' },
              { id: 2, label: '入ろう' },
              { id: 3, label: 'まったく' },
              { id: 4, label: 'しない' },
            ],
            correctOrder: [3, 2, 1, 4],
            explanationId: 'Urutan: まったく 入ろう と しない (sama sekali tidak mau masuk ke dalam rumah).',
          },
        ],
      },
    ],
    jissen: {
      id: 'w1-d7',
      weekNumber: 1,
      dayNumber: 7,
      titleJp: '第1週 実践問題',
      titleId: 'Latihan Ujian Mingguan (Minggu 1)',
      timeLimitMin: 15,
      mondai3PassageTitleJp: 'アルバイトの初日',
      mondai3PassageLines: [
        '先週から駅前のコンビニでアルバイトを始めた。初日はとても緊張したが、店長に「最初は失敗してもいいから、まず元気にあいさつする [ 21 ]」と言われた。',
        'レジの操作は難しくてなかなか覚えられなかったが、先輩がやり方を丁寧に教えてくれた。帰るときは、まだ残っている仕事は翌日の人に任せて、先に [ 22 ] もらった。',
        '家に帰ってから、間違えやすいところを忘れない [ 23 ] ノートにまとめた。最初はレジの画面を見るだけで慌てて [ 24 ] が、一週間たった今では、少しずつ落ち着いて対応できる [ 25 ]。これからもがんばろうと思う。',
      ],
      questions: [
        {
          id: 'w1-j-1',
          number: 1,
          type: 'mondai1_mcq',
          promptJp: '満員電車の中で隣の人に足を（　　）。',
          options: [
            { id: '1', label: '踏んだ' },
            { id: '2', label: '踏まれた' },
            { id: '3', label: '踏ませた' },
            { id: '4', label: '踏んでみた' },
          ],
          correctOptionId: '2',
          explanationId: 'Pasif merugikan (terinjak oleh orang di sebelah: 隣の人に) → 踏まれた.',
        },
        {
          id: 'w1-j-2',
          number: 2,
          type: 'mondai1_mcq',
          promptJp: 'この美術館の建物は、有名な建築家（　　）設計された。',
          options: [
            { id: '1', label: 'によって' },
            { id: '2', label: 'について' },
            { id: '3', label: 'にたいして' },
            { id: '4', label: 'にかけて' },
          ],
          correctOptionId: '1',
          explanationId: 'Pencipta/perancang bangunan dalam kalimat pasif memakai によって.',
        },
        {
          id: 'w1-j-3',
          number: 3,
          type: 'mondai1_mcq',
          promptJp: 'すみません、お先に（　　）いただけませんか。',
          options: [
            { id: '1', label: '帰られて' },
            { id: '2', label: '帰って' },
            { id: '3', label: '帰らせて' },
            { id: '4', label: '帰られていて' },
          ],
          correctOptionId: '3',
          explanationId: 'Meminta izin dengan sopan "izinkan saya pulang duluan" memakai kausatif V(さ)せていただけませんか → 帰らせて.',
        },
        {
          id: 'w1-j-4',
          number: 4,
          type: 'mondai1_mcq',
          promptJp: 'あ、傘を電車の中に（　　）！',
          options: [
            { id: '1', label: '忘れといた' },
            { id: '2', label: '忘れちゃった' },
            { id: '3', label: '忘れなくちゃ' },
            { id: '4', label: '忘れようとした' },
          ],
          correctOptionId: '2',
          explanationId: 'Terlanjur ketinggalan payung (bentuk lisan てしまった) → 忘れちゃった.',
        },
        {
          id: 'w1-j-5',
          number: 5,
          type: 'mondai1_mcq',
          promptJp: '明日お客さんが来るから、飲み物を冷蔵庫で（　　）。',
          options: [
            { id: '1', label: '冷やしておこう' },
            { id: '2', label: '冷やしちゃおう' },
            { id: '3', label: '冷やされよう' },
            { id: '4', label: '冷やさせよう' },
          ],
          correctOptionId: '1',
          explanationId: 'Melakukan sesuatu terlebih dahulu sebagai persiapan → ～ておこう.',
        },
        {
          id: 'w1-j-6',
          number: 6,
          type: 'mondai1_mcq',
          promptJp: 'まだ宿題が終わっていないから、早く（　　）。',
          options: [
            { id: '1', label: 'やっちゃった' },
            { id: '2', label: 'やっといた' },
            { id: '3', label: 'やらなくちゃ' },
            { id: '4', label: 'やるらしい' },
          ],
          correctOptionId: '3',
          explanationId: 'Kewajiban dalam percakapan santai ("harus cepat dikerjakan") → やらなくちゃ.',
        },
        {
          id: 'w1-j-7',
          number: 7,
          type: 'mondai1_mcq',
          promptJp: '外が暗くなってきた。そろそろ雨が（　　）よ。',
          options: [
            { id: '1', label: '降るっぽい' },
            { id: '2', label: '降るらしい' },
            { id: '3', label: '降るみたいだ' },
            { id: '4', label: '降るとした' },
          ],
          correctOptionId: '3',
          explanationId: 'Dugaan langsung dari kondisi sekitar ("langit gelap, sepertinya akan hujan") → 降るみたいだ.',
        },
        {
          id: 'w1-j-8',
          number: 8,
          type: 'mondai1_mcq',
          promptJp: '彼はもう30歳なのに、話し方が（　　）。',
          options: [
            { id: '1', label: '子供らしい' },
            { id: '2', label: '子供っぽい' },
            { id: '3', label: '子供みたいだ' },
            { id: '4', label: '子供のようだ' },
          ],
          correctOptionId: '2',
          explanationId: 'Orang dewasa yang kekanak-kanakan (bernuansa kritik) memakai ～っぽい → 子供っぽい.',
        },
        {
          id: 'w1-j-9',
          number: 9,
          type: 'mondai1_mcq',
          promptJp: '今日は風もさわやかで、本当に（　　）一日ですね。',
          options: [
            { id: '1', label: '5月っぽい' },
            { id: '2', label: '5月らしい' },
            { id: '3', label: '5月みたいに' },
            { id: '4', label: '5月のようで' },
          ],
          correctOptionId: '2',
          explanationId: 'Menyatakan sifat khas/ideal musim atau bulan tersebut → 5月らしい.',
        },
        {
          id: 'w1-j-10',
          number: 10,
          type: 'mondai1_mcq',
          promptJp: '健康のため、毎日30分は（　　）している。',
          options: [
            { id: '1', label: '歩くために' },
            { id: '2', label: '歩くように' },
            { id: '3', label: '歩けるように' },
            { id: '4', label: '歩くことに' },
          ],
          correctOptionId: '2',
          explanationId: 'Pola usaha kebiasaan diri sendiri adalah Vる + ようにしている.',
        },
        {
          id: 'w1-j-11',
          number: 11,
          type: 'mondai1_mcq',
          promptJp: '毎日漢字を練習していたら、難しい漢字も（　　）ようになった。',
          options: [
            { id: '1', label: '読む' },
            { id: '2', label: '読める' },
            { id: '3', label: '読んで' },
            { id: '4', label: '読もう' },
          ],
          correctOptionId: '2',
          explanationId: 'Perubahan kemampuan (menjadi bisa membaca kanji sulit) memakai bentuk potensial 読める + ようになった.',
        },
        {
          id: 'w1-j-12',
          number: 12,
          type: 'mondai1_mcq',
          promptJp: 'ご存じ（　　）、この店は来月から日曜日も営業します。',
          options: [
            { id: '1', label: 'のように' },
            { id: '2', label: 'みたいに' },
            { id: '3', label: 'らしい' },
            { id: '4', label: 'そうに' },
          ],
          correctOptionId: '1',
          explanationId: 'ご存じ adalah kata benda, sehingga diikuti のように.',
        },
        {
          id: 'w1-j-13',
          number: 13,
          type: 'mondai1_mcq',
          promptJp: '世界のみんながずっと幸せに（　　）。',
          options: [
            { id: '1', label: '暮らすように' },
            { id: '2', label: '暮らせますように' },
            { id: '3', label: '暮らそうと思う' },
            { id: '4', label: '暮らしたみたいだ' },
          ],
          correctOptionId: '2',
          explanationId: 'Doa/harapan memakai bentuk sopan Vます/Vれます + ように → 暮らせますように.',
        },
        {
          id: 'w1-j-14',
          number: 14,
          type: 'mondai1_mcq',
          promptJp: '傘を（　　）とき、電話が鳴って玄関に戻った。',
          options: [
            { id: '1', label: 'さそうとした' },
            { id: '2', label: 'さすようにした' },
            { id: '3', label: 'さしたばかり' },
            { id: '4', label: 'さすことにした' },
          ],
          correctOptionId: '1',
          explanationId: 'Tepat saat hendak membuka payung → 意向形 + としたとき (さそうとしたとき).',
        },
        {
          id: 'w1-j-15',
          number: 15,
          type: 'mondai1_mcq',
          promptJp: '何度注意しても、彼は自分のミスを（　　）。',
          options: [
            { id: '1', label: '直そうと思わない' },
            { id: '2', label: '直そうとしない' },
            { id: '3', label: '直さないようにする' },
            { id: '4', label: '直せなくちゃいけない' },
          ],
          correctOptionId: '2',
          explanationId: 'Menolak/tidak ada upaya untuk memperbaiki meskipun diperingatkan → Vようとしない.',
        },
        {
          id: 'w1-j-16',
          number: 16,
          type: 'mondai2_star',
          starPrefix: 'この仕事は大切なので、',
          starSuffix: '。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: 'やる' },
            { id: '2', label: 'ように' },
            { id: '3', label: 'ていねいに' },
            { id: '4', label: 'してください' },
          ],
          correctOptionId: '2',
          correctOrderIds: ['3', '1', '2', '4'],
          explanationId: 'Urutan: ていねいに (3) やる (1) ように ★ (2) してください (4).',
        },
        {
          id: 'w1-j-17',
          number: 17,
          type: 'mondai2_star',
          starPrefix: '電車の中で、知らない人に',
          starSuffix: 'しまった。',
          starSlotIndex: 1,
          options: [
            { id: '1', label: '踏まれて' },
            { id: '2', label: 'きれいな' },
            { id: '3', label: '靴を' },
            { id: '4', label: '私の' },
          ],
          correctOptionId: '2',
          correctOrderIds: ['4', '2', '3', '1'],
          explanationId: 'Urutan: 私の (4) きれいな ★ (2) 靴を (3) 踏まれて (1) しまった.',
        },
        {
          id: 'w1-j-18',
          number: 18,
          type: 'mondai2_star',
          starPrefix: '大事な資料だから、なくさない',
          starSuffix: 'おくよ。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: 'しまって' },
            { id: '2', label: '机の中に' },
            { id: '3', label: 'ように' },
            { id: '4', label: 'ちゃんと' },
          ],
          correctOptionId: '4',
          correctOrderIds: ['3', '2', '4', '1'],
          explanationId: 'Urutan: なくさない ように (3) 机の中に (2) ちゃんと ★ (4) しまって (1) おくよ.',
        },
        {
          id: 'w1-j-19',
          number: 19,
          type: 'mondai2_star',
          starPrefix: '今年のテストは去年',
          starSuffix: '言っていた。',
          starSlotIndex: 1,
          options: [
            { id: '1', label: 'ほど' },
            { id: '2', label: '友達が' },
            { id: '3', label: '難しくなかった' },
            { id: '4', label: 'と' },
          ],
          correctOptionId: '3',
          correctOrderIds: ['1', '3', '4', '2'],
          explanationId: 'Urutan: 去年 ほど (1) 難しくなかった ★ (3) と (4) 友達が (2) 言っていた.',
        },
        {
          id: 'w1-j-20',
          number: 20,
          type: 'mondai2_star',
          starPrefix: '何度呼んでも妹は起き',
          starSuffix: '。',
          starSlotIndex: 1,
          options: [
            { id: '1', label: 'と' },
            { id: '2', label: 'しない' },
            { id: '3', label: 'よう' },
            { id: '4', label: 'まったく' },
          ],
          correctOptionId: '1',
          correctOrderIds: ['3', '1', '4', '2'],
          explanationId: 'Urutan: 起き よう (3) と ★ (1) まったく (4) しない (2).',
        },
        {
          id: 'w1-j-21',
          number: 21,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'ようにしなさい' },
            { id: '2', label: 'ようになろう' },
            { id: '3', label: 'ようとした' },
            { id: '4', label: 'みたいだ' },
          ],
          correctOptionId: '1',
          explanationId: 'Manajer toko berpesan agar membiasakan diri menyapa dengan semangat: Vる + ようにしなさい.',
        },
        {
          id: 'w1-j-22',
          number: 22,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: '帰らせて' },
            { id: '2', label: '帰られて' },
            { id: '3', label: '帰っといて' },
            { id: '4', label: '帰っちゃって' },
          ],
          correctOptionId: '1',
          explanationId: 'Diizinkan pulang lebih dulu oleh manajer/senior → 帰らせてもらった.',
        },
        {
          id: 'w1-j-23',
          number: 23,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'ために' },
            { id: '2', label: 'ように' },
            { id: '3', label: 'らしく' },
            { id: '4', label: 'っぽく' },
          ],
          correctOptionId: '2',
          explanationId: 'Bentuk negatif 忘れない + ように (supaya tidak lupa).',
        },
        {
          id: 'w1-j-24',
          number: 24,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'いたようだ' },
            { id: '2', label: 'しまった' },
            { id: '3', label: 'おいた' },
            { id: '4', label: 'いようとした' },
          ],
          correctOptionId: '2',
          explanationId: 'Menunjukkan ketidaksengajaan panik saat awal bekerja → 慌ててしまった.',
        },
        {
          id: 'w1-j-25',
          number: 25,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'ようになった' },
            { id: '2', label: 'ようにした' },
            { id: '3', label: 'ようとした' },
            { id: '4', label: 'みたいだった' },
          ],
          correctOptionId: '1',
          explanationId: 'Perubahan setelah satu minggu menjadi bisa melayani dengan tenang → 対応できるようになった.',
        },
      ],
      keigoTip: {
        titleJp: '敬語①：申す（もうす）と おっしゃる',
        summaryId:
          'Pelajaran Keigo Minggu 1: Bedakan bentuk merendah (謙譲語) untuk diri sendiri dengan bentuk hormat (尊敬語) untuk lawan bicara/orang lain pada kata "berkata/bernama".',
        pairs: [
          {
            plain: '言う (untuk diri sendiri)',
            honorificOrHumble: '申す / 申し上げる (謙譲語)',
            meaningId: 'Menyebut / berkata / bernama (merendah)',
            exampleJp: '田中と申します。よろしくお願いいたします。',
          },
          {
            plain: '言う (untuk atasan/tamu)',
            honorificOrHumble: 'おっしゃる (尊敬語)',
            meaningId: 'Mengatakan / bersabda (menghormati)',
            exampleJp: '先生がおっしゃったとおりに勉強しています。',
          },
        ],
      },
    },
  },
  {
    weekNumber: 2,
    titleJp: '第2週 がんばってごらん！',
    themeId: 'Pembatasan, Sumber Informasi, Kata Benda Abstrak, Penjelasan Istilah, & Kalimat Kutipan',
    days: [
      {
        id: 'w2-d1',
        weekNumber: 2,
        dayNumber: 1,
        titleJp: 'うそばっかり！',
        titleId: 'Pembatasan & Penekanan (ばかり・しか・さえ・こそ)',
        grammarPoints: [
          {
            id: 'w2-d1-g1',
            titleJp: 'N + ばかり / Vて + ばかりいる',
            connectionFormula: 'N + ばかり (lisan: ばっかり) ｜ Vて + ばかりいる',
            registerTag: 'Negatif',
            shortMeaningId: 'Melulu... / Terus-terusan melakukan itu saja',
            easyExplanationId:
              'Dipakai saat seseorang atau keadaan selalu didominasi satu hal saja dan sering membuat pembicara kesal ("main game melulu", "bohong melulu", "makan daging saja").',
            tipOrPitfallId:
              'Bedakan dengan Vた + ばかり (baru saja selesai dilakukan). Di sini N + ばかり atau Vて + ばかりいる berarti frekuensi yang berlebihan.',
            examples: [
              {
                jp: '弟は勉強もしないで、毎日ゲームをしてばかりいる。',
                id: 'Adik tidak belajar, tiap hari hanya main game melulu.',
              },
              {
                jp: '肉ばかり食べないで、野菜も食べなさい。',
                id: 'Jangan makan daging melulu, makan sayur juga!',
              },
            ],
          },
          {
            id: 'w2-d1-g2',
            titleJp: 'N + だけしか + Vない',
            connectionFormula: 'N + (だけ)しか + Vない',
            registerTag: 'Negatif',
            shortMeaningId: 'Hanya... saja (menekankan jumlah terasa sangat sedikit)',
            easyExplanationId:
              'Sama artinya dengan Nしか～ない (hanya ~), tapi memakai だけしか menekankan bahwa jumlahnya benar-benar sedikit atau pas-pasan.',
            tipOrPitfallId:
              'Ingat aturan besi: しか WAJIB ditutup dengan bentuk negatif (～ない), TIDAK boleh kalimat positif.',
            examples: [
              {
                jp: '財布の中に千円だけしか入っていない。',
                id: 'Di dalam dompet hanya ada uang seribu yen saja.',
              },
            ],
          },
          {
            id: 'w2-d1-g3',
            titleJp: 'N(に/で) + さえ',
            connectionFormula: 'N / Nに / Nで + さえ (sering ditambah も: さえも)',
            shortMeaningId: 'Bahkan... pun',
            easyExplanationId:
              'Mengambil contoh ekstrem (yang paling mudah atau paling jelas) untuk menunjukkan bahwa hal lainnya apalagi ("bahkan anak SD pun tahu", "bahkan nama sendiri pun lupa").',
            examples: [
              {
                jp: 'そんな簡単な漢字は、小学生でさえ読める。',
                id: 'Kanji semudah itu, bahkan anak SD pun bisa baca.',
              },
              {
                jp: '忙しすぎて、昼ごはんを食べる時間さえない。',
                id: 'Terlalu sibuk, bahkan waktu untuk makan siang pun tidak ada.',
              },
            ],
          },
          {
            id: 'w2-d1-g4',
            titleJp: 'N + こそ / ～からこそ',
            connectionFormula: 'N + こそ ｜ Kalimat + からこそ',
            shortMeaningId: 'Justru... inilah / Justru karena... (penegasan positif)',
            easyExplanationId:
              'Menekankan kata di depannya sebagai satu-satunya alasan atau fokus utama ("justru saat gagal inilah kita belajar", "justru karena peduli, saya menegurmu").',
            examples: [
              {
                jp: '今年こそJLPTのN3に合格したい！',
                id: 'Justru tahun inilah saya ingin lulus JLPT N3!',
              },
              {
                jp: 'あなたのことを心配しているからこそ、厳しく注意するんです。',
                id: 'Justru karena saya mengkhawatirkanmu, makanya saya menegur dengan tegas.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w2-d1-r1',
            numberLabel: 'I-1',
            promptBefore: 'うちの犬はいつも',
            promptAfter: 'いる。',
            options: [
              { id: 'a', label: '寝てばかり' },
              { id: 'b', label: '寝たばかり' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'いつも (selalu) berpasangan dengan 寝てばかりいる (tidur melulu).',
          },
          {
            id: 'w2-d1-r2',
            numberLabel: 'I-2',
            promptBefore: '財布の中には小銭が100円',
            promptAfter: 'ない。',
            options: [
              { id: 'a', label: 'だけしか' },
              { id: 'b', label: 'さえ' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Hanya tersisa 100 yen saja (diikuti ない) → だけしか.',
          },
          {
            id: 'w2-d1-r3',
            numberLabel: 'I-3',
            promptBefore: '仕事が忙しくて、週末',
            promptAfter: 'ゆっくり休めない。',
            options: [
              { id: 'a', label: 'でさえ' },
              { id: 'b', label: 'こそ' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Bahkan di akhir pekan pun tidak bisa istirahat santai → 週末でさえ.',
          },
          {
            id: 'w2-d1-r4',
            numberLabel: 'I-4',
            promptBefore: '今度',
            promptAfter: '絶対に試合に勝ってみせる。',
            options: [
              { id: 'a', label: 'こそ' },
              { id: 'b', label: 'しか' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Kalimat ditutup bentuk positif tekad kuat → 今度こそ (Justru kali inilah!).',
          },
        ],
        renshuuPart2: [
          {
            id: 'w2-d1-o1',
            numberLabel: 'II-1',
            prefix: '健康のためには、好きなもの',
            suffix: 'よくない。',
            tokens: [
              { id: 1, label: '食べて' },
              { id: 2, label: 'ばかり' },
              { id: 3, label: 'いる' },
              { id: 4, label: 'のは' },
            ],
            correctOrder: [1, 2, 3, 4],
            explanationId: 'Urutan: 食べて ばかり いる のは (makan makanan kesukaan melulu itu tidak baik).',
          },
          {
            id: 'w2-d1-o2',
            numberLabel: 'II-2',
            prefix: '君のことが',
            suffix: '言ったんだよ。',
            tokens: [
              { id: 1, label: '大事' },
              { id: 2, label: 'だからこそ' },
              { id: 3, label: 'そんな' },
              { id: 4, label: '厳しいことを' },
            ],
            correctOrder: [1, 2, 3, 4],
            explanationId: 'Urutan: 大事 だからこそ そんな 厳しいことを (Justru karena kamu penting, aku mengatakan hal keras seperti itu).',
          },
        ],
      },
      {
        id: 'w2-d2',
        weekNumber: 2,
        dayNumber: 2,
        titleJp: '事故などによる渋滞',
        titleId: 'Topik, Sumber Info, Cara & Penyebab (に関して・について・によれば・によって)',
        grammarPoints: [
          {
            id: 'w2-d2-g1',
            titleJp: 'N + に関して / に関する N',
            connectionFormula: 'N + に関して(は/も) ｜ N + に関する + N',
            registerTag: 'Formal',
            shortMeaningId: 'Mengenai / Berhubungan dengan... (lebih formal dari について)',
            easyExplanationId:
              'Memperkenalkan topik pembicaraan, penelitian, aturan, atau pertanyaan resmi. Sering dipakai dalam pengumuman, berita, dan esai.',
            examples: [
              {
                jp: 'この計画に関して何か質問があれば、遠慮なく聞いてください。',
                id: 'Jika ada pertanyaan mengenai rencana ini, silakan bertanya tanpa sungkan.',
              },
              {
                jp: '日本の文化に関する本をたくさん読んでいます。',
                id: 'Saya sedang membaca banyak buku yang berkaitan dengan budaya Jepang.',
              },
            ],
          },
          {
            id: 'w2-d2-g2',
            titleJp: 'N + について / についての N',
            connectionFormula: 'N + について ｜ N + についての + N',
            shortMeaningId: 'Tentang...',
            easyExplanationId:
              'Lebih umum dipakai dalam percakapan sehari-hari maupun tulisan untuk membahas tema tertentu ("berbicara tentang impian", "artikel tentang lingkungan").',
            examples: [
              {
                jp: '将来の夢について友だちと話し合った。',
                id: 'Saya berdiskusi dengan teman tentang impian masa depan.',
              },
            ],
          },
          {
            id: 'w2-d2-g3',
            titleJp: 'N + によれば / N + によると',
            connectionFormula: 'Sumber Informasi (ニュース・天気予報・人) + によれば / よると ～そうだ/らしい',
            shortMeaningId: 'Menurut (sumber berita/orang)...',
            easyExplanationId:
              'Mengutip informasi dari berita, ramalan cuaca, survei, atau perkataan orang. Di akhir kalimat biasanya ditutup dengan そうだ, とのことだ, atau らしい.',
            examples: [
              {
                jp: '天気予報によると、明日は午後から雨が降るそうです。',
                id: 'Menurut ramalan cuaca, katanya besok mulai siang akan turun hujan.',
              },
            ],
          },
          {
            id: 'w2-d2-g4',
            titleJp: 'N + によって / よっては / よる N',
            connectionFormula: 'N + によって / よっては / よる + N',
            shortMeaningId: 'Oleh (pelaku pasif) / Karena (penyebab) / Dengan cara / Tergantung pada...',
            easyExplanationId:
              'Punya 4 fungsi kunci di N3: (1) pembuat dalam pasif, (2) penyebab di papan berita ("macet akibat kecelakaan"), (3) cara/metode ("memecahkan masalah lewat diskusi"), dan (4) "tergantung pada N" ("tergantung negara, budayanya berbeda").',
            tipOrPitfallId:
              'Nによっては berarti "tergantung pada kasus N, terkadang begini" (tidak selalu semua). Contoh: 人によっては辛いものが好きだ.',
            examples: [
              {
                jp: '国によって習慣やマナーが違う。',
                id: 'Tergantung negaranya, kebiasaan dan tata kramanya berbeda.',
              },
              {
                jp: '先ほどの事故による渋滞は今も続いている。',
                id: 'Kemacetan akibat kecelakaan tadi masih berlanjut hingga sekarang.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w2-d2-r1',
            numberLabel: 'I-1',
            promptBefore: '日本の歴史',
            promptAfter: '本を買った。',
            options: [
              { id: 'a', label: 'に関する' },
              { id: 'b', label: 'に関して' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Diikuti langsung oleh kata benda 本 (buku), sehingga memakai に関する.',
          },
          {
            id: 'w2-d2-r2',
            numberLabel: 'I-2',
            promptBefore: '今朝のニュース',
            promptAfter: '、来月から電気代が上がるそうだ。',
            options: [
              { id: 'a', label: 'によると' },
              { id: 'b', label: 'によって' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Mengutip sumber berita (ニュース) dengan akhir そうだ → によると.',
          },
          {
            id: 'w2-d2-r3',
            numberLabel: 'I-3',
            promptBefore: '同じ言葉でも、使う場面',
            promptAfter: '意味が変わることがある。',
            options: [
              { id: 'a', label: 'によって' },
              { id: 'b', label: 'について' },
            ],
            correctOptionIds: ['a'],
            explanationId: '"Tergantung situasi penggunaannya, maknanya berubah" → によって.',
          },
          {
            id: 'w2-d2-r4',
            numberLabel: 'I-4',
            promptBefore: '台風',
            promptAfter: '被害は想像以上に大きかった。',
            options: [
              { id: 'a', label: 'による' },
              { id: 'b', label: 'につれて' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Kata benda 被害 (kerusakan) akibat topan → NによるN.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w2-d2-o1',
            numberLabel: 'II-1',
            prefix: 'この調査',
            suffix: 'わかった。',
            tokens: [
              { id: 1, label: '多くの人が' },
              { id: 2, label: 'よれば' },
              { id: 3, label: '健康を気にしている' },
              { id: 4, label: 'に' },
            ],
            correctOrder: [4, 2, 1, 3],
            explanationId: 'Urutan: (この調査) に よれば 多くの人が 健康を気にしている (ことが)わかった.',
          },
          {
            id: 'w2-d2-o2',
            numberLabel: 'II-2',
            prefix: 'この薬は、',
            suffix: 'ことがあります。',
            tokens: [
              { id: 1, label: '眠くなる' },
              { id: 2, label: '人' },
              { id: 3, label: 'っては' },
              { id: 4, label: 'によ' },
            ],
            correctOrder: [2, 4, 3, 1],
            explanationId: 'Urutan: 人 によ っては 眠くなる (Tergantung orangnya, obat ini bisa membuat mengantuk).',
          },
        ],
      },
      {
        id: 'w2-d3',
        weekNumber: 2,
        dayNumber: 3,
        titleJp: 'あなたのこと',
        titleId: 'Pembentukan Kata Benda dari Sifat & Nominalisasi (さ・み・こと・の)',
        grammarPoints: [
          {
            id: 'w2-d3-g1',
            titleJp: 'A(tanpa い) + さ / na + さ',
            connectionFormula: 'Aい(coret い) + さ ｜ na(tanpa な) + さ ｜ 例外: いい→よさ',
            shortMeaningId: 'Tingkat / ukuran sifat (tingginya, panjangnya, mudahnya)',
            easyExplanationId:
              'Mengubah kata sifat menjadi kata benda yang bisa diukur atau dinilai secara objektif (高さ = ketinggian, 便利さ = kepraktisan, 重さ = beratnya).',
            examples: [
              {
                jp: '富士山の高さは3,776メートルです。',
                id: 'Ketinggian Gunung Fuji adalah 3.776 meter.',
              },
              {
                jp: '日本の電車の便利さには本当に驚いた。',
                id: 'Saya benar-benar terkejut dengan tingkat kepraktisan kereta di Jepang.',
              },
            ],
          },
          {
            id: 'w2-d3-g2',
            titleJp: 'A(tanpa い) + み / na + み',
            connectionFormula: 'Kata sifat terbatas + み (例: 痛み・苦しみ・楽しみ・温かみ・弱み)',
            shortMeaningId: 'Rasa / bagian yang terasa seperti itu (perasaan atau kesan)',
            easyExplanationId:
              'Berbeda dengan ～さ yang bersifat ukuran netral, ～み lebih menekankan perasaan yang dirasakan hati/tubuh atau suatu titik kelemahan/kelebihan (痛み = rasa sakit, 楽しみ = kesenangan yang dinanti, 弱み = titik lemah). Hanya melekat pada kata sifat tertentu.',
            examples: [
              {
                jp: '足に痛みがあるので、病院へ行きます。',
                id: 'Karena ada rasa sakit di kaki, saya pergi ke rumah sakit.',
              },
              {
                jp: '来週の旅行が今から楽しみだ。',
                id: 'Wisata minggu depan terasa menyenangkan untuk dinanti dari sekarang.',
              },
            ],
          },
          {
            id: 'w2-d3-g3',
            titleJp: 'N + のこと / 普通形 + こと・の',
            connectionFormula: 'N + のこと ｜ Kata kerja/sifat biasa + こと / の',
            shortMeaningId: 'Hal tentang seseorang/sesuatu (nominalisasi)',
            easyExplanationId:
              '1) Saat bilang "suka/khawatir/tahu tentang seseorang", bahasa Jepang lebih halus memakai あなたのこと (tentang dirimu), bukan langsung あなた. 2) の sering dipakai dengan indera/perasaan/menunggu (見る・聞く・待つ・忘れる), sedangkan こと dipakai dalam definisi/kewajiban/aturan (できる・大切だ・決まり).',
            examples: [
              {
                jp: '母はいつも私のことを心配している。',
                id: 'Ibu selalu mengkhawatirkan diri saya.',
              },
              {
                jp: '先生が教室に入ってくるのが見えた。',
                id: 'Terlihat guru sedang masuk ke dalam kelas.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w2-d3-r1',
            numberLabel: 'I-1',
            promptBefore: 'このスーツケースの',
            promptAfter: 'を計ってみましょう。',
            options: [
              { id: 'a', label: '重さ' },
              { id: 'b', label: '重み' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menimbang/mengukur berat secara angka/objektif menggunakan 重さ.',
          },
          {
            id: 'w2-d3-r2',
            numberLabel: 'I-2',
            promptBefore: '人の',
            promptAfter: 'がわかる優しい人になりたい。',
            options: [
              { id: 'a', label: '悲しみ' },
              { id: 'b', label: '悲しさ' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Kesedihan hati yang dirasakan orang memakai kata benda baku 悲しみ.',
          },
          {
            id: 'w2-d3-r3',
            numberLabel: 'I-3',
            promptBefore: '私、ずっとあなたの',
            promptAfter: '好きでした。',
            options: [
              { id: 'a', label: 'こと' },
              { id: 'b', label: 'ことが' },
            ],
            correctOptionIds: ['b'],
            explanationId: 'Pola halus menyatakan perasaan ke orang: Nのこと + が + 好き/心配/知る.',
          },
          {
            id: 'w2-d3-r4',
            numberLabel: 'I-4',
            promptBefore: '部屋の外から誰かが泣いている',
            promptAfter: '聞こえた。',
            options: [
              { id: 'a', label: 'のが' },
              { id: 'b', label: 'ことが' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Dengan kata kerja persepsi indera langsung (聞こえる, 見える), nominalisasinya memakai の.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w2-d3-o1',
            numberLabel: 'II-1',
            prefix: '健康のためには、',
            suffix: '大切だ。',
            tokens: [
              { id: 1, label: '運動を' },
              { id: 2, label: '毎日' },
              { id: 3, label: 'が' },
              { id: 4, label: '続けること' },
            ],
            correctOrder: [2, 1, 4, 3],
            explanationId: 'Urutan: 毎日 運動を 続けること が (melanjutkan olahraga tiap hari itu penting).',
          },
          {
            id: 'w2-d3-o2',
            numberLabel: 'II-2',
            prefix: 'この仕事の',
            suffix: '感じている。',
            tokens: [
              { id: 1, label: '難しさ' },
              { id: 2, label: '今' },
              { id: 3, label: 'を' },
              { id: 4, label: 'つくづく' },
            ],
            correctOrder: [1, 3, 2, 4],
            explanationId: 'Urutan: 難しさ を 今 つくづく (merasakan betul betapa sulitnya pekerjaan ini sekarang).',
          },
        ],
      },
      {
        id: 'w2-d4',
        weekNumber: 2,
        dayNumber: 4,
        titleJp: '省エネというのは…',
        titleId: 'Definisi, Penamaan, & Kutipan Informasi (という・というのは)',
        grammarPoints: [
          {
            id: 'w2-d4-g1',
            titleJp: 'N1 + という + N2 / もの / こと / といった',
            connectionFormula: 'Nama + という + Kategori ｜ A・B + といった + Kategori (seperti A, B)',
            shortMeaningId: 'Yang disebut... / Yang bernama... / Seperti misalnya...',
            easyExplanationId:
              'Dipakai saat memperkenalkan nama orang/tempat/benda yang belum tentu diketahui lawan bicara ("orang yang bernama Tanaka"), atau saat memberikan contoh dengan といった.',
            examples: [
              {
                jp: '昨日、高橋さんという人から電話がありました。',
                id: 'Kemarin ada telepon dari orang yang bernama Takahashi.',
              },
              {
                jp: '富士山や京都といった有名な観光地へ行ってみたい。',
                id: 'Saya ingin pergi ke tempat wisata terkenal seperti Gunung Fuji dan Kyoto.',
              },
            ],
          },
          {
            id: 'w2-d4-g2',
            titleJp: 'N + というのは / っていうのは（口語）',
            connectionFormula: 'Istilah + というのは ～のことだ / ～という意味だ',
            shortMeaningId: 'Yang dimaksud dengan istilah "..." adalah...',
            easyExplanationId:
              'Pola klasik untuk menanyakan atau menjelaskan arti suatu istilah, singkatan, atau konsep asing (misalnya 省エネ = hemat energi).',
            examples: [
              {
                jp: '「省エネ」というのは、「エネルギーを節約すること」という意味です。',
                id: 'Yang dimaksud "Shou-ene" adalah "menghemat energi".',
              },
            ],
          },
          {
            id: 'w2-d4-g3',
            titleJp: '普通形 + というの / ということ（伝聞・説明）',
            connectionFormula: 'Kalimat Biasa + ということだ / という話だ / とのことだ',
            shortMeaningId: 'Kabarnya / Artinya adalah bahwa...',
            easyExplanationId:
              'Menyampaikan kesimpulan dari suatu ucapan atau berita yang kita dengar ("jadi maksudnya besok kita kumpul jam 9 ya", "kabarnya dia pindah ke Tokyo").',
            examples: [
              {
                jp: 'ニュースによると、来月から電車賃が上がるということだ。',
                id: 'Menurut berita, kabarnya tarif kereta akan naik mulai bulan depan.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w2-d4-r1',
            numberLabel: 'I-1',
            promptBefore: 'さっき、山下',
            promptAfter: 'お客様がいらっしゃいました。',
            options: [
              { id: 'a', label: 'という' },
              { id: 'b', label: 'といった' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menyebut nama tamu yang datang → 山下というお客様.',
          },
          {
            id: 'w2-d4-r2',
            numberLabel: 'I-2',
            promptBefore: '「フリーマーケット」',
            promptAfter: 'どんな意味ですか。',
            options: [
              { id: 'a', label: 'というのは' },
              { id: 'b', label: 'というのはこと' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menanyakan arti sebuah istilah → というのは.',
          },
          {
            id: 'w2-d4-r3',
            numberLabel: 'I-3',
            promptBefore: '日本料理といえば、すしや天ぷら',
            promptAfter: 'ものが思い浮かぶ。',
            options: [
              { id: 'a', label: 'というの' },
              { id: 'b', label: 'といった' },
            ],
            correctOptionIds: ['b'],
            explanationId: 'Menyebut beberapa contoh sekaligus (sushi, tempura, dll) → といった.',
          },
          {
            id: 'w2-d4-r4',
            numberLabel: 'I-4',
            promptBefore: '社長が急に出張になったので、今日の会議は中止だ',
            promptAfter: '。',
            options: [
              { id: 'a', label: 'ということだ' },
              { id: 'b', label: 'というのだ' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menyimpulkan kabar resmi bahwa rapat hari ini dibatalkan → ということだ.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w2-d4-o1',
            numberLabel: 'II-1',
            prefix: '「一期一会」',
            suffix: '大切な言葉です。',
            tokens: [
              { id: 1, label: 'の' },
              { id: 2, label: 'というのは' },
              { id: 3, label: '出会いを大切にする' },
              { id: 4, label: '一生に一度' },
            ],
            correctOrder: [2, 4, 1, 3],
            explanationId: 'Urutan: というのは 一生に一度 の 出会いを大切にする (merupakan kata penting tentang menghargai pertemuan sekali seumur hidup).',
          },
          {
            id: 'w2-d4-o2',
            numberLabel: 'II-2',
            prefix: 'つまり、明日の試合には出られない',
            suffix: 'か。',
            tokens: [
              { id: 1, label: 'という' },
              { id: 2, label: 'です' },
              { id: 3, label: 'こと' },
              { id: 4, label: 'なん' },
            ],
            correctOrder: [1, 3, 4, 2],
            explanationId: 'Urutan: という こと なん です (Jadi maksudnya besok tidak bisa ikut bertanding ya?).',
          },
        ],
      },
      {
        id: 'w2-d5',
        weekNumber: 2,
        dayNumber: 5,
        titleJp: '美人というより',
        titleId: 'Nuansa Perbandingan, Asosiasi Topik, & Konsesi (というより・というと・といっても)',
        grammarPoints: [
          {
            id: 'w2-d5-g1',
            titleJp: 'A + というより B / というか',
            connectionFormula: 'Kalimat Biasa / N / na + というより (むしろ) B',
            shortMeaningId: 'Daripada disebut A, lebih tepatnya B',
            easyExplanationId:
              'Dipakai untuk mengoreksi pilihan kata agar lebih akurat. A tidak salah total, tapi B jauh lebih tepat menggambarkan kenyataan ("daripada cantik, dia lebih cocok disebut manis/imut").',
            examples: [
              {
                jp: '彼女は美人というより、かわいいタイプだ。',
                id: 'Dia daripada disebut cantik jelita, lebih tepatnya tipe yang imut.',
              },
              {
                jp: 'この部屋は涼しいというより、むしろ寒いくらいだ。',
                id: 'Kamar ini daripada sejuk, malah terasa dingin.',
              },
            ],
          },
          {
            id: 'w2-d5-g2',
            titleJp: 'N + というと / といえば / といったら',
            connectionFormula: 'Topik + というと / といえば / といったら',
            shortMeaningId: 'Kalau bicara soal..., yang langsung teringat adalah...',
            easyExplanationId:
              'Mengambil satu asosiasi khas dari suatu topik ("kalau bicara Kyoto → kuil", "kalau bicara musim panas → kembang api") atau menyambung pembicaraan ("ngomong-ngomong soal Tanaka...").',
            tipOrPitfallId:
              'といったら bernuansa perasaan kagum/terkejut yang lebih kuat ("Wah, kalau soal dinginnya Hokkaido, bukan main!").',
            examples: [
              {
                jp: '日本の食べ物というと、やはりおすしが一番に思い浮かびます。',
                id: 'Kalau bicara soal makanan Jepang, tetap saja sushi yang pertama teringat.',
              },
              {
                jp: 'そういえば、佐藤さんって来週結婚するんだってね。',
                id: 'Ngomong-ngomong, katanya Sato minggu depan mau menikah ya.',
              },
            ],
          },
          {
            id: 'w2-d5-g3',
            titleJp: '～といっても',
            connectionFormula: 'Kalimat Biasa / N(tanpa だ) + といっても',
            shortMeaningId: 'Meskipun dibilang..., tapi sebenarnya tidak sehebat/sebanyak itu',
            easyExplanationId:
              'Meluruskan ekspektasi pendengar agar tidak salah mengira terlalu berlebihan ("meski dibilang bisa masak, paling cuma bisa menggoreng telur").',
            examples: [
              {
                jp: '日本語が話せるといっても、日常会話ができる程度です。',
                id: 'Meskipun dibilang bisa berbahasa Jepang, baru sebatas percakapan sehari-hari saja.',
              },
              {
                jp: '連休といっても、たった二日間だけです。',
                id: 'Meski disebut libur panjang, cuma dua hari saja kok.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w2-d5-r1',
            numberLabel: 'I-1',
            promptBefore: '彼は友達',
            promptAfter: '、家族のような存在だ。',
            options: [
              { id: 'a', label: 'というより' },
              { id: 'b', label: 'といっても' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Lebih tepat disebut seperti keluarga daripada sekadar teman → というより.',
          },
          {
            id: 'w2-d5-r2',
            numberLabel: 'I-2',
            promptBefore: '北海道の食べ物',
            promptAfter: '、やはり新鮮な魚やラーメンですね。',
            options: [
              { id: 'a', label: 'といえば' },
              { id: 'b', label: 'といっても' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Menyebut asosiasi terkenal dari suatu daerah/topik → といえば.',
          },
          {
            id: 'w2-d5-r3',
            numberLabel: 'I-3',
            promptBefore: '夏休み',
            promptAfter: '、アルバイトばかりであまり休めない。',
            options: [
              { id: 'a', label: 'といっても' },
              { id: 'b', label: 'というと' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Meskipun disebut libur musim panas, kenyataannya kerja paruh waktu terus → といっても.',
          },
          {
            id: 'w2-d5-r4',
            numberLabel: 'I-4',
            promptBefore: 'あの先生は厳しい',
            promptAfter: '、本当は学生思いの優しい先生だ。',
            options: [
              { id: 'a', label: 'というか' },
              { id: 'b', label: 'といっても' },
            ],
            correctOptionIds: ['b'],
            explanationId: 'Meski dibilang tegas, sebenarnya penyayang/tidak seram seperti kelihatannya → といっても.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w2-d5-o1',
            numberLabel: 'II-1',
            prefix: 'この仕事は忙しい',
            suffix: '残業はほとんどない。',
            tokens: [
              { id: 1, label: 'といっても' },
              { id: 2, label: '週に' },
              { id: 3, label: '一度くらいで' },
              { id: 4, label: '忙しい日が' },
            ],
            correctOrder: [1, 4, 2, 3],
            explanationId: 'Urutan: といっても 忙しい日が 週に 一度くらいで (meskipun dibilang sibuk, hari sibuknya cuma sekitar seminggu sekali).',
          },
          {
            id: 'w2-d5-o2',
            numberLabel: 'II-2',
            prefix: 'この犬は、犬',
            suffix: 'おとなしい性格だ。',
            tokens: [
              { id: 1, label: 'ように' },
              { id: 2, label: 'というより' },
              { id: 3, label: '猫の' },
              { id: 4, label: 'むしろ' },
            ],
            correctOrder: [2, 4, 3, 1],
            explanationId: 'Urutan: というより むしろ 猫の ように (daripada anjing, malah berwatak tenang seperti kucing).',
          },
        ],
      },
      {
        id: 'w2-d6',
        weekNumber: 2,
        dayNumber: 6,
        titleJp: '食べてごらん',
        titleId: 'Anjuran Coba & Kutipan Perintah/Larangan (てごらん・ように言う・命令形+と言われる)',
        grammarPoints: [
          {
            id: 'w2-d6-g1',
            titleJp: 'Vて + ごらん（なさい）',
            connectionFormula: 'Vて / Vで + ごらん（なさい）',
            registerTag: 'Lisan',
            shortMeaningId: 'Coba lakukanlah... (nada lembut kepada anak / bawahan / teman dekat)',
            easyExplanationId:
              'Bentuk perintah lembut yang mengajak lawan bicara mencoba melihat hasilnya ("coba cicipi ini", "coba lihat ke sana", "coba kerjakan sendiri").',
            tipOrPitfallId:
              'JANGAN dipakai ke orang yang lebih tua, guru, atau atasan karena terkesan menggurui dari posisi lebih tinggi.',
            examples: [
              {
                jp: 'とてもおいしいから、一口食べてごらん。',
                id: 'Karena sangat enak, coba makan sesuap deh.',
              },
              {
                jp: 'あ、虹が出ているよ。空を見てごらん。',
                id: 'Eh, ada pelangi lho. Coba lihat ke langit.',
              },
            ],
          },
          {
            id: 'w2-d6-g2',
            titleJp: 'Vる / Vない + よう（に）言う / 頼む / 注意する',
            connectionFormula: 'Vkamus / Vない + ように + 言う / 注意する / 頼む',
            shortMeaningId: 'Menyampaikan pesan/permintaan agar melakukan atau tidak melakukan...',
            easyExplanationId:
              'Digunakan saat menceritakan ulang nasihat, perintah, atau permintaan orang lain secara tidak langsung ("Dokter berpesan agar minum obat", "Ibu berpesan agar tidak begadang").',
            examples: [
              {
                jp: '医者に、毎日薬を飲むように言われた。',
                id: 'Saya disuruh dokter untuk minum obat setiap hari.',
              },
              {
                jp: '父は夜遅くまで起きないように注意した。',
                id: 'Ayah mengingatkan agar tidak bangun sampai larut malam.',
              },
            ],
          },
          {
            id: 'w2-d6-g3',
            titleJp: 'V命令形 / Vるな + と言われる / 注意される / 怒られる',
            connectionFormula: 'Bentuk Perintah / Vkamus+な (jangan) + と言われる・しかられる',
            shortMeaningId: 'Dimarahi / Diperintah langsung dengan kata "..."',
            easyExplanationId:
              'Menyampaikan ucapan perintah keras atau larangan langsung secara pasif. "早くしろ" (cepat!) menjadi 早くしろと言われた; "触るな" (jangan sentuh!) menjadi 触るなと注意された.',
            examples: [
              {
                jp: '父に「もっと勉強しろ」と言われた。',
                id: 'Saya disuruh oleh ayah, "Belajar lebih giat!"',
              },
              {
                jp: '美術館で係の人に、絵に触るなと注意された。',
                id: 'Di museum, saya diperingatkan petugas agar tidak menyentuh lukisan.',
              },
            ],
          },
          {
            id: 'w2-d6-g4',
            titleJp: 'Vてくれ / Vないでくれ + と頼まれる / 言われる',
            connectionFormula: 'Vてくれ / Vないでくれ + と頼まれる',
            shortMeaningId: 'Diminta tolong untuk... / tidak...',
            easyExplanationId:
              'Mengubah kalimat permintaan "～てください / ～ないでください" menjadi kutipan tidak langsung (biasanya ke/dari pria atau gaya kalimat tidak langsung umum).',
            examples: [
              {
                jp: '友だちに、引っ越しを手伝ってくれと頼まれた。',
                id: 'Saya dimintai tolong oleh teman untuk membantu pindahan.',
              },
            ],
          },
        ],
        renshuuPart1: [
          {
            id: 'w2-d6-r1',
            numberLabel: 'I-1',
            promptBefore: 'お母さんが作ったクッキーだよ。一つ',
            promptAfter: '。',
            options: [
              { id: 'a', label: '食べてごらん' },
              { id: 'b', label: '食べてみますか' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Ajakan lembut dari ibu kepada anak untuk mencoba → 食べてごらん.',
          },
          {
            id: 'w2-d6-r2',
            numberLabel: 'I-2',
            promptBefore: '先生に「もっと大きい声で',
            promptAfter: '」と言われた。',
            options: [
              { id: 'a', label: '読め' },
              { id: 'b', label: '読むよう' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Dalam kutipan langsung 「...」 sebelum と言われた, dipakai bentuk perintah langsung 読め!',
          },
          {
            id: 'w2-d6-r3',
            numberLabel: 'I-3',
            promptBefore: '図書館では、大声で',
            promptAfter: 'ように注意された。',
            options: [
              { id: 'a', label: '話さない' },
              { id: 'b', label: '話すな' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Pasangan pola ～ように注意された memakai Vない (話さない), bukan 話すな (yang berpasangan dengan と).',
          },
          {
            id: 'w2-d6-r4',
            numberLabel: 'I-4',
            promptBefore: '姉に、犬の散歩に',
            promptAfter: 'と頼まれた。',
            options: [
              { id: 'a', label: '行ってくれ' },
              { id: 'b', label: '行くように' },
            ],
            correctOptionIds: ['a'],
            explanationId: 'Mengutip permintaan menggunakan partikel と → 行ってくれと頼まれた.',
          },
        ],
        renshuuPart2: [
          {
            id: 'w2-d6-o1',
            numberLabel: 'II-1',
            prefix: '医者に、しばらくお酒を',
            suffix: '注意された。',
            tokens: [
              { id: 1, label: '飲まない' },
              { id: 2, label: 'に' },
              { id: 3, label: 'よう' },
              { id: 4, label: 'と' },
            ],
            correctOrder: [1, 3, 2, 4],
            explanationId: 'Tunggu: biasanya 飲まない よう に (tanpa と) atau 飲むな と. Cek urutan alami: 医者に、しばらくお酒を 飲まない ように と 注意された (secara lisan ようにと juga sering dipakai di Jepang!).',
          },
          {
            id: 'w2-d6-o2',
            numberLabel: 'II-2',
            prefix: 'わからないことがあったら、',
            suffix: '。',
            tokens: [
              { id: 1, label: 'ごらん' },
              { id: 2, label: '自分で' },
              { id: 3, label: '調べて' },
              { id: 4, label: '辞書で' },
            ],
            correctOrder: [2, 4, 3, 1],
            explanationId: 'Urutan: 自分で 辞書で 調べて ごらん (Cobalah cari sendiri di kamus).',
          },
        ],
      },
    ],
    jissen: {
      id: 'w2-d7',
      weekNumber: 2,
      dayNumber: 7,
      titleJp: '第2週 実践問題',
      titleId: 'Latihan Ujian Mingguan (Minggu 2)',
      timeLimitMin: 15,
      mondai3PassageTitleJp: '健康のための食生活',
      mondai3PassageLines: [
        '最近、若い人の間で野菜不足が問題になっている。忙しいからといって、コンビニの弁当やファストフード [ 21 ] 食べている人が多いようだ。',
        'ある調査 [ 22 ]、1日に必要な野菜の量をきちんと取っている人は全体の3割ほどしかいないという。野菜不足を続けると、体調を崩す原因にもなる。',
        '「料理が苦手だ」という人もいるが、料理 [ 23 ]、ただ野菜を洗って切るだけのサラダなら数分でできる。最初は簡単なものから作って [ 24 ]、少しずつ食事のバランスを整えていくことが大切だ。毎日自分の体の [ 25 ] 考えて、少しでも野菜を取る習慣をつけよう。',
      ],
      questions: [
        {
          id: 'w2-j-1',
          number: 1,
          type: 'mondai1_mcq',
          promptJp: '彼は毎日遊んで（　　）いて、まったく勉強しない。',
          options: [
            { id: '1', label: 'だけ' },
            { id: '2', label: 'ばかり' },
            { id: '3', label: 'しか' },
            { id: '4', label: 'こそ' },
          ],
          correctOptionId: '2',
          explanationId: 'Bermain melulu setiap hari → Vてばかりいる.',
        },
        {
          id: 'w2-j-2',
          number: 2,
          type: 'mondai1_mcq',
          promptJp: '冷蔵庫の中には卵が1個（　　）残っていない。',
          options: [
            { id: '1', label: 'だけしか' },
            { id: '2', label: 'だけこそ' },
            { id: '3', label: 'でさえ' },
            { id: '4', label: 'ばかり' },
          ],
          correctOptionId: '1',
          explanationId: 'Hanya tersisa 1 butir saja (diikuti negatif) → だけしか.',
        },
        {
          id: 'w2-j-3',
          number: 3,
          type: 'mondai1_mcq',
          promptJp: 'そんな簡単な漢字は、小学生（　　）知っている。',
          options: [
            { id: '1', label: 'しか' },
            { id: '2', label: 'こそ' },
            { id: '3', label: 'でさえ' },
            { id: '4', label: 'ばかり' },
          ],
          correctOptionId: '3',
          explanationId: 'Mengambil contoh ringan: "bahkan anak SD pun tahu" → でさえ.',
        },
        {
          id: 'w2-j-4',
          number: 4,
          type: 'mondai1_mcq',
          promptJp: '来年（　　）志望校に合格できるようにがんばろう。',
          options: [
            { id: '1', label: 'しか' },
            { id: '2', label: 'こそ' },
            { id: '3', label: 'ばかり' },
            { id: '4', label: 'さえ' },
          ],
          correctOptionId: '2',
          explanationId: 'Penegasan tekad: "Justru tahun depanlah!" → 来年こそ.',
        },
        {
          id: 'w2-j-5',
          number: 5,
          type: 'mondai1_mcq',
          promptJp: '新しい製品（　　）詳しい説明はパンフレットをご覧ください。',
          options: [
            { id: '1', label: 'に関する' },
            { id: '2', label: 'に関して' },
            { id: '3', label: 'による' },
            { id: '4', label: 'によって' },
          ],
          correctOptionId: '1',
          explanationId: 'Langsung menerangkan kata benda 詳しい説明 (penjelasan rinci mengenai produk baru) → に関する.',
        },
        {
          id: 'w2-j-6',
          number: 6,
          type: 'mondai1_mcq',
          promptJp: '今朝の新聞（　　）、来月から地下鉄の料金が値上げされるらしい。',
          options: [
            { id: '1', label: 'について' },
            { id: '2', label: 'に関して' },
            { id: '3', label: 'によると' },
            { id: '4', label: 'によって' },
          ],
          correctOptionId: '3',
          explanationId: 'Sumber informasi dari koran → によると ～らしい.',
        },
        {
          id: 'w2-j-7',
          number: 7,
          type: 'mondai1_mcq',
          promptJp: '同じ言葉でも、国（　　）意味がまったく違うことがある。',
          options: [
            { id: '1', label: 'によって' },
            { id: '2', label: 'について' },
            { id: '3', label: 'によると' },
            { id: '4', label: 'にとって' },
          ],
          correctOptionId: '1',
          explanationId: '"Tergantung negaranya, maknanya berbeda" → 国によって.',
        },
        {
          id: 'w2-j-8',
          number: 8,
          type: 'mondai1_mcq',
          promptJp: 'この町の（　　）は、海が近くて食べ物がおいしいところです。',
          options: [
            { id: '1', label: 'よみ' },
            { id: '2', label: 'よさ' },
            { id: '3', label: 'いいこと' },
            { id: '4', label: 'よっぽさ' },
          ],
          correctOptionId: '2',
          explanationId: 'Bentuk kata benda dari いい adalah よさ (kelebihan/kebaikan kota ini).',
        },
        {
          id: 'w2-j-9',
          number: 9,
          type: 'mondai1_mcq',
          promptJp: '彼女は人の（　　）がわかる思いやりのある人だ。',
          options: [
            { id: '1', label: '悲しさ' },
            { id: '2', label: '痛み' },
            { id: '3', label: '痛さ' },
            { id: '4', label: '重さ' },
          ],
          correctOptionId: '2',
          explanationId: 'Ungkapan baku 人の痛みがわかる (memahami rasa sakit/penderitaan orang lain).',
        },
        {
          id: 'w2-j-10',
          number: 10,
          type: 'mondai1_mcq',
          promptJp: 'さっき田中さん（　　）人から電話がかかってきた。',
          options: [
            { id: '1', label: 'といった' },
            { id: '2', label: 'という' },
            { id: '3', label: 'というのは' },
            { id: '4', label: 'ということ' },
          ],
          correctOptionId: '2',
          explanationId: 'Menyebut orang bernama Tanaka → 田中さんという人.',
        },
        {
          id: 'w2-j-11',
          number: 11,
          type: 'mondai1_mcq',
          promptJp: '「リサイクル」というのは、不要になったものを（　　）という意味だ。',
          options: [
            { id: '1', label: 'もう一度使うこと' },
            { id: '2', label: 'もう一度使うもの' },
            { id: '3', label: 'もう一度使って' },
            { id: '4', label: 'もう一度使おう' },
          ],
          correctOptionId: '1',
          explanationId: 'Definisi konsep "daur ulang" ditutup nominalisasi kata benda こと.',
        },
        {
          id: 'w2-j-12',
          number: 12,
          type: 'mondai1_mcq',
          promptJp: '彼は友だち（　　）、お兄さんのような存在です。',
          options: [
            { id: '1', label: 'というと' },
            { id: '2', label: 'といっても' },
            { id: '3', label: 'というより' },
            { id: '4', label: 'といえば' },
          ],
          correctOptionId: '3',
          explanationId: 'Daripada teman, lebih tepatnya seperti kakak laki-laki → というより.',
        },
        {
          id: 'w2-j-13',
          number: 13,
          type: 'mondai1_mcq',
          promptJp: '車が運転できる（　　）、近所のスーパーへ買い物に行く程度です。',
          options: [
            { id: '1', label: 'といっても' },
            { id: '2', label: 'というより' },
            { id: '3', label: 'というと' },
            { id: '4', label: 'としたら' },
          ],
          correctOptionId: '1',
          explanationId: 'Meskipun dibilang bisa nyetir, paling cuma sebatas ke supermarket dekat rumah → といっても.',
        },
        {
          id: 'w2-j-14',
          number: 14,
          type: 'mondai1_mcq',
          promptJp: 'これはすごく面白い本だから、君も読んで（　　）。',
          options: [
            { id: '1', label: 'みなさい' },
            { id: '2', label: 'ごらん' },
            { id: '3', label: 'ください' },
            { id: '4', label: 'おいで' },
          ],
          correctOptionId: '2',
          explanationId: 'Ajakan hangat antar teman/adik → Vてごらん (読んでごらん).',
        },
        {
          id: 'w2-j-15',
          number: 15,
          type: 'mondai1_mcq',
          promptJp: '先生に「もっと漢字を練習（　　）」と言われた。',
          options: [
            { id: '1', label: 'するな' },
            { id: '2', label: 'しろ' },
            { id: '3', label: 'するように' },
            { id: '4', label: 'してくれ' },
          ],
          correctOptionId: '2',
          explanationId: 'Kutipan langsung dalam tanda kurung 「...」 dengan と言われた memakai bentuk perintah しろ.',
        },
        {
          id: 'w2-j-16',
          number: 16,
          type: 'mondai2_star',
          starPrefix: '子どもがいつもゲームばかり',
          starSuffix: '。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: 'お母さんは' },
            { id: '2', label: '困っている' },
            { id: '3', label: 'ので' },
            { id: '4', label: 'している' },
          ],
          correctOptionId: '1',
          correctOrderIds: ['4', '3', '1', '2'],
          explanationId: 'Urutan: している (4) ので (3) お母さんは ★ (1) 困っている (2).',
        },
        {
          id: 'w2-j-17',
          number: 17,
          type: 'mondai2_star',
          starPrefix: '日本の伝統',
          starSuffix: '調べている。',
          starSlotIndex: 1,
          options: [
            { id: '1', label: 'に' },
            { id: '2', label: 'インターネットで' },
            { id: '3', label: '関して' },
            { id: '4', label: '今' },
          ],
          correctOptionId: '3',
          correctOrderIds: ['1', '3', '4', '2'],
          explanationId: 'Urutan: に (1) 関して ★ (3) 今 (4) インターネットで (2) 調べている.',
        },
        {
          id: 'w2-j-18',
          number: 18,
          type: 'mondai2_star',
          starPrefix: '駅の前で誰かがギターを',
          starSuffix: '。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: '弾いて' },
            { id: '2', label: '聞こえた' },
            { id: '3', label: 'いるのが' },
            { id: '4', label: '遠くから' },
          ],
          correctOptionId: '4',
          correctOrderIds: ['1', '3', '4', '2'],
          explanationId: 'Urutan: 弾いて (1) いるのが (3) 遠くから ★ (4) 聞こえた (2).',
        },
        {
          id: 'w2-j-19',
          number: 19,
          type: 'mondai2_star',
          starPrefix: '京都といえば、美しいお寺や神社',
          starSuffix: '。',
          starSlotIndex: 1,
          options: [
            { id: '1', label: '観光地が' },
            { id: '2', label: '有名です' },
            { id: '3', label: 'といった' },
            { id: '4', label: 'たくさんの' },
          ],
          correctOptionId: '4',
          correctOrderIds: ['3', '4', '1', '2'],
          explanationId: 'Urutan: といった (3) たくさんの ★ (4) 観光地が (1) 有名です (2).',
        },
        {
          id: 'w2-j-20',
          number: 20,
          type: 'mondai2_star',
          starPrefix: '父に「人の物を勝手に',
          starSuffix: '。',
          starSlotIndex: 2,
          options: [
            { id: '1', label: '怒られた' },
            { id: '2', label: '」と' },
            { id: '3', label: '厳しく' },
            { id: '4', label: '使うな' },
          ],
          correctOptionId: '3',
          correctOrderIds: ['4', '2', '3', '1'],
          explanationId: 'Urutan: 使うな (4) 」と (2) 厳しく ★ (3) 怒られた (1).',
        },
        {
          id: 'w2-j-21',
          number: 21,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'ばかり' },
            { id: '2', label: 'こそ' },
            { id: '3', label: 'さえ' },
            { id: '4', label: 'だけしか' },
          ],
          correctOptionId: '1',
          explanationId: 'Makan bento dan fast food melulu (kalimat ditutup positif 食べている) → ばかり.',
        },
        {
          id: 'w2-j-22',
          number: 22,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'について' },
            { id: '2', label: 'によると' },
            { id: '3', label: 'といっても' },
            { id: '4', label: 'に関して' },
          ],
          correctOptionId: '2',
          explanationId: 'Mengutip hasil survei (...という) → ある調査によると.',
        },
        {
          id: 'w2-j-23',
          number: 23,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'といっても' },
            { id: '2', label: 'というのは' },
            { id: '3', label: 'といった' },
            { id: '4', label: 'によって' },
          ],
          correctOptionId: '1',
          explanationId: '"Meskipun disebut memasak, kalau cuma salad potong sayur bisa jadi dalam beberapa menit" → といっても.',
        },
        {
          id: 'w2-j-24',
          number: 24,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'ごらん' },
            { id: '2', label: 'みて' },
            { id: '3', label: 'くれて' },
            { id: '4', label: 'しまって' },
          ],
          correctOptionId: '2',
          explanationId: 'Bersambung ke klausa lanjutan ...少しずつ... (cobalah buat yang mudah lalu atur pola makan) → 作ってみて.',
        },
        {
          id: 'w2-j-25',
          number: 25,
          type: 'mondai3_cloze',
          options: [
            { id: '1', label: 'ことを' },
            { id: '2', label: 'さを' },
            { id: '3', label: 'みを' },
            { id: '4', label: 'ところを' },
          ],
          correctOptionId: '1',
          explanationId: 'Memikirkan kondisi tubuh sendiri secara halus memakai 体のことを考えて.',
        },
      ],
      keigoTip: {
        titleJp: '敬語②：いらっしゃる・参る（まいる）・おる',
        summaryId:
          'Pelajaran Keigo Minggu 2: Kata sopan untuk "pergi, datang, berada" sangat sering diuji di JLPT N3. Jangan sampai tertukar antara尊敬語 (menghormati orang lain) dan 謙譲語/丁重語 (merendah untuk diri sendiri)!',
        pairs: [
          {
            plain: '行く・来る・いる (untuk atasan/tamu)',
            honorificOrHumble: 'いらっしゃる (尊敬語)',
            meaningId: 'Pergi / datang / ada (bentuk hormat)',
            exampleJp: '先生は今、職員室にいらっしゃいます。',
          },
          {
            plain: '行く・来る (untuk diri sendiri)',
            honorificOrHumble: '参る・まいる (謙譲語)',
            meaningId: 'Pergi / datang (bentuk merendah)',
            exampleJp: 'ただいま会議室へ参ります。',
          },
          {
            plain: 'いる (untuk diri sendiri/keluarga)',
            honorificOrHumble: 'おる (謙譲語・丁重語)',
            meaningId: 'Berada / sedang (bentuk merendah)',
            exampleJp: '母は今、買い物に出かけております。',
          },
        ],
      },
    },
  },
];
