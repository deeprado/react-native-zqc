export function numberText(number) {
  if (!number) {
    return '0';
  }
  if (number < 10000) {
    return number.toString();
  } else {
    return Math.round(number / 10000) + '万';
  }
}
