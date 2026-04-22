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
                    "inline-flex items-center justify-center whitespace-nowrap rounded-lg text-sm font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",

                    variant === 'primary' && "bg-brand text-white hover:bg-brand-hover",
                    variant === 'secondary' && "bg-ink text-white hover:bg-ink/90",
                    variant === 'outline' && "border border-line-strong bg-white text-ink hover:bg-bg-subtle",
                    variant === 'destructive' && "bg-red-600 text-white hover:bg-red-700",
                    variant === 'ghost' && "text-ink hover:bg-bg-subtle",
                    variant === 'white' && "bg-white text-ink hover:bg-bg-subtle border border-line",

                    size === 'default' && "h-10 px-4",
                    size === 'sm' && "h-8 px-3 text-xs",
                    size === 'lg' && "h-11 px-6 text-[15px]",
                    size === 'icon' && "h-10 w-10",

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
