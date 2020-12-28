import React, { useEffect, useState } from 'react'
import {API, graphqlOperation} from 'aws-amplify'
import {mutations, Booking, queries, Therapist, BookingState} from '@theraply/lib';
import {Moment} from 'moment'
import { useSelector, useDispatch } from 'react-redux';
import { useClient } from '../client/client.hooks';
import { v4 as uuidv4 } from 'uuid'
import {setBookings} from './bookings.slice'

export const useBookings = () => {
    const {client} = useClient()
    const {bookings} = useSelector(state => state.bookings)
    const dispatch = useDispatch()
    
    useEffect(() => {
        fetchBookings()
    }, [])

    // Adds a new row for each booking state change
    // bookingID remains the same for the same booking
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
            participants: [therapist.id, client.id],
            bookingID,
        }})) as Data
        type Data = {data: {createBooking: any}}

        const newBooking = data.data.createBooking
        dispatch(setBookings([...bookings, newBooking]))
    }

    async function fetchBookings() {
        const data = await API.graphql(graphqlOperation(queries.listBookings)) as Data
        type Data = {data: {listBookings: {items: Booking[]}}}
        dispatch(setBookings(data.data.listBookings.items))
    }

    return {
        bookings,
        book,
    }
}