import { NextRequest, NextResponse } from 'next/server'

const HS_API_KEY = process.env.HUBSPOT_API_KEY || ''
const SHOPPS_LIST_ID = '4374' // SHOPPS — Pack Drop Signups

export async function POST(req: NextRequest) {
  const { email, source } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    // 1. Create or update contact
    const contactRes = await fetch('https://api.hubapi.com/crm/v3/objects/contacts/upsert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${HS_API_KEY}`,
      },
      body: JSON.stringify({
        inputs: [{
          properties: {
            email,
            hs_lead_status: 'NEW',
            lifecyclestage: 'subscriber',
            hs_analytics_source: 'OTHER_CAMPAIGNS',
            shopps_signup_source: source || 'shoppscards.com',
          },
          idProperty: 'email',
        }],
      }),
    })

    if (!contactRes.ok) {
      const err = await contactRes.json()
      console.error('HubSpot upsert error:', err)
      return NextResponse.json({ error: 'HubSpot error' }, { status: 500 })
    }

    const contactData = await contactRes.json()
    const contactId = contactData?.results?.[0]?.id

    // 2. Add to SHOPPS list
    if (contactId) {
      await fetch(`https://api.hubapi.com/contacts/v1/lists/${SHOPPS_LIST_ID}/add`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${HS_API_KEY}`,
        },
        body: JSON.stringify({ vids: [contactId] }),
      })
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Subscribe error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
