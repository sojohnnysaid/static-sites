import { browser } from '$app/environment';

const STORAGE_KEY = 'gardening-wizard-answers';

const defaultAnswers = {
  climate: '',
  sunlight: '',
  space: '',
  water: '',
  goals: []
};

function loadFromStorage() {
  if (!browser) return { ...defaultAnswers };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? { ...defaultAnswers, ...JSON.parse(raw) } : { ...defaultAnswers };
  } catch {
    return { ...defaultAnswers };
  }
}

function saveToStorage(answers) {
  if (!browser) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(answers));
  } catch {
    // storage unavailable
  }
}

export function clearWizardStorage() {
  if (!browser) return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Create a reactive wizard state object (Svelte 5 runes-compatible plain module).
 * Since we're using runes in .svelte files, this module just exposes helpers.
 */
export { loadFromStorage, saveToStorage, defaultAnswers };
