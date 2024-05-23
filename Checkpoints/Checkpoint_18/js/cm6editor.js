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

// ¿Cuál es la diferencia entre estado local y estado global en React?

initializeEditorJs(`class Counter extends React.Component {
    constructor(props) {
    super(props);
    this.state = { count: 0 };
    }

    render() {
    return (
        <div>
        <p>Recuento: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
            Incremento
        </button>
        </div>
    );
    }
}`, 'editor00');

initializeEditorJs(`const MyContext = React.createContext();

function App() {
    return (
    <MyContext.Provider value={{ count: 0 }}>
        <Counter />
    </MyContext.Provider>
    );
}

function Counter() {
    const { count } = useContext(MyContext);

    return (
    <div>
        <p>Recuento: {count}</p>
        <button onClick={() => /* actualizar el estado global */}>
        Incremento
        </button>
    </div>
    );
}`, 'editor01');
initializeEditorJs(`import { createStore } from 'redux';
import { Provider } from 'react-redux';

const store = createStore((state = { count: 0 }), (state, action) => ({ ...state, ...action.payload }));

function Counter() {
    const { count } = useSelector((state) => state);

    return (
    <div>
        <p>Recuento: {count}</p>
        <button onClick={() => dispatch({ type: 'INCREMENT_COUNT' })}>
        Incremento
        </button>
    </div>
    );
}`, 'editor02');
initializeEditorJs(`import create from 'zustand';

const useStore = create((set) => ({
  count: 0,
  incrementCount: () => set((state) => ({ count: state.count + 1 })),
}));

function Counter() {
  const count = useStore((state) => state.count);
  const incrementCount = useStore((state) => state.incrementCount);

  return (
    <div>
      <p>Recuento: {count}</p>
      <button onClick={incrementCount}>
        Incremento
      </button>
    </div>
  );
}`, 'editor03');

// ¿Qué es React Router?
initializeEditorCss(`npm install react-router-dom`, 'editor20');
initializeEditorCss(`yarn add react-router-dom`, 'editor21');
initializeEditorJs(`import { BrowserRouter, Route, Switch } from 'react-router-dom';`, 'editor22');
initializeEditorJs(`import Home from './Home';
import About from './About';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
    </Switch>
  </BrowserRouter>
);`, 'editor23');
initializeEditorJs(`import { Link } from 'react-router-dom';

const Header = () => (
  <nav>
    <ul>
      <li><Link to="/">Home</Link></li>
      <li><Link to="/about">About</Link></li>
    </ul>
  </nav>
);`, 'editor24');
initializeEditorJs(`import { Route } from 'react-router-dom';

const App = () =>; (
  <div>
    <Route path="/" component={Home} />
    <Route path="/about" component={About} />
  </div>
);`, 'editor25');
initializeEditorJs(`import { BrowserRouter, Route, Link } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Route exact path="/" component={Home} />
    <Route path="/about" component={About} />
  </BrowserRouter>
);`, 'editor26');
initializeEditorJs(`import { BrowserRouter, Route, Link, useParams } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Route path="/users/:id" component={UserDetails} />
  </BrowserRouter>
);

const UserDetails = () => {
  const { id } = useParams();
  return (
    <div>
      User {id}
    </div>
  );
};`, 'editor27');
initializeEditorJs(`import { BrowserRouter, Route, Link, Redirect } from 'react-router-dom';

const App = () => (
  <BrowserRouter>
    <Route path="/protected" component={Protected} />
    <Redirect from="/" to="/login" />
  </BrowserRouter>
);

const Protected = () => {
  // Solo se muestra si el usuario está autenticado
  return (
    <div>Contenido protegido</div>
  );
};`, 'editor28');
initializeEditorJs(`import React from "react";
import { Helmet } from "react-helmet";

class Application extends React.Component {
  render () {
    return (
        <div className="application">
            <Helmet>
                <meta charSet="utf-8" />
                <title>My awesome app</title>
                <link
                  rel="canonical"
                  href="my.awesome.app.com"
                />
            </Helmet>
            // el resto del código
        </div>
    );
  }
};`, 'editor29');

