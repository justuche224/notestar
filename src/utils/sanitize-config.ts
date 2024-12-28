const sanitizeConfig = {
  ALLOWED_TAGS: [
    "p",
    "br",
    "strong",
    "em",
    "u",
    "s",
    "code",
    "pre",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "ul",
    "ol",
    "li",
    "blockquote",
    "hr",
    "img",
  ],
  ALLOWED_ATTR: [
    "src",
    "alt", // For images
    "class", // For syntax highlighting and other styling
    "style",
    //'data-*' to use any data attributes
  ],
  ALLOWED_STYLES: [], // Empty array means no inline styles allowed
  ADD_TAGS: [], // Any additional tags
  ADD_ATTR: [], // Any additional attributes
};

export default sanitizeConfig;
