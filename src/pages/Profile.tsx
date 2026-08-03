import PageTransition from "../components/PageTransition";

export default function Profile() {
  return (
    <PageTransition className="min-h-screen bg-bg-base px-8 pt-8 pb-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-text-primary mb-4">Profile</h1>
      <p className="text-text-secondary text-center mb-8">
        This screen is coming soon. Stay tuned!
      </p>
    </PageTransition>
  );
}
