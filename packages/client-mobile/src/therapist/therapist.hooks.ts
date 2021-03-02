import { useDispatch } from 'react-redux';
import { Auth, API } from 'aws-amplify';
import { pickTherapist as pickTherapistAction } from './therapist.slice';

interface PickTherapistParams {
  genders: string[];
  symptoms: string[];
}

export const useTherapist = () => {
  const dispatch = useDispatch();

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

    dispatch(pickTherapistAction(response.therapist));

    return response;
  };

  return {
    pickTherapist,
  };
};
