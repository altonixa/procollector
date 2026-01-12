import * as React from 'react';
import { cn } from '../../lib/utils';
import { Loader2 } from 'lucide-react';

export interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'outline' | 'destructive' | 'ghost' | 'white';
    size?: 'default' | 'sm' | 'lg' | 'icon';
    isLoading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    ({ className, variant = 'primary', size = 'default', isLoading, children, ...props }, ref) => {
        return (
            <button
                ref={ref}
                className={cn(
                    "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 uppercase tracking-wide",

                    // Variants
                    variant === 'primary' && "bg-blue-600 text-white hover:bg-blue-700 border border-blue-600",
                    variant === 'secondary' && "bg-gray-600 text-white hover:bg-gray-700 border border-gray-600",
                    variant === 'outline' && "border border-gray-300 bg-transparent text-gray-700 hover:bg-gray-50",
                    variant === 'destructive' && "bg-red-600 text-white hover:bg-red-700 border border-red-600",
                    variant === 'ghost' && "text-gray-600 hover:bg-gray-100",
                    variant === 'white' && "bg-white text-gray-900 hover:bg-gray-50 border border-gray-300",

                    // Sizes
                    size === 'default' && "h-12 px-8",
                    size === 'sm' && "h-10 px-6 text-xs",
                    size === 'lg' && "h-16 px-12 text-base rounded-2xl",
                    size === 'icon' && "h-12 w-12",

                    className
                )}
                disabled={isLoading || props.disabled}
                {...props}
            >
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                {!isLoading && children}
            </button>
        );
    }
);
Button.displayName = "Button";

export { Button };
