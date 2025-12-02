import axios from "axios";
import * as SecureStore from "expo-secure-store";
import { store } from "../store/store";
import { cerrarSesion } from "../utils/cerrarSesion";

const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || "";

// Instancia principal
const api = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		Accept: "application/json", // Espero JSON
		// No seteo Content-Type aca porque supuestamente axios lo hace automáticamente
	},
	timeout: 60000, // 1 minuto
});

// Función para obtener el token desde SecureStore
const getAuthToken = async () => {
	return await SecureStore.getItemAsync("userToken");
};

// Interceptor para agregar el token automáticamente
api.interceptors.request.use(
	async (config) => {
		const token = await getAuthToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => Promise.reject(error)
);

// Interceptor para manejar errores 401 (token vencido)
api.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;
		if (error.response && error.response.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true;
			// Cierro sesión (borro el token y datos de usuario del Secure Store y los datos del usuario de Redux).
			await cerrarSesion(store.dispatch);
			return Promise.reject(error);
		}
		return Promise.reject(error);
	}
);

export default api;