// ¿Qué son Link y NavLink en React Router?

initializeEditorJs(`import { Link } from 'react-router-dom';

<Link to="/about">About</Link>`, 'editor30');
initializeEditorJs(`import { NavLink } from 'react-router-dom';

<NavLink to="/about" activeClassName="active">About</NavLink>`, 'editor31');
initializeEditorJs(`import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

function App() {
  return (
    <Router>
      <nav>
        <NavLink to="/" exact>Home</NavLink>
        <NavLink to="/about" exact>About</NavLink>
        <NavLink to="/contact" exact>Contact</NavLink>
      </nav>

      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </Router>
  );
}

function Home() {
  return <h1>Home</h1>;
}

function About() {
  return <h1>About</h1>;
}

function Contact() {
  return <h1>Contact</h1>;
}`, 'editor32');
initializeEditorJs(`import React from 'react';
import { Link, NavLink } from 'react-router-dom';

const ExampleComponent = () => {
  const activeStyle = {
    color: 'red',
    fontWeight: 'bold'
  };

  return (
    <div>
      <h1>Example Component</h1>
      <nav>
        <ul>
          <li>
            <NavLink
              to="/home"
              exact
              activeStyle={activeStyle}
              activeClassName="active"
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              activeStyle={activeStyle}
              activeClassName="active"
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              activeStyle={activeStyle}
              activeClassName="active"
            >
              Contact
            </NavLink>
          </li>
        </ul>
      </nav>
      <Link to="/external-link" target="_blank">
        External Link
      </Link>
    </div>
  );
};

export default ExampleComponent;`, 'editor33');

// ¿Cómo se manejan los formularios en React?

initializeEditorJs(`import React, { useState } from 'react';

function FormExample() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  // ...
}`, 'editor40');
initializeEditorJs(`function FormExample() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ...
}`, 'editor41');
initializeEditorJs(`function FormExample() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form>
      <input type="text" name="name" value={formData.name} onChange={handleChange} />
      <input type="email" name="email" value={formData.email} onChange={handleChange} />
      {/* ... */}
    </form>
  );
}`, 'editor42');
initializeEditorJs(`function FormExample() {
  const [formData, setFormData] = useState({ name: '', email: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Realizar alguna acción con los datos del formulario, como enviarlos a un servidor
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* ... */}
      <button type="submit">Enviar</button>
    </form>
  );
}`, 'editor43');
initializeEditorJs(`import React, { useState } from 'react';

function Form() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Form submitted:', name, email);
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Nombre:
        <input type="text" value={name} onChange={(event) => setName(event.target.value)} />
      </label>
      <br />
      <label>
        Correo electrónico:
        <input type="email" value={email} onChange={(event) => setEmail(event.target.value)} />
      </label>
      <br />
      <button type="submit">Enviar</button>
    </form>
  );
}`, 'editor44');

// ¿Qué son los ciclos de vida en React?

initializeEditorJs(`class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }
  // ...
}`, 'editor50');
initializeEditorJs(`import React, { Component } from 'react';

class MyComponent extends Component {
  componentDidMount() {
    // Código a ejecutar después de que el componente se haya montado en el DOM
    console.log('Componente montado');
    
    // Ejemplo: Realizar una llamada a una API
    fetch('https://api.example.com/data')
      .then(response => response.json())
      .then(data => {
        console.log(data);
        // Realizar alguna acción con los datos obtenidos
      })
      .catch(error => {
        console.error('Error al obtener datos:', error);
      });
  }

  render() {
    return (
      <div>
        {/* Contenido del componente */}
      </div>
    );
  }
}

export default MyComponent;`, 'editor51');

