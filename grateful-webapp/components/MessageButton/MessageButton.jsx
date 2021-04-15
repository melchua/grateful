import { useState } from 'react';

import sendGratitude from '../../services/twilio.ts';

export default function MessageButton() {
  // eslint-disable-next-line
  const [grat, setGrat] = useState("I am grateful for sunny days");
  // eslint-disable-next-line
  const [phone, setPhone] = useState("+12508595654");

  const sendText = () => {
    sendGratitude(grat, phone);
  };

  return (
    <button type="button" onClick={sendText}>
      Send Text
    </button>
  );
}
