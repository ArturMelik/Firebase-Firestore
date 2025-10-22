📬 Formulario de Contacto con Firebase y Local Storage
🧠 Descripción

Este proyecto es un formulario de contacto donde el usuario puede escribir su nombre, email, mensaje y una URL de imagen.

Los datos se guardan en Firebase Firestore, y también se usan las funciones del Local Storage para guardar la información temporalmente si el formulario no se envía.

Desde la misma página es posible ver, editar y borrar contactos fácilmente.


🚀 Funcionalidades

Agregar un contacto con:

Nombre

Email

Mensaje

URL de imagen

Validación del formulario (no se puede enviar si hay campos vacíos o email inválido).

Guardar los datos en Firebase Firestore.

Mostrar los contactos guardados en el DOM.

Botón para borrar todos los contactos de Firestore.

Botón para editar un contacto específico.

Botón para borrar un solo contacto.

Guardar los datos del formulario en Local Storage si no se envía.

Botón para limpiar el formulario cacheado del Local Storage.



🧰 Tecnologías usadas

HTML5

CSS3

JavaScript

Firebase Firestore

⚙️ Cómo usar el proyecto
1. Clonar el repositorio
git clone https://github.com/ArturMelik/Firebase-Firestore.git

2. Abrir el proyecto

Abrir el archivo index.html en el navegador.

3. Conectar con Firebase

Entrar a Firebase Console
.


Crear un nuevo proyecto.

Activar Firestore Database.

Copiar la configuración de Firebase y pegarla en el archivo firebaseConfig.js o directamente en el script principal:

const firebaseConfig = {
  apiKey: "AIzaSyA679g1f_BUBtCH_zWjwwLqsfwmDDkFEvk",
  authDomain: "fir-web-edb1a.firebaseapp.com",
  projectId: "fir-web-edb1a",
  storageBucket: "fir-web-edb1a.firebasestorage.app",
  messagingSenderId: "565813690025",
  appId: "1:565813690025:web:98ad2051d9aa9ca718b3b8"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

📁 Estructura del proyecto
📂 formulario-contacto
│
├── index.html
├── style.css
├── script.js
└── README.md


🧩 Qué se aprendió con este proyecto

Uso de Firebase Firestore para guardar y leer datos.

Uso de Local Storage para guardar datos localmente.

Validación de formularios con JavaScript.

Modificación del DOM para mostrar información en pantalla.

Implementación de un CRUD completo (Crear, Leer, Editar, Borrar).



💡 Ideas para mejorar

Agregar autenticación de usuarios con Firebase Auth.

Mejorar la interfaz usando frameworks o librerías como React o Bootstrap.

🌐 Repositorio

https://github.com/ArturMelik/Firebase-Firestore