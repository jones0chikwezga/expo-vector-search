import { useCallback, useEffect, useRef, useState } from 'react';
import { SearchResult, Vector } from './ExpoVectorSearch.types';
import { SearchOptions, VectorIndex, VectorIndexOptions } from './ExpoVectorSearchModule';

export interface UseVectorSearchReturn {
    index: VectorIndex | null;
    isReady: boolean;
    error: Error | null;
    add: (key: number, vector: Vector) => void;
    search: (vector: Vector, count: number, options?: SearchOptions) => SearchResult[];
    remove: (key: number) => void;
    update: (key: number, vector: Vector) => void;
}

/**
 * A React hook that manages the lifecycle of a VectorIndex.
 * Automatically handles index creation and cleanup (deletion) on unmount.
 *
 * @param dimensions The dimensionality of the vectors.
 * @param options Index configuration options.
 */
export function useVectorSearch(
    dimensions: number,
    options?: VectorIndexOptions
): UseVectorSearchReturn {
    const [isReady, setIsReady] = useState(false);
    const [error, setError] = useState<Error | null>(null);
    const indexRef = useRef<VectorIndex | null>(null);

    useEffect(() => {
        try {
            if (!indexRef.current) {
                indexRef.current = new VectorIndex(dimensions, options);
                setIsReady(true);
                setError(null);
            }
        } catch (err) {
            console.error('Failed to initialize VectorIndex:', err);
            setError(err instanceof Error ? err : new Error(String(err)));
            setIsReady(false);
        }

        return () => {
            if (indexRef.current) {
                try {
                    indexRef.current.delete();
                } catch (err) {
                    console.warn('Error deleting VectorIndex on unmount:', err);
                }
                indexRef.current = null;
                setIsReady(false);
            }
        };
    }, [dimensions, JSON.stringify(options)]);

    const add = useCallback((key: number, vector: Vector) => {
        if (!indexRef.current) throw new Error('Index not ready');
        indexRef.current.add(key, vector);
    }, []);

    const search = useCallback((vector: Vector, count: number, options?: SearchOptions) => {
        if (!indexRef.current) throw new Error('Index not ready');
        return indexRef.current.search(vector, count, options);
    }, []);

    const remove = useCallback((key: number) => {
        if (!indexRef.current) throw new Error('Index not ready');
        indexRef.current.remove(key);
    }, []);

    const update = useCallback((key: number, vector: Vector) => {
        if (!indexRef.current) throw new Error('Index not ready');
        indexRef.current.update(key, vector);
    }, []);

    return {
        index: indexRef.current,
        isReady,
        error,
        add,
        search,
        remove,
        update,
    };
}
