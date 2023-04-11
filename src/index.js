import React, { createContext } from 'react';
import ReactCSSTransitionGroup from 'react-transition-group';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/userStore";
import CourseStore from "./store/courseStore";
import Sky from "./components/Sky/Sky";
import SizeStore from "./store/sizeStore";
import './night.css'
import Night from './components/Night';
export const Context = createContext(null)

window.onload = function () {
    document.body.classList.add('loaded_hiding');
    window.setTimeout(function () {
        document.body.classList.add('loaded');
        document.body.classList.remove('loaded_hiding');
    }, 500);
}

const root = ReactDOM.createRoot(document.getElementById('root'));
// root.style['']
root.render(
    <div style={{ backgroundColor: 'black' }}>
        {/* <Sky /> */}
        <Context.Provider value={{
            user: new UserStore(),
            course: new CourseStore(),
            sizeStore: new SizeStore()
        }}>
            <App />
        </Context.Provider>
    </div>
);
