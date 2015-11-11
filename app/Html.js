import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';

/**
 * Wrapper component containing HTML metadata and boilerplate tags.
 * Used in server-side code only to wrap the string output of the
 * rendered route component.
 *
 * The only thing this component doesn't (and can't) include is the
 * HTML doctype declaration, which is added to the rendered output
 * by the server.js file.
 */
export default class Html extends Component {
    static propTypes = {
        assets: PropTypes.object,
        component: PropTypes.node,
        store: PropTypes.object
    }

    render() {
        const { assets, component, store } = this.props;
        const content = component ? ReactDOM.renderToString(component) : '';

        return (
            <html lang="en-us">
                <head>
                    <title>Hexabi</title>
                    { DocumentMeta.renderAsReact() }
                    <meta name="viewport" content="initial-scale=1.0, user-scalable=no, width=device-width, minimal-ui" />
                    <link rel="shortcut icon" href="/favicon.ico" />
                    <link rel="stylesheet" type="text/css" href="/static/css/normalise.css" />
                    <link rel="stylesheet" type="text/css" href="/static/css/global.css" />
                    <link rel="stylesheet" type="text/css" href="/build/bundle.css" />
                </head>
                <body>
                    <div id="content" dangerouslySetInnerHTML={{__html: content}}/>
                    <script dangerouslySetInnerHTML={{__html: `window.__INITIAL_STATE__=${serialize(store.getState())};`}} charSet="UTF-8"/>
                    <script src="/build/client-bundle.js"></script>
                </body>
            </html>
        );
    }
}
