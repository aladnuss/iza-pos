import React from 'react';

interface CloseButtonProps {
  onClose?: () => void;
}

export default function CloseButton({ onClose }: CloseButtonProps) {
  return (
    <>
      {onClose && (
        <button onClick={onClose} className="text-gray-400 hover:text-white text-2xl leading-none">&times;</button>
      )}
    </>
  );
}
