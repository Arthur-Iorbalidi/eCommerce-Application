export default function getCalculatedPrice(
  price: number,
  fractionDigits: number,
): number {
  return price / 10 ** fractionDigits;
}
