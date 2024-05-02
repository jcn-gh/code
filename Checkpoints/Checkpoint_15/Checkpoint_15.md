# Checkpoint 15

## Preguntas (temas a desarrollar)

### ¿Qué es Axios?

Axios es una biblioteca de JavaScript que se utiliza para realizar solicitudes HTTP desde el lado del cliente en aplicaciones web. Proporciona una interfaz sencilla y flexible para enviar solicitudes HTTP y recibir respuestas de un servidor. Axios es altamente configurable y admite múltiples formatos de datos, como JSON y form-data. Además, Axios es compatible con promesas y puede ser utilizado en varios entornos de ejecución, como navegadores web y Node.js.

Algunas buenas prácticas y recomendaciones al utilizar Axios incluyen:

- **Instalación y configuración**: Asegúrate de instalar Axios correctamente en tu proyecto y configurarlo según tus necesidades. Puedes utilizar npm o yarn para instalarlo

  ```shell
  npm install axios
  # o
  yarn add axios
  ```

  y luego importarlo en tu código, por ejemplo, para hacer una solicitud GET a una API:

  ```js
  const axios = require("axios");

  axios
    .get("https://api.example.com/data")
    .then((response) => {
      // Manejar los datos de la respuesta
      console.log(response.data);
    })
    .catch((error) => {
      // Manejar errores
      console.error(error);
    });
  ```

- **Manejo de errores**: Asegúrate de manejar adecuadamente los errores al realizar solicitudes con Axios. Puedes utilizar el bloque `try/catch` para capturar y manejar cualquier error que ocurra durante la solicitud. También puedes utilizar los métodos `.catch()` y `.finally()` para manejar errores y realizar acciones finales.
- **Cancelación de solicitudes**: Si necesitas cancelar una solicitud, asegúrate de utilizar el método `.cancelToken()` proporcionado por Axios. Esto te permitirá cancelar solicitudes pendientes si es necesario.
- **Interceptores**: Utiliza interceptores para realizar acciones comunes antes de realizar una solicitud, como agregar encabezados comunes o manejar autenticación. Puedes utilizar los métodos `.interceptors.request` y `.interceptors.response` para configurar tus interceptores.

Ventajas de Axios:

- Proporciona una interfaz fácil de usar para realizar solicitudes HTTP.
- Es compatible con promesas, lo que facilita el manejo de solicitudes asíncronas.
- Permite la cancelación de solicitudes.
- Ofrece la posibilidad de interceptar solicitudes y respuestas.
- Es ampliamente utilizado y tiene una buena documentación de la comunidad.

Inconvenientes:

- Es una biblioteca adicional que debe ser agregada al proyecto, lo que puede aumentar el tamaño del paquete.
- Hay quien prefiere usar las funciones nativas de Fetch en lugar de depender de una biblioteca externa como Axios.

En general, Axios es una excelente opción para hacer solicitudes HTTP en JavaScript, ya que simplifica la realización de solicitudes HTTP y el manejo de respuestas. Además, ofrece funcionalidades adicionales como la cancelación de solicitudes, la transformación de datos y la protección contra ataques de CSRF (_Cross-Site Request Forgery_, en los que el _atacante_ puede hacer que una aplicación web realice acciones en nombre del usuario sin su consentimiento). Pero es importante considerar los pros y los contras al decidir si utilizarlo en un proyecto específico.

### ¿Qué es Fetch?

Fetch es una API nativa de JavaScript que permite hacer solicitudes HTTP a servidores. Se introdujo en la especificación de la API Fetch y está disponible en los navegadores modernos. Proporciona una forma sencilla y flexible de enviar solicitudes HTTP y manejar las respuestas.

Algunas buenas prácticas y recomendaciones al utilizar Fetch:

- Sintaxis: Fetch utiliza una sintaxis basada en promesas y tiene una sintaxis más concisa que Axios. Por ejemplo, para hacer una solicitud GET, puedes usar el siguiente código:

  ```js
  fetch("https://api.example.com/data")
    .then((response) => response.json())
    .then((data) => {
      // Manejar los datos de la respuesta
    })
    .catch((error) => {
      // Manejar errores
    });
  ```

