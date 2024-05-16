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

// ¿Qué es un operador ternario?

initializeEditorJs(`let resultado = x > 33 ? "Mayor a 33" : "Menor o igual a 33";`, 'editor20');

// ¿Qué es el código dinámico?

initializeEditorJs(`const code = 'function suma(a, b) { return a + b; }';
const func = new Function('a', 'b', code);
console.log(func(2, 3)); // Salida: 5`, 'editor00');

initializeEditorPython(`import pytest

def dynamic_test(name):
    code = f'def test_{name}(): pass'
    exec(code)
    return eval(f'test_{name}')

@pytest.mark.parametrize("test_name", ["test1", "test2"])
def test_dynamic_tests(test_name):
    dynamic_test(test_name)
`, 'editor01');

initializeEditorPython(`import ast

code = 'print("Hello World!")'
tree = compile(code, "<string>", "exec")
exec(tree)
`, 'editor02');

initializeEditorJs(`function crearMensaje(nombre, edad) {
  let mensaje = \`Hola \${nombre}, eres un adulto\`;
  if (edad < 18) {
    mensaje = \`Hola \${nombre}, aún no eres adulto\`;
  }
  return mensaje;
}

let usuario = { nombre: "Juan", edad: 25 };
console.log(crearMensaje(usuario.nombre, usuario.edad)); // Imprime "Hola Juan, eres un adulto"

usuario.edad = 17;
console.log(crearMensaje(usuario.nombre, usuario.edad)); // Imprime "Hola Juan, aún no eres adulto"
`, 'editor03');
