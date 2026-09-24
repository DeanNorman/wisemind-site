/**
 * WiseMind · Body First, Words Second
 * Interactive Controller: 3D Fanned Deck, Somatic Switcher, DBT Tabs,
 * Meeting Filters, FAQ Accordion, Vagal Tone Simulator, and Crisis Modals.
 */

document.addEventListener('DOMContentLoaded', () => {
  initScrollAnimations();
  initFannedDeck();
  initSomaticSwitcher();
  initDbtSkillTabs();
  initMeetingFilters();
  initFaqAccordion();
  initBreathingSimulator();
  initCrisisModal();
  initMobileMenu();
});

/* ==========================================================================
   1. SCROLL REVEALS & TAGLINE LIGHTING
   ========================================================================== */
function initScrollAnimations() {
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach((el) => observer.observe(el));

    // Tagline progressive word lighting
    const taglineWords = document.querySelectorAll('.tagline-word');
    const taglineContainer = document.getElementById('tagline-container');

    if (taglineContainer && taglineWords.length > 0) {
      const taglineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            taglineWords.forEach((word, index) => {
              setTimeout(() => {
                word.classList.add('active');
              }, index * 90);
            });
          }
        });
      }, { threshold: 0.35 });

      taglineObserver.observe(taglineContainer);
    }
  } else {
    // Fallback if IntersectionObserver unsupported
    revealElements.forEach((el) => el.classList.add('is-revealed'));
    document.querySelectorAll('.tagline-word').forEach((w) => w.classList.add('active'));
  }
}

/* ==========================================================================
   2. HERO 3D PERSPECTIVE FANNED DECK CONTROLLER
   ========================================================================== */
function initFannedDeck() {
  const cardBreathing = document.getElementById('deck-card-breathing');
  const cardSanctuary = document.getElementById('deck-card-sanctuary');
  const cardMeetings = document.getElementById('deck-card-meetings');

  const tabBreathing = document.getElementById('tab-deck-breathing');
  const tabSanctuary = document.getElementById('tab-deck-sanctuary');
  const tabMeetings = document.getElementById('tab-deck-meetings');

  if (!cardBreathing || !cardSanctuary || !cardMeetings) return;

  const cards = [cardSanctuary, cardBreathing, cardMeetings];
  const tabs = [tabSanctuary, tabBreathing, tabMeetings];

  // Positions configurations
  // 0: Sanctuary spotlighted (default matching reference)
  // 1: Breathing spotlighted
  // 2: Meetings spotlighted
  function setDeckFocus(index) {
    // Reset tabs
    tabs.forEach((tab, i) => {
      if (!tab) return;
      if (i === index) {
        tab.className = 'deck-tab-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-white text-brand-ocean shadow-md transition-all';
      } else {
        tab.className = 'deck-tab-btn px-4 py-1.5 rounded-full text-xs font-semibold bg-white/20 text-white hover:bg-white/30 border border-white/30 backdrop-blur-md transition-all';
      }
    });

    if (index === 0) {
      // Sanctuary center spotlight (Default Cascade)
      cardSanctuary.style.transform = 'translate(0%, 0%) rotate(1deg)';
      cardSanctuary.style.zIndex = '25';
      cardSanctuary.style.opacity = '1';

      cardBreathing.style.transform = 'translate(24%, -4%) rotate(7deg)';
      cardBreathing.style.zIndex = '10';
      cardBreathing.style.opacity = '0.94';

      cardMeetings.style.transform = 'translate(-30%, 14%) rotate(-6deg)';
      cardMeetings.style.zIndex = '15';
      cardMeetings.style.opacity = '0.94';

    } else if (index === 1) {
      // Breathing center spotlight
      cardBreathing.style.transform = 'translate(0%, 0%) rotate(0deg)';
      cardBreathing.style.zIndex = '25';
      cardBreathing.style.opacity = '1';

      cardSanctuary.style.transform = 'translate(-24%, 6%) rotate(-5deg)';
      cardSanctuary.style.zIndex = '15';
      cardSanctuary.style.opacity = '0.92';

      cardMeetings.style.transform = 'translate(30%, 14%) rotate(6deg)';
      cardMeetings.style.zIndex = '10';
      cardMeetings.style.opacity = '0.88';

    } else if (index === 2) {
      // Meetings center spotlight
      cardMeetings.style.transform = 'translate(0%, 0%) rotate(0deg)';
      cardMeetings.style.zIndex = '25';
      cardMeetings.style.opacity = '1';

      cardSanctuary.style.transform = 'translate(24%, -4%) rotate(6deg)';
      cardSanctuary.style.zIndex = '15';
      cardSanctuary.style.opacity = '0.92';

      cardBreathing.style.transform = 'translate(-28%, 10%) rotate(-7deg)';
      cardBreathing.style.zIndex = '10';
      cardBreathing.style.opacity = '0.88';
    }
  }

  // Click card to focus
  cardSanctuary.addEventListener('click', () => setDeckFocus(0));
  cardBreathing.addEventListener('click', () => setDeckFocus(1));
  cardMeetings.addEventListener('click', () => setDeckFocus(2));

  // Click tab to focus
  if (tabSanctuary) tabSanctuary.addEventListener('click', () => setDeckFocus(0));
  if (tabBreathing) tabBreathing.addEventListener('click', () => setDeckFocus(1));
  if (tabMeetings) tabMeetings.addEventListener('click', () => setDeckFocus(2));
}

