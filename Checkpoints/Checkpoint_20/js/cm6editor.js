/* jshint esversion: 9 */

/*
 * CodeMirror 6 editor
 */

const {
    basicSetup,
    //    EditorView,
    HighlightStyle,
    mode,
    tags,
} = CM.codemirror;

const {
    acceptCompletion,
    autocompletion,
    closeBrackets,
    closeBracketsKeymap,
    closeCompletion,
    Completion,
    CompletionContext,
    completeFromList,
    completionKeymap,
    CompletionResult,
    ifNotIn,
    snippetCompletion,
    startCompletion,
} = CM["@codemirror/autocomplete"];

const {
    commentKeymap,
    cursorSubwordBackward,
    cursorSubwordForward,
    defaultKeymap,
    deleteCharBackward,
    history,
    historyField,
    historyKeymap,
    indentLess,
    indentMore,
    indentWithTab,
    invertedEffects,
    isolateHistory,
    redo,
    redoDepth,
    redoSelection,
    undo,
    undoDepth,
    undoSelection,
} = CM["@codemirror/commands"];

const {
    bracketMatching,
    continuedIndent,
    defaultHighlightStyle,
    defineLanguageFacet,
    delimitedIndent,
    foldGutter,
    flatIndent,
    foldInside,
    foldKeymap,
    foldNodeProp,
    foldService,
    getIndentation,
    indentNodeProp,
    indentOnInput,
    Language,
    language,
    languageDataProp,
    LanguageDescription,
    LanguageSupport,
    LRLanguage,
    ParseContext,
    StreamLanguage,
    StreamParser,
    syntaxHighlighting,
    syntaxTree,
    TreeIndentContext,
} = CM["@codemirror/language"];

const {
    // languageData,
    languages,
} = ["@codemirror/language-data"];

const {
    IterMode,
    NodeProp,
    NodeType,
    NodeWeakMap,
    parseMixed,
    SyntaxNode,
    SyntaxNodeRef,
} = CM["@lezer/common"];

const {
    // HighlightStyle,
    styleTags,
    // tags,
} = CM["@lezer/highlight"];

const {
    ExternalTokenizer,
    InputStream,
    LRParser,
} = CM["@lezer/lr"];

const {
    Diagnostic,
    lintKeymap,
    setDiagnostics,
} = CM["@codemirror/lint"];

const {
    highlightSelectionMatches,
    RegExpCursor,
    SearchCursor,
    searchKeymap,
} = CM["@codemirror/search"];

const {
    Annotation,
    ChangeDesc,
    ChangeSet,
    CharCategory,
    codePointAt,
    codePointSize,
    combineConfig,
    Compartment,
    countColumn,
    EditorSelection,
    EditorState,
    EditorStateConfig,
    Extension,
    Facet,
    FacetReader,
    findClusterBreak,
    findColumn,
    Line,
    MapMode,
    Prec,
    Range,
    RangeCursor,
    RangeSet,
    RangeSetBuilder,
    RangeValue,
    SelectionRange,
    SpanIterator,
    StateEffect,
    StateEffectType,
    StateField,
    Text,
    TextIterator,
    Transaction,
    TransactionSpec,
} = CM["@codemirror/state"];

const {
    BidiSpan,
    BlockInfo,
    BlockType,
    closeHoverTooltips,
    Command,
    crosshairCursor,
    Decoration,
    DecorationSet,
    Direction,
    DOMEventHandlers,
    DOMEventMap,
    drawSelection,
    dropCursor,
    EditorView,
    EditorViewConfig,
    getDrawSelectionConfig,
    getPanel,
    gutter,
    gutterLineClass,
    GutterMarker,
    gutters,
    hasHoverTooltips,
    highlightActiveLine,
    highlightActiveLineGutter,
    highlightSpecialChars,
    highlightTrailingWhitespace,
    highlightWhitespace,
    hoverTooltip,
    layer,
    LayerMarker,
    lineNumberMarkers,
    logException,
    KeyBinding,
    keymap,
    lineNumbers,
    MatchDecorator,
    MouseSelectionStyle,
    Panel,
    panels,
    PanelConstructor,
    placeholder,
    PluginValue,
    PluginSpec,
    Rect,
    RectangleMarker,
    rectangularSelection,
    repositionTooltips,
    runScopeHandlers,
    showPanel,
    showTooltip,
    scrollPastEnd,
    Tooltip,
    tooltips,
    TooltipView,
    ViewPlugin,
    ViewUpdate,
    WidgetType,
} = CM["@codemirror/view"];

