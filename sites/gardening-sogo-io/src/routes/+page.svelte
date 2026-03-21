<script>
  import { browser } from '$app/environment';
  import { loadFromStorage, saveToStorage, clearWizardStorage } from '$lib/stores/wizard.js';
  import { getRecommendations } from '$lib/data/plants.js';

  // ── Wizard config ─────────────────────────────────────────────────────────

  const STEPS = [
    {
      id: 'climate',
      title: 'Where do you garden?',
      subtitle: 'Your climate shapes everything. Choose the option that best describes your region.',
      type: 'single',
      options: [
        { value: 'tropical',    emoji: '🌴', label: 'Tropical',     desc: 'Hot and humid year-round, no frost' },
        { value: 'subtropical', emoji: '☀️',  label: 'Subtropical',  desc: 'Warm winters, hot summers, rare frost' },
        { value: 'temperate',   emoji: '🍂', label: 'Temperate',    desc: 'Distinct seasons, mild winters' },
        { value: 'cool',        emoji: '❄️',  label: 'Cool / Cold',  desc: 'Cold winters, short summers, frost common' },
      ]
    },
    {
      id: 'sunlight',
      title: 'How much sun does your space get?',
      subtitle: 'Observe your garden at midday on a clear day to get an accurate reading.',
      type: 'single',
      options: [
        { value: 'full-sun',    emoji: '🌞', label: 'Full Sun',      desc: '6+ hours of direct sunlight daily' },
        { value: 'partial',     emoji: '⛅', label: 'Partial Sun',   desc: '3–6 hours of direct sunlight daily' },
        { value: 'full-shade',  emoji: '🌥️', label: 'Full Shade',    desc: 'Less than 3 hours, or indirect light only' },
      ]
    },
    {
      id: 'space',
      title: 'How much growing space do you have?',
      subtitle: "Don't worry — even a windowsill can become a productive garden.",
      type: 'single',
      options: [
        { value: 'container', emoji: '🪴', label: 'Containers / Pots', desc: 'Balcony, patio, or indoor pots' },
        { value: 'small',     emoji: '🌱', label: 'Small Bed',         desc: 'Up to 4 sq ft / 0.4 m²' },
        { value: 'medium',    emoji: '🌿', label: 'Medium Garden',     desc: '4–20 sq ft / 0.4–2 m²' },
        { value: 'large',     emoji: '🌳', label: 'Large Garden',      desc: 'Over 20 sq ft / 2+ m²' },
      ]
    },
    {
      id: 'water',
      title: 'How often can you water?',
      subtitle: "Be honest — plants do better when matched to your real routine, not your ideal one.",
      type: 'single',
      options: [
        { value: 'regular',  emoji: '💧', label: 'Regularly',     desc: 'Daily or every other day' },
        { value: 'moderate', emoji: '🚿', label: 'Occasionally',  desc: 'A couple of times per week' },
        { value: 'low',      emoji: '🏜️', label: 'Rarely',        desc: 'Once a week or less' },
      ]
    },
    {
      id: 'goals',
      title: "What's your gardening goal?",
      subtitle: 'Choose everything that applies — you can have more than one goal.',
      type: 'multi',
      options: [
        { value: 'food',             emoji: '🍽️',  label: 'Grow Food',        desc: 'Vegetables, fruit, herbs to eat' },
        { value: 'flowers',          emoji: '💐', label: 'Beautiful Flowers', desc: 'Colour, texture, seasonal interest' },
        { value: 'pollinators',      emoji: '🐝', label: 'Support Wildlife',  desc: 'Bees, butterflies, and birds' },
        { value: 'privacy',          emoji: '🌲', label: 'Privacy & Screening', desc: 'Screen fences, walls, or neighbours' },
        { value: 'low-maintenance',  emoji: '😌', label: 'Low Maintenance',   desc: 'Beautiful without a lot of effort' },
      ]
    }
  ];

  const TOTAL_STEPS = STEPS.length;

  // ── State ──────────────────────────────────────────────────────────────────

  let answers = $state(browser ? loadFromStorage() : {
    climate: '', sunlight: '', space: '', water: '', goals: []
  });

  let currentStep = $state(0);
  let showResults = $state(false);
  let animating = $state(false);

  const step = $derived(STEPS[currentStep]);
  const progress = $derived(Math.round(((currentStep) / TOTAL_STEPS) * 100));

  const currentValue = $derived(
    step.type === 'multi'
      ? answers.goals
      : answers[step.id]
  );

  const canProceed = $derived(
    step.type === 'multi'
      ? answers.goals.length > 0
      : !!answers[step.id]
  );

  const recommendations = $derived(
    showResults ? getRecommendations(answers) : []
  );

  // ── Helpers ────────────────────────────────────────────────────────────────

  function isSelected(value) {
    if (step.type === 'multi') return answers.goals.includes(value);
    return answers[step.id] === value;
  }

  function select(value) {
    if (step.type === 'multi') {
      const idx = answers.goals.indexOf(value);
      if (idx === -1) {
        answers.goals = [...answers.goals, value];
      } else {
        answers.goals = answers.goals.filter(g => g !== value);
      }
    } else {
      answers[step.id] = value;
    }
    saveToStorage(answers);
  }

  async function next() {
    if (!canProceed) return;
    animating = true;
    await tick();
    if (currentStep < TOTAL_STEPS - 1) {
      currentStep++;
    } else {
      showResults = true;
    }
    animating = false;
  }

  function back() {
    if (showResults) { showResults = false; return; }
    if (currentStep > 0) currentStep--;
  }

  function restart() {
    clearWizardStorage();
    answers = { climate: '', sunlight: '', space: '', water: '', goals: [] };
    currentStep = 0;
    showResults = false;
  }

  function matchLabel(score) {
    if (score >= 9) return 'Perfect Match';
    if (score >= 6) return 'Great Match';
    if (score >= 3) return 'Good Match';
    return 'Worth Considering';
  }

  function matchColor(score) {
    if (score >= 9) return 'bg-garden-100 text-garden-800 border-garden-300';
    if (score >= 6) return 'bg-emerald-50 text-emerald-700 border-emerald-200';
    if (score >= 3) return 'bg-amber-50 text-amber-700 border-amber-200';
    return 'bg-stone-100 text-stone-600 border-stone-200';
  }

  function difficultyColor(d) {
    if (d === 'beginner')     return 'bg-green-100 text-green-700';
    if (d === 'intermediate') return 'bg-amber-100 text-amber-700';
    return 'bg-red-100 text-red-700';
  }

  // Svelte 5 tick equivalent
  function tick() {
    return new Promise(r => setTimeout(r, 0));
  }
