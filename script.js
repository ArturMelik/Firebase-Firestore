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

// Asigna id al usuario creado
const createContacto = (usuario) => {
  db.collection("usuarios")
    .add(usuario)
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
      readAll();
    })
    .catch((error) => console.error("Error adding document: ", error));
};

// Creando usuario con submit
document.getElementById("contacto-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const name = event.target.elements.nombre.value;
  const email = event.target.elements.email.value;
  const message = event.target.elements.mensaje.value;
  const image = event.target.elements.imagen.value;

  if (!name || !email || !message || !image) {
    alert("Hay un campo vacío. No se ha guardado");
    return;
  }
  
  createContacto({
    name,
    email,
    message,
    image
  });
  
  event.target.reset();
  // Limpiar también el localStorage después de enviar
  localStorage.removeItem("form_data");
});


//  Mostrar los datos de los contactos guardados en el DOM 



const printUser = (name, email, message, url, docId) => {
  const card = document.createElement("article");
  card.setAttribute("class", "card");
  
  const nameCard = document.createElement("p");
  nameCard.innerHTML = `<strong>Nombre:</strong> ${name}`;
  
  const emailCard = document.createElement("p");
  emailCard.innerHTML = `<strong>Email:</strong> ${email}`;
  
  const messageLabel = document.createElement("p");
  messageLabel.innerHTML = `<strong>Mensaje:</strong>`;
  
  const messageCard = document.createElement("textarea");
  messageCard.value = message;
  messageCard.setAttribute("readonly", "true");
  
  const imageLabel = document.createElement("p");
  imageLabel.innerHTML = `<strong>Imagen:</strong>`;
  
  const imageCard = document.createElement("img");
  imageCard.setAttribute("src", url);
  imageCard.setAttribute("alt", `Imagen de ${name}`);
  
  const id = document.createElement("p");
  id.innerHTML = `<strong>ID:</strong> ${docId}`;
  id.classList.add("id-card");


  // Crea botón para editar un contacto



  const editBtn = document.createElement("button");
  editBtn.textContent = "Editar";
  editBtn.classList.add("edit-btn");

  editBtn.addEventListener("click", () => {
    Swal.fire({
      title: "Editar contacto",
      html: `
        <input id="edit-name" class="swal2-input" value="${name}">
        <input id="edit-email" class="swal2-input" value="${email}">
        <textarea id="edit-message" class="swal2-textarea">${message}</textarea>
        <input id="edit-image" class="swal2-input" value="${url}">
      `,
      showCancelButton: true,
      confirmButtonText: "Guardar",
      cancelButtonText: "Cancelar"
    }).then(result => {
      if (result.isConfirmed) {
        const name = document.getElementById("edit-name").value.trim();
        const email = document.getElementById("edit-email").value.trim();
        const message = document.getElementById("edit-message").value.trim();
        const url = document.getElementById("edit-image").value.trim();

        if (!name || !email || !message || !url) {
          Swal.fire("Error", "Todos los campos son obligatorios", "error");
          return;
        }

        const updated = {
          name: name,
          email: email,
          message: message,
          image: url
        };
        
        db.collection("usuarios").doc(docId).update(updated)
          .then(() => {
            Swal.fire("¡Actualizado!", "El contacto ha sido actualizado.", "success");
            readAll();
          })
          .catch(err => console.error("Error actualizando:", err));
      }
    });
  });


  // Crea botón para borrar un contacto



  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Eliminar";
  deleteBtn.classList.add("delete-btn");

  deleteBtn.addEventListener("click", () => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás deshacer esta acción!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, borrar",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        db.collection("usuarios").doc(docId).delete()
          .then(() => {
            Swal.fire("¡Borrado!", "El contacto ha sido eliminado.", "success");
            readAll();
          })
          .catch(err => console.error("Error eliminando:", err));
      }
    });
  });

  const album = document.getElementById("album");

  card.appendChild(nameCard);
  card.appendChild(emailCard);
  card.appendChild(messageLabel);
  card.appendChild(messageCard);
  card.appendChild(imageLabel);
  card.appendChild(imageCard);
  card.appendChild(id);
  card.appendChild(editBtn);
  card.appendChild(deleteBtn);


  album.appendChild(card);
};

const readAll = () => {
  cleanAlbum();
  db.collection("usuarios")
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        console.log(doc.data()); 
        printUser(doc.data().name, doc.data().email, doc.data().message, doc.data().image, doc.id);
      });
    })
    .catch((error) => console.error("Error leyendo documentos:", error));
};

const cleanAlbum = () => {
  document.getElementById('album').innerHTML = "";
};


//  Borrar todos los contactos de Firebase Firestore



const deleteAllContactos = () => {
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Se borrarán TODOS los contactos. ¡No podrás deshacer esta acción!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, borrar todo",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      db.collection("usuarios")
        .get()
        .then((querySnapshot) => {
          // Crear un array de promesas para borrar todos los documentos
          const deletePromises = [];
          querySnapshot.forEach((doc) => {
            deletePromises.push(db.collection("usuarios").doc(doc.id).delete());
          });
          
          // Esperar a que todas las promesas se resuelvan
          return Promise.all(deletePromises);
        })
        .then(() => {
          Swal.fire({
            title: "¡Eliminado!",
            text: "Todos los contactos han sido borrados.",
            icon: "success"
          });
          readAll(); // Refrescar el DOM
        })
        .catch((error) => {
          console.error("Error borrando contactos:", error);
          Swal.fire("Error", "Hubo un problema al borrar los contactos", "error");
        });
    }
  });
};



// Guardar datos del formulario en localStorage



const campos = ["nombre", "email", "mensaje", "imagen"];

// Guardar cambios del formulario al cambiar un campo
campos.forEach(id => {
  const input = document.getElementById(id);
  input.addEventListener("input", guardarFormulario); // Cambio a "input" para guardar en tiempo real
});

// Función para guardar los datos como objeto
function guardarFormulario() {
  const formData = {};
  campos.forEach(id => formData[id] = document.getElementById(id).value);
  localStorage.setItem("form_data", JSON.stringify(formData));
}

// Cargar formulario cacheado desde localStorage
function cargarFormulario() {
  const data = JSON.parse(localStorage.getItem("form_data"));
  if (data) {
    campos.forEach(id => {
      const input = document.getElementById(id);
      input.value = data[id] || "";
    });
  }
}

// Limpiar formulario y caché
function limpiarFormulario() {
  const form = document.getElementById("contacto-form");
  form.reset();
  localStorage.removeItem("form_data");
  Swal.fire({
    title: "¡Limpiado!",
    text: "Formulario y caché limpiados correctamente",
    icon: "success",
    timer: 1500,
    showConfirmButton: false
  });
}

// Cargar registros y formulario al iniciar - SOLO UNA VEZ
document.addEventListener("DOMContentLoaded", () => {
  readAll();
  cargarFormulario();

  // Enganchar los botones una vez cargado el DOM
  document.getElementById("delete-all").addEventListener("click", deleteAllContactos);
  document.getElementById("limpiar-cache").addEventListener("click", limpiarFormulario);
});