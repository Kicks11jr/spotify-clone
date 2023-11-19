"use client";

import { MyUserContextProvider } from "@/hooks/useUser";

// UserProvider component props
interface UserProviderProps {
    children: React.ReactNode;
};

// UserProvider component definition
const UserProvider: React.FC<UserProviderProps> = ({
    children
}) => {
    // Wrap the application with the user context provider
    return (
        <MyUserContextProvider>
            {children}
        </MyUserContextProvider>
    )
};

export default UserProvider;