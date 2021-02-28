export type PackageItemName = 'Texting' | 'TextingAndLiveSession';
export type PackageName = 'Texting' | 'TextingAndLiveSession';

export const packages: Package[] = [{
    name: 'Texting',
    price: 7000, // in cents
    itemNames: ['Texting'],
    desc: '1 Week of Text Support',
    daysValid: 7,
    sessions: 0,
  }, {
    name: 'TextingAndLiveSession',
    price: 10000, // in cents
    itemNames: ['Texting', 'TextingAndLiveSession'],
    desc: '1 Week of Text and Call Support (1x30 min)',
    daysValid: 7,
    sessions: 1,
}];
export const getPkg = (name: PackageName): Package => (
  packages.find(p => p.name === name)
)

export interface Package {
  name: PackageName,
  price: number,
  itemNames: PackageItemName[],
  desc: string,
  daysValid: number,
  sessions: number,
}

export type PackageItem = TextingItem | LiveSessionItem;

export interface TextingItem {
  id: string
  name: PackageItemName
  packageName: PackageName
  expiry: string
  createdAt: string
  sessions?: number
}

export interface LiveSessionItem {
  id: string
  name: PackageItemName
  packageName: PackageName
  expiry: Date
  createdAt: Date
  sessions?: number
}

export const BookingState = {
  BOOKED: 'BOOKED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
} as const;
export type BookingState = typeof BookingState[keyof typeof BookingState];
