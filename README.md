<img src="src/fotos/CODER_CURSO.png" alt="Texto alternativo" width="300"/>

---

<h1>🧩 Proyecto Backend II - Entrega final </h1>

Este proyecto implementa un servidor Node.js con Express que gestiona productos y carritos de compra, utilizando MongoDB para asegurar la persistencia de la información y la implementación de handlebars para la interfaz con el usuario. Se utilizó la estrategia de passport, JWT y bcrypt para asegurar la encriptación de la contraseña y generación de token en el inicio de sesión. Por otro lado se utilizo la arquitectura MVC y nodemailler para restablecer la contraseña en caso de perdida.

<h2>⚙️ Estructura del proyecto</h2>

```
📦 Backend-I-Antelo
├── 📁 src/
│    ├── 📁 config/
│    │   ├── 📄 mailer.config.js
│    │   └── 📄 passport.config.js
│    │
│    ├── 📁 controllers/    
│    │   ├── 📄 carts.controller.js
│    │   ├── 📄 products.controller.js
│    │   ├── 📄 recoverPassword.controller.js
│    │   ├── 📄 sessions.controller.js
│    │   ├── 📄 tickets.controller.js
│    │   └── 📄 users.config.js
│    │
│    ├── 📁 dao/    
│    │   ├── 📁 mongo
│    │   │   ├── 📄 sessions.controller.js
│    │   │   ├── 📄 tickets.controller.js
│    │   │   └── 📄 users.config.js
│    │   └── 📄 index.js
│    │
│    ├── 📁 dto/    
│    │   ├── 📄 user.dto.js
│    │
│    ├── 📁 foto/    
│    │   ├── 🖼️ CODER_CURSO.png
│    │   ├── 🖼️ LOGO.png
│    │   └── 🖼️ producto.png
│    │
│    ├── 📁 middlewares/
│    │   ├── 📄 auth.js
│    │   ├── 📄 auth.middleware.js
│    │   ├── 📄 authorization.js
│    │   └── 📄 passport.error.middleware.js
│    │
│    ├── 📁 model/  
│    │   ├── 📄 carts.model.js
│    │   ├── 📄 products.model.js
│    │   ├── 📄 ticket.model.js
│    │   └── 📄 users.model.js
│    │
│    ├── 📁 public/
│    │   ├── 📄 cart.js
│    │   ├── 📄 login.js
│    │   ├── 📄 logout.js
│    │   ├── 📄 recoverPassword.js
│    │   ├── 📄 register.js
│    │   ├── 📄 resetPassword.js
│    │   └── 📄 ticket.js
│    │
│    ├── 📁 repositories/
│    │   ├── 📄 carts.repository.js
│    │   ├── 📄 products.repository.js
│    │   ├── 📄 tickets.repository.js
│    │   └── 📄 users.repository.js
│    │
│    ├── 📁 routes/
│    │   ├── 📄 carts.routes.js
│    │   ├── 📄 products.routes.js
│    │   ├── 📄 recoverPassword.routes.js
│    │   ├── 📄 sessions.routes.js
│    │   ├── 📄 users.routes.js
│    │   └── 📄 views.router.js
│    │
│    ├── 📁 services/
│    │   ├── 📄 carts.service.js
│    │   ├── 📄 products.service.js
│    │   ├── 📄 recoverPassword.service.js
│    │   ├── 📄 ticket.service.js
│    │   └── 📄 users.service.js
│    │
│    ├── 📁 utils/
│    │   └── 📄 pagination.helper.js
│    │
│    ├── 📁 views/
│    │   ├── 📁 layouts/
│    │   │   ├── 📄 main.handlebars
│    │   │   └── 📄 style.css
│    │   ├── 📄 carts.handlebars
│    │   ├── 📄 home.handlebars
│    │   ├── 📄 login.handlebars
│    │   ├── 📄 recoverPassword.handlebars
│    │   ├── 📄 registration.handlebars
│    │   ├── 📄 resetPassword.handlebars
│    │   ├── 📄 ticketDetalle.handlebars
│    │   └── 📄 tickets.handlebars
│    │
│    ├── 📄 app.js  
│    └── 📄 utils.js
│
├── 📄 .env
├── 📄 .gitignore
├── 📄 package-lock.json
├── 📄 package.json
└── 📄 README.md
```

