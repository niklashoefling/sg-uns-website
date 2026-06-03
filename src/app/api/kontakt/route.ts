import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const resend = new Resend(process.env.RESEND_API_KEY)

const FALLBACK_EMAIL = 'hoefling.niklas@gmx.de'

export async function POST(req: Request) {
  const data = await req.formData()

  const name = data.get('name')?.toString() ?? '-'
  const email = data.get('email')?.toString() ?? '-'
  const anliegen = data.get('anliegen')?.toString() ?? '-'
  const betreff = data.get('betreff')?.toString() ?? '-'
  const nachricht = data.get('nachricht')?.toString() ?? '-'

  let to = FALLBACK_EMAIL
  if (anliegen !== 'allgemein' && anliegen !== '-') {
    const payload = await getPayload({ config })
    const { docs } = await payload.find({
      collection: 'mannschaften',
      where: { slug: { equals: anliegen } },
      limit: 1,
    })
    const mannschaftEmail = docs[0]?.email
    if (mannschaftEmail) to = mannschaftEmail
  }

  try {
    await resend.emails.send({
      from: 'onboarding@resend.dev',
      to,
      replyTo: email,
      subject: `Kontaktformular: ${betreff}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\n${nachricht}`,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 500 })
  }
}
