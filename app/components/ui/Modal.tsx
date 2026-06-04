interface ModalProps {
  title: string;
  onClose: () => void;
  children?: React.ReactNode;
  size?: "sm" | "md" | "lg";
}

export default function Modal({
  title,
  onClose,
  children,
  size = "md",
}: ModalProps) {
  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50 p-4">
      <div className={`bg-white rounded-lg ${sizeClasses[size]} w-full max-h-[90vh] overflow-y-auto shadow-lg`}>
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-lg sm:text-xl font-bold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close modal"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {children}
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-600 text-white hover:bg-gray-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}