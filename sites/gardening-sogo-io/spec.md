# 🌱 Gardening by Sogo — Product Spec

> *A step-by-step garden wizard that helps you discover the perfect herbs and flowers for your new home.*

---

## 1. Project Overview & Purpose

**Gardening by Sogo** is a friendly, guided web app that walks you through a series of questions about your garden — climate, sunlight, space, watering habits, and goals — then recommends specific herbs and flowers tailored to your answers.

The app lives at **gardening.sogos.io** and is built as a lightweight static site, deployed through the existing homelab GitOps pipeline (Argo CD → Kubernetes → Cloudflare Tunnel).

### Why this exists

Moving into a new house is exciting — and one of the best parts is imagining what the garden could become. This tool takes the guesswork out of *"what should I plant?"* and replaces it with personalised, encouraging recommendations. It's designed as a gift: a little corner of the internet that says *"let's make this new place bloom together."*

---

## 2. Target User

**Primary user:** Your wife — a new homeowner excited to start a garden but maybe unsure where to begin.

**Assumptions about her:**
- She may or may not have gardening experience (the app should work for both beginners and anyone with a green thumb)
- She wants practical, trustworthy recommendations — not an overwhelming encyclopaedia
- She values beauty, warmth, and encouragement over technical jargon
- She'll access it on her phone while walking around the yard, or on a laptop while planning

**Tone:** Warm, personal, and gently encouraging. Like a knowledgeable friend saying *"You're going to love growing this."* Never clinical, never condescending. The app should feel like a hug, not a textbook.

---

## 3. Wizard Flow

The wizard is a **5-step linear questionnaire** followed by a **results/recommendation screen**. Each step asks one question with clear, emoji-illustrated options. Progress is shown via a bar and step indicators.

### Step 1 — Climate / Region
> *"Where do you garden?"*

| Option | Description |
|---|---|
| 🌴 Tropical | Hot and humid year-round, no frost |
| ☀️ Subtropical | Warm winters, hot summers, rare frost |
| 🍂 Temperate | Distinct seasons, mild winters |
| ❄️ Cool / Cold | Cold winters, short summers, frost common |

**Selection type:** Single choice
**Purpose:** Hard filter — only plants suited to the selected climate appear in results.

### Step 2 — Sunlight
> *"How much sun does your space get?"*

| Option | Description |
|---|---|
| 🌞 Full Sun | 6+ hours of direct sunlight daily |
| ⛅ Partial Sun | 3–6 hours of direct sunlight daily |
| 🌥️ Full Shade | Less than 3 hours, or indirect light only |

**Selection type:** Single choice
**Purpose:** Major scoring factor (+2 points on match).

### Step 3 — Growing Space
> *"How much growing space do you have?"*

| Option | Description |
|---|---|
| 🪴 Containers / Pots | Balcony, patio, or indoor pots |
| 🌱 Small Bed | Up to 4 sq ft / 0.4 m² |
| 🌿 Medium Garden | 4–20 sq ft / 0.4–2 m² |
| 🌳 Large Garden | Over 20 sq ft / 2+ m² |

**Selection type:** Single choice
**Purpose:** Major scoring factor (+2 points on match).

### Step 4 — Watering Commitment
> *"How often can you water?"*

| Option | Description |
|---|---|
| 💧 Regularly | Daily or every other day |
| 🚿 Occasionally | A couple of times per week |
| 🏜️ Rarely | Once a week or less |

**Selection type:** Single choice
**Purpose:** Minor scoring factor (+1 point on match).

### Step 5 — Gardening Goals
> *"What's your gardening goal?"*

| Option | Description |
|---|---|
| 🍽️ Grow Food | Vegetables, fruit, herbs to eat |
| 💐 Beautiful Flowers | Colour, texture, seasonal interest |
| 🐝 Support Wildlife | Bees, butterflies, and birds |
| 🌲 Privacy & Screening | Screen fences, walls, or neighbours |
| 😌 Low Maintenance | Beautiful without a lot of effort |

**Selection type:** Multi-select (one or more)
**Purpose:** High-impact scoring factor (+2 points per matching goal).

### Results Screen
> *"Your plant recommendations 🌿"*

Displays:
- **Summary pills** — the user's selected answers shown as tags
- **Plant count** — e.g. *"We found 12 plants suited to your temperate climate"*
- **Plant cards** — sorted by match score (highest first), each showing:
  - Emoji, name, match quality badge, difficulty badge
  - Description
  - Goal tags
  - Pro tip (in a warm amber callout)
  - Timeline / harvest info
- **CTA** — *"Ready to get growing?"* with option to start a new search

---

## 4. Recommendation Logic

