'use client'

import { useId } from 'react'

const inputBase =
  'w-full border rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors'

const inputNormal = 'border-gray-200 focus:border-primary focus:ring-primary'
const inputError = 'border-red-400 focus:border-red-400 focus:ring-red-400'

type FieldProps = {
  label: string
  id: string
  required?: boolean
  error?: string
  children: React.ReactNode
}

function Field({ label, id, required, error, children }: FieldProps) {
  return (
    <div>
      <label htmlFor={id} className="block text-sm font-semibold text-secondary mb-1.5">
        {label}
        {required && (
          <span aria-hidden="true" className="text-red-500 ml-0.5">
            *
          </span>
        )}
      </label>
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 text-xs text-red-500" role="alert">
          {error}
        </p>
      )}
    </div>
  )
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  error?: string
}

export function FormInput({ label, required, error, ...props }: InputProps) {
  const id = useId()
  return (
    <Field label={label} id={id} required={required} error={error}>
      <input
        id={id}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
        className={`${inputBase} ${error ? inputError : inputNormal}`}
      />
    </Field>
  )
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label: string
  error?: string
}

export function FormTextarea({ label, required, error, ...props }: TextareaProps) {
  const id = useId()
  return (
    <Field label={label} id={id} required={required} error={error}>
      <textarea
        id={id}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
        className={`${inputBase} ${error ? inputError : inputNormal} resize-none`}
      />
    </Field>
  )
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: { label: string; value: string }[]
  placeholder?: string
  error?: string
}

export function FormSelect({
  label,
  options,
  placeholder,
  required,
  error,
  ...props
}: SelectProps) {
  const id = useId()
  return (
    <Field label={label} id={id} required={required} error={error}>
      <select
        id={id}
        required={required}
        aria-required={required}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        {...props}
        className={`${inputBase} ${error ? inputError : inputNormal} bg-white`}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </Field>
  )
}
