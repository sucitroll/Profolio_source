import { useEffect, useState } from 'react';

export function useClock(timeZone?: string) {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 1000);
    return () => window.clearInterval(id);
  }, []);

  const time = now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit', second: '2-digit', timeZone });
  const offset = -now.getTimezoneOffset() / 60;
  const zone = timeZone ? '' : `GMT${offset >= 0 ? '+' : ''}${offset}`;
  return { time, zone, year: now.getFullYear() };
}