### Filtering
**Climate is a hard filter.** If a plant doesn't list the user's selected climate, it is excluded entirely. All remaining logic is scoring-based.

### Scoring Algorithm
Each plant that passes the climate filter receives a score based on how well it matches the remaining answers:

| Criterion | Points | Condition |
|---|---|---|
| Sunlight | +2 | Plant's `sunlight` array includes user's selection |
| Space | +2 | Plant's `space` array includes user's selection |
| Water | +1 | Plant's `water` array includes user's selection |
| Goals | +2 each | Per matching goal between plant's `goals` and user's selections |

**Maximum possible score:** 2 (sun) + 2 (space) + 1 (water) + 10 (5 goals × 2) = **15**

### Match Quality Labels
| Score | Label |
|---|---|
| 9+ | ✨ Perfect Match |
| 6–8 | 🌟 Great Match |
| 3–5 | 👍 Good Match |
| 0–2 | 🤔 Worth Considering |

### Sort Order
Results are sorted by score descending. All climate-compatible plants are always shown (no cutoff), so the user can browse everything available.

---

## 5. Plant Catalog

The catalog currently contains **18 plants** — a curated mix of herbs, flowers, edibles, and ornamentals. Each plant has the following data shape:

```js
{
  id: string,           // unique slug
  name: string,         // display name
  emoji: string,        // visual identifier
  description: string,  // warm, encouraging 1–2 sentence description
  difficulty: 'beginner' | 'intermediate' | 'advanced',
  climate: Climate[],   // which climates it thrives in
  sunlight: Sunlight[], // sun requirements
  space: Space[],       // minimum space needed
  water: Water[],       // watering frequency
  goals: Goal[],        // what gardening goals it serves
  tip: string,          // one practical pro tip
  harvestTime: string,  // when to expect results
}
```

### Current Plant List

#### 🌿 Herbs
| Plant | Difficulty | Climate | Sun | Water | Goals |
|---|---|---|---|---|---|
| 🌿 Basil | Beginner | Temperate, Subtropical, Tropical | Full Sun | Regular | Food |
| 💜 Lavender | Beginner | Temperate, Subtropical | Full Sun | Low | Flowers, Pollinators, Low-Maintenance |
| 🌿 Rosemary | Beginner | Subtropical, Temperate | Full Sun | Low | Food, Pollinators, Low-Maintenance |

#### 🌸 Flowers & Ornamentals
| Plant | Difficulty | Climate | Sun | Water | Goals |
|---|---|---|---|---|---|
| 🌻 Sunflowers | Beginner | Temperate, Subtropical | Full Sun | Moderate/Low | Flowers, Pollinators |
| 🌸 Echinacea | Beginner | Cool, Temperate | Full Sun/Partial | Low/Moderate | Flowers, Pollinators, Low-Maintenance |
| 🌱 Hostas | Beginner | Cool, Temperate | Full Shade/Partial | Moderate/Regular | Flowers, Low-Maintenance |
| 🌺 Hellebores | Beginner | Cool, Temperate | Full Shade/Partial | Moderate/Low | Flowers, Low-Maintenance |
| 🪴 Succulents | Beginner | Subtropical, Tropical, Temperate | Full Sun/Partial | Low | Flowers, Low-Maintenance |
| 🌾 Ornamental Grasses | Beginner | Cool, Temperate, Subtropical | Full Sun/Partial | Low/Moderate | Flowers, Low-Maintenance, Privacy |
| 🌿 Ferns | Beginner | Cool, Temperate, Subtropical | Full Shade/Partial | Regular/Moderate | Low-Maintenance |

#### 🍅 Edibles
| Plant | Difficulty | Climate | Sun | Water | Goals |
|---|---|---|---|---|---|
| 🍅 Tomatoes | Intermediate | Temperate, Subtropical | Full Sun | Regular | Food |
| 🥬 Lettuce | Beginner | Cool, Temperate | Full Sun/Partial | Regular/Moderate | Food, Low-Maintenance |
| 🌶️ Chillies | Intermediate | Subtropical, Tropical, Temperate | Full Sun | Moderate/Regular | Food |
| 🍓 Strawberries | Beginner | Cool, Temperate | Full Sun/Partial | Regular | Food, Flowers |
| 🥒 Zucchini | Beginner | Temperate, Subtropical | Full Sun | Regular | Food, Pollinators |
| 🎃 Pumpkins | Intermediate | Temperate, Subtropical | Full Sun | Regular/Moderate | Food |
| 🥦 Kale | Beginner | Cool, Temperate | Full Sun/Partial | Moderate/Regular | Food, Low-Maintenance |

