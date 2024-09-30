import { useState } from 'react';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface FetchResponse<T> {
  data: T | null;
  loading: boolean;
  error: string | null;
  mutateData: (url: string, body: T, method: 'POST' | 'PUT') => Promise<void>;
  fetchData: (url: string) => Promise<void>;
  deleteData: (url: string) => Promise<Response>;
}

export const useFetch = <T,>(): FetchResponse<T> => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // FETCH DATA (GET REQUEST)
  const fetchData = async (url: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}${url}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // HANDLE POST OR PUT REQUESTS
  const mutateData = async (url: string, body: T, method: 'POST' | 'PUT') => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      if (!response.ok) {
        throw new Error(`Failed to ${method} data`);
      }
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // HANDLE DELETE REQUESTS
  const deleteData = async (url: string) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}${url}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        }
      });
      if (!response.ok) {
        throw new Error(`Error deleting data: ${response.status} - ${response.statusText}`);
      }
      return response;
    } catch (err: any) {
      console.error('Error:', err.message);
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  
  return { data, loading, error, mutateData, fetchData, deleteData };
};
