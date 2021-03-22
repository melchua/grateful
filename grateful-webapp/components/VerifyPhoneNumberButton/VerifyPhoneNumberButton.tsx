import { useState } from 'react';
import sendMessage from '../../services/twilio.ts';
import { updateUserById } from '../../services/users';

export default function VerifyPhoneNumberButton(props) {
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');
  const [codeInputted, setCodeInputted] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const sendCode = () => {
    setVerifying(true);
    const generateCoded = [...Array(4)]
      .map(() => Math.random().toString(36)[2])
      .join('');
    setCode(generateCoded);
    console.log(generateCoded);
    sendMessage(generateCoded, phoneNumber);
  };

  const confirmCode = (userCode: string) => {
    // eslint-disable-next-line no-unused-expressions
    userCode === code // eslint-disable-next-line react/prop-types
      ? updateUserById(props.currentUser, phoneNumber)
      : console.log('no match');
  };

  return (
    <div>
      {verifying ? (
        <>
          <h3>What was the code we sent you?</h3>
          <input
            value={codeInputted}
            onChange={(e) => setCodeInputted(e.target.value)}
          />
          <button type="button" onClick={() => confirmCode(codeInputted)}>
            Confirm
          </button>
        </>
      ) : (
        <>
          <h3>Your phone number is not verified</h3>
          <input
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <button type="button" onClick={sendCode}>
            Verify
          </button>
        </>
      )}
    </div>
  );
}