#### 🎋 Structural / Privacy
| Plant | Difficulty | Climate | Sun | Water | Goals |
|---|---|---|---|---|---|
| 🎋 Clumping Bamboo | Beginner | Subtropical, Tropical, Temperate | Full Sun/Partial | Moderate | Privacy, Low-Maintenance |

### Plants to Add (Future Catalog Expansion)

**Herbs:**
- Mint (beginner, spreads aggressively — note container recommendation)
- Thyme (beginner, drought-tolerant ground cover)
- Parsley (beginner, biennial)
- Chives (beginner, perennial, edible flowers)
- Dill (beginner, attracts beneficial insects)
- Coriander / Cilantro (beginner, bolts quickly in heat)
- Sage (beginner, Mediterranean, beautiful purple flowers)
- Oregano (beginner, sprawling perennial)
- Lemongrass (beginner, subtropical/tropical, mosquito-repelling)

**Flowers:**
- Marigolds (beginner, pest-deterrent companion plant)
- Zinnias (beginner, cut-and-come-again)
- Cosmos (beginner, airy, pollinator magnet)
- Dahlias (intermediate, stunning cut flowers)
- Roses (intermediate, classic garden staple)
- Sweet Peas (beginner, fragrant climbing annual)
- Hydrangeas (beginner, shade-tolerant shrub)
- Black-Eyed Susans / Rudbeckia (beginner, native wildflower)
- Chrysanthemums (beginner, autumn colour)

**Additional Edibles:**
- Beans / Runner Beans (beginner, vertical growing)
- Peppers / Capsicum (intermediate, warm-season)
- Cucumbers (beginner, prolific producer)
- Herbs: Vietnamese Mint, Lemon Balm

**Companion Planting Data (Future):**
Each plant should eventually include a `companions` array noting beneficial pairings:
- Basil + Tomatoes (improves flavour, deters pests)
- Marigolds + most vegetables (pest deterrent)
- Lavender + Roses (attracts pollinators)
- Chives + Strawberries (fungal disease prevention)

---

## 6. UI/UX Design Notes

### Framework & Styling
- **SvelteKit 5** with runes (`$state`, `$derived`) for reactive state
- **Tailwind CSS 3.4** for all styling
- **Static adapter** — pre-rendered, no server required

### Color Palette

The custom `garden` color scale is an emerald/green palette that evokes growth and nature:

```
garden-50:  #f0fdf4  (lightest — backgrounds, highlights)
garden-100: #dcfce7
garden-200: #bbf7d0
garden-300: #86efac
garden-400: #4ade80
garden-500: #22c55e  (primary accent)
garden-600: #16a34a  (buttons, active states)
garden-700: #15803d  (dark accent, CTA backgrounds)
garden-800: #166534  (text on light backgrounds)
garden-900: #14532d  (darkest)
```

**Supporting colors:**
- `stone-*` — neutral text and borders (warm grey)
- `amber-*` — pro tips and callouts
- `emerald-*` — secondary match badges
- `green-*` / `red-*` — difficulty indicators

### Typography
- **Font:** Inter (via system fallback stack: `Inter, system-ui, sans-serif`)
- **Headings:** Bold, `text-stone-900`, 2xl–3xl
- **Body:** `text-stone-500`, relaxed leading
- **Accent text:** `text-garden-600/700/800`

### Layout
- **Max width:** `max-w-3xl` (48rem / 768px) — comfortable reading width
- **Responsive:** Mobile-first. Cards stack to single column on mobile, 2–3 columns on `sm:` breakpoint
- **Sticky header** with backdrop blur and subtle bottom border
- **Progress bar** with gradient fill and segmented step indicators

### Component Patterns

| Component | Classes |
|---|---|
| `.wizard-card` | `rounded-2xl border-2 p-4` — large touch target, clear selected state with green border + background |
| `.wizard-card.selected` | `border-garden-500 bg-garden-50 shadow-md` + animated checkmark |
| `.btn-primary` | `rounded-xl bg-garden-600 px-6 py-3 font-semibold text-white` — garden green, disabled state at 40% opacity |
| `.btn-secondary` | `rounded-xl border border-stone-300 bg-white px-6 py-3` — ghost button for "Back" |

### Interaction Design
- **Selection cards** have hover states (`hover:border-garden-400 hover:shadow-md`) for desktop, and clear press feedback for mobile
- **Progress** animates smoothly with `transition-all duration-500`
- **Navigation** uses Back/Next pattern — Back is invisible on step 1, Next is disabled until a selection is made
- **Results** show a subtle hover shadow on plant cards (`hover:shadow-md`)
- **LocalStorage** persistence — the wizard remembers where you left off between sessions

