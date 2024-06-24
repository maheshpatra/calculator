import React, { createContext, useState, useContext } from 'react';
import Wrapper from '../Component/Wrapper';

const CallContext = createContext();

export const useCall = () => {
    return useContext(CallContext);
};

export const CallProvider = ({ children }) => {
    const [incomingCall, setIncomingCall] = useState(null);

    return (
        <CallContext.Provider value={{ incomingCall, setIncomingCall }}>
            <Wrapper>
            {children}
            </Wrapper>
        </CallContext.Provider>
    );
};
