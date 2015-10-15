import React from 'react';

import router from './router';

if (typeof document === 'undefined') {
    throw 'no document, wtf';
};

React.render(router, document.getElementById('content'));
