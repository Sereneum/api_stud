import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import UserStore from "./store/userStore";
import CourseStore from "./store/courseStore";
import Sky from "./components/Sky/Sky";
import SizeStore from "./store/sizeStore";

export const Context = createContext(null)

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Sky />
        <Context.Provider value={{
            user: new UserStore(),
            course: new CourseStore(),
            sizeStore: new SizeStore()
        }}>
            <App/>
        </Context.Provider>
    </>
);
