import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'
import { signupNotificationHtml } from '@/lib/email-templates'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    // Add subscriber to mailing list audience
    if (process.env.RESEND_AUDIENCE_ID) {
      const { data, error: contactError } = await getResend().contacts.create({
        email,
        audienceId: process.env.RESEND_AUDIENCE_ID,
      })
      if (contactError) {
        console.error('Failed to add contact to audience:', contactError)
      } else {
        console.log('Contact added to audience:', data)
      }
    }

    await getResend().emails.send({
      from: 'McPhee Big Band <onboarding@resend.dev>',
      to: 'vinneydawson@icloud.com',
      subject: `New Email Subscriber: ${email}`,
      html: signupNotificationHtml(email),
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Email signup error:', error)
    return NextResponse.json({ error: 'Failed to process signup' }, { status: 500 })
  }
}
