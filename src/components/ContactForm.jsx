import { useState } from 'react'

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (form.name && form.email && form.message) setSent(true)
  }

  return (
    <section id="contact">
      <div className="section-inner">
        <p className="section-label">Get in Touch</p>
        <h2 className="section-title">Contact Us</h2>
        <p className="section-subtitle">
          Say "remove contact form" to hide this section any time.
        </p>
        <div className="contact-form-wrapper">
          {sent ? (
            <div style={{ textAlign: 'center', padding: '3rem 0' }}>
              <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>📬</p>
              <h3 style={{ marginBottom: '0.5rem' }}>Message sent!</h3>
              <p style={{ color: 'var(--text-muted)' }}>
                We&apos;ll get back to you within 24 hours.
              </p>
              <button
                className="btn btn-outline"
                style={{ marginTop: '1.5rem' }}
                onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="What are you building?"
                  value={form.message}
                  onChange={handleChange}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>
                Send Message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
