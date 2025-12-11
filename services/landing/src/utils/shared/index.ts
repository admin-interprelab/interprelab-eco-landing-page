import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Export other utilities
export * from './currency';
export * from './date';
export * from './numbers';
export * from './performance';
