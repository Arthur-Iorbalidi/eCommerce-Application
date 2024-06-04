import { ProductProjection } from '@commercetools/platform-sdk';

export default function getUniqueProductsBrands(products: ProductProjection[]) {
  const brands = products
    .map(
      (product) =>
        product.masterVariant?.attributes?.find((attr) => attr.name === 'brand')
          ?.value.en || null,
    )
    .filter(Boolean);

  const uniqueBrandSet = new Set(brands);

  const uniqueBrandsArray = Array.from(uniqueBrandSet);

  return uniqueBrandsArray;
}
