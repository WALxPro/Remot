import sanitizeHtml from "sanitize-html";

const ALLOWED_STYLES = {
  "*": {
    "font-size": [
      /^(?:\d{1,3}(?:\.\d+)?)(?:px|pt|em|rem|%)$/,
    ],

    "font-family": [
      /^[a-zA-Z0-9\s,'"-]{1,200}$/,
    ],

    "font-weight": [
      /^(normal|bold|bolder|lighter|[1-9]00)$/,
    ],

    "font-style": [
      /^(normal|italic|oblique)$/,
    ],

    color: [
      /^#[a-fA-F0-9]{3,8}$/,
      /^rgba?\([\d\s.,%]+\)$/,
      /^[a-zA-Z]{1,24}$/,
    ],

    "background-color": [
      /^#[a-fA-F0-9]{3,8}$/,
      /^rgba?\([\d\s.,%]+\)$/,
      /^[a-zA-Z]{1,24}$/,
    ],

    "text-align": [
      /^(left|right|center|justify|start|end)$/,
    ],

    "text-decoration": [
      /^(none|underline|line-through|overline)$/,
    ],

    "line-height": [
      /^(normal|\d+(?:\.\d+)?(?:px|pt|em|rem|%)?)$/,
    ],

    "margin-top": [
      /^\d{1,3}(?:\.\d+)?(?:px|pt|em|rem|%)$/,
    ],

    "margin-bottom": [
      /^\d{1,3}(?:\.\d+)?(?:px|pt|em|rem|%)$/,
    ],

    "padding-left": [
      /^\d{1,3}(?:\.\d+)?(?:px|pt|em|rem|%)$/,
    ],

    "list-style-type": [
      /^(disc|circle|square|decimal|lower-alpha|upper-alpha|lower-roman|upper-roman|none)$/,
    ],
  },
};

const SANITIZER_CONFIG = {
  allowedTags: [
    ...new Set([
      ...sanitizeHtml.defaults.allowedTags,
      "img",
      "span",
      "u",
      "s",
      "strike",
      "figure",
      "figcaption",
      "sub",
      "sup",
      "colgroup",
      "col",
    ]),
  ],

  allowedAttributes: {
    "*": ["style"],

    a: ["href", "target", "rel"],

    img: ["src", "alt", "width", "height"],

    td: ["colspan", "rowspan"],

    th: ["colspan", "rowspan", "scope"],

    ol: ["start", "reversed"],

    li: ["value"],

    col: ["span"],
  },

  allowedStyles: ALLOWED_STYLES,

  allowedSchemes: ["http", "https", "mailto"],

  allowedSchemesByTag: {
    img: ["http", "https"],
  },

  allowProtocolRelative: false,
};

export function sanitizeBlogContent(content) {
  return sanitizeHtml(content, SANITIZER_CONFIG);
}