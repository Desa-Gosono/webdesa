import { useState, useEffect } from 'react';

interface JsonDataState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

export function useJsonData<T>(filename: string) {
  const [state, setState] = useState<JsonDataState<T>>({
    data: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const response = await fetch(`/data/${filename}`);
        if (!response.ok) {
          throw new Error(`Failed to fetch ${filename}`);
        }
        const data = await response.json();
        if (isMounted) {
          setState({ data, loading: false, error: null });
        }
      } catch (error) {
        if (isMounted) {
          setState({ data: null, loading: false, error: error as Error });
        }
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [filename]);

  return state;
}
