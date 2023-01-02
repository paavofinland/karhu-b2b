import '../styles/main.css';
import './lib/hmr';
import { component, picoapp } from 'picoapp';

import './async';

window.app = picoapp({}, {});
window.component = component;
window.vendors = name => window.app.emit(`${name}:loaded`);

// app.on('mount', () => console.info('♻️ Mounting'));
