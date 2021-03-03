import { useDispatch } from 'react-redux';
import {
  Auth, API, graphqlOperation,
} from 'aws-amplify';
import { queries, ClientTherapistRelationship, Therapist } from '@theraply/lib';
import { useEffect } from 'react';
import { setTherapists } from './therapist.slice';

import { useClient } from '../client/client.hooks';
import { useAuth } from '../auth/auth.hooks';

interface PickTherapistParams {
  genders: string[];
  symptoms: string[];
}

export const useTherapist = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();

  useEffect(() => {
    if (user.id) {
      getTherapists();
    }
  }, [user]);

  async function getTherapists() {
    const data = await API.graphql(graphqlOperation(queries.listTherapists)) as Data;
    type Data = {data: {listTherapists: {items: Therapist[]}}}
    dispatch(setTherapists(data.data.listTherapists.items))
  }

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
