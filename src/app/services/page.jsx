import ServiceCard from "@/components/ServiceCard";
import { services } from "@/data/services";

export const metadata = {
  title: "All Services - Care.xyz",
};

export default function ServicesPage() {
  return (
    <div className="py-20 px-6 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-12">
        Our Care Services
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </div>
  );
}