/* ==========================================================================
   3. SOMATIC TOOLS INTERACTIVE SWITCHER
   ========================================================================== */
function initSomaticSwitcher() {
  const cards = document.querySelectorAll('.tool-switcher-card');
  const displayImg = document.getElementById('tool-display-img');
  const indicator = document.getElementById('tool-indicator-badge');

  if (!cards.length || !displayImg) return;

  const toolData = {
    breathing: {
      img: 'light/20-breathing-running.png',
      badge: 'Paced Breathing Active · 4 4 6 Cycle',
    },
    urge: {
      img: 'light/24-urge-running.png',
      badge: 'Urge Surfing Active · Wave Observation',
    },
    cold: {
      img: 'light/28-cold-countdown.png',
      badge: 'Cold Immersion Active · Dive Reflex',
    }
  };

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      const toolKey = card.getAttribute('data-tool');
      if (!toolData[toolKey]) return;

      // Update button styling
      cards.forEach((c) => {
        c.className = 'tool-switcher-card w-full text-left p-6 rounded-3xl border border-border-subtle bg-white hover:border-brand-ocean/40 transition-all cursor-pointer relative';
        const numBadge = c.querySelector('span.font-mono');
        if (numBadge) numBadge.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-border-strong text-text-ink';
        const iconContainer = c.querySelector('.shrink-0');
        if (iconContainer) iconContainer.className = 'w-10 h-10 rounded-full bg-bg-surface-subtle text-text-muted flex items-center justify-center shrink-0';
      });

      card.className = 'tool-switcher-card w-full text-left p-6 rounded-3xl border-2 border-brand-ocean bg-brand-ocean-soft/40 transition-all cursor-pointer relative';
      const activeNum = card.querySelector('span.font-mono');
      if (activeNum) activeNum.className = 'px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-brand-ocean text-white';
      const activeIcon = card.querySelector('.shrink-0');
      if (activeIcon) activeIcon.className = 'w-10 h-10 rounded-full bg-brand-ocean text-white flex items-center justify-center shrink-0';

      // Crossfade preview image
      displayImg.style.opacity = '0';
      setTimeout(() => {
        displayImg.src = toolData[toolKey].img;
        if (indicator) indicator.textContent = toolData[toolKey].badge;
        displayImg.style.opacity = '1';
      }, 160);
    });
  });
}

/* ==========================================================================
   4. DBT SKILL TABS & WALKTHROUGHS
   ========================================================================== */
