import { SeoLayout, CTABlock, FAQSection } from '../../../components/SeoTemplate'
import CertReminderSignup from '../../../components/CertReminderSignup'

const URL = 'https://www.benefitspath.org/es/audiencia-de-apelacion'
const EN = 'https://www.benefitspath.org/articles/unemployment-appeal-hearing-questions-what-the-judge-will-ask-2026'

export const metadata = {
  title: 'Audiencia de apelación de desempleo: qué le preguntarán y qué llevar',
  description: 'Guía en español para su audiencia de apelación de desempleo: quién tiene que probar qué, las preguntas que hace el juez si lo despidieron o renunció, y una lista de documentos.',
  alternates: { canonical: URL, languages: { 'es-US': URL, 'en-US': EN, 'x-default': EN } },
  openGraph: { locale: 'es_US', type: 'article', url: URL, title: 'Audiencia de apelación de desempleo: qué le preguntarán y qué llevar' },
}

const H2 = ({ children }) => <h2 className="prose-h2">{children}</h2>
const P = ({ children, end }) => <p className={`prose-p${end ? ' prose-end' : ''}`}>{children}</p>
const UL = ({ items }) => <ul className="prose-ul">{items.map((t, i) => <li key={i} className="prose-li">{t}</li>)}</ul>

const faqs = [
  { q: '¿La audiencia es en español?', a: 'Normalmente las audiencias se hacen en inglés, pero la mayoría de los estados le dan un intérprete gratis si lo pide antes. Llame a la oficina de apelaciones en cuanto reciba su aviso. En algunos estados, como Washington, un familiar o amigo no puede servir de intérprete.' },
  { q: '¿Puedo leer mis notas durante la audiencia?', a: 'Por lo general sí, para recordar fechas y nombres. Pero conteste con sus propias palabras; el juez quiere su testimonio, no un discurso preparado.' },
  { q: '¿Qué pasa si el empleador no se presenta?', a: 'La audiencia normalmente sigue. Si lo despidieron y el empleador no presenta pruebas, eso puede ayudarle. Aun así, esté listo para contar su versión.' },
  { q: '¿Qué pasa si no me presento?', a: 'Si usted pidió la apelación y no participa, pueden desestimarla y la negación original queda en pie. Llame a la oficina de apelaciones ese mismo día para preguntar cómo pedir otra audiencia.' },
  { q: '¿Necesito un abogado?', a: 'No es obligatorio y la mayoría de las personas se representan solas. Si lo despidieron por supuesta mala conducta, tiene un sobrepago grande o el empleador viene con abogado, una consulta corta puede ayudar. Hay oficinas de ayuda legal gratuita en cada estado.' },
]

