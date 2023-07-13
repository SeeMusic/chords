import "./chunk-HM4MQYWN.js";

// ../../node_modules/.pnpm/vitepress-demo-editor@3.2.1_@vue+babel-plugin-jsx@1.1.4_@vue+runtime-core@3.3.4_@vue+runtime-_nzfxcsweaf2rfajbop72etg6f4/node_modules/vitepress-demo-editor/dist/sparql.6c9609f8.js
var e = {
  comments: {
    lineComment: "#"
  },
  brackets: [
    ["{", "}"],
    ["[", "]"],
    ["(", ")"]
  ],
  autoClosingPairs: [
    { open: "'", close: "'", notIn: ["string"] },
    { open: '"', close: '"', notIn: ["string"] },
    { open: "{", close: "}" },
    { open: "[", close: "]" },
    { open: "(", close: ")" }
  ]
};
var s = {
  defaultToken: "",
  tokenPostfix: ".rq",
  brackets: [
    { token: "delimiter.curly", open: "{", close: "}" },
    { token: "delimiter.parenthesis", open: "(", close: ")" },
    { token: "delimiter.square", open: "[", close: "]" },
    { token: "delimiter.angle", open: "<", close: ">" }
  ],
  keywords: [
    "add",
    "as",
    "asc",
    "ask",
    "base",
    "by",
    "clear",
    "construct",
    "copy",
    "create",
    "data",
    "delete",
    "desc",
    "describe",
    "distinct",
    "drop",
    "false",
    "filter",
    "from",
    "graph",
    "group",
    "having",
    "in",
    "insert",
    "limit",
    "load",
    "minus",
    "move",
    "named",
    "not",
    "offset",
    "optional",
    "order",
    "prefix",
    "reduced",
    "select",
    "service",
    "silent",
    "to",
    "true",
    "undef",
    "union",
    "using",
    "values",
    "where",
    "with"
  ],
  builtinFunctions: [
    "a",
    "abs",
    "avg",
    "bind",
    "bnode",
    "bound",
    "ceil",
    "coalesce",
    "concat",
    "contains",
    "count",
    "datatype",
    "day",
    "encode_for_uri",
    "exists",
    "floor",
    "group_concat",
    "hours",
    "if",
    "iri",
    "isblank",
    "isiri",
    "isliteral",
    "isnumeric",
    "isuri",
    "lang",
    "langmatches",
    "lcase",
    "max",
    "md5",
    "min",
    "minutes",
    "month",
    "now",
    "rand",
    "regex",
    "replace",
    "round",
    "sameterm",
    "sample",
    "seconds",
    "sha1",
    "sha256",
    "sha384",
    "sha512",
    "str",
    "strafter",
    "strbefore",
    "strdt",
    "strends",
    "strlang",
    "strlen",
    "strstarts",
    "struuid",
    "substr",
    "sum",
    "timezone",
    "tz",
    "ucase",
    "uri",
    "uuid",
    "year"
  ],
  ignoreCase: true,
  tokenizer: {
    root: [
      [/<[^\s\u00a0>]*>?/, "tag"],
      { include: "@strings" },
      [/#.*/, "comment"],
      [/[{}()\[\]]/, "@brackets"],
      [/[;,.]/, "delimiter"],
      [/[_\w\d]+:(\.(?=[\w_\-\\%])|[:\w_-]|\\[-\\_~.!$&'()*+,;=/?#@%]|%[a-f\d][a-f\d])*/, "tag"],
      [/:(\.(?=[\w_\-\\%])|[:\w_-]|\\[-\\_~.!$&'()*+,;=/?#@%]|%[a-f\d][a-f\d])+/, "tag"],
      [
        /[$?]?[_\w\d]+/,
        {
          cases: {
            "@keywords": { token: "keyword" },
            "@builtinFunctions": { token: "predefined.sql" },
            "@default": "identifier"
          }
        }
      ],
      [/\^\^/, "operator.sql"],
      [/\^[*+\-<>=&|^\/!?]*/, "operator.sql"],
      [/[*+\-<>=&|\/!?]/, "operator.sql"],
      [/@[a-z\d\-]*/, "metatag.html"],
      [/\s+/, "white"]
    ],
    strings: [
      [/'([^'\\]|\\.)*$/, "string.invalid"],
      [/'$/, "string.sql", "@pop"],
      [/'/, "string.sql", "@stringBody"],
      [/"([^"\\]|\\.)*$/, "string.invalid"],
      [/"$/, "string.sql", "@pop"],
      [/"/, "string.sql", "@dblStringBody"]
    ],
    stringBody: [
      [/[^\\']+/, "string.sql"],
      [/\\./, "string.escape"],
      [/'/, "string.sql", "@pop"]
    ],
    dblStringBody: [
      [/[^\\"]+/, "string.sql"],
      [/\\./, "string.escape"],
      [/"/, "string.sql", "@pop"]
    ]
  }
};
export {
  e as conf,
  s as language
};
/*! Bundled license information:

vitepress-demo-editor/dist/sparql.6c9609f8.js:
  (*!-----------------------------------------------------------------------------
   * Copyright (c) Microsoft Corporation. All rights reserved.
   * Version: 0.33.8(ed685c1f00d1ff3e2873cec2aae0bd338313c4c2)
   * Released under the MIT license
   * https://github.com/microsoft/monaco-editor/blob/main/LICENSE.txt
   *-----------------------------------------------------------------------------*)
*/
//# sourceMappingURL=sparql.6c9609f8-IIXOZRTI.js.map
