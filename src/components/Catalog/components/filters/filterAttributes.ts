export interface FilterAttribute {
  value: string;
  isLocalized: boolean;
}

export interface FilterAttributes {
  BRAND: FilterAttribute;
  OS: FilterAttribute;
  DISPLAY_DIAGONAL: FilterAttribute;
}

const filterAttributes: FilterAttributes = {
  BRAND: { value: 'brand', isLocalized: true },
  OS: { value: 'os', isLocalized: true },
  DISPLAY_DIAGONAL: { value: 'display-diagonal', isLocalized: false },
};

export default filterAttributes;
