import type { PageDataLoaderCacheConfig, RouteParams } from "./types.js";
export interface CacheEntry<T = unknown> {
    data: T;
    timestamp: number;
    ttl: number;
}
export interface CacheKey {
    path: string;
    params: RouteParams;
    query: Record<string, string | string[] | undefined>;
}
/**
 * Main router cache that manages different storage types
 */
export declare class RouterCache {
    private stores;
    constructor();
    /**
     * Get the appropriate cache store for the given config
     */
    private getStore;
    /**
     * Get cached data if it exists and hasn't expired
     */
    get<T>(key: CacheKey, config: PageDataLoaderCacheConfig): null | {
        value: T;
    };
    /**
     * Set cached data with TTL
     */
    set<T>(key: CacheKey, data: T, config: PageDataLoaderCacheConfig): void;
    /**
     * Invalidate cache entries by path patterns across all storage types
     * Supports both exact paths ("/users/1") and folder patterns ("/users/[id]")
     */
    invalidate(...paths: string[]): void;
    /**
     * Invalidate cache entries in a specific store
     */
    private invalidateInStore;
    /**
     * Extract the path part from a cache key
     */
    private extractPathFromCacheKey;
    /**
     * Check if a pattern string contains dynamic segments
     */
    private isPattern;
    /**
     * Check if a given path matches any of the invalidation patterns
     */
    pathMatchesPattern(currentPath: string, patterns: string[]): boolean;
    /**
     * Match a path against a pattern using segment-by-segment comparison
     * This is more reliable than regex for our use case
     */
    private matchPathPattern;
    /**
     * Check if a path segment matches a pattern segment
     */
    private segmentMatches;
    /**
     * Clear all cached data across all storage types
     */
    clear(): void;
    /**
     * Get cache size for debugging (memory cache only)
     */
    size(): number;
}
//# sourceMappingURL=cache.d.ts.map