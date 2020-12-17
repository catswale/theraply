import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import {mutations, subscriptions, queries} from '@theraply/lib';
import {Auth, API, graphqlOperation} from 'aws-amplify'

export const useClient = () => {
  const history = useHistory()

  useEffect(() => {

  }, []) 

  const fetchClients = (therapistID: string) => () => {
    // const data = await API.graphql(graphqlOperation(queries.listTherapists)) as Data
    // type Data = {data: {listTherapists: {items: any[]}}}
    // const therapists = data.data.listTherapists.items;
    // setTherapists(therapists)
  }

  return {
    fetchClients,
  }
}

