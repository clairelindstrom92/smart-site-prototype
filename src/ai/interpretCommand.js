import mockCommands from '../mockCommands.json'

/**
 * Interprets a voice command string and returns a structured JSON instruction.
 *
 * In MOCK mode (default), maps the text against mockCommands.json using
 * exact match, then substring/fuzzy matching.
 *
 * For live AI mode, uncomment the Claude or OpenAI block below and set
 * VITE_CLAUDE_API_KEY or VITE_OPENAI_API_KEY in a .env file.
 */
export async function interpretCommand(text) {
  const normalized = text.toLowerCase().trim()

  // --- MOCK MODE ---
  // 1. Exact match
  if (mockCommands[normalized]) {
    return mockCommands[normalized]
  }

  // 2. Fuzzy: command key is contained in the spoken text
  for (const [key, value] of Object.entries(mockCommands)) {
    if (normalized.includes(key)) {
      return value
    }
  }

  // 3. Fuzzy: spoken text is contained in a command key
  for (const [key, value] of Object.entries(mockCommands)) {
    if (key.includes(normalized) && normalized.length > 3) {
      return value
    }
  }

  // --- OPTIONAL: Claude API mode ---
  // Uncomment and set VITE_CLAUDE_API_KEY in .env.local
  //
  // if (import.meta.env.VITE_CLAUDE_API_KEY) {
  //   const res = await fetch('https://api.anthropic.com/v1/messages', {
  //     method: 'POST',
  //     headers: {
  //       'x-api-key': import.meta.env.VITE_CLAUDE_API_KEY,
  //       'anthropic-version': '2023-06-01',
  //       'content-type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       model: 'claude-haiku-4-5-20251001',
  //       max_tokens: 200,
  //       messages: [{
  //         role: 'user',
  //         content: `You are a UI command parser. Convert the following voice command into a JSON instruction.
  //
  // Available actions:
  // - { "action": "add_component", "component": "testimonials"|"booking"|"contact" }
  // - { "action": "remove_component", "component": "testimonials"|"booking"|"contact" }
  // - { "action": "change_theme", "theme": "dark"|"light" }
  // - { "action": "change_style", "style": "modern"|"default" }
  // - { "action": "reset" }
  //
  // Voice command: "${text}"
  //
  // Respond with ONLY valid JSON, nothing else.`
  //       }]
  //     })
  //   })
  //   const data = await res.json()
  //   const content = data.content?.[0]?.text?.trim()
  //   if (content) return JSON.parse(content)
  // }

  // --- OPTIONAL: OpenAI API mode ---
  // Uncomment and set VITE_OPENAI_API_KEY in .env.local
  //
  // if (import.meta.env.VITE_OPENAI_API_KEY) {
  //   const res = await fetch('https://api.openai.com/v1/chat/completions', {
  //     method: 'POST',
  //     headers: {
  //       Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       model: 'gpt-4o-mini',
  //       temperature: 0,
  //       messages: [
  //         {
  //           role: 'system',
  //           content: 'You are a UI command parser. Convert voice commands to JSON instructions. Respond with ONLY valid JSON.'
  //         },
  //         { role: 'user', content: `Voice command: "${text}"\nReturn JSON only.` }
  //       ]
  //     })
  //   })
  //   const data = await res.json()
  //   const content = data.choices?.[0]?.message?.content?.trim()
  //   if (content) return JSON.parse(content)
  // }

  return null
}
