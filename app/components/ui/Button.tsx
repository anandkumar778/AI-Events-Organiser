interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  variant?: "primary" | "secondary" | "danger" | "success";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  loading?: boolean;
}

export default function Button({
  text,
  variant = "primary",
  size = "md",
  fullWidth = false,
  loading = false,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles = "rounded font-medium transition-colors duration-200 flex items-center justify-center gap-2";

  const variantStyles = {
    primary: "bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400",
    secondary: "bg-gray-600 text-white hover:bg-gray-700 disabled:bg-gray-400",
    danger: "bg-red-600 text-white hover:bg-red-700 disabled:bg-red-400",
    success: "bg-green-600 text-white hover:bg-green-700 disabled:bg-green-400",
  };

  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
  };

  const widthStyles = fullWidth ? "w-full" : "";

  return (
    <button
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${widthStyles} ${
        disabled || loading ? "opacity-70 cursor-not-allowed" : ""
      }`}
      disabled={disabled || loading}
      {...props}
    >
      {loading && (
        <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {text}
    </button>
  );
}