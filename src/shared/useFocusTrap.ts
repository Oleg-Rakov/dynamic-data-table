import { useEffect } from 'react';
import type { RefObject } from 'react';

// keep Tab inside `ref` while mounted, close on Escape, restore focus on unmount.
export function useFocusTrap(
  ref: RefObject<HTMLElement>,
  onEscape: () => void,
) {
  useEffect(() => {
    const container = ref.current;
    if (!container) return;
    // capture the opener before moving focus in, so we can restore it on close.
    const opener = document.activeElement as HTMLElement | null;
    container.querySelector<HTMLElement>('input, button')?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onEscape();
        return;
      }
      if (event.key !== 'Tab') return;
      const focusable =
        container.querySelectorAll<HTMLElement>('input, button');
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    container.addEventListener('keydown', handleKeyDown);
    return () => {
      container.removeEventListener('keydown', handleKeyDown);
      opener?.focus();
    };
  }, [ref, onEscape]);
}
