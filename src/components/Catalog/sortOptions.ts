interface ISortOption {
  name: string;
  value: string;
}

const sortOptions: ISortOption[] = [
  { name: 'Publication date', value: 'createdAt' },
  { name: 'Price', value: 'price' },
  { name: 'Name', value: 'name.en' },
];

const orderOptions: ISortOption[] = [
  { name: 'Ascending', value: 'asc' },
  { name: 'Descending', value: 'desc' },
];

export { sortOptions, orderOptions };