<h2>📄 Documentación de Métodos</h2>

<h3>⚙️ CONFIG</h3>

<h4>mailer.config.js</h4>
<p>
<strong>Configuración de transporte de correo electrónico con Nodemailer.</strong><br>
<strong>transporter</strong>: Crea y exporta un transportador de Nodemailer configurado para enviar correos a través de Gmail utilizando las credenciales almacenadas en variables de entorno (MAILING_ACCOUNT y MAILING_PASS). Se utiliza para el envío de emails de recuperación de contraseña.
</p>

<h4>passport.config.js</h4>
<p>
<strong>initializePassport</strong>: Función principal que configura las estrategias de autenticación de Passport.js para el manejo de registro, login y autenticación JWT.<br>
<strong>Estrategia 'register'</strong>: Utiliza LocalStrategy para registrar nuevos usuarios. Verifica si el email ya existe, crea un carrito vacío, hashea la contraseña y guarda el usuario en la base de datos con rol 'user'.<br>
<strong>Estrategia 'login'</strong>: Utiliza LocalStrategy para autenticar usuarios existentes. Busca el usuario por email y valida la contraseña hasheada.<br>
<strong>Estrategia 'jwt'</strong>: Utiliza JwtStrategy para autenticar usuarios mediante tokens JWT extraídos de las cookies. Verifica el token y busca el usuario correspondiente en la base de datos.
</p>

<h3>⚙️ CONTROLLERS</h3>

<h4>carts.controller.js</h4>
<p>
<strong>Gestiona las operaciones del carrito de compras.</strong><br>
<strong>getCartById</strong>: Obtiene un carrito por su ID de la base de datos y lo retorna en formato JSON.<br>
<strong>addProductToCart</strong>: Agrega un producto al carrito del usuario autenticado. Si el producto ya existe, incrementa su cantidad en 1; si no, lo agrega con cantidad 1.<br>
<strong>removeProductFromCart</strong>: Elimina un producto específico del carrito del usuario.<br>
<strong>updateProductQuantity</strong>: Actualiza la cantidad de un producto en el carrito del usuario autenticado.
</p>

<h4>products.controller.js</h4>
<p>
<strong>Gestiona operaciones relacionadas con productos.</strong><br>
<strong>getAll</strong>: Obtiene todos los productos con soporte para paginación, filtros de búsqueda y ordenamiento. Retorna los resultados en formato JSON con información de paginación.<br>
<strong>create</strong>: Crea un nuevo producto en la base de datos con los datos proporcionados (título, precio, descripción, stock, categoría, disponibilidad).<br>
<strong>getById</strong>: Obtiene un producto específico por su ID.<br>
<strong>update</strong>: Actualiza los datos de un producto existente.<br>
<strong>delete</strong>: Elimina un producto de la base de datos.
</p>

<h4>sessions.controller.js</h4>
<p>
<strong>Gestiona la autenticación y sesiones de usuarios.</strong><br>
<strong>login</strong>: Genera un token JWT para el usuario autenticado, lo almacena en una cookie httpOnly con expiración de 1 hora y responde con éxito.<br>
<strong>logout</strong>: Limpia la cookie del JWT y termina la sesión del usuario.<br>
<strong>loginFail</strong>: Responde con error 401 cuando la autenticación del login falla.
</p>

<h4>users.controller.js</h4>
<p>
<strong>Gestiona operaciones relacionadas con usuarios.</strong><br>
<strong>register</strong>: Responde con éxito cuando un nuevo usuario se registra correctamente en el sistema (la lógica de validación se realiza en Passport).<br>
<strong>getCurrentUser</strong>: Obtiene la información del usuario autenticado por su ID y la retorna mediante un DTO (Data Transfer Object) con datos sanitizados.
</p>

<h4>tickets.controller.js</h4>
<p>
<strong>Gestiona tickets de compra.</strong><br>
<strong>renderTickets</strong>: Obtiene todos los tickets del usuario autenticado por su email y renderiza la vista de tickets con Handlebars.<br>
<strong>renderTicketDetail</strong>: Obtiene el detalle de un ticket específico por su ID y renderiza la vista de detalles del ticket.
</p>

