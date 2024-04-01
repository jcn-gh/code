/* eslint-env es6 */
/* eslint ecmaVersion: 6 */
/* jshint esversion: 6 */

document.addEventListener("DOMContentLoaded", function() {
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


// Tutorial CodeMirror 6
initializeEditorH(`<!DOCTYPE html>\n<html lang="en">\n\n<head>\n    <meta charset="UTF-8">\n    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n    <title>CodeMirror6</title>\n    <link rel="stylesheet" href="styles.css">\n</head>\n\n<body>\n    <main>\n        <h1>CodeMirror 6</h1>\n        <div id="editor">\n            <!-- aquí irá el editor -->\n        </div>\n    </main>\n\n    <script src="editor.js"></script>\n</body>\n\n</html>`, 'editor00');
initializeEditorC(`html,\nbody {\n  margin: 0;\n  padding: 0;\n  background: #fff;\n  color: #444;\n  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;\n}`, 'editor01');
initializeEditorJ(`(function() {\n    'use strict';\n    const jscode = \`function hello(who = "world") {\\n    console.log(\`Hello, \${who}!\`)\\n  }\\nhello();\\nhello ('lu');\\n\`\n\n    const {\n        basicSetup,\n    } = CM["codemirror"];\n    const {\n        EditorState,\n    } = CM["@codemirror/state"];\n    const {\n        EditorView,\n    } = CM["@codemirror/view"];\n    const {\n        javascript,\n        javascriptLanguage,\n    } = CM["@codemirror/lang-javascript"];\n\n  const editor = window.view;\n    editor = new EditorView({\n        doc: jscode,\n        indentWithTabs: true,\n        smartIndent: true,\n        lineNumbers: true,\n        matchBrackets: true,\n        extensions: [\n            basicSetup,\n            javascript(),\n            javascriptLanguage,\n        ],\n        parent: document.querySelector("#editor")\n    });\n})();\n`, 'editor02');
initializeEditorJ(`import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";\nimport { html } from "@codemirror/lang-html";\n\nlet editor = new EditorView({\n  state: EditorState.create({\n    extensions: [basicSetup, html()],\n  }),\n  parent: document.body,\n});`, 'editor03');
initializeEditorJ(`const currentValue = editor.state.doc.toString();`, 'editor04');
initializeEditorJ(`editor.dispatch({\n  changes: { from: 0, insert: "<!DOCTYPE html>" },\n});`, 'editor05');
initializeEditorJ(`const currentValue = editor.state.doc.toString();\nconst startPosition = currentValue.indexOf("editor.bundle.js");\nconst endPosition = startPosition + "editor.bundle.js".length;\n\neditor.dispatch({\n  changes: {\n    from: startPosition,\n    to: endPosition,\n    insert: "code-mirror-editor.js",\n  },\n});`, 'editor06');
initializeEditorJ(`let timer;

let editor = new EditorView({
  state: EditorState.create({
    extensions: [
      basicSetup,
      html(),
      EditorView.updateListener.of((v) => {
        if (v.docChanged) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            console.log("DO SOMETHING WITH THE NEW CODE");
          }, 500);
        }
      }),
    ],
  }),
  parent: document.body,
});`, 'editor07');
initializeEditorJ(`const evaluateCode = (code) => {
  console.clear();
  try {
    Function(code)(window);
  } catch (err) {
    console.error(err);
  }
};`, 'editor08');
initializeEditorJ(`import { EditorState, EditorView, basicSetup } from "@codemirror/basic-setup";
import { javascript } from "@codemirror/lang-javascript";

const jscode = "";
const myTheme = EditorView.baseTheme({
  "&.cm-editor": {
    fontSize: "16px",
  },
  ".cm-scroller": {
    fontFamily:
      "Consolas, Menlo, Monaco, source-code-pro, Courier New, monospace",
  },
});

let timer;

const evaluateCode = (code) => {
  console.clear();
  try {
    Function(code)(window);
  } catch (err) {
    console.error(err);
  }
};

let editor = new EditorView({
  state: EditorState.create({
    extensions: [
      basicSetup,
      javascript(),
      myTheme,
      EditorView.updateListener.of((v) => {
        if (v.docChanged) {
          if (timer) clearTimeout(timer);
          timer = setTimeout(() => {
            evaluateCode(editor.state.doc.toString());
          }, 500);
        }
      }),
    ],
    doc: jscode,
  }),
  parent: document.body,
});`, 'editor09');
initializeEditor(``, 'editor10');