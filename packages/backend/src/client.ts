import { mutations, queries, Client } from '@theraply/lib';
import { updateTherapist } from './therapist';
import { getHeaderData, callGraphQL } from './utils';

export const postTherapist = async (req: any, res: any) => {
  try {
    const graphQLCaller = callGraphQL(req);
    const { id } = getHeaderData(req, res);

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

    const { data: { listTherapists: { items: [therapist] } } } = await graphQLCaller({
      query: queries.listTherapists,
      variables: {
        filter: therapistFilter,
        limit: 1,
      },
    });

    if (!therapist) throw new Error('Therapist not found.');

    const { data: { createTherapistClientRelationship: therapistClientRecord } } = await graphQLCaller({
      query: mutations.createTherapistClientRelationship,
      variables: {
        input: {
          therapistID: therapist.id,
          clientID: id,
          active: true,
        },
      },
    });

    await graphQLCaller({
      query: mutations.updateClient,
      variables: {
        input: {
          id: id,
          symptoms: [{ content: symptoms }],
          therapistPreferences: [{ content: genders }],
          therapistIDs: [therapistClientRecord.id],
        },
      },
    });

    // await updateTherapist(req, { id: therapist.id, clientIDs: [id] });

    return res.json({ success: true, therapist });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: 'an error occurred while picking a therapist.' });
  }
};

export async function getClient(req, id): Promise<Client> {
  const graphQLCaller = callGraphQL(req);
  const result = await graphQLCaller({
    query: queries.getClient,
    variables: { id },
  }) as any;
  return result.data.getClient;
}

export async function updateClient(req, data) {
  const graphQLCaller = callGraphQL(req);
  await graphQLCaller({
    query: mutations.updateClient,
    variables: {
      input: data,
    },
  });
}
