import React, { useEffect, useState } from 'react'
import {API, graphqlOperation} from 'aws-amplify'
import {mutations, Client, queries, Therapist, BookingState} from '@theraply/lib';
import {Moment} from 'moment'
import { useClient } from './client.hooks';
import { v4 as uuidv4 } from 'uuid'

export const useBookings = () => {
    const {client, setClient} = useClient()

    async function book(
        therapist: Therapist, 
        start: Moment, 
        end: Moment, 
        bookingID = uuidv4(), 
        state = BookingState.BOOKED ) {
        const data = await API.graphql(graphqlOperation(mutations.createBooking, {input: {
            start,
            end,
            state,
            therapistID: therapist.id,
            clientID: client.id,
            bookingID,
        }})) as Data
        type Data = {data: {createBooking: any}}

        const newBooking = data.data.createBooking
        const bookings = client.bookings ? [...client.bookings, newBooking] : [newBooking]
        setClient({...client, bookings})
    }

    return {
        book,
    }
}