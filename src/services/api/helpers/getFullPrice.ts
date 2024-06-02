import { Product } from '@commercetools/platform-sdk';
import getCalculatedPrice from './getCalculatedPrice';

export default function getFullPrice(product: Product): string {
  if (
    !product.masterData.current.masterVariant.prices?.[0].discounted?.value
      .centAmount
  ) {
    return '';
  }
  return `$${getCalculatedPrice(
    product.masterData.current.masterVariant.prices?.[0].value
      .centAmount as number,
    product.masterData.current.masterVariant.prices?.[0].value
      .fractionDigits as number,
  )}`;
}
