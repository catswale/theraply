import jwtDecode from 'jwt-decode';
import { v4 as uuidv4 } from 'uuid';
import { API, graphqlOperation } from 'aws-amplify';
import {
  mutations, Therapist,
} from '@theraply/lib';
import config from './config';

export const postTherapist = ({ db }: any) => async (req: any, res: any) => {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const { sub: username } = jwtDecode(accessToken) as { sub: any };

    const { genders, symptoms } = req.body;

    const params = {
      TableName: config.THERAPIST_TABLE_NAME,
      FilterExpression: "",
      ExpressionAttributeValues: {
        ':isActive': true
      },
      Limit: 1,
    };

    genders.forEach((gender, i) => {
      params.FilterExpression += `${i !== 0 ? ' OR ' : '('}gender = :gender${i}`;
      params.ExpressionAttributeValues[`:gender${i}`] = gender;
    });

    params.FilterExpression += ') AND active = :isActive';

    const { Items: [therapist] } = await db.scan(params).promise() as { Items: [Therapist] };

    if (!therapist) throw new Error("Therapist not found.");

    console.log(therapist);

    const therapistClientId = uuidv4();

    await db.put({
      TableName: config.THERAPIST_CLIENT_TABLE_NAME,
      Item: {
        __typename: 'TherapistClientRelationship',
        id: therapistClientId,
        therapistID: therapist.id,
        clientID: username,
        active: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }
    }).promise();

    const { Item: therapistClientRecord } = await db.get({
      TableName: config.THERAPIST_CLIENT_TABLE_NAME,
      Key: {
        id: therapistClientId
      }
    }).promise();

    // const data = await API.graphql(graphqlOperation(mutations.createTherapistClientRelationship, {
    //   input: {
    //     therapistID: therapist.id,
    //     clientID: username,
    //     active: true
    //   },
    // }));

    const data = await db.update({
      TableName: config.CLIENT_TABLE_NAME,
      Key: {
        id: username,
      },
      UpdateExpression: 'set symptoms = :s, therapistPreferences = :preferences, therapists = :therapist',
      ExpressionAttributeValues: {
        ':s': [{ content: symptoms }],
        ':preferences': [{ content: genders }],
        ':therapist': [therapistClientRecord]
      },
      ReturnValues: 'UPDATED_NEW',
    }).promise();
    console.log('updated a client');
    console.log(data);

    return res.json({ success: 'success', therapist });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: 'an error occurred while picking a therapist.' });
  }
}
