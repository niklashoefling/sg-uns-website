import { Resend } from 'resend'
import { NextResponse } from 'next/server'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const data = await req.formData()

  const name = data.get('name')?.toString() ?? '–'
  const email = data.get('email')?.toString() ?? '–'
  const anliegen = data.get('anliegen')?.toString() ?? '–'
  const betreff = data.get('betreff')?.toString() ?? '–'
  const nachricht = data.get('nachricht')?.toString() ?? '–'

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: 'hoefling.niklas@gmx.de',
      subject: `Kontaktformular: ${betreff}`,
      text: `Name: ${name}\nE-Mail: ${email}\nAnliegen: ${anliegen}\n\n${nachricht}`,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
