// ============================================================
//  PIANO COMPONENT — Raag & Scale Explorer
//  Matches PDF visual design:
//  - Scale: Sa note in Red (#E04A2F), Raag notes in Amber (#E68A2E)
//  - Non-raag white keys show note name in light gray
//  - Non-raag black keys in dark black
//  - Shows Aaroh, Avroh, PDF-style chord pills, and footnote
//  - Interactive Web Audio sound synthesis
// ============================================================

class PianoRenderer {
  static SHARP_NAMES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

  // Base MIDI numbers starting around middle register (C4 = 60)
  static NOTE_MIDI = {
    'C': 60, 'C#': 61, 'D': 62, 'D#': 63, 'E': 64, 'F': 65,
    'F#': 66, 'G': 67, 'G#': 68, 'A': 69, 'A#': 70, 'B': 71
  };

  constructor(container) {
    this.container = container;
    this.audioCtx = null;
  }

  /**
   * Render the PDF-style piano diagram and notes/chords
   * @param {Object} raag - Raag entry from RAAGS_DB
   * @param {string} scaleNote - e.g. "C#", "D", "C", "G"
   */
  render(raag, scaleNote = "C#") {
    if (!raag) return;
    this.raag = raag;
    this.scaleNote = scaleNote;

    const rootSemi = PianoRenderer.SHARP_NAMES.indexOf(scaleNote);
    const safeRoot = rootSemi >= 0 ? rootSemi : 1; // default C#

    // Calculate the scale notes (in sharps)
    const intervals = raag.intervals || [0, 2, 4, 6, 7, 9, 11];
    const scaleNotesSet = new Set();
    const scaleNoteNames = [];

    intervals.forEach(interval => {
      const noteIdx = (safeRoot + interval) % 12;
      scaleNotesSet.add(noteIdx);
      scaleNoteNames.push(PianoRenderer.SHARP_NAMES[noteIdx]);
    });

    // Derive Aaroh and Avroh strings using sharp names
    const aarohNotes = scaleNoteNames.concat([scaleNote + "'"]);
    const avrohNotes = [scaleNote + "'"].concat([...scaleNoteNames].slice(1).reverse()).concat([scaleNote]);

    // Derive or fetch chords
    const chordsList = this._getChordsForRaag(raag, scaleNote, scaleNotesSet);

    // Build the Piano SVG
    const pianoSvgHtml = this._buildPianoSvg(safeRoot, scaleNotesSet, scaleNote);

    // Construct the complete PDF-style component card
    this.container.innerHTML = `
      <div class="pdf-piano-card">
        <!-- Scale indicator -->
        <div class="pdf-card-header">
          <div class="pdf-raag-title">${raag.name || 'Raag'}</div>
          <div class="pdf-scale-subtitle">Scale: <strong>${scaleNote}</strong> (Sa = ${scaleNote})</div>
        </div>

        <!-- Piano Diagram SVG -->
        <div class="pdf-piano-frame">
          ${pianoSvgHtml}
        </div>

        <!-- Notes (Aaroh / Avroh) -->
        <div class="pdf-notes-section">
          <div class="pdf-notes-row">
            <span class="pdf-notes-label">Notes:</span>
            <div class="pdf-notes-content">
              <div class="pdf-aaroh-line"><span class="pdf-flow-tag">Aaroh</span> ${aarohNotes.join('  ')}</div>
              <div class="pdf-avroh-line"><span class="pdf-flow-tag">Avroh</span> ${avrohNotes.join('  ')}</div>
            </div>
          </div>
        </div>

        <!-- Chords Section -->
        <div class="pdf-chords-section">
          <div class="pdf-chords-row">
            <span class="pdf-chords-label">Chords:</span>
            <div class="pdf-chords-pills" role="group" aria-label="Raag chords">
              ${chordsList.map(chord => `
                <button class="pdf-chord-pill" data-chord="${chord}" title="Play ${chord} chord">
                  ${chord}
                </button>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- PDF Footnote -->
        <div class="pdf-footnote">
          ${scaleNote} scale. Notes use piano key names (sharps). <span class="fn-red">Red = Sa (${scaleNote})</span>, <span class="fn-amber">amber = raag notes</span>. Click keys or chords to hear sound.
        </div>
      </div>
    `;

    this._attachAudioEvents();
  }

  // ── Build SVG Piano Diagram ──────────────────────────────
  _buildPianoSvg(safeRoot, scaleNotesSet, scaleNote) {
    // When scale is C# (universal PDF page 1-8 format), produce the exact PDF geometry:
    if (scaleNote === 'C#') {
      return this._buildCsharpPdfLayout(scaleNotesSet);
    } else {
      // General layout for any other scale (C, D, etc.)
      return this._buildGenericScaleLayout(safeRoot, scaleNotesSet, scaleNote);
    }
  }

  /**
   * Exact layout matching PDF pages 1 to 8:
   * Width: 880, Height: 240
   * 7 white keys: D, E, F, G, A, B, C
   * Left & right columns under C# and C#'
   * 6 black keys: C# (left), D#, F#, G#, A#, C#' (right)
   */
  _buildCsharpPdfLayout(scaleNotesSet) {
    const W = 880;
    const H = 240;
    const blackH = 145;
    const blackW = 58;

    // White key specifications:
    // Left boundary, key column for D, E, F, G, A, B, C, right boundary
    // Total width across 7 full white keys + 2 border halves:
    // Let's divide W cleanly into 8 units:
    const unitW = W / 8; // 110px each

    // White keys definition
    // Columns:
    // 0: Left end white base (under C#)
    // 1: D  (semitone 2)
    // 2: E  (semitone 4)
    // 3: F  (semitone 5)
    // 4: G  (semitone 7)
    // 5: A  (semitone 9)
    // 6: B  (semitone 11)
    // 7: C  (semitone 0)
    // and right end space under C#'

    const whiteKeyDefs = [
      { name: '',  semi: null, x: 0,              w: unitW * 0.5 },
      { name: 'D', semi: 2,    x: unitW * 0.5,     w: unitW },
      { name: 'E', semi: 4,    x: unitW * 1.5,     w: unitW },
      { name: 'F', semi: 5,    x: unitW * 2.5,     w: unitW },
      { name: 'G', semi: 7,    x: unitW * 3.5,     w: unitW },
      { name: 'A', semi: 9,    x: unitW * 4.5,     w: unitW },
      { name: 'B', semi: 11,   x: unitW * 5.5,     w: unitW },
      { name: 'C', semi: 0,    x: unitW * 6.5,     w: unitW },
      { name: '',  semi: null, x: unitW * 7.5,     w: unitW * 0.5 }
    ];

    let whiteSvg = '';
    whiteKeyDefs.forEach((k) => {
      if (k.semi === null) {
        // Edge white margin under C# and C#'
        whiteSvg += `
          <rect x="${k.x}" y="0" width="${k.w}" height="${H}"
                fill="#FFFFFF" stroke="#222222" stroke-width="2"/>
        `;
        return;
      }

      const inRaag = scaleNotesSet.has(k.semi);
      const isSa = k.semi === 1; // Sa is C# (which is black)
      const fill = inRaag ? '#F5B041' : '#FFFFFF';
      const textColor = inRaag ? '#1A1A1A' : '#999999';
      const fontWeight = inRaag ? 'bold' : 'normal';

      whiteSvg += `
        <g class="piano-key-group white" data-note="${k.name}" data-semi="${k.semi}">
          <rect x="${k.x}" y="0" width="${k.w}" height="${H}"
                fill="${fill}" stroke="#222222" stroke-width="2" class="piano-key-rect"/>
          <text x="${k.x + k.w / 2}" y="${H - 26}"
                text-anchor="middle" font-size="19" font-family="'Inter', sans-serif"
                font-weight="${fontWeight}" fill="${textColor}" pointer-events="none">
            ${k.name}
          </text>
        </g>
      `;
    });

    // Black keys definition:
    // C# (at left edge), D#, F#, G#, A#, C#' (at right edge)
    const blackKeyDefs = [
      { name: 'C#',  semi: 1,  x: 0,                          w: blackW, isSa: true },
      { name: 'D#',  semi: 3,  x: unitW * 1.5 - blackW / 2,   w: blackW, isSa: false },
      { name: 'F#',  semi: 6,  x: unitW * 3.5 - blackW / 2,   w: blackW, isSa: false },
      { name: 'G#',  semi: 8,  x: unitW * 4.5 - blackW / 2,   w: blackW, isSa: false },
      { name: 'A#',  semi: 10, x: unitW * 5.5 - blackW / 2,   w: blackW, isSa: false },
      { name: "C#'", semi: 13, x: W - blackW,                 w: blackW, isSa: true }
    ];

    let blackSvg = '';
    blackKeyDefs.forEach((k) => {
      const normalizedSemi = k.semi % 12;
      const inRaag = scaleNotesSet.has(normalizedSemi);
      let fill = '#1A1A1A';
      let textColor = '#FFFFFF';
      let hasLabel = false;

      if (k.isSa) {
        fill = '#E04A2F'; // Red for Sa
        hasLabel = true;
      } else if (inRaag) {
        fill = '#E67E22'; // Amber for Raag note
        hasLabel = true;
      }

      blackSvg += `
        <g class="piano-key-group black" data-note="${k.name.replace("'", "")}" data-semi="${normalizedSemi}">
          <rect x="${k.x}" y="0" width="${k.w}" height="${blackH}"
                fill="${fill}" stroke="#222222" stroke-width="2" class="piano-key-rect"/>
          ${hasLabel ? `
            <text x="${k.x + k.w / 2}" y="${blackH - 20}"
                  text-anchor="middle" font-size="16" font-family="'Inter', sans-serif"
                  font-weight="bold" fill="${textColor}" pointer-events="none">
              ${k.name}
            </text>
          ` : ''}
        </g>
      `;
    });

    return `
      <svg class="pdf-piano-svg" viewBox="0 0 ${W} ${H}" width="100%" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${W}" height="${H}" fill="#FFFFFF" stroke="#222222" stroke-width="3"/>
        <g class="white-keys-layer">${whiteSvg}</g>
        <g class="black-keys-layer">${blackSvg}</g>
      </svg>
    `;
  }

  /**
   * Generic Scale Layout (e.g. when user chooses C, D, G, etc.)
   * Renders a full octave span from Sa to Sa'
   */
  _buildGenericScaleLayout(safeRoot, scaleNotesSet, scaleNote) {
    const W = 880;
    const H = 240;
    const blackH = 145;
    const blackW = 54;

    // Standard 12-TET white notes
    const WHITE_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];
    const WHITE_SEMI  = [0, 2, 4, 5, 7, 9, 11];

    // Find all white keys in the span (about 8 keys)
    const whiteKeys = [];
    for (let s = safeRoot; s <= safeRoot + 12; s++) {
      const semi = s % 12;
      const noteName = PianoRenderer.SHARP_NAMES[semi];
      if (WHITE_NOTES.includes(noteName)) {
        whiteKeys.push({ semi, name: noteName, isOctave: s === safeRoot + 12 });
      }
    }

    const numWhite = whiteKeys.length;
    const unitW = W / numWhite;

    let whiteSvg = '';
    whiteKeys.forEach((k, i) => {
      const isSa = k.semi === safeRoot;
      const inRaag = scaleNotesSet.has(k.semi);
      const fill = isSa ? '#E04A2F' : inRaag ? '#F5B041' : '#FFFFFF';
      const textColor = isSa ? '#FFFFFF' : inRaag ? '#1A1A1A' : '#999999';
      const x = i * unitW;

      whiteSvg += `
        <g class="piano-key-group white" data-note="${k.name}" data-semi="${k.semi}">
          <rect x="${x}" y="0" width="${unitW}" height="${H}"
                fill="${fill}" stroke="#222222" stroke-width="2" class="piano-key-rect"/>
          <text x="${x + unitW / 2}" y="${H - 26}"
                text-anchor="middle" font-size="18" font-family="'Inter', sans-serif"
                font-weight="${inRaag || isSa ? 'bold' : 'normal'}" fill="${textColor}" pointer-events="none">
            ${k.name}${k.isOctave ? "'" : ''}
          </text>
        </g>
      `;
    });

    // Black keys in the span
    let blackSvg = '';
    for (let s = safeRoot; s <= safeRoot + 12; s++) {
      const semi = s % 12;
      const noteName = PianoRenderer.SHARP_NAMES[semi];
      if (!WHITE_NOTES.includes(noteName)) {
        // Find which white key boundary this black key sits on
        const whiteIdx = whiteKeys.findIndex(wk => wk.semi === (semi - 1 + 12) % 12);
        if (whiteIdx >= 0) {
          const x = (whiteIdx + 1) * unitW - blackW / 2;
          const isSa = semi === safeRoot;
          const inRaag = scaleNotesSet.has(semi);
          const isOctave = s === safeRoot + 12;

          let fill = '#1A1A1A';
          let textColor = '#FFFFFF';
          let hasLabel = false;

          if (isSa) {
            fill = '#E04A2F';
            hasLabel = true;
          } else if (inRaag) {
            fill = '#E67E22';
            hasLabel = true;
          }

          blackSvg += `
            <g class="piano-key-group black" data-note="${noteName}" data-semi="${semi}">
              <rect x="${x}" y="0" width="${blackW}" height="${blackH}"
                    fill="${fill}" stroke="#222222" stroke-width="2" class="piano-key-rect"/>
              ${hasLabel ? `
                <text x="${x + blackW / 2}" y="${blackH - 20}"
                      text-anchor="middle" font-size="15" font-family="'Inter', sans-serif"
                      font-weight="bold" fill="${textColor}" pointer-events="none">
                  ${noteName}${isOctave ? "'" : ''}
                </text>
              ` : ''}
            </g>
          `;
        }
      }
    }

    return `
      <svg class="pdf-piano-svg" viewBox="0 0 ${W} ${H}" width="100%" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="0" width="${W}" height="${H}" fill="#FFFFFF" stroke="#222222" stroke-width="3"/>
        <g class="white-keys-layer">${whiteSvg}</g>
        <g class="black-keys-layer">${blackSvg}</g>
      </svg>
    `;
  }

  // ── Derive Raag Chords ───────────────────────────────────
  _getChordsForRaag(raag, scaleNote, scaleNotesSet) {
    // If scale is C# and predefined in raags.js (matching PDF 100%):
    if (scaleNote === 'C#' && raag.csharpChords) {
      return raag.csharpChords;
    }

    // Dynamic chord generator for any scale:
    // Finds all triads & suspensions whose notes are all in the raag
    const chords = [];
    const rootIdx = PianoRenderer.SHARP_NAMES.indexOf(scaleNote);

    const CHORD_FORMULAS = [
      { suffix: '',     intervals: [0, 4, 7] }, // Major
      { suffix: 'm',    intervals: [0, 3, 7] }, // Minor
      { suffix: 'sus2', intervals: [0, 2, 7] }, // Sus2
      { suffix: 'sus4', intervals: [0, 5, 7] }, // Sus4
      { suffix: 'dim',  intervals: [0, 3, 6] }  // Diminished
    ];

    // Check each note of the scale as a potential chord root
    scaleNotesSet.forEach(noteSemi => {
      const rootName = PianoRenderer.SHARP_NAMES[noteSemi];
      CHORD_FORMULAS.forEach(f => {
        const allPresent = f.intervals.every(interval =>
          scaleNotesSet.has((noteSemi + interval) % 12)
        );
        if (allPresent) {
          chords.push(rootName + f.suffix);
        }
      });
    });

    return chords.length > 0 ? chords : (raag.csharpChords || ['C#', 'Fm', 'G#']);
  }

  // ── Audio Engine ─────────────────────────────────────────
  _getAudioCtx() {
    if (!this.audioCtx || this.audioCtx.state === 'closed') {
      this.audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (this.audioCtx.state === 'suspended') {
      this.audioCtx.resume();
    }
    return this.audioCtx;
  }

  _playNote(noteName, octave = 4) {
    try {
      const ctx = this._getAudioCtx();
      const baseMidi = PianoRenderer.NOTE_MIDI[noteName] || 60;
      const freq = 440 * Math.pow(2, (baseMidi - 69) / 12);

      const now = ctx.currentTime;
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'triangle';
      osc2.type = 'sine';
      osc1.frequency.setValueAtTime(freq, now);
      osc2.frequency.setValueAtTime(freq * 2, now); // 2nd harmonic

      const gain2 = ctx.createGain();
      gain2.gain.value = 0.2;
      osc2.connect(gain2);
      gain2.connect(gain);
      osc1.connect(gain);
      gain.connect(ctx.destination);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.5, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 1.8);

      osc1.start(now); osc1.stop(now + 1.8);
      osc2.start(now); osc2.stop(now + 1.8);
    } catch (e) {
      console.warn('Audio error:', e);
    }
  }

  _playChord(chordName) {
    // Parse chord name
    const match = chordName.match(/^([A-G][#]?)(.*)/);
    if (!match) return;
    const rootName = match[1];
    const type = match[2];

    const rootSemi = PianoRenderer.SHARP_NAMES.indexOf(rootName);
    if (rootSemi < 0) return;

    let intervals = [0, 4, 7];
    if (type === 'm')     intervals = [0, 3, 7];
    if (type === 'sus2')  intervals = [0, 2, 7];
    if (type === 'sus4')  intervals = [0, 5, 7];
    if (type === 'dim')   intervals = [0, 3, 6];
    if (type === '7')     intervals = [0, 4, 7, 10];
    if (type === 'maj7')  intervals = [0, 4, 7, 11];

    intervals.forEach((interval, i) => {
      const noteIdx = (rootSemi + interval) % 12;
      const noteName = PianoRenderer.SHARP_NAMES[noteIdx];
      setTimeout(() => this._playNote(noteName), i * 30);
    });
  }

  _attachAudioEvents() {
    // Attach click to keys
    const keys = this.container.querySelectorAll('.piano-key-group');
    keys.forEach(k => {
      k.addEventListener('click', () => {
        const note = k.dataset.note;
        if (note) this._playNote(note);
        k.classList.add('key-pressed');
        setTimeout(() => k.classList.remove('key-pressed'), 200);
      });
    });

    // Attach click to chord pills
    const pills = this.container.querySelectorAll('.pdf-chord-pill');
    pills.forEach(p => {
      p.addEventListener('click', () => {
        const chord = p.dataset.chord;
        if (chord) this._playChord(chord);
        p.classList.add('pill-active');
        setTimeout(() => p.classList.remove('pill-active'), 300);
      });
    });
  }
}

window.PianoRenderer = PianoRenderer;
