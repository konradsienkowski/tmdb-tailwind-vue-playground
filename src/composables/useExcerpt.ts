// Transform content into the meta description
export function useExcerpt (data: {
  content: string,
  length?: number
}): string {
  // Define variables & default values
  let content: string = data.content
  const length: number = data.length ? data.length : 240

  // Remove new lines from the content before truncating
  content = content.replace(/\n\s*\n/g, ' ')

  // Truncate content to the character limit
  if (content.length >= length) {
    return content.slice(0, length) + '...'
  } else {
    return content
  }
}