import React from 'react'
import { useHistory } from "react-router-dom";
import {Therapist, TherapistClient} from '@theraply/lib';

import './Client.card'

interface Props {
    client: TherapistClient,
    therapist: Therapist,
}
export const ClientCard = ({client, therapist}: Props) => {
    const history = useHistory()
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