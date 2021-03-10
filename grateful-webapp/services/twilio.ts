import axios from "axios";

// const myGratitude = 'I am grateful for Sunny days';
// const userPhoneNumber = '+17789512508';

function sendGratitude(gratitude: string, phoneNumber: string) {
  console.log("message sent");
  const message = {
    to: phoneNumber,
    body: gratitude,
  };
  axios.post("/api/messages", message);
}

// sendGratitude(myGratitude, userPhoneNumber);

export default sendGratitude;
