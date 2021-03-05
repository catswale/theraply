import { query, Request, Response } from 'express';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';
import config from './config';
import { queries } from '@theraply/lib';

export function getHeaderData(req: Request, res: Response) {
  const accessToken = req.headers.authorization.split(' ')[1];
  if (!accessToken) throw new Error('No auth header');
  const data = jwtDecode(accessToken) as any;
  return {
    id: data.sub,
    email: data.email,
    firstName: data.given_name,
  };
}

export function callGraphQL(req: Request) {
  const accessToken = req.headers.authorization.split(' ')[1];

  return async (data) => {
    const result = await Axios({
      url: config.API_THERAPLYGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT,
      method: 'post',
      headers: {
        Authorization: accessToken,
      },
      data,
    }).then((resp) => resp.data);
    if (result.errors?.length > 0) throw result.errors;
    return result;
  }
}

export async function callGraphQLFromServer(data): Promise<{data: {[key:string]: any}}> {
  const result = await Axios({
    url: config.API_THERAPLYGRAPHQL_GRAPHQLAPIENDPOINTOUTPUT,
    method: 'post',
    headers: { 'x-api-key': config.API_THERAPLYGRAPHQL_GRAPHQLAPIKEYOUTPUT },
    data,
  });
  return result.data;
}