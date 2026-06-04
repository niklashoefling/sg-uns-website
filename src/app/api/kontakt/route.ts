import { Resend } from 'resend'
import { NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(req: Request) {
  const data = await req.formData()

  const name = data.get('name')?.toString() ?? '-'
  const email = data.get('email')?.toString() ?? '-'
  const anliegen = data.get('anliegen')?.toString() ?? '-'
  const betreff = data.get('betreff')?.toString() ?? '-'
  const nachricht = data.get('nachricht')?.toString() ?? '-'

  const payload = await getPayload({ config })

  const needsMannschaft = anliegen !== 'allgemein' && anliegen !== '-'

  const [impressum, mannschaftDocs] = await Promise.all([
    payload.findGlobal({ slug: 'impressum' }),
    needsMannschaft
      ? payload.find({
          collection: 'mannschaften',
          where: { slug: { equals: anliegen } },
          limit: 1,
        })
      : Promise.resolve(null),
  ])

  const fallbackEmail = impressum.kontaktEmail as string | undefined
  const mannschaftEmail = mannschaftDocs?.docs[0]?.email
  const to = mannschaftEmail ?? fallbackEmail ?? ''

  if (!to) {
    return NextResponse.json({ ok: false }, { status: 500 })
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
