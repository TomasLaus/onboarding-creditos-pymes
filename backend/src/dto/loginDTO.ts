/**
 * DTO para login de usuario
 * Requiere email y password, opcionalmente twoFactorCode si 2FA está activado
 */
export interface LoginDTO {
  email: string;
  password: string;
  twoFactorCode?: string; // Código TOTP si 2FA está activado
}

/**
 * DTO para respuesta exitosa de login
 */
export interface LoginResponseDTO {
  success: boolean;
  accessToken?: string; // Opcional cuando se requiere 2FA
  user?: {
    id: string;
    email: string;
  };
  requiresTwoFactor?: boolean; // Indica si se necesita código 2FA
  message: string;
}

/**
 * DTO para configuración de 2FA
 */
export interface Setup2FADTO {
  userId: string;
}

/**
 * DTO para respuesta de configuración 2FA
 */
export interface Setup2FAResponseDTO {
  success: boolean;
  secret: string;
  otpauthUrl: string;
  message: string;
}

/**
 * DTO para verificación y activación de 2FA
 */
export interface Verify2FADTO {
  userId: string;
  verificationCode: string;
}

/**
 * DTO para respuesta de verificación 2FA
 */
export interface Verify2FAResponseDTO {
  success: boolean;
  message: string;
}

/**
 * DTO para respuesta de error
 */
export interface ErrorResponseDTO {
  success: false;
  message: string;
  error?: any;
}

/**
 * DTO para respuesta exitosa de creación de usuario
 */
export interface CreateUserResponseDTO {
  success: boolean;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
  };
  company?: {
    id: string;
    legalName: string;
    taxId: string;
  };
  message: string;
}
