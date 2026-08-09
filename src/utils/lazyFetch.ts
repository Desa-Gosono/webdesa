// src/utils/lazyFetch.ts
const cache = new Map<string, any>();

export const fetchJsonCached = async <T>(url: string): Promise<T> => {
  if (cache.has(url)) {
    return cache.get(url) as T;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    cache.set(url, data);
    return data as T;
  } catch (error) {
    console.error(`Gagal memuat data dari ${url}:`, error);
    throw error;
  }
};
