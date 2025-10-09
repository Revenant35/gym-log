export function hasKeys<T extends string | number | symbol>(record: Record<T, unknown>, keys: readonly T[]): boolean {
  // Check that all specified keys are present in the record
  for (const key of keys) {
    if (!(key in record)) {
      return false;
    }
  }

  // Check that there are no extra keys in the record
  if (Object.keys(record).length !== keys.length) {
    return false;
  }

  return true;
}
