import React from 'react';
import { Star, StarHalf } from 'lucide-react';

const Rating = ({ value, className = "" }) => {
  const fullStars = Math.floor(value);
  const hasHalfStar = value % 1 >= 0.5;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className={`flex items-center gap-0.5 ${className}`}>
      {[...Array(fullStars)].map((_, i) => (
        <Star key={`full-${i}`} className="w-3 h-3 fill-accent text-accent" />
      ))}
      {hasHalfStar && <StarHalf className="w-3 h-3 fill-accent text-accent" />}
      {[...Array(emptyStars)].map((_, i) => (
        <Star key={`empty-${i}`} className="w-3 h-3 text-gray-300" />
      ))}
      <span className="ml-1.5 text-[10px] font-black text-gray-600 tracking-tighter">({value})</span>
    </div>
  );
};

export default Rating;
