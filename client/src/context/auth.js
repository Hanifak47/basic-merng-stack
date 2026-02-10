import React, { useReducer, createContext } from 'react'

import jwtDecode from 'jwt-decode'

const initialState = {
    user: null
}

if (localStorage.getItem("jwtToken")) {

    const decodedToken = jwtDecode(localStorage.getItem('jwtToken'));

    if (decodedToken.exp * 1000 < Date.now()) {
        localStorage.removeItem('jwtToken');
    } else {
        initialState.user = decodedToken;
    }

}


// membuat sebuah context, diibaratkan sebagai channle radio
const AuthContext = createContext({
    user: null,
    login: (userData) => { },
    logout: () => { }
})

// fungsi kelola state
// reducer slealu menerima state saat ini dan aksinya bagaimana
function authReducer(state, action) {
    switch (action.type) {
        case 'LOGIN':
            return {
                ...state,
                user: action.payload
            }
        case 'LOGOUT':
            return {
                ...state,
                user: null
            }
        default:
            return state;
    }
}

// context yang sudah dibuat disebar luaskan
function AuthProvider(props) {
    // menggunakan method authreducer dengan default value user null
    // state saat ini
    // dispatch = gungsi kelola action
    const [state, dispatch] = useReducer(authReducer, initialState);


    // fungsi wrapper dalam js fungsi bisa dalam fungsi bahkan variabel berupa fungsi bisa krn fungsi di js merupakan first class
    function login(userData) {
        // simpan token internal
        localStorage.setItem("jwtToken", userData.token)

        // perlu dispatch agar terre render, 
        dispatch({
            type: 'LOGIN',
            payload: userData
        })
    }

    // fungsi wrapper
    function logout() {

        // hapus token
        localStorage.removeItem("jwtToken");

        // perlu dispatch agar terre render, 
        dispatch({ type: 'LOGOUT' });
    }

    // auth context yhang diproviderkan ini digunakan pada app js
    return (
        <AuthContext.Provider value={{ user: state.user, login, logout }} {...props} />
    )
}

export { AuthContext, AuthProvider }