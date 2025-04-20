import { object, string, number, date, InferType } from 'yup';

export const videoReportSchema = object({
  reason: string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters long'),
});

export const userReportSchema = object({
  reason: string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters long'),
});

export const communityReportSchema = object({
  reason: string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters long'),
});

export const productReportSchema = object({
  reason: string()
    .required('Reason is required')
    .min(10, 'Reason must be at least 10 characters long'),
});
