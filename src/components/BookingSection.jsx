import { useState } from 'react'

const slots = [
  'Mon Mar 10 · 10:00 AM',
  'Mon Mar 10 · 2:00 PM',
  'Tue Mar 11 · 9:00 AM',
  'Tue Mar 11 · 3:00 PM',
  'Wed Mar 12 · 11:00 AM',
  'Thu Mar 13 · 1:00 PM',
]

export default function BookingSection() {
  const [selected, setSelected] = useState(null)
  const [booked, setBooked] = useState(false)

  const handleBook = () => {
    if (selected) setBooked(true)
  }

  return (
    <section>
      <div className="section-inner">
        <p className="section-label">Schedule</p>
        <div className="booking-section">
          {booked ? (
            <div>
              <p style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</p>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
                You&apos;re booked!
              </h2>
              <p style={{ color: 'var(--text-muted)' }}>
                Confirmation sent for <strong style={{ color: 'var(--cyan)' }}>{selected}</strong>
              </p>
              <button
                className="btn btn-outline"
                style={{ marginTop: '1.5rem' }}
                onClick={() => { setBooked(false); setSelected(null) }}
              >
                Book another
              </button>
            </div>
          ) : (
            <>
              <h2 className="section-title" style={{ marginBottom: '0.5rem' }}>
                Book a Free Consultation
              </h2>
              <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                Pick a time that works for you. 30 minutes, no commitment.
              </p>
              <div className="booking-slots">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    className={`booking-slot ${selected === slot ? 'selected' : ''}`}
                    onClick={() => setSelected(slot)}
                  >
                    {slot}
                  </button>
                ))}
              </div>
              <button
                className="btn btn-primary"
                onClick={handleBook}
                disabled={!selected}
                style={{ opacity: selected ? 1 : 0.5 }}
              >
                Confirm Booking
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
