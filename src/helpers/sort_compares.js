/* comparisons */
//index of 8 is the acutal zipCode
export function alphaCompareDes(a,b) {
  if (a[8] > b[8])
    return -1;
  if (a[8] < b[8])
    return 1;
  return 0;
}

export function alphaCompareAsc(a,b) {
  if (a[8] < b[8])
    return -1;
  if (a[8] > b[8])
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
