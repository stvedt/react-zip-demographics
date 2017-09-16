/* comparisons */
export function alphaCompareDes(a,b) {
  if (a.name > b.name)
    return -1;
  if (a.name < b.name)
    return 1;
  return 0;
}

export function alphaCompareAsc(a,b) {
  if (a.name < b.name)
    return -1;
  if (a.name > b.name)
    return 1;
  return 0;
}

export function alphaCompareCatAsc(a,b) {
  if (a < b)
    return -1;
  if (a > b)
    return 1;
  return 0;
}
