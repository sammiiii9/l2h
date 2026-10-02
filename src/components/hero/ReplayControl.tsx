'use client';

import React from 'react';
import { RotateCcw } from 'lucide-react';
import styles from './hero.module.css';

interface ReplayControlProps {
  onReplay: () => void;
}

export default function ReplayControl({ onReplay }: ReplayControlProps) {
  return (
    <button
      type="button"
      onClick={onReplay}
      className={styles.heroReplayBtn}
      aria-label="Replay hero animation"
      title="Replay hero intro animation"
    >
      <RotateCcw className="w-4 h-4 text-[#B8945B]" aria-hidden="true" />
    </button>
  );
}
