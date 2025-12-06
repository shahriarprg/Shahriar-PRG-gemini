// components/MediumCard.tsx
import React from 'react';
import { MediumOption } from '../types';

interface MediumCardProps {
  medium: MediumOption;
  isSelected: boolean;
  onSelect: (mediumId: string) => void;
}

const MediumCard: React.FC<MediumCardProps> = ({ medium, isSelected, onSelect }) => {
  return (
    <div
      className={`
        relative flex flex-col items-center p-4 rounded-lg shadow-sm cursor-pointer
        transition-all duration-200 ease-in-out
        ${isSelected
          ? 'bg-indigo-100 dark:bg-indigo-900 ring-2 ring-indigo-500 dark:ring-indigo-400'
          : 'bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700'
        }
      `}
      onClick={() => onSelect(medium.id)}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 text-indigo-600 dark:text-indigo-400">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        </div>
      )}
      <img src={medium.icon} alt={medium.name} className="w-12 h-12 mb-2 object-contain" />
      <h3 className="text-md font-semibold text-center">{medium.name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mt-1">{medium.description}</p>
    </div>
  );
};

export default MediumCard;
