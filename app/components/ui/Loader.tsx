interface LoaderProps {
  size?: "sm" | "md" | "lg";
  fullScreen?: boolean;
  message?: string;
}

export default function Loader({
  size = "md",
  fullScreen = false,
  message,
}: LoaderProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-10 w-10",
    lg: "h-16 w-16",
  };

  const loaderContent = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className={`${sizeClasses[size]} animate-spin border-4 border-blue-600 rounded-full border-t-transparent`} />
      {message && (
        <p className="text-gray-600 text-sm font-medium">{message}</p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white/80 z-50">
        {loaderContent}
      </div>
    );
  }

  return loaderContent;
}