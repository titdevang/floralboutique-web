import { BadgeProps } from '@/app/types/Badge';
import React from 'react'

const Badge: React.FC<BadgeProps> = ({
  count = 0
}) => {
  return (
    <div className="bg-primary w-auto flex items-center justify-center text-[10px] md:text-[0.75rem] font-[500] absolute top-[-10px] right-[-10px] text-white px-[0.5em] text-center whitespace-nowrap align-baseline rounded-[10rem] ">
      {count}
    </div>
  );
}

export default Badge;