import "./chunk-HM4MQYWN.js";

// ../../node_modules/.pnpm/vitepress-demo-editor@3.2.1_@vue+babel-plugin-jsx@1.1.4_@vue+runtime-core@3.3.4_@vue+runtime-_nzfxcsweaf2rfajbop72etg6f4/node_modules/vitepress-demo-editor/dist/bicep.1efbad6c.js
var n = (e) => `\\b${e}\\b`;
var t = "[_a-zA-Z]";
var o = "[_a-zA-Z0-9]";
var r = n(`${t}${o}*`);
var i = [
  "targetScope",
  "resource",
  "module",
  "param",
  "var",
  "output",
  "for",
  "in",
  "if",
  "existing"
];
var a = ["true", "false", "null"];
var s = "[ \\t\\r\\n]";
var c = "[0-9]+";
var g = {
  comments: {
    lineComment: "//",
    blockComment: ["/*", "*/"]
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"]
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "'", close: "'" },
    { open: "'''", close: "'''" }
  ],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "'", close: "'", notIn: ["string", "comment"] },
    { open: "'''", close: "'''", notIn: ["string", "comment"] }
  ],
  autoCloseBefore: `:.,=}])' 
	`,
  indentationRules: {
    increaseIndentPattern: new RegExp("^((?!\\/\\/).)*(\\{[^}\"'`]*|\\([^)\"'`]*|\\[[^\\]\"'`]*)$"),
    decreaseIndentPattern: new RegExp("^((?!.*?\\/\\*).*\\*/)?\\s*[\\}\\]].*$")
  }
};
var l = {
  defaultToken: "",
  tokenPostfix: ".bicep",
  brackets: [
    { open: "{", close: "}", token: "delimiter.curly" },
    { open: "[", close: "]", token: "delimiter.square" },
    { open: "(", close: ")", token: "delimiter.parenthesis" }
  ],
  symbols: /[=><!~?:&|+\-*/^%]+/,
  keywords: i,
  namedLiterals: a,
  escapes: "\\\\(u{[0-9A-Fa-f]+}|n|r|t|\\\\|'|\\${)",
  tokenizer: {
    root: [{ include: "@expression" }, { include: "@whitespace" }],
    stringVerbatim: [
      { regex: "(|'|'')[^']", action: { token: "string" } },
      { regex: "'''", action: { token: "string.quote", next: "@pop" } }
    ],
    stringLiteral: [
      { regex: "\\${", action: { token: "delimiter.bracket", next: "@bracketCounting" } },
      { regex: "[^\\\\'$]+", action: { token: "string" } },
      { regex: "@escapes", action: { token: "string.escape" } },
      { regex: "\\\\.", action: { token: "string.escape.invalid" } },
      { regex: "'", action: { token: "string", next: "@pop" } }
    ],
    bracketCounting: [
      { regex: "{", action: { token: "delimiter.bracket", next: "@bracketCounting" } },
      { regex: "}", action: { token: "delimiter.bracket", next: "@pop" } },
      { include: "expression" }
    ],
    comment: [
      { regex: "[^\\*]+", action: { token: "comment" } },
      { regex: "\\*\\/", action: { token: "comment", next: "@pop" } },
      { regex: "[\\/*]", action: { token: "comment" } }
    ],
    whitespace: [
      { regex: s },
      { regex: "\\/\\*", action: { token: "comment", next: "@comment" } },
      { regex: "\\/\\/.*$", action: { token: "comment" } }
    ],
    expression: [
      { regex: "'''", action: { token: "string.quote", next: "@stringVerbatim" } },
      { regex: "'", action: { token: "string.quote", next: "@stringLiteral" } },
      { regex: c, action: { token: "number" } },
      {
        regex: r,
        action: {
          cases: {
            "@keywords": { token: "keyword" },
            "@namedLiterals": { token: "keyword" },
            "@default": { token: "identifier" }
          }
        }
      }
    ]
  }
};
export {
  g as conf,
  l as language
};
/*! Bundled license information:

vitepress-demo-editor/dist/bicep.1efbad6c.js:
  (*!-----------------------------------------------------------------------------
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Version: 0.33.8(ed685c1f00d1ff3e2873cec2aae0bd338313c4c2)
   * Released under the MIT license
   * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
   *-----------------------------------------------------------------------------*)
*/
//# sourceMappingURL=bicep.1efbad6c-545ILI5B.js.map
