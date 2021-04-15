import React,{createContext,useContext,useReducer}from "react";

export const StateContext = createContext();
export const StateProvider = ({providerreducer,providerinitialState,children})=>(
    <StateContext.Provider value={useReducer(providerreducer, providerinitialState)}>
        {children}
    </StateContext.Provider>
);

export const useStateValue = () =>useContext(StateContext);
