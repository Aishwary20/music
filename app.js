// ============================================================
//  MAIN APP — Raag & Scale Explorer
//  Flow:
//  1. Select Scale (Sa)
//  2. Select Raag
//  3. Display Raag Notation Diagram (PDF style)
//  4. Display All Related Chords & Voicings
// ============================================================

/* ── Chromatic Notes ──────────────────────────────────────── */
const CHROMATIC_SCALES = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];
const WHITE_NOTES = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

/* ── App State ────────────────────────────────────────────── */
const state = {
  selectedScale: 'C#',      // Default C# matching reference PDF
  selectedRaagKey: 'Yaman', // Default Raag Yaman (Page 1 of PDF)
  searchQuery: '',
  selectedThaat: null
};

/* ── Component References ─────────────────────────────────── */
let pianoRenderer = null;
let chordChartRenderer = null;

const $ = id => document.getElementById(id);

/* ══════════════════════════════════════════════════════════ */
/*  STEP 1: SCALE SELECTOR (SA)                               */
/* ══════════════════════════════════════════════════════════ */

function buildScaleSelector() {
  const container = $('scale-buttons-bar');
  if (!container) return;
  container.innerHTML = '';

  CHROMATIC_SCALES.forEach(scale => {
    const isWhite = WHITE_NOTES.includes(scale);
    const isActive = state.selectedScale === scale;

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = `scale-btn ${isWhite ? 'white-note' : 'black-note'}${isActive ? ' active' : ''}`;
    btn.setAttribute('role', 'radio');
    btn.setAttribute('aria-checked', isActive);
    btn.dataset.scale = scale;

    btn.innerHTML = `
      <span class="scale-note-text">${scale}</span>
      <span class="scale-type-sub">${isWhite ? 'White' : 'Black'}</span>
    `;

    btn.addEventListener('click', () => {
      selectScale(scale);
    });

    container.appendChild(btn);
  });
}

function selectScale(scale) {
  state.selectedScale = scale;

  // Update UI buttons
  document.querySelectorAll('.scale-btn').forEach(btn => {
    const isThis = btn.dataset.scale === scale;
    btn.classList.toggle('active', isThis);
    btn.setAttribute('aria-checked', isThis);
  });

  // Update header and badges
  $('header-scale-name').textContent = scale;
  $('voicings-scale-badge').textContent = scale;

  // Re-render notation diagram and chords
  renderCurrentRaag();
  showToast(`Scale set to ${scale} (Sa = ${scale})`);
}

/* ══════════════════════════════════════════════════════════ */
/*  STEP 2: RAAG SELECTOR                                     */
/* ══════════════════════════════════════════════════════════ */

function buildRaagList() {
  const container = $('raag-list');
  if (!container) return;

  const raagKeys = getSortedRaagKeys();
  const query = state.searchQuery.toLowerCase().trim();

  // Filter keys
  let filtered = raagKeys.filter(key => {
    const raag = RAAGS_DB[key];
    if (!raag) return false;

    // Search query match
    const matchesQuery = !query ||
      raag.name.toLowerCase().includes(query) ||
      (raag.hindiName && raag.hindiName.includes(query)) ||
      (raag.thaat && raag.thaat.toLowerCase().includes(query)) ||
      (raag.mood && raag.mood.toLowerCase().includes(query));

    // Thaat filter match
    const matchesThaat = !state.selectedThaat ||
      (raag.thaat && raag.thaat.toLowerCase().includes(state.selectedThaat.toLowerCase()));

    return matchesQuery && matchesThaat;
  });

  $('raag-count').textContent = `${filtered.length} Raag${filtered.length !== 1 ? 's' : ''}`;

  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-raags">
        <span class="empty-icon">🔍</span>
        <p>No Raags found matching "${state.searchQuery}".</p>
      </div>`;
    return;
  }

  container.innerHTML = filtered.map(key => {
    const raag = RAAGS_DB[key];
    const isActive = state.selectedRaagKey === key;

    return `
      <div class="raag-item-card${isActive ? ' active' : ''}"
           data-key="${key}"
           role="option"
           aria-selected="${isActive}"
           tabindex="0">
        <div class="raag-item-dot" style="background: ${raag.color || '#E67E22'}"></div>
        <div class="raag-item-content">
          <div class="raag-item-name-row">
            <span class="raag-item-name">${highlight(raag.name, state.searchQuery)}</span>
            ${raag.hindiName ? `<span class="raag-item-hindi">${raag.hindiName}</span>` : ''}
          </div>
          <div class="raag-item-meta">
            <span class="raag-thaat-badge">${raag.thaat || 'Thaat'}</span>
            <span class="raag-time-tag">${raag.timeIcon || '⏰'} ${raag.time ? raag.time.split('(')[0].trim() : ''}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  // Attach click events
  container.querySelectorAll('.raag-item-card').forEach(card => {
    const key = card.dataset.key;
    const clickHandler = () => selectRaag(key);
    card.addEventListener('click', clickHandler);
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        clickHandler();
      }
    });
  });
}

