export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-inner">
        <span className="hero-tag">VOICE-POWERED AI BUILDER</span>
        <h1>
          Your website,{' '}
          <span className="gradient-text">built by voice</span>
        </h1>
        <p className="hero-subtitle">
          Speak a command. Watch the site change in real time. Powered by AI
          that understands what you want to build.
        </p>
        <div className="hero-buttons">
          <button className="btn btn-primary" onClick={() => document.querySelector('.mic-button')?.click()}>
            Start Speaking
          </button>
          <button className="btn btn-outline" onClick={() => {
            const hint = document.querySelector('.commands-hint p')
            if (hint) hint.style.color = 'var(--cyan)'
            setTimeout(() => hint && (hint.style.color = ''), 2000)
          }}>
            View Commands
          </button>
        </div>
      </div>
    </section>
  )
}
