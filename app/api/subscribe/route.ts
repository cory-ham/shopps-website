import { NextRequest, NextResponse } from 'next/server'

const PORTAL_ID = '5507026'
const HS_API_KEY = process.env.HUBSPOT_API_KEY || ''

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    // Create/update contact in HubSpot
    const res = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HS_API_KEY}`,
      },
      body: JSON.stringify({
        properties: {
          email,
          hs_lead_status: 'NEW',
          lifecyclestage: 'subscriber',
        },
      }),
    })

    // 409 = contact already exists — treat as success
    if (res.ok || res.status === 409) {
      return NextResponse.json({ ok: true })
    }

    const err = await res.json()
    console.error('HubSpot error:', err)
    return NextResponse.json({ error: 'HubSpot error' }, { status: 500 })
  } catch (e) {
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
