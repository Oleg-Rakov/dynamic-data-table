import { useCallback, useEffect, useRef, useState } from 'react';

// transient message that clears itself; re-notifying resets the timer.
export function useNotice(duration = 2500) {
  const [notice, setNotice] = useState('');
  const timer = useRef<ReturnType<typeof setTimeout>>();

  const notify = useCallback(
    (message: string) => {
      setNotice(message);
      clearTimeout(timer.current);
      timer.current = setTimeout(() => setNotice(''), duration);
    },
    [duration],
  );

  useEffect(() => () => clearTimeout(timer.current), []);

  return { notice, notify };
}
