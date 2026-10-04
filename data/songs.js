// ============================================================
//  SONGS DATABASE — Raag & Scale Explorer
//  baseScale: the original key of the song (Western sharp note name)
//  chords: authentic chords of the song in its original key
// ============================================================

const SONGS_DB = [
  // ── BHAIRAVI ──────────────────────────────────────────────
  {
    id: 1,
    name: "Tum Hi Ho",
    singer: "Arijit Singh",
    film: "Aashiqui 2",
    year: 2013,
    raag: "Bhairavi",
    baseScale: "C#",
    chords: ["C#m", "A", "E", "B"],
    tags: ["bollywood", "romantic", "modern"],
    popularityScore: 99
  },
  {
    id: 2,
    name: "Lag Ja Gale",
    singer: "Lata Mangeshkar",
    film: "Woh Kaun Thi",
    year: 1964,
    raag: "Bhairavi",
    baseScale: "C#",
    chords: ["C#m", "F#m", "B", "E"],
    tags: ["bollywood", "classic", "romantic"],
    popularityScore: 98
  },
  {
    id: 3,
    name: "Channa Mereya",
    singer: "Arijit Singh",
    film: "Ae Dil Hai Mushkil",
    year: 2016,
    raag: "Bhairavi",
    baseScale: "C#",
    chords: ["C#m", "B", "F#m", "E"],
    tags: ["bollywood", "modern", "sad"],
    popularityScore: 97
  },
  {
    id: 4,
    name: "Kahin Deep Jale Kahin Dil",
    singer: "Lata Mangeshkar",
    film: "Bees Saal Baad",
    year: 1962,
    raag: "Bhairavi",
    baseScale: "C#",
    chords: ["C#m", "F#m", "G#dim", "A"],
    tags: ["bollywood", "classic", "mystery"],
    popularityScore: 88
  },
  {
    id: 5,
    name: "Mora Piya",
    singer: "Aadesh Shrivastava",
    film: "Raajneeti",
    year: 2010,
    raag: "Bhairavi",
    baseScale: "D",
    chords: ["Dm", "Gm", "C", "F"],
    tags: ["bollywood", "devotional"],
    popularityScore: 84
  },
  {
    id: 6,
    name: "Albela Sajan Aayo Ri",
    singer: "Ustad Rashid Khan / Ismail Darbar",
    film: "Hum Dil De Chuke Sanam",
    year: 1999,
    raag: "Bhairavi",
    baseScale: "C#",
    chords: ["C#m", "A", "B", "E"],
    tags: ["classical", "semi-classical"],
    popularityScore: 92
  },

  // ── YAMAN ─────────────────────────────────────────────────
  {
    id: 7,
    name: "Main Agar Kahoon",
    singer: "Sonu Nigam, Shreya Ghoshal",
    film: "Om Shanti Om",
    year: 2007,
    raag: "Yaman",
    baseScale: "C#",
    chords: ["C#", "G#", "A#m", "F#"],
    tags: ["bollywood", "romantic", "modern"],
    popularityScore: 95
  },
  {
    id: 8,
    name: "Kahin Door Jab Din Dhal Jaye",
    singer: "Mukesh",
    film: "Anand",
    year: 1971,
    raag: "Yaman",
    baseScale: "C#",
    chords: ["C#", "Fm", "G#", "A#m"],
    tags: ["bollywood", "classic", "melancholy"],
    popularityScore: 96
  },
  {
    id: 9,
    name: "Raina Beeti Jaye",
    singer: "Lata Mangeshkar",
    film: "Amar Prem",
    year: 1972,
    raag: "Yaman",
    baseScale: "G",
    chords: ["G", "D", "Em", "C"],
    tags: ["bollywood", "classic", "semi-classical"],
    popularityScore: 91
  },
  {
    id: 10,
    name: "Ehsan Tera Hoga Mujh Par",
    singer: "Mohammed Rafi",
    film: "Junglee",
    year: 1961,
    raag: "Yaman",
    baseScale: "C#",
    chords: ["C#", "A#m", "F#", "G#"],
    tags: ["bollywood", "classic", "romantic"],
    popularityScore: 93
  },
  {
    id: 11,
    name: "Abhi Na Jao Chhod Kar",
    singer: "Mohammed Rafi, Asha Bhosle",
    film: "Hum Dono",
    year: 1961,
    raag: "Yaman",
    baseScale: "C#",
    chords: ["C#", "G#", "F#", "A#m"],
    tags: ["bollywood", "classic", "romantic"],
    popularityScore: 98
  },
  {
    id: 12,
    name: "Jhilmil Sitaron Ka Aangan Hoga",
    singer: "Mohammed Rafi, Lata Mangeshkar",
    film: "Jeevan Mrityu",
    year: 1970,
    raag: "Yaman",
    baseScale: "C#",
    chords: ["C#", "G#", "F#", "A#m"],
    tags: ["bollywood", "classic", "romantic"],
    popularityScore: 87
  },

  // ── BHAIRAV ───────────────────────────────────────────────
  {
    id: 13,
    name: "Jogiya",
    singer: "Ustad Rashid Khan",
    film: "Classical Fusion",
    year: 2000,
    raag: "Bhairav",
    baseScale: "C#",
    chords: ["C#", "Dm", "F#m", "G#"],
    tags: ["classical", "devotional", "spiritual"],
    popularityScore: 78
  },
  {
    id: 14,
    name: "Babul Mora Naihar Chhuto Hi Jaye",
    singer: "K. L. Saigal",
    film: "Street Singer",
    year: 1938,
    raag: "Bhairav",
    baseScale: "C#",
    chords: ["C#", "D", "F#m", "G#"],
    tags: ["classic", "devotional", "sad"],
    popularityScore: 90
  },
  {
    id: 15,
    name: "Kabira",
    singer: "Tochi Raina, Rekha Bhardwaj",
    film: "Yeh Jawaani Hai Deewani",
    year: 2013,
    raag: "Bhairav",
    baseScale: "D",
    chords: ["D", "Bm", "G", "A"],
    tags: ["bollywood", "modern", "sufi"],
    popularityScore: 96
  },
  {
    id: 16,
    name: "Albela Sajan (Bhairav Thumri)",
    singer: "Sultan Khan",
    film: "Ustad Sultan Khan Classical",
    year: 2002,
    raag: "Bhairav",
    baseScale: "C#",
    chords: ["C#", "Dm", "F", "F#m"],
    tags: ["classical", "spiritual"],
    popularityScore: 74
  },

  // ── DARBARI KANADA ────────────────────────────────────────
  {
    id: 17,
    name: "O Re Piya",
    singer: "Rahat Fateh Ali Khan",
    film: "Aaja Nachle",
    year: 2007,
    raag: "Darbari Kanada",
    baseScale: "C#",
    chords: ["C#m", "G#m", "A", "E"],
    tags: ["bollywood", "modern", "sufi", "romantic"],
    popularityScore: 97
  },
  {
    id: 18,
    name: "Kun Faya Kun",
    singer: "A.R. Rahman, Javed Ali, Mohit Chauhan",
    film: "Rockstar",
    year: 2011,
    raag: "Darbari Kanada",
    baseScale: "C#",
    chords: ["C#m", "A", "F#m", "G#m"],
    tags: ["bollywood", "sufi", "spiritual", "modern"],
    popularityScore: 99
  },
  {
    id: 19,
    name: "Tu Kuja Man Kuja",
    singer: "Sukhwinder Singh, Javed Ali",
    film: "Bajrangi Bhaijaan",
    year: 2015,
    raag: "Darbari Kanada",
    baseScale: "C#",
    chords: ["C#m", "A", "F#m", "G#m"],
    tags: ["bollywood", "devotional"],
    popularityScore: 93
  },
  {
    id: 20,
    name: "Hangama Hai Kyon Barpa",
    singer: "Ghulam Ali",
    film: "Ghazal Classic",
    year: 1980,
    raag: "Darbari Kanada",
    baseScale: "C#",
    chords: ["C#m", "F#m", "G#m", "B"],
    tags: ["ghazal", "classic"],
    popularityScore: 92
  },

  // ── SHIVARANJANI ──────────────────────────────────────────
  {
    id: 21,
    name: "Mere Naina Sawan Bhadon",
    singer: "Kishore Kumar / Lata Mangeshkar",
    film: "Mehbooba",
    year: 1976,
    raag: "Shivaranjani",
    baseScale: "C#",
    chords: ["C#m", "G#sus4", "A#dim", "C#sus2"],
    tags: ["bollywood", "classic", "sad"],
    popularityScore: 97
  },
  {
    id: 22,
    name: "Tere Mere Beech Mein",
    singer: "Lata Mangeshkar, S. P. Balasubrahmanyam",
    film: "Ek Duuje Ke Liye",
    year: 1981,
    raag: "Shivaranjani",
    baseScale: "C#",
    chords: ["C#m", "C#sus2", "D#sus4", "G#sus4"],
    tags: ["bollywood", "classic", "romantic"],
    popularityScore: 94
  },
  {
    id: 23,
    name: "Jane Kahan Gaye Woh Din",
    singer: "Mukesh",
    film: "Mera Naam Joker",
    year: 1970,
    raag: "Shivaranjani",
    baseScale: "C#",
    chords: ["C#m", "A#dim", "G#sus2", "C#sus2"],
    tags: ["bollywood", "classic", "melancholy"],
    popularityScore: 96
  },
  {
    id: 24,
    name: "O Saathi Re (Female / Male)",
    singer: "Kishore Kumar / Asha Bhosle",
    film: "Muqaddar Ka Sikandar",
    year: 1978,
    raag: "Shivaranjani",
    baseScale: "C#",
    chords: ["C#m", "G#sus2", "G#sus4", "C#sus2"],
    tags: ["bollywood", "classic", "melancholy"],
    popularityScore: 95
  },

  // ── PURIYA DHANASHRI ──────────────────────────────────────
  {
    id: 25,
    name: "Rut Aa Gayi Re",
    singer: "Sukhwinder Singh",
    film: "1947 Earth",
    year: 1998,
    raag: "Puriya Dhanashri",
    baseScale: "C#",
    chords: ["C#", "Dm", "F", "Fm"],
    tags: ["bollywood", "a.r. rahman", "folk"],
    popularityScore: 89
  },
  {
    id: 26,
    name: "Labon Se Choom Lo",
    singer: "Hariharan",
    film: "Ghazal",
    year: 1996,
    raag: "Puriya Dhanashri",
    baseScale: "C#",
    chords: ["C#", "Dm", "Fsus2", "Csus4"],
    tags: ["ghazal", "semi-classical"],
    popularityScore: 81
  },
  {
    id: 27,
    name: "Hai Rama Yeh Kya Hua",
    singer: "Hariharan, Swarnalatha",
    film: "Rangeela",
    year: 1995,
    raag: "Puriya Dhanashri",
    baseScale: "C#",
    chords: ["C#", "Dm", "Fm", "Gsus4"],
    tags: ["bollywood", "a.r. rahman", "romantic"],
    popularityScore: 93
  },

  // ── HANSDHWANI ────────────────────────────────────────────
  {
    id: 28,
    name: "Vatapi Ganapatim",
    singer: "M. S. Subbulakshmi / Yesudas",
    film: "Carnatic Classic",
    year: 1975,
    raag: "Hansdhwani",
    baseScale: "C#",
    chords: ["C#", "C#sus2", "Fm", "G#"],
    tags: ["classical", "devotional", "auspicious"],
    popularityScore: 95
  },
  {
    id: 29,
    name: "Jaane Wale O Jaane Wale",
    singer: "Lata Mangeshkar, Manhar Udhas",
    film: "Bheegi Palken",
    year: 1982,
    raag: "Hansdhwani",
    baseScale: "C#",
    chords: ["C#", "C#sus2", "G#", "G#sus4"],
    tags: ["bollywood", "classic"],
    popularityScore: 84
  },
  {
    id: 30,
    name: "Lagi Lagan Pati Sajan Sang",
    singer: "Lata Mangeshkar",
    film: "Semi Classical",
    year: 1970,
    raag: "Hansdhwani",
    baseScale: "C#",
    chords: ["C#", "Fm", "G#", "C#sus2"],
    tags: ["classical", "devotional"],
    popularityScore: 80
  },

  // ── BHOOPALI ──────────────────────────────────────────────
  {
    id: 31,
    name: "Dekha Ek Khwab",
    singer: "Kishore Kumar, Lata Mangeshkar",
    film: "Silsila",
    year: 1981,
    raag: "Bhoopali",
    baseScale: "C#",
    chords: ["C#", "D#sus2", "G#sus2", "A#m"],
    tags: ["bollywood", "classic", "romantic"],
    popularityScore: 98
  },
  {
    id: 32,
    name: "Sayonee",
    singer: "Junoon",
    film: "Azadi",
    year: 1997,
    raag: "Bhoopali",
    baseScale: "C#",
    chords: ["C#", "A#m", "G#sus4", "D#sus4"],
    tags: ["sufi", "rock", "indie"],
    popularityScore: 96
  },
  {
    id: 33,
    name: "Jyoti Kalash Chhalke",
    singer: "Lata Mangeshkar",
    film: "Bhabhi Ki Chudiyan",
    year: 1961,
    raag: "Bhoopali",
    baseScale: "C#",
    chords: ["C#", "C#sus2", "G#sus2", "A#m"],
    tags: ["bollywood", "classic", "devotional"],
    popularityScore: 92
  },
  {
    id: 34,
    name: "Dil Hoon Hoon Kare",
    singer: "Bhupen Hazarika",
    film: "Rudaali",
    year: 1993,
    raag: "Bhoopali",
    baseScale: "C#",
    chords: ["C#", "A#m", "D#sus2", "G#sus2"],
    tags: ["bollywood", "classic", "melancholy"],
    popularityScore: 95
  },

  // ── KHAMAJ ────────────────────────────────────────────────
  {
    id: 35,
    name: "Ajeeb Dastan Hai Yeh",
    singer: "Lata Mangeshkar",
    film: "Dil Apna Aur Preet Parai",
    year: 1960,
    raag: "Khamaj",
    baseScale: "C#",
    chords: ["C#", "A#m", "D#m", "G#7"],
    tags: ["bollywood", "classic", "romantic"],
    popularityScore: 97
  },
  {
    id: 36,
    name: "Mohe Panghat Pe",
    singer: "Lata Mangeshkar",
    film: "Mughal-E-Azam",
    year: 1960,
    raag: "Khamaj",
    baseScale: "D",
    chords: ["D", "Bm", "Em", "A"],
    tags: ["bollywood", "classic", "romantic"],
    popularityScore: 93
  },

  // ── KAFI ──────────────────────────────────────────────────
  {
    id: 37,
    name: "Ae Dil Hai Mushkil",
    singer: "Arijit Singh",
    film: "Ae Dil Hai Mushkil",
    year: 2016,
    raag: "Kafi",
    baseScale: "C#",
    chords: ["C#m", "F#m", "B", "E"],
    tags: ["bollywood", "modern", "romantic"],
    popularityScore: 98
  },
  {
    id: 38,
    name: "Tere Bina",
    singer: "A. R. Rahman, Chinmayi",
    film: "Guru",
    year: 2007,
    raag: "Kafi",
    baseScale: "C#",
    chords: ["C#m", "B", "F#m", "G#m"],
    tags: ["bollywood", "modern", "romantic"],
    popularityScore: 94
  },

  // ── BAGESHRI ──────────────────────────────────────────────
  {
    id: 39,
    name: "Radha Kaise Na Jale",
    singer: "Asha Bhosle, Udit Narayan",
    film: "Lagaan",
    year: 2001,
    raag: "Bageshri",
    baseScale: "C#",
    chords: ["C#m", "F#m", "B", "E"],
    tags: ["bollywood", "a.r. rahman", "folk"],
    popularityScore: 96
  },
  {
    id: 40,
    name: "Moh Moh Ke Dhaage",
    singer: "Monali Thakur, Papon",
    film: "Dum Laga Ke Haisha",
    year: 2015,
    raag: "Bageshri",
    baseScale: "C#",
    chords: ["C#", "A#m", "F#m", "G#"],
    tags: ["bollywood", "modern", "romantic"],
    popularityScore: 93
  },

  // ── BHIMPALASI ────────────────────────────────────────────
  {
    id: 41,
    name: "Kuch Na Kaho",
    singer: "Kumar Sanu",
    film: "1942: A Love Story",
    year: 1994,
    raag: "Bhimpalasi",
    baseScale: "C#",
    chords: ["C#m", "F#m", "B", "G#"],
    tags: ["bollywood", "romantic", "classic"],
    popularityScore: 95
  },
  {
    id: 42,
    name: "Iktara",
    singer: "Kavita Seth, Tochi Raina",
    film: "Wake Up Sid",
    year: 2009,
    raag: "Bhimpalasi",
    baseScale: "D",
    chords: ["D", "Bm", "G", "A"],
    tags: ["bollywood", "modern", "indie"],
    popularityScore: 92
  },

  // ── MALKAUNS ──────────────────────────────────────────────
  {
    id: 43,
    name: "Man Tarpat Hari Darshan Ko Aaj",
    singer: "Mohammed Rafi",
    film: "Baiju Bawra",
    year: 1952,
    raag: "Malkauns",
    baseScale: "C#",
    chords: ["C#m", "F#m", "B", "A"],
    tags: ["bollywood", "classic", "devotional"],
    popularityScore: 97
  },
  {
    id: 44,
    name: "Aaj Jaane Ki Zid Na Karo",
    singer: "Farida Khanum",
    film: "Ghazal Classic",
    year: 1975,
    raag: "Malkauns",
    baseScale: "C#",
    chords: ["C#m", "A", "F#m", "B"],
    tags: ["ghazal", "classic", "romantic"],
    popularityScore: 95
  }
];

// Expose globally
window.SONGS_DB = SONGS_DB;
