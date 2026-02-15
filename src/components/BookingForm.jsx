'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function BookingForm({ service, user }) {
  const [duration, setDuration] = useState(1);
  const [location, setLocation] = useState({
    division: '',
    district: '',
    city: '',
    area: '',
    address: '',
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const safeDuration = isNaN(duration) || duration < 1 ? 1 : duration;

  const totalCost =
    safeDuration && service?.pricePerHour
      ? safeDuration * service.pricePerHour
      : 0;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!service || !user) return;

    setLoading(true);

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId: service.id,
          serviceName: service.name,
          duration: safeDuration,
          location,
          totalCost,
          userId: user.id,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        router.push('/my-bookings');
      } else {
        alert(data.error || 'Booking failed');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block mb-1">Duration (hours)</label>
        <input
          type="number"
          min="1"
          value={safeDuration}
          onChange={(e) => {
            const value = parseInt(e.target.value);
            setDuration(isNaN(value) ? 1 : value);
          }}
          className="w-full border rounded p-2"
          required
        />
      </div>

      {['division', 'district', 'city', 'area'].map((field) => (
        <div key={field}>
          <label className="block mb-1 capitalize">{field}</label>
          <input
            value={location[field]}
            onChange={(e) =>
              setLocation({ ...location, [field]: e.target.value })
            }
            className="w-full border rounded p-2"
            required
          />
        </div>
      ))}

      <div>
        <label className="block mb-1">Full Address</label>
        <textarea
          value={location.address}
          onChange={(e) =>
            setLocation({ ...location, address: e.target.value })
          }
          className="w-full border rounded p-2"
          rows="3"
          required
        />
      </div>

      <div className="text-xl font-bold">
        Total: ${totalCost}
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-3 rounded-lg disabled:bg-gray-400"
      >
        {loading ? 'Processing...' : 'Confirm Booking'}
      </button>
    </form>
  );
}
