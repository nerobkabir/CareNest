import Link from "next/link";
import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

export const metadata = {
  title: "Care.xyz - Trusted Baby & Elderly Care Services",
  description:
    "Book verified babysitters, elderly caregivers and special care services easily and securely.",
};

export default function HomePage() {
  return (
    <div className="bg-white">

      {/* HERO SECTION */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-24 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 leading-tight">
          Trusted Care for Your Loved Ones
        </h1>
        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto text-blue-100">
          Professional babysitting, elderly care, and special home care
          services — safe, reliable, and just a few clicks away.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            href="/services"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold shadow-lg hover:bg-gray-100 transition"
          >
            Explore Services
          </Link>

          <Link
            href="/register"
            className="border border-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
          >
            Get Started
          </Link>
        </div>

        {/* Trust indicators */}
        <div className="mt-12 flex justify-center gap-8 text-sm text-blue-100 flex-wrap">
          <span>✔ Verified Caregivers</span>
          <span>✔ Secure Booking</span>
          <span>✔ Transparent Pricing</span>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section className="py-20 px-6 max-w-5xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Why Choose Care.xyz?</h2>
        <p className="text-gray-600 text-lg">
          Care.xyz connects families with trained and background-verified
          caregivers. Whether you need babysitting, elderly assistance, or
          special home care — we make caregiving simple, secure, and
          stress-free.
        </p>

        {/* Feature grid */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <div className="p-6 shadow-lg rounded-xl bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">Easy Booking</h3>
            <p className="text-gray-600 text-sm">
              Select duration, location, and confirm within minutes.
            </p>
          </div>

          <div className="p-6 shadow-lg rounded-xl bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">Verified Caregivers</h3>
            <p className="text-gray-600 text-sm">
              Background checked and trained professionals.
            </p>
          </div>

          <div className="p-6 shadow-lg rounded-xl bg-gray-50">
            <h3 className="font-semibold text-lg mb-2">Secure Platform</h3>
            <p className="text-gray-600 text-sm">
              Safe authentication and protected payments.
            </p>
          </div>
        </div>
      </section>

      {/* SERVICES SECTION */}
      <section className="py-20 bg-gray-50 px-6">
        <h2 className="text-3xl font-bold text-center mb-12">
          Our Care Services
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-6xl mx-auto">
          {services.map((service) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>
      </section>

      {/* TESTIMONIAL SECTION */}
      <section className="py-20 px-6 text-center bg-white">
        <h2 className="text-3xl font-bold mb-12">What Families Say</h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <div className="shadow-lg p-6 rounded-xl bg-gray-50">
            <p className="text-gray-600 text-sm mb-4">
              “Amazing service! The babysitter was professional and caring.
              Highly recommended.”
            </p>
            <h4 className="font-semibold">— Ayesha Rahman</h4>
          </div>

          <div className="shadow-lg p-6 rounded-xl bg-gray-50">
            <p className="text-gray-600 text-sm mb-4">
              “Booking process was smooth and easy. My father received excellent
              elderly care.”
            </p>
            <h4 className="font-semibold">— Imran Khan</h4>
          </div>

          <div className="shadow-lg p-6 rounded-xl bg-gray-50">
            <p className="text-gray-600 text-sm mb-4">
              “Very reliable platform. Transparent pricing and great support.”
            </p>
            <h4 className="font-semibold">— Nusrat Jahan</h4>
          </div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="bg-blue-600 text-white py-16 text-center px-6">
        <h2 className="text-3xl font-bold mb-6">
          Ready to Book Trusted Care?
        </h2>
        <Link
          href="/services"
          className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold shadow hover:bg-gray-100 transition"
        >
          Book Now
        </Link>
      </section>

    </div>
  );
}
