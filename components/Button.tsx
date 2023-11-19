import { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

// Props interface for the Button component, extending standard HTML button attributes
interface ButtonProps
    extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

// Button component using forwardRef to forward the ref to the underlying button element
const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
    className,
    children,
    disabled,
    type ="button",
    ...props
}, ref ) => {
    return (
        <button
            type={type}
            className={twMerge(`
                w-full
                rounded-full
                bg-green-500
                border
                border-transparent
                px-3
                py-3
                disabled:cursor-not-allowed
                disabled:opacity-50
                text-black
                font-bold
                hover:opacity-75
                transition
            `,
                className
            )}
            disabled={disabled}
            ref={ref}
            {...props}
        >
            {children}
        </button>
    )
})

// Setting the display name for the Button component
Button.displayName = "Button";

export default Button;