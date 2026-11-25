import { useState } from 'react';

export function Logo({ className = 'h-8 w-8' }: { className?: string }) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <span aria-label="SuciTroll Logo" role="img" className={`${className} inline-flex items-center justify-center hair font-display font-bold`}>
        S
      </span>
    );
  }

  return (
    <img
      src="./logo.png"
      alt="SuciTroll Logo"
      className={`${className} logo-img`}
      draggable={false}
      onError={() => setFailed(true)}
    />
  );
}
