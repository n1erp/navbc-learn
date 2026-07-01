import type { BundledTheme, ThemeRegistration } from "shiki";

/** Custom dark theme optimized for AL (csharp-like) and JSON readability */
export const navbcDarkTheme: ThemeRegistration = {
  name: "navbc-dark",
  type: "dark",
  colors: {
    "editor.background": "#0d1117",
    "editor.foreground": "#e6edf3",
    "editorLineNumber.foreground": "#484f58",
    "editor.selectionBackground": "#264f78",
    "editor.inactiveSelectionBackground": "#264f7855",
  },
  tokenColors: [
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#8b949e", fontStyle: "italic" } },
    { scope: ["string", "constant.other.symbol"], settings: { foreground: "#7ee787" } },
    { scope: ["constant.numeric", "constant.language"], settings: { foreground: "#79c0ff" } },
    { scope: ["constant.language.boolean"], settings: { foreground: "#ff7b72" } },
    { scope: ["keyword", "storage.type", "storage.modifier"], settings: { foreground: "#ff7b72", fontStyle: "bold" } },
    { scope: ["keyword.control", "keyword.operator.new"], settings: { foreground: "#d2a8ff" } },
    { scope: ["entity.name.type", "entity.name.class", "support.type", "support.class"], settings: { foreground: "#ffa657" } },
    { scope: ["entity.name.function", "support.function"], settings: { foreground: "#d2a8ff" } },
    { scope: ["variable", "variable.other", "meta.definition.variable"], settings: { foreground: "#e6edf3" } },
    { scope: ["variable.parameter"], settings: { foreground: "#ffa657" } },
    { scope: ["entity.name.tag", "support.type.property-name.json"], settings: { foreground: "#79c0ff" } },
    { scope: ["support.constant.property-value.json"], settings: { foreground: "#7ee787" } },
    { scope: ["constant.numeric.json"], settings: { foreground: "#79c0ff" } },
    { scope: ["constant.language.json"], settings: { foreground: "#ff7b72" } },
    { scope: ["punctuation", "meta.brace"], settings: { foreground: "#8b949e" } },
    { scope: ["entity.other.attribute-name"], settings: { foreground: "#79c0ff" } },
    { scope: ["markup.heading"], settings: { foreground: "#79c0ff", fontStyle: "bold" } },
  ],
};

export const codeThemes = {
  dark: navbcDarkTheme,
  light: "github-light" as BundledTheme,
};
