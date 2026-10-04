// ============================================================
//  RAAG DATABASE — Raag & Scale Explorer
//  Semitone intervals are relative to Sa (root = 0)
//  0=Sa, 1=Re♭, 2=Re, 3=Ga♭, 4=Ga, 5=Ma, 6=Ma#, 7=Pa, 8=Dha♭, 9=Dha, 10=Ni♭, 11=Ni
// ============================================================

const RAAGS_DB = {
  "Yaman": {
    name: "Raag Yaman",
    hindiName: "यमन",
    thaat: "Kalyan",
    time: "Early Night (Pradosh Kaal)",
    timeIcon: "🌙",
    mood: "Romance, Serenity, Grandeur, Peace",
    season: "All Seasons",
    description: "Yaman (Kalyan) is one of the most beloved evening Raags. The sharp Ma (tivra Ma) gives it a shimmering, celestial quality full of devotion, romance, and tranquility.",
    intervals: [0, 2, 4, 6, 7, 9, 11],
    sargam:    ["Sa", "Re", "Ga", "Ma#", "Pa", "Dha", "Ni"],
    vadi: "Ga",
    samvadi: "Ni",
    arohiSargam:  "Sa Re Ga Ma# Pa Dha Ni Sa'",
    avrohiSargam: "Sa' Ni Dha Pa Ma# Ga Re Sa",
    // Exact chord palette matching PDF page 1 for C#
    csharpChords: ["C#", "C#sus2", "D#", "D#sus2", "D#sus4", "Fm", "Fsus2", "Fsus4", "Gdim", "G#", "G#sus2", "G#sus4", "A#m", "A#sus2", "A#sus4", "Cm", "Csus4"],
    color: "#E67E22",
    colorLight: "#FAD7A0"
  },

  "Bhairav": {
    name: "Raag Bhairav",
    hindiName: "भैरव",
    thaat: "Bhairav",
    time: "Early Morning (Brahma Muhurta)",
    timeIcon: "🌄",
    mood: "Serious, Majestic, Spiritual, Tranquil",
    season: "Winter / All Seasons",
    description: "Bhairav is a majestic morning Raag associated with Lord Shiva. The oscillatory komal Re and komal Dha create an awe-inspiring, meditative, and profoundly spiritual aura.",
    intervals: [0, 1, 4, 5, 7, 8, 11],
    sargam:    ["Sa", "Re♭", "Ga", "Ma", "Pa", "Dha♭", "Ni"],
    vadi: "Dha♭",
    samvadi: "Re♭",
    arohiSargam:  "Sa Re♭ Ga Ma Pa Dha♭ Ni Sa'",
    avrohiSargam: "Sa' Ni Dha♭ Pa Ma Ga Re♭ Sa",
    // Exact chord palette matching PDF page 2 for C#
    csharpChords: ["C#", "C#sus4", "D", "Dm", "Ddim", "F", "Fm", "F#m", "F#dim", "F#sus2"],
    color: "#2980B9",
    colorLight: "#AED6F1"
  },

  "Darbari Kanada": {
    name: "Raag Darbari Kanada",
    hindiName: "दरबारी कानड़ा",
    thaat: "Asavari",
    time: "Late Night (Midnight onwards)",
    timeIcon: "🌙",
    mood: "Royal, Majestic, Serious, Pathos",
    season: "All Seasons",
    description: "Darbari Kanada was composed by Miyan Tansen for the court of Emperor Akbar. It exudes royal gravity, profound sorrow, and immense dignity with deep gamak on Ga and Dha.",
    intervals: [0, 2, 3, 5, 7, 8, 10],
    sargam:    ["Sa", "Re", "Ga♭", "Ma", "Pa", "Dha♭", "Ni♭"],
    vadi: "Re",
    samvadi: "Pa",
    arohiSargam:  "Sa Re Ga♭ Ma Pa Dha♭ Ni♭ Sa'",
    avrohiSargam: "Sa' Ni♭ Dha♭ Pa Ma Ga♭ Re Sa",
    // Exact chord palette matching PDF page 3 for C#
    csharpChords: ["C#m", "C#sus2", "C#sus4", "D#dim", "E", "Esus2", "Esus4", "F#m", "F#sus2", "F#sus4", "G#m", "G#sus4", "A", "Asus2", "B", "Bsus2", "Bsus4"],
    color: "#8E44AD",
    colorLight: "#D2B4DE"
  },

  "Shivaranjani": {
    name: "Raag Shivaranjani",
    hindiName: "शिवरंजनी",
    thaat: "Kafi",
    time: "Late Night / Midnight",
    timeIcon: "🌌",
    mood: "Deep Melancholy, Yearning, Pathos, Devotion",
    season: "All Seasons",
    description: "Shivaranjani is a famous pentatonic (Audav) Raag with an intensely poignant character. Its komal Ga lends an unmistakable touching sadness, making it one of the most expressive melodies.",
    intervals: [0, 2, 3, 7, 9],
    sargam:    ["Sa", "Re", "Ga♭", "Pa", "Dha"],
    vadi: "Pa",
    samvadi: "Sa",
    arohiSargam:  "Sa Re Ga♭ Pa Dha Sa'",
    avrohiSargam: "Sa' Dha Pa Ga♭ Re Sa",
    // Exact chord palette matching PDF page 4 for C#
    csharpChords: ["C#m", "C#sus2", "D#sus4", "G#sus2", "G#sus4", "A#dim"],
    color: "#16A085",
    colorLight: "#A3E4D7"
  },

  "Puriya Dhanashri": {
    name: "Raag Puriya Dhanashri",
    hindiName: "पूरिया धनाश्री",
    thaat: "Poorvi",
    time: "Sunset (Sandhiprakash)",
    timeIcon: "🌇",
    mood: "Devotion, Yearning, Mysticism, Sunset Serenity",
    season: "All Seasons",
    description: "Puriya Dhanashri is an iconic twilight (Sandhiprakash) Raag. Combining komal Re, tivra Ma, and komal Dha, it captures the poignant, transformative magic of the sunset transition.",
    intervals: [0, 1, 4, 6, 7, 8, 11],
    sargam:    ["Sa", "Re♭", "Ga", "Ma#", "Pa", "Dha♭", "Ni"],
    vadi: "Pa",
    samvadi: "Re♭",
    arohiSargam:  "Sa Re♭ Ga Ma# Pa Dha♭ Ni Sa'",
    avrohiSargam: "Sa' Ni Dha♭ Pa Ma# Ga Re♭ Sa",
    // Exact chord palette matching PDF page 5 for C#
    csharpChords: ["C#", "Dm", "Ddim", "Dsus4", "F", "Fm", "Fsus2", "Gsus2", "Gsus4", "Csus2", "Csus4"],
    color: "#D35400",
    colorLight: "#EDBB99"
  },

  "Hansdhwani": {
    name: "Raag Hansdhwani",
    hindiName: "हंसध्वनि",
    thaat: "Bilawal / Shankarabharanam",
    time: "Evening / Night",
    timeIcon: "🌆",
    mood: "Auspiciousness, Brightness, Joy, Celebration",
    season: "All Seasons",
    description: "Hansdhwani ('Sound of the Swan') originated in Carnatic music and was adopted into Hindustani classical. Pentatonic without Ma and Dha, its pure notes bring immense joy and auspicious energy.",
    intervals: [0, 2, 4, 7, 11],
    sargam:    ["Sa", "Re", "Ga", "Pa", "Ni"],
    vadi: "Sa",
    samvadi: "Pa",
    arohiSargam:  "Sa Re Ga Pa Ni Sa'",
    avrohiSargam: "Sa' Ni Pa Ga Re Sa",
    // Exact chord palette matching PDF page 6 for C#
    csharpChords: ["C#", "C#sus2", "Fm", "G#", "G#sus4"],
    color: "#27AE60",
    colorLight: "#A9DFBF"
  },

  "Bhairavi": {
    name: "Raag Bhairavi",
    hindiName: "भैरवी",
    thaat: "Bhairavi",
    time: "Morning / Concert Finale",
    timeIcon: "🌅",
    mood: "Devotion, Melancholy, Pathos, Surrender",
    season: "All Seasons",
    description: "Bhairavi is the 'Queen of Raags', all four flat notes (Re♭, Ga♭, Dha♭, Ni♭) give it unmatched emotional depth. Traditionally played as the concluding piece of any classical gathering.",
    intervals: [0, 1, 3, 5, 7, 8, 10],
    sargam:    ["Sa", "Re♭", "Ga♭", "Ma", "Pa", "Dha♭", "Ni♭"],
    vadi: "Ma",
    samvadi: "Sa",
    arohiSargam:  "Sa Re♭ Ga♭ Ma Pa Dha♭ Ni♭ Sa'",
    avrohiSargam: "Sa' Ni♭ Dha♭ Pa Ma Ga♭ Re♭ Sa",
    // Exact chord palette matching PDF page 7 for C#
    csharpChords: ["C#m", "C#sus4", "D", "Dsus2", "E", "Esus2", "Esus4", "F#m", "F#sus2", "F#sus4", "G#dim", "A", "Asus2", "Asus4", "Bm", "Bsus2", "Bsus4"],
    color: "#9B59B6",
    colorLight: "#D2B4DE"
  },

  "Bhoopali": {
    name: "Raag Bhoopali",
    hindiName: "भूपाली",
    thaat: "Kalyan",
    time: "First part of the night",
    timeIcon: "🌙",
    mood: "Peace, Devotion, Serenity, Warmth",
    season: "All Seasons",
    description: "Bhoopali (Bhoop) is a celebrated pentatonic Raag utilizing all natural notes (Sa, Re, Ga, Pa, Dha). It conveys sublime peace, majestic calm, and sweet devotion.",
    intervals: [0, 2, 4, 7, 9],
    sargam:    ["Sa", "Re", "Ga", "Pa", "Dha"],
    vadi: "Ga",
    samvadi: "Dha",
    arohiSargam:  "Sa Re Ga Pa Dha Sa'",
    avrohiSargam: "Sa' Dha Pa Ga Re Sa",
    // Exact chord palette matching PDF page 8 for C#
    csharpChords: ["C#", "C#sus2", "D#sus2", "D#sus4", "G#sus2", "G#sus4", "A#m", "A#sus4"],
    color: "#F39C12",
    colorLight: "#FDEBD0"
  },

  "Khamaj": {
    name: "Raag Khamaj",
    hindiName: "खमाज",
    thaat: "Khamaj",
    time: "Late Night",
    timeIcon: "🌃",
    mood: "Romance, Playfulness, Sensuality, Joy",
    season: "All Seasons",
    description: "Khamaj is a delightful and romantic night Raag widely used in Thumri and ghazals. Its komal Ni on descent lends a sweet, seductive touch.",
    intervals: [0, 2, 4, 5, 7, 9, 10],
    sargam:    ["Sa", "Re", "Ga", "Ma", "Pa", "Dha", "Ni♭"],
    vadi: "Ga",
    samvadi: "Ni♭",
    arohiSargam:  "Sa Ga Ma Pa Dha Ni Sa'",
    avrohiSargam: "Sa' Ni♭ Dha Pa Ma Ga Re Sa",
    color: "#E74C3C",
    colorLight: "#FADBD8"
  },

  "Kafi": {
    name: "Raag Kafi",
    hindiName: "काफी",
    thaat: "Kafi",
    time: "Midnight",
    timeIcon: "🌌",
    mood: "Spring Romance, Longing, Folk Warmth",
    season: "Spring (Holi)",
    description: "Kafi is closely associated with Holi celebrations and folk melodies of northern India. The komal Ga and Ni create an affectionate, emotional mood.",
    intervals: [0, 2, 3, 5, 7, 9, 10],
    sargam:    ["Sa", "Re", "Ga♭", "Ma", "Pa", "Dha", "Ni♭"],
    vadi: "Pa",
    samvadi: "Sa",
    arohiSargam:  "Sa Re Ga♭ Ma Pa Dha Ni♭ Sa'",
    avrohiSargam: "Sa' Ni♭ Dha Pa Ma Ga♭ Re Sa",
    color: "#2ECC71",
    colorLight: "#A9DFBF"
  },

  "Bageshri": {
    name: "Raag Bageshri",
    hindiName: "बागेश्री",
    thaat: "Kafi",
    time: "Late Night",
    timeIcon: "🌃",
    mood: "Longing for Beloved, Waiting, Deep Love",
    season: "Rainy Season",
    description: "Bageshri is an emotionally charged night melody capturing the bittersweet ache of waiting for one's beloved in the rain.",
    intervals: [0, 2, 3, 5, 7, 9, 10],
    sargam:    ["Sa", "Re", "Ga♭", "Ma", "Pa", "Dha", "Ni♭"],
    vadi: "Ma",
    samvadi: "Sa",
    arohiSargam:  "Sa Re Ga♭ Ma Pa Dha Ni♭ Sa'",
    avrohiSargam: "Sa' Ni♭ Dha Pa Ma Ga♭ Re Sa",
    color: "#1ABC9C",
    colorLight: "#A2D9CE"
  },

  "Bhimpalasi": {
    name: "Raag Bhimpalasi",
    hindiName: "भीमपलासी",
    thaat: "Kafi",
    time: "Late Afternoon (Tritiya Pahar)",
    timeIcon: "☀️",
    mood: "Tender Romance, Devotion, Yearning",
    season: "All Seasons",
    description: "Bhimpalasi is one of the most popular classical Raags in India. It brings a deep, tender warmth to afternoon hours with komal Ga and komal Ni.",
    intervals: [0, 2, 3, 5, 7, 9, 10],
    sargam:    ["Sa", "Re", "Ga♭", "Ma", "Pa", "Dha", "Ni♭"],
    vadi: "Ma",
    samvadi: "Sa",
    arohiSargam:  "Sa Ga♭ Ma Pa Ni♭ Sa'",
    avrohiSargam: "Sa' Ni♭ Dha Pa Ma Ga♭ Re Sa",
    color: "#E91E63",
    colorLight: "#F8BBD9"
  },

  "Malkauns": {
    name: "Raag Malkauns",
    hindiName: "मालकौंस",
    thaat: "Bhairavi",
    time: "Midnight to 3 AM",
    timeIcon: "🌌",
    mood: "Valour, Mysticism, Awe, Intense Meditation",
    season: "All Seasons",
    description: "Malkauns is an ancient, potent pentatonic Raag (Sa, Ga♭, Ma, Dha♭, Ni♭) created by Lord Shiva. Dark, hypnotic, and immensely powerful.",
    intervals: [0, 3, 5, 8, 10],
    sargam:    ["Sa", "Ga♭", "Ma", "Dha♭", "Ni♭"],
    vadi: "Ma",
    samvadi: "Sa",
    arohiSargam:  "Sa Ga♭ Ma Dha♭ Ni♭ Sa'",
    avrohiSargam: "Sa' Ni♭ Dha♭ Ma Ga♭ Sa",
    color: "#4A235A",
    colorLight: "#D2B4DE"
  },

  "Bilawal": {
    name: "Raag Bilawal",
    hindiName: "बिलावल",
    thaat: "Bilawal",
    time: "Morning (First Pahar)",
    timeIcon: "🌅",
    mood: "Joy, Freshness, Splendor, Optimism",
    season: "All Seasons",
    description: "Alhaiya Bilawal uses all natural (shuddha) notes matching the Western major scale. It evokes the fresh, radiant optimism and vitality of early morning.",
    intervals: [0, 2, 4, 5, 7, 9, 11],
    sargam:    ["Sa", "Re", "Ga", "Ma", "Pa", "Dha", "Ni"],
    vadi: "Dha",
    samvadi: "Ga",
    arohiSargam:  "Sa Re Ga Pa Dha Ni Sa'",
    avrohiSargam: "Sa' Ni Dha Pa Ma Ga Re Sa",
    color: "#3498DB",
    colorLight: "#AED6F1"
  },

  "Marwa": {
    name: "Raag Marwa",
    hindiName: "मारवा",
    thaat: "Marwa",
    time: "Sunset (Sandhiprakash)",
    timeIcon: "🌇",
    mood: "Anxiety, Restlessness, Sunset Tension, Depth",
    season: "All Seasons",
    description: "Marwa is a profound sunset Raag omitting Pa entirely. The tension between komal Re and tivra Ma creates an unsettling, deeply contemplative twilight mood.",
    intervals: [0, 1, 4, 6, 9, 11],
    sargam:    ["Sa", "Re♭", "Ga", "Ma#", "Dha", "Ni"],
    vadi: "Dha",
    samvadi: "Re♭",
    arohiSargam:  "Sa Re♭ Ga Ma# Dha Ni Sa'",
    avrohiSargam: "Sa' Ni Dha Ma# Ga Re♭ Sa",
    color: "#9C27B0",
    colorLight: "#E1BEE7"
  },

  "Kedar": {
    name: "Raag Kedar",
    hindiName: "केदार",
    thaat: "Kalyan",
    time: "First part of the night",
    timeIcon: "🌙",
    mood: "Devotion, Serenity, Peace, Transcendence",
    season: "Rainy Season / All",
    description: "Kedar is a devotional night Raag dedicated to Lord Shiva. It uses both shuddha Ma and tivra Ma, lending a soothing and deeply spiritual serenity.",
    intervals: [0, 5, 6, 7, 9, 11],
    sargam:    ["Sa", "Ma", "Ma#", "Pa", "Dha", "Ni"],
    vadi: "Ma",
    samvadi: "Sa",
    arohiSargam:  "Sa Ma Ma# Pa Ni Dha Ni Sa'",
    avrohiSargam: "Sa' Ni Dha Pa Ma# Ma Ga Re Sa",
    color: "#009688",
    colorLight: "#B2DFDB"
  },

  "Todi": {
    name: "Raag Todi",
    hindiName: "तोड़ी",
    thaat: "Todi",
    time: "Late Morning",
    timeIcon: "☀️",
    mood: "Intense Pathos, Melancholy, Devotional Anguish",
    season: "All Seasons",
    description: "Miyan ki Todi (created by Tansen) is one of the most emotionally heavy and respected classical Raags. Komal Re, komal Ga, and tivra Ma evoke deep yearning.",
    intervals: [0, 1, 3, 6, 7, 8, 11],
    sargam:    ["Sa", "Re♭", "Ga♭", "Ma#", "Pa", "Dha♭", "Ni"],
    vadi: "Dha♭",
    samvadi: "Ga♭",
    arohiSargam:  "Sa Re♭ Ga♭ Ma# Pa Dha♭ Ni Sa'",
    avrohiSargam: "Sa' Ni Dha♭ Pa Ma# Ga♭ Re♭ Sa",
    color: "#C0392B",
    colorLight: "#FADBD8"
  },

  "Des": {
    name: "Raag Des",
    hindiName: "देस",
    thaat: "Khamaj",
    time: "Late Night / Rain",
    timeIcon: "🌧️",
    mood: "Patriotism, Sweet Romance, Devotion, Joy",
    season: "Rainy Season",
    description: "Des is a melodic, sweet Raag widely celebrated in devotional, patriotic ('Vande Mataram'), and romantic folk music. Uses both komal and shuddha Ni.",
    intervals: [0, 2, 4, 5, 7, 9, 10],
    sargam:    ["Sa", "Re", "Ga", "Ma", "Pa", "Dha", "Ni♭"],
    vadi: "Pa",
    samvadi: "Sa",
    arohiSargam:  "Sa Re Ma Pa Ni Sa'",
    avrohiSargam: "Sa' Ni♭ Dha Pa Ma Ga Re Sa",
    color: "#FF9800",
    colorLight: "#FFE0B2"
  }
};

// Aliases
RAAGS_DB["Darbari"] = RAAGS_DB["Darbari Kanada"];
RAAGS_DB["Bhoop"] = RAAGS_DB["Bhoopali"];
RAAGS_DB["Alhaiya Bilawal"] = RAAGS_DB["Bilawal"];

// Expose globally
window.RAAGS_DB = RAAGS_DB;