function initDbtSkillTabs() {
  const tabs = document.querySelectorAll('.skill-tab-btn');
  const panel = document.getElementById('skill-content-panel');
  const displayImg = document.getElementById('skill-display-img');

  if (!tabs.length || !panel || !displayImg) return;

  const skillInfo = {
    stop: {
      tag: 'The Golden Standard Protocol',
      title: 'The STOP Skill',
      desc: 'When an emotional reaction feels sudden and overwhelming, STOP puts space between impulse and action. Do not react. Do not speak. Stand perfectly still.',
      img: 'light/08-skill-stop.png',
      steps: [
        { letter: 'S', title: 'Stop immediately', text: 'Freeze your body. Do not move a muscle. Do not let feelings push you into impulsive speech or behavior.' },
        { letter: 'T', title: 'Take a step back', text: 'Physically step backward or uncross your hands. Take a deep, measured breath to break the automatic impulse loop.' },
        { letter: 'O', title: 'Observe without judgment', text: 'Notice what is happening inside your physical body and in the room around you without judging it good or bad.' },
        { letter: 'P', title: 'Proceed with intention', text: 'Ask what choice will make the situation better rather than worse. Act from clarity.' }
      ]
    },
    tipp: {
      tag: 'High Distress Tolerance Protocol',
      title: 'TIPP Physical Reset',
      desc: 'When emotional distress reaches an emergency level (above 7 out of 10), cognitive skills will not work. TIPP changes your body chemistry immediately.',
      img: 'light/10-skill-tipp-practice-cta.png',
      steps: [
        { letter: 'T', title: 'Temperature change', text: 'Apply cold water to the eyes and cheekbones for 30 seconds to stimulate the mammalian dive reflex.' },
        { letter: 'I', title: 'Intense physical exertion', text: 'Engage in 5 minutes of brief, intense physical movement like brisk pacing or jumping jacks to metabolize excess adrenaline.' },
        { letter: 'P', title: 'Paced breathing', text: 'Breathe deeply into the abdomen. Inhale for 4 seconds, and exhale slowly for 6 to 8 seconds.' },
        { letter: 'P', title: 'Paired muscle relaxation', text: 'Tense each muscle group on inhalation, then consciously release all tension upon exhalation.' }
      ]
    },
    wisemind: {
      tag: 'Dialectical Equilibrium',
      title: 'Wise Mind Synthesis',
      desc: 'Wise Mind is the synthesis between Emotional Mind and Reasonable Mind. It is the place of deep, intuitive knowing where values and evidence align.',
      img: 'light/11-skill-wise-mind-checkin-destination.png',
      steps: [
        { letter: '01', title: 'Acknowledge Emotional Mind', text: 'Notice the feelings, desires, and subjective impulses without attempting to suppress them.' },
        { letter: '02', title: 'Engage Reasonable Mind', text: 'Identify the verifiable facts, logistical constraints, and objective realities of the current moment.' },
        { letter: '03', title: 'Locate the Overlap', text: 'Step back and ask yourself: In the center of my chest and belly, what is the quiet, true response?' },
        { letter: '04', title: 'Record Daily Check In', text: 'Log your balance level in local storage to build ongoing pattern awareness over time.' }
      ]
    },
    crisis: {
      tag: 'Survival Intervention',
      title: 'Surviving a Crisis',
      desc: 'Distress tolerance skills are not designed to resolve long term problems. They are designed for one vital purpose: surviving the crisis without making it worse.',
      img: 'light/06-skills-filter-surviving-a-crisis.png',
      steps: [
        { letter: '01', title: 'Accept the moment as it is', text: 'Fighting reality multiplies suffering. Acknowledge that the crisis is here right now.' },
        { letter: '02', title: 'Distract with healthy action', text: 'Shift sensory focus away from the urge onto an absorbing, non destructive task.' },
        { letter: '03', title: 'Self soothe through 5 senses', text: 'Engage vision, touch, sound, smell, or taste to signal neurological safety.' },
        { letter: '04', title: 'Reach out to fellowship', text: 'Call an AA or NA contact, attend a Cape Town meeting, or open crisis chat.' }
      ]
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener('click', () => {
      const skillKey = tab.getAttribute('data-skill');
      const data = skillInfo[skillKey];
      if (!data) return;

      // Update Tab Styles
      tabs.forEach((t) => {
        t.className = 'skill-tab-btn px-5 py-2.5 rounded-full text-xs font-bold transition-all bg-bg-surface-subtle text-text-muted hover:text-text-ink';
      });
      tab.className = 'skill-tab-btn active px-5 py-2.5 rounded-full text-xs font-bold transition-all bg-brand-ocean text-white';

      // Update Panel Content
      const stepsHtml = data.steps.map((s) => `
        <div class="flex items-start gap-4 relative z-10">
          <div class="w-6 h-6 rounded-full bg-brand-ocean text-white text-xs font-bold flex items-center justify-center shrink-0">${s.letter}</div>
          <div>
            <h4 class="font-bold text-text-ink text-sm">${s.title}</h4>
            <p class="text-xs text-text-muted">${s.text}</p>
          </div>
        </div>
      `).join('');

      panel.innerHTML = `
        <div class="space-y-4">
          <span class="text-xs font-mono uppercase tracking-widest text-brand-ocean font-bold">${data.tag}</span>
          <h3 class="text-3xl font-bold text-text-ink">${data.title}</h3>
          <p class="text-base text-text-body leading-relaxed">${data.desc}</p>
        </div>
        <div class="timeline-track space-y-4 pt-2">
          ${stepsHtml}
        </div>
        <div class="pt-4 flex items-center gap-4">
          <a href="#human-side" class="text-xs font-bold text-brand-ocean underline underline-offset-4 hover:text-brand-ocean-light">
            Find a local DBT practice group in Cape Town →
          </a>
        </div>
      `;

      // Update phone screenshot
      displayImg.style.opacity = '0';
      setTimeout(() => {
        displayImg.src = data.img;
        displayImg.style.opacity = '1';
      }, 160);
    });
  });
}

