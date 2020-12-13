import { API, graphqlOperation, Auth } from 'aws-amplify';
import {mutations, subscriptions, queries} from '@theraply/lib';
import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
  ICognitoUserAttributeData,
  ISignUpResult,
  CognitoUserSession,
} from 'amazon-cognito-identity-js';

export const SignUp = () => {
  return null;
}

async function signUp(email: string, password: string, phoneNumber: string) {
    try {
        const { user } = await Auth.signUp({
            username: email,
            password,
            attributes: {
                email,
                phone_number: phoneNumber,
            }
        });
        console.log(user);
        // todo add to db
    } catch (error) {
        console.log('error signing up:', error);
    }
}

async function createTherapist(user: CognitoUser) {
  const email = await user.getUsername()
  console.log('username ' + email)
  user.getUserData((err, data) => {
    console.log('Getting user data')
    console.log(err)
    console.log(data)
  })
  // const data = await API.graphql(graphqlOperation(mutations.createTherapist, {input: {id: client.username, firstName: 'Catherine', lastName: 'Swale'}})) as Data
  // type Data = {data: {createTherapist: {items: any[]}}}
  // console.log(data)
  // const messages = data.data.getClient.items;
  // console.log(messages)
}