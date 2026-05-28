# TaskManager - Frontend

Interfaz de usuario para el sistema de gestión de tareas TaskManager.
Desarrollada como prueba técnica para la Auxiliar 2 UND Desarrollo - CUC.

Repositorio del backend: https://github.com/HmerMza7/BackTaskManager

---

## Tecnologías utilizadas

| Tecnología                | Justificación                                                                                                                                                       |
| ------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **React 19 + Vite**       | SPA liviana que consume una API REST. Vite ofrece arranque instantáneo y build optimizado sin configuración compleja. Next.js hubiera sido overkill para este caso. |
| **TypeScript**            | Tipado estático que reduce errores en tiempo de desarrollo y hace el código más mantenible.                                                                         |
| **React Router v7**       | Navegación entre páginas con soporte para rutas protegidas y layouts anidados.                                                                                      |
| **Axios**                 | Cliente HTTP con soporte de interceptores, lo que permite agregar el token JWT automáticamente en cada request sin repetir lógica.                                  |
| **Tailwind CSS**          | Utilidades CSS directamente en el markup, permite construir interfaces consistentes y responsivas rápidamente.                                                      |
| **React Hook Form + Zod** | Manejo de formularios con validación declarativa basada en schemas. Zod permite definir las reglas una sola vez y reutilizarlas como tipos TypeScript.              |
| **Sonner**                | Librería de notificaciones toast minimalista y moderna, integrada sin configuración adicional.                                                                      |

---

## Requisitos previos

- Node.js 18+
- pnpm
- Backend corriendo en `http://127.0.0.1:8000`

---

## Cómo correr el proyecto localmente

### 1. Clonar el repositorio

```bash
git clone https://github.com/HmerMza7/FrontTaskManager
cd FrontTaskManager
```

### 2. Instalar dependencias

```bash
pnpm install
```

### 3. Configurar variables de entorno

El archivo `.env` debe contener:

```env
VITE_API_URL=http://127.0.0.1:8000  o la direccion de donde corre el backend
```

### 4. Correr el servidor de desarrollo

```bash
pnpm dev
```

La aplicación quedará disponible en `http://localhost:5173`.

---

## Estructura del proyecto

```
src/
├── api/
│   ├── axios.ts              # Instancia base de Axios con interceptor de token
│   ├── auth.ts               # Servicios de login y registro
│   └── tasks.ts              # Servicios CRUD de tareas, prioridades y estados
├── components/
│   ├── layouts/
│   │   └── AuthLayout.tsx    # Layout compartido para login y registro
│   ├── Navbar.tsx            # Barra de navegación con menú hamburguesa en móvil
│   ├── PrivateRoute.tsx      # Protección de rutas autenticadas
│   ├── TaskCard.tsx          # Tarjeta de tarea con acciones
│   ├── TaskForm.tsx          # Modal de creación y edición de tarea
│   ├── TaskFilters.tsx       # Filtros por estado y prioridad
│   └── Pagination.tsx        # Paginación de resultados
├── context/
│   └── AuthContext.tsx       # Estado global de autenticación
├── hooks/
│   ├── useAuth.ts            # Lógica de login y registro
│   └── useTasks.ts           # Lógica de tareas, filtros y paginación
├── pages/
│   ├── Login.tsx
│   ├── Register.tsx
│   └── Dashboard.tsx
├── router/
│   └── index.tsx             # Definición de rutas
├── types/
│   └── index.ts              # Interfaces TypeScript globales
└── validations/
    ├── auth.schema.ts        # Schemas Zod para login y registro
    └── task.schema.ts        # Schema Zod para tareas
```

---

## Decisiones técnicas

- **Arquitectura por tipo de archivo**: separación en pages, components, hooks, api y validations. Apropiada para el tamaño del proyecto sin la complejidad de una arquitectura feature-based.
- **Hooks personalizados**: toda la lógica de negocio vive en `useAuthForm` y `useTasks`, manteniendo las páginas y componentes enfocados solo en la presentación.
- **Filtros y paginación server-side**: los filtros se envían como query params al backend, garantizando que siempre operen sobre el total de datos y no sobre una página parcial.
- **Interceptor de Axios**: el token JWT se agrega automáticamente en cada request desde un solo lugar, evitando repetición en cada llamada a la API.
- **Schemas Zod exportados como tipos**: con `z.infer<typeof schema>` se evita duplicar interfaces TypeScript para los formularios.
- **Redirect en AuthLayout**: si el usuario ya tiene sesión activa y navega a `/` o `/register`, es redirigido automáticamente al dashboard.
