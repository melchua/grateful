import { useState } from 'react';

import sendGratitude from '../services/twilio.ts';

export default function MessageButton() {
  const [grat, setGrat] = useState('I am grateful for sunny days');
  const [phone, setPhone] = useState('+17789512508');

  const sendText = () => {
    sendGratitude(grat, phone);
  };

  return (
    <button type="button" onClick={sendText}>Send Text</button>
  );
}