function getSortedRaagKeys() {
  // Priority list matching PDF pages first
  const pdfPriority = [
    "Yaman", "Bhairav", "Darbari Kanada", "Shivaranjani",
    "Puriya Dhanashri", "Hansdhwani", "Bhairavi", "Bhoopali",
    "Khamaj", "Kafi", "Bageshri", "Bhimpalasi", "Malkauns",
    "Bilawal", "Marwa", "Kedar", "Todi", "Des"
  ];

  // Unique keys from RAAGS_DB
  const allKeys = Object.keys(RAAGS_DB).filter(k => !["Darbari", "Bhoop", "Alhaiya Bilawal"].includes(k));

  return [...new Set([...pdfPriority, ...allKeys])].filter(k => RAAGS_DB[k]);
}

function selectRaag(key) {
  if (!RAAGS_DB[key]) return;
  state.selectedRaagKey = key;

  // Update UI active card
  document.querySelectorAll('.raag-item-card').forEach(card => {
    const isThis = card.dataset.key === key;
    card.classList.toggle('active', isThis);
    card.setAttribute('aria-selected', isThis);
  });

  // Update header status
  $('header-raag-name').textContent = RAAGS_DB[key].name.replace('Raag ', '');

  // Render diagram and chords
  renderCurrentRaag();

  // On mobile screens, scroll viewport into view
  if (window.innerWidth < 960) {
    $('notation-viewport').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

function buildThaatFilters() {
  const container = $('thaat-filters');
  if (!container) return;

  const thaats = ['All', 'Kalyan', 'Bhairav', 'Bhairavi', 'Kafi', 'Khamaj', 'Bilawal', 'Poorvi', 'Marwa', 'Todi', 'Asavari'];

  container.innerHTML = thaats.map(t => {
    const isAll = t === 'All';
    const isActive = (isAll && !state.selectedThaat) || state.selectedThaat === t;
    return `
      <button type="button" class="thaat-chip${isActive ? ' active' : ''}" data-thaat="${isAll ? '' : t}">
        ${t}
      </button>
    `;
  }).join('');

  container.querySelectorAll('.thaat-chip').forEach(btn => {
    btn.addEventListener('click', () => {
      state.selectedThaat = btn.dataset.thaat || null;
      container.querySelectorAll('.thaat-chip').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      buildRaagList();
    });
  });
}

function highlight(text, query) {
  if (!query || !query.trim()) return text;
  const escaped = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return text.replace(new RegExp(`(${escaped})`, 'gi'), '<mark>$1</mark>');
}

/* ══════════════════════════════════════════════════════════ */
/*  STEPS 3 & 4: RENDER NOTATION DIAGRAM & RELATED CHORDS     */
/* ══════════════════════════════════════════════════════════ */

function renderCurrentRaag() {
  const raag = RAAGS_DB[state.selectedRaagKey];
  if (!raag) return;

  const scale = state.selectedScale;

  // ── Step 3: Exact PDF-Style Notation Sheet ──────────────
  const pianoContainer = $('pdf-piano-container');
  if (!pianoRenderer) {
    pianoRenderer = new PianoRenderer(pianoContainer);
  }
  pianoRenderer.render(raag, scale);

  // ── Step 4: Related Chords & Voicings ───────────────────
  renderChordVoicings(raag, scale);

  // ── Raag Stats & Note Table ─────────────────────────────
  renderRaagMetadata(raag, scale);
}

function renderChordVoicings(raag, scale) {
  const container = $('chord-voicings-grid');
  if (!container) return;

  if (!chordChartRenderer) {
    chordChartRenderer = new ChordChart(container);
  }

  // Derive chords for this Raag in this scale
  const rootIdx = CHROMATIC_SCALES.indexOf(scale);
  const intervals = raag.intervals || [0, 2, 4, 6, 7, 9, 11];
  const scaleNotesSet = new Set(intervals.map(i => (rootIdx + i) % 12));

  let chordsToDisplay = [];
  if (scale === 'C#' && raag.csharpChords) {
    chordsToDisplay = raag.csharpChords;
  } else {
    chordsToDisplay = pianoRenderer._getChordsForRaag(raag, scale, scaleNotesSet);
  }

  // Pick top 6-8 distinct chords for visual diagrams (major, minor, sus, dim)
  const prioritizedChords = chordsToDisplay.slice(0, 10);
  chordChartRenderer.render(prioritizedChords, 0);

  // Attach audio playback when clicking chord cards
  container.querySelectorAll('.chord-card').forEach(card => {
    card.style.cursor = 'pointer';
    card.title = 'Click to hear chord';
    card.addEventListener('click', () => {
      const chordName = card.querySelector('.chord-name-label')?.textContent;
      if (chordName && pianoRenderer) {
        pianoRenderer._playChord(chordName);
        card.classList.add('card-pressed');
        setTimeout(() => card.classList.remove('card-pressed'), 300);
      }
    });
  });
}

function renderRaagMetadata(raag, scale) {
  // Stats
  $('stat-thaat').textContent = raag.thaat || '—';
  $('stat-vadi-samvadi').textContent = `${raag.vadi || '—'} / ${raag.samvadi || '—'}`;
  $('stat-time').textContent = `${raag.timeIcon || '⏰'} ${raag.time || '—'}`;
  $('stat-mood').textContent = raag.mood || '—';
  $('stat-description').textContent = raag.description || '';

  // Note mapping table
  const tbody = $('note-table-body');
  if (!tbody) return;

  const intervals = raag.intervals || [0, 2, 4, 6, 7, 9, 11];
  const sargam = raag.sargam || ['Sa', 'Re', 'Ga', 'Ma', 'Pa', 'Dha', 'Ni'];
  const rootSemi = CHROMATIC_SCALES.indexOf(scale);

  tbody.innerHTML = intervals.map((interval, i) => {
    const noteSemi = (rootSemi + interval) % 12;
    const noteName = CHROMATIC_SCALES[noteSemi];
    const isWhite = WHITE_NOTES.includes(noteName);
    const isSa = interval === 0;

    const keyBadge = isWhite
      ? `<span class="key-badge white">White Key</span>`
      : `<span class="key-badge black">Black Key</span>`;

    return `
      <tr class="${isSa ? 'root-row' : ''}">
        <td><strong>${sargam[i] || '—'}</strong> ${isSa ? '<span class="sa-tag">Sa (Root)</span>' : ''}</td>
        <td><strong class="note-name-pill ${isSa ? 'sa' : 'raag'}">${noteName}</strong></td>
        <td>${keyBadge}</td>
        <td>${getIntervalLabel(interval)}</td>
      </tr>
    `;
  }).join('');
}

function getIntervalLabel(semi) {
  const map = {
    0:  'Unison (Sa / Tonic)',
    1:  'Komal Re (Minor 2nd / 1 semitone)',
    2:  'Shuddha Re (Major 2nd / 2 semitones)',
    3:  'Komal Ga (Minor 3rd / 3 semitones)',
    4:  'Shuddha Ga (Major 3rd / 4 semitones)',
    5:  'Shuddha Ma (Perfect 4th / 5 semitones)',
    6:  'Tivra Ma# (Tritone / 6 semitones)',
    7:  'Pa (Perfect 5th / 7 semitones)',
    8:  'Komal Dha (Minor 6th / 8 semitones)',
    9:  'Shuddha Dha (Major 6th / 9 semitones)',
    10: 'Komal Ni (Minor 7th / 10 semitones)',
    11: 'Shuddha Ni (Major 7th / 11 semitones)'
  };
  return map[semi] || `${semi} semitones`;
}

function showToast(msg) {
  const toast = $('app-toast');
  if (!toast) return;
  toast.textContent = msg;
  toast.classList.add('show');
  setTimeout(() => toast.classList.remove('show'), 2000);
}

/* ══════════════════════════════════════════════════════════ */
/*  INITIALIZATION                                            */
/* ══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Build Step 1 (Scale Selector)
  buildScaleSelector();

  // 2. Build Step 2 (Raag List & Filters)
  buildThaatFilters();
  buildRaagList();

  // 3. Search input handler
  const searchInput = $('raag-search-input');
  const clearBtn = $('search-clear-btn');

  if (searchInput) {
    searchInput.addEventListener('input', e => {
      state.searchQuery = e.target.value;
      if (clearBtn) clearBtn.style.display = state.searchQuery ? 'flex' : 'none';
      buildRaagList();
    });
  }

  if (clearBtn) {
    clearBtn.addEventListener('click', () => {
      searchInput.value = '';
      state.searchQuery = '';
      clearBtn.style.display = 'none';
      buildRaagList();
      searchInput.focus();
    });
  }

  // 4. Initial Render of default Raag (Yaman in C#)
  renderCurrentRaag();
});