<h4>recoverPassword.controller.js</h4>
<p>
<strong>Gestiona la recuperación de contraseña.</strong><br>
<strong>showRecoverForm</strong>: Renderiza el formulario para solicitar la recuperación de contraseña.<br>
<strong>requestReset</strong>: Procesa la solicitud de recuperación de contraseña. Verifica que el email exista en la base de datos y envía un correo con un enlace para resetear la contraseña.<br>
<strong>showResetForm</strong>: Renderiza el formulario para ingresar la nueva contraseña, validando que el token sea válido.<br>
<strong>resetPassword</strong>: Actualiza la contraseña del usuario si el token de recuperación es válido y no ha expirado.
</p>

<h3>💾 DAO</h3>

<h4>index.js</h4>
<p>
<strong>Punto de centralización de las instancias DAO.</strong><br>
Importa todas las clases DAO (UsersDAO, ProductsDAO, CartsDAO, TicketsDAO) desde la carpeta mongo y exporta instancias únicas de cada una para ser utilizadas en toda la aplicación.
</p>

<h4>carts.dao.js</h4>
<p>
<strong>Datos de acceso para carritos de compra.</strong><br>
<strong>getById</strong>: Busca un carrito por ID con populate de productos (retorna datos simples sin referencias).<br>
<strong>getByUserCart</strong>: Busca un carrito por ID con populate completo de productos (retorna referencias de MongoDB).<br>
<strong>getByIdWithoutPopulate</strong>: Busca un carrito por ID sin expandir referencias de productos.<br>
<strong>create</strong>: Crea un nuevo carrito en la base de datos.<br>
<strong>update</strong>: Actualiza los datos de un carrito existente.
</p>

<h4>products.dao.js</h4>
<p>
<strong>Datos de acceso para productos.</strong><br>
<strong>getAll</strong>: Obtiene todos los productos con soporte para paginación, filtros y options de búsqueda avanzada.<br>
<strong>create</strong>: Crea un nuevo producto en la base de datos.<br>
<strong>getById</strong>: Obtiene un producto específico por su ID.<br>
<strong>update</strong>: Actualiza los datos de un producto existente.<br>
<strong>decrementStockIfAvailable</strong>: Decrementa el stock de un producto si hay disponibilidad suficiente (garantiza atomicidad).<br>
<strong>delete</strong>: Elimina un producto de la base de datos.
</p>

<h4>users.dao.js</h4>
<p>
<strong>Datos de acceso para usuarios.</strong><br>
<strong>getByEmail</strong>: Busca un usuario por su dirección de email.<br>
<strong>getById</strong>: Obtiene un usuario por ID con populate del carrito asociado.<br>
<strong>create</strong>: Crea un nuevo usuario en la base de datos.<br>
<strong>update</strong>: Actualiza los datos de un usuario existente.<br>
<strong>getByResetToken</strong>: Busca un usuario por token de recuperación de contraseña, verificando que no haya expirado.<br>
<strong>updateResetToken</strong>: Asigna un token de recuperación y su fecha de expiración a un usuario.<br>
<strong>clearResetToken</strong>: Elimina el token de recuperación de contraseña de un usuario.
</p>

<h4>tickets.dao.js</h4>
<p>
<strong>Datos de acceso para tickets de compra.</strong><br>
<strong>create</strong>: Crea un nuevo ticket en la base de datos.<br>
<strong>getById</strong>: Obtiene un ticket específico por ID con populate de productos (retorna datos simples).<br>
<strong>getByPurchaser</strong>: Obtiene todos los tickets de un usuario por su email con populate de productos.
</p>

<h3>📄 REPOSITORIES</h3>

<h4>carts.repository.js</h4>
<p>
<strong>Capa de abstracción para operaciones de carritos.</strong><br>
Encapsula las llamadas a CartsDAO proporcionando métodos para obtener carritos (con opción de populate), crear nuevos carritos y actualizar datos del carrito.
</p>

<h4>products.repository.js</h4>
<p>
<strong>Capa de abstracción para operaciones de productos.</strong><br>
Encapsula las llamadas a ProductsDAO proporcionando métodos para obtener productos (con paginación y filtros), crear, actualizar, eliminar productos y decrementar stock.
</p>

