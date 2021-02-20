import { Request, Response } from 'express';
import Axios from 'axios';
import jwtDecode from 'jwt-decode';

export function getHeaderData(req: Request, res: Response) {
  const accessToken = req.headers.authorization.split(' ')[1];
  if (!accessToken) throw new Error('No auth header');
  const data = jwtDecode(accessToken) as any;
  return { 
    username: data.sub,
    email: data.email,
    firstName: data.given_name,
  }
}

export function callGraphQL(req: Request) {
  const accessToken = req.headers.authorization.split(' ')[1];

  return async (data) => {
    return Axios({
      url: process.env.API_API_GRAPHQLAPIENDPOINTOUTPUT,
      method: 'post',
      headers: {
        'Authorization': accessToken
      },
      data
    }).then(resp => resp.data);
  }
}
