import { Product } from '@commercetools/platform-sdk';
import getCalculatedPrice from './getCalculatedPrice';

export default function getDiscountedPrice(product: Product): string {
  if (
    !product.masterData.current.masterVariant.prices?.[0].discounted?.value
      .centAmount
  ) {
    return `$${getCalculatedPrice(
      product.masterData.current.masterVariant.prices?.[0].value
        .centAmount as number,
      product.masterData.current.masterVariant.prices?.[0].value
        .fractionDigits as number,
    )}`;
  }
  return `$${getCalculatedPrice(
    product.masterData.current.masterVariant.prices?.[0].discounted?.value
      .centAmount as number,
    product.masterData.current.masterVariant.prices?.[0].discounted?.value
      .fractionDigits as number,
  )}`;
}
