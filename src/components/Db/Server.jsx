import React, {useEffect, useState} from 'react';
import {$serverHost} from "../../http";
import {addUserData, getUserData, isFindUserInServer} from "../../http/serverAPI";
import {useLoading} from "../../hooks/useLoading";
import {getActiveElement} from "@testing-library/user-event/dist/utils";


const Server = () => {


    let email = "tree_en@mail.ru"
    let active = {color: 'white', margin: 'auto', fontSize: 32}
    let passive = {gun: "ak-47"}


        useLoading({
            func: getUserData,
            args: {email},
            setter: d => console.log(d)
        }).then()


    return (
        <div style={{color: 'white', margin: 'auto', fontSize: 32}}>
        </div>
    );
};

export default Server;