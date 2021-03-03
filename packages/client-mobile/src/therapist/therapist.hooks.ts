import { useDispatch } from 'react-redux';
import {
  Auth, API, graphqlOperation,
} from 'aws-amplify';
import { queries } from '@theraply/lib';
import { setTherapists } from './therapist.slice';

import { useClient } from '../client/client.hooks';

interface PickTherapistParams {
  genders: string[];
  symptoms: string[];
}

export const useTherapist = () => {
  const dispatch = useDispatch();
  const { client } = useClient();

  async function getTherapistRelationships() {
    if (!client.id) return;
    const data = await API.graphql(graphqlOperation(queries.getClientRelationships, {
      clientID: client.id,
    })) as Data;
    type Data = {data: {getClientRelationships: {items: any}}}
    const relationships = data.data.getClientRelationships.items;
    console.log(data.data.getClientRelationships.items);
  }

  async function listTherapists() {
    const data = await API.graphql(graphqlOperation(queries.listTherapists)) as Data;
    type Data = {data: {listTherapists: {items: any}}}
    console.log(data);
  }
  // listTherapists();

  const pickTherapist = async ({
    genders,
    symptoms,
  }: PickTherapistParams) => {
    const session = await Auth.currentSession();
    const response = await API.post('backend', '/client/therapist', {
      headers: {
        Authorization: `Bearer ${session.getIdToken().getJwtToken()}`,
      },
      body: {
        symptoms,
        genders,
      },
    });

    if (!response.success) {
      throw new Error(response.message);
    }

    dispatch(setTherapists(response.therapist));

    return response;
  };

  return {
    pickTherapist,
  };
};
