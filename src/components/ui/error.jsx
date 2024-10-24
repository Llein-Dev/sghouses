import { ExternalLinkIcon } from "lucide-react";


const ErrorComponent = ({ message }) => {
    return (
        <div className="flex items-center justify-center space-x-2 text-red-500">
            <ExternalLinkIcon className="h-6 w-6" />
            <span>{message}</span>
        </div>
    );
};

export default ErrorComponent;
