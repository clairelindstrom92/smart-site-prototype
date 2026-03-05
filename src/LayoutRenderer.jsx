import Hero from './components/Hero.jsx'
import Services from './components/Services.jsx'
import Testimonials from './components/Testimonials.jsx'
import BookingSection from './components/BookingSection.jsx'
import ContactForm from './components/ContactForm.jsx'

const COMPONENT_MAP = {
  hero: Hero,
  services: Services,
  testimonials: Testimonials,
  booking: BookingSection,
  contact: ContactForm,
}

export default function LayoutRenderer({ layout }) {
  return (
    <div className="layout">
      {layout.map((name) => {
        const Component = COMPONENT_MAP[name]
        if (!Component) return null
        return (
          <div key={name} className="section-enter">
            <Component />
          </div>
        )
      })}
    </div>
  )
}
