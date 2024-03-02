// Initialize CodeMirror editor
function initializeEditor(docu, id) {
const { basicSetup, EditorView } = CM.codemirror;
const { javascript, javascriptLanguage, scopeCompletionSource } = CM["@codemirror/lang-javascript"];

window.view = new EditorView({
  doc: docu,
  theme: window.matchMedia('(prefers-color-scheme: dark)').matches ? 'erlang-dark' : 'eclipse',
  extensions: [
    basicSetup,
    javascript(),
    javascriptLanguage.data.of({ autocomplete: scopeCompletionSource(globalThis) })
  ],
  parent: document.querySelector(id),
  tabSize: 2
});
}
// ¿Qué tipo de bucles hay en JS?
initializeEditor(`for (let i = 0; i < 5; i++) {\n  console.log(i);\n  console.log("Iteración completada");\n}`, `#editor00`);
initializeEditor(`const persona = {\n  nombre: 'Juan',\n  edad: 30,\n  ciudad: 'Madrid'\n};\n\nfor (let propiedad in persona) {\n  console.log(propiedad + ': ' + persona[propiedad]);\n}`, '#editor01');
initializeEditor(`const colores = ['rojo', 'verde', 'azul'];\n\nfor (let color of colores) {\n  console.log(color);\n}`, '#editor02');
initializeEditor(`const numbers = [1, 2, 3, 4, 5];\n\nnumbers.forEach(function(number) {\n  console.log(number);\n});`, '#editor03');
initializeEditor(`let j = 0;\nwhile (j < 5) {\n  console.log(j);\n  j++;\n}`, `#editor04`);
initializeEditor(`let k = 0;\ndo {\n  console.log(k);\n  k++;\n} while (k < 5);`, '#editor05');
initializeEditor(`outerLoop:\nfor (int i = 0; i < 3; i++) {\n    for (int j = 0; j < 3; j++) {\n        if (i * j > 4) {\n            break outerLoop; // sale del bucle exterior\n        }\n        System.out.println(i * j);\n    }\n}`, '#editor06');
initializeEditor(`for (int i = 0; i < 5; i++) {\n    if (i == 3) {\n        break; // sale del bucle cuando i es igual a 3\n    }\n    System.out.println(i);\n}`, '#editor07');
initializeEditor(`for (int i = 0; i < 5; i++) {\n    if (i == 2) {\n        continue; // omite el resto de instrucciones y continúa con la siguiente iteración\n    }\n    System.out.println(i);\n}`, '#editor08');
// ¿Cuáles son las diferencias entre const, let y var?
initializeEditor(`// Ejemplo de ámbito con var\nfunction exampleVarScope() {\n  for (var i = 0; i < 3; i++) {\n    // var tiene un ámbito de función\n    console.log(i); // Output: 0, 1, 2\n  }\n  console.log(i); // Output: 3\n}\n\n// Ejemplo de ámbito con let\nfunction exampleLetScope() {\n  for (let j = 0; j < 3; j++) {\n    // let tiene un ámbito de bloque\n    console.log(j); // Output: 0, 1, 2\n  }\n  console.log(j); // Error: j no está definido\n}`, '#editor09');
initializeEditor(`// Ejemplo de reasignación con let\nlet number = 10;\nnumber = 20; // Esto está permitido\nconsole.log(number); // Output: 20\n\n// Ejemplo de reasignación con const\nconst PI = 3.1416;\nPI = 3.14; // Error: Asignación a una constante.`, '#editor10');
initializeEditor(`// Ejemplo de redeclaración con var\nvar x = 10;\nvar x = 20; // Esto está permitido\nconsole.log(x); // Output: 20\n\n// Ejemplo de redeclaración con let\nlet y = 10;\nlet y = 20; // Error: Identificador 'y' ya ha sido declarado\n\n// Ejemplo de redeclaración con const\nconst z = 10;\nconst z = 20; // Error: Identificador 'z' ya ha sido declarado`, '#editor11');
initializeEditor(`function hoistingExample() {\n  console.log(foo); // Output: indefinido\n  console.log(bar); // Error: No se puede acceder a 'bar' antes de su inicialización\n\n  var foo = 'hello';\n  let bar = 'world';\n}\n\nhoistingExample();`, '#editor12');
initializeEditor(`function temporalDeadZone() {\n  console.log(x); // Output: ReferenceError: No se puede acceder a 'x' antes de su inicialización\n  let x = 10;\n}\n\ntemporalDeadZone();`, '#editor13');
initializeEditor(`function variableExample() {\n    var x = 10;\n    let y = 20;\n    const z = 30;\n\n    if (true) {\n      console.log(x); // Output: indefinido (declaración elevada)\n      console.log(y); // Output: 20\n      console.log(z); // Output: 30\n\n      var x = 40; // Redeclaración of x\n      let y = 50; // Nuevo alcance del bloque y\n      const z = 60; // Nuevo alcance del bloque z\n\n      console.log(x); // Output: 40\n      console.log(y); // Output: 50\n      console.log(z); // Output: 60\n    }\n\n    x = 70; // Reasignación x\n    y = 80; // Reasignación y\n    // z = 90; Intenta reasignar el valor de z a 90, pero arrojará un error porque z es una constante.\n\n    console.log(x); // Output: 70\n    console.log(y); // Output: 80\n    console.log(z); // Output: 30 (sin cambios)\n}\n\nvariableExample();`, '#editor14');
// ¿Qué es una función de flecha?
initializeEditor(`const sum = (a, b) => a + b;`, '#editor15');
initializeEditor(`const getUser = (id) => {\n  // Lógica para obtener el usuario con el id proporcionado\n  return {\n    id: id,\n    name: 'John Doe'\n  };\n};`, '#editor16');
initializeEditor(`const calculateStatistics = (data) => {\n  const { values } = data; // Desestructura el objeto data para obtener la propiedad values\n  const sum = values.reduce((acc, val) => acc + val, 0); // Utiliza el método reduce para sumar todos los valores en el array values\n  const average = sum / values.length; // Calcula el promedio de los valores\n  const max = Math.max(...values); // Encuentra el valor máximo en el array values utilizando el operador de propagación (spread operator)\n  const min = Math.min(...values); // Encuentra el valor mínimo en el array values utilizando el operador de propagación (spread operator)\n\n  return { sum, average, max, min }; // Retorna un nuevo objeto con las estadísticas calculadas\n};`, '#editor17');
initializeEditor(`function Person(name) {\n  this.name = name;\n\n  this.sayHello = () => {\n    console.log(\`Hello, my name is \${this.name}\`);\n  };\n}\n\nconst person1 = new Person('Alice');\nperson1.sayHello(); // Output: Hello, my name is Alice`, '#editor18');
// ¿Qué es la deconstrucción variable?
initializeEditor(`const numbers = [1, 2, 3];\nconst [a, b, c] = numbers;\nconsole.log(a, b, c); // Output: 1 2 3`, '#editor19');
initializeEditor(`const person = { name: 'John', age: 30 };\nconst { name, age } = person;\nconsole.log(name, age); // Output: John 30`, '#editor20');
initializeEditor(`const data = {\n  user: 'John',\n  details: {\n    age: 30,\n    address: {\n      city: 'New York',\n      zip: '10001'\n    }\n  }\n};\n\nconst { user, details: { age, address: { city, zip } } } = data;\n\nconsole.log(user, age, city, zip); // Output: John 30 New York 10001`, '#editor21');
// ¿Qué hace el operador de spread JS?
initializeEditor(`// Descomponer un objeto en sus elementos individuales\nconst obj1 = { a: 1, b: 2 };\nconst obj2 = { ...obj1, c: 3 }; // obj2 será { a: 1, b: 2, c: 3 }\n\n// Combinar múltiples elementos en un solo objeto\nconst obj3 = { x: 4, y: 5 };\nconst obj4 = { ...obj2, ...obj3 }; // obj4 será { a: 1, b: 2, c: 3, x: 4, y: 5 }\n\n// Copiar un array de manera rápida\nconst arr1 = [1, 2, 3];\nconst arr2 = [...arr1]; // arr2 será [1, 2, 3]`, '#editor22');
initializeEditor(`// Ejemplo donde el uso del operador de spread puede no ser conveniente\nconst originalObj = { a: 1, b: 2 };\nconst copiedObj = { ...originalObj }; // Se copia el objeto original\n\n// Si se requiere una referencia directa al objeto original\n// y cualquier cambio en 'copiedObj' no debe afectar 'originalObj'\n// entonces el uso del operador de spread no sería conveniente en este caso`, '#editor23');
// ¿Qué es OOP?
initializeEditor(`// Definimos la clase Animal\nclass Animal {\n  // Definimos el constructor que toma el nombre del animal\n  constructor(name) {\n    this.name = name; // Asignamos el nombre del animal a la propiedad name\n  }\n\n  // Definimos el método speak\n  speak() {\n    console.log(this.name + ' makes a noise.'); // Imprimimos el nombre del animal seguido de "makes a noise."\n  }\n}\n\n// Definimos la clase Dog que extiende de la clase Animal\nclass Dog extends Animal {\n  // Sobrescribimos el método speak de la clase Animal\n  speak() {\n    console.log(this.name + ' barks.'); // Imprimimos el nombre del perro seguido de "barks."\n  }\n}\n\n// Creamos una instancia de la clase Dog llamada "Rex"\nlet dog = new Dog('Rex');\n\n// Llamamos al método speak de la instancia "dog"\ndog.speak(); // Esto imprimirá "Rex barks." en la consola`, '#editor24');
// ¿Qué es una promesa JS?
initializeEditor(`new Promise((resolve, reject) => {\n  // código asíncrono\n})\n  .then((result) => {\n    // manejar el caso de éxito\n  })\n  .catch((error) => {\n    // manejar el caso de error\n  });`, '#editor25');
initializeEditor(`function asyncOperation() {\n  return new Promise((resolve, reject) => {\n    setTimeout(() => {\n      const randomNumber = Math.random();\n      if (randomNumber > 0.5) {\n        resolve(randomNumber);\n      } else {\n        reject(new Error('El número es menor que 0.5'));\n      }\n    }, 1000);\n  });\n}\n\nasyncOperation()\n  .then((result) => {\n    console.log('Operación exitosa. Número generado:', result);\n  })\n  .catch((error) => {\n    console.error('Operación fallida:', error.message);\n  });`, '#editor26');
// ¿Qué hacen async y await por nosotros?
initializeEditor(`async function fetchData() {\n  try {\n    let response = await fetch('https://api.example.com/data');\n    let data = await response.json();\n    return data;\n  } catch (error) {\n    console.error('Error fetching data:', error);\n    throw error;\n  }\n}\n\n// Llamada a la función fetchData\nfetchData()\n  .then(data => {\n    console.log('Data received:', data);\n  })\n  .catch(error => {\n    console.error('Error:', error);\n  });`, '#editor27');
initializeEditor(`async function addNumbers(a, b) {\n  console.log('Adding numbers...');\n  return a + b;\n}\n\n// Llamada a la función addNumbers\nasync function calculate() {\n  let result = await addNumbers(3, 4);\n  console.log('Result:', result);\n}\n\ncalculate();`, '#editor28');
// CodeMirror
initializeEditor(`<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css">\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js"></script>\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js"></script>\n</head>\n<body>\n  <textarea id="myTextarea"></textarea>\n\n  <script>\n    var myTextarea = document.getElementById('myTextarea');\n    var myCodeMirror = CodeMirror.fromTextArea(myTextarea, {\n      lineNumbers: true,\n      mode: 'javascript'\n    });\n  </script>\n</body>\n</html>`, '#editor29');
initializeEditor(`<!DOCTYPE html>\n<html>\n<head>\n  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.css">\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/codemirror.min.js"></script>\n  <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.58.3/mode/javascript/javascript.min.js"></script>\n</head>\n<body>\n  <textarea id="code"></textarea>\n  <button onclick="runCode()">Run</button>\n  <iframe id="output"></iframe>\n\n  <script>\n    var editor = CodeMirror.fromTextArea(document.getElementById("code"), {\n      lineNumbers: true,\n      mode: "javascript"\n    });\n\n    function runCode() {\n      var code = editor.getValue();\n      var iframe = document.getElementById("output");\n      var iframeDocument = iframe.contentDocument || iframe.contentWindow.document;\n      iframeDocument.open();\n      iframeDocument.write("<script>" + code + "<\/script>");\n      iframeDocument.close();\n    }\n  </script>\n</body>\n</html>`, '#editor30');
// EJERCICIO PRÁCTICO
initializeEditor(`let myList = ["velma", "scout", "jane", "john", "harry"];\n\nfor (let i = 0; i < myList.length; i++) {\n  console.log(myList[i]);\n}`, `#editorE1`);
initializeEditor(`let myList = ["velma", "scout", "jane", "john", "harry"];\nlet i = 0;\n\nwhile (i < myList.length) {\n  console.log(myList[i]);\n  i++;\n}`, '#editorE2');
initializeEditor(`const sayHello = () => {\n  return "Hello World";\n};`, '#editorE3');
