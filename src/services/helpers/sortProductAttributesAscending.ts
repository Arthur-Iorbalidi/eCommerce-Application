function isNumber(value: number | string): value is number {
  return typeof value === 'number';
}

export default function sortProductAttributesAscending(
  items: (string | number)[],
): string[] {
  const cleanedAndParsed: (number | string)[] = items.map((item) => {
    let parsedItem = item;
    if (typeof item === 'string') {
      const parsed = parseFloat(item.replace(/\s+/g, ''));
      if (!Number.isNaN(parsed)) {
        parsedItem = parsed;
      }
    }
    return parsedItem;
  });

  const sortedItems: (number | string)[] = cleanedAndParsed.sort((a, b) => {
    if (isNumber(a) && isNumber(b)) {
      return a - b;
    }
    return String(a).localeCompare(String(b));
  });

  const finalSortedItems: string[] = sortedItems.map((item) => {
    if (isNumber(item)) {
      return `${item}`;
    }
    return item.toString();
  });

  return finalSortedItems;
}
