import { CATEGORY_LIST } from './data.js';

const root = document.getElementById('root');
const WHEEL_COLORS = ['#f6aaa9', '#d7c8ef', '#f7dc79', '#bce1d2'];
const SEGMENT_COUNT = 12;
const SPIN_MS = 3600;
let currentRotation = 0;
let spinTimeout = null;

function brandMarkup(compact = false) {
  return `
    <button class="brand ${compact ? 'brand--compact' : ''}" type="button" data-home aria-label="What you wanna eat home">
      <img src="/assets/strawberry-sketch.png" alt="" />
      <span>what you<br />wanna <em>eat?</em></span>
    </button>`;
}

function arrowIcon() {
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M14 7l5 5-5 5" /></svg>`;
}

function categoryCard(category) {
  return `
    <article class="category-card category-card--${category.key}" style="--accent:${category.accent};--soft:${category.soft}">
      <div class="category-card__scribble" aria-hidden="true">${category.key === 'main' ? '✧' : '♡'}</div>
      <div class="category-card__art">
        <img src="${category.image}" alt="Sketch of food for ${category.label}" />
      </div>
      <h2>${category.label}</h2>
      <button type="button" data-category="${category.key}">Pick this ${arrowIcon()}</button>
    </article>`;
}

function renderHome() {
  window.clearTimeout(spinTimeout);
  currentRotation = 0;
  window.history.replaceState(null, '', window.location.pathname);
  root.innerHTML = `
    <main class="home-screen page-enter">
      <header class="home-header">${brandMarkup()}</header>
      <section class="home-intro">
        <span class="doodle doodle--left" aria-hidden="true">⌁</span>
        <h1>What are we eating?</h1>
        <p>Pick a mood. We’ll handle the hard part.</p>
        <span class="doodle doodle--right" aria-hidden="true">♡</span>
      </section>
      <section class="category-grid" aria-label="Choose a meal category">
        ${CATEGORY_LIST.map(categoryCard).join('')}
      </section>
      <footer class="home-footer"><span>♡</span> Made for hungry, indecisive people. <span>♡</span></footer>
    </main>`;

  root.querySelectorAll('[data-category]').forEach((button) => {
    button.addEventListener('click', () => renderWheel(button.dataset.category));
  });
}

function polarToCartesian(cx, cy, radius, angle) {
  const radians = ((angle - 90) * Math.PI) / 180;
  return { x: cx + radius * Math.cos(radians), y: cy + radius * Math.sin(radians) };
}

function describeArc(cx, cy, radius, startAngle, endAngle) {
  const start = polarToCartesian(cx, cy, radius, endAngle);
  const end = polarToCartesian(cx, cy, radius, startAngle);
  const largeArc = endAngle - startAngle <= 180 ? 0 : 1;
  return `M ${cx} ${cy} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArc} 0 ${end.x} ${end.y} Z`;
}

function shortenLabel(label) {
  return label.length <= 18 ? label : `${label.slice(0, 16).trim()}…`;
}

function wheelSvg(items) {
  const slice = 360 / SEGMENT_COUNT;
  const segments = items.map((item, index) => {
    const start = index * slice - slice / 2;
    const end = start + slice;
    const center = index * slice;
    const textPoint = polarToCartesian(300, 300, 206, center);
    return `
      <g>
        <path d="${describeArc(300, 300, 274, start, end)}" fill="${WHEEL_COLORS[index % WHEEL_COLORS.length]}" class="wheel-slice" />
        <text x="${textPoint.x}" y="${textPoint.y}" text-anchor="middle" dominant-baseline="middle" transform="rotate(${center}, ${textPoint.x}, ${textPoint.y})" class="wheel-label">${shortenLabel(item)}</text>
      </g>`;
  }).join('');

  return `
    <svg class="wheel-svg" viewBox="0 0 600 600" role="img" aria-label="Food choice wheel">
      <circle cx="300" cy="300" r="286" class="wheel-paper" />
      ${segments}
      <circle cx="300" cy="300" r="83" class="wheel-hub" />
      <text x="300" y="311" text-anchor="middle" class="wheel-hub-star">✦</text>
      <circle cx="300" cy="300" r="278" class="wheel-rim" />
    </svg>`;
}

function sampleItems(items, count = SEGMENT_COUNT) {
  if (items.length <= count) return items;
  const step = items.length / count;
  return Array.from({ length: count }, (_, index) => items[Math.floor(index * step)]);
}

function shuffledWithout(items, omitted) {
  const pool = items.filter((item) => item !== omitted);
  for (let index = pool.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [pool[index], pool[swapIndex]] = [pool[swapIndex], pool[index]];
  }
  return pool;
}

function categoryTabs(activeKey) {
  return CATEGORY_LIST.map((category) => `
    <button type="button" data-tab="${category.key}" class="${activeKey === category.key ? 'is-active' : ''}" style="--tab-accent:${category.accent}">
      <span aria-hidden="true">${category.key === 'brunch' ? '◉' : category.key === 'main' ? '◒' : '△'}</span>
      ${category.label}
    </button>`).join('');
}

function fullList(category) {
  return `
    <details class="full-list">
      <summary>View all ${category.items.length} options</summary>
      <div class="full-list__groups">
        ${category.groups.map((group) => `
          <section>
            <h3>${group.name}</h3>
            <ul>${group.items.map((item) => `<li>${item}</li>`).join('')}</ul>
          </section>`).join('')}
      </div>
    </details>`;
}

function bindHomeButtons() {
  root.querySelectorAll('[data-home]').forEach((button) => {
    button.addEventListener('click', renderHome);
  });
}

