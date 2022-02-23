import { createContext, useReducer } from 'react';


const modalReducer = (state, action) => {
    switch (action.type) {
      case 'push':
        return [action.modal, ...state];
      case 'pop':
        if (state.length > 1) {
          return state.filter((_, i) => i !== 0);
        } else {
          return [];
        }
      case 'clear':
        return [];
    }
};

export const AppContext = createContext({
    modals: [],
    dispatchModal: () => {},
    noScroll: false,
    loginUser: null,
    isLogin: false,
    loginUserId: 0,
    labId: 0,
    setLoginUser: () => {},
    accessToken: '',
    setAccessToken: () => {}
});

export function AppProvider(props) {
    const { children } = props;
    const [modals, dispatchModal] = useReducer(modalReducer, []);

    const appValue = {
        modals,
        dispatchModal
    };

    return (
        <AppContext.Provider value={appValue}>
            {children}
        </AppContext.Provider>
      );
}