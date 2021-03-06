import { useSelector, useDispatch } from 'react-redux';
import {
  Auth, API, Storage,
} from 'aws-amplify';
import { queries, ClientTherapistRelationship, Therapist } from '@theraply/lib';
import { useEffect } from 'react';
import { setTherapists } from './therapists.slice';

import { useAuth } from '../auth/auth.hooks';
import { callAPI } from '../services/api';

interface PickTherapistParams {
  genders: string[];
  symptoms: string[];
}

export const useTherapist = () => {
  const dispatch = useDispatch();
  const { user } = useAuth();
  const { therapists }: {therapists: Therapist[]} = useSelector((state) => state.therapists);
  useEffect(() => {
    if (user.id ) {
      getTherapists();
    }
  }, [user]);

  async function getTherapists() {
    const {therapists}: {therapists: Therapist[]} 
      = await callAPI('get', '/client/therapists');
    for (const therapist of therapists) {
      const avatarURI = await Storage.get('avatar', { 
        level: 'protected', 
        identityId: therapist.id 
      }) as string;
      therapist.avatarURI = avatarURI;
    }
    dispatch(setTherapists(therapists))
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
    const avatarURI = await Storage.get('avatar', { 
      level: 'protected', 
      identityId: response.therapist.id 
    }) as string;
    response.therapist.avatarURI = avatarURI;
    dispatch(setTherapists([response.therapist]));

    return response;
  };

  return {
    therapists,
    pickTherapist,
  };
};
