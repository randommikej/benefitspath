import { notFound } from 'next/navigation'
import { SeoLayout, CTABlock, FAQSection } from '../../../../components/SeoTemplate'
import CertReminderSignup from '../../../../components/CertReminderSignup'
import { STATE_DATA } from '../../../../lib/data'
import { STATES_ES, codeForSlug } from '../../../../lib/statesEs'

const BASE = 'https://www.benefitspath.org'
const money = (n) => `$${Number(n).toLocaleString('en-US')}`

export const dynamicParams = false

export function generateStaticParams() {
  return Object.keys(STATES_ES).map(estado => ({ estado }))
}

function load(estado) {
  const es = STATES_ES[estado]
  const code = codeForSlug(estado)
  if (!es || !code) return null
  return { es, code, d: STATE_DATA[code] }
}

export function generateMetadata({ params }) {
  const s = load(params.estado)
  if (!s) return {}
  const { es, d } = s
  const url = `${BASE}/es/desempleo/${params.estado}`
  const en = `${BASE}/unemployment-benefits-${params.estado}`
  return {
    title: `Beneficios de desempleo en ${es.name}: guía 2026 en español`,
    description: `Guía en español del seguro de desempleo en ${es.name}: requisitos, beneficio semanal de hasta ${money(d.weeklyMax)}, cómo solicitar y cómo apelar una negación (${d.appealDays} días).`,
    alternates: { canonical: url, languages: { 'es-US': url, 'en-US': en, 'x-default': en } },
    openGraph: { locale: 'es_US', title: `Beneficios de desempleo en ${es.name}`, url },
  }
}

