"user client";

import { Toaster } from "react-hot-toast";

// Functional component ToasterProvider
const ToasterProvider = () => {
    return (
        // Rendering the Toaster component with custom toast options
        <Toaster
            toastOptions={{
                style: {
                    background: "#333",
                    color: "#fff",
                }
            }}
        />
    );
};

export default ToasterProvider;