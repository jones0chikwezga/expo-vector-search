import { createMMKV } from 'react-native-mmkv';

// Initialize MMKV instance
export const storage = createMMKV({
    id: 'vector-search-storage'
});

export const StorageKeys = {
    // Store the count of loaded items to verify persistence logic
    LOADED_COUNT: 'loaded_count',
    // Potentially store the entire set of IDs if we wanted to avoid importing metadata
    // But for this demo, we'll import metadataJSON and just persist "state" like "hasInitialized"
    HAS_INITIALIZED: 'has_initialized'
};

export function saveState(count: number) {
    storage.set(StorageKeys.LOADED_COUNT, count);
    storage.set(StorageKeys.HAS_INITIALIZED, true);
}

export function loadState() {
    const hasInit = storage.getBoolean(StorageKeys.HAS_INITIALIZED);
    const count = storage.getNumber(StorageKeys.LOADED_COUNT) || 0;
    return { hasInit, count };
}
