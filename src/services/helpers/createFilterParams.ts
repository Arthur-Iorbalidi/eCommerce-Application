/* eslint-disable @typescript-eslint/indent */
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

export function createBrandFilter(brands: string[] | undefined): string | null {
  if (!brands?.length) return null;
  let brandsFilterCondition = 'variants.attributes.brand.en:';
  brands.forEach((brand, index) => {
    if (index === 0) {
      brandsFilterCondition += `"${brand}"`;
    } else {
      brandsFilterCondition += `, "${brand}"`;
    }
  });
  return brandsFilterCondition.trim();
}
