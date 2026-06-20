import { z } from 'zod/v4';

export const hireSchema = z.object({
	firstName: z.string('Name is required').min(1),
	lastName: z.string('Last name is required').min(1),
	email: z.email('Email is required'),
	phone: z.string('Phone is required').min(1),
	eventType: z.string('Event type is required').min(1),
	eventDate: z.string('Event date is required').min(1),
	expectedGuests: z.number('Expected guests is required').min(1),
	enquiry: z.string().optional()
});
