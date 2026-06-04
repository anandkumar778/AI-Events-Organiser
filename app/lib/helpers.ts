/**
 * Format date to readable format
 */
export const formatDate = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

/**
 * Format date and time
 */
export const formatDateTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Format time only
 */
export const formatTime = (date: string | Date): string => {
  const d = new Date(date);
  return d.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

/**
 * Validate email format
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
 * Validate password strength
 */
export const isStrongPassword = (password: string): boolean => {
  // At least 8 characters, 1 uppercase, 1 lowercase, 1 number, 1 special char
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

/**
 * Validate phone number
 */
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-\s.]?[0-9]{3}[-\s.]?[0-9]{4,6}$/;
  return phoneRegex.test(phone);
};

/**
 * Format currency
 */
export const formatCurrency = (amount: number, currency: string = 'USD'): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
};

/**
 * Capitalize first letter of string
 */
export const capitalizeFirstLetter = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

/**
 * Truncate text to specified length
 */
export const truncateText = (text: string, length: number = 100): string => {
  return text.length > length ? text.substring(0, length) + '...' : text;
};

/**
 * Get initials from full name
 */
export const getInitials = (fullName: string): string => {
  return fullName
    .split(' ')
    .map((name) => name.charAt(0).toUpperCase())
    .join('')
    .substring(0, 2);
};

/**
 * Check if string is empty or whitespace
 */
export const isEmpty = (str: string): boolean => {
  return !str || str.trim().length === 0;
};

/**
 * Convert relative date to string
 */
export const getRelativeTime = (date: string | Date): string => {
  const d = new Date(date);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - d.getTime()) / 1000);

  if (diffInSeconds < 60) return 'just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 604800)}w ago`;
  if (diffInSeconds < 31536000) return `${Math.floor(diffInSeconds / 2592000)}m ago`;
  return `${Math.floor(diffInSeconds / 31536000)}y ago`;
};

/**
 * Generate random ID
 */
export const generateId = (): string => {
  return Math.random().toString(36).substr(2, 9);
};

/**
 * Sort array by property
 */
export const sortByProperty = <T>(array: T[], property: keyof T, order: 'asc' | 'desc' = 'asc'): T[] => {
  const sorted = [...array].sort((a, b) => {
    if (a[property] < b[property]) return order === 'asc' ? -1 : 1;
    if (a[property] > b[property]) return order === 'asc' ? 1 : -1;
    return 0;
  });
  return sorted;
};

/**
 * Filter array by property
 */
export const filterByProperty = <T>(array: T[], property: keyof T, value: any): T[] => {
  return array.filter((item) => item[property] === value);
};

/**
 * Search in array of objects
 */
export const searchInArray = <T>(array: T[], searchTerm: string, searchFields: (keyof T)[]): T[] => {
  const lowerSearchTerm = searchTerm.toLowerCase();
  return array.filter((item) =>
    searchFields.some((field) => {
      const value = item[field];
      return String(value).toLowerCase().includes(lowerSearchTerm);
    })
  );
};

/**
 * Get unique values from array
 */
export const getUniqueValues = <T>(array: T[]): T[] => {
  return Array.from(new Set(array));
};

/**
 * Combine arrays and remove duplicates
 */
export const mergeArrays = <T>(arrays: T[][]): T[] => {
  return getUniqueValues(arrays.flat());
};

/**
 * Chunk array into smaller arrays
 */
export const chunkArray = <T>(array: T[], size: number): T[][] => {
  const chunks: T[][] = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

/**
 * Get pagination info
 */
export const getPaginationInfo = (total: number, page: number, pageSize: number) => {
  const totalPages = Math.ceil(total / pageSize);
  const startIndex = (page - 1) * pageSize + 1;
  const endIndex = Math.min(page * pageSize, total);

  return {
    totalPages,
    startIndex,
    endIndex,
    hasNextPage: page < totalPages,
    hasPreviousPage: page > 1,
  };
};

/**
 * Save to localStorage
 */
export const saveToLocalStorage = (key: string, value: any): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, JSON.stringify(value));
  }
};

