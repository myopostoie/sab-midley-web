'use server';

export async function verifyPasswordAction(password: string): Promise<boolean> {
  return password.trim() === process.env.UNIVERSAL_PARTNER_PASSWORD;
}