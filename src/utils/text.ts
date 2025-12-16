// Utility function for sanitizing text for JSON-LD schemas
export const cleanText = (text: string) => {
  if (!text) return '';
  return text
    .replace(/<[^>]+>/g, '')          // Strip HTML
    .replace(/\[.*?\]/g, '')          // Strip [citations] & artifacts
    .replace(/\s+/g, ' ')             // Collapse whitespace
    .trim();
};
