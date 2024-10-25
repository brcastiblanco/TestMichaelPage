# Test de Publicaciones

Este proyecto es una aplicación para gestionar publicaciones, donde los usuarios pueden crear, leer, editar y eliminar publicaciones. La aplicación está construida con **Next.js** y utiliza **Local Storage** para almacenar los datos de manera persistente.

## Características

- **Visualización de publicaciones**: Muestra una lista de publicaciones con la opción de buscar por título o cuerpo.
- **Agregar nuevas publicaciones**: Permite a los usuarios crear nuevas publicaciones con un título y un cuerpo.
- **Editar publicaciones**: Los usuarios pueden actualizar el título y el cuerpo de las publicaciones existentes.
- **Eliminar publicaciones**: Opción para eliminar publicaciones de la lista.
- **Almacenamiento local**: Las publicaciones se almacenan en el Local Storage del navegador para persistencia.
- **Imágenes en publicaciones**: Cada publicación puede tener una imagen asociada.

## Tecnologías Utilizadas

- **Next.js**: Framework de React para la construcción de aplicaciones web.
- **Tailwind CSS**: Utilizado para el diseño de la interfaz.
- **API JSONPlaceholder**: Para simular la obtención de datos.

## Instalación

Sigue estos pasos para instalar y ejecutar la aplicación en tu máquina local:

1. **Clona el repositorio**:
   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   ```

2. **Navega al directorio del proyecto**:
   ```bash
   cd tu-repositorio
   ```

3. **Instala Node.js**: Si no tienes Node.js instalado, descárgalo e instálalo desde [nodejs.org](https://nodejs.org/).

4. **Instala las dependencias**:
   ```bash
   npm install
   ```

5. **Inicia la aplicación**:
   ```bash
   npm run dev
   ```
   La aplicación estará disponible en `http://localhost:3000`.

6. **Accede a la aplicación**:
   - Abre tu navegador y ve a `http://localhost:3000` para interactuar con la aplicación.

## Uso

- Abre la aplicación en tu navegador.
- Utiliza el formulario para agregar nuevas publicaciones.
- Haz clic en una publicación para editarla o eliminarla.
- Utiliza la barra de búsqueda para encontrar publicaciones por título o cuerpo.