'use client';

import { useEffect, useState } from "react";

interface ClientOnlyProps {
    children: React.ReactNode;
}

// This component is used to render components that are only available on the client side.
// This is a fix for the issue of Next.js rendering components on the server side that are not available on the server side.

const ClientOnly : React.FC<ClientOnlyProps> = ({ children }) => {
    const [hasMounted, setHasMounted] = useState(false);

    useEffect(() => {
        setHasMounted(true);
    }, []);

    if (!hasMounted) {
        return null;
    }

    return (
        <>
            {children}
        </>
    )
}

export default ClientOnly;