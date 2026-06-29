import type { ContentBundle } from "./en";
import { site, archiveEntries, blogCategories, featuredArchiveEntry } from "../fr/site";
import { aboutHero, journeyChapters } from "../fr/about";
import { aboutTeaser, aboutTeaserTiles } from "../fr/aboutTeaser";
import {
  fieldExperienceIntro,
  fieldExperienceStats,
  fieldExperiences,
} from "../fr/fieldExperience";
import { axioms } from "../fr/philosophy";
import { projects } from "../fr/projects";
import { projectShowcases } from "../fr/projectShowcases";
import { projectStories } from "../fr/projectStories";
import { projectReadmes } from "../fr/projectReadmes";

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
