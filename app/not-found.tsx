import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-shell not-found">
      <p className="eyebrow">404</p>
      <h1>Page not found</h1>
      <p>The research page you requested does not exist yet.</p>
      <Link className="button primary" href="/">Back to portfolio</Link>
    </main>
  );
}
