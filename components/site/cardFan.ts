/**
 * Shared between the scroll timeline and the About cards: how far the pile has opened into the fan
 * (0 is the pile, 1 the fan), and how far the pile sits from the cards' final row.
 */
export type CardFan = { open: number; pileY: number; wake: (() => void) | null };

export const cardFan: CardFan = { open: 1, pileY: 0, wake: null };
