import React from 'react'
import {Client} from '../client/types'
import {Therapist, TherapistClient} from '../therapist/types'
import { useHistory } from "react-router-dom";
import './Client.card'

interface Props {
    client: TherapistClient,
    therapist: Therapist,
}
export const ClientCard = ({client, therapist}: Props) => {
    const history = useHistory()
    console.log(client)
    const args = {channelID: client.channelID, participants: [client.id, therapist.id]}
    return (
        <div style={containerStyle}>
            <p>{client.firstName} {client.lastName}</p>
            <button onClick={() => history.push('chat', args)}>CHAT</button>
        </div>
    )
}

const containerStyle = {
    display: 'flex',
    border: '1px solid lightgrey',
    width: 200
}