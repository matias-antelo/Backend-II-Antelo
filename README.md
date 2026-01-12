<img src="src/fotos/CODER_CURSO.png" alt="Texto alternativo" width="300"/>

---

<h1>🧩 Proyecto Backend II - Entrega 1</h1>

Este proyecto implementa un servidor Node.js con Express que gestiona productos y carritos de compra, utilizando MongoDB para asegurar la persistencia de la información y la implementación de handlebars para la interfaz con el usuario. Se utilizó la estrategia de passport, JWT y bcrypt para asegurar la encriptación de la contraseña y generación de token en el inicio de sesión.

<h2>⚙️ Estructura del proyecto</h2>

```
📦 Backend-I-Antelo
├── 📁 src/
│    ├── 📁 config/
│    │   └── 📄 passport.config.js
│    │
│    ├── 📁 foto/    
│    │   ├── 🖼️ CODER_CURSO.png
│    │   ├── 🖼️ LOGO.png
│    │   └── 🖼️ producto.png
│    │
│    ├── 📁 middlewares/
│    │   ├── 📄 auth.js
│    │   └── 📄 auth.middleware.js
│    │
│    ├── 📁 model/  
│    │   ├── 📄 carts.model.js
│    │   ├── 📄 products.model.js
│    │   └── 📄 users.model.js
│    │
│    ├── 📁 public/
│    │   ├── 📄 cart.js
│    │   ├── 📄 login.js
│    │   ├── 📄 logout.js
│    │   └── 📄 register.js
│    │
│    ├── 📁 routes/
│    │   ├── 📄 carts.routes.js
│    │   ├── 📄 sessions.routes.js
│    │   ├── 📄 users.routes.js
│    │   └── 📄 views.router.js
│    │
│    ├── 📁 views/
│    │   ├── 📁 layouts/
│    │   │   ├── 📄 main.handlebars
│    │   │   └── 📄 style.css
│    │   ├── 📄 carts.handlebars
│    │   ├── 📄 home.handlebars
│    │   ├── 📄 registration.handlebars
│    │   └── 📄 login.handlebars
│    │
│    ├── 📄 app.js  
│    └── 📄 utils.js
│
├── 📄 .gitignore
├── 📄 package-lock.json
├── 📄 package.json
└── 📄 README.md
```

<h2>📄 Documentación de Métodos</h2>

<h3>🌍 APP</h3>

<h4>app.js</h4>
<p>
- <strong>//Conexion con mongoose</strong>: se creo la conexcion a la base de datos de mongoDB.<br>
- <strong>//Conexion con handlebars</strong>: se encuentran lo necesario para poder utilizar handlebars y la hoja de estilo CSS.<br>
- <strong>//Rutas</strong>: rutas generadas para productos y carritos.<br>
- <strong>//Coockie parser</strong>: middleware para parsear cookies.<br>
- <strong>//InitializePassport</strong>: inicializar passport.
</p>

<h3>🛠️ UTILS</h3>

<h4>utils.js</h4>
<p>
<strong>Funciones de utilidad para el manejo de contraseñas.</strong><br>
<strong>createHash</strong>: Crea un hash seguro de la contraseña usando bcrypt con salt generado automáticamente.<br>
<strong>isValidPassword</strong>: Verifica si una contraseña coincide con el hash almacenado en el usuario usando bcrypt.
</p>

<h3>⚙️ CONFIG</h3>

<h4>passport.config.js</h4>
<p>
<strong>initializePassport</strong>: Función principal que configura las estrategias de autenticación de Passport.js para el manejo de registro, login y autenticación JWT.<br>
<strong>Estrategia 'register'</strong>: Utiliza LocalStrategy para registrar nuevos usuarios. Verifica si el email ya existe, crea un carrito vacío, hashea la contraseña y guarda el usuario en la base de datos con rol 'user'.<br>
<strong>Estrategia 'login'</strong>: Utiliza LocalStrategy para autenticar usuarios existentes. Busca el usuario por email y valida la contraseña hasheada.<br>
<strong>Estrategia 'jwt'</strong>: Utiliza JwtStrategy para autenticar usuarios mediante tokens JWT extraídos de las cookies. Verifica el token y busca el usuario correspondiente en la base de datos.
</p>