const {
    css,
    cssCompletionSource,
    cssLanguage,
    defineCSSCompletionSource,
} = CM["@codemirror/lang-css"];

const {
    sass,
    sassCompletionSource,
    sassLanguage,
} = CM["@codemirror/lang-sass"];


const {
    autoCloseTags,
    html,
    htmlCompletionSource,
    htmlLanguage,
} = CM["@codemirror/lang-html"];

const {
    completionPath,
    esLint,
    javascript,
    javascriptLanguage,
    jsxLanguage,
    localCompletionSource,
    scopeCompletionSource,
    snippets,
    tsxLanguage,
    typescriptLanguage,
} = CM["@codemirror/lang-javascript"];

const {
    json,
    jsonLanguage,
} = CM["@codemirror/lang-json"];

const {
    globalCompletion,
    python,
    pythonLanguage,
} = CM["@codemirror/lang-python"];

const {
    Cassandra,
    keywordCompletionSource,
    MariaSQL,
    MSSQL,
    MySQL,
    PLSQL,
    PostgreSQL,
    schemaCompletionSource,
    sql,
    SQLConfig,
    SQLDialect,
    SQLDialectSpec,
    SQLite,
    sqlLanguage,
    StandardSQL,
} = CM["@codemirror/lang-sql"];


const {
    color,
    oneDark,
    oneDarkHighlightStyle,
    oneDarkTheme,
} = CM["@codemirror/theme-one-dark"];

const keyMaps = [{
    key: 'Tab',
    run: ({
        state,
        dispatch
    }) => {
        if (state.selection.ranges.some(r => !r.empty)) {
            return indentMore({
                state,
                dispatch
            });
        }
        dispatch(
            state.update(state.replaceSelection('  '), {
                scrollIntoView: true,
                annotations: Transaction.userEvent.of('input'),
            })
        );
        return true;
    },
    shift: indentLess,
}];

