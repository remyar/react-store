import React from 'react';

const StoreContext = React.createContext();

const reducer = (oldState, newState) => {
    return { ...oldState, ...newState };
}

const StoreProvider = (props) => {

    return <StoreContext.Provider value={React.useReducer(reducer, { ...(props.globalState || {}) })} >
        {props.children}
    </StoreContext.Provider>;
};




export const useStore = () => {

    const [globalState, dispatch] = React.useContext(StoreContext);

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


export default StoreProvider;