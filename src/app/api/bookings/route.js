import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import dbConnect from '@/lib/mongodb';
import Booking from '@/lib/models/Booking';
import User from '@/lib/models/User';
import { sendInvoiceEmail } from '@/lib/email';
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const data = await req.json();
    const {
      serviceId,
      serviceName,
      duration,
      location,
      totalCost,
      userId,
    } = data;

    if (userId !== session.user.id) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    if (!serviceId || !duration || !totalCost) {
      return NextResponse.json(
        { error: 'Invalid data' },
        { status: 400 }
      );
    }

    const booking = await Booking.create({
      user: userId,
      serviceId,
      serviceName,
      duration,
      location,
      totalCost,
      status: 'Pending',
    });

    // ✅ Email should NOT break booking
    try {
      const user = await User.findById(userId);
      if (user?.email) {
        await sendInvoiceEmail(user.email, booking);
      }
    } catch (emailError) {
      console.error('Email failed but booking saved:', emailError.message);
    }

    return NextResponse.json(booking, { status: 201 });

  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await dbConnect();

    const bookings = await Booking.find({
      user: session.user.id,
    }).sort({ createdAt: -1 });

    return NextResponse.json(bookings);

  } catch (error) {
    return NextResponse.json(
      { error: 'Internal error' },
      { status: 500 }
    );
  }
}