<h4>users.repository.js</h4>
<p>
<strong>Capa de abstracción para operaciones de usuarios.</strong><br>
Encapsula las llamadas a UsersDAO proporcionando métodos para buscar usuarios por email o ID, crear, actualizar usuarios y gestionar tokens de recuperación de contraseña.
</p>

<h4>tickets.repository.js</h4>
<p>
<strong>Capa de abstracción para operaciones de tickets.</strong><br>
Encapsula las llamadas a TicketsDAO proporcionando métodos para crear nuevos tickets, obtener tickets por ID o por email del comprador.
</p>

<h3>📦 DTO</h3>

<h4>user.dto.js</h4>
<p>
<strong>Data Transfer Object para usuarios - sanitiza datos sensibles.</strong><br>
<strong>UserDTO</strong>: Clase que transforma un objeto usuario completo en un objeto con solo los campos públicos y seguros (_id, first_name, last_name, email, role, age). Excluye datos sensibles como contraseña y tokens.<br>
<strong>from</strong>: Método estático que crea una instancia de UserDTO a partir de un objeto usuario de la base de datos.
</p>

<h3>📄MIDDLEWARES</h3>

<h4>auth.js</h4>
<p>
<strong>Gestión de tokens JWT para autenticación.</strong><br>
<strong>generateToken</strong>: Función que genera un token JWT con el ID, email y rol del usuario. El token expira según la duración configurada en JWT_EXPIRES_IN en variables de entorno.<br>
<strong>jwtSecret</strong>: Exporta la clave secreta (JWT_SECRET) utilizada para firmar y verificar los tokens JWT.
</p>

<h4>auth.middleware.js</h4>
<p>
<strong>Middlewares de autenticación y autorización con JWT.</strong><br>
<strong>authJWT</strong>: Middleware que autentica solicitudes usando Passport con estrategia JWT. Si la autenticación falla o no hay usuario, redirige a la página de login; si es exitosa, asigna el usuario autenticado a req.user y permite continuar.<br>
<strong>redirectAuth</strong>: Middleware que verifica la presencia de un token JWT válido en las cookies. Si el token existe y es válido, redirige a /api/sessions; si no existe o es inválido, permite continuar con la solicitud normal.
</p>

<h4>authorization.js</h4>
<p>
<strong>Middlewares de autorización basados en roles de usuario.</strong><br>
<strong>isAdmin</strong>: Middleware que verifica si el usuario está autenticado y tiene rol 'admin'. Retorna error 401 si no está autenticado, error 403 si no es administrador.<br>
<strong>isUser</strong>: Middleware que verifica si el usuario está autenticado y tiene rol 'user'. Retorna error 401 si no está autenticado, error 403 si no es usuario regular.
</p>

<h4>passport.error.middleware.js</h4>
<p>
<strong>Middleware para manejar errores de autenticación de Passport.</strong><br>
<strong>handlePassportError</strong>: Middleware que captura y procesa errores generados por Passport durante la autenticación. Verifica si el error es un usuario duplicado y retorna error 400; para otros errores de autenticación retorna error 401 con el mensaje correspondiente.
</p>

<h3>💾 MODEL</h3>

<h4>carts.model.js</h4>
<p>
<strong>Define el schema de la colección de carritos.</strong> Almacena información de cada carrito con un número único y un array de productos agregados al mismo.
</p>

<h4>products.model.js</h4>
<p>
<strong>Define el schema de la colección de productos.</strong> Contiene los datos generales de cada producto como título, precio, descripción, stock, categoría y disponibilidad. Incluye soporte de paginación.
</p>

<h4>users.model.js</h4>
<p>
<strong>Define el schema de la colección de usuarios registrados.</strong> Almacena información personal del usuario, datos de autenticación, referencia a su carrito y datos para recuperación de contraseña.
</p>

<h4>ticket.model.js</h4>
<p>
<strong>Define el schema de la colección de tickets de compra.</strong> Registra los detalles de cada compra realizada incluyendo código único, fecha, monto total, comprador y los productos adquiridos.
</p>

<h3>🌍 APP</h3>

