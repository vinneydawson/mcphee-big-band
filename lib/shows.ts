/**
 * McPhee Big Band — Show Configuration
 *
 * Update this file when show details change.
 * Every component that references show info reads from here.
 */

export const nextShow = {
  /** Full formatted date for display */
  date: 'Saturday, April 25th, 2026',
  /** Short date for compact cards */
  shortDate: 'Apr 25th',
  /** Door open time */
  doorsTime: '6:30 PM',
  /** Performance start time */
  showTime: '7:00 PM',
  /** Ticket price */
  price: '$20',
  /** External ticket purchase URL */
  ticketUrl:
    'https://events.ticketleap.com/tickets/mcpheebigband/mcphee-big-band-at-roscoe-s-jazz-lounge-1073129218',
}

export const venue = {
  name: "Roscoe's Jazz Lounge",
  address: '730 E Broadway, Long Beach, CA 90802',
  city: 'Long Beach, CA',
  doorsTime: '6:30 PM',
  showTime: '7:00 PM',
  admission: '$20 at the door',
  capacity: 'intimate listening room with great drinks',
}

export const pastShows = [
  {
    date: 'Dec 18, 2025',
    venue: "Roscoe's Jazz Lounge",
    city: 'Long Beach, CA',
    note: 'McPhee Big Band Residency',
  },
  {
    date: 'Nov 29, 2025',
    venue: "Roscoe's Jazz Lounge",
    city: 'Long Beach, CA',
    note: 'McPhee Big Band Residency',
  },
  {
    date: 'Aug 9, 2025',
    venue: "Roscoe's Jazz Lounge",
    city: 'Long Beach, CA',
    note: 'McPhee Big Band Residency',
  },
  {
    date: 'Jun 28, 2025',
    venue: "Roscoe's Jazz Lounge",
    city: 'Long Beach, CA',
    note: 'McPhee Big Band Residency',
  },
]
