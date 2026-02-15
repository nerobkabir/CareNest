import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  secure: false,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendInvoiceEmail(to, booking) {
  const mailOptions = {
    from: `"Care.xyz" <${process.env.EMAIL_USER}>`,
    to,
    subject: `Booking Confirmation - ${booking.serviceName}`,
    html: `
      <h2>Thank you for booking with Care.xyz</h2>
      <p><strong>Service:</strong> ${booking.serviceName}</p>
      <p><strong>Duration:</strong> ${booking.duration} hours</p>
      <p><strong>Location:</strong> ${booking.location.address}, ${booking.location.area}, ${booking.location.city}</p>
      <p><strong>Total Cost:</strong> $${booking.totalCost}</p>
      <p><strong>Status:</strong> ${booking.status}</p>
      <p>We will contact you shortly to confirm the booking.</p>
    `,
  };

  await transporter.sendMail(mailOptions);
}