import { useCallback, useState } from 'react';

export default function useOpenInfo(defaultValue: any = {}) {
  const [openInfo, setOpenInfo] = useState(defaultValue);
  const close = useCallback(() => {
    setOpenInfo({});
  }, []);
  return { openInfo, setOpenInfo, close };
}
