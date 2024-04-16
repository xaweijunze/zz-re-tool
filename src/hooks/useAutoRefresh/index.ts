import { useEffect } from 'react';

export default function useAutoRefresh(refresh: Function) {
  useEffect(() => {
    refresh();
  }, [refresh]);
}
