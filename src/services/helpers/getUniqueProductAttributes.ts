/* eslint-disable no-nested-ternary */
import { ProductProjection } from '@commercetools/platform-sdk';
import { FilterAttribute } from '../../components/Catalog/components/filterAttributes';
import sortProductAttributesAscending from './sortProductAttributesAscending';

export default function getUniqueProductAttributes(
  products: ProductProjection[],
  filterAttribute: FilterAttribute,
) {
  const brands = products
    .map((product) => {
      const attribute = product.masterVariant?.attributes?.find(
        (attr) => attr.name === filterAttribute.value,
      );
      return attribute
        ? filterAttribute.isLocalized
          ? attribute.value.en
          : attribute.value
        : null;
    })
    .filter(Boolean);

  const uniqueBrandSet = new Set(brands);

  const uniqueBrandsArray = Array.from(uniqueBrandSet);

  return sortProductAttributesAscending(uniqueBrandsArray);
}
