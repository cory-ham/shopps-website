import { NextRequest, NextResponse } from 'next/server'

const LIST_ID = '4374'

export async function POST(req: NextRequest) {
  const HS_KEY = *** || ''
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  if (!HS_KEY) return NextResponse.json({ error: 'Not configured' }, { status: 500 })

  try {
    // Create contact
    const createRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'Authorization': '***' *** HS_KEY },
      body: JSON.stringify({ properties: { email, lifecyclestage: 'subscriber', hs_lead_status: 'NEW' } }),
    })

    let vid: string | null = null
    if (createRes.ok) {
      vid = (await createRes.json())?.id
    } else if (createRes.status === 409) {
      const lu = await fetch(
        'https://api.hubapi.com/crm/v3/objects/contacts/' + encodeURIComponent(email) + '?idProperty=email',
        { headers: { 'Authorization': '***' *** HS_KEY } }
      )
      if (lu.ok) vid = (await lu.json())?.id
    }

    // Add to SHOPPS list
    if (vid) {
      await fetch('https://api.hubapi.com/contacts/v1/lists/' + LIST_ID + '/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Authorization': '***' *** HS_KEY },
        body: JSON.stringify({ vids: [parseInt(vid)] }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}