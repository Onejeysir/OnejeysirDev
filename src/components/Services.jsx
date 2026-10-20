import { services } from "../data/services";
import { Reveal, SecHead } from "./Reveal";
import { Arrow } from "./Icons";

export default function Services({ onRequest }) {
  return (
    <section id="services" className="section" aria-labelledby="services-title">
      <div className="wrap">
        <SecHead
          kicker="Services"
          id="services-title"
          lines={["Ce que je peux", "faire pour vous."]}
          lead="Des prestations à ma mesure, réalisées avec soin. Le devis se discute selon votre besoin."
        />
        <ul className="svc-list">
          {services.map((s, i) => (
            <Reveal as="li" key={s.title} className="svc" delay={Math.min(i, 4) * 0.05} y={18}>
              <span className="svc-fill" aria-hidden="true" />
              <div className="svc-left">
                <p className="svc-problem">{s.problem}</p>
                <h3>{s.title}</h3>
              </div>
              <p className="svc-desc">{s.description}</p>
              <button type="button" className="btn btn-sm" onClick={() => onRequest(s.type)} aria-label={`Demander : ${s.title}`}>
                Demander <Arrow />
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
