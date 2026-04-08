interface InquiryData {
  name: string
  email: string
  phone: string
  eventType: string
  eventDate: string
  venue: string
  guestCount: string
  message: string
}

const eventTypeLabels: Record<string, string> = {
  corporate: 'Corporate Event',
  wedding: 'Wedding / Celebration',
  private: 'Private Party',
  fundraiser: 'Fundraiser / Benefit',
  other: 'Other',
}

export function inquiryEmailHtml(data: InquiryData): string {
  const rows = [
    { label: 'Name', value: data.name },
    { label: 'Email', value: data.email },
    { label: 'Phone', value: data.phone || 'Not provided' },
    { label: 'Event Type', value: eventTypeLabels[data.eventType] || data.eventType },
    { label: 'Event Date', value: data.eventDate },
    { label: 'Venue / Location', value: data.venue || 'Not provided' },
    { label: 'Guest Count', value: data.guestCount || 'Not provided' },
  ]

  const rowsHtml = rows
    .map(
      (r) => `
      <tr>
        <td style="padding: 12px 16px; color: #8a919e; font-size: 14px; border-bottom: 1px solid #1e2025; width: 140px; vertical-align: top;">${r.label}</td>
        <td style="padding: 12px 16px; color: #ffffff; font-size: 14px; border-bottom: 1px solid #1e2025;">${r.value}</td>
      </tr>`
    )
    .join('')

  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin: 0; padding: 0; background-color: #0a0b0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0b0d; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td style="background-color: #0052FF; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">McPhee Big Band</h1>
              <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">New Booking Inquiry</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color: #14161a; padding: 0; border-radius: 0 0 12px 12px;">
              <table width="100%" cellpadding="0" cellspacing="0">
                ${rowsHtml}
              </table>
              <!-- Message -->
              <div style="padding: 20px 16px; border-top: 1px solid #1e2025;">
                <p style="margin: 0 0 8px; color: #8a919e; font-size: 14px;">Message</p>
                <p style="margin: 0; color: #ffffff; font-size: 14px; line-height: 1.6; white-space: pre-wrap;">${data.message}</p>
              </div>
              <!-- Reply CTA -->
              <div style="padding: 16px; border-top: 1px solid #1e2025;">
                <a href="mailto:${data.email}" style="display: inline-block; background-color: #0052FF; color: #ffffff; text-decoration: none; padding: 10px 24px; border-radius: 999px; font-size: 14px; font-weight: 600;">Reply to ${data.name}</a>
              </div>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 0 0; text-align: center;">
              <p style="margin: 0; color: #8a919e; font-size: 12px;">McPhee Big Band · Los Angeles, CA</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}

export function signupNotificationHtml(email: string): string {
  return `
<!DOCTYPE html>
<html>
<head><meta charset="utf-8" /></head>
<body style="margin: 0; padding: 0; background-color: #0a0b0d; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #0a0b0d; padding: 40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width: 600px; width: 100%;">
          <!-- Header -->
          <tr>
            <td style="background-color: #0052FF; padding: 24px 32px; border-radius: 12px 12px 0 0;">
              <h1 style="margin: 0; color: #ffffff; font-size: 20px; font-weight: 700;">McPhee Big Band</h1>
              <p style="margin: 4px 0 0; color: rgba(255,255,255,0.8); font-size: 13px;">New Email Subscriber</p>
            </td>
          </tr>
          <!-- Body -->
          <tr>
            <td style="background-color: #14161a; padding: 24px 32px; border-radius: 0 0 12px 12px;">
              <p style="margin: 0 0 8px; color: #8a919e; font-size: 14px;">A new visitor subscribed to email updates:</p>
              <p style="margin: 0; color: #ffffff; font-size: 16px; font-weight: 600;">${email}</p>
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td style="padding: 24px 0 0; text-align: center;">
              <p style="margin: 0; color: #8a919e; font-size: 12px;">McPhee Big Band · Los Angeles, CA</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`
}
