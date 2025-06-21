import React from 'react';

export default function useDebounce<T>(value: T, delay: number = 300): T {
  const [debounceValue, setDebounceValue] = React.useState(value);
  
  React.useEffect(() => {
    const timer = setTimeout(() => setDebounceValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  
  return debounceValue;
}