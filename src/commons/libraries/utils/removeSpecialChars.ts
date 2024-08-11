export default function removeSpecialChars(input: string) {
  if (input === '') return '';

  const filter = /[^ㄱ-ㅎㅏ-ㅣ가-힣a-zA-Z0-9]/g;

  const cleanString = input.replace(filter, '');

  return cleanString;
}
