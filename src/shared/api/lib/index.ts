export function objectPick<O extends object, T extends keyof O>(
  obj: O,
  keys: T[],
  omitUndefined = false
) {
  return keys.reduce((n, k) => {
    if (k in obj) {
      if (!omitUndefined || obj[k] !== undefined) n[k] = obj[k];
    }
    return n;
  }, {} as Pick<O, T>);
}
