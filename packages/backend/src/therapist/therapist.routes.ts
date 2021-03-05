import { queries, ClientTherapistRelationship } from '@theraply/lib';
import { getHeaderData, callGraphQL, callGraphQLFromServer } from '../utils';

export async function getClientTherapists(req, res) {
  try {
    const { id } = getHeaderData(req, res);

    const graphql = callGraphQL(req);
    type Data = {data: {getClientRelationships: { items: ClientTherapistRelationship[] }}}
    const {data: {getClientRelationships: {items: relationsips}}} = await graphql({
      query: queries.getClientRelationships,
      variables: { 
        clientID: id,
        filter: { and: [{ active: { eq: true } }]}
      },
    }) as Data;
    if (relationsips.length === 0) throw new Error('User has no relationships');

    const {data: {listTherapists: {items: therapists}}} = await callGraphQLFromServer({
      query: queries.listTherapists,
      variables: {
        filter: { and: [
          { active: { eq: true } },
          { id: { eq: relationsips[0].therapistID } }
        ]}
      }
    });
    console.log(therapists)
    return res.json({ success: true, therapists });
  } catch (err) {
    console.log(err);
    return res.status(500);
  }
}