import { createContext, useContext, useEffect, useState } from "react";
import { usuarioLogado } from "../firebase/authentication";

const AuthContext = createContext();

function AuthProvider({ children }) {
    
    const [carregando, setCarregando] = useState(true);
    const [autenticado, setAutenticado] = useState(false);
    const [usuario, setUsuario] = useState(null);

    useEffect(() => {
        usuarioLogado(usuario => {
            setUsuario(usuario);
            setAutenticado(!!usuario);
            setCarregando(false);
        });
    }, []);

    if(carregando) return <div>Carregando...</div>

    return(
        <AuthContext.Provider value={{ autenticado, setAutenticado, usuario }}>
            { children }
        </AuthContext.Provider>
    );
}

function useAuth() {
    return useContext(AuthContext);
}

export { AuthProvider, useAuth };