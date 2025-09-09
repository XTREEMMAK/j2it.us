import * as v from 'valibot';

// Contact form schema
export const contactSchema = v.object({
  name: v.pipe(
    v.string(),
    v.minLength(2, 'Name must be at least 2 characters'),
    v.maxLength(100, 'Name must be less than 100 characters')
  ),
  email: v.pipe(
    v.string(),
    v.email('Please enter a valid email address')
  ),
  phone: v.optional(
    v.pipe(
      v.string(),
      v.regex(
        /^[\d\s\-\+\(\)]+$/,
        'Please enter a valid phone number'
      )
    )
  ),
  businessName: v.pipe(
    v.string(),
    v.minLength(2, 'Business name must be at least 2 characters'),
    v.maxLength(100, 'Business name must be less than 100 characters')
  ),
  message: v.pipe(
    v.string(),
    v.minLength(10, 'Message must be at least 10 characters'),
    v.maxLength(1000, 'Message must be less than 1000 characters')
  )
});

// Type would be: v.InferOutput<typeof contactSchema> in TypeScript