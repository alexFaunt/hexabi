import React from 'react';

import { createHistory, useBasename } from 'history'
import { Router, Route, Link, History, Lifecycle } from 'react-router'

import App from './components/App';

const history = useBasename(createHistory)({
  basename: '/transitions'
})

if (typeof document !== 'undefined') {
    React.render(<App />, document.getElementById('content'));
}

export default App;