### Tone of Voice (Copywriting Guide)
- **Step subtitles** should feel like gentle coaching: *"Be honest — plants do better when matched to your real routine, not your ideal one."*
- **Plant descriptions** should be evocative and enthusiastic: *"Nothing beats the flavour of a sun-warmed tomato picked fresh from your own vines."*
- **Pro tips** should feel like insider knowledge: *"Pinch off flower buds immediately to keep leaves flavourful for longer."*
- **Match labels** should be encouraging, never negative — even the lowest tier is *"Worth Considering"*, not *"Poor Match"*
- Avoid jargon. Use everyday language. Say *"blooms"* not *"inflorescence"*.

---

## 7. Tech Stack & Deployment

### Application Stack
| Layer | Technology | Version |
|---|---|---|
| Framework | SvelteKit | 2.16.0 |
| UI Library | Svelte | 5.x (runes) |
| Styling | Tailwind CSS | 3.4.17 |
| Build Tool | Vite | 6.2.0 |
| CSS Processing | PostCSS + Autoprefixer | 8.5.3 / 10.4.20 |
| Static Adapter | @sveltejs/adapter-static | 3.0.6 |
| E2E Testing | Playwright | 1.50.0 |

### Build Process
```bash
npm run build    # vite build → static HTML/CSS/JS in build/
```

The static adapter outputs a fully pre-rendered site with no server-side runtime requirements.

### Deployment Pipeline

```
Developer pushes to main
        ↓
GitHub repo: sojohnnysaid/static-sites
        ↓
Argo CD (app-static-sites) detects change
        ↓
Kustomize generates ConfigMap from index.html
        ↓
Kubernetes Deployment (static-sites namespace)
  - python:3.11-alpine serves /html on port 8080
  - ConfigMap mounted at /html
  - 1 replica, non-root, security-hardened
        ↓
ClusterIP Service (port 80 → 8080)
        ↓
Cloudflare Tunnel (cloudflared)
  - hostname: gardening.sogos.io
  - routes to gardening.static-sites.svc.cluster.local:80
        ↓
Live at https://gardening.sogos.io
```

### Key Infrastructure Details
- **Namespace:** `static-sites`
- **Deployment:** 1 replica, `python:3.11-alpine` HTTP server
- **Security:** Non-root (UID 1000), no privilege escalation, all capabilities dropped, `RuntimeDefault` seccomp profile
- **Tolerations:** Runs on control plane nodes
- **Argo CD sync:** Automated with pruning and self-healing

### State Management
- All state is **client-side only** — no backend, no database
- Wizard answers persist in **localStorage** under key `gardening-wizard-answers`
- Clearing storage / starting over resets to defaults

---

## 8. Future Ideas & Stretch Goals

### Near-Term Enhancements
- **Expanded plant catalog** — grow from 18 to 50+ plants (see section 5 for candidates)
- **Companion planting recommendations** — *"Basil grows great next to your tomatoes!"*
- **Soil type question** — add a step for clay, sandy, loamy, chalky soil types, and filter/score accordingly
- **Seasonal planting calendar** — show when to plant each recommendation based on the selected climate
- **Print / share results** — generate a printable garden plan or shareable link

### Medium-Term Features
- **Garden layout planner** — drag-and-drop visual bed planner using recommended plants
- **Plant detail pages** — dedicated page per plant with photos, full care guide, and companion planting info
- **USDA hardiness zone lookup** — enter a zip code to auto-detect climate zone (US-focused)
- **Bloom time timeline** — visual calendar showing when each recommended plant blooms, so you can plan for year-round colour
- **"My Garden" saved list** — let users star/save plants they want to grow, separate from recommendations

### Long-Term / Ambitious
- **Local nursery integration** — show where to buy recommended plants nearby
- **Weather API integration** — real-time frost date warnings and planting reminders
- **Photo journal** — take progress photos of your garden over time
- **Community features** — share your garden setup and see what others in your climate are growing
- **AI-powered Q&A** — *"My lavender leaves are turning yellow, what should I do?"*
- **Multilingual support** — starting with Spanish and Portuguese

### Technical Improvements
- **Migrate from ConfigMap to container-based build** — the current single-file ConfigMap approach limits the app to a single `index.html`; a proper container build (nginx or Caddy with the full `build/` output) would support multiple routes, assets, and images
- **Add plant images** — replace emoji-only representation with beautiful photographs
- **PWA support** — service worker for offline access while out in the garden
- **Analytics** — lightweight, privacy-respecting analytics (e.g., Plausible) to understand which plant combinations are most popular
- **Accessibility audit** — ensure full WCAG 2.1 AA compliance, screen reader testing, keyboard navigation polish
- **Performance budget** — keep the total bundle under 100KB (currently very light as a static SvelteKit app)

---

*Built with 💚 for the garden at your new home.*
