Asegúrate de ver dos directorios en el explorador de archivos de AWS Cloud9:

- **application:** El directorio de la aplicación contiene código de ejemplo para la aplicación de inventario. Este código es similar al que tendrías en el backend de tu aplicación de inventario real.
  
- **scripts:** El directorio de scripts contiene scripts a nivel de administrador, como la creación de recursos de AWS o la carga de datos en tu base de datos.

Ejecuta el siguiente comando en la terminal de AWS Cloud9 para instalar las dependencias en ambos directorios:

```bash
npm install --prefix scripts/ && npm install --prefix application
```

Ejecuta el siguiente comando en la terminal de AWS Cloud9 para establecer la región de AWS en un archivo de entorno. Este ejemplo utiliza us-east-1, pero ingresa la región de AWS de tu elección para usar en el laboratorio:


```bash
echo "export AWS_REGION=us-east-1" >> env.sh && source env.sh
```
Utiliza el archivo env.sh para almacenar variables de entorno de recursos y otros parámetros necesarios en este laboratorio. Si tomas un descanso durante el laboratorio y luego inicias una nueva sesión en tu entorno de AWS Cloud9, asegúrate de volver a cargar tus variables de entorno ejecutando el siguiente comando en tu terminal:
```bash
source env.sh
```
