import { Trabajador } from '../models/trabajador/Trabajador';

export const generatePassword = async (userData: Trabajador) => {
  const secret = 'some-unique-secret-value';
  const data = userData.nombres + userData.apellidos + userData.email;

  const encoder = new TextEncoder();
  const dataEncoded = encoder.encode(data + secret);

  const hashBuffer = await window.crypto.subtle.digest('SHA-256', dataEncoded);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('');

  return hashHex.substring(0, 10); // Use the first 10 characters as the password
};