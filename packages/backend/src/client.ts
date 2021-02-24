import { mutations, queries } from '@theraply/lib';
import { getHeaderData, callGraphQL } from './utils';

export const postTherapist = async (req: any, res: any) => {
  try {
    const graphql = callGraphQL(req);

    const { username } = getHeaderData(req, res);

    const { genders, symptoms } = req.body;

    const therapistFilter = {
      and: [
        {
          active: { eq: true },
        },
        {
          or: genders.map((gender) => ({ gender: { eq: gender } })),
        },
      ],
    };

    const { data: { listTherapists: { items: [therapist] } } } = await graphql({
      query: queries.listTherapists,
      variables: {
        filter: therapistFilter,
        limit: 1,
      },
    });

    if (!therapist) throw new Error('Therapist not found.');

    const { data: { createTherapistClientRelationship: therapistClientRecord } } = await graphql({
      query: mutations.createTherapistClientRelationship,
      variables: {
        input: {
          therapistID: therapist.id,
          clientID: username,
          active: true,
        },
      },
    });

    await graphql({
      query: mutations.updateClient,
      variables: {
        input: {
          id: username,
          symptoms: [{ content: symptoms }],
          therapistPreferences: [{ content: genders }],
          therapistIDs: [therapistClientRecord.id],
        },
      },
    });

    return res.json({ success: true, therapist });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'an error occurred while picking a therapist.' });
  }
};
