import { z } from 'zod';

// Validate a date to ensure it is after a specific past date (e.g., after 01 January 2000)
const specificPastDate = new Date("2000-01-01");

export const FormDataSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  gender: z.string().min(1, 'Gender is required'),
  concern: z.string().min(1, 'Concern is required'),
  DOB: z.date().refine((date) => date > specificPastDate, {
    message: `Date must be after ${specificPastDate.toDateString()}`,
  }),
    concernName: z.string().min(1, 'Concern Name is required'),
    eyeConcern: z.string().min(1, 'Eye Concern is required'),
    writtenConcern: z.string().min(1, 'Written Concern is required')
})