<h4>app.js</h4>
<p>
<strong>Punto de entrada principal de la aplicación.</strong><br>
Configura la conexión con MongoDB usando Mongoose, establece Handlebars como motor de vistas, registra todas las rutas API y de vistas, inicializa Passport para autenticación, e inicia el servidor en el puerto especificado.
</p>

<h3>🛠️ UTILS</h3>

<h4>utils.js</h4>
<p>
<strong>Funciones de utilidad para el manejo de contraseñas.</strong><br>
<strong>createHash</strong>: Crea un hash seguro de la contraseña usando bcrypt con salt generado automáticamente (salt 10).<br>
<strong>isValidPassword</strong>: Verifica si una contraseña coincide con el hash almacenado en el usuario comparando con bcrypt.
</p>

<h4>pagination.helper.js</h4>
<p>
<strong>Utilidades para generar enlaces de paginación.</strong><br>
<strong>generatePaginationLinks</strong>: Función que genera un array de objetos con información de paginación (número de página, si está activa, y URL con parámetros de filtro). Se utiliza en las vistas para renderizar los botones de navegación entre páginas.
</p>

<h3>🖥️ PUBLIC </h3>

<h4>cart.js</h4>
<p>
<strong>Maneja la adición de productos al carrito desde la interfaz del cliente.</strong><br>
Agrega event listeners a los botones con clase 'btn-agregar', realiza peticiones POST a /api/carts/products/{productId} y muestra mensajes de éxito o error con Swal.fire.
</p>

<h4>Login.js</h4>
<p>
<strong>Maneja el proceso de login del usuario desde el formulario de la página.</strong><br>
Valida los campos de email y password, hace una petición POST a /api/sessions/login y, si es exitoso, redirige al usuario; si falla, muestra un mensaje de error.
</p>

<h4>logout.js</h4>
<p>
<strong>Maneja el cierre de sesión del usuario.</strong><br>
Solicita confirmación al usuario con un diálogo, realiza una petición POST a /api/sessions/logout y redirige a la página de login al completar.
</p>

<h4>register.js</h4>
<p>
<strong>Maneja el registro de nuevos usuarios desde el formulario de la página.</strong><br>
Valida todos los datos (nombre, apellido, email, edad, contraseña), hace una petición POST a /api/users/register y redirige al login si es exitoso.
</p>

<h4>recoverPassword.js</h4>
<p>
<strong>Maneja la solicitud de recuperación de contraseña.</strong><br>
Valida el email ingresado y hace una petición POST a /api/sessions/request-reset para enviar un correo con instrucciones de recuperación.
</p>

<h4>resetPassword.js</h4>
<p>
<strong>Maneja el restablecimiento de contraseña con token válido.</strong><br>
Extrae el token y el ID del usuario de los parámetros URL, valida que las contraseñas coincidan y hace una petición POST a /api/sessions/reset-password para actualizar la contraseña.
</p>

<h4>ticket.js</h4>
<p>
<strong>Maneja la navegación a los detalles de un ticket.</strong><br>
Agrega event listeners a los botones de ver detalles del ticket, obtiene el ID del ticket y redirige a su página de detalles.
</p>

<h3>🔄 ROUTES</h3>

<h4>carts.routes.js</h4>
<p>
<strong>Gestiona las operaciones del carrito de compras.</strong><br>
<strong>GET /:id</strong>: Obtiene un carrito específico por ID con autenticación JWT.<br>
<strong>POST /products/:pid</strong>: Agrega un producto al carrito (requiere ser usuario autenticado).<br>
<strong>DELETE /products/:pid</strong>: Elimina un producto del carrito.<br>
<strong>POST /purchase</strong>: Procesa la compra del carrito (intento de compra full o partial).
</p>

<h4>products.routes.js</h4>
<p>
<strong>Gestiona las operaciones de productos.</strong><br>
<strong>GET /</strong>: Obtiene todos los productos con paginación y filtros (sin autenticación requerida).<br>
<strong>POST /</strong>: Crea un nuevo producto (requiere autenticación JWT y rol admin).<br>
<strong>PUT /:id</strong>: Actualiza un producto (requiere autenticación JWT y rol admin).<br>
<strong>DELETE /:id</strong>: Elimina un producto (requiere autenticación JWT y rol admin).
</p>

