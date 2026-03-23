## Movie Finder

Movie Finder es una aplicación móvil desarrollada con React Native que permite a los usuarios buscar películas, ver detalles, calificar, dejar reseñas, gestionar su lista de seguimiento (watchlist) y reportar la disponibilidad de películas en diferentes proveedores de streaming.

### Características principales

- **Búsqueda de películas:** Encuentra películas por nombre, género, año, etc.
- **Detalle de película:** Visualiza información detallada, reparto, calificaciones y reseñas.
- **Reseñas y calificaciones:** Los usuarios pueden dejar reseñas y calificar películas.
- **Watchlist:** Agrega o elimina películas de tu lista personal de seguimiento.
- **Proveedores de streaming:** Consulta y reporta en qué plataformas está disponible cada película.
- **Gestión de usuario:** Registro, inicio de sesión, edición de perfil y selección de idioma.
- **Internacionalización:** Soporte multilenguaje.

### Estructura del proyecto

```plaintext
movie-finder/
│
├── assets/                # Recursos estáticos (imágenes, logos)
├── src/
│   ├── api/               # Configuración de Axios y llamadas a APIs
│   ├── components/        # Componentes reutilizables (botones, inputs, etc.)
│   ├── forms/             # Esquemas de validación de formularios
│   ├── hooks/             # Custom hooks para lógica reutilizable
│   ├── i18n/              # Internacionalización y archivos de idioma
│   ├── routes/            # Navegación y stacks de pantallas
│   ├── screens/           # Pantallas principales de la app
│   ├── services/          # Servicios para interactuar con la API
│   ├── store/             # Configuración de Redux y slices
│   └── utils/             # Utilidades y helpers
├── App.js                 # Entry point de la app
├── app.json               # Configuración de la app
├── package.json           # Dependencias y scripts
└── README.md              # Este archivo
```

### Instalación

1. Clona el repositorio:
  ```bash
  git clone https://github.com/gcostaclases/movie-finder.git
  cd movie-finder
  ```

2. Instala las dependencias:
  ```bash
  npm install
  ```

3. Ejecuta la app en modo desarrollo:
  ```bash
  npx expo start
  ```

### Imágenes

<p float="left">
  <img src="assets/screenshots/Peliculas_Inicio.png" alt="Pantalla de inicio con todas las películas" width="200"/>
  <img src="assets/screenshots/Detalle_Pelicula.png" alt="Pantalla de detalle de una película habiendo agregado una reseña" width="200"/>
</p>
<p float="left">
  <img src="assets/screenshots/Proveedor_Pelicula.png" alt="Pantalla de selección de proveedor de la película" width="200"/>
  <img src="assets/screenshots/Proveedor_Usuario.png" alt="Pantalla de selección de proveedores de un usuario" width="200"/>
</p>
