import { useState, useEffect } from 'react';
import axios from 'axios';

export default function CategoriasList() {
    const API_URL = "http://localhost:8001/api";

    const [categorias, setCategorias] = useState([]);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState(null);
    
    const [email, setEmail] = useState('admin@admin.com'); 
    const [password, setPassword] = useState('elian');
    const [token, setToken] = useState(localStorage.getItem('token'));

    const manejarLogin = async (e) => {
        e.preventDefault();
        setError(null);
        setCargando(true);

        try {
            const respuesta = await axios.post(`${API_URL}/login`, { 
                email, 
                password 
            }, {
                headers: { 'Accept': 'application/json' }
            });

            const nuevoToken = respuesta.data.access_token;
            localStorage.setItem('token', nuevoToken);
            setToken(nuevoToken);
        } catch (err) {
            console.error("Error Login:", err.response);
            setError(err.response?.data?.message || "Error al iniciar sesión");
        } finally {
            setCargando(false);
        }
    };

    const obtenerCategorias = async () => {
        if (!token) return;

        setCargando(true);
        setError(null);
        try {
            const respuesta = await axios.get(`${API_URL}/categorias`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Accept': 'application/json'
                }
            });
            setCategorias(respuesta.data);
        } catch (err) {
            if (err.response?.status === 401 || err.message === 'Network Error') {
                setError("Sesión expirada, inválida o error de red. Por favor, inicia sesión nuevamente.");
                cerrarSesion();
            } else if (err.response?.status === 404) {
                setError("No se encontraron categorías (404)");
            } else {
                setError("Error inesperado al cargar categorías");
            }
            setCategorias([]);
        } finally {
            setCargando(false);
        }
    };

    const cerrarSesion = () => {
        localStorage.removeItem('token');
        setToken(null);
        setCategorias([]);
    };

    useEffect(() => {
        if (token) {
            obtenerCategorias();
        }
    }, [token]);

    if (!token) {
        return (
            <div style={{ padding: '20px', border: '2px solid #333', borderRadius: '8px', maxWidth: '350px', margin: '50px auto' }}>
                <h2 style={{ textAlign: 'center' }}>🔑 Acceso al Sistema</h2>
                <form onSubmit={manejarLogin}>
                    <div style={{ marginBottom: '10px' }}>
                        <label>Email:</label>
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
                    </div>
                    <div style={{ marginBottom: '15px' }}>
                        <label>Contraseña:</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} style={{ width: '100%', padding: '8px' }} required />
                    </div>
                    <button type="submit" disabled={cargando} style={{ width: '100%', padding: '10px', cursor: 'pointer', background: '#007bff', color: 'white', border: 'none' }}>
                        {cargando ? 'Validando...' : 'Iniciar Sesión'}
                    </button>
                </form>
                {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
            </div>
        );
    }

    return (
        <div style={{ padding: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <h1>📦 Categorías de Stock</h1>
                <button onClick={cerrarSesion} style={{ background: '#dc3545', color: 'white', padding: '5px 15px', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                    Cerrar Sesión
                </button>
            </div>

            {error && <p style={{ color: 'red' }}>{error}</p>}

            {cargando ? (
                <p>Consultando API...</p>
            ) : (
                <table border="1" cellPadding="10" style={{ width: '100%', borderCollapse: 'collapse', marginTop: '20px' }}>
                    <thead style={{ background: '#f4f4f4' }}>
                        <tr>
                            <th>ID</th>
                            <th>Nombre</th>
                            <th>Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {categorias.length > 0 ? (
                            categorias.map(cat => (
                                <tr key={cat.id}>
                                    <td>{cat.id}</td>
                                    <td>{cat.nombre}</td>
                                    <td>{cat.descripcion}</td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="3" style={{ textAlign: 'center' }}>No hay datos para mostrar</td></tr>
                        )}
                    </tbody>
                </table>
            )}
        </div>
    );
}