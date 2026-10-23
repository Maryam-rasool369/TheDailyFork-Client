import React from "react";

const LoadingState: React.FC<{ label?: string }> = ({ label = "Loading..." }) => (
    <div className="flex min-h-[40vh] items-center justify-center">
        <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-purple/20 border-t-purple" />
            <p className="text-sm font-medium text-gray-500">{label}</p>
        </div>
    </div>
);

export default LoadingState;
