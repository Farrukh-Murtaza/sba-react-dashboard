import type { InputHTMLAttributes } from "react";
interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
    label: string;
    error?: string;
}


const TextField = ({ label, error, id, className = "", ...props }: TextFieldProps) => {
    return (
        <div className="w-full">
            <label
                htmlFor={id}
                className="mb-2 block text-sm font-medium text-gray-700" >
                {label} </label>
            <input
                id={id}
                className={`w-full rounded-md border
                    border-gray-300 px-4 py-2 text-gray-900 
                    outline-none transition focus:border-blue-500
                    focus:ring-2 focus:ring-blue-200
                    disabled:cursor-not-allowed disabled:bg-gray-100 
                    ${error ? "border-red-500 focus:border-red-500 focus:ring-red-200" : ""} 
                    ${className}`} {...props} />

            {error && (<p className="mt-1 text-sm text-red-600"> {error} </p>)}
        </div>);
};
export default TextField;