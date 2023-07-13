import "./chunk-HM4MQYWN.js";

// ../../node_modules/.pnpm/vitepress-demo-editor@3.2.1_@vue+babel-plugin-jsx@1.1.4_@vue+runtime-core@3.3.4_@vue+runtime-_nzfxcsweaf2rfajbop72etg6f4/node_modules/vitepress-demo-editor/dist/lexon.b7e10863.js
var e = {
  comments: {
    lineComment: "COMMENT"
  },
  brackets: [["(", ")"]],
  autoClosingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: '"', close: '"' },
    { open: ":", close: "." }
  ],
  surroundingPairs: [
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" },
    { open: "`", close: "`" },
    { open: '"', close: '"' },
    { open: "'", close: "'" },
    { open: ":", close: "." }
  ],
  folding: {
    markers: {
      start: new RegExp("^\\s*(::\\s*|COMMENT\\s+)#region"),
      end: new RegExp("^\\s*(::\\s*|COMMENT\\s+)#endregion")
    }
  }
};
var t = {
  tokenPostfix: ".lexon",
  ignoreCase: true,
  keywords: [
    "lexon",
    "lex",
    "clause",
    "terms",
    "contracts",
    "may",
    "pay",
    "pays",
    "appoints",
    "into",
    "to"
  ],
  typeKeywords: ["amount", "person", "key", "time", "date", "asset", "text"],
  operators: [
    "less",
    "greater",
    "equal",
    "le",
    "gt",
    "or",
    "and",
    "add",
    "added",
    "subtract",
    "subtracted",
    "multiply",
    "multiplied",
    "times",
    "divide",
    "divided",
    "is",
    "be",
    "certified"
  ],
  symbols: /[=><!~?:&|+\-*\/\^%]+/,
  tokenizer: {
    root: [
      [/^(\s*)(comment:?(?:\s.*|))$/, ["", "comment"]],
      [
        /"/,
        {
          token: "identifier.quote",
          bracket: "@open",
          next: "@quoted_identifier"
        }
      ],
      [
        "LEX$",
        {
          token: "keyword",
          bracket: "@open",
          next: "@identifier_until_period"
        }
      ],
      ["LEXON", { token: "keyword", bracket: "@open", next: "@semver" }],
      [
        ":",
        {
          token: "delimiter",
          bracket: "@open",
          next: "@identifier_until_period"
        }
      ],
      [
        /[a-z_$][\w$]*/,
        {
          cases: {
            "@operators": "operator",
            "@typeKeywords": "keyword.type",
            "@keywords": "keyword",
            "@default": "identifier"
          }
        }
      ],
      { include: "@whitespace" },
      [/[{}()\[\]]/, "@brackets"],
      [/[<>](?!@symbols)/, "@brackets"],
      [/@symbols/, "delimiter"],
      [/\d*\.\d*\.\d*/, "number.semver"],
      [/\d*\.\d+([eE][\-+]?\d+)?/, "number.float"],
      [/0[xX][0-9a-fA-F]+/, "number.hex"],
      [/\d+/, "number"],
      [/[;,.]/, "delimiter"]
    ],
    quoted_identifier: [
      [/[^\\"]+/, "identifier"],
      [/"/, { token: "identifier.quote", bracket: "@close", next: "@pop" }]
    ],
    space_identifier_until_period: [
      [":", "delimiter"],
      [" ", { token: "white", next: "@identifier_rest" }]
    ],
    identifier_until_period: [
      { include: "@whitespace" },
      [":", { token: "delimiter", next: "@identifier_rest" }],
      [/[^\\.]+/, "identifier"],
      [/\./, { token: "delimiter", bracket: "@close", next: "@pop" }]
    ],
    identifier_rest: [
      [/[^\\.]+/, "identifier"],
      [/\./, { token: "delimiter", bracket: "@close", next: "@pop" }]
    ],
    semver: [
      { include: "@whitespace" },
      [":", "delimiter"],
      [/\d*\.\d*\.\d*/, { token: "number.semver", bracket: "@close", next: "@pop" }]
    ],
    whitespace: [[/[ \t\r\n]+/, "white"]]
  }
};
export {
  e as conf,
  t as language
};
/*! Bundled license information:

vitepress-demo-editor/dist/lexon.b7e10863.js:
  (*!-----------------------------------------------------------------------------
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Version: 0.33.8(ed685c1f00d1ff3e2873cec2aae0bd338313c4c2)
   * Released under the MIT license
   * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
   *-----------------------------------------------------------------------------*)
*/
//# sourceMappingURL=lexon.b7e10863-ANCT7F3Z.js.map
