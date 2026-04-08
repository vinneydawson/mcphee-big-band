import { NextRequest, NextResponse } from 'next/server'
import { getResend } from '@/lib/resend'
import { inquiryEmailHtml } from '@/lib/email-templates'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    const { name, email, phone, eventType, eventDate, venue, guestCount, message, website } = body

    // Honeypot check: silently succeed
    if (website) {
      return NextResponse.json({ success: true })
    }

    // Validate required fields
    if (!name?.trim() || !email?.trim() || !eventType || !eventDate || !message?.trim()) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // Basic email format check
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return NextResponse.json({ error: 'Invalid email address' }, { status: 400 })
    }

    const eventTypeLabels: Record<string, string> = {
      corporate: 'Corporate Event',
      wedding: 'Wedding / Celebration',
      private: 'Private Party',
      fundraiser: 'Fundraiser / Benefit',
      other: 'Other',
    }

    await getResend().emails.send({
      from: 'McPhee Big Band <onboarding@resend.dev>',
      to: 'account@uxsecuremail.com',
      subject: `New Inquiry: ${eventTypeLabels[eventType] || eventType} — ${name}`,
      html: inquiryEmailHtml({ name, email, phone, eventType, eventDate, venue, guestCount, message }),
      replyTo: email,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Inquiry email error:', error)
    return NextResponse.json({ error: 'Failed to send inquiry' }, { status: 500 })
  }
}
