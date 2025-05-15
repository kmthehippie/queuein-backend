export function convertText(inputString) {
  if (!inputString) {
    return "";
  }
  const decodedString = inputString.replace(/%20/g, " ");
  const stringWithSpaces = decodedString.replace(/_/g, " ");

  const titleCaseString = stringWithSpaces
    .toLowerCase()
    .split(" ")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");

  return titleCaseString;
}
