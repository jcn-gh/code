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
    shell,
} = ["@codemirror/legacy-modes/mode/shell"];

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


const initializeEditorShell = (text, id) => {
    initializeEditor(text, id, [
        StreamLanguage.define(shell),
        // ({
        //     mode: "text/x-sh"
        // }),
    ]);
};

// ¿Por qué utilizamos rutas de guardia?
initializeEditorCss(`npm install react-router-dom`, 'editor00');
initializeEditorJs(`import { BrowserRouter as Router } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      {/* Las rutas van aquí */}
    </Router>
  );
}`, 'editor01');
initializeEditorJs(`import { BrowserRouter as Router, Route } from 'react-router-dom';

export default function App() {
  return (
    <Router>
      <Route path="/about" component={About} />
    </Router>
  );
}

function About() {
  return <>about</>   
}`, 'editor02');
initializeEditorJs(`import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Route path="/" render={() => <Home />} />
      <Route path="/about" component={About} />
    </Router>
  );
}

function Home() {
  return <>home</>;
}

function About() {
  return <>about</>;
}`, 'editor03');
initializeEditorJs(`import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Route path="/about">
        <About />
      </Route>
    </Router>
  );
}`, 'editor04');
initializeEditorJs(`import { BrowserRouter as Router, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />  // visible en todas las páginas
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
    </Router>
  );
}

function Navbar() {
  return <>navbar</>
}

function Home() {
  return <>home</>;
}

function About() {
  return <>about</>;
}`, 'editor05');
initializeEditorJs(`import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}`, 'editor06');
initializeEditorJs(`import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="*" component={NotFound} />
      </Switch>
    </Router>
  );
}

function NotFound() {
  return <>Ha llegado a una página que no existe</>;
}`, 'editor07');
initializeEditorJs(`import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
      </Switch>
    </Router>
  );
}

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
    </nav>
  )
}`, 'editor08');
initializeEditorJs(`import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
  
  export default function App() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <PrivateRoute path="/hidden" component={Hidden} />
        </Switch>
      </Router>
    );
  }
  
  function PrivateRoute({ component: Component, ...rest }) {
    // useAuth es un hook personalizado para obtener el estado de autenticación del usuario actual
    const isAuth = useAuth();
  
    return (
      <Route
        {...rest}
        render={(props) =>
          isAuth ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }
  
  function Home() {
    return <>home</>;
  }
  
  function Hidden() {
    return <>hidden</>;
  }`, 'editor10');
initializeEditorJs(`import { useHistory } from "react-router-dom";


  function About() {
    const history = useHistory();
      
    console.log(history.location.pathname); // '/about'
  
    return (
      <>
       <h1>La página about esta en: {history.location.pathname}</h1>
      </>
    );
  }`, 'editor11');
initializeEditorJs(`import { useHistory } from "react-router-dom";


  function About() {
    const history = useHistory();
      
    console.log(history.location.pathname); // '/about'
  
    return (
      <>
       <h1>La página about se encuentra en: {history.location.pathname}</h1>
       <button onClick={() => history.push('/')}>Ir a la página de inicio</button>
      </>
    );
  }`, 'editor12');
initializeEditorJs(`import { useLocation } from "react-router-dom";


  function About() {
    const location = useLocation();
      
    console.log(location.pathname); // '/about'
  
    return (
      <>
       <h1>La página about esta en: {location.pathname}</h1>
      </>
    );
  }`, 'editor13');
initializeEditorJs(`import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
  
  export default function App() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blog/:postSlug" component={BlogPost} />
        </Switch>
      </Router>
    );
  }
  
  function Home() {
    return <>home</>;
  }
  
  function BlogPost() {
    return <>blog post</>;
  }`, 'editor14');
initializeEditorJs(`import React from "react";
import { BrowserRouter as Router, Switch, Route, useParams } from "react-router-dom";
  
  export default function App() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/blog/:postSlug" component={BlogPost} />
        </Switch>
      </Router>
    );
  }
  
  function Home() {
    return <>home</>;
  }
  
  function BlogPost() {
    const [post, setPost] = React.useState(null);
    const { postSlug } = useParams();
  
    React.useEffect(() => {
      fetch(\`https://jsonplaceholder.typicode.com/posts/\${postSlug}\`)
        .then((res) => res.json())
        .then((data) => setPost(data));
    }, [postSlug]);
  
    if (!post) return null;
  
    return (
      <>
        <h1>{post.title}</h1>
        <p>{post.description}</p>
      </>
    );
  }`, 'editor15');
initializeEditorJs(`import { useRouteMatch } from "react-router-dom";

  function BlogPost() {
    const isBlogPostRoute = useRouteMatch("/blog/:postSlug");
   
    // mostrar, ocultar el contenido o hacer otra cosa
  }`, 'editor16');