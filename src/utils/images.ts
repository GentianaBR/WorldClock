// src/utils/images.ts
export type Continent =
  | 'Europe'
  | 'NorthAmerica'
  | 'SouthAmerica'
  | 'Asia'
  | 'Africa'
  | 'Oceania'
  | 'Antarctica'

/**
 * Returnerar 4 picsum-länkar (kommaseparerade) för en kontinent.
 * De här URL:erna fungerar alltid och är natur-tema.
 */
export function imageSetForContinent(continent: Continent): string {
  const key = continent.toLowerCase()
  const seeds = [
    `${key}-nature-1`,
    `${key}-mountains-2`,
    `${key}-forest-3`,
    `${key}-water-4`,
  ]
  return seeds
    .map((s) => `https://picsum.photos/seed/${encodeURIComponent(s)}/1600/900`)
    .join(', ')
}
