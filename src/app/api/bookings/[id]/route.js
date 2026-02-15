import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import { NextResponse } from 'next/server';

export async function DELETE(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    await dbConnect();
    const booking = await Booking.findById(params.id);
    if (!booking) {
      return NextResponse.json({ error: 'Not found' }, { status: 404 });
    }
    if (booking.user.toString() !== session.user.id) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    if (booking.status !== 'Pending') {
      return NextResponse.json({ error: 'Cannot cancel non-pending booking' }, { status: 400 });
    }

    booking.status = 'Cancelled';
    await booking.save();
    return NextResponse.json({ message: 'Cancelled' });
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}

// Add this to the existing file
export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }

    await dbConnect();
    const { status } = await req.json();
    const booking = await Booking.findByIdAndUpdate(params.id, { status }, { new: true });
    return NextResponse.json(booking);
  } catch (error) {
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}