function setControlsDisabled(disabled) {
  root.querySelectorAll('[data-home], [data-tab], [data-spin]').forEach((control) => {
    control.disabled = disabled;
  });
}

function renderWheel(categoryKey) {
  window.clearTimeout(spinTimeout);
  currentRotation = 0;
  const category = CATEGORY_LIST.find((entry) => entry.key === categoryKey) || CATEGORY_LIST[0];
  const initialItems = sampleItems(category.items);
  window.history.replaceState(null, '', `#${category.key}`);
  window.scrollTo({ top: 0, behavior: 'smooth' });

  root.innerHTML = `
    <main class="wheel-screen page-enter" style="--active:${category.accent};--active-soft:${category.soft}">
      <header class="app-header">
        ${brandMarkup(true)}
        <button type="button" class="all-moods all-moods--desktop" data-home>←&nbsp;&nbsp;All moods</button>
      </header>
      <div class="wheel-toolbar">
        <button type="button" class="all-moods all-moods--mobile" data-home>←&nbsp;&nbsp;All moods</button>
        <div class="category-tabs" aria-label="Meal categories">${categoryTabs(category.key)}</div>
      </div>
      <section class="wheel-layout">
        <div class="wheel-stage">
          <div class="wheel-pointer" aria-hidden="true">♥</div>
          <div class="wheel-shadow" aria-hidden="true"></div>
          <div class="wheel-rotor">${wheelSvg(initialItems)}</div>
          <span class="motion-mark motion-mark--one" aria-hidden="true">)))</span>
          <span class="motion-mark motion-mark--two" aria-hidden="true">⌁</span>
        </div>
        <div class="wheel-panel">
          <div class="wheel-copy">
            <span class="sparkle" aria-hidden="true">✦</span>
            <h1>${category.spinTitle}</h1>
            <p>Let fate pick your next bite.</p>
          </div>
          <p class="draw-note"><span aria-hidden="true">✧</span> All <strong>${category.items.length}</strong> options are in the draw. The wheel shows a rotating sample.</p>
          <button class="spin-button" type="button" data-spin>
            <span class="spin-glyph" aria-hidden="true">✦</span><span data-spin-label>SPIN THE WHEEL</span>
          </button>
          <div class="result-ticket" aria-live="polite" aria-atomic="true">
            <span class="ticket-scribble ticket-scribble--left" aria-hidden="true">///</span>
            <p data-ticket-label>Your next bite awaits</p>
            <h2 data-result>Spin to find out</h2>
            <div class="ticket-line" aria-hidden="true"><span>— — —</span><b>♥</b><span>— — —</span></div>
            <span class="ticket-scribble ticket-scribble--right" aria-hidden="true">\\\\</span>
          </div>
          <p class="again-note" data-again-note>No overthinking. That’s the rule.</p>
          ${fullList(category)}
        </div>
      </section>
    </main>`;

  bindHomeButtons();
  root.querySelectorAll('[data-tab]').forEach((button) => {
    button.addEventListener('click', () => renderWheel(button.dataset.tab));
  });
  root.querySelector('[data-spin]').addEventListener('click', () => spinWheel(category));
}

function spinWheel(category) {
  const stage = root.querySelector('.wheel-stage');
  const rotor = root.querySelector('.wheel-rotor');
  const button = root.querySelector('[data-spin]');
  if (!stage || stage.classList.contains('wheel-stage--spinning')) return;

  const picked = category.items[Math.floor(Math.random() * category.items.length)];
  const targetIndex = Math.floor(Math.random() * SEGMENT_COUNT);
  const nextItems = shuffledWithout(category.items, picked).slice(0, SEGMENT_COUNT - 1);
  nextItems.splice(targetIndex, 0, picked);

  const slice = 360 / SEGMENT_COUNT;
  const desiredMod = (360 - targetIndex * slice) % 360;
  const currentMod = ((currentRotation % 360) + 360) % 360;
  const delta = 360 * 5 + ((desiredMod - currentMod + 360) % 360);
  currentRotation += delta;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const duration = reduceMotion ? 80 : SPIN_MS;

  rotor.innerHTML = wheelSvg(nextItems);
  stage.classList.add('wheel-stage--spinning');
  root.querySelector('.result-ticket').classList.remove('has-result');
  root.querySelector('[data-ticket-label]').textContent = 'The wheel is thinking…';
  root.querySelector('[data-result]').textContent = '…';
  root.querySelector('[data-spin-label]').textContent = 'CHOOSING…';
  root.querySelector('.spin-glyph').classList.add('is-spinning');
  setControlsDisabled(true);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      rotor.style.transform = `rotate(${currentRotation}deg)`;
    });
  });

  spinTimeout = window.setTimeout(() => {
    stage.classList.remove('wheel-stage--spinning');
    root.querySelector('[data-ticket-label]').textContent = 'You should get';
    root.querySelector('[data-result]').textContent = picked;
    root.querySelector('.result-ticket').classList.add('has-result');
    root.querySelector('[data-spin-label]').textContent = 'SPIN AGAIN';
    root.querySelector('.spin-glyph').classList.remove('is-spinning');
    root.querySelector('[data-again-note]').textContent = 'Not feeling it? Give it another spin.';
    setControlsDisabled(false);
    button.focus({ preventScroll: true });
  }, duration);
}

const initialKey = window.location.hash.replace('#', '');
if (CATEGORY_LIST.some((category) => category.key === initialKey)) {
  renderWheel(initialKey);
} else {
  renderHome();
}
