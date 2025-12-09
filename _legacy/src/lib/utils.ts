import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Demo mode flag - set to true for guest/demo users
export const isDemoMode = () => {
  // Check if user is logged in (you can replace this with actual auth check)
  return !localStorage.getItem('userId');
};

export const userPreferences = {
  payPerMinuteUSD: 0.75,
  targetCurrency: 'MXN',
  rounding: 'up',
};

export const getRoundedDuration = (start: Date, end: Date): number => {
  const durationSeconds = (end.getTime() - start.getTime()) / 1000;
  const durationMinutes = durationSeconds / 60;

  switch(userPreferences.rounding) {
    case 'up':
      return Math.ceil(durationMinutes);
    case 'nearest':
      return Math.round(durationMinutes);
    case 'down':
    default:
      return Math.floor(durationMinutes);
  }
}
