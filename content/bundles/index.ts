import { bundle as enBundle, type ContentBundle } from "./en";
import { bundle as frBundle } from "./fr";

export type { ContentBundle };

export const contentBundles: Record<"en" | "fr", ContentBundle> = {
  en: enBundle,
  fr: frBundle,
};
