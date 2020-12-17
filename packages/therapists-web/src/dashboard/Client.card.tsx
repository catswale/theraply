import React from 'react'
import {Client} from '../client/types'
import {Therapist} from '../therapist/types'
import { useHistory } from "react-router-dom";

interface Props {
    client: any,
    therapist: Therapist,
}
export const ClientCard = ({client, therapist}: Props) => {
    const history = useHistory()
    return (
        <div>
            <p>{client.firstName}</p>
            <button onClick={() => history.push('chat', {channelID: client.channelID})}>CHAT</button>
        </div>
    )
}