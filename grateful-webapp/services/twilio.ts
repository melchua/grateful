import axios from 'axios';

// const myGratitude = 'I am grateful for Sunny days';
// const userPhoneNumber = '+17789512508';

function sendMessage(content: string, phoneNumber: string) {
  console.log('message sent');
  const message = {
    to: phoneNumber,
    body: content,
  };
  axios.post(`${process.env.NEXT_PUBLIC_NODE_SERVER}/api/messages`, message);
}

// sendGratitude(myGratitude, userPhoneNumber);

export default sendMessage;