/* ==========================================================================
   5. CAPE TOWN & ONLINE MEETINGS FILTER
   ========================================================================== */
function initMeetingFilters() {
  const filterBtns = document.querySelectorAll('.meeting-filter-btn');
  const cards = document.querySelectorAll('.meeting-card');

  if (!filterBtns.length || !cards.length) return;

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      const filter = btn.getAttribute('data-filter');

      // Update Button Styles
      filterBtns.forEach((b) => {
        b.className = 'meeting-filter-btn px-4 py-2 rounded-full text-xs font-bold bg-white text-text-muted hover:text-text-ink border border-border-subtle transition-all';
      });
      btn.className = 'meeting-filter-btn active px-4 py-2 rounded-full text-xs font-bold bg-brand-ocean text-white shadow-sm transition-all';

      // Filter Cards
      cards.forEach((card) => {
        const type = card.getAttribute('data-type');
        if (filter === 'all' || type === filter) {
          card.style.display = 'block';
          card.classList.add('reveal-on-scroll', 'is-revealed');
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* ==========================================================================
   6. EDITORIAL FAQ ACCORDION
   ========================================================================== */
function initFaqAccordion() {
  const toggles = document.querySelectorAll('.faq-toggle');

  toggles.forEach((toggle) => {
    toggle.addEventListener('click', () => {
      const parent = toggle.closest('.faq-item');
      if (!parent) return;

      const answer = parent.querySelector('.faq-answer');
      const icon = toggle.querySelector('.faq-icon');

      if (!answer) return;

      const isHidden = answer.classList.contains('hidden');

      // Close other accordions
      document.querySelectorAll('.faq-item').forEach((item) => {
        if (item !== parent) {
          const otherAns = item.querySelector('.faq-answer');
          const otherIcon = item.querySelector('.faq-icon');
          if (otherAns) otherAns.classList.add('hidden');
          if (otherIcon) otherIcon.textContent = '+';
        }
      });

      if (isHidden) {
        answer.classList.remove('hidden');
        if (icon) icon.textContent = '−';
      } else {
        answer.classList.add('hidden');
        if (icon) icon.textContent = '+';
      }
    });
  });
}

/* ==========================================================================
   7. LIVE 4 4 6 BREATHING PRACTICE SIMULATOR
   ========================================================================== */
function initBreathingSimulator() {
  const modal = document.getElementById('breathing-modal');
  const openBtns = [
    document.getElementById('open-breathing-pill'),
    document.getElementById('open-breathing-interactive'),
    document.getElementById('open-breathing-mobile'),
    document.getElementById('final-breathing-trigger')
  ];
  const closeBtn = document.getElementById('close-breathing-modal');
  const startBtn = document.getElementById('start-breath-btn');
  const stopBtn = document.getElementById('stop-breath-btn');

  const circle = document.getElementById('breath-circle');
  const phaseText = document.getElementById('breath-phase-text');
  const counterText = document.getElementById('breath-second-counter');

  if (!modal || !circle || !phaseText) return;

  let timerInterval = null;
  let isRunning = false;

  function openModal() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    stopCycle();
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openBtns.forEach((btn) => {
    if (btn) btn.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });

  function startCycle() {
    if (isRunning) return;
    isRunning = true;
    startBtn.classList.add('hidden');
    stopBtn.classList.remove('hidden');

    let currentPhase = 'inhale'; // inhale (4s) -> hold (4s) -> exhale (6s)
    let secondsLeft = 4;

    function tick() {
      if (currentPhase === 'inhale') {
        phaseText.textContent = 'Inhale';
        circle.style.transform = 'scale(1.35)';
        circle.className = 'w-32 h-32 rounded-full bg-gradient-to-tr from-brand-ocean to-emerald-600 shadow-xl flex items-center justify-center text-white transition-all duration-1000 ease-in-out';
        counterText.textContent = `Breathe in slowly (${secondsLeft}s)`;
        
        secondsLeft--;
        if (secondsLeft < 0) {
          currentPhase = 'hold';
          secondsLeft = 4;
        }
      } else if (currentPhase === 'hold') {
        phaseText.textContent = 'Hold';
        circle.style.transform = 'scale(1.35)';
        circle.className = 'w-32 h-32 rounded-full bg-gradient-to-tr from-amber-600 to-amber-500 shadow-xl flex items-center justify-center text-white transition-all duration-1000 ease-in-out';
        counterText.textContent = `Hold lungs gently (${secondsLeft}s)`;
        
        secondsLeft--;
        if (secondsLeft < 0) {
          currentPhase = 'exhale';
          secondsLeft = 6;
        }
      } else if (currentPhase === 'exhale') {
        phaseText.textContent = 'Exhale';
        circle.style.transform = 'scale(1.0)';
        circle.className = 'w-32 h-32 rounded-full bg-gradient-to-tr from-brand-ocean to-brand-ocean-light shadow-xl flex items-center justify-center text-white transition-all duration-1000 ease-in-out';
        counterText.textContent = `Slow exhale through lips (${secondsLeft}s)`;
        
        secondsLeft--;
        if (secondsLeft < 0) {
          currentPhase = 'inhale';
          secondsLeft = 4;
        }
      }
    }

    tick();
    timerInterval = setInterval(tick, 1000);
  }

  function stopCycle() {
    isRunning = false;
    clearInterval(timerInterval);
    timerInterval = null;
    circle.style.transform = 'scale(1.0)';
    phaseText.textContent = 'Ready';
    counterText.textContent = 'Click start below';
    startBtn.classList.remove('hidden');
    stopBtn.classList.add('hidden');
  }

  if (startBtn) startBtn.addEventListener('click', startCycle);
  if (stopBtn) stopBtn.addEventListener('click', stopCycle);
}

/* ==========================================================================
   8. CRISIS SUPPORT MODAL CONTROLLER
   ========================================================================== */
function initCrisisModal() {
  const modal = document.getElementById('crisis-modal');
  const openBtns = [
    document.getElementById('open-crisis-top'),
    document.getElementById('open-crisis-nav'),
    document.getElementById('hero-crisis-btn')
  ];
  const closeBtn = document.getElementById('close-crisis-modal');

  if (!modal) return;

  function openModal() {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }

  openBtns.forEach((btn) => {
    if (btn) btn.addEventListener('click', openModal);
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
      closeModal();
    }
  });
}

/* ==========================================================================
   9. MOBILE NAVIGATION MENU TOGGLE
   ========================================================================== */
function initMobileMenu() {
  const btn = document.getElementById('mobile-menu-btn');
  const menu = document.getElementById('mobile-menu');
  const links = document.querySelectorAll('.mobile-nav-link');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isExpanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', !isExpanded);
    menu.classList.toggle('hidden');
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      menu.classList.add('hidden');
      btn.setAttribute('aria-expanded', 'false');
    });
  });
}
