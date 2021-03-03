import { Moment } from 'moment';
import { BookingState, PackageItem } from './payment';

export type Message = {
  id: string;
  channelID: string;
  authorID: string;
  body: string;
  createdAt: Date;
  updatedAt: Date;
  owner: string;
}

export type Client = {
  id: string,
  owner: string,
  firstName: string,
  lastName?: string,
  email: string,
  phoneNumber?: string,
  therapistIDs: string[],
  channelID?: string,
  createdAt: Date,
  updatedAt: Date,
  stripeCustomerID: string,
  packageItems: PackageItem[],
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

export interface ClientTherapistRelationship {
  id: string,
  active: boolean,
  therapistID: string,
  clientID: string,
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