<h4>sessions.routes.js</h4>
<p>
<strong>Gestiona la autenticación y sesiones de usuarios.</strong><br>
<strong>POST /login</strong>: Autentica al usuario, genera token JWT y lo almacena en cookie.<br>
<strong>POST /logout</strong>: Limpia la cookie del JWT y termina la sesión.<br>
<strong>GET /current</strong>: Retorna la información del usuario autenticado (requiere JWT).
</p>

<h4>users.routes.js</h4>
<p>
<strong>Gestiona el registro de usuarios.</strong><br>
<strong>POST /register</strong>: Registra un nuevo usuario usando Passport con estrategia 'register'.<br>
<strong>GET /:id</strong>: Obtiene un usuario específico por ID (requiere autenticación JWT).
</p>

<h4>recoverPassword.routes.js</h4>
<p>
<strong>Gestiona la recuperación de contraseña.</strong><br>
<strong>GET /recover-password</strong>: Renderiza el formulario de recuperación de contraseña.<br>
<strong>POST /request-reset</strong>: Procesa la solicitud de recuperación y envía email de reseteo.<br>
<strong>GET /reset-password</strong>: Renderiza el formulario para establecer nueva contraseña con token validado.<br>
<strong>POST /reset-password</strong>: Procesa el restablecimiento de contraseña.
</p>

<h4>views.router.js</h4>
<p>
<strong>Gestiona las rutas para renderizar vistas con Handlebars.</strong><br>
<strong>GET /login</strong>: Renderiza la página de login (redirige si está autenticado).<br>
<strong>GET /registration</strong>: Renderiza la página de registro (redirige si está autenticado).<br>
<strong>GET /</strong>: Renderiza la página principal de productos (requiere autenticación JWT).<br>
<strong>GET /carts</strong>: Renderiza la página del carrito (requiere autenticación JWT).<br>
<strong>GET /tickets</strong>: Renderiza la página de tickets (requiere autenticación JWT).<br>
<strong>GET /ticket/:id</strong>: Renderiza el detalle de un ticket específico (requiere autenticación JWT).
</p>

<h3>⚙️ SERVICES</h3>

<h4>carts.service.js</h4>
<p>
<strong>Lógica de negocio para operaciones de carritos.</strong><br>
Gestiona la obtención, creación y actualización de carritos. Valida stock de productos antes de agregarlos, maneja la compra del carrito (generando tickets) y permite actualizar o eliminar productos del carrito.
</p>

<h4>products.service.js</h4>
<p>
<strong>Lógica de negocio para operaciones de productos.</strong><br>
Procesa consultas de productos con soporte para paginación, filtros por categoría y ordenamiento por precio. Gestiona la creación, actualización y eliminación de productos con validaciones.
</p>

<h4>users.service.js</h4>
<p>
<strong>Lógica de negocio para operaciones de usuarios.</strong><br>
Maneja el registro de nuevos usuarios (crea carrito automáticamente), búsqueda por email o ID, actualización de datos y obtención de información con DTO para sanitizar datos sensibles.
</p>

<h4>tickets.service.js</h4>
<p>
<strong>Lógica de negocio para operaciones de tickets.</strong><br>
Obtiene tickets de un usuario por su email y recupera detalles específicos de un ticket por ID.
</p>

<h4>recoverPassword.service.js</h4>
<p>
<strong>Lógica de negocio para recuperación de contraseña.</strong><br>
Genera tokens de recuperación, valida emails registrados, envía correos electrónicos con enlaces de reset y procesa el restablecimiento de contraseña con validación de token.
</p>

<h3>🔐 VARIABLE DE ENTORNO (.env)</h3>

<h4>PORT</h4>
<p>
<strong>Puerto del servidor.</strong><br>
Define el puerto en el que se levanta la aplicación backend.
</p>
<pre>PORT=3000</pre>

<h4>MONGO_URI</h4>
<p>
<strong>Cadena de conexión a MongoDB.</strong><br>
Permite la conexión a la base de datos MongoDB (MongoDB Atlas en este caso). Incluye credenciales, cluster y nombre de base de datos.
</p>
<pre>MONGO_URI=mongodb+srv://anteloma87:Anteloma23%23@carrito-compras-cluster.6u5aaig.mongodb.net/Backend-II</pre>

