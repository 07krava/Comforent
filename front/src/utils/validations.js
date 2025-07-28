import { parsePhoneNumberFromString } from 'libphonenumber-js';

export function isValidPhoneNumber(phone) {
  if (!phone) return false;

  try {
    const parsedPhone = parsePhoneNumberFromString(phone);
    return parsedPhone?.isValid() || false;
  } catch (e) {
    return false;
  }
}

export function validateFirstName(name) {
  if (!name) return "First name is required";
  const regex = /^[A-ZА-Я][a-zа-я]+(-[A-ZА-Я]?[a-zа-я]+)*$/;
  if (!regex.test(name)) {
    return "First name must start with a capital letter and contain only letters or hyphens (not at the start or end)";
  }
  return "";
}

export function validateLastName(name) {
  if (!name) return "Last name is required";
  const regex = /^[A-ZА-Я][a-zа-я]+(-[A-ZА-Я]?[a-zа-я]+)*$/;
  if (!regex.test(name)) {
    return "Last name must start with a capital letter and contain only letters or hyphens (not at the start or end)";
  }
  return "";
}

export function validateEmail(email) {
  if (!email) return "Email is required";
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    return "Must be a valid e-mail address";
  }
  return "";
}

export function validatePassword(password) {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters long";
  return "";
}

