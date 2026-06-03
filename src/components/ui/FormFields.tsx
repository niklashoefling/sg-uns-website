'use client'

const inputClass =
  'w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors'

type LabelProps = {
  label: string
  children: React.ReactNode
}

function Field({ label, children }: LabelProps) {
  return (
    <div>
      <label className="block text-sm font-semibold text-secondary mb-1.5">{label}</label>
      {children}
    </div>
  )
}

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & { label: string }

export function FormInput({ label, ...props }: InputProps) {
  return (
    <Field label={label}>
      <input {...props} className={inputClass} />
    </Field>
  )
}

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }

export function FormTextarea({ label, ...props }: TextareaProps) {
  return (
    <Field label={label}>
      <textarea {...props} className={`${inputClass} resize-none`} />
    </Field>
  )
}

type SelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
  label: string
  options: { label: string; value: string }[]
  placeholder?: string
}

export function FormSelect({ label, options, placeholder, ...props }: SelectProps) {
  return (
    <Field label={label}>
      <select {...props} className={`${inputClass} bg-white`}>
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
