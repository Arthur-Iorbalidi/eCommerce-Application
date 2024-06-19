/* eslint-disable @typescript-eslint/indent */

export function createAttributeFilter(
  key: string,
  values: string[] | undefined,
  isLocalized: boolean,
): string | null {
  if (!values?.length) return null;

  let filterCondition = '';

  if (isLocalized) {
    filterCondition = `variants.attributes.${key}.en:`;
  } else {
    filterCondition = `variants.attributes.${key}:`;
  }

  values.forEach((value, index) => {
    if (index === 0) {
      filterCondition += `"${value}"`;
    } else {
      filterCondition += `, "${value}"`;
    }
  });

  return filterCondition.trim();
}

export function createCategoryFilter(
  categoryId: string | undefined,
): string | null {
  if (!categoryId) return null;
  return `categories.id:"${categoryId}"`;
}

export function createPriceRangeFilter(
  priceRange:
    | {
        min: number;
        max: number;
      }
    | undefined,
): string | null {
  if (!priceRange) return null;
  return `variants.price.centAmount:range (${priceRange.min} to ${priceRange.max})`;
}
