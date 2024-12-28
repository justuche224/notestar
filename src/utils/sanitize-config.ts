const sanitizeConfig = {
  ALLOWED_TAGS: [
    // Text formatting
    "p",
    "br",
    "strong",
    "em",
    "u",
    "s",
    "mark", // For highlighting
    "span",
    "div",

    // Code blocks
    "code",
    "pre",

    // Headings
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",

    // Lists
    "ul",
    "ol",
    "li",

    // Other block elements
    "blockquote",
    "hr",
    "img",
    "figure",
    "figcaption",

    // Tables
    "table",
    "thead",
    "tbody",
    "tr",
    "th",
    "td",

    // Links
    "a",
  ],

  ALLOWED_ATTR: [
    // Common attributes
    "id",
    "class",
    "style",
    "dir",
    "spellcheck",

    // Media attributes
    "src",
    "alt",
    "title",
    "width",
    "height",

    // Link attributes
    "href",
    "target",
    "rel",

    // Text alignment
    "align",

    // Data attributes
    "data-*",

    // Table attributes
    "colspan",
    "rowspan",

    // Code block attributes
    "data-language",
    "data-line-numbers",

    // Editor attributes
    "data-type",
    "data-align",
    "contenteditable",
  ],

  ALLOWED_STYLES: [
    // Text styling
    "color",
    "background-color",
    "font-family",
    "font-size",
    "font-weight",
    "font-style",
    "text-decoration",
    "text-align",

    // Spacing
    "margin",
    "margin-left",
    "margin-right",
    "margin-top",
    "margin-bottom",
    "padding",
    "padding-left",
    "padding-right",
    "padding-top",
    "padding-bottom",

    // Display and positioning
    "display",
    "width",
    "height",
    "vertical-align",

    // Highlighting
    "background",
    "border-radius",

    // Code block styling
    "white-space",
    "tab-size",
    "hyphens",
    "line-height",
    "overflow-x",
    "overflow-y",
  ],

  ADD_TAGS: [],
  ADD_ATTR: [],

  // Prevent script injection
  FORBID_TAGS: ["script", "style", "iframe", "form", "input", "button"],
  FORBID_ATTR: ["onerror", "onload", "onclick", "onmouseover"],

  // URL sanitization for images and links
  ALLOW_DATA_ATTR: true,
  ALLOW_UNKNOWN_PROTOCOLS: false,

  // Keep the URL structure but sanitize it
  ALLOW_ARIA_ATTR: true,

  // Configure custom tags/attributes if needed
  CUSTOM_ELEMENT_HANDLING: {
    tagNameCheck: null,
    attributeNameCheck: null,
    allowCustomizedBuiltInElements: false,
  },
};

export default sanitizeConfig;
