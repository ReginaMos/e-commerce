import { z } from 'zod';

export type FormData = z.infer<typeof registrationSchema>;
export type AddressData = z.infer<typeof addressSchema>;
export type PersonalData = z.infer<typeof schemaPersonal>;
export type UpdatePasswordData = z.infer<typeof schemaUpdatePassword>;

const today = new Date();
export const thirteenYearsAgo = new Date(today.getFullYear() - 13, today.getMonth(), today.getDate());

export const addressSchema = z.object({
  streetName: z.string().min(1, { message: 'Street must be at least 1 character long' }),
  city: z
    .string()
    .min(1, { message: 'City must be at least 1 character long' })
    .regex(/^\p{L}+$/u, {
      message: 'City must contain only letters (no spaces, apostrophes, hyphens, numbers, or special characters)',
    }),
  postalCode: z.string().regex(/^\d{5}$/, {
    message: 'Invalid postal code format (e.g., 28013)',
  }),
  country: z.string().min(1, { message: 'Country must be selected' }),
});

export const schemaPassword = z.object({
  password: z
    .string()
    .regex(/^[a-zA-Z0-9!@#$%^&*]*$/, {
      message: 'Password can contain only Latin letters, numbers, and special characters (!@#$%^&*)',
    })
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/[a-z]/, {
      message: 'Password must contain at least one lowercase letter',
    })
    .regex(/[A-Z]/, {
      message: 'Password must contain at least one uppercase letter',
    })
    .regex(/[0-9]/, { message: 'Password must contain at least one number' }),
});

const schemaBase = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name must be at least 1 characters long' })
    .regex(/^\p{L}+$/u, {
      message: 'First name must contain only letters',
    }),
  lastName: z
    .string()
    .min(1, { message: 'Last name must be at least 1 characters long' })
    .regex(/^\p{L}+$/u, {
      message: 'Last name must contain only letters',
    }),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9@._-]+$/, {
      message: 'Email address must contain only Latin letters, numbers, and allowed symbols (@, ., _, -)',
    })
    .email(),
  dateOfBirth: z.preprocess(
    (val) => (typeof val === 'string' ? new Date(val) : val),
    z.date().refine((date) => date <= thirteenYearsAgo, { message: 'Must be at least 13 years old' })
  ),
});

export const registrationSchema = schemaBase.extend(schemaPassword.shape);

export const schemaUpdatePassword = z.object({
  oldPassword: schemaPassword.shape.password,
  newPassword: schemaPassword.shape.password,
});

export const schemaPersonal = schemaBase.partial();
