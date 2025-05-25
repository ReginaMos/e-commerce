import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string()
    .regex(/^[^\s].*[^\s]$|^[^\s]$/, {
      message: 'Email address must not contain leading or trailing whitespace',
    })
    .regex(/^[a-zA-Z0-9@._-]+$/, {
      message: 'Email address must contain only Latin letters, numbers, and allowed symbols (@, ., _, -)',
    })
    .regex(/@/, {
      message: "Email address must contain an '@' symbol separating local part and domain name",
    })
    .email({ message: 'Email address must be properly formatted (e.g., user@example.com).' }),

  password: z
    .string()
    .regex(/^[^\s].*[^\s]$|^[^\s]$/, {
      message: 'Password address must not contain leading or trailing whitespace',
    })
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
