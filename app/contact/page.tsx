import type { Metadata } from 'next'
import PageHeader from '@/components/PageHeader'
import ContactInfo from '@/components/ContactInfo'
import InquiryForm from '@/components/InquiryForm'

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Request a quote or inquire about booking the McPhee Big Band for your next event.',
}

export default function ContactPage() {
  return (
    <>
      <PageHeader
        label="GET IN TOUCH"
        title="Let's Talk."
        subtitle="Ready to bring the McPhee Big Band to your event? Reach out and we'll put together a custom quote."
      />
      <ContactInfo />
      <InquiryForm />
    </>
  )
}
