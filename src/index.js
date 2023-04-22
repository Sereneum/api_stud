import React, { createContext } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/userStore";
import CourseStore from "./store/courseStore";
import Sky from "./components/Sky/Sky";
import SizeStore from "./store/sizeStore";
import Binder from "./store/binder";
import './night.css'
import Night from './components/Night';
import SchStore from "./store/schStore";
export const Context = createContext(null)

window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <div style={{ backgroundColor: 'black' }}>
        <Context.Provider value={{
            user: new UserStore(),
            course: new CourseStore(),
            sizeStore: new SizeStore(),
            binder: new Binder(),
            schStore: new SchStore()
        }}>
            <App />
        </Context.Provider>
    </div>
);
