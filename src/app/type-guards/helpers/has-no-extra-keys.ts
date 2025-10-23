export function hasNoExtraKeys<T extends string | number>(
  record: Record<T, unknown>,
  keys: readonly T[],
): boolean {
  // Check that no keys are in the object that are not in the specified keys
  for (const key in record) {
    if (!keys.includes(key as T)) {
      return false;
    }
  }

  return true;
}
