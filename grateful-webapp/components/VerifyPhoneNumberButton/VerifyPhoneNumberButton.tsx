export default function VerifyPhoneNumberButton() {
  const verify = () => {
    console.log('verification logic');
  };

  return (
    <div>
      <h3>Your phone number is not verified</h3>
      <button type="button" onClick={verify}>
        Verify
      </button>
    </div>
  );
}