</script>

<svelte:head>
  <title>Plant Wizard — Gardening by Sogo</title>
</svelte:head>

<!-- ── Header ────────────────────────────────────────────────────────────── -->
<header class="border-b border-stone-200 bg-white/80 backdrop-blur sticky top-0 z-10">
  <div class="mx-auto flex max-w-3xl items-center justify-between px-4 py-3">
    <div class="flex items-center gap-2">
      <span class="text-2xl">🌱</span>
      <span class="font-bold text-garden-800 text-lg tracking-tight">Gardening <span class="text-stone-400 font-normal">by</span> Sogo</span>
    </div>
    {#if !showResults && currentStep > 0}
      <button onclick={restart} class="text-sm text-stone-400 hover:text-stone-600 transition-colors">
        Start over
      </button>
    {/if}
  </div>
</header>

<main class="mx-auto max-w-3xl px-4 py-8 pb-24">

  {#if !showResults}
    <!-- ── Progress bar ──────────────────────────────────────────────────── -->
    <div class="mb-8">
      <div class="mb-2 flex items-center justify-between text-sm text-stone-500">
        <span>Step {currentStep + 1} of {TOTAL_STEPS}</span>
        <span>{progress}% complete</span>
      </div>
      <div class="h-2 w-full overflow-hidden rounded-full bg-stone-200">
        <div
          class="h-full rounded-full bg-gradient-to-r from-garden-500 to-garden-400 transition-all duration-500"
          style="width: {progress}%"
        ></div>
      </div>
      <div class="mt-3 flex gap-1.5">
        {#each STEPS as s, i}
          <div
            class="h-1.5 flex-1 rounded-full transition-all duration-300 {i < currentStep ? 'bg-garden-500' : i === currentStep ? 'bg-garden-300' : 'bg-stone-200'}"
          ></div>
        {/each}
      </div>
    </div>

    <!-- ── Step heading ──────────────────────────────────────────────────── -->
    <div class="mb-6">
      <h1 class="text-2xl font-bold text-stone-900 sm:text-3xl">{step.title}</h1>
      <p class="mt-1.5 text-stone-500">{step.subtitle}</p>
      {#if step.type === 'multi'}
        <p class="mt-1 text-xs font-medium text-garden-600 uppercase tracking-wide">Select all that apply</p>
      {/if}
    </div>

    <!-- ── Option cards ──────────────────────────────────────────────────── -->
    <div class="grid gap-3 {step.options.length <= 3 ? 'grid-cols-1 sm:grid-cols-3' : 'grid-cols-1 sm:grid-cols-2'}">
      {#each step.options as opt}
        <button
          class="wizard-card {isSelected(opt.value) ? 'selected' : ''}"
          onclick={() => select(opt.value)}
          aria-pressed={isSelected(opt.value)}
        >
          <div class="flex items-start gap-3">
            <span class="text-3xl leading-none mt-0.5">{opt.emoji}</span>
            <div>
              <div class="flex items-center gap-2">
                <span class="font-semibold text-stone-800">{opt.label}</span>
                {#if isSelected(opt.value)}
                  <span class="flex h-5 w-5 items-center justify-center rounded-full bg-garden-500">
                    <svg class="h-3 w-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                {/if}
              </div>
              <p class="text-sm text-stone-500 mt-0.5">{opt.desc}</p>
            </div>
          </div>
        </button>
      {/each}
    </div>

    <!-- ── Navigation ────────────────────────────────────────────────────── -->
    <div class="mt-8 flex items-center justify-between">
      <button
        onclick={back}
        class="btn-secondary {currentStep === 0 ? 'invisible' : ''}"
      >
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back
      </button>

      <button
        onclick={next}
        disabled={!canProceed}
        class="btn-primary"
      >
        {currentStep < TOTAL_STEPS - 1 ? 'Next' : 'See My Plants'}
        <svg class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>

  {:else}
    <!-- ── Results ───────────────────────────────────────────────────────── -->

    <!-- Summary pill row -->
    <div class="mb-6 flex flex-wrap gap-2">
      {#each [
        { label: answers.climate },
        { label: answers.sunlight },
        { label: answers.space },
        { label: answers.water },
        ...answers.goals.map(g => ({ label: g }))
      ] as tag}
        <span class="rounded-full border border-garden-200 bg-garden-50 px-3 py-1 text-xs font-medium text-garden-700 capitalize">
          {tag.label.replace('-', ' ')}
        </span>
      {/each}
    </div>

    <div class="mb-8">
      <h1 class="text-2xl font-bold text-stone-900 sm:text-3xl">
        Your plant recommendations 🌿
      </h1>
      <p class="mt-1.5 text-stone-500">
        We found <strong class="text-stone-700">{recommendations.length} plants</strong> suited to your {answers.climate} climate.
        Sorted by how well they match your preferences.
      </p>
    </div>

    <div class="grid gap-4">
      {#each recommendations as { plant, score }, i}
        <div class="rounded-2xl border border-stone-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md">
          <div class="flex items-start gap-4">
            <!-- Emoji -->
            <div class="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-stone-50 text-3xl border border-stone-100">
              {plant.emoji}
            </div>

            <div class="min-w-0 flex-1">
              <!-- Top row: name + badges -->
              <div class="flex flex-wrap items-center gap-2 mb-1">
                <h2 class="font-bold text-stone-900 text-lg leading-tight">{plant.name}</h2>
                <span class="rounded-full border px-2.5 py-0.5 text-xs font-semibold {matchColor(score)}">
                  {matchLabel(score)}
                </span>
                <span class="rounded-full px-2.5 py-0.5 text-xs font-medium capitalize {difficultyColor(plant.difficulty)}">
                  {plant.difficulty}
                </span>
              </div>

              <!-- Description -->
              <p class="text-stone-500 text-sm leading-relaxed mb-3">{plant.description}</p>

              <!-- Goals tags -->
              <div class="flex flex-wrap gap-1.5 mb-3">
                {#each plant.goals as goal}
                  <span class="rounded-full bg-stone-100 px-2 py-0.5 text-xs text-stone-600 capitalize">
                    {goal.replace('-', ' ')}
                  </span>
                {/each}
              </div>

              <!-- Tip + harvest time -->
              <div class="rounded-xl bg-amber-50 border border-amber-100 p-3 flex gap-2">
                <span class="text-lg flex-shrink-0">💡</span>
                <div>
                  <p class="text-xs font-semibold text-amber-800 mb-0.5">Pro tip</p>
                  <p class="text-xs text-amber-700 leading-relaxed">{plant.tip}</p>
                </div>
              </div>

              {#if plant.harvestTime}
                <p class="mt-2 text-xs text-stone-400">
                  <span class="font-medium text-stone-500">Timeline:</span> {plant.harvestTime}
                </p>
              {/if}
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- CTA -->
    <div class="mt-10 rounded-2xl bg-garden-700 p-6 text-center text-white">
      <p class="text-2xl mb-1">🌱</p>
      <h3 class="font-bold text-lg mb-1">Ready to get growing?</h3>
      <p class="text-garden-200 text-sm mb-4">Your answers are saved — come back any time to revisit your recommendations.</p>
      <button onclick={restart} class="rounded-xl bg-white px-6 py-2.5 text-sm font-semibold text-garden-800 hover:bg-garden-50 transition-colors">
        Start a new search
      </button>
    </div>
  {/if}
</main>
