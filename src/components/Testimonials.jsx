const testimonials = [
  {
    stars: 5,
    quote:
      'I told it to add a dark theme and it happened instantly. This is the future of web design.',
    name: 'Marcus T.',
    title: 'Product Designer at Figma',
    initials: 'MT',
  },
  {
    stars: 5,
    quote:
      "Just said 'add a booking section' and the whole layout restructured. Absolutely wild demo.",
    name: 'Priya S.',
    title: 'Engineering Manager',
    initials: 'PS',
  },
  {
    stars: 5,
    quote:
      'The AI interpretation layer is clever. It handles fuzzy commands really well, not just exact phrases.',
    name: 'Jordan L.',
    title: 'AI Researcher',
    initials: 'JL',
  },
]

export default function Testimonials() {
  return (
    <section>
      <div className="section-inner">
        <p className="section-label">Social Proof</p>
        <h2 className="section-title">What People Are Saying</h2>
        <p className="section-subtitle">
          Try saying "remove testimonials" to watch this section disappear.
        </p>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" key={t.name}>
              <div className="testimonial-stars">{'★'.repeat(t.stars)}</div>
              <p className="testimonial-quote">"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="author-avatar">{t.initials}</div>
                <div>
                  <p className="author-name">{t.name}</p>
                  <p className="author-title">{t.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
