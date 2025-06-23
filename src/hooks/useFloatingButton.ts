import { useEffect, useRef, useState } from 'react';

type UseFloatingButtonReturn<T extends HTMLElement> = {
  ref: React.RefObject<T>;
  isBottom: boolean;
};

export function useFloatingButton<T extends HTMLElement>(
  offset: number = 0
): UseFloatingButtonReturn<T> {
  const ref = useRef<T>(null);
  const [isBottom, setIsBottom] = useState(false);

  useEffect(() => {
    const check = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const visible = rect.top < window.innerHeight - offset;
      setIsBottom(visible);
    };

    check(); // 初始檢查

    window.addEventListener('scroll', check);
    window.addEventListener('resize', check);

    return () => {
      window.removeEventListener('scroll', check);
      window.removeEventListener('resize', check);
    };
  }, [offset]);

  return { ref, isBottom };
}