- Manejo de errores: Fetch proporciona una forma sencilla de manejar errores en las solicitudes HTTP. Asegúrate de utilizar el método `catch`, en la promesa devuelta por `fetch`, para capturar y manejar los errores que ocurran durante la solicitud.
- Verificación del estado de la respuesta: Antes de tratar de acceder a los datos de la respuesta, verifica el estado de la respuesta utilizando el método `ok` del objeto `Response`. Si el estado es `false`, significa que la solicitud no se realizó correctamente y puedes manejar el error adecuadamente.
- Conversión de datos: Utiliza los métodos adecuados para convertir los datos de la respuesta en el formato deseado. Por ejemplo, si la respuesta es en formato JSON, puedes utilizar `response.json()` para obtener los datos en formato JSON.
- Interceptores: Fetch permite interceptar y modificar las solicitudes y respuestas utilizando los interceptores. Esto es útil para agregar lógica común a todas las solicitudes, como el manejo de tokens de autenticación o el agregado de encabezados comunes.
- Configuración de encabezados: Utiliza el objeto `Headers` para establecer los encabezados de la solicitud, como el tipo de contenido o los encabezados de autenticación.. Por ejemplo:

  ```js
  const headers = new Headers();
  headers.append("Content-Type", "application/json");
  headers.append("Authorization", "Bearer token");

  fetch("https://api.example.com/data", {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ key: "value" }),
  })
    .then((response) => response.json())
    .then((data) => {
      // Manejar los datos de la respuesta
    })
    .catch((error) => {
      // Manejar errores
    });
  ```

- Gestión de estado: Considera utilizar una biblioteca de administración de estado como Redux o MobX para gestionar el estado de la aplicación y evitar la necesidad de realizar solicitudes HTTP directamente en componentes.
- Compatibilidad: Fetch está disponible en los navegadores modernos y también se puede utilizar en Node.js a través de bibliotecas como node-fetch.

Ventajas de Fetch:

- Flexibilidad: Fetch ofrece una gran flexibilidad y personalización en comparación con otras bibliotecas de solicitudes HTTP. Puedes personalizar los encabezados, manejar errores de manera personalizada y interceptar las solicitudes y respuestas.
- Compatibilidad: Fetch es una API nativa de JavaScript y está disponible en los navegadores modernos, lo que significa que no necesitas instalar ninguna biblioteca adicional.
- Simplicidad: Fetch tiene una sintaxis sencilla y concisa, lo que facilita el envío de solicitudes HTTP y el manejo de las respuestas.
- Rendimiento: Fetch es más eficiente en términos de rendimiento que las bibliotecas anteriores, ya que no realiza muchas transformaciones internas de los datos por defecto.
- Compatibilidad con Node.js: Fetch también se puede utilizar en Node.js a través de bibliotecas como node-fetch, lo que te permite utilizar la misma API en ambientes de servidor.

Desventajas de Fetch:

- No soporta Internet Explorer: Fetch no está disponible en versiones anteriores de Internet Explorer, lo que puede limitar su uso en proyectos que necesitan compatibilidad con navegadores más antiguos.

En resumen, Fetch es una API fácil de usar para hacer solicitudes HTTP en JavaScript, ofreciendo una alternativa moderna y eficiente a las bibliotecas como Axios.

### Principales Diferencias entre Axios y Fetch

Algunas diferencias clave entre ellas son:

