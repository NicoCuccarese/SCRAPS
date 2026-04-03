// ─────────────────────────────────────────────
//  TF-IDF ENGINE
// ─────────────────────────────────────────────

const STOPWORDS = new Set([
  'a','an','the','and','or','but','in','on','at','to','for','of','with',
  'by','from','as','is','are','was','were','be','been','being','have',
  'has','had','that','this','these','those','it','its','which','when',
  'where','who','how','what','they','them','their','there','then','than',
  'also','more','most','each','both','all','any','can','will','would',
  'may','might','could','should','do','does','did','not','no','only',
  'very','just','into','through','over','under','between','after','before',
  'such','so','if','about','around','across','without','within','during'
]);

function tokenize(text) {
  return text.toLowerCase()
    .replace(/[^a-z0-9\s'-]/g, ' ')
    .split(/\s+/)
    .map(t => t.replace(/^['-]+|['-]+$/g, ''))
    .filter(t => t.length > 2 && !STOPWORDS.has(t));
}

function buildTFIDF(corpus) {
  const tf = corpus.map(doc => {
    const tokens = tokenize(doc.text + ' ' + doc.title + ' ' + doc.category);
    const freq = {};
    tokens.forEach(t => { freq[t] = (freq[t] || 0) + 1; });
    const total = tokens.length;
    const tfMap = {};
    Object.entries(freq).forEach(([t, c]) => { tfMap[t] = c / total; });
    return { tokens, tfMap };
  });

  // Build vocab
  const vocab = new Set();
  tf.forEach(d => Object.keys(d.tfMap).forEach(t => vocab.add(t)));
  const vocabArr = [...vocab];

  // IDF
  const N = corpus.length;
  const idf = {};
  vocabArr.forEach(t => {
    const df = tf.filter(d => d.tfMap[t] > 0).length;
    idf[t] = Math.log((N + 1) / (df + 1)) + 1;
  });

  // TF-IDF vectors
  const vectors = tf.map(d => {
    const vec = {};
    vocabArr.forEach(t => {
      const v = (d.tfMap[t] || 0) * idf[t];
      if (v > 0) vec[t] = v;
    });
    return vec;
  });

  return { vectors, idf, vocab: vocabArr };
}

function queryVector(queryText, idf) {
  const tokens = tokenize(queryText);
  const freq = {};
  tokens.forEach(t => { freq[t] = (freq[t] || 0) + 1; });
  const total = Math.max(tokens.length, 1);
  const vec = {};
  Object.entries(freq).forEach(([t, c]) => {
    const tf = c / total;
    const idfVal = idf[t] || Math.log(2); // smooth for OOV
    vec[t] = tf * idfVal;
  });
  return { vec, tokens };
}

function cosineSim(vecA, vecB) {
  let dot = 0, normA = 0, normB = 0;
  const allKeys = new Set([...Object.keys(vecA), ...Object.keys(vecB)]);
  allKeys.forEach(k => {
    const a = vecA[k] || 0;
    const b = vecB[k] || 0;
    dot += a * b;
    normA += a * a;
    normB += b * b;
  });
  if (normA === 0 || normB === 0) return 0;
  return dot / (Math.sqrt(normA) * Math.sqrt(normB));
}

// ─────────────────────────────────────────────
//  Initialize
// ─────────────────────────────────────────────

let engine;

window.addEventListener('DOMContentLoaded', () => {
  engine = buildTFIDF(CORPUS);
  document.getElementById('corpusCount').textContent = CORPUS.length;
  document.getElementById('vocabSize').textContent = engine.vocab.length;

  // Render example chips
  const chipsEl = document.getElementById('exampleChips');
  EXAMPLE_QUERIES.forEach(q => {
    const chip = document.createElement('button');
    chip.className = 'chip';
    chip.textContent = q;
    chip.onclick = () => {
      document.getElementById('queryInput').value = q;
      runSearch();
    };
    chipsEl.appendChild(chip);
  });

  // Enter key support
  document.getElementById('queryInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') runSearch();
  });
});

// ─────────────────────────────────────────────
//  Search
// ─────────────────────────────────────────────

