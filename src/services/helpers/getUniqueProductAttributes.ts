/* eslint-disable no-nested-ternary */
import { ProductProjection } from '@commercetools/platform-sdk';
import { FilterAttribute } from '../../components/Catalog/components/filters/filterAttributes';
import sortProductAttributesAscending from './sortProductAttributesAscending';

export default function getUniqueProductAttributes(
  products: ProductProjection[],
  filterAttribute: FilterAttribute,
) {
  const attributes = products
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

  const uniqueAttributesSet = new Set(attributes);

  const uniqueAttributesArray = Array.from(uniqueAttributesSet);

  return sortProductAttributesAscending(uniqueAttributesArray);
}
