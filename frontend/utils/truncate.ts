export function truncateSentence(sentence: string, wordLimit: number): string {
  const words = sentence.trim().split(/\s+/);

  if (words.length <= wordLimit) return sentence;

  return `${words.slice(0, wordLimit).join(' ')}...`;
}