function runSearch() {
  const query = document.getElementById('queryInput').value.trim();
  if (!query) return;

  const t0 = performance.now();
  const { vec: qVec, tokens: qTokens } = queryVector(query, engine.idf);

  const results = CORPUS.map((doc, i) => ({
    doc,
    score: cosineSim(qVec, engine.vectors[i])
  })).sort((a, b) => b.score - a.score);

  const elapsed = (performance.now() - t0).toFixed(1) + 'ms';
  const topScore = results[0].score;

  // Update stats
  document.getElementById('lastQueryTime').textContent = elapsed;
  document.getElementById('topScore').textContent = (topScore * 100).toFixed(1) + '%';
  document.getElementById('resultCount').textContent = results.length + ' docs';

  document.getElementById('emptyState').style.display = 'none';
  document.getElementById('resultsSection').style.display = 'block';

  // Render result cards
  const grid = document.getElementById('resultsGrid');
  grid.innerHTML = '';
  results.forEach(({ doc, score }, idx) => {
    const pct = topScore > 0 ? score / topScore : 0;
    const card = document.createElement('div');
    card.className = 'result-card' + (idx === 0 ? ' top' : '');
    card.style.animationDelay = (idx * 35) + 'ms';

    const rankStr = String(idx + 1).padStart(2, '0');
    const scoreStr = (score * 100).toFixed(1) + '%';
    const isHigh = pct > 0.7;

    // Highlight matching query terms in excerpt
    let excerpt = doc.text.substring(0, 160) + '…';
    qTokens.forEach(t => {
      if (t.length > 3) {
        const re = new RegExp('\\b' + t + '\\w*', 'gi');
        excerpt = excerpt.replace(re, m => `<em>${m}</em>`);
      }
    });

    card.innerHTML = `
      <div class="result-rank ${idx === 0 ? 'top-rank' : ''}">${rankStr}</div>
      <div class="result-body">
        <div class="result-category">${doc.category}</div>
        <div class="result-title">${doc.title}</div>
        <div class="result-excerpt">${excerpt}</div>
      </div>
      <div class="result-meta">
        <div class="similarity-score ${isHigh ? 'high' : ''}">${scoreStr}</div>
        <div class="similarity-bar-wrap">
          <div class="similarity-bar-fill" style="width:${pct * 100}%"></div>
        </div>
        <div class="similarity-label">cosine sim</div>
      </div>
    `;
    grid.appendChild(card);
  });

  // Render TF-IDF debug panel — top query terms
  const sortedTerms = Object.entries(qVec)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 14);

  const tokenRow = document.getElementById('tokenRow');
  tokenRow.innerHTML = '';
  sortedTerms.forEach(([word, score]) => {
    const chip = document.createElement('span');
    chip.className = 'token-chip';
    chip.innerHTML = `<span class="token-word">${word}</span><span class="token-score">${score.toFixed(4)}</span>`;
    tokenRow.appendChild(chip);
  });

  // Render pipeline steps
  const steps = ['Raw Input', 'Lowercase', 'Tokenize', 'Stop-word Filter', 'TF Compute', 'IDF Weight', 'Cosine Rank'];
  const stepsEl = document.getElementById('pipelineSteps');
  stepsEl.innerHTML = '';
  steps.forEach((s, i) => {
    const step = document.createElement('span');
    step.className = 'pipeline-step done';
    step.textContent = s;
    stepsEl.appendChild(step);
    if (i < steps.length - 1) {
      const arrow = document.createElement('span');
      arrow.className = 'pipeline-arrow';
      arrow.textContent = '→';
      stepsEl.appendChild(arrow);
    }
  });
}

// ─────────────────────────────────────────────
//  Debug Panel Toggle
// ─────────────────────────────────────────────

function togglePanel() {
  const body = document.getElementById('panelBody');
  const toggle = document.getElementById('panelToggle');
  const title = document.querySelector('.panel-title');

  if (body.classList.contains('open')) {
    body.classList.remove('open');
    toggle.textContent = '[expand]';
    title.textContent = '▸ TF-IDF Debug — Query Vector';
  } else {
    body.classList.add('open');
    toggle.textContent = '[collapse]';
    title.textContent = '▾ TF-IDF Debug — Query Vector';
  }
}
