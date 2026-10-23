import React from "react";
import GoogleSignInButton from "./GoogleSignInButton";

const AuthButtons: React.FC = () => {
    return (
        <div className="mt-10 space-y-4">
            {/* Google */}
            <GoogleSignInButton />

            {/* Facebook */}
            
            {/* <button
                type="button"
                className="flex w-full items-center justify-center gap-3 rounded-xl border border-gray-200 bg-white px-4 py-2 font-medium text-ink transition hover:border-purple hover:bg-purple/5"
            >
                <img
                    src="https://upload.wikimedia.org/wikipedia/commons/5/51/Facebook_f_logo_%282019%29.svg"
                    alt="Facebook"
                    className="h-5 w-5"
                />

                Continue with Facebook
            </button> */}
        </div>
    );
};

export default AuthButtons;