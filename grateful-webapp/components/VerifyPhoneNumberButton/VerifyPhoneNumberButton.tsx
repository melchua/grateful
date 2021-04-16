import { useState } from 'react';
import sendMessage from '../../services/twilio.ts';
import { updateUserById } from '../../services/users';

export default function VerifyPhoneNumberButton(props) {
  const [verifying, setVerifying] = useState(false);
  const [code, setCode] = useState('');
  const [codeInputted, setCodeInputted] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const isValidPhoneNumber = (phone: string) => {
    const found = phone.search(
      /^(\+{1}\d{2,3}\s?[(]{1}\d{1,3}[)]{1}\s?\d+|\+\d{2,3}\s{1}\d+|\d+){1}[\s|-]?\d+([\s|-]?\d+){1,2}$/,
    );
    return found > -1;
  };

  const sendCode = () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      setError('Please enter a valid phone number');
      return;
    }

    setVerifying(true);
    const generateCoded = [...Array(4)]
      .map(() => Math.random().toString(36)[2])
      .join('');
    setCode(generateCoded);
    // use this to confirm your phone number
    console.log(generateCoded);
    sendMessage(generateCoded, phoneNumber);
  };

  const confirmCode = (userCode: string) => {
    if (userCode === code) {
      // eslint-disable-next-line react/prop-types
      updateUserById(props.currentUser, phoneNumber);
      setError('');
      setVerifying(false);
    } else {
      setError('incorrect code');
    }
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
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </div>
  );
}
