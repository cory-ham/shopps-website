import { NextRequest, NextResponse } from 'next/server'

const PORTAL_ID = '5507026'
const FORM_ID = 'a3670688-2592-4f58-bdfb-0a78a2b0eb42'
const LIST_ID = '4374'
const HS_KEY = ***

export async function POST(req: NextRequest) {
  const { email } = await req.json()
  if (!email || !email.includes('@')) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
  }

  try {
    // 1. Submit through HubSpot Forms API — shows in form submissions
    const formRes = await fetch(
      `https://api.hsforms.com/submissions/v3/integration/submit/${PORTAL_ID}/${FORM_ID}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fields: [{ objectTypeId: '0-1', name: 'email', value: email }],
          context: { pageUri: 'shoppscards.com', pageName: 'SHOPPS — Pack Drop' },
        }),
      }
    )

    if (!formRes.ok) {
      const err = await formRes.json().catch(() => ({}))
      console.error('Form submit error:', err)
      return NextResponse.json({ error: 'Submit failed' }, { status: 500 })
    }

    // 2. Also add to SHOPPS list (form submissions don't auto-add to lists)
    if (HS_KEY) {
      // Look up contact ID by email
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
    }

    return NextResponse.json({ ok: true })
  } catch (e) {
    console.error('Subscribe error:', e)
    return NextResponse.json({ error: 'Server error' }, { status: 500 })
  }
}
