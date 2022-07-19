export default function getFlagEmoji(countryCode: string) {
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map((char, index) => 127397 + char.charCodeAt(0));
  return String.fromCodePoint(...codePoints);
}