<h3>📄MIDDLEWARES</h3>

<h4>auth.js</h4>
<p>
<strong>generateToken</strong>: Función que genera un token JWT con el ID, email y rol del usuario, expirando en 1 hora.<br>
<strong>jwtSecret</strong>: Exporta la clave secreta utilizada para firmar y verificar tokens JWT.
</p>

<h4>auth.middleware.js</h4>
<p>
<strong>authJWT</strong>: Middleware que autentica solicitudes usando Passport con estrategia JWT. Si la autenticación falla, redirige a la página de login; si pasa, asigna el usuario autenticado a req.user.<br>
<strong>redirectAuth</strong>: Middleware que verifica la presencia de un token JWT en las cookies. Si el token es válido, redirige a la página de sesiones; si no, permite continuar con la solicitud.
</p>

<h3>📄MODEL</h3>
<h4>carts.model.js</h4>
<p>se crea la coleccion y schema que se va a almacenar en mongoDB </p>    
<h4>products.model.js</h4>
<p>se crea la coleccion y schema que se va a almacenar en mongoDB</p>
<h4>users.model.js</h4>
<p>se crea la coleccion y schema que se va a almacenar en mongoDB de usuarios registrados</p>



<h3>🖥️ PUBLIC </h3>

<h4>cart.js</h4>
<p>
<strong>Maneja la adición de productos al carrito desde la interfaz del cliente.</strong><br>
- <strong>btn-agregar</strong>: Para cada botón con clase 'btn-agregar', agrega un event listener que hace una petición POST a /api/carts/products/{productId} con credenciales incluidas (para JWT), y muestra un mensaje de éxito o error usando Swal.fire.
</p>

<h4>login.js</h4>
<p>
<strong>Maneja el proceso de login del usuario desde el formulario de la página.</strong><br>
- <strong>submit del formulario</strong>: Previene el envío por defecto, recolecta email y password, hace una petición POST a /api/sessions/login, y si es exitoso redirige a /api/sessions/; si falla, muestra un error con Swal.fire.<br>
- <strong>btn-register</strong>: Redirige a la página de registro al hacer clic.
</p>

<h4>logout.js</h4>
<p>
<strong>Maneja el cierre de sesión del usuario.</strong><br>
- <strong>logoutBtn</strong>: Al hacer clic, confirma la acción con un diálogo de Swal.fire, luego hace una petición POST a /api/sessions/logout, muestra un mensaje de éxito y redirige a la página de login.
</p>

<h4>register.js</h4>
<p>
<strong>Maneja el registro de nuevos usuarios desde el formulario de la página.</strong><br>
- <strong>submit del formulario</strong>: Previene el envío por defecto, recolecta los datos del usuario (first_name, last_name, email, age, password), hace una petición POST a /api/users/register, y si es exitoso muestra un mensaje y redirige a la página de login; si falla, muestra un error con Swal.fire.
</p>

<h3>🔄 ROUTES</h3>

<h4>carts.routes.js</h4>
<p>
<strong>Maneja la adición de productos al carrito del usuario autenticado.</strong><br>
<strong>POST /carts/products/:pid</strong>: Autentica con JWT, busca el carrito del usuario, verifica si el producto ya está en el carrito; incrementa la cantidad en 1; si no, lo agrega con cantidad 1. Guarda el carrito y responde con éxito o error.
</p>

<h4>sessions.routes.js</h4>
<p>
<strong>Maneja las rutas relacionadas con la autenticación y sesiones de usuarios.</strong><br>
<strong>POST /login</strong>: Autentica al usuario usando Passport con estrategia 'login', genera un token JWT, lo establece en una cookie y responde con éxito.<br>
<strong>GET /login-fail</strong>: Responde con error 401 en caso de fallo en el login.<br>
<strong>POST /logout</strong>: Limpia la cookie del JWT y responde con éxito.<br>
<strong>GET /current</strong>: Autentica con JWT y devuelve la información del usuario actual (first_name, last_name, email, role).
</p>

