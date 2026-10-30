import { NextRequest, NextResponse } from 'next/server'

const HS_API_KEY = process.env.HUBSPOT_API_KEY || ''
const SHOPPS_LIST_ID = '4374'

export async function POST(req: NextRequest) {
  const { email, source } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    // 1. Create contact
    const createRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts', {
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

    let contactId: string | null = null

    if (createRes.ok) {
      const data = await createRes.json()
      contactId = data?.id
    } else if (createRes.status === 409) {
      // Already exists — look up by email
      const lookupRes = await fetch(
        `https://api.hubapi.com/crm/v3/objects/contacts/${encodeURIComponent(email)}?idProperty=email`,
        { headers: { 'Authorization': `Bearer ${HS_API_KEY}` } }
      )
      if (lookupRes.ok) {
        contactId = (await lookupRes.json())?.id
      }
    } else {
      const err = await createRes.json().catch(() => ({}))
      console.error('HubSpot create error:', err)
      return NextResponse.json({ error: 'HubSpot error' }, { status: 500 })
    }

    // 2. Add to SHOPPS list
    if (contactId) {
      await fetch(`https://api.hubapi.com/contacts/v1/lists/${SHOPPS_LIST_ID}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HS_API_KEY}`,
        },
        body: JSON.stringify({ vids: [parseInt(contactId)] }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Subscribe error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}

