export type Axiom = {
  code: string;
  text: string;
  emphasis: string;
  gloss: string;
};

export const axioms: Axiom[] = [
  {
    code: "P · 01",
    text: "Build",
    emphasis: "systems,",
    gloss: "Optimize for signal that compounds. Throwaway work is a tax on tomorrow.",
  },
  {
    code: "P · 02",
    text: "Engineering is",
    emphasis: "creative.",
    gloss: "A circuit, a controller, a topology — each is a composition. Aesthetic shapes the system.",
  },
  {
    code: "P · 03",
    text: "Curiosity",
    emphasis: "before certainty.",
    gloss: "Stay early in the question. Specialization is downstream of taste.",
  },
  {
    code: "P · 04",
    text: "Technology",
    emphasis: "amplifies",
    gloss: "If a system makes a person smaller, the system is wrong.",
  },
];