<h4>users.routes.js</h4>
<p>
<strong>Gestiona las rutas relacionadas con el registro de usuarios.</strong><br>
<strong>POST /register</strong>: Autentica el registro usando Passport con estrategia 'register', responde con éxito si el usuario se registra correctamente o error si ya existe.
</p>

<h4>views.router.js</h4>
<p>
<strong>Maneja las rutas para renderizar vistas con Handlebars.</strong><br>
<strong>GET /login</strong>: Usa middleware redirectAuth, renderiza la vista de login.<br>
<strong>GET /registration</strong>: Usa middleware redirectAuth, renderiza la vista de registro.<br>
<strong>GET /</strong>: Usa middleware authJWT, obtiene productos con paginación, filtros y ordenamiento, renderiza la vista home.<br>
<strong>GET /carts</strong>: Usa middleware authJWT, obtiene el carrito del usuario con populate, renderiza la vista carts.
</p>

<h3>👁️ VIEWS </h3>

<h4>layouts/main.handlebars</h4>
<p>
<strong>Layout principal que envuelve todas las páginas de la aplicación.</strong><br>
Define la estructura HTML base (DOCTYPE, meta tags, title dinámico). En el head carga el CSS desde `/styles/style.css` y la librería SweetAlert2 desde CDN. Incluye un header con el título "CARRITO DE COMPRAS PARA PRODUCTOS" y una barra de navegación con enlaces a "Productos" (`/`) y "Carrito" (`/carts`). El placeholder `{{{body}}}` se reemplaza con el contenido específico de cada página (home.handlebars, carts.handlebars, login.handlebars, registration.handlebars, etc.). Finaliza con un footer con información legal y derechos de autor.
</p>

<h4>layouts/style.css</h4>
<p>
<strong>Hoja de estilos CSS que define la apariencia visual de la aplicación.</strong><br>
Incluye estilos para el header (fondo, flexbox para layout), barra de navegación (color de fondo, enlaces centrados), formularios, botones y otros elementos de la interfaz para mantener un diseño consistente y responsivo.
</p>

<h4>home.handlebars</h4>
<p>
<strong>Página principal que muestra el listado de productos con filtrado y paginación.</strong><br>
Incluye un formulario con tres filtros: <strong>query</strong> (buscar por categoría), <strong>sort</strong> (ordenar por precio asc/desc) y <strong>limit</strong> (cantidad de productos por página: 5, 10 o 20). Itera sobre el array `products` renderizando cada producto en una tarjeta con título, precio, disponibilidad y un botón "Mostrar producto" (clase `btn-agregar`) que redirige a `GET /api/products/:id` para ver detalles. Incluye paginación dinámicamente generada con enlaces que preservan los filtros actuales.
</p>

<h4>carts.handlebars</h4>
<p>
<strong>Página de gestión del carrito de compras con selector de carritos y lista de productos.</strong><br>
Contiene un formulario selector de carritos que itera sobre el array `carts` y permite elegir cuál carrito visualizar mediante un dropdown. Incluye un panel para agregar productos directamente: selecciona un producto del dropdown (iterando `productsList`), especifica la cantidad y hace submit con el botón `btn-agregar-producto`. Renderiza cada producto en el carrito en una tarjeta mostrando: título, precio, categoría, descripción, cantidad actual e input para modificarla. Cada producto tiene dos botones: `btn-update` para actualizar la cantidad y `btn-delete` para eliminar del carrito. Al final incluye un botón `btn-delete-all` para vaciar completamente el carrito.
</p>

<h4>login.handlebars</h4>
<p>
<strong>Página de inicio de sesión para usuarios.</strong><br>
Muestra un logo, un formulario con campos para email y contraseña, botones para "Iniciar Sesión" y "Registrarse". Carga el script `Login.js` para manejar el envío del formulario y la autenticación.
</p>

<h4>registration.handlebars</h4>
<p>
<strong>Página de registro de nuevos usuarios.</strong><br>
Contiene un formulario con campos para nombre, apellido, email, edad y contraseña, y un botón para "Registrarse". Carga el script `register.js` para procesar el registro.
</p><br>

---


📚 Autor

Matías Antelo

Proyecto desarrollado para la entrega de Backend II (Coderhouse).