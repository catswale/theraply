export const PackageItem = {
  Texting: 'TEXTING',
  LiveSession: 'LIVE_SESSION',
} as const;
export type PackageItem = typeof PackageItem[keyof typeof PackageItem];

export enum PackageName {
  Texting = 'TEXTING',
  TextingAndLiveSession = 'TEXTING_AND_LIVE_SESSION'
}

export const Packages: Record<PackageName, Package> = {
  [PackageName.Texting]: {
    id: '8db627bd-b71e-4d2b-8a2a-b1a04a26b3c0',
    name: PackageName.Texting,
    price: 7000, // in cents
    items: [PackageItem.Texting],
    desc: '1 Week of Text Support'
  },
  [PackageName.TextingAndLiveSession]: {
    id: '313b0431-69df-43df-9f30-6c57403ad9d3',
    name: PackageName.TextingAndLiveSession,
    price: 10000, // in cents
    items: [PackageItem.LiveSession, PackageItem.Texting],
    desc: '1 Week of Text and Call Support (1x30 min)'
  },
}

export interface Package {
  id: string,
  name: PackageName,
  price: number,
  items: PackageItem[],
  desc: string,
}

export const BookingState = {
  BOOKED: 'BOOKED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
} as const;
export type BookingState = typeof BookingState[keyof typeof BookingState];