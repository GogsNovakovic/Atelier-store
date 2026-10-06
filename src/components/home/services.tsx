import { services } from "@/lib/catalog";

export function Services() {
  return (
    <section aria-labelledby="services-title" className="container-page pb-section">
      <h2 id="services-title" className="sr-only">
        Services
      </h2>
      <ul className="grid border-t border-line md:grid-cols-3">
        {services.map((service) => (
          <li
            key={service.title}
            className="border-b border-line py-8 md:border-b-0 md:py-stack md:pr-gutter md:not-first:border-l md:not-first:pl-gutter"
          >
            <h3 className="label">{service.title}</h3>
            <p className="mt-3 text-ui text-muted">{service.body}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
