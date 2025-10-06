export interface AppInitializer {
  initialize(): Promise<void>;
}
