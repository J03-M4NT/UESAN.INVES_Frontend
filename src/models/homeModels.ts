// Modelo de Usuario
export interface Usuario {
  id: number
  nombre: string
  apellido: string
  fotoUrl: string
}

// Modelo de Publicación
export interface Publicacion {
  id: number
  usuario: Usuario
  titulo: string
  contenido: string
  fecha: string
  comentarios: Comentario[]
}

// Modelo de Comentario
export interface Comentario {
  id: number
  usuario: Usuario
  contenido: string
  fecha: string
}

// Modelo de Novedad
export interface Novedad {
  id: number
  titulo: string
  descripcion: string
  imagenUrl: string
}
