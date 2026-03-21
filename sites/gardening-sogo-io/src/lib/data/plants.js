/** @typedef {'tropical'|'subtropical'|'temperate'|'cool'} Climate */
/** @typedef {'full-sun'|'partial'|'full-shade'} Sunlight */
/** @typedef {'container'|'small'|'medium'|'large'} Space */
/** @typedef {'low'|'moderate'|'regular'} Water */
/** @typedef {'food'|'flowers'|'pollinators'|'privacy'|'low-maintenance'} Goal */

/**
 * @typedef {Object} Plant
 * @property {string} id
 * @property {string} name
 * @property {string} emoji
 * @property {string} description
 * @property {'beginner'|'intermediate'|'advanced'} difficulty
 * @property {Climate[]} climate
 * @property {Sunlight[]} sunlight
 * @property {Space[]} space
 * @property {Water[]} water
 * @property {Goal[]} goals
 * @property {string} tip
 * @property {string} harvestTime
 */

/** @type {Plant[]} */
export const plants = [
  {
    id: 'tomato',
    name: 'Tomatoes',
    emoji: '🍅',
    description: 'The classic home garden staple. Nothing beats the flavour of a sun-warmed tomato picked fresh from your own vines.',
    difficulty: 'intermediate',
    climate: ['temperate', 'subtropical'],
    sunlight: ['full-sun'],
    space: ['medium', 'large'],
    water: ['regular'],
    goals: ['food'],
    tip: 'Pinch off suckers (side shoots) regularly to direct energy into fruit production.',
    harvestTime: '60–85 days'
  },
  {
    id: 'lettuce',
    name: 'Lettuce',
    emoji: '🥬',
    description: 'Quick-growing salad leaves that thrive in cooler weather. Perfect for beginners wanting near-instant results.',
    difficulty: 'beginner',
    climate: ['cool', 'temperate'],
    sunlight: ['full-sun', 'partial'],
    space: ['container', 'small', 'medium'],
    water: ['regular', 'moderate'],
    goals: ['food', 'low-maintenance'],
    tip: 'Harvest outer leaves as a cut-and-come-again crop to extend your harvest window.',
    harvestTime: '30–45 days'
  },
  {
    id: 'lavender',
    name: 'Lavender',
    emoji: '💜',
    description: 'A drought-tolerant perennial beloved by bees and butterflies. Fragrant, beautiful, and nearly indestructible once established.',
    difficulty: 'beginner',
    climate: ['temperate', 'subtropical'],
    sunlight: ['full-sun'],
    space: ['container', 'small', 'medium'],
    water: ['low'],
    goals: ['flowers', 'pollinators', 'low-maintenance'],
    tip: 'Cut back by one-third after flowering to keep plants bushy and prevent woodiness.',
    harvestTime: 'Blooms year 1–2'
  },
  {
    id: 'basil',
    name: 'Basil',
    emoji: '🌿',
    description: 'The king of kitchen herbs. Grow it close to your kitchen door for quick harvests while cooking.',
    difficulty: 'beginner',
    climate: ['temperate', 'subtropical', 'tropical'],
    sunlight: ['full-sun'],
    space: ['container', 'small'],
    water: ['regular'],
    goals: ['food'],
    tip: 'Pinch off flower buds immediately to keep leaves flavourful for longer.',
    harvestTime: '25–35 days'
  },
  {
    id: 'hosta',
    name: 'Hostas',
    emoji: '🌱',
    description: 'The undisputed champions of shady spots. Dramatic foliage in every shade of green, blue, and gold.',
    difficulty: 'beginner',
    climate: ['cool', 'temperate'],
    sunlight: ['full-shade', 'partial'],
    space: ['container', 'small', 'medium'],
    water: ['moderate', 'regular'],
    goals: ['flowers', 'low-maintenance'],
    tip: 'More shade = more blue colouring in the leaves. More sun = more gold tones.',
    harvestTime: 'Foliage spring–autumn'
  },
  {
    id: 'sunflower',
    name: 'Sunflowers',
    emoji: '🌻',
    description: 'Towering, cheerful, and irresistible to birds and bees. Kids love growing them — and adults do too.',
    difficulty: 'beginner',
    climate: ['temperate', 'subtropical'],
    sunlight: ['full-sun'],
    space: ['medium', 'large'],
    water: ['moderate', 'low'],
    goals: ['flowers', 'pollinators'],
    tip: 'Plant in succession every two weeks for continuous blooms all summer long.',
    harvestTime: '70–100 days'
  },
  {
    id: 'fern',
    name: 'Ferns',
    emoji: '🌿',
    description: 'Ancient, elegant, and perfectly adapted to life in the shade. Lush fronds create a cool, tropical atmosphere.',
    difficulty: 'beginner',
    climate: ['cool', 'temperate', 'subtropical'],
    sunlight: ['full-shade', 'partial'],
    space: ['container', 'small', 'medium'],
    water: ['regular', 'moderate'],
    goals: ['low-maintenance'],
    tip: 'Keep roots consistently moist but never waterlogged — good drainage is essential.',
    harvestTime: 'Foliage year-round'
  },
  {
    id: 'succulent',
    name: 'Succulents',
    emoji: '🪴',
    description: 'Water-storing wonders that thrive on neglect. Hundreds of shapes, colours, and textures to collect and arrange.',
    difficulty: 'beginner',
    climate: ['subtropical', 'tropical', 'temperate'],
    sunlight: ['full-sun', 'partial'],
    space: ['container', 'small'],
    water: ['low'],
    goals: ['flowers', 'low-maintenance'],
    tip: 'The number one killer of succulents is overwatering. When in doubt, do not water.',
    harvestTime: 'Year-round interest'
  },
  {
    id: 'chilli',
    name: 'Chillies',
    emoji: '🌶️',
    description: 'From sweet paprika to face-melting habanero — grow your own heat. Highly productive and visually stunning.',
    difficulty: 'intermediate',
    climate: ['subtropical', 'tropical', 'temperate'],
    sunlight: ['full-sun'],
    space: ['container', 'small', 'medium'],
    water: ['moderate', 'regular'],
    goals: ['food'],
    tip: 'Stress the plants slightly by reducing water once fruits set — this increases capsaicin (heat).',
    harvestTime: '70–120 days'
  },
  {
    id: 'strawberry',
    name: 'Strawberries',
    emoji: '🍓',
    description: 'Sweet, sun-warmed strawberries picked moments before eating are a revelation. Great in containers on a sunny balcony.',
    difficulty: 'beginner',
    climate: ['cool', 'temperate'],
    sunlight: ['full-sun', 'partial'],
    space: ['container', 'small', 'medium'],
    water: ['regular'],
    goals: ['food', 'flowers'],
    tip: 'Remove runners in the first year to redirect energy into establishing strong root systems.',
    harvestTime: 'Year 2 onward'
  },
  {
    id: 'zucchini',
    name: 'Zucchini / Courgette',
    emoji: '🥒',
    description: 'Legendarily productive — one plant can feed a family. Bold, tropical-looking foliage with beautiful yellow flowers.',
    difficulty: 'beginner',
    climate: ['temperate', 'subtropical'],
    sunlight: ['full-sun'],
    space: ['medium', 'large'],
    water: ['regular'],
    goals: ['food', 'pollinators'],
    tip: 'Hand-pollinate flowers early in the season when pollinating insects are less active.',
    harvestTime: '50–65 days'
  },
  {
    id: 'echinacea',
    name: 'Echinacea (Coneflower)',
    emoji: '🌸',
    description: 'A tough native wildflower that blooms for months, feeds pollinators, and comes back stronger every year.',
    difficulty: 'beginner',
    climate: ['cool', 'temperate'],
    sunlight: ['full-sun', 'partial'],
    space: ['small', 'medium', 'large'],
    water: ['low', 'moderate'],
    goals: ['flowers', 'pollinators', 'low-maintenance'],
    tip: 'Leave seed heads standing in winter — they feed birds and self-sow for more plants next year.',
    harvestTime: 'Blooms year 2'
  },
  {
    id: 'bamboo',
    name: 'Clumping Bamboo',
    emoji: '🎋',
    description: 'Fast-growing, dramatic, and excellent for creating privacy screens. Clumping varieties stay well-behaved in the garden.',
    difficulty: 'beginner',
    climate: ['subtropical', 'tropical', 'temperate'],
    sunlight: ['full-sun', 'partial'],
    space: ['medium', 'large'],
    water: ['moderate'],
    goals: ['privacy', 'low-maintenance'],
    tip: 'Always choose clumping (not running) bamboo varieties to avoid invasive spreading.',
    harvestTime: 'Privacy in 2–3 years'
  },
  {
    id: 'rosemary',
    name: 'Rosemary',
    emoji: '🌿',
    description: 'An aromatic Mediterranean shrub that doubles as a flavoursome culinary herb and a bee magnet in spring.',
    difficulty: 'beginner',
    climate: ['subtropical', 'temperate'],
    sunlight: ['full-sun'],
    space: ['container', 'small', 'medium'],
    water: ['low'],
    goals: ['food', 'pollinators', 'low-maintenance'],
    tip: 'Well-drained soil is essential — rosemary roots rot easily in waterlogged conditions.',
    harvestTime: 'Harvest year-round'
  },
  {
    id: 'hellebore',
    name: 'Hellebores',
    emoji: '🌺',
    description: 'The winter garden hero — blooming in the darkest months when little else dares. Thrives in deep shade under trees.',
    difficulty: 'beginner',
    climate: ['cool', 'temperate'],
    sunlight: ['full-shade', 'partial'],
    space: ['small', 'medium'],
    water: ['moderate', 'low'],
    goals: ['flowers', 'low-maintenance'],
    tip: 'Remove old leaves in late winter just before flowering so the blooms can be fully seen and appreciated.',
    harvestTime: 'Blooms Dec–Mar'
  },
  {
    id: 'pumpkin',
    name: 'Pumpkins',
    emoji: '🎃',
    description: 'Vining giants that reward patient gardeners with magnificent autumn fruits. Great fun for families.',
    difficulty: 'intermediate',
    climate: ['temperate', 'subtropical'],
    sunlight: ['full-sun'],
    space: ['large'],
    water: ['regular', 'moderate'],
    goals: ['food'],
    tip: 'Train vines in a spiral to save space, and slip a tile under developing fruits to prevent rotting.',
    harvestTime: '90–120 days'
  },
  {
    id: 'native-grasses',
    name: 'Ornamental Grasses',
    emoji: '🌾',
    description: 'Architectural, year-round interest with barely any effort. Seed heads catch light beautifully in winter.',
    difficulty: 'beginner',
    climate: ['cool', 'temperate', 'subtropical'],
    sunlight: ['full-sun', 'partial'],
    space: ['small', 'medium', 'large'],
    water: ['low', 'moderate'],
    goals: ['flowers', 'low-maintenance', 'privacy'],
    tip: 'Cut back hard to about 10cm in late winter to make way for fresh new growth in spring.',
    harvestTime: 'Year-round interest'
  },
  {
    id: 'kale',
    name: 'Kale',
    emoji: '🥦',
    description: 'Incredibly hardy and cold-tolerant, kale produces nutritious leaves for months and looks architecturally beautiful.',
    difficulty: 'beginner',
    climate: ['cool', 'temperate'],
    sunlight: ['full-sun', 'partial'],
    space: ['small', 'medium'],
    water: ['moderate', 'regular'],
    goals: ['food', 'low-maintenance'],
    tip: 'Harvest the lower outer leaves first, leaving the growing centre intact for continued production.',
    harvestTime: '55–75 days'
  }
];

/**
 * Score a plant against the user's wizard answers.
 * Returns a number from 0–4 (one point per matched criterion beyond climate).
 * Climate is used as a hard filter before scoring.
 *
 * @param {Plant} plant
 * @param {{ sunlight: string, space: string, water: string, goals: string[] }} answers
 * @returns {number}
 */
export function scorePlant(plant, answers) {
  let score = 0;
  if (plant.sunlight.includes(answers.sunlight)) score += 2;
  if (plant.space.includes(answers.space)) score += 2;
  if (plant.water.includes(answers.water)) score += 1;
  const goalMatches = answers.goals.filter(g => plant.goals.includes(g)).length;
  score += goalMatches * 2;
  return score;
}

/**
 * Return plants filtered by climate and sorted by match score, highest first.
 *
 * @param {{ climate: string, sunlight: string, space: string, water: string, goals: string[] }} answers
 * @returns {{ plant: Plant, score: number }[]}
 */
export function getRecommendations(answers) {
  const compatible = plants.filter(p => p.climate.includes(answers.climate));
  return compatible
    .map(plant => ({ plant, score: scorePlant(plant, answers) }))
    .sort((a, b) => b.score - a.score);
}