1. Sintaxis: La sintaxis de uso de Axios es más concisa y fácil de leer que la de fetch. Axios proporciona una API más amigable y fluida. Por otro lado, fetch requiere una sintaxis más verbosa y puede ser más difícil de leer para los nuevos usuarios.
2. Promesas: Axios devuelve promesas nativas de JavaScript, lo que facilita el uso de las funciones asincrónicas como async/await. Por otro lado, fetch devuelve un objeto Promise que se puede manejar de manera similar, pero puede requerir más código para manejar los errores y las respuestas.
3. Interceptores: Axios proporciona una funcionalidad de interceptores que permite agregar lógica personalizada antes de enviar una solicitud o después de recibir una respuesta. Esto es útil para agregar encabezados de autorización, manejar errores globales o realizar acciones comunes en todas las solicitudes. Fetch no tiene esta funcionalidad integrada, pero se puede lograr mediante el uso de middleware o bibliotecas adicionales.
4. Configuración global: Axios permite establecer una configuración global que se aplicará a todas las solicitudes realizadas con la biblioteca. Esto incluye la configuración de encabezados, la configuración de timeout y otras opciones de configuración. Fetch no tiene una configuración global incorporada, pero se puede lograr mediante el uso de funciones de envoltorio o bibliotecas adicionales.
5. Manejo de errores: Axios proporciona una API más amigable para manejar errores. Puede manejar errores de red, errores de respuesta y errores de tiempo de espera de forma más intuitiva. Fetch también permite manejar errores, pero requiere más código y puede ser más difícil de leer.
6. Manejo de carga de archivos: Axios tiene una funcionalidad integrada para enviar solicitudes de carga de archivos. Esto es útil para enviar archivos grandes sin tener que manejar el proceso manualmente. Fetch también puede manejar la carga de archivos, pero requiere más código y puede ser más difícil de implementar.
7. Compatibilidad con navegadores: Axios es compatible con navegadores modernos y también proporciona una versión para Node.js. Fetch es nativo en navegadores modernos y no requiere ninguna biblioteca adicional en Node.js.
8. Tamaño: Axios es una biblioteca más ligera en términos de tamaño, lo que puede ser útil para proyectos más pequeños o en entornos de desarrollo. Fetch es más grande en comparación, pero proporciona más funcionalidades.
9. Comunidad: Axios tiene una comunidad más grande y activa en comparación con fetch. Hay una amplia variedad de recursos, tutoriales y soporte disponible en línea.
10. Actualización: Axios se actualiza con frecuencia y ofrece características y mejoras constantemente. Fetch es parte de la especificación de la API Fetch y no se actualiza tan a menudo.
11. CORS (_Cross-Origin Resource Sharing_): Axios maneja automáticamente las solicitudes CORS y realiza solicitudes de tipo OPTIONS adicionales para asegurarse de que se permitan las solicitudes cruzadas. Fetch, por otro lado, no maneja automáticamente las solicitudes CORS. Si necesitas realizar solicitudes a un dominio diferente, deberás configurar correctamente los encabezados CORS en el servidor o utilizar un proxy para evitar problemas de seguridad.

```JavaScript
// Ejemplo con Axios
axios.post('https://api.example.com/users', {
firstName: 'John',
lastName: 'Doe'
})
.then(response => {
    console.log(response.data);
})
.catch(error => {
    console.error(error);
});

// Ejemplo con Fetch
fetch('https://api.example.com/users', {
method: 'POST',
headers: {
    'Content-Type': 'application/json'
},
body: JSON.stringify({
    firstName: 'John',
    lastName: 'Doe'
})
})
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch(error => {
    console.error(error);
});
```

En este ejemplo, se realiza una solicitud POST a una API de ejemplo utilizando Axios y Fetch. En Axios, se utiliza el método `post` para enviar los datos en el cuerpo de la solicitud. En Fetch, se utiliza el método `fetch` y se especifica el método de solicitud como ‘POST’ en la opción `method`. Además, en Fetch se establecen los encabezados y el cuerpo de la solicitud en las opciones `headers` y `body`, respectivamente.

En general, Axios ofrece una API más simple y concisa, mientras que Fetch es más flexible y permite más personalización. Sin embargo, Axios también proporciona más funcionalidades, como la capacidad para manejar errores de forma global y la posibilidad de realizar solicitudes en modo promesa.

### ¿Por qué son útiles las herramientas de desarrollo de React en el navegador?

Las herramientas de desarrollo de React en el navegador son una serie de herramientas que ayudan a los desarrolladores a depurar, inspeccionar y analizar aplicaciones React. Estas herramientas son útiles para realizar diversas tareas, como:

- **Depuración**: Permiten detener la ejecución del código en un punto específico para inspeccionar variables, ver el flujo de ejecución y detectar errores. Esto ayuda a identificar y solucionar problemas en el código de manera más eficiente.
- **Inspección de componentes**: Te permiten ver la estructura y el estado de los componentes React en tiempo real. Esto te ayuda a comprender cómo se renderizan los componentes y a realizar cambios en el código de manera más eficiente.
- **Análisis de rendimiento**: Permiten analizar el rendimiento de la aplicación React y identificar posibles cuellos de botella. Esto incluye la capacidad de ver cuánto tiempo se tarda en renderizar componentes o en cargar recursos y cuántas actualizaciones se producen en ciertos componentes… entre otros indicadores de rendimiento. Esto te ayuda a identificar áreas de rendimiento que puedes optimizar para mejorar la velocidad y la experiencia del usuario.
- **Depuración de red**: Te permiten ver y analizar las solicitudes de red realizadas por tu aplicación React. Esto te ayuda a identificar problemas de red y a optimizar las solicitudes de datos.

