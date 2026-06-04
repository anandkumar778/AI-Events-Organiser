interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
  type?: string;
  label?: string;
  error?: string;
}

export default function Input({
  placeholder,
  type = "text",
  label,
  error,
  className,
  ...props
}: InputProps) {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-gray-700 mb-2">
          {label}
        </label>
      )}
      <input
        type={type}
        placeholder={placeholder}
        className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors ${
          error
            ? "border-red-500 focus:ring-red-500"
            : "border-gray-300"
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}