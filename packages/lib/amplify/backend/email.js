const sgMail = require('@sendgrid/mail')//Imported in Package.json

const API_KEY = ''; // API Key 

sgMail.setApiKey(API_KEY)


const message = {
    to: 'cat.swale@theraply.com.au',
    from: {
        name: 'Theraply',
        email: '',
    },
    subject: 'Hello from sendgrid',
    text: 'Booking Confirmed',
    html: '<h1> Booking Confirmed</h1>',
};

sgMail
.send(message)
.then(response => console.log('Varified'))
.catch(error => console.log(error.message));
