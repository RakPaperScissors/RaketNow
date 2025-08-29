const sgMail = require('@sendgrid/mail')
sgMail.setApiKey(process.env.SENDGRID_API)
// sgMail.setDataResidency('eu'); 
// uncomment the above line if you are sending mail using a regional EU subuser

const msg = {
  to: 'jfdbuhayan@addu.edu.p', // Change to your recipient
  from: 'rakpaperscissors@raketnow.ip-ddns.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  html: '<strong>and easy to do anywhere, even with Node.js</strong>',
}
sgMail
  .send(msg)
  .then(() => {
    console.log('Email sent')
  })
  .catch((error) => {
    console.error(error)
  })