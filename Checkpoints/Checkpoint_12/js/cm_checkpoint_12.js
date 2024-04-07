/* eslint-env es6 */
/* eslint ecmaVersion: 6 */
/* jshint esversion: 6 */
document.addEventListener('DOMContentLoaded', function() {
    const imagenes = document.querySelectorAll('img');
    imagenes.forEach(imagen => {
        imagen.addEventListener('click', function() {
            if (imagen.classList.contains('fullscreen-image')) {
                removeFullscreen();
            } else {
                removeFullscreen(); // Ensure no other images are in fullscreen
                imagen.classList.add('fullscreen-image');
            }
        });
    });

    function removeFullscreen() {
        imagenes.forEach(img => {
            img.classList.remove('fullscreen-image');
        });
    }

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
            if (content.style.display === "block") {
                heading.classList.add("buttonAsk");
            } else {
                heading.classList.remove("buttonAsk");
            }
        });
    });
});
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


// // Initialize CodeMirror editor
/**
 * Initializes a CodeMirror editor with different configurations based on the provided text and id.
 * @param {string} text - The text content to be displayed in the editor.
 * @param {string} id - The id of the HTML element where the editor should be rendered.
 */
const initializeEditor = (text, id, extensions) => {
    new EditorView({
        doc: text,
        extensions: [
            autocompletion(),
            basicSetup,
            ...extensions,
            oneDark,
            oneDarkTheme,
        ],
        parent: document.getElementById(id),
        tabSize: 2,
    });
};

const initializeEditorH = (text, id) => {
    initializeEditor(text, id, [
        autoCloseTags,
        html(),
        htmlLanguage,
        htmlLanguage.data.of({
            autocomplete: htmlCompletionSource
        }),
    ]);
};

const initializeEditorC = (text, id) => {
    initializeEditor(text, id, [
        css(),
        cssLanguage,
        cssLanguage.data.of({
            autocomplete: cssCompletionSource
        }),
    ]);
};

const initializeEditorJ = (text, id) => {
    initializeEditor(text, id, [
        javascript(),
        javascriptLanguage.data.of({
            autocomplete: scopeCompletionSource(globalThis)
        }),
    ]);
};

// ¿Qué es el enrutamiento RESTful?
initializeEditorJ(`// Definimos un array para almacenar los usuarios\nlet users = [];\n\n// Ruta para obtener todos los usuarios\napp.get('/users', (req, res) => {\n    res.json(users);\n});\n\n// Ruta para obtener un usuario específico por su ID\napp.get('/users/:id', (req, res) => {\n    const userId = req.params.id;\n    const user = users.find(user => user.id === userId);\n    if (user) {\n        res.json(user);\n    } else {\n        res.status(404).json({ message: 'Usuario no encontrado' });\n    }\n});\n\n// Ruta para crear un nuevo usuario\napp.post('/users', (req, res) => {\n    const newUser = req.body;\n    users.push(newUser);\n    res.status(201).json(newUser);\n});\n\n// Ruta para actualizar un usuario existente por su ID\napp.put('/users/:id', (req, res) => {\n    const userId = req.params.id;\n    const updatedUser = req.body;\n    users = users.map(user => (user.id === userId ? updatedUser : user));\n    res.json(updatedUser);\n});\n\n// Ruta para eliminar un usuario por su ID\napp.delete('/users/:id', (req, res) => {\n    const userId = req.params.id;\n    users = users.filter(user => user.id !== userId);\n    res.json({ message: 'Usuario eliminado correctamente' });\n});`, 'editor00');
initializeEditorJ(``, 'editor01');
initializeEditorJ(``, 'editor02');
initializeEditorJ(``, 'editor03');
initializeEditorJ(``, 'editor04');
initializeEditorJ(``, 'editor05');
initializeEditorJ(``, 'editor06');
initializeEditorJ(``, 'editor07');
initializeEditorJ(``, 'editor08');
initializeEditorJ(``, 'editor09');
initializeEditor(``, 'editor10');