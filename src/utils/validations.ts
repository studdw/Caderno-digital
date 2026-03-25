// Validation utilities for forms

export interface ValidationResult {
  isValid: boolean;
  message?: string;
}

export function validateEmail(email: string): ValidationResult {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!email) {
    return { isValid: false, message: 'Email é obrigatório' };
  }
  if (!emailRegex.test(email)) {
    return { isValid: false, message: 'Email inválido' };
  }
  return { isValid: true };
}

export function validatePassword(password: string): ValidationResult {
  if (!password) {
    return { isValid: false, message: 'Senha é obrigatória' };
  }
  if (password.length < 8) {
    return { isValid: false, message: 'Senha deve ter pelo menos 8 caracteres' };
  }
  // Check for at least one uppercase, one lowercase, one number
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);

  if (!hasUpperCase || !hasLowerCase || !hasNumbers) {
    return { isValid: false, message: 'Senha deve conter maiúscula, minúscula e número' };
  }
  return { isValid: true };
}

export function validateUsername(username: string): ValidationResult {
  if (!username) {
    return { isValid: false, message: 'Nome de usuário é obrigatório' };
  }
  if (username.length < 3 || username.length > 20) {
    return { isValid: false, message: 'Nome de usuário deve ter entre 3 e 20 caracteres' };
  }
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return { isValid: false, message: 'Nome de usuário deve conter apenas letras, números e _' };
  }
  return { isValid: true };
}

export function getPasswordStrength(password: string): {
  score: number;
  label: string;
  color: string;
} {
  let score = 0;
  if (password.length >= 8) score++;
  if (/[A-Z]/.test(password)) score++;
  if (/[a-z]/.test(password)) score++;
  if (/\d/.test(password)) score++;
  if (/[^A-Za-z0-9]/.test(password)) score++;

  if (score <= 2) return { score, label: 'Fraca', color: 'text-red-500' };
  if (score <= 3) return { score, label: 'Média', color: 'text-yellow-500' };
  return { score, label: 'Forte', color: 'text-green-500' };
}