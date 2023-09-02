CofeeTime - Proyecto con Django Rest, MongoDB y React


## Requisitos previos

Antes de comenzar con el proyecto, asegúrate de tener los siguientes requisitos previos instalados en tu sistema:

- Python (preferiblemente versión 3.7 o superior)
- Node.js (preferiblemente versión 10 o superior)
- MongoDB (asegúrate de tener el servicio de MongoDB en ejecución)

## Configuración del backend (Django Rest)

1. cd CofeeTime/


2. Crea y activa un entorno virtual:

   
   python3 -m venv env
   source env/bin/activate  # en Linux/Mac
   env\Scripts\activate  # en Windows


3. Instala las dependencias del proyecto:

   Entra al proyecto de cafeteria dentro de CofeeTime
   1- cd cafeteria/
   2- pip install -r requirements.txt


4. Aplica las migraciones a la base de datos:

   python manage.py migrate
   

5. Crea un superusuario	

   python manage.py createsuperuser

   username: root
   password: root

6. Inicia el servidor de desarrollo:

   python manage.py runserver 0.0.0.0:8000


7. El backend ahora está en ejecución en `http://localhost:8000`.



## Configuración del frontend (React)

1. Abre otra terminal y navega hasta el directorio `client`.

2. Instala las dependencias del frontend:
 
   npm install
   
3. Inicia el servidor de desarrollo de React:

   npm run dev

4. El frontend ahora está en ejecución en `http://localhost:5173`.




## Creación de usuarios

Después de haber configurado tanto el backend como el frontend y con ambos servidores en ejecución, sigue los siguientes pasos para crear usuarios:

1. Teniendo corriendo ya el backend, ir a la ruta en nuestro navegador de preferencia e ir a la dirección "http://localhost:8000/admin"

2. Colocar nuestras credenciales de superadmin que creamos anteriormente

3. Y crear 3 Groups: admin, recepcionista y cocinero

4. Abre un sistema de peticion de API como POSTMAN o Insomnia

5. Haz una peticion a "http:localhost:8000/cofee/api/token/" (POST)

6. Colocar como Body, como username y password las credenciales que fueron creadas en el superusuario
   
   {
      "username": "root",
      "password": "root"
   }


7. Otra peticion "http:localhost:8000/cofee/api/usuarios/" (POST)

8. Copiar el valor de la clave "access" de la respuesta del token y pegar en Authorization -> Bearer Token

9. Body 
   {
      "username": "admin",
      "password": "admin",
      "group_name": "admin"
   }
   
   Estos 3 campos son esenciales para la creacion de usuarios, luego existen campos adicionales para usuario como "first_name", "last_name".

10. Esto es todo para poder iniciar al sistema

11. Para crear los demas usuarios, solo es necesario cambiar el "username" y "group_name", como "cocinero" o "recepcionista"
 

Ahora ya puedes iniciar el sistema

Teniendo corriendo el backend y el frontend, ya podemos iniciar sesion en el sistema
en localhost:5173/ con el usuario de ejemplo "admin" y contraseña "admin"

¡Eso es todo! Ahora ya podes ver las funcionalidades del Proyecto
