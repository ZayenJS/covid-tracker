import React, { FC } from 'react';

interface SlotProps {
  value?: number;
  message: string;
  className?: string;
}

const Slot: FC<SlotProps> = ({ message, value, className }) => {
  return (
    <span className={className}>
      {value} {message}
    </span>
  );
};

export default Slot;
