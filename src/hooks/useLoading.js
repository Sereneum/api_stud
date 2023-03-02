import React, {useState, useEffect} from 'react';


export const useLoading = async ({func, args=null, setter=null, loader=null, deps=[]}) => {

    useEffect(() => {
        func(args).then(d => {
            if(setter) setter(d)
            if(loader) loader()
        })
    }, deps);
}

