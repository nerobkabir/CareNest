import Link from 'next/link';

export default function ServiceCard({ service }) {
  return (
    <div className="border rounded-lg p-6 shadow hover:shadow-lg transition">
      <h3 className="text-xl font-semibold mb-2">{service.name}</h3>
      <p className="text-gray-600 mb-4">{service.description}</p>
      <p className="text-lg font-bold mb-4">${service.pricePerHour}/hour</p>
      <Link href={`/service/${service.id}`} className="bg-blue-500 text-white px-4 py-2 rounded inline-block">View Details</Link>
    </div>
  );
}