export default function Page({ params }) {
  const s = load(params.estado)
  if (!s) notFound()
  const { es, code, d } = s
  const n = es.name

  const stats = [[money(d.weeklyMax), 'Beneficio semanal máximo'], [`${es.weeks} sem.`, 'Duración máxima'], [`${d.appealDays} días`, 'Plazo para apelar']]
  const faqs = [
    { q: `¿Cuánto recibiré de desempleo en ${n}?`, a: `En ${n}, el beneficio semanal máximo es de ${money(d.weeklyMax)}. La cantidad exacta depende de lo que ganó durante su período base. La mayoría recibe entre ${money(es.min)} y ${money(d.weeklyMax)} por semana.` },
    { q: `¿Por cuánto tiempo puedo cobrar desempleo en ${n}?`, a: `${n} ofrece hasta ${es.weeks} semanas de beneficios en condiciones económicas normales. Cuando el desempleo es alto en el estado, puede haber beneficios extendidos.` },
    { q: `¿Cuál es el plazo para apelar en ${n}?`, a: `Tiene ${d.appealDays} días calendario desde la fecha de su aviso de negación para apelar en ${n}. Si se le pasa el plazo, normalmente pierde el derecho a apelar esa decisión.` },
    { q: `¿Puedo trabajar medio tiempo y seguir cobrando en ${n}?`, a: `En la mayoría de los casos, sí. ${n} le permite ganar algo de dinero mientras cobra beneficios, pero su pago se reduce según lo que gane. Reporte todos sus ingresos cada vez que certifique.` },
    { q: `¿Qué pasa si mi empleador se opone a mi reclamo en ${n}?`, a: `Su empleador tiene derecho a disputar su reclamo. Si lo hace, revisarán su caso y es posible que le pidan más información. Si le niegan el reclamo, tiene ${d.appealDays} días para apelar.` },
    { q: '¿Las audiencias de apelación son en español?', a: 'Por lo general las audiencias se hacen en inglés, pero la mayoría de los estados ofrecen un intérprete gratis si lo pide antes de la audiencia. Llame a la oficina de apelaciones en cuanto reciba su aviso.' },
  ]

  return (
    <SeoLayout lang="es" altHref={`/unemployment-benefits-${params.estado}`}>
      <div className="sg-hero">
        <div className="sg-eyebrow">Guía estatal</div>
        <h1 className="sg-title">Beneficios de desempleo en {n}</h1>
        <p className="sg-lede">
          Todo lo que necesita saber sobre el seguro de desempleo en {n}: requisitos, cuánto puede recibir, cómo solicitar y qué hacer si se lo niegan.
        </p>
      </div>

      <div className="sg-stats">
        {stats.map(([val, lbl]) => (
          <div key={lbl} className="sg-stat">
            <div className="sg-stat-val">{val}</div>
            <div className="sg-stat-lbl">{lbl}</div>
          </div>
        ))}
      </div>

      <CTABlock title={`Verifique su elegibilidad en ${n}`} description={`Conteste 4 preguntas rápidas y vea si probablemente califica para beneficios de desempleo en ${n}.`} href={`/es?estado=${code}`} btnText="Verificar mi elegibilidad" variant="green" />

      <h2 className="prose-h2">Requisitos para calificar en {n}</h2>
      <p className="prose-p">Para recibir beneficios de desempleo en {n}, por lo general debe cumplir con estos requisitos:</p>
      <ul className="prose-ul">
        {[es.req1, 'Debe estar desempleado sin culpa propia (despido, recorte de personal o algo similar)', 'Debe estar buscando trabajo de tiempo completo activamente y estar disponible para aceptar un empleo adecuado', 'Debe certificar cada semana que sigue sin trabajo y buscando empleo'].map(r => (
          <li key={r} className="prose-li">{r}</li>
        ))}
      </ul>

      <h2 className="prose-h2">Cuánto paga el desempleo en {n}</h2>
      <p className="prose-p">
        En {n}, el beneficio semanal va de <strong>{money(es.min)} a {money(d.weeklyMax)}</strong>, con un máximo de <strong>{money(d.weeklyMax)} por semana</strong>. Se calcula según lo que ganó durante su período base, que normalmente son los primeros cuatro de los últimos cinco trimestres completos.
      </p>
      <p className="prose-p prose-end">
        Puede recibir beneficios por hasta <strong>{es.weeks} semanas</strong> en {n}. Cuando el desempleo es alto en el estado, puede haber beneficios extendidos.
      </p>

      <h2 className="prose-h2">Cómo solicitar el desempleo en {n}</h2>
      <p className="prose-p">{es.apply}</p>
      <p className="prose-p">Muchos portales estatales están solo en inglés. Si necesita ayuda en español, llame a la línea de reclamos y pida un intérprete.</p>
      <div style={{ marginBottom: 12 }}>
        <a href={d.portal} target="_blank" rel="noopener noreferrer" className="sg-btn">Solicitar en línea en {n} →</a>
      </div>
      <p className="sg-phone">Por teléfono: <strong>{d.phone}</strong></p>

      <h2 className="prose-h2">Cómo apelar una negación en {n}</h2>
      <div className="sg-deadline">
        <strong>Plazo para apelar en {n}: {d.appealDays} días calendario desde su aviso de negación</strong>
      </div>
      <p className="prose-p prose-end">{es.appeal}</p>

      <CTABlock title="Prepárese para su audiencia de apelación" description="Qué le van a preguntar, qué documentos enviar antes y qué tener a mano el día de la audiencia." href="/es/audiencia-de-apelacion" btnText="Ver la guía de la audiencia" variant="green" />
      <CTABlock title="Hable con un abogado laboral" description="Si su empleador se opuso a su reclamo o su caso es complicado, la ayuda legal puede mejorar mucho sus posibilidades. La página de ayuda legal está en inglés." href={`/legal-help/${params.estado}`} btnText="Buscar ayuda legal gratuita" variant="blue" />

      <CertReminderSignup lang="es" defaultState={code} source={`es-state-${params.estado}`} />

      <FAQSection faqs={faqs} title="Preguntas frecuentes" />

      <p className="prose-p" style={{ fontSize: 13, color: '#8a8078' }}>
        Esta guía es informativa y no es asesoría legal. Las reglas y cantidades pueden cambiar; confirme los detalles con la agencia de desempleo de {n}.
      </p>
    </SeoLayout>
  )
}