export default function Page() {
  const articleLd = {
    '@context': 'https://schema.org', '@type': 'Article', inLanguage: 'es-US',
    headline: 'Audiencia de apelación de desempleo: qué le preguntarán y qué llevar',
    author: { '@type': 'Organization', name: 'BenefitsPath' },
    publisher: { '@type': 'Organization', name: 'BenefitsPath', url: 'https://www.benefitspath.org' },
    datePublished: '2026-11-22', dateModified: '2026-11-22', mainEntityOfPage: URL,
  }
  return (
    <SeoLayout lang="es" altHref="/articles/unemployment-appeal-hearing-questions-what-the-judge-will-ask-2026">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleLd) }} />
      <div className="sg-hero">
        <div className="sg-eyebrow">Apelaciones</div>
        <h1 className="sg-title">Audiencia de apelación de desempleo: qué le preguntarán y qué llevar</h1>
        <p className="sg-lede">
          El juez le preguntará cómo y por qué terminó su trabajo, las fechas en que trabajó y si estuvo disponible y buscando empleo. No necesita preparar un discurso: necesita saber bien sus fechas y tener sus papeles a mano.
        </p>
      </div>

      <H2>¿Quién tiene que probar qué?</H2>
      <P>Esto decide quién habla primero y qué preguntas importan más.</P>
      <UL items={[
        <><strong>Si lo despidieron:</strong> en la mayoría de los estados el empleador tiene que demostrar que lo despidió por mala conducta relacionada con el trabajo. Normalmente el empleador declara primero.</>,
        <><strong>Si renunció:</strong> usted tiene que demostrar que tenía una buena razón para irse, por lo general relacionada con el trabajo o el empleador. Usted declara primero.</>,
        <><strong>Si rechazó una oferta de trabajo:</strong> normalmente usted tiene que demostrar que el trabajo no era adecuado.</>,
        <><strong>Si el problema es su disponibilidad, su búsqueda de empleo o sus ingresos:</strong> usted tiene que explicarlo, así que lleve sus registros.</>,
      ]} />

      <H2>Preguntas que hacen en casi todos los casos</H2>
      <UL items={[
        '¿Cuándo empezó a trabajar ahí y cuál fue su último día?',
        '¿Cuál era su puesto? ¿Trabajaba tiempo completo o medio tiempo?',
        '¿Cómo terminó el trabajo? ¿Quién se lo dijo, cuándo y qué le dijeron exactamente?',
        '¿Cuándo empezó a presentar sus certificaciones semanales? ¿Sigue presentándolas?',
        '¿En esas semanas podía trabajar físicamente y estaba disponible sin límites de horario?',
        '¿Buscó trabajo cada semana? ¿Cómo, y tiene registros?',
      ]} />
      <P end><strong>Consejo:</strong> escriba en una sola hoja su fecha de inicio, su último día, la fecha en que le avisaron y el nombre de la persona que le avisó. Téngala enfrente durante la audiencia.</P>

      <H2>Si lo despidieron</H2>
      <P>El juez suele preguntarle primero al testigo del empleador y después a usted. Espere preguntas como estas:</P>
      <UL items={[
        '¿Cuál fue el último incidente que llevó al despido y cuándo pasó?',
        '¿Qué regla dice el empleador que usted rompió? ¿Estaba por escrito y usted la recibió?',
        '¿Le habían advertido antes? ¿Las advertencias fueron por escrito o de palabra? ¿Firmó algo?',
        '¿Sabía que podía perder el trabajo si volvía a pasar?',
        '¿Cuál es su versión del último incidente? ¿Fue un error, un accidente o algo fuera de su control?',
        '¿Trataron diferente a otros empleados por lo mismo?',
      ]} />
      <P end><strong>Lo que le ayuda:</strong> mostrar que fue un error honesto, algo que pasó una sola vez o que no fue su culpa. La mala conducta normalmente significa ignorar a propósito o con mucho descuido los intereses del empleador, no un bajo rendimiento ni un solo error. Si el testigo del empleador no vio lo que pasó, dígalo.</P>

      <H2>Si renunció</H2>
      <P>Como usted tiene que demostrar una buena razón, estas preguntas van primero para usted:</P>
      <UL items={[
        '¿Por qué renunció? ¿Cuál fue la razón principal?',
        '¿Cuándo empezó el problema y empeoró con el tiempo?',
        '¿Le avisó a un supervisor, a Recursos Humanos o al dueño antes de irse? ¿Cuándo, cómo y qué le respondieron?',
        '¿Pidió una solución, un traslado, un cambio de horario o un permiso antes de renunciar?',
        '¿Tenía otro trabajo esperándolo?',
        'Si renunció por salud o por su familia, ¿se lo recomendó un médico y preguntó antes por una licencia?',
      ]} />
      <P end><strong>Lo que le ayuda:</strong> pruebas de que intentó resolver el problema antes de irse. Un correo a Recursos Humanos o un mensaje de texto a su gerente vale más que casi cualquier cosa que diga en la audiencia.</P>

      <H2>Preguntas que usted le puede hacer al testigo del empleador</H2>
      <P>Usted tiene derecho a hacerle preguntas a los testigos de la otra parte. El juez le dirá cuándo es su turno. Haga preguntas cortas, una sobre cada hecho:</P>
      <UL items={[
        '¿Usted vio el incidente en persona o alguien se lo contó?',
        '¿Dónde está la política por escrito y yo la firmé?',
        '¿En qué fecha me advirtieron y quién lo hizo?',
        '¿Sancionaron a otros empleados por lo mismo?',
      ]} />
      <P end>No discuta con el testigo. Haga la pregunta, escuche y guarde su explicación para cuando el juez se la pida.</P>

      <H2>Qué llevar: lista de documentos</H2>
      <P>La mayoría de las audiencias son por teléfono, así que &quot;llevar&quot; significa tenerlo enfrente y enviar copias antes. Muchos estados solo toman en cuenta los documentos que se enviaron a la oficina de audiencias y a la otra parte antes de la audiencia. Lea las instrucciones de su aviso.</P>
      <UL items={[
        'Su aviso de audiencia, con el número para llamar, el PIN o código y los temas',
        'La decisión que está apelando y el paquete de documentos de la agencia, si se lo enviaron',
        'Una hoja con sus fechas, nombres y lo que le dijeron',
        'Su carta de despido, carta de renuncia o aviso de separación',
        'Advertencias, reportes disciplinarios y evaluaciones',
        'Correos y mensajes con su supervisor o Recursos Humanos sobre el problema',
        'El manual o la política del empleador que dicen que usted rompió, si lo tiene',
        'Talones de pago de las semanas en que trabajó mientras cobraba',
        'Su registro de búsqueda de empleo',
        'Notas del médico, si su salud tuvo que ver',
        'Los datos de contacto de sus testigos',
      ]} />
      <P end>Antes de enviar cualquier documento, tache su número de Seguro Social, sus números de cuenta bancaria y su número de licencia de conducir.</P>

      <H2>El día de la audiencia</H2>
      <UL items={[
        'Cargue su teléfono y busque un lugar callado con buena señal.',
        'Tenga sus papeles ordenados y numerados igual que como los envió.',
        'Si su estado le pide registrarse o confirmar su número antes, hágalo.',
        'Si nadie le llama unos 10 minutos después de la hora, llame usted a la oficina de audiencias.',
        'Siga presentando sus certificaciones semanales mientras espera la decisión, a menos que su estado le diga lo contrario.',
      ]} />

      <CTABlock title="¿Cree que necesita ayuda legal?" description="Encuentre oficinas de ayuda legal gratuita y abogados laborales en su estado. La página está en inglés." href="/legal-help" btnText="Buscar ayuda legal" variant="blue" />

      <CertReminderSignup lang="es" source="es-hearing" />

      <FAQSection faqs={faqs} title="Preguntas frecuentes" />

      <P>
        Fuentes: Oficina de Audiencias Administrativas de Washington; Departamento de Trabajo de Vermont; Departamento de Trabajo de Maine; División de Seguridad del Empleo de Carolina del Norte; Seguro de Desempleo de Minnesota. Las reglas, los plazos y quién habla primero cambian según el estado. Siga las instrucciones de su aviso de audiencia. Esta guía es informativa y no es asesoría legal.
      </P>
    </SeoLayout>
  )
}
