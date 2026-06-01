'use client'

import { useState } from 'react'

type FormState = 'idle' | 'loading' | 'success' | 'error'

export default function ContactForm() {
  const [state, setState] = useState<FormState>('idle')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setState('loading')
    setTimeout(() => setState('success'), 800)
  }

  if (state === 'success') {
    return (
      <div className="text-center py-16">
        <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-secondary mb-3">Nachricht gesendet!</h2>
        <p className="text-gray-500 mb-8">Vielen Dank für deine Nachricht. Wir melden uns so bald wie möglich.</p>
        <button
          onClick={() => setState('idle')}
          className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          Weitere Nachricht senden
        </button>
      </div>
    )
  }

  return (
    <>
      <p className="text-gray-500 leading-relaxed mb-10">
        Du hast Fragen zur SG U.N.S. Rheinhessen, möchtest mitspielen oder einfach Kontakt aufnehmen?
        Schreib uns - wir freuen uns über jede Nachricht.
      </p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1.5">Name</label>
            <input
              type="text"
              name="name"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="Max Mustermann"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-secondary mb-1.5">E-Mail</label>
            <input
              type="email"
              name="email"
              required
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
              placeholder="max@beispiel.de"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-secondary mb-1.5">Betreff</label>
          <input
            type="text"
            name="betreff"
            required
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors"
            placeholder="Ich möchte mitspielen"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-secondary mb-1.5">Nachricht</label>
          <textarea
            name="nachricht"
            required
            rows={6}
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors resize-none"
            placeholder="Deine Nachricht…"
          />
        </div>

        <button
          type="submit"
          disabled={state === 'loading'}
          className="w-full bg-primary hover:bg-primary-dark disabled:opacity-60 text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
        >
          {state === 'loading' ? 'Wird gesendet…' : 'Nachricht senden'}
        </button>
      </form>
    </>
  )
}
