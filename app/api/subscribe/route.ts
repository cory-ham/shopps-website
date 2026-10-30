import { NextRequest, NextResponse } from 'next/server'

const HS_KEY = '***}'
const LIST_ID = '4374'

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    // Create contact
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + HS_KEY },
      body: JSON.stringify({ properties: { email, lifecyclestage: 'subscriber', hs_lead_status: 'NEW' } }),
    })

    let vid: number | null = null
    if (res.ok) {
      vid = (await res.json())?.id
    } else if (res.status === 409) {
      const lu = await fetch(
        'https://api.hubapi.com/crm/v3/objects/contacts/' + encodeURIComponent(email) + '?idProperty=email',
        { headers: { 'Authorization': 'Bearer ' + HS_KEY } }
      )
      if (lu.ok) vid = (await lu.json())?.id
    }

    if (vid) {
      await fetch('https://api.hubapi.com/contacts/v1/lists/' + LIST_ID + '/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + HS_KEY },
        body: JSON.stringify({ vids: [parseInt(String(vid))] }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
