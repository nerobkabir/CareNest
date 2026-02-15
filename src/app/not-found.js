import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="text-center py-20">
      <h1 className="text-4xl font-bold">404 - Page Not Found</h1>
      <p className="mt-4">The page you are looking for does not exist.</p>
      <Link href="/" className="mt-6 inline-block bg-blue-600 text-white px-6 py-3 rounded">Go Home</Link>
    </div>
  );
}