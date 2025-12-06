// components/Button.tsx
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
}

const Button: React.FC<ButtonProps> = ({
  loading = false,
  children,
  variant = 'primary',
  className = '',
  ...props
}) => {
  const baseStyles = 'px-4 py-2 rounded-lg font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed';
  
  const variantStyles = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-indigo-500',
    secondary: 'bg-gray-200 text-gray-800 hover:bg-gray-300 focus:ring-gray-400 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600',
    outline: 'border border-indigo-600 text-indigo-600 hover:bg-indigo-50 focus:ring-indigo-500 dark:border-indigo-400 dark:text-indigo-400 dark:hover:bg-indigo-900',
  };

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${className}`}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <div className="flex items-center justify-center">
          <svg className="animate-spin h-5 w-5 text-white mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading...
        </div>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
