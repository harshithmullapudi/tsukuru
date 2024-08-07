import { useEffect, useState } from 'react';

export const useDynamicFile = (fileName: string) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`/api/config?fileName=${fileName}`);
        if (!res.ok) {
          throw new Error(`Error fetching ${fileName}`);
        }
        const json = await res.json();
        setData(json);
      } catch (error: any) {
        console.error(error);

        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [fileName]);

  return { data, loading, error };
};
