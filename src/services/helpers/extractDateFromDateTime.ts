export default function extractDateFromDateTime(dateTime: string) {
  const dateObject = new Date(dateTime);

  const year = dateObject.getFullYear();
  const month = (dateObject.getMonth() + 1).toString().padStart(2, '0');
  const day = dateObject.getDate().toString().padStart(2, '0');

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
}
