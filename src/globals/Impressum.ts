import type { GlobalConfig } from 'payload'

export const Impressum: GlobalConfig = {
  slug: 'impressum',
  label: 'Impressum',
  admin: {
    description: 'Angaben für das Impressum - Vereine, Redaktionell Verantwortlicher, Social Media',
  },
  access: {
    read: () => true,
    update: ({ req }) => req.user?.rolle === 'admin',
  },
  fields: [
    {
      name: 'vereine',
      type: 'array',
      label: 'Vereine',
      minRows: 1,
      admin: {
        description:
          'Alle Vereine, die im Impressum aufgeführt werden (Reihenfolge per Drag & Drop)',
      },
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Vereinsname',
          required: true,
        },
        {
          name: 'strasse',
          type: 'text',
          label: 'Straße und Hausnummer',
          required: true,
        },
        {
          name: 'ort',
          type: 'text',
          label: 'PLZ und Ort',
          required: true,
        },
        {
          name: 'telefon',
          type: 'text',
          label: 'Telefon',
        },
        {
          name: 'email',
          type: 'email',
          label: 'E-Mail',
        },
        {
          name: 'website',
          type: 'text',
          label: 'Website (optional)',
        },
        {
          name: 'vereinsregister',
          type: 'text',
          label: 'Vereinsregister (optional)',
          admin: {
            description: 'z.B. "14 VR 1161"',
          },
        },
        {
          name: 'registergericht',
          type: 'text',
          label: 'Registergericht (optional)',
          admin: {
            description: 'z.B. "Amtsgericht Mainz"',
          },
        },
        {
          name: 'vertretung',
          type: 'text',
          label: 'Vertreten durch',
          admin: {
            description: 'z.B. "Claudia Schäffer (Vorstand)"',
          },
        },
      ],
    },
    {
      name: 'redaktionellVerantwortlicher',
      type: 'group',
      label: 'Redaktionell Verantwortlicher (§ 18 Abs. 2 MStV)',
      fields: [
        {
          name: 'name',
          type: 'text',
          label: 'Name',
        },
        {
          name: 'adresse',
          type: 'text',
          label: 'Adresse (optional)',
          admin: {
            description: 'Straße, PLZ Ort',
          },
        },
      ],
    },
    {
      name: 'kontaktEmail',
      type: 'email',
      label: 'Zentrale Kontaktadresse der SG',
      admin: {
        description:
          'Erscheint ganz unten auf der Impressumsseite als zentraler Kontakthinweis für Webseitenbesucher.',
      },
    },
    {
      name: 'socialMedia',
      type: 'array',
      label: 'Social-Media-Profile',
      admin: {
        description: 'Profile, für die dieses Impressum gilt',
      },
      fields: [
        {
          name: 'plattform',
          type: 'text',
          label: 'Plattform',
          admin: {
            description: 'z.B. "Instagram", "Facebook"',
          },
        },
        {
          name: 'url',
          type: 'text',
          label: 'URL',
          required: true,
        },
      ],
    },
  ],
}
