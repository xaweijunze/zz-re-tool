import { useEffect } from 'react';

export default function useTimerRefresh(props: any = {}) {
  const { fetch, record = 3000, firstFlag = true, openFlag = true } = props;

  useEffect(() => {
    firstFlag && fetch();
    const timer = setInterval(() => {
      openFlag && fetch();
    }, record);
    return () => {
      clearInterval(timer);
    };
  }, [fetch, record]);
}


