export function isRecord<T extends string | number | symbol>(v: unknown): v is Record<T, unknown> {
  return typeof v === 'object' && v !== null;
}
