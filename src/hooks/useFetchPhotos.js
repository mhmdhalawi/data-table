import { useState, useEffect } from 'react';
import { useStore } from '../store';

export const useFetchPhotos = () => {
  const setPhotos = useStore((state) => state.setPhotos);
  const photos = useStore((state) => state.photos);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchPhotos = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos?_limit=100');
      const data = await response.json();
      setPhotos(data);
      setLoading(false);
    } catch (error) {
      setError(error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPhotos();
  }, []);

  return { photos, loading, error };
};
