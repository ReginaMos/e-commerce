import { z } from 'zod';

const today = new Date();
export const thirteenYearsAgo = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());

export const registrationSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'Username must be at least 1 characters long' })
    .regex(/^[a-zA-Z]*$/, { message: 'Username must contain only letters' }),
  lastName: z
    .string()
    .min(1, { message: 'Username must be at least 1 characters long' })
    .regex(/^[a-zA-Z]*$/, { message: 'Username must contain only letters' }),
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
  dateOfBirth: z.date().refine(
    (date) => {
      return date <= thirteenYearsAgo;
    },
    {
      message: 'Must be at least 13 years old',
    }
  ),
  street: z.string().min(1, { message: 'Street must be at least 1 character long' }),
  city: z
    .string()
    .min(1, { message: 'City must be at least 1 character long' })
    .regex(/^[a-zA-Z\s]*$/, {
      message: 'City must contain only letters and spaces',
    }),
  postalCode: z.string().regex(/^(\d{6}|\d{5}-\d{4}|\d{4}\s\d{3})$/, {
    message: 'Invalid postal code format (e.g., 000000, 12345-6789, or 1234 567)',
  }),
  country: z.string().min(1, { message: 'Country must be selected' }),
});
