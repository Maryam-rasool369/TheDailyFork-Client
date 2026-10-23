import { useEffect, useRef } from "react";
import { env } from "../../config/env";
import { useAuth } from "../../hooks/useAuth";

declare global {
    interface Window {
        google: any;
    }
}

const GoogleSignInButton = () => {
    const { googleLogin } = useAuth();
    const buttonRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!window.google || !buttonRef.current) return;

        window.google.accounts.id.initialize({
            client_id: env.VITE_GOOGLE_CLIENT_ID,
            callback: (response: { credential: string }) => {
                googleLogin(response.credential);
            },
        });

        window.google.accounts.id.renderButton(buttonRef.current, {
            theme: "outline",
            size: "large",
            width: "100%",
        });
    }, []);

    return <div ref={buttonRef} />;
};

export default GoogleSignInButton;