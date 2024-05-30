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
initializeEditorCss(`npm i striptags`, 'editor20');
initializeEditorCss(`yarn add striptags`, 'editor21');
initializeEditorJs(`const striptags = require('striptags');

const textoConEtiquetas = '<p>Este es un <strong>texto</strong> con <em>etiquetas</em>.</p>';
const textoSinEtiquetas = striptags(textoConEtiquetas);

console.log(textoSinEtiquetas);`, 'editor22');
initializeEditorJs(`import React, { useRef, useEffect } from 'react';

function MyComponent() {
  const textRef = useRef(null);

  useEffect(() => {
    const element = textRef.current;
    const parentElement = element.parentElement;

    if (element.offsetWidth < element.scrollWidth) {
      parentElement.style.overflow = 'hidden';
      parentElement.style.textOverflow = 'ellipsis';
      parentElement.style.whiteSpace = 'nowrap';
    }
  }, []);

  return (
    <div style={{ width: '200px', border: '1px solid black' }}>
      <p ref={textRef}>
        {/* Aquí va el contenido largo que quieres truncar */}
      </p>
    </div>
  );
}`, 'editor30');
initializeEditorCss(`npm install react-truncate`, 'editor31');
initializeEditorCss(`yarn add react-truncate`, 'editor32');
initializeEditorJs(`import React from 'react';
import Truncate from 'react-truncate';

const MyComponent = () => {
  const text = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, risus vel posuere malesuada, odio nulla tincidunt nibh, nec tincidunt mi mauris vel nunc.';

  const renderTruncate = ({ text, isTruncated }) => (
    <div>
      <Truncate
        lines={2}
        ellipsis={<span>...</span>}
        trimWhitespace
        dangerouslyUseHTML
      >
        <p>{text}</p>
      </Truncate>
      {isTruncated && <button>Mostrar más</button>}
    </div>
  );

  return (
    <div>
      <h1>My Component</h1>
      {renderTruncate({ text })}
    </div>
  );
};

export default MyComponent;`, 'editor33');
initializeEditorJs(`import React from 'react';
import ReactHtmlParser, { processNodes, convertNodeToElement } from 'react-html-parser';

const htmlString = '<p>Este es un <strong>ejemplo</strong> de HTML.</p>';

const MyComponent = () => {
  return (
    <div>
      {ReactHtmlParser(htmlString)}
    </div>
  );
};

export default MyComponent;`, 'editor40');
initializeEditorCss(`npm install redux react-redux`, 'editor50');
initializeEditorJs(`import { createStore } from 'redux';

// Define el reducer
const initialState = {
  count: 0
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { ...state, count: state.count + 1 };
    case 'DECREMENT':
      return { ...state, count: state.count - 1 };
    default:
      return state;
  }
}

// Crea el store
const store = createStore(reducer);

export default store;`, 'editor51');
initializeEditorJs(`import React from 'react';
import { connect } from 'react-redux';

function Counter({ count, increment, decrement }) {
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
    </div>
  );
}

// Conecta el componente a Redux
const mapStateToProps = state => ({
  count: state.count
});

const mapDispatchToProps = dispatch => ({
  increment: () => dispatch({ type: 'INCREMENT' }),
  decrement: () => dispatch({ type: 'DECREMENT' })
});

export default connect(mapStateToProps, mapDispatchToProps)(Counter);`, 'editor52');
initializeEditorJs(`const withLogging = (WrappedComponent) => {
  return class extends React.Component {
    componentDidMount() {
      console.log(\`Componente \${WrappedComponent.name} montado\`);
    }

    componentDidUpdate() {
      console.log(\`Componente \${WrappedComponent.name} actualizado\`);
    }

    componentWillUnmount() {
      console.log(\`Componente \${WrappedComponent.name} desmontado\`);
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  };
};

const MyComponent = () => {
  return <div>Hola mundo</div>;
};

const LoggedMyComponent = withLogging(MyComponent);

// Usar el componente con la funcionalidad adicional de registro`, 'editor60');