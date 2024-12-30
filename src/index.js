import React , { createContext , useReducer, useContext } from 'react';

const StoreContext = createContext();

const reducer = (oldState, newState) => {
    return { ...oldState, ...newState };
}

function StoreProvider(props) {
    return <StoreContext.Provider value={useReducer(reducer, { ...(props.globalState || {}) }) } >
        {props.children}
    </StoreContext.Provider>;
};

function useStore() {

    const [globalState, dispatch] = useContext(StoreContext);

    return [globalState, async (updater, ..._args) => {

        let obj = undefined;

        if (updater?.constructor?.name == 'Promise') {

            async function _process() {
                return new Promise((resolve, reject) => {
                    updater.then(r => resolve(r)).catch(err => reject(err));
                })
            }

            obj = await _process();
        }

        dispatch(obj == undefined ? updater : obj);

        return obj == undefined ? updater : obj;

    }]
}

export { StoreProvider, useStore };