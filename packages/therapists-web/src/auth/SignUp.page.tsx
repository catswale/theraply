import React from 'react';
import { Auth } from 'aws-amplify';
import './SignUp.css';
import { useHistory } from 'react-router-dom';

export const SignUp = () => {
  const history = useHistory();

  function handleSubmit(event: any) {
    event.preventDefault();
    const data = new FormData(event.target);
    const firstName = data.get('firstName') as string;
    const lastName = data.get('lastName') as string;
    const email = data.get('email') as string;
    const phoneNumber = data.get('phoneNumber') as string;
    const password = data.get('password') as string;
    signUp(firstName, lastName, email, phoneNumber, password);
    history.push('signup-confirm');
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Sign Up</h1>
      <div>
        <label htmlFor="fname">First Name</label>
        <input type="text" id="firstName" name="firstName" placeholder="John" required/>
      </div>
      <div>
        <label htmlFor="lname">Last Name</label>
        <input type="text" id="lastName" name="lastName" placeholder="Doe" required/>
      </div>
      <div>
        <label htmlFor="email">Email:</label>
        <input id="email" name="email" type="email" required/>
      </div>
      <div>
        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phoneNumber" name="phoneNumber" placeholder="+61412345678" pattern="+61[0-9]{9}" required/>
      </div>
      <div>
        <label htmlFor="password">Password:</label>
        <input id="password" type="password" name="password" required/>
      </div>

      <button>SIGN UP</button>
    </form>
  );
};

async function signUp(firstName: string, lastName: string, email: string, phoneNumber: string, password: string) {
  try {
    const { userSub } = await Auth.signUp({
      username: email,
      password,
      attributes: {
        given_name: firstName,
        family_name: lastName,
        email,
        phone_number: phoneNumber,
      },
    });
  } catch (error) {
    console.log('error signing up:', error);
  }
}
