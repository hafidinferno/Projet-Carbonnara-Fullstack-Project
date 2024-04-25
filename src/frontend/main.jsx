import { hydrateRoot } from 'react-dom/client';
import App from './App';
import "./CSS/index.css";
import "./CSS/App.css";

if(typeof window !== 'undefined') {
    hydrateRoot(document.getElementById('app'), <App />);
}

