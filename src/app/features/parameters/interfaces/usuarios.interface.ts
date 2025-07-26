export interface usuarios {
  id: number;                  // Obligatorio - ID del usuario
  nombre: string;              // Obligatorio - Nombre del usuario
  email: string;               // Obligatorio - Correo electrónico
  role_id: number;
  identificacion: string;
  is_active: boolean;            // Obligatorio - ID del rol
  telefono: string; 
  contraseña: string;
  
}