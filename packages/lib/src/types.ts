import { Moment } from 'moment';

export type Message = {
  id: string;
  channelID: string;
  authorID: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
}

export type Client = {
  id: string,
  owner: string,
  firstName: string,
  lastName?: string,
  email: string,
  phoneNumber?: string,
  therapists?: any[],
  therapistIDs: string[],
  channelID?: string,
  createdAt: Date,
  updatedAt: Date,
  stripeCustomerID: String,
}

export interface Therapist {
  firstName: string,
  lastName: string,
  email: string,
  id: string,
  clients: TherapistClient[]
}

export interface TherapistClient {
  id: string,
  channelID: string,
  firstName: string,
  lastName: string,
}

export interface Booking {
  id: string,
  bookingID: string,
  start: Moment,
  end: Moment,
  state: BookingState,
  createdAt: Date,
  updatedAt: Date,
}

export const BookingState = {
  BOOKED: 'BOOKED',
  CANCELLED: 'CANCELLED',
  COMPLETED: 'COMPLETED',
} as const;
export type BookingState = typeof BookingState[keyof typeof BookingState];
