import { Request, Response } from 'express';
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