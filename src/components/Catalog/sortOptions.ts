interface ISortOption {
  name: string;
  value: string;
}

const sortOptions: ISortOption[] = [
  { name: 'ID', value: 'id' },
  { name: 'Price', value: 'price' },
  { name: 'Name', value: 'name.en' },
  { name: 'Date of creation', value: 'createdAt' },
];

const orderOptions: ISortOption[] = [
  { name: 'Ascending', value: 'asc' },
  { name: 'Descending', value: 'desc' },
];

export { sortOptions, orderOptions };
