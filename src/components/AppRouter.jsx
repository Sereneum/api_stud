import React, {useContext} from 'react';
import {Route, Routes} from "react-router-dom";
import {anonRoutes, authRoutes, publicRoutes} from "../routes";
import {observer} from "mobx-react-lite";
import {Context} from "../index";

const AppRouter = observer(() => {

    const {user} = useContext(Context)

    return (
        <Routes>
            {
                user.isAuth
                    ?
                    authRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={<Component/>}/>
                    )
                    :
                    anonRoutes.map(({path, Component}) =>
                        <Route key={path} path={path} element={<Component/>}/>
                    )
            }
        </Routes>
    );
});

export default AppRouter;