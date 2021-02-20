const axios = require('axios');
const gql = require('graphql-tag');
const graphql = require('graphql');
const { print } = graphql;
import {queries} from '@theraply/lib';

export async function listTherapists(req) {
  try {
    const accessToken = req.headers.authorization.split(' ')[1];
    const listTherapistsQuery = gql`${queries.listTherapists}`;
    const graphqlData = await axios({
      url: process.env.API_API_GRAPHQLAPIENDPOINTOUTPUT,
      method: 'post',
      headers: {
        'Authorization': accessToken
      },
      data: {
        query: print(listTherapistsQuery),
      }
    });
    const body = {
        graphqlData: graphqlData.data.data.listTherapists
    }
    console.log(graphqlData)
    return {
        statusCode: 200,
        body: JSON.stringify(body),
        headers: {
            "Access-Control-Allow-Origin": "*",
        }
    }
  } catch (err) {
    console.log('error posting to appsync: ', err);
  } 
}