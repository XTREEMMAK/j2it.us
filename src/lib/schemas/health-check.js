import * as v from 'valibot';

// IT Health Check form schema
export const healthCheckSchema = v.object({
  businessName: v.pipe(
    v.string(),
    v.minLength(2, 'Business name must be at least 2 characters'),
    v.maxLength(100, 'Business name must be less than 100 characters')
  ),
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
      v.transform((val) => val.trim()),
      v.union([
        v.literal(''),
        v.pipe(
          v.string(),
          v.regex(
            /^[\d\s\-\+\(\)]+$/,
            'Please enter a valid phone number'
          )
        )
      ])
    )
  ),
  frustration: v.optional(
    v.pipe(
      v.string(),
      v.transform((val) => val.trim()),
      v.union([
        v.literal(''),
        v.pipe(
          v.string(),
          v.maxLength(500, 'Please keep your response under 500 characters')
        )
      ])
    )
  ),
  numberOfComputers: v.optional(
    v.pipe(
      v.string(),
      v.transform((val) => val.trim()),
      v.union([
        v.literal(''),
        v.pipe(
          v.string(),
          v.regex(/^(1-3|4-6|7-10|11-20|20\+)$/, 'Please select a valid option')
        )
      ])
    )
  )
});

// Type would be: v.InferOutput<typeof healthCheckSchema> in TypeScript