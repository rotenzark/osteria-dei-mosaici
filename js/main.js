/* Osteria dei Mosaici — main.js
   PLUMBING_V 1 (canonico) + firma:
   · hero entrance (.reveal-hero, unica animazione d'opacità → flash-safe)
   · il mosaico che si compone: tessere in scale/transform (NON opacity → flash-safe) */

/* ---------- firma: hero entrance ---------- */
window.bespokeHeroEntrance = function () {
  var els = document.querySelectorAll('.reveal-hero');
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (typeof gsap !== 'undefined' && !reduced) {
    gsap.fromTo(els, { opacity: 0, y: 26 }, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', stagger: 0.12 });
  } else { els.forEach(function (el) { el.style.opacity = 1; }); }
};

(function () {
  'use strict';
  var root = document.documentElement;
  root.classList.add('js');
  var reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reducedMotion) root.classList.add('reduced-motion');

  /* ══════════ CONFIG PER-SITO ══════════ */
  var SITE = {
    slug: 'osteria-dei-mosaici',
    whatsapp: { number: '', message: '', ids: [] },
    hours: {
      0: [['12:00', '14:00']],
      1: [['12:00', '14:00']],
      2: [['12:00', '14:00']],
      3: [['12:00', '14:00'], ['19:30', '22:00']],
      4: [['12:00', '14:00'], ['19:30', '22:00']],
      5: [['12:00', '14:00'], ['19:30', '22:00']],
      6: [['12:00', '14:00'], ['19:30', '22:00']],
    },
    hoursStatusId: 'orarioStato',
    hoursTableSelector: '[data-day]',
    todayClass: 'is-today',
    introId: 'intro',
    introDuration: 1800,
    revealSelector: '.reveal',
    inViewClass: 'in-view',
    breakpointMenu: 720,
    EN: {
      'skip': 'Skip to content',
      'nav.menu': "Today's menu", 'nav.piatti': 'The dishes', 'nav.casa': 'Like home', 'nav.dove': 'Find us & hours', 'nav.cta': 'Book',
      'hero.eyebrow': 'Family Apulian osteria · Via Paravia 26',
      'hero.t1': 'A mosaic', 'hero.t2': 'of Puglia',
      'hero.lead': 'Orecchiette, mussels and stracciatella, the fixed-price menu of the day and the welcome of people who make you feel at home. Puglia, in Milan, on Via Paravia.',
      'hero.reviews': '545 Google reviews', 'hero.book': 'Book: 331 415 7800', 'hero.menu': "Today's menu",
      'gesto.eyebrow': 'Ai Mosaici',
      'gesto.t1': 'Every dish,', 'gesto.t2': 'a tile',
      'gesto.lead': "An Apulian osteria is made of many tiles: the hand-rolled orecchiette, the mussels, the stracciatella that comes from down south, the menu of the day, and someone who welcomes you like family. Put together, they make the mosaic.",
      'menu.eyebrow': 'Every day at lunch', 'menu.title': 'The menu of the day',
      'menu.p1': "The osteria's lunch: a fixed-price menu with a first course, a main and a side. Plus water, house wine and coffee included. Genuine, quick, honest — as it should be.",
      'menu.l1': 'A first course of the day', 'menu.l2': 'A main with a side', 'menu.l3': 'Water, house wine and coffee',
      'menu.note': "The menu changes every day with what's fresh. Come and check the blackboard.",
      'menu.call': 'Book lunch',
      'piatti.eyebrow': 'The mosaic of dishes', 'piatti.title': 'The flavours that take you back to Puglia',
      'p1.n': 'Orecchiette with turnip tops', 'p2.n': 'Spaghetti with mussels', 'p3.n': 'Stracciatella',
      'p4.n': 'Prawns & shellfish', 'p5.n': 'Seared tuna', 'p6.n': 'Orecchiette with ragù',
      'piatti.note': 'And then the antipasti, the home-style mains and the house tiramisù. The menu changes with the season.',
      'casa.eyebrow': 'Like home', 'casa.title': 'An old-style osteria, family-run',
      'casa.p1': "Here you step in and feel at home. The cooking is the family's, the produce comes 'from down south', and whoever serves you welcomes you as one of their own. A little retro, yes — but what matters is the taste.",
      'casa.p2': 'A simple atmosphere, honest prices, the house wine. Puglia brought to Milan, one dish at a time.',
      'gallery.eyebrow': 'From the kitchen', 'gallery.title': 'More tiles of the mosaic',
      'rev.eyebrow': 'Voices of the guests', 'rev.title': '4.2 on Google, 545 reviews',
      'rev1.t': "«My favourite Apulian restaurant! Fresh produce that comes from down south. Their dishes take you back to Puglia.»", 'rev1.a': '— Ivana C.',
      'rev2.t': "«Family and feeling at home. I arrived alone and was welcomed like family. And you eat very well.»", 'rev2.a': '— Mario V.',
      'rev3.t': "«At lunch a fixed-price menu, first, main and side, water wine and coffee. Traditional Apulian cooking, all excellent.»", 'rev3.a': '— Luca F.',
      'rev4.t': "«Quick, genuine lunch, friendly owners, really honest prices. From the moment you cross the door, a homely atmosphere.»", 'rev4.a': '— Antonino D.',
      'rev.src': 'Real customer reviews on Google.',
      'dove.eyebrow': 'Find us & hours', 'dove.title': 'Via Paravia 26, Milan',
      'day.lun': 'Monday', 'day.mar': 'Tuesday', 'day.mer': 'Wednesday', 'day.gio': 'Thursday', 'day.ven': 'Friday', 'day.sab': 'Saturday', 'day.dom': 'Sunday',
      'h.lunch': 'Lunch 12–2', 'h.lunch2': 'Lunch 12–2', 'h.lunch3': 'Lunch 12–2',
      'dove.addr_l': 'Address', 'dove.tel_l': 'Phone', 'dove.serv_l': 'Service', 'dove.serv': 'Dine-in & takeaway', 'dove.call': 'Book a table',
      'faq.eyebrow': 'FAQ', 'faq.title': 'Before you come',
      'faq1.q': 'What kind of cooking do you do?',
      'faq1.a': 'Home-style Apulian cooking: orecchiette (turnip tops, tomato, ragù), spaghetti with mussels, stracciatella, antipasti and fish dishes. Produce that comes from Puglia.',
      'faq2.q': 'Is there a menu of the day at lunch?',
      'faq2.a': 'Yes: at lunch, every day, there is a fixed-price menu with a first course, a main, a side and water, wine and coffee included.',
      'faq3.q': 'What are your opening hours?',
      'faq3.a': 'Lunch every day 12:00–14:00. Dinner Wednesday to Saturday 19:30–22:00.',
      'faq4.q': 'Do I need to book?',
      'faq4.a': "For lunch you'll usually find a table; for dinner and at weekends it's best to call 331 415 7800 and book a table.",
      'foot.hours_l': 'Hours', 'foot.hours1': 'Lunch every day 12–2', 'foot.hours2': 'Dinner Wed–Sat 7:30–10pm',
      'foot.disclaimer': 'Demonstration website (concept) created by Bespoke Studio for presentation purposes. It is not the official website of the business. Images and reviews belong to their respective owners.',
    },
  };
  /* ═════════════════════════════════════ */

  if (SITE.whatsapp.number) {
    var waHref = 'https://wa.me/' + SITE.whatsapp.number + '?text=' + encodeURIComponent(SITE.whatsapp.message);
    SITE.whatsapp.ids.forEach(function (id) { var el = document.getElementById(id); if (el) { el.href = waHref; el.target = '_blank'; el.rel = 'noopener'; } });
  }

  var hasGsap = typeof gsap !== 'undefined';
  var hasST = hasGsap && typeof ScrollTrigger !== 'undefined';
  if (hasST) gsap.registerPlugin(ScrollTrigger);

  function showAllReveals() {
    var els = document.querySelectorAll(SITE.revealSelector);
    els.forEach(function (el) { el.classList.add(SITE.inViewClass); });
    if (hasGsap) {
      if (hasST) { els.forEach(function (el) { ScrollTrigger.getAll().forEach(function (st) { if (st.trigger === el && !st.progress) st.kill(); }); }); }
      gsap.set(els, { opacity: 1, y: 0, x: 0 });
    }
  }
  setTimeout(function () { if (!hasGsap || reducedMotion) showAllReveals(); }, 1500);

  if (hasGsap && !reducedMotion) {
    gsap.utils.toArray(SITE.revealSelector).forEach(function (el) {
      gsap.fromTo(el, { opacity: 0, y: 28 }, {
        opacity: 1, y: 0, duration: 0.7, ease: 'power2.out', immediateRender: false,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    });
  } else if ('IntersectionObserver' in window && !reducedMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add(SITE.inViewClass); io.unobserve(e.target); } });
    }, { threshold: 0.12 });
    document.querySelectorAll(SITE.revealSelector).forEach(function (el) { io.observe(el); });
  } else { showAllReveals(); }

  /* intro */
  var intro = document.getElementById(SITE.introId);
  var heroEntrance = window.bespokeHeroEntrance || function () {};
  function hideIntro() {
    if (!intro) return;
    var el = intro; intro = null;
    el.classList.add('hide');
    setTimeout(function () { el.remove(); }, 700);
    heroEntrance();
  }
  if (reducedMotion || !intro) { if (intro) { intro.remove(); intro = null; } heroEntrance(); }
  else { setTimeout(hideIntro, SITE.introDuration); setTimeout(hideIntro, 6000); intro.addEventListener('click', hideIntro); }

  /* burger */
  var burger = document.getElementById('burger');
  var nav = document.getElementById('mainNav');
  if (burger && nav) {
    var lastFocus = null;
    var closeNav = function () { nav.classList.remove('nav-open'); burger.setAttribute('aria-expanded', 'false'); if (lastFocus) { lastFocus.focus(); lastFocus = null; } };
    var openNav = function () { lastFocus = document.activeElement; nav.classList.add('nav-open'); burger.setAttribute('aria-expanded', 'true'); var f = nav.querySelector('a, button'); if (f) f.focus(); };
    burger.addEventListener('click', function () { nav.classList.contains('nav-open') ? closeNav() : openNav(); });
    nav.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', closeNav); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('nav-open')) closeNav(); });
    window.addEventListener('resize', function () { if (window.innerWidth > SITE.breakpointMenu) closeNav(); });
  }

  /* lightbox */
  var lightbox = document.getElementById('lightbox');
  var lightboxImg = document.getElementById('lightboxImg');
  var lightboxClose = document.getElementById('lightboxClose');
  if (lightbox && lightboxImg) {
    var opener = null;
    var openLb = function (src, alt) { lightboxImg.src = src; lightboxImg.alt = alt || ''; lightbox.hidden = false; document.body.style.overflow = 'hidden'; if (lightboxClose) lightboxClose.focus(); };
    var closeLb = function () { lightbox.hidden = true; lightboxImg.src = ''; document.body.style.overflow = ''; if (opener) { opener.focus(); opener = null; } };
    document.querySelectorAll('[data-full]').forEach(function (btn) {
      btn.addEventListener('click', function () { opener = btn; var img = btn.querySelector('img'); openLb(btn.getAttribute('data-full'), img ? img.alt : ''); });
    });
    if (lightboxClose) lightboxClose.addEventListener('click', closeLb);
    lightbox.addEventListener('click', function (e) { if (e.target === lightbox) closeLb(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !lightbox.hidden) closeLb(); });
  }

  /* orari Europe/Rome */
  function romeNow() {
    try {
      var f = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/Rome', weekday: 'short', hour: '2-digit', minute: '2-digit', hour12: false });
      var p = f.formatToParts(new Date());
      var map = { Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6 };
      var get = function (t) { return p.find(function (x) { return x.type === t; }).value; };
      return { day: map[get('weekday')], mins: parseInt(get('hour'), 10) * 60 + parseInt(get('minute'), 10) };
    } catch (e) { var d = new Date(); return { day: d.getDay(), mins: d.getHours() * 60 + d.getMinutes() }; }
  }
  var toMin = function (hm) { var a = hm.split(':'); return parseInt(a[0], 10) * 60 + parseInt(a[1], 10); };
  var fmt = function (m) { m = m % 1440; return ('0' + Math.floor(m / 60)).slice(-2) + ':' + ('0' + (m % 60)).slice(-2); };
  var DAYS_IT = ['domenica', 'lunedì', 'martedì', 'mercoledì', 'giovedì', 'venerdì', 'sabato'];
  var DAYS_EN = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

  function hoursState() {
    var now = romeNow();
    var wins = SITE.hours[now.day] || [];
    for (var i = 0; i < wins.length; i++) { var s = toMin(wins[i][0]), e = toMin(wins[i][1]); if (now.mins >= s && now.mins < Math.min(e, 1440)) return { open: true, day: now.day, closesAt: fmt(e) }; }
    var prev = (now.day + 6) % 7, pw = SITE.hours[prev] || [];
    for (var j = 0; j < pw.length; j++) { var pe = toMin(pw[j][1]); if (pe > 1440 && now.mins < pe - 1440) return { open: true, day: prev, closesAt: fmt(pe) }; }
    for (var k = 0; k < wins.length; k++) { if (now.mins < toMin(wins[k][0])) return { open: false, day: now.day, opensToday: fmt(toMin(wins[k][0])) }; }
    for (var d = 1; d <= 7; d++) { var nd = (now.day + d) % 7, nw = SITE.hours[nd] || []; if (nw.length) return { open: false, day: now.day, opensDay: nd, opensAt: fmt(toMin(nw[0][0])) }; }
    return { open: false, day: now.day };
  }
  function renderHours() {
    var el = document.getElementById(SITE.hoursStatusId);
    var st = hoursState();
    document.querySelectorAll(SITE.hoursTableSelector).forEach(function (row) { row.classList.toggle(SITE.todayClass, parseInt(row.getAttribute('data-day'), 10) === st.day); });
    if (!el) return;
    var en = root.lang === 'en', txt;
    if (st.open) txt = (en ? 'Open now' : 'Aperto ora') + ' · ' + (en ? 'closes at ' : 'chiude alle ') + st.closesAt;
    else if (st.opensToday) txt = (en ? 'Closed · opens today at ' : 'Chiuso · apre oggi alle ') + st.opensToday;
    else if (st.opensAt !== undefined) txt = (en ? 'Closed · opens ' + DAYS_EN[st.opensDay] + ' at ' : 'Chiuso · apre ' + DAYS_IT[st.opensDay] + ' alle ') + st.opensAt;
    else txt = en ? 'Closed' : 'Chiuso';
    el.textContent = txt;
  }
  renderHours();
  setInterval(renderHours, 60000);

  /* i18n */
  var originals = {};
  var I18N_ATTRS = [['data-i18n', null], ['data-i18n-aria', 'aria-label'], ['data-i18n-alt', 'alt'], ['data-i18n-placeholder', 'placeholder'], ['data-i18n-title', 'title']];
  function setLang(lang) {
    root.lang = lang === 'en' ? 'en' : 'it';
    I18N_ATTRS.forEach(function (pair) {
      var dattr = pair[0], target = pair[1];
      if (!originals[dattr]) originals[dattr] = {};
      document.querySelectorAll('[' + dattr + ']').forEach(function (el) {
        var key = el.getAttribute(dattr), store = originals[dattr];
        /* innerHTML, NON textContent: gli elementi tradotti contengono
           quasi sempre markup (<strong>, <br>) e con textContent il primo
           passaggio a EN lo appiattisce — tornando in italiano il grassetto
           non torna più. I valori del dizionario sono statici e scritti da
           noi. (20/7/2026: la flotta era già così, il boilerplate no.) */
        if (!(key in store)) store[key] = target ? el.getAttribute(target) : el.innerHTML;
        var val = lang === 'en' && SITE.EN[key] !== undefined ? SITE.EN[key] : store[key];
        if (target) el.setAttribute(target, val); else el.innerHTML = val;
      });
    });
    renderHours();
    try { localStorage.setItem(SITE.slug + '-lang', lang); } catch (e) {}
  }
  var langToggle = document.getElementById('langToggle');
  if (langToggle) langToggle.addEventListener('click', function () { setLang(root.lang === 'en' ? 'it' : 'en'); });
  try { if (localStorage.getItem(SITE.slug + '-lang') === 'en') setLang('en'); } catch (e) {}

  /* ══════════ FIRMA: il mosaico si compone (scale/transform → flash-safe) ══════════ */
  if (hasGsap && hasST && !reducedMotion) {
    var tessere = gsap.utils.toArray('.mosaico .tessera');
    if (tessere.length) {
      gsap.set(tessere, { scale: 0, transformOrigin: 'center' });
      gsap.to(tessere, {
        scale: 1, duration: 0.5, ease: 'back.out(1.7)', stagger: { each: 0.05, from: 'random' },
        scrollTrigger: { trigger: '.gesto', start: 'top 74%', once: true },
      });
    }
  }
})();
