import React, { createContext, useState, useContext } from 'react';

const CallContext = createContext();

export const useCall = () => {
    return useContext(CallContext);
};

export const CallProvider = ({ children }) => {
    const [incomingCall, setIncomingCall] = useState(null);

    return (
        <CallContext.Provider value={{ incomingCall, setIncomingCall }}>
            {children}
        </CallContext.Provider>
    );
};