// Initialize CodeMirror editor
const initializeEditor = (text, id, extensions) => {
    new EditorView({
        doc: text,
        extensions: [
            ...extensions,
            basicSetup,
            EditorState.allowMultipleSelections.of(true),
            EditorView.lineWrapping,
            // theme === "dark" ? darkTheme : lightTheme,
            oneDark,
            oneDarkTheme,
            keymap.of([
                ...closeBracketsKeymap,
                ...completionKeymap,
                ...defaultKeymap,
                ...foldKeymap,
                ...historyKeymap,
                ...keyMaps,
                ...lintKeymap,
                ...searchKeymap,
                {
                    key: "Tab",
                    run: acceptCompletion
                },
                indentWithTab,
                // keymap.of([uppercaseKeybinding]),
            ]),
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

const initializeEditorScss = (text, id) => {
    initializeEditor(text, id, [
        sass(),
        sassLanguage,
        sassLanguage.data.of({
            autocomplete: sassCompletionSource
        }),
    ]);
};

const initializeEditorJs = (text, id) => {
    initializeEditor(text, id, [
        javascript({
            eslint: true,
            jsx: true,
            tsx: true,
            typescript: true,
        }),
        javascriptLanguage.data.of({
            autocomplete: scopeCompletionSource(globalThis)
        }),
    ]);
};
const initializeEditorJson = (text, id) => {
    initializeEditor(text, id, [
        json(),
        jsonLanguage,
    ]);
};

const initializeEditorPython = (text, id) => {
    initializeEditor(text, id, [
        python(),
        pythonLanguage.data.of({
            autocomplete: globalCompletion
        }),
        // pythonLanguage.data.of({
        //     autocomplete: scopeCompletionSource(globalThis)
        // }),
    ]);
};

const initializeEditorSql = (text, id) => {
    initializeEditor(text, id, [
        // sql({
        //     mode: "text/x-mysql"
        // }),
        MySQL,
        // sqlLanguage.data.of({
        //     autocomplete: scopeCompletionSource(globalThis)
        // }),
    ]);
};


// ¿Qué es Fetch?
initializeEditorJs(`fetch('https://api.github.com/users/jcn-gh/repos')
.then(response => response.json())
.then(data => {
  console.log(data);
  const repoList = document.getElementById('repo-list');
  data.forEach(repo => {
    const repoElement = document.createElement('li');
    repoElement.textContent = \`\${repo.name} (\${repo.language})\`;
    repoList.appendChild(repoElement);
  });
})
.catch(error => console.error('Error:', error));`, 'editor01');
initializeEditorJs(`if ('fetch' in window) {
  // El navegador admite fetch, puedes utilizarla.
} else {
  // El navegador no admite fetch, debes usar una alternativa como XMLHttpRequest o una biblioteca como Axios.
}
`, 'editor02');
initializeEditorJs(`fetch('https://api.example.com/data')
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`, 'editor03');
initializeEditorJs(`fetch('https://api.example.com/data')
.then(response => {
  if (response.ok) { // La solicitud fue exitosa.
    return response.json();
  } else { // La solicitud falló.
    console.error('Error:', response.status);
  }
})
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`, 'editor04');
initializeEditorJs(`// No es recomendable.
import axios from 'axios';
axios.get('https://api.example.com/data')
  .then(response => response.data)
  .catch(error => console.error('Error:', error));`, 'editor05');
initializeEditorJs(`fetch('https://api.example.com/data', {
  method: 'POST',
  body: JSON.stringify({name: 'John', age: 30}),
  headers: { 'Content-Type': 'application/json' }
})
  .then(response => response.json())
  .catch(error => console.error('Error:', error));`, 'editor06');
initializeEditorJs(`fetch('https://api.example.com/data', {
  method: 'POST',
  body: new FormData(document.getElementById('myForm')),
  headers: { 'Content-Type': 'multipart/form-data' }
})
  .then(response => response.json())
  .catch(error => console.error('Error:', error));`, 'editor07');
initializeEditorJs(`fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 
    'Authorization': 'Bearer ' + yourToken,
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify({name: 'John', age: 30})
})
  .then(response => response.json())
  .catch(error => console.error('Error:', error));`, 'editor08');
initializeEditorJs(`fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 
    'Authorization': 'Bearer ' + yourToken,
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify({name: 'John', age: 30})
})
  .then(response => response.json())
  .catch(error => console.error('Error:', error));`, 'editor09');
initializeEditorJs(`fetch('https://api.example.com/data', {
  method: 'POST',
  headers: { 
    'Authorization': 'Bearer ' + yourToken,
    'Content-Type': 'application/json' 
  },
  body: JSON.stringify({name: 'John', age: 30})
})
  .then(response => response.json())
  .catch(error => console.error('Error:', error));`, 'editor10');
initializeEditorJs(`fetch('https://api.example.com/data', {
  method: 'GET',
  params: { name: 'John', age: 30 }
})
  .then(response => response.json())
  .catch(error => console.error('Error:', error));`, 'editor11');

// ¿Que es React Animate Height?

initializeEditorCss(`npm install react-animate-height`, 'editor21');
initializeEditorJs(`import React, { useState } from 'react';
import { AnimateHeight } from 'react-animate-height';

function MyComponent() {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <button onClick={toggleExpand}>
        {isExpanded ? 'Contraer' : 'Expandir'}
      </button>

      <AnimateHeight duration={500} height={isExpanded ? 'auto' : 0}>
        <div>
          Este es el contenido que se va a animar.
          {/* Agrega aquí el contenido que deseas animar */}
        </div>
      </AnimateHeight>
    </div>
  );
}

export default MyComponent;`, 'editor22');

// CSS Media Queries y su utilidad

initializeEditorCss(`@media media-type (condición) {
  /* estilos que se aplicarán cuando se cumpla la condición */
}`, 'editor30');
initializeEditorCss(`/* Por ejemplo, cambiar el tamaño de fuente, el espaciado, etc. */

/* Estilos para teléfonos móviles en orientación vertical */
@media screen and (max-width: 767px) and (orientation: portrait) {
  body {
    font-size: 14px;
    line-height: 1.5;
    padding: 10px;
  }
}

/* Estilos para tablet en orientación vertical */
@media screen and (min-width: 768px) and (max-width: 1023px) and (orientation: portrait) {
  body {
    font-size: 16px;
    line-height: 1.5;
    padding: 20px;
  }
}

/* Estilos para teléfonos móviles en orientación horizontal */
@media screen and (max-width: 767px) and (orientation: landscape) {
  body {
    font-size: 12px;
    line-height: 1.2;
    padding: 5px;
  }
}

/* Estilos para tablet en orientación horizontal */
@media screen and (min-width: 768px) and (max-width: 1023px) and (orientation: landscape) {
  body {
    font-size: 14px;
    line-height: 1.2;
    padding: 10px;
  }
}

/* Estilos solo para impresión */
@media print {
  body {
    font-size: 12px;
    line-height: 1.2;
    padding: 0;
  }
}`, 'editor31');

// ¿Qué es una base de datos SQL?

initializeEditorSql(`-- Ejemplo
WITH sales_volume AS (
    SELECT employee_id, SUM(total_price) AS sales_volume
    FROM orders
    GROUP BY employee_id
), top_sales AS (
    SELECT employee_id, sales_volume
    FROM sales_volume
    WHERE sales_volume > (SELECT AVG(sales_volume) FROM sales_volume)
)
SELECT e.employee_id, e.employee_name, t.sales_volume, COUNT(o.order_id) AS num_orders
FROM employees e
JOIN orders o ON e.employee_id = o.employee_id
JOIN top_sales t ON e.employee_id = t.employee_id
WHERE e.department = 'Sales'
GROUP BY e.employee_id, e.employee_name, t.sales_volume
ORDER BY t.sales_volume DESC, num_orders DESC;`, 'editor41');

// ¿Cuáles son algunos tipos de datos SQL?

initializeEditorSql(`-- Ejemplo INTEGER
CREATE TABLE Ejemplo (
    id INTEGER,
    cantidad INTEGER
);`, 'editor50');
initializeEditorSql(`-- Ejemplo VARCHAR
CREATE TABLE Ejemplo (
    nombre VARCHAR(50),
    descripcion VARCHAR(255)
);`, 'editor51');
initializeEditorSql(`-- Ejemplo CHAR
CREATE TABLE Ejemplo (
    codigo CHAR(10)
);`, 'editor52');
initializeEditorSql(`-- Ejemplo DATE
CREATE TABLE Ejemplo (
    fecha_registro DATE
);`, 'editor53');
initializeEditorSql(`-- Ejemplo BOOLEAN
CREATE TABLE Ejemplo (
    activo BOOLEAN
);`, 'editor54');
initializeEditorSql(`-- Ejemplo DECIMAL
CREATE TABLE Ejemplo (
    precio DECIMAL(10, 2)
);`, 'editor55');
initializeEditorSql(`-- Ejemplo FLOAT
CREATE TABLE Ejemplo (
    temperatura FLOAT
);`, 'editor56');
initializeEditorSql(`-- Ejemplo BLOB
CREATE TABLE Ejemplo (
    imagen BLOB
);`, 'editor57');
initializeEditorSql(``, 'editor58');