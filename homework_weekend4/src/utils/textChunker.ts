export function chunkText(text: string, chunkSize: number = 3000): string[] {
  const chunks: string[] = [];
  let currentIndex = 0;

  while (currentIndex < text.length) {
    // Find the last period before the chunk size limit
    let endIndex = Math.min(currentIndex + chunkSize, text.length);
    if (endIndex < text.length) {
      const lastPeriod = text.lastIndexOf('.', endIndex);
      if (lastPeriod > currentIndex) {
        endIndex = lastPeriod + 1;
      }
    }

    chunks.push(text.slice(currentIndex, endIndex).trim());
    currentIndex = endIndex;
  }

  return chunks;
}