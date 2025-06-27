<template>
  <q-layout view="lHh Lpr lFf">
    <!-- Barra superior -->
    <q-header elevated class="bg-white text-primary">
      <q-toolbar>
        <q-img src="/icons/favicon-128x128.png" style="width: 40px; height: 40px" />
        <q-toolbar-title class="q-ml-md">PRONABEC</q-toolbar-title>
        <q-input
          dense
          standout
          v-model="search"
          placeholder="Búsqueda por título de publicación"
          class="q-ml-md"
        />
        <q-btn flat round icon="mail" class="q-ml-md" />
        <q-btn flat round icon="notifications" class="q-ml-md" />
        <q-avatar class="q-ml-md">
          <img :src="usuario.fotoUrl" />
        </q-avatar>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <div class="row q-col-gutter-xl q-mt-lg">
        <!-- Columna Izquierda: Perfil y accesos -->
        <div class="col-2">
          <q-card class="q-mb-md">
            <q-card-section class="text-center">
              <q-avatar size="80px">
                <img :src="usuario.fotoUrl" />
              </q-avatar>
              <div class="text-h6 q-mt-sm">{{ usuario.nombre }} {{ usuario.apellido }}</div>
              <q-btn color="orange" class="q-mt-sm" label="Mi perfil" flat />
            </q-card-section>
          </q-card>
          <q-list bordered separator>
            <q-item v-for="acceso in accesos" :key="acceso.label" clickable>
              <q-item-section avatar>
                <q-icon :name="acceso.icon" />
              </q-item-section>
              <q-item-section>{{ acceso.label }}</q-item-section>
            </q-item>
          </q-list>
        </div>

        <!-- Columna Central: Publicaciones -->
        <div class="col-7">
          <q-card class="q-mb-md">
            <q-card-section>
              <div class="text-subtitle1">Crea tu publicación</div>
              <q-input
                v-model="nuevaPublicacion.titulo"
                label="Título de la publicación"
                class="q-mb-sm"
              />
              <q-input
                v-model="nuevaPublicacion.contenido"
                label="¿Qué quieres compartir?"
                type="textarea"
              />
              <q-btn color="primary" class="q-mt-sm" label="Publicar" @click="publicar" />
            </q-card-section>
          </q-card>
          <q-card v-for="pub in publicaciones" :key="pub.id" class="q-mb-md">
            <q-card-section>
              <div class="row items-center">
                <q-avatar size="40px">
                  <img :src="pub.usuario.fotoUrl" />
                </q-avatar>
                <div class="q-ml-sm">
                  <div class="text-weight-bold">
                    {{ pub.usuario.nombre }} {{ pub.usuario.apellido }}
                  </div>
                  <div class="text-caption text-grey">{{ pub.fecha }}</div>
                </div>
              </div>
              <div class="text-h6 q-mt-sm">{{ pub.titulo }}</div>
              <div>{{ pub.contenido }}</div>
            </q-card-section>
            <q-separator />
            <q-card-section>
              <div v-for="coment in pub.comentarios" :key="coment.id" class="q-mb-xs">
                <span class="text-weight-bold">{{ coment.usuario.nombre }}:</span>
                {{ coment.contenido }}
              </div>
              <q-input
                dense
                v-model="nuevoComentario[pub.id]"
                placeholder="Escribe tu comentario..."
                @keyup.enter="comentar(pub.id)"
              />
            </q-card-section>
          </q-card>
        </div>

        <!-- Columna Derecha: Novedades -->
        <div class="col-3">
          <q-card>
            <q-card-section class="bg-orange-2 text-dark text-center">
              <div class="text-h6">Novedades</div>
            </q-card-section>
            <q-separator />
            <q-card-section v-for="n in novedades" :key="n.id">
              <q-img :src="n.imagenUrl" style="height: 120px" />
              <div class="text-subtitle2 q-mt-sm">{{ n.titulo }}</div>
              <div class="text-caption">{{ n.descripcion }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Declarar usuario como objeto plano, sin anotación de tipo explícita
const usuario = {
  id: 1,
  nombre: 'MIJHAIL JAFETT',
  apellido: 'MEDINA TELLO',
  fotoUrl: 'https://ui-avatars.com/api/?name=Mijhail+Medina',
}

const accesos = [
  { label: 'Mis subvenciones', icon: 'account_balance_wallet' },
  { label: 'Mensaje a tu asesor de bienestar', icon: 'mail' },
  { label: 'Datos de mis asesores', icon: 'people' },
  { label: 'Consulta clave de firma electrónica', icon: 'vpn_key' },
  { label: 'Recuperar clave de correo', icon: 'lock_reset' },
  { label: 'Compromiso de Servicio al Perú', icon: 'assignment' },
  { label: 'Norma que regula las disposiciones para el beneficiario', icon: 'gavel' },
  { label: 'Mesa de Partes Digital', icon: 'table_chart' },
]

const publicaciones = ref([
  {
    id: 1,
    usuario: {
      id: 2,
      nombre: 'DEXTRE SAYAN',
      apellido: 'BRAD COLIN',
      fotoUrl: 'https://ui-avatars.com/api/?name=Dextre+Sayan',
    },
    titulo: 'cambio de sede',
    contenido:
      '¿Hasta qué ciclo puedo hacer un cambio de sede y qué proceso debo seguir como becado :(',
    fecha: '24/JUN/2025 12:35AM',
    comentarios: [
      {
        id: 1,
        usuario: { ...usuario },
        contenido: '¡Hola! Puedes consultar con tu asesor.',
        fecha: '24/JUN/2025 12:40AM',
      },
    ],
  },
  {
    id: 2,
    usuario: {
      id: 3,
      nombre: 'CAMPOS SULLON',
      apellido: 'EMILY YESLIN',
      fotoUrl: 'https://ui-avatars.com/api/?name=Emily+Campos',
    },
    titulo: 'FIRMA DE COMPROMISO DE MATRICULA',
    contenido: '¿Alguien sabe cuándo es la fecha límite para la firma?',
    fecha: '24/JUN/2025 12:50AM',
    comentarios: [],
  },
])

const novedades = ref([
  {
    id: 1,
    titulo: '¡Te estamos BUSCANDO!',
    descripcion:
      'Si te gustaría ser becario de primer o sexto ciclo y quieres apoyar a otros estudiantes, postula.',
    imagenUrl: '/public/icons/favicon-128x128.png',
  },
])

const search = ref('')
const nuevaPublicacion = reactive({ titulo: '', contenido: '' })
const nuevoComentario = reactive({})

function publicar() {
  if (!nuevaPublicacion.titulo || !nuevaPublicacion.contenido) return
  publicaciones.value.unshift({
    id: Date.now(),
    usuario,
    titulo: nuevaPublicacion.titulo,
    contenido: nuevaPublicacion.contenido,
    fecha: new Date().toLocaleString(),
    comentarios: [],
  })
  nuevaPublicacion.titulo = ''
  nuevaPublicacion.contenido = ''
}

function comentar(pubId) {
  const pub = publicaciones.value.find((p) => p.id === pubId)
  if (pub && nuevoComentario[pubId]) {
    pub.comentarios.push({
      id: Date.now(),
      usuario,
      contenido: nuevoComentario[pubId],
      fecha: new Date().toLocaleString(),
    })
    nuevoComentario[pubId] = ''
  }
}

// Protección de ruta: si no hay token, redirige a login
if (!localStorage.getItem('token')) {
  router.push('/login')
}
</script>

<style scoped>
.q-layout {
  background: #f5f6fa;
}
</style>