/**
 * Get from localStorage
 */
export const getFromLocalStorage = (key: string): any => {
  if (typeof window !== 'undefined') {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
  }
  return null;
};

/**
 * Remove from localStorage
 */
export const removeFromLocalStorage = (key: string): void => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(key);
  }
};

/**
 * Clear all localStorage
 */
export const clearLocalStorage = (): void => {
  if (typeof window !== 'undefined') {
    localStorage.clear();
  }
};

/**
 * Calculate discount percentage
 */
export const calculateDiscount = (originalPrice: number, discountedPrice: number): number => {
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
};

/**
 * Calculate final price with tax
 */
export const calculateWithTax = (price: number, taxRate: number = 0.1): number => {
  return Number((price + price * taxRate).toFixed(2));
};

/**
 * Check if event is ongoing
 */
export const isEventOngoing = (startDate: string | Date, endDate: string | Date): boolean => {
  const now = new Date();
  return new Date(startDate) <= now && now <= new Date(endDate);
};

/**
 * Check if event is upcoming
 */
export const isEventUpcoming = (startDate: string | Date): boolean => {
  return new Date(startDate) > new Date();
};

/**
 * Check if event is past
 */
export const isEventPast = (endDate: string | Date): boolean => {
  return new Date(endDate) < new Date();
};

/**
 * Get remaining time until event
 */
export const getRemainingTime = (startDate: string | Date): string => {
  const now = new Date();
  const start = new Date(startDate);
  const diffInMs = start.getTime() - now.getTime();

  if (diffInMs < 0) return 'Event has started';

  const diffInSeconds = Math.floor(diffInMs / 1000);
  const days = Math.floor(diffInSeconds / 86400);
  const hours = Math.floor((diffInSeconds % 86400) / 3600);
  const minutes = Math.floor((diffInSeconds % 3600) / 60);

  if (days > 0) return `${days}d ${hours}h`;
  if (hours > 0) return `${hours}h ${minutes}m`;
  return `${minutes}m`;
};

/**
 * Generate booking reference number
 */
export const generateBookingRef = (): string => {
  const prefix = 'BK';
  const timestamp = Date.now().toString().slice(-6);
  const random = Math.random().toString(36).substr(2, 5).toUpperCase();
  return `${prefix}${timestamp}${random}`;
};

/**
 * Validate credit card number
 */
export const isValidCreditCard = (cardNumber: string): boolean => {
  const cleaned = cardNumber.replace(/\D/g, '');
  if (cleaned.length < 13 || cleaned.length > 19) return false;
  
  let sum = 0;
  let isEven = false;
  
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned.charAt(i), 10);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Mask credit card number
 */
export const maskCreditCard = (cardNumber: string): string => {
  const cleaned = cardNumber.replace(/\D/g, '');
  const last4 = cleaned.slice(-4);
  return `**** **** **** ${last4}`;
};

/**
 * Get status badge color
 */
export const getStatusColor = (status: string): string => {
  const statusMap: { [key: string]: string } = {
    pending: 'bg-yellow-100 text-yellow-800',
    confirmed: 'bg-green-100 text-green-800',
    cancelled: 'bg-red-100 text-red-800',
    completed: 'bg-blue-100 text-blue-800',
    active: 'bg-green-100 text-green-800',
    inactive: 'bg-gray-100 text-gray-800',
    processing: 'bg-blue-100 text-blue-800',
    failed: 'bg-red-100 text-red-800',
  };
  return statusMap[status] || 'bg-gray-100 text-gray-800';
};

/**
 * Convert file size to readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
};

/**
 * Check if file is image
 */
export const isImageFile = (file: File): boolean => {
  const validImageTypes = ['image/gif', 'image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
  return validImageTypes.includes(file.type);
};

/**
 * Check if file is PDF
 */
export const isPdfFile = (file: File): boolean => {
  return file.type === 'application/pdf';
};

/**
 * Debounce function
 */
export const debounce = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

/**
 * Throttle function
 */
export const throttle = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return (...args: any[]) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