El principal inconveniente del uso de las herramientas de desarrollo de React en el navegador es que pueden ralentizar el rendimiento de la aplicación en comparación con su ejecución normal. Esto se debe a que realizan un seguimiento detallado de la aplicación y realizan operaciones en segundo plano que afectan al rendimiento general de la aplicación.

Además, el uso excesivo de estas herramientas puede hacer que el código se vuelva más complejo y difícil de mantener, ya que los desarrolladores pueden depender demasiado de estas herramientas para realizar tareas comunes como la inspección de elementos o la depuración de errores. Esto puede hacer que el código sea más propenso a errores y más difícil de entender para otros desarrolladores que no estén familiarizados con las herramientas específicas.

En general, es recomendable utilizar las herramientas de desarrollo de React en el navegador solo cuando sea necesario, y evitar su uso excesivo o en entornos de producción donde el rendimiento sea una preocupación importante.

### ¿Qué es el debugger en JavaScript? ¿Cómo se utiliza?

El debugger en JavaScript es una herramienta que te permite detener la ejecución del código en un punto específico para poder inspeccionar variables, ver el flujo de ejecución y detectar errores. Se utiliza colocando la palabra clave `debugger`; en el lugar donde quieras que se detenga la ejecución. Cuando el navegador encuentre esta palabra clave, activará el debugger si la consola del desarrollador está abierta.

Veamos un ejemplo.

```js
function sumar(a, b) {
  return a + b;
}

function main() {
  const resultado = sumar(3, 6);
  console.log(resultado);
}

main();
```

Supongamos que queremos depurar la función `sumar` para verificar si está funcionando correctamente. Podemos hacerlo de la siguiente manera:

1. Abre la consola del navegador. Puedes hacerlo presionando `F12` en la mayoría de los navegadores o buscando la opción “Developer Tools” en el menú de herramientas del navegador.
2. En la consola, ingresa el comando `debugger` para establecer un punto de interrupción en la línea donde deseas iniciar la depuración. En este caso, podemos colocarlo en la primera línea de la función `sumar`:

   ```js
   function sumar(a, b) {
     debugger;
     return a + b;
   }
   ```

3. Ejecuta el código. Cuando se llegue a la línea con `debugger`, la ejecución se detendrá y se abrirá la ventana de depuración en la consola.
4. En la ventana de depuración, podrás ver el estado actual de la aplicación, como las variables y los argumentos de las funciones. Puedes examinar estos valores y utilizar comandos como `console.log` para imprimir información adicional en la consola.

### ¿Qué es un escuchador de eventos?

En JavaScript, un “escuchador de eventos” es una función que se asocia a un evento específico en un elemento del DOM (Document Object Model). Cuando ese evento ocurre, el escuchador de eventos se ejecuta automáticamente.

Por ejemplo, si tienes un botón en tu página y quieres hacer algo cuando el usuario lo presiona, puedes agregar un escuchador de eventos al botón para que se ejecute una función cuando se produzca el evento “click”. Aquí tienes un ejemplo:

```js
const button = document.querySelector("button");

button.addEventListener("click", function () {
  console.log("El botón fue presionado");
});
```

En este ejemplo, el escuchador de eventos se asocia al evento “click” del botón. Cuando el usuario presiona el botón, se ejecuta la función y se muestra el mensaje “El botón fue presionado” en la consola.

Los escuchadores de eventos son una parte fundamental de la programación interactiva en JavaScript, ya que te permiten responder a acciones del usuario y realizar acciones en consecuencia.

## Ejercicios prácticos

### Usando codepen, cree una variable SCSS que almacene un color

```scss
$mi-color: #00ff00;
```

### Usando codepen, cree un SCSS Mixin que pueda usarse para diseñar botones

```scss
@mixin boton($color-fondo, $color-texto) {
  background-color: $color-fondo;
  color: $color-texto;
  padding: 10px 20px;
  border: 1px solid $color-fondo;
  border-radius: 5px;
  text-align: center;
  cursor: pointer;

  &:hover {
    background-color: lighten($color-fondo, 10%);
  }
}
```

Si tenemos el mixin anterior en un archivo SCSS, pongamos `estilos.scss`, podemos usarlo en otro archivo CSS, digamos `mi-archivo.scss`, de esta forma:

```scss
@import "estilos";

.mi-boton {
  @include boton(#336633, #ffffff);
}
```

### Usando Sandbox, agregue una fuente personalizada al código de inicio normal

Encabezamiento HTML

```html
<link
  href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
  rel="stylesheet" />
```

CSS

```css
body {
  font-family: "Roboto", sans-serif;
}
```
