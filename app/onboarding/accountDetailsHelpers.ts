// contains validation with yup, and handling submissions

import { checkUsernameUnique } from '@/services/route/create-account';
import * as Yup from 'yup';

export const accountSchema = Yup.object().shape({
  firstName: Yup.string().required('First name is required'),
  lastName: Yup.string().required('Last name is required'),
  username: Yup.string()
    .required('Username is required')
    .min(3, 'Username must be at least 3 characters')
    .test(
      'username-unique',
      'Username already taken',
      async function validateValue(value) {
        try {
          return await checkUsernameUnique(value);
        } catch (error) {
          console.error(error);
          return false;
        }
      }
    ),
  displayName: Yup.string().required('Display name is required'),
});

export const submitForm = async (values: {
  firstName: string;
  lastName: string;
  username: string;
  displayName: string;
}) => {};
