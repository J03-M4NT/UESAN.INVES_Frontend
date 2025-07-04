import axios from 'axios'

const API_URL = 'http://localhost:5275/api/usuarios' // Cambia la URL según tu backend
const API_ROLES_URL = 'http://localhost:5275/api/Roles' // Nombre de tabla Roles, mayúscula inicial

export async function obtenerUsuariosPorRol(rol = '') {
  const params = rol ? { rol } : {}
  const response = await axios.get(API_URL, { params })
  return response.data
}

export async function obtenerRoles() {
  try {
    const response = await axios.get(API_ROLES_URL)
    return response.data
  } catch (error) {
    console.error('Error al obtener roles:', error)
    return []
  }
}
