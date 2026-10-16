// Function to generate a URL-friendly slug from a string
function generateSlug(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters
    .replace(/[\s_-]+/g, '-') // Replace spaces and underscores with hyphens
    .replace(/^-+|-+$/g, ''); // Remove leading/trailing hyphens
}

// Function to generate a unique slug
export function generateUniqueSlug(title, existingSlugs) {
  let slug = generateSlug(title);
  let counter = 0;
  let uniqueSlug = slug;

  // Check if slug already exists, if so, add a counter
  while (existingSlugs.includes(uniqueSlug)) {
    counter++;
    uniqueSlug = `${slug}-${counter}`;
  }

  return uniqueSlug;
}

