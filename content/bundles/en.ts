import { site, archiveEntries, blogCategories, featuredArchiveEntry } from "../site";
import { aboutHero, journeyChapters } from "../about";
import { aboutTeaser, aboutTeaserTiles } from "../aboutTeaser";
import {
  fieldExperienceIntro,
  fieldExperienceStats,
  fieldExperiences,
} from "../fieldExperience";
import { axioms } from "../philosophy";
import { projects } from "../projects";
import { projectShowcases } from "../projectShowcases";
import { projectStories } from "../projectStories";
import { projectReadmes } from "../projectReadmes";

type Widen<T> = T extends string
  ? string
  : T extends number | boolean | null | undefined
    ? T
    : T extends readonly (infer U)[]
      ? readonly Widen<U>[]
      : T extends object
        ? { [K in keyof T]: Widen<T[K]> }
        : T;

export type ContentBundle = Widen<{
  site: typeof site;
  about: {
    aboutHero: typeof aboutHero;
    journeyChapters: typeof journeyChapters;
  };
  aboutTeaser: {
    aboutTeaser: typeof aboutTeaser;
    aboutTeaserTiles: typeof aboutTeaserTiles;
  };
  fieldExperience: {
    fieldExperienceIntro: typeof fieldExperienceIntro;
    fieldExperienceStats: typeof fieldExperienceStats;
    fieldExperiences: typeof fieldExperiences;
  };
  philosophy: {
    axioms: typeof axioms;
  };
  projects: typeof projects;
  projectShowcases: typeof projectShowcases;
  projectStories: typeof projectStories;
  projectReadmes: typeof projectReadmes;
  archive: {
    archiveEntries: typeof archiveEntries;
    blogCategories: typeof blogCategories;
    featuredArchiveEntry: typeof featuredArchiveEntry;
  };
}>;

export const bundle = {
  site,
  about: { aboutHero, journeyChapters },
  aboutTeaser: { aboutTeaser, aboutTeaserTiles },
  fieldExperience: {
    fieldExperienceIntro,
    fieldExperienceStats,
    fieldExperiences,
  },
  philosophy: { axioms },
  projects,
  projectShowcases,
  projectStories,
  projectReadmes,
  archive: { archiveEntries, blogCategories, featuredArchiveEntry },
} satisfies ContentBundle;
