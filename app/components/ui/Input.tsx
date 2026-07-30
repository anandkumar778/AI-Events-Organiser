import { ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
  hint?: string;
  required?: boolean;
}

export default function Input({
  label,
  error,
  icon,
  hint,
  className,
  disabled,
  required,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-[15px] font-semibold text-slate-800 dark:text-slate-200 mb-2">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      <div className="relative">
        {icon && (
          <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400 shrink-0">
            {icon}
          </div>
        )}
        <input
          {...props}
          disabled={disabled}
          className={`
            w-full px-4 py-2.5 rounded-lg font-medium text-sm
            bg-white dark:bg-gray-900 
            border border-gray-200 dark:border-gray-700
            text-gray-900 dark:text-gray-100
            placeholder:text-gray-400 dark:placeholder:text-gray-500
            transition-all duration-200
            focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 dark:focus:border-primary-400
            hover:border-gray-300 dark:hover:border-gray-600
            disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 dark:disabled:bg-gray-800
            ${icon ? "pl-10" : ""}
            ${error ? "border-red-500 dark:border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
            ${className || ""}
          `}
        />
      </div>
      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 text-red-600 dark:text-red-400 text-xs font-medium">
          <AlertCircle size={14} />
          {error}
        </div>
      )}
      {hint && !error && (
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-1.5">{hint}</p>
      )}
    </div>
  );
}