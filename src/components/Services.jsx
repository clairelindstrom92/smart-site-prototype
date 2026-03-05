const services = [
  {
    icon: '⚡',
    title: 'Real-Time AI',
    description:
      'Instant voice-to-action pipeline. Speak a command and watch the layout update without a page reload.',
  },
  {
    icon: '🎨',
    title: 'Theme Control',
    description:
      'Switch between dark and light modes on command. Change the visual style dynamically with a single phrase.',
  },
  {
    icon: '🧩',
    title: 'Modular Sections',
    description:
      'Add or remove sections like Testimonials, Booking, and Contact forms — all through natural speech.',
  },
  {
    icon: '🔗',
    title: 'AI Integration',
    description:
      'Connects to Claude or OpenAI for advanced command understanding. Mock mode works offline out of the box.',
  },
]

export default function Services() {
  return (
    <section id="services">
      <div className="section-inner">
        <p className="section-label">Capabilities</p>
        <h2 className="section-title">What Smart Site Can Do</h2>
        <p className="section-subtitle">
          Every section of this website can be modified in real time using your voice.
        </p>
        <div className="services-grid">
          {services.map((s) => (
            <div className="service-card" key={s.title}>
              <div className="service-icon">{s.icon}</div>
              <h3>{s.title}</h3>
              <p>{s.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
