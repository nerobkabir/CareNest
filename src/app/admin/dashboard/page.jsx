import dbConnect from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import Link from 'next/link';

export default async function AdminDashboard() {
  await dbConnect();
  const bookings = await Booking.find().populate('user', 'name email').sort({ createdAt: -1 });

  return (
    <div className="max-w-6xl mx-auto py-16 px-4">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>
      <h2 className="text-xl mb-4">All Bookings</h2>
      <table className="min-w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">User</th>
            <th className="border p-2">Service</th>
            <th className="border p-2">Duration</th>
            <th className="border p-2">Total</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map(booking => (
            <tr key={booking._id}>
              <td className="border p-2">{booking.user?.name} ({booking.user?.email})</td>
              <td className="border p-2">{booking.serviceName}</td>
              <td className="border p-2">{booking.duration}h</td>
              <td className="border p-2">${booking.totalCost}</td>
              <td className="border p-2">{booking.status}</td>
              <td className="border p-2">
                <select
                  defaultValue={booking.status}
                  onChange={async (e) => {
                    const res = await fetch(`/api/bookings/${booking._id}`, {
                      method: 'PATCH',
                      headers: { 'Content-Type': 'application/json' },
                      body: JSON.stringify({ status: e.target.value }),
                    });
                    if (res.ok) location.reload();
                  }}
                >
                  <option value="Pending">Pending</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}