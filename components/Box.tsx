import { twMerge } from "tailwind-merge";

// Box component props
interface BoxProps {
    children: React.ReactNode; // Content to be placed inside the box
    className?: string; // Additional CSS classes that can be passed to the component
}

// Defining the Box component as a functional component
const Box: React.FC<BoxProps> = ({
    children,
    className
}) => {
    return (
        // The main container div for the Box component with Tailwind CSS classes
        <div className={twMerge(`
            bg-neutral-900
            rounded-lg
            h-fit
            w-full
        `,
            className
        )}>
            {children} {/* Rendering the content passed as children */}
        </div>
    );
}

export default Box;