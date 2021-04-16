import Button from '../Button/Button.tsx';

export default function LandingPage() {
  return (
    <div>
      I am the landing page
      <Button>
        <a href="/api/auth/login">GET STARTED</a>
      </Button>
    </div>
  );
}