initializeEditorJs(`class MyComponent extends React.Component {
  static getDerivedStateFromProps(props, state) {
    if (props.count !== state.count) {
      return { count: props.count };
    }
    return null;
  }
  // ...
}`, 'editor52');
initializeEditorJs(`class MyComponent extends React.Component {
  render() {
    return <div>{this.state.count}</div>;
  }
  // ...
}`, 'editor53');
initializeEditorJs(`class MyComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // Comparar las props y el estado actuales con los próximos valores
    if (this.props.count !== nextProps.count) {
      return true; // Actualizar el componente
    }
    return false; // No actualizar el componente
  }
  // ...
}`, 'editor54');
initializeEditorJs(`import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentWillUpdate(nextProps, nextState) {
    // Compara las props y el estado actuales con los próximos valores
    if (nextState.count !== this.state.count) {
      console.log('El valor de count va a cambiar:', nextState.count);
    }
  }

  incrementCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Incrementar</button>
      </div>
    );
  }
}

export default MyComponent;`, 'editor54_0');
initializeEditorJs(`import React from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Compara las props y el estado anteriores con los actuales
    if (prevState.count !== this.state.count) {
      console.log('El valor de count ha cambiado:', this.state.count);
    }
  }

  incrementCount = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={this.incrementCount}>Incrementar</button>
      </div>
    );
  }
}

export default MyComponent;`, 'editor54_1');
initializeEditorJs(`class MyComponent extends React.Component {
  componentWillUnmount() {
    // Limpiar recursos, como temporizadores
    clearTimeout(this.timer);
  }
  // ...
}`, 'editor55');
initializeEditorJs(`class MyComponent extends React.Component {
  componentDidUnmount() {
    // No realizar ninguna acción aquí
  }
  // ...
}`, 'editor56');
initializeEditorJs(`class MyComponent extends React.Component {
  componentDidCatch(error, info) {
    // Registrar el error y la información de la pila
    console.error(error);
    console.error(info);
    // Mostrar un mensaje de error al usuario
    this.setState({ errorMessage: 'Ocurrió un error' });
  }
  // ...
}`, 'editor57');
initializeEditorJs(`import React, { useState, useEffect } from 'react';

class Example extends React.Component {
                        <div id="editor50"></div>
                        <div id="editor50"></div>
  constructor(props) { // Se llama cuando se crea el componente
    super(props);
    this.state = { count: 0 };
  }

  // Ciclo de vida: Montaje
  componentDidMount() { // Se llama cuando el componente se monta (es decir, después de que el componente se haya montado en el DOM) por primera vez.
    console.log('Component did mount!');
  }

  // Ciclo de vida: Actualización
  componentDidUpdate() { // Se llama después de que el componente se haya actualizado con nuevos datos o cambios en los props.
    console.log('Component updated!');
  }

  // Ciclo de vida: Desmontaje
  componentWillUnmount() { // Se llama antes de que el componente se desmonte del DOM (es decir, eliminado del DOM).
    console.log('Component will unmount!');
  }

  // Manejo de errores
  componentDidCatch(error, info) { // Se llama cuando el componente tiene un error que necesita ser tratado.
    console.error('Error:', error);
  }

  render() {
    return (
      <div>
        <p>Count: {this.state.count}</p>
        <button onClick={() => this.setState({ count: this.state.count + 1 })}>
          Increment
        </button>
      </div>
    );
  }
}

export default Example;`, 'editor58');

initializeEditorJs(`import React, { useState, useEffect } from 'react';

class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
    console.log('Constructor');
  }

  componentDidMount() {
    console.log('Component Did Mount');
  }

  componentDidUpdate() {
    console.log('Component Did Update');
  }

  componentWillUnmount() {
    console.log('Component Will Unmount');
  }

  handleClick = () => {
    this.setState(prevState => ({
      count: prevState.count + 1
    }));
  };

  render() {
    console.log('Render');
    return (
      <div>
        <h1>Count: {this.state.count}</h1>
        <button onClick={this.handleClick}>Increment</button>
      </div>
    );
  }
}

function MyFunctionalComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log('useEffect');
    return () => {
      console.log('useEffect cleanup');
    };
  }, []);

  useEffect(() => {
    console.log('useEffect with count dependency');
  }, [count]);

  const handleClick = () => {
    setCount(count + 1);
  };

  return (
    <div>
      <h1>Count: {count}</h1>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
}

function App() {
  return (
    <div>
      <MyComponent />
      <MyFunctionalComponent />
    </div>
  );
}

export default App;`, 'editor59');