export const PackageItem = {
  Texting: 'TEXTING',
  LiveSession: 'LIVE_SESSION',
} as const;
export type PackageItem = typeof PackageItem[keyof typeof PackageItem];

export const BookingState = {
  BOOKED: 'BOOKED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
} as const;
export type BookingState = typeof BookingState[keyof typeof BookingState];