import { useEffect, useRef, type ReactNode } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../lib/motion';

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

interface ModalProps {
  /** id of the element that names the dialog. */
  labelledBy: string;
  onClose: () => void;
  children: ReactNode;
  /** `top` is used by the command palette; `center` (bottom sheet on phones) by everything else. */
  placement?: 'center' | 'top';
  className?: string;
  /** Element to focus on open; defaults to the first focusable element. */
  initialFocus?: React.RefObject<HTMLElement>;
}

/** Accessible modal shell: focus trap, Escape to close, scroll lock, focus restore, animated entrance. */
export default function Modal({ labelledBy, onClose, children, placement = 'center', className = '', initialFocus }: ModalProps) {
  const dialogRef = useRef<HTMLDivElement>(null);
  const onCloseRef = useRef(onClose);
  onCloseRef.current = onClose;

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const target = initialFocus?.current ?? dialogRef.current?.querySelector<HTMLElement>(FOCUSABLE) ?? dialogRef.current;
    target?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault();
        onCloseRef.current();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;
      const nodes = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const align = placement === 'top' ? 'items-start justify-center p-4 pt-[12svh] sm:p-6 sm:pt-[14svh]' : 'items-end justify-center sm:items-center sm:p-6';

  return (
    <motion.div
      className={`fixed inset-0 z-[80] flex ${align}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.18 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => onCloseRef.current()} aria-hidden="true" />
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy}
        tabIndex={-1}
        initial={{ opacity: 0, y: 24, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 16, scale: 0.98 }}
        transition={{ duration: 0.22, ease: EASE }}
        className={`relative z-10 flex w-full flex-col overflow-hidden border border-line-strong bg-surface shadow-2xl ${className}`}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}
