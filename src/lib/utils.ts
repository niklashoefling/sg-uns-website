export function formatDatum(datum: string) {
  return new Date(datum).toLocaleDateString('de-DE', { day: 'numeric', month: 'long', year: 'numeric' })
}

export const positionFarbe: Record<string, string> = {
  Zuspiel: 'bg-blue-100 text-blue-700',
  Außenannahme: 'bg-green-100 text-green-700',
  Diagonal: 'bg-orange-100 text-orange-700',
  Mittelblocker: 'bg-purple-100 text-purple-700',
  Libero: 'bg-yellow-100 text-yellow-700',
  Universal: 'bg-gray-100 text-gray-700',
}
