/** Lets the deck freeze the home background while the home page is turning away: a still frame moves for free. */
export const homeFibers: { still: boolean; wake?: () => void } = { still: false };
