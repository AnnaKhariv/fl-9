import '../styles/styles.css';
import {render} from "./interface-module";


window.addEventListener('load', () => {
    let root = document.getElementById('root');
    render(root);
});