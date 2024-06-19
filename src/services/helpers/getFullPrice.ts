import { Price } from '@commercetools/platform-sdk';
import getCalculatedPrice from './getCalculatedPrice';

export default function getFullPrice(prices: Price[]): string {
  if (!prices?.[0].discounted?.value.centAmount) {
    return '';
  }
  return `$${getCalculatedPrice(
    prices?.[0].value.centAmount as number,
    prices?.[0].value.fractionDigits as number,
  )}`;
}
