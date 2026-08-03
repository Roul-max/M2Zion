import { Link } from "react-router-dom";
import PageTransition from "../components/PageTransition";

export default function GenericPage({ title }: { title: string }) {
  return (
    <PageTransition className="min-h-screen bg-bg-base px-8 pt-8 pb-6 flex flex-col items-center justify-center">
      <h1 className="text-2xl font-bold text-text-primary mb-4">{title}</h1>
      <p className="text-text-secondary text-center mb-8">
        This screen is coming soon. Stay tuned!
      </p>
      <Link to="/home" className="text-accent-green border border-accent-green px-6 py-2 rounded-full hover:bg-accent-green hover:text-bg-base transition-colors">
        Go Home
      </Link>
    </PageTransition>
  );
}
