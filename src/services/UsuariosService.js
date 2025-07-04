import axios from 'axios'

const API_URL = 'http://localhost:5275/api/usuarios' // Cambia la URL según tu backend

export async function obtenerUsuariosPorRol(rol = '') {
  const params = rol ? { rol } : {}
  const response = await axios.get(API_URL, { params })
  return response.data
}

export async function obtenerRoles() {
  const response = await axios.get(API_URL + '/roles')
  return response.data
}
