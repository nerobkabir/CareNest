'use client';
import { useSession } from 'next-auth/react';
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import BookingForm from '@/components/BookingForm';
import { services } from '@/data/services';

export default function BookingPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const params = useParams();   // ✅ FIX
  const [service, setService] = useState(null);

  useEffect(() => {
    const found = services.find(
      s => s.id.toString() === params.serviceId
    );
    setService(found);
  }, [params.serviceId]);

  if (status === 'loading') return <div>Loading...</div>;

  if (!session) {
    router.push(`/login?callbackUrl=/booking/${params.serviceId}`);
    return null;
  }

  if (!service) return <div>Service not found</div>;

  return (
    <div className="max-w-2xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">
        Book {service.name}
      </h1>
      <BookingForm service={service} user={session.user} />
    </div>
  );
}
