import { notFound } from 'next/navigation';
import Link from 'next/link';
import { services } from '@/data/services';
import { use } from 'react';

export async function generateMetadata({ params }) {
  const { serviceId } = await params;

  const service = services.find(
    s => s.id.toString() === serviceId
  );

  if (!service) {
    return { title: 'Service Not Found' };
  }

  return {
    title: `${service.name} - Care.xyz`,
    description: service.description,
  };
}

export default function ServiceDetailPage({ params }) {
  const resolvedParams = use(params);   // ✅ FIX
  const { serviceId } = resolvedParams;

  const service = services.find(
    s => s.id.toString() === serviceId
  );

  if (!service) notFound();

  return (
    <div className="max-w-4xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-4">{service.name}</h1>
      <p className="text-gray-700 mb-6">{service.description}</p>
      <p className="text-2xl font-bold mb-8">
        ${service.pricePerHour} / hour
      </p>
      <Link
        href={`/booking/${service.id}`}
        className="bg-green-600 text-white px-6 py-3 rounded-lg text-lg"
      >
        Book This Service
      </Link>
    </div>
  );
}
