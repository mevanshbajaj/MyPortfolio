import { useTheme } from '../hooks/useTheme';
import { MoonIcon, SunIcon } from './Icons';

export default function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggle } = useTheme();
  const next = theme === 'dark' ? 'light' : 'dark';
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${next} theme`}
      title={`Switch to ${next} theme`}
      className={`rounded-md p-2 text-mute transition-colors duration-150 hover:bg-surface2 hover:text-ink ${className}`}
    >
      {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
    </button>
  );
}
