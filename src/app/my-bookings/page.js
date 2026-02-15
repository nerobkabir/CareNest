'use client';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function MyBookingsPage() {
  const { data: session, status } = useSession();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (session) {
      fetch('/api/bookings')
        .then(res => res.json())
        .then(data => {
          setBookings(data);
          setLoading(false);
        });
    }
  }, [session]);

  if (status === 'loading' || loading) return <div>Loading...</div>;
  if (!session) return <div>Please log in</div>;

  const handleCancel = async (id) => {
    if (!confirm('Are you sure you want to cancel this booking?')) return;
    const res = await fetch(`/api/bookings/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setBookings(bookings.filter(b => b._id !== id));
    }
  };

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map(booking => (
            <div key={booking._id} className="border p-4 rounded shadow">
              <h2 className="text-xl font-semibold">{booking.serviceName}</h2>
              <p>Duration: {booking.duration} hours</p>
              <p>Location: {booking.location.address}, {booking.location.area}, {booking.location.city}</p>
              <p>Total: ${booking.totalCost}</p>
              <p>Status: <span className={`font-bold ${booking.status === 'Pending' ? 'text-yellow-600' : booking.status === 'Confirmed' ? 'text-green-600' : 'text-gray-600'}`}>{booking.status}</span></p>
              <div className="mt-2 space-x-2">
                <Link href={`/booking/${booking.serviceId}`} className="text-blue-600 underline">View Details</Link>
                {booking.status === 'Pending' && (
                  <button onClick={() => handleCancel(booking._id)} className="text-red-600 underline ml-4">Cancel</button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}