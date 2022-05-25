import { z } from 'zod';

const vehicleZodSchema = z.object({
  model: z.string({
    required_error: 'Model is required',
    invalid_type_error: 'Model must be a string',
  }).min(3, { message: 'Model must be at least 3 characters' }),
  year: z.number({
    required_error: 'Year is required',
    invalid_type_error: 'Year must be a number',
  }).min(1900, { message: 'Year must be at least 1900' })
    .max(2022, { message: 'Year must be at most 2022' })
    .int({ message: 'Year must be an integer' }),
  color: z.string({
    required_error: 'Color is required',
    invalid_type_error: 'Color must be a string',
  }).min(3, { message: 'Color must be 3 or more characters long' }),
  status: z.boolean({
    invalid_type_error: 'Status must be a boolean',
  }).optional(),
  buyValue: z.number({
    required_error: 'Buy value is required',
    invalid_type_error: 'Buy value must be a integer',
  }).positive({ message: 'Buy value must be positive' })
    .int({ message: 'Buy value must be integer' }),
});

type Vehicle = z.infer<typeof vehicleZodSchema>;

export { Vehicle, vehicleZodSchema };
