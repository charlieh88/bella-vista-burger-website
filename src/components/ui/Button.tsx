import { cn } from '@/lib/utils';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export function Button({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  onClick,
  className 
}: ButtonProps) {
  const baseClasses = "font-medium rounded-lg transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
  
  const variants = {
    primary: "bg-amber-600 text-white hover:bg-amber-700 focus:ring-amber-500",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 focus:ring-gray-500",
    outline: "border-2 border-amber-600 text-amber-600 hover:bg-amber-600 hover:text-white focus:ring-amber-500"
  };
  
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg"
  };

  return (
    <button
      onClick={onClick}
      className={cn(
        baseClasses,
        variants[variant],
        sizes[size],
        className
      )}
    >
      {children}
    </button>
  );
}