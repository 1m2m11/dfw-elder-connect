export const CATEGORIES = [
  {
    id: 'aide',
    label: 'Non-Medical Personal Aide',
    emoji: '🤝',
    description: 'Help with daily routines and household tasks',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    id: 'companion',
    label: 'Companion Visits',
    emoji: '🌿',
    description: 'Friendly presence, conversation, and check-ins',
    color: 'bg-teal-50 text-teal-700',
  },
  {
    id: 'housekeeping',
    label: 'Senior Housekeeping',
    emoji: '🏡',
    description: 'Light cleaning, laundry, and tidying',
    color: 'bg-amber-50 text-amber-700',
  },
  {
    id: 'errands',
    label: 'Errand & Grocery Help',
    emoji: '🛒',
    description: 'Shopping runs, pickups, and errands',
    color: 'bg-orange-50 text-orange-700',
  },
  {
    id: 'meals',
    label: 'Meal Prep Assistance',
    emoji: '🍲',
    description: 'Simple home-style meal preparation',
    color: 'bg-rose-50 text-rose-700',
  },
] as const;

export type CategoryId = typeof CATEGORIES[number]['id'];

export function getCategoryById(id: string) {
  return CATEGORIES.find((c) => c.id === id);
}
