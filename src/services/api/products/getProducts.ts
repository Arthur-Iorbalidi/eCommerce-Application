import {
  ClientResponse,
  ProductProjectionPagedSearchResponse,
} from '@commercetools/platform-sdk';
import zeroClientApi from '../ZeroClient';
import { projectKey } from '../index';

import {
  createAttributeFilter,
  createCategoryFilter,
  createPriceRangeFilter,
} from '../../helpers/createFilterParams';
import filterAttributes from '../../../components/Catalog/components/filterAttributes';

type QueryParam = string | string[];

interface QueryArgs {
  [key: string]: QueryParam | boolean | number | undefined;
  limit?: number;
  sort?: string;
  'text.EN'?: QueryParam;
  filter?: QueryParam;
}

export default function getProducts(
  callBack: (
    value: ClientResponse<ProductProjectionPagedSearchResponse>,
  ) => void,
  limit: number = 100,
  sortOption?: string,
  orderOption?: string,
  searchText?: string,
  categoryId?: string,
  priceRange?: { min: number; max: number },
  brands?: string[],
  osArray?: string[],
  displayDiagonals?: string[],
): void {
  const queryArgs: QueryArgs = {
    limit,
    sort: `${sortOption} ${orderOption}`,
    'text.EN': searchText ? [searchText] : undefined,
  };

  const categoryFilter = createCategoryFilter(categoryId);
  const priceRangeFilter = createPriceRangeFilter(priceRange);
  const brandFilter = createAttributeFilter(
    filterAttributes.BRAND.value,
    brands,
    filterAttributes.BRAND.isLocalized,
  );
  const osFilter = createAttributeFilter(
    filterAttributes.OS.value,
    osArray,
    filterAttributes.OS.isLocalized,
  );
  const displayDiagonalsFilter = createAttributeFilter(
    filterAttributes.DISPLAY_DIAGONAL.value,
    displayDiagonals,
    filterAttributes.DISPLAY_DIAGONAL.isLocalized,
  );

  const filters: Array<string> = [
    ...(categoryFilter ? [categoryFilter] : []),
    ...(priceRangeFilter ? [priceRangeFilter] : []),
    ...(brandFilter ? [brandFilter] : []),
    ...(osFilter ? [osFilter] : []),
    ...(displayDiagonalsFilter ? [displayDiagonalsFilter] : []),
  ];

  if (filters.length > 0) {
    queryArgs.filter = filters;
  }

  zeroClientApi()
    .withProjectKey({ projectKey })
    .productProjections()
    .search()
    .get({
      queryArgs,
    })
    .execute()
    .then((res) => {
      if (res.statusCode === 200) {
        callBack(res);
      }
    });
}
