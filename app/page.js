import BenefitsApp from '../components/BenefitsApp'

export const metadata = {
  title: 'BenefitsPath — Free Unemployment Benefits Navigator',
  alternates: {
    canonical: 'https://www.benefitspath.org',
    languages: { 'en-US': 'https://www.benefitspath.org', 'es-US': 'https://www.benefitspath.org/es', 'x-default': 'https://www.benefitspath.org' },
  },
  description: 'Check if you qualify for unemployment benefits in your state. Get your eligibility results, generate appeal letters, and connect with employment attorneys — 100% free.',
}

export default function HomePage() {
  return <BenefitsApp />
}
