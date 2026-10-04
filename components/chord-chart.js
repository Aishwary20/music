// ============================================================
//  CHORD CHART COMPONENT — Raag & Scale Explorer
//  Renders mini piano-style chord diagrams for each chord
//  using sharp naming (matching the PDF notation).
// ============================================================

class ChordChart {
  static NOTE_TO_SEMITONE = {
    'C':0,'C#':1,'Db':1,'D':2,'D#':3,'Eb':3,'E':4,
    'F':5,'F#':6,'Gb':6,'G':7,'G#':8,'Ab':8,
    'A':9,'A#':10,'Bb':10,'B':11
  };
  static NOTE_NAMES_SHARP = ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];

  // Chord intervals: semitones from root
  static CHORD_INTERVALS = {
    '':    [0,4,7],        // major
    'm':   [0,3,7],        // minor
    'maj7':[0,4,7,11],     // major 7
    'm7':  [0,3,7,10],     // minor 7
    '7':   [0,4,7,10],     // dominant 7
    'dim': [0,3,6],        // diminished
    'aug': [0,4,8],        // augmented
    'sus2':[0,2,7],        // suspended 2
    'sus4':[0,5,7],        // suspended 4
    'add9':[0,4,7,14],     // add9
    'm9':  [0,3,7,10,14],  // minor 9
    'maj9':[0,4,7,11,14],  // major 9
    '6':   [0,4,7,9],      // major 6
    'm6':  [0,3,7,9],      // minor 6
    '9':   [0,4,7,10,14],  // dominant 9
    'dim7':[0,3,6,9],      // diminished 7
    'm7b5':[0,3,6,10],     // half-diminished
  };

  constructor(container) {
    this.container = container;
  }

  // ── Parsing ─────────────────────────────────────────────
  parseChordName(chordName) {
    const match = chordName.match(/^([A-G][#b]?)(.*)/);
    if (!match) return { root: 0, type: '', name: chordName };

    const rootName = match[1];
    const type     = match[2].trim();
    const root     = ChordChart.NOTE_TO_SEMITONE[rootName] ?? 0;
    return { root, type, rootName };
  }

  getChordNotes(chordName, transposeSemitones = 0) {
    const { root, type } = this.parseChordName(chordName);
    const intervals = ChordChart.CHORD_INTERVALS[type] ?? [0,4,7];
    return intervals.map(i => (root + i + transposeSemitones + 1200) % 12);
  }

  transposeChordName(chordName, semitones) {
    if (!semitones) return chordName;
    const { root, type } = this.parseChordName(chordName);
    const newRoot = ChordChart.NOTE_NAMES_SHARP[(root + semitones + 1200) % 12];
    return newRoot + type;
  }

  // ── Rendering ───────────────────────────────────────────
  render(chords, transposeSemitones = 0) {
    this.container.innerHTML = '';

    if (!chords || chords.length === 0) {
      this.container.innerHTML = '<p class="no-data">No specific chord progression found for this song.</p>';
      return;
    }

    const grid = document.createElement('div');
    grid.className = 'chord-grid';

    chords.forEach(chordName => {
      const card = this._buildChordCard(chordName, transposeSemitones);
      grid.appendChild(card);
    });

    this.container.appendChild(grid);
  }

  _buildChordCard(chordName, transposeSemitones) {
    const displayName = this.transposeChordName(chordName, transposeSemitones);
    const notes       = this.getChordNotes(chordName, transposeSemitones);
    const { type }    = this.parseChordName(displayName);

    const typeLabel = {
      '':    'Major', 'm': 'Minor', 'maj7': 'Major 7',
      'm7':  'Minor 7', '7': 'Dom 7', 'dim': 'Diminished',
      'aug': 'Augmented', 'sus4': 'Sus4', 'sus2': 'Sus2',
    }[type] ?? type;

    const card = document.createElement('div');
    card.className = 'chord-card';

    const svg = this._buildMiniPiano(notes);

    card.innerHTML = `
      <div class="chord-header">
        <span class="chord-name-label">${displayName}</span>
        <span class="chord-type-label">${typeLabel}</span>
      </div>
      ${svg}
      <div class="chord-notes-row">
        ${notes.map(n => `<span class="chord-note-pill">${ChordChart.NOTE_NAMES_SHARP[n]}</span>`).join('')}
      </div>`;

    return card;
  }

  _buildMiniPiano(highlightedNotes) {
    const ww = 18, wh = 56, bw = 11, bh = 35;
    const WHITE_SEMI = [0,2,4,5,7,9,11];
    const BLACK_SEMI = [1,3,6,8,10];
    const BLACK_OFF  = [0.6,1.6,3.6,4.6,5.6];
    const svgW = 7 * ww + 1;

    let whiteRects = '';
    for (let i = 0; i < 7; i++) {
      const note = WHITE_SEMI[i];
      const isH  = highlightedNotes.includes(note);
      const isR  = note === highlightedNotes[0];
      const fill = isR ? '#E04A2F' : isH ? '#F5B041' : '#FAFAFA';
      const name = ChordChart.NOTE_NAMES_SHARP[note];
      whiteRects += `<rect x="${i * ww + 0.5}" y="0.5"
        width="${ww - 1}" height="${wh}"
        fill="${fill}" stroke="#444" stroke-width="0.8" rx="2"
        aria-label="${name}"/>`;
    }

    let blackRects = '';
    for (let i = 0; i < 5; i++) {
      const note = BLACK_SEMI[i];
      const isH  = highlightedNotes.includes(note);
      const isR  = note === highlightedNotes[0];
      const fill = isR ? '#E04A2F' : isH ? '#E67E22' : '#1a1a1a';
      const cx   = BLACK_OFF[i] * ww;
      const x    = cx - bw / 2;
      blackRects += `<rect x="${x.toFixed(1)}" y="0.5"
        width="${bw}" height="${bh}"
        fill="${fill}" stroke="#000" stroke-width="0.6" rx="1.5"/>`;
    }

    return `<svg class="mini-piano-svg" width="${svgW}" height="${wh + 2}"
      viewBox="0 0 ${svgW} ${wh + 2}" xmlns="http://www.w3.org/2000/svg"
      role="img" aria-label="Piano chord diagram">
      <g>${whiteRects}</g>
      <g>${blackRects}</g>
    </svg>`;
  }
}

window.ChordChart = ChordChart;
