/* eslint-env es8 */
/* eslint ecmaVersion: 8 */
/* jshint esversion: 8 */
document.addEventListener("DOMContentLoaded", function() {
    /*
     * typewriter effect
     */
    const appendCursorSpan = (element, cursorSpan) => {
        element.appendChild(cursorSpan);
    };

    const createTypewriterEffect = (element, typingSpeed = 400, resetDelay = 5200) => {
        const text = element.textContent;
        element.textContent = '';

        const cursorSpan = document.createElement('span');
        cursorSpan.classList.add('cursor', 'blink');
        cursorSpan.textContent = '…';
        appendCursorSpan(element, cursorSpan);

        let charIndex = 0;
        let resetTimeout;

        const typeChar = () => {
            if (charIndex < text.length) {
                cursorSpan.before(text.charAt(charIndex));
                charIndex++;
                setTimeout(typeChar, typingSpeed);
            } else {
                if (!resetTimeout) {
                    resetTimeout = setTimeout(resetTypewriter, resetDelay);
                }
            }
        };

        const resetTypewriter = () => {
            element.textContent = '';
            appendCursorSpan(element, cursorSpan);
            charIndex = 0;
            clearTimeout(resetTimeout);
            resetTimeout = null;
            typeChar();
        };

        setInterval(() => {
            cursorSpan.classList.toggle('blink');
        }, 400);

        typeChar();
    };
    document.querySelectorAll('.typewriter').forEach(element => createTypewriterEffect(element));

    /*
     * img zoom effect
     */
    const images = document.querySelectorAll('img');
    images.forEach(imaje => {
        imaje.addEventListener('click', function() {
            if (imaje.classList.contains('fullscreen-image')) {
                removeFullscreen();
            } else {
                removeFullscreen();
                imaje.classList.add('fullscreen-image');
            }
        });
    });

    function removeFullscreen() {
        images.forEach(img => {
            img.classList.remove('fullscreen-image');
        });
    }

    /*
     * h3 button effect
     */
    const headings = document.querySelectorAll("h3");
    headings.forEach((heading) => {
        const content = heading.nextElementSibling;
        content.style.display = "none";
        heading.addEventListener("click", function() {
            headings.forEach((otherHeading) => {
                if (otherHeading !== heading) {
                    otherHeading.nextElementSibling.style.display = "none";
                    otherHeading.classList.remove("buttonAsk");
                }
            });
            content.style.display = content.style.display === "none" || content.style.display === "" ? "block" : "none";
            heading.classList.toggle("buttonAsk", content.style.display === "block");
            heading.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            heading.focus();
        });
    });
});

/*
 * CodeMirror 6 editor
 */
const {
    basicSetup,
    EditorView,
} = CM.codemirror;
const {
    EditorState,
} = CM["@codemirror/state"];
const {
    autocompletion,
} = CM["@codemirror/autocomplete"];
const {
    autoCloseTags,
    html,
    htmlCompletionSource,
    htmlLanguage,
} = CM["@codemirror/lang-html"];
const {
    language,
    StreamLanguage,
    defaultHighlightStyle,
    syntaxHighlighting
} = CM["@codemirror/language"];
const {
    completionPath,
    esLint,
    javascript,
    javascriptLanguage,
    localCompletionSource,
    scopeCompletionSource,
    snippets,
} = CM["@codemirror/lang-javascript"];

const {
    css,
    cssCompletionSource,
    cssLanguage,
    defineCSSCompletionSource,
} = CM["@codemirror/lang-css"];

const {
    color,
    oneDark,
    oneDarkHighlightStyle,
    oneDarkTheme,
} = CM["@codemirror/theme-one-dark"];

 // Initialize CodeMirror editor
const initializeEditor = (text, id, extensions) => {
    new EditorView({
        doc: text,
        extensions: [
            autocompletion(),
            basicSetup,
            ...extensions,
            oneDark,
            oneDarkTheme,
            syntaxHighlighting(defaultHighlightStyle, {fallback: true}),
        ],
        parent: document.getElementById(id),
        tabSize: 2,
    });
};

const initializeEditorHtml = (text, id) => {
    initializeEditor(text, id, [
        autoCloseTags,
        html(),
        htmlLanguage,
        htmlLanguage.data.of({
            autocomplete: htmlCompletionSource
        }),
    ]);
};

const initializeEditorCss = (text, id) => {
    initializeEditor(text, id, [
        css(),
        cssLanguage,
        cssLanguage.data.of({
            autocomplete: cssCompletionSource
        }),
    ]);
};

const initializeEditorJs = (text, id) => {
    initializeEditor(text, id, [
        javascript(),
        javascriptLanguage.data.of({
            autocomplete: scopeCompletionSource(globalThis)
        }),
    ]);
};

// ¿Qué es Axios?
initializeEditorJs(`const axios = require("axios");

axios.get("https://api.example.com/data")
  .then((response) => {
    // Manejar los datos de la respuesta
    console.log(response.data);
  })
  .catch((error) => {
    // Manejar errores
    console.error(error);
  });`, 'editor01');
// ¿Qué es Fetch?
initializeEditorJs(`fetch("https://api.example.com/data")
.then((response) => response.json())
.then((data) => {
  // Manejar los datos de la respuesta
})
.catch((error) => {
  // Manejar errores
});`, 'editor02');
// Principales Diferencias entre Axios y Fetch
initializeEditorJs(`// Ejemplo con Axios
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
});`, 'editor03');
initializeEditorJs(`const headers = new Headers();
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
  });`, 'editor031');
// ¿Qué es el debugger en JavaScript? ¿Cómo se utiliza?
initializeEditorJs(`function sumar(a, b) {
    return a + b;
  }
  
  function main() {
    const resultado = sumar(3, 6);
    console.log(resultado);
  }
  
  main();`, 'editor05');
initializeEditorJs(`function sumar(a, b) {
    debugger;
    return a + b;
  }`, 'editor051');
// ¿Qué es un escuchador de eventos?
initializeEditorJs(`const button = document.querySelector("button");

button.addEventListener("click", function () {
  console.log("El botón fue presionado");
});`, 'editor06');
// Ejercicios prácticos
initializeEditorCss(`$mi-color: #00ff00;`, 'editorE1');
initializeEditorCss(`@mixin boton($color-fondo, $color-texto) {
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
  }`, 'editorE2');
initializeEditorCss(`@import "estilos";

.mi-boton {
  @include boton(#336633, #ffffff);
}`, 'editorE3');
initializeEditorHtml(`<link
href="https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap"
rel="stylesheet" />`, 'editorE4');
initializeEditorCss(`body {
    font-family: "Roboto", sans-serif;
  }`, 'editorE5');
