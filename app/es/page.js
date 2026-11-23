import ElegibilidadEs from '../../components/ElegibilidadEs'

export const metadata = {
  title: { absolute: 'BenefitsPath en español: ¿califico para el desempleo? Verificación gratis' },
  description: 'Vea en 2 minutos si probablemente califica para beneficios de desempleo en su estado, cuánto podría recibir y sus próximos pasos. Gratis, en español, para los 50 estados.',
  alternates: {
    canonical: 'https://www.benefitspath.org/es',
    languages: { 'es-US': 'https://www.benefitspath.org/es', 'en-US': 'https://www.benefitspath.org', 'x-default': 'https://www.benefitspath.org' },
  },
  openGraph: { locale: 'es_US', title: 'BenefitsPath en español', url: 'https://www.benefitspath.org/es' },
}

export default function Page() {
  return <ElegibilidadEs />
}
