import { useState, useRef, useEffect } from 'react'

function MicIcon({ active }) {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="9" y="2" width="6" height="12" rx="3" />
      <path d="M5 10a7 7 0 0 0 14 0" />
      <line x1="12" y1="19" x2="12" y2="22" />
      <line x1="8" y1="22" x2="16" y2="22" />
    </svg>
  )
}

function StopIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <rect x="5" y="5" width="14" height="14" rx="3" />
    </svg>
  )
}

export default function VoiceControl({ onCommand, isThinking, aiMessage, error }) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [supported, setSupported] = useState(true)
  const recognitionRef = useRef(null)
  const transcriptRef = useRef('')
  const onCommandRef = useRef(onCommand)

  useEffect(() => {
    onCommandRef.current = onCommand
  }, [onCommand])

  useEffect(() => {
    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition

    if (!SpeechRecognition) {
      setSupported(false)
      return
    }

    const recognition = new SpeechRecognition()
    recognition.continuous = false
    recognition.interimResults = true
    recognition.lang = 'en-US'

    recognition.onresult = (e) => {
      const current = Array.from(e.results)
        .map((r) => r[0].transcript)
        .join('')
      setTranscript(current)
      transcriptRef.current = current
    }

    recognition.onend = () => {
      setIsListening(false)
      const t = transcriptRef.current
      if (t) {
        onCommandRef.current(t)
        transcriptRef.current = ''
        setTranscript('')
      }
    }

    recognition.onerror = (e) => {
      setIsListening(false)
      if (e.error !== 'no-speech' && e.error !== 'aborted') {
        console.error('Speech recognition error:', e.error)
      }
    }

    recognitionRef.current = recognition

    return () => {
      recognition.abort()
    }
  }, [])

  const toggleListening = () => {
    if (!supported || isThinking) return

    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      transcriptRef.current = ''
      setTranscript('')
      setIsListening(true)
      try {
        recognitionRef.current?.start()
      } catch {
        // Recognition already started
      }
    }
  }

  const hasMessage = aiMessage || error || transcript || isThinking

  return (
    <div className="voice-control">
      {hasMessage && (
        <div className="voice-feedback">
          {isThinking && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div className="thinking-dots">
                <span />
                <span />
                <span />
              </div>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                Processing...
              </span>
            </div>
          )}
          {transcript && !isThinking && (
            <p className="transcript">"{transcript}"</p>
          )}
          {aiMessage && !isThinking && (
            <p className={`ai-message ${aiMessage.startsWith('Could not') ? 'error' : ''}`}>
              {aiMessage}
            </p>
          )}
          {error && <p className="ai-message error">{error}</p>}
        </div>
      )}

      <button
        className={`mic-button ${isListening ? 'active' : ''} ${isThinking ? 'thinking' : ''}`}
        onClick={toggleListening}
        disabled={!supported || isThinking}
        title={
          !supported
            ? 'Web Speech API not supported in this browser (try Chrome)'
            : isListening
            ? 'Click to stop'
            : 'Click to speak a command'
        }
      >
        <span className="mic-ring" />
        <span className="mic-ring" />
        {isListening ? <StopIcon /> : <MicIcon />}
      </button>

      {!supported && (
        <p style={{ fontSize: '0.7rem', color: '#ff6b7a', textAlign: 'right', fontFamily: 'var(--font-mono)' }}>
          Use Chrome for voice support
        </p>
      )}

      <div className="commands-hint">
        <p>
          "Add testimonials" · "Dark theme" · "Light theme"<br />
          "Add booking section" · "Add contact form"<br />
          "Make it modern" · "Remove testimonials" · "Reset"
        </p>
      </div>
    </div>
  )
}
