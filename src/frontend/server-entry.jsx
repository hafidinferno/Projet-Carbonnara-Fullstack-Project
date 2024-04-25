import { renderToString } from 'react-dom/server';
 
import App from './App';
 
export const render = () => {
    if(typeof window !== 'undefined') {
        return renderToString(<App />);
    }
};