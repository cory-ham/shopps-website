import { NextRequest, NextResponse } from 'next/server'

const PORTAL_ID = '5507026'
const FORM_ID = 'a3670688-2592-4f58-bdfb-0a78a2b0eb42'
const LIST_ID = '4374'

export async function POST(req: NextRequest) {
  const HS_KEY = process.env.HUBSPOT_API_KEY || ''
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }
  if (!HS_KEY) {
    return NextResponse.json({ error: 'Not configured' }, { status: 500 })
  }

  try {
    // Submit through HubSpot Forms API
    const formRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [{ objectTypeId: '0-1', name: 'email', value: email }],
          context: { pageUri: 'shoppscards.com', pageName: 'SHOPPS Pack Drop' },
        }),
      }
    )

    if (!formRes.ok) {
      console.error('Form submit error:', await formRes.text())
      return NextResponse.json({ error: 'Submit failed' }, { status: 500 })
    }

    // Look up contact and add to SHOPPS list
    const lu = await fetch(
      'https://api.hubapi.com/crm/v3/objects/contacts/' + encodeURIComponent(email) + '?idProperty=email',
      { headers: { 'Authorization': 'Bearer ' + HS_KEY } }
    )
    if (lu.ok) {
      const { id } = await lu.json()
      if (id) {
        await fetch('https://api.hubapi.com/contacts/v1/lists/' + LIST_ID + '/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + HS_KEY },
          body: JSON.stringify({ vids: [parseInt(id)] }),
        })
      }
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Subscribe error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}