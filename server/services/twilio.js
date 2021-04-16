// Twilio setup
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = require("twilio")(accountSid, authToken);

const sendSMS = (recipientPhone, content) => {
  client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: recipientPhone,
      body: content,
    })
    .then(() => {
      console.log("success");
      return JSON.stringify({ success: true });
    })
    .catch((err) => {
      console.log(err);
      return JSON.stringify({ success: false });
    });
};

module.exports = { sendSMS };
