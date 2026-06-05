'use client'

import { useState } from 'react'
import { FormInput, FormSelect, FormTextarea } from '@/components/ui/FormFields'

type FormState = 'idle' | 'loading' | 'success' | 'error'

type Props = {
  anliegen: { label: string; value: string }[]
}

const isValidEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

export default function ContactForm({ anliegen }: Props) {
  const [state, setState] = useState<FormState>('idle')
  const [values, setValues] = useState({
    name: '',
    email: '',
    anliegen: '',
    betreff: '',
    nachricht: '',
  })
  const [touched, setTouched] = useState<Record<string, boolean>>({})

  const isComplete =
    values.name.trim() !== '' &&
    isValidEmail(values.email) &&
    values.anliegen !== '' &&
    values.betreff.trim() !== '' &&
    values.nachricht.trim() !== ''

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  function handleBlur(
    e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setTouched((prev) => ({ ...prev, [e.target.name]: true }))
  }

  function getError(name: keyof typeof values): string | undefined {
    if (!touched[name]) return undefined
    const value = values[name]
    if (!value.trim()) return 'Dieses Feld ist erforderlich.'
    if (name === 'email' && !isValidEmail(value))
      return 'Bitte eine gültige E-Mail-Adresse eingeben.'
    return undefined
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isComplete) return
    setState('loading')
    try {
      const res = await fetch('/api/kontakt', {
        method: 'POST',
        body: new FormData(e.currentTarget),
      })
      setState(res.ok ? 'success' : 'error')
    } catch {
      setState('error')
    }
  }

  if (state === 'error') {
    return (
      <div className="text-center py-16">
        <div className="size-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-6">
          <svg
            className="size-8 text-red-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-secondary mb-3">Fehler beim Senden</h2>
        <p className="text-gray-500 mb-8">
          Deine Nachricht konnte nicht gesendet werden. Bitte versuche es erneut.
        </p>
        <button
          type="button"
          onClick={() => setState('idle')}
          className="text-sm font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          Erneut versuchen
        </button>
      </div>
    )
  }

  if (state === 'success') {
    return (
      <div className="text-center py-16">
        <div className="size-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-6">
          <svg
            className="size-8 text-green-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-secondary mb-3">Nachricht gesendet!</h2>
        <p className="text-gray-500 mb-8">
          Vielen Dank für deine Nachricht. Wir melden uns so bald wie möglich.
        </p>
        <button
          type="button"
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
        Du hast Fragen zur SG U.N.S. Rheinhessen, möchtest mitspielen oder einfach Kontakt
        aufnehmen? Schreib uns - wir freuen uns über jede Nachricht.
      </p>

      <form onSubmit={handleSubmit} noValidate className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <FormInput
            label="Name"
            type="text"
            name="name"
            required
            placeholder="Max Mustermann"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError('name')}
          />
          <FormInput
            label="E-Mail"
            type="email"
            name="email"
            required
            placeholder="max@beispiel.de"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            error={getError('email')}
          />
        </div>

        <FormSelect
          label="Anliegen"
          name="anliegen"
          required
          options={anliegen}
          placeholder="Bitte wählen…"
          value={values.anliegen}
          onChange={handleChange}
          onBlur={handleBlur}
          error={getError('anliegen')}
        />

        <FormInput
          label="Betreff"
          type="text"
          name="betreff"
          required
          placeholder="Ich möchte mitspielen"
          value={values.betreff}
          onChange={handleChange}
          onBlur={handleBlur}
          error={getError('betreff')}
        />

        <FormTextarea
          label="Nachricht"
          name="nachricht"
          required
          rows={6}
          placeholder="Deine Nachricht…"
          value={values.nachricht}
          onChange={handleChange}
          onBlur={handleBlur}
          error={getError('nachricht')}
        />

        <button
          type="submit"
          disabled={!isComplete || state === 'loading'}
          className="w-full bg-primary hover:bg-primary-dark disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 py-3 rounded-lg text-sm transition-colors"
        >
          {state === 'loading' ? 'Wird gesendet…' : 'Nachricht senden'}
        </button>
      </form>
    </>
  )
}
