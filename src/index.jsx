import React from 'react';
import ReactDOM from 'react-dom';

console.log('Hello World!');

ReactDOM.render(
    <div>Hello World!</div>,
    document.getElementById('root')
);

if (module.hot) {
    module.hot.accept();
}