<h4>JWT_SECRET</h4>
<p>
<strong>Clave secreta para JWT.</strong><br>
Se utiliza para firmar y verificar los tokens JWT en los procesos de autenticación y autorización.
</p>
<pre>JWT_SECRET=codigoSecreto</pre>

<h4>JWT_EXPIRES_IN</h4>
<p>
<strong>Tiempo de expiración del token JWT.</strong><br>
Define la duración de validez del token de autenticación.
</p>
<pre>JWT_EXPIRES_IN=1h</pre>

<h4>MAILING_ACCOUNT</h4>
<p>
<strong>Cuenta de correo para envío de emails.</strong><br>
Email utilizado por el sistema para el envío de notificaciones automáticas (recuperación de contraseña, avisos, confirmaciones, etc.).
</p>
<pre>MAILING_ACCOUNT=anteloma87@gmail.com</pre>

<h4>MAILING_PASS</h4>
<p>
<strong>Contraseña de aplicación del servicio de correo.</strong><br>
Clave generada por el proveedor de email (ej: Gmail App Password) para permitir el envío seguro de correos desde la aplicación.
</p>
<pre>MAILING_PASS=xxxx xxxx xxxx xxxx</pre>

<h4>BASE_URL</h4>
<p>
<strong>URL base del sistema.</strong><br>
Se utiliza para generar enlaces dinámicos (por ejemplo en correos electrónicos de recuperación de contraseña, validaciones o redirecciones).
</p>
<pre>BASE_URL=http://localhost:3000</pre>

<h3>👁️ VIEWS</h3>

<h4>layouts/main.handlebars</h4>
<p>
<strong>Layout principal de la aplicación.</strong><br>
Define la estructura HTML base (head, carga de CSS global y SweetAlert2). Incluye header con título, render dinámico de vistas mediante <code>{{{body}}}</code> y footer con información legal.
</p>

<h4>layouts/style.css</h4>
<p>
<strong>Estilos globales de la interfaz.</strong><br>
Define la identidad visual del sistema: header, navbar, grillas de productos, formularios, botones, paginación, login, carrito, footer y diseño responsivo general.
</p>

<h4>home.handlebars</h4>
<p>
<strong>Vista principal de productos.</strong><br>
Muestra el listado de productos con filtros por categoría, orden por precio, límite por página y paginación dinámica. Permite agregar productos al carrito y cerrar sesión.
</p>

<h4>carts.handlebars</h4>
<p>
<strong>Vista de carrito de compras.</strong><br>
Renderiza los productos del carrito con información detallada y permite eliminar productos y finalizar la compra mediante el botón <code>Finalizar compra</code>.
</p>

<h4>login.handlebars</h4>
<p>
<strong>Vista de inicio de sesión.</strong><br>
Formulario de autenticación por email y contraseña, con acceso a registro de usuario y recuperación de contraseña.
</p>

<h4>registration.handlebars</h4>
<p>
<strong>Vista de registro de usuarios.</strong><br>
Formulario para creación de cuentas nuevas con datos personales y credenciales.
</p>

<h4>recoverPassword.handlebars</h4>
<p>
<strong>Vista de recuperación de contraseña.</strong><br>
Formulario para solicitar restablecimiento de contraseña mediante envío de email con token de seguridad.
</p>

<h4>resetPassword.handlebars</h4>
<p>
<strong>Vista de restablecimiento de contraseña.</strong><br>
Permite definir una nueva contraseña mediante un token válido generado en el proceso de recuperación.
</p>

<h4>ticket.handlebars</h4>
<p>
<strong>Vista de historial de compras.</strong><br>
Lista los tickets de compra del usuario autenticado con número de compra, total y acceso al detalle.
</p>

<h4>ticketDetalle.handlebars</h4>
<p>
<strong>Vista de detalle de ticket.</strong><br>
Muestra el detalle completo de una compra: productos, cantidades, precios unitarios, subtotales y total final.
</p> 
<br>


---


📚 Autor

Matías Antelo

Proyecto desarrollado para la entrega de Backend II (Coderhouse).