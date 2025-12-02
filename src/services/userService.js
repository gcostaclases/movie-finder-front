import api from "../api/axios";

// Traer proveedores contratados por el usuario autenticado
export async function getUserProviders() {
	const response = await api.get("/me/providers");
	return response.data; // Array de proveedores
}

// Traer perfil del usuario autenticado
export async function getUserProfile() {
	const response = await api.get("/me/profile");
	return response.data; // { username, email, profileImage }
}

// Agregar un proveedor a la lista del usuario autenticado
export async function addUserProvider(providerId) {
	const response = await api.post("/me/providers", { providerId });
	return response.data; // { message: "..."}
}

// Reemplazar la lista completa de proveedores del usuario autenticado
export async function replaceUserProviders(providerIds) {
	const response = await api.put("/me/providers", providerIds);
	return response.data; // Array de proveedores actualizados
}

// Subir o actualizar la imagen de perfil del usuario autenticado
export async function uploadProfileImage(imageUri) {
	const formData = new FormData();
	formData.append("image", {
		uri: imageUri,
		name: "profile.jpg",
		type: "image/jpeg",
	});
	const response = await api.put("/me/profile-image", formData, {
		headers: { "Content-Type": "multipart/form-data" },
	});
	return response.data; // { message, profileImage }
}

// Obtener reseñas del usuario autenticado
export async function getUserReviews() {
	const response = await api.get("/reviews/me");
	return response.data; // Array de reseñas del usuario
}

// Editar reseña del usuario autenticado
export async function editUserReview(reviewId, { rating, comment }) {
	const response = await api.patch(`/reviews/${reviewId}`, { rating, comment });
	return response.data; // Reseña actualizada
}

// Eliminar reseña del usuario autenticado
export async function deleteUserReview(reviewId) {
	const response = await api.delete(`/reviews/${reviewId}`);
	return response.data; // { message: "Reseña eliminada correctamente" }
}

// Obtener la watchlist del usuario autenticado
export async function getUserWatchlist({ page = 1, limit = 1000 } = {}) {
	const response = await api.get("/me/watchlist", { params: { page, limit } });
	return response.data; // { movies, total, page, limit }
}

// Agregar película a la watchlist del usuario autenticado
export async function addMovieToWatchlistService(movieId) {
	const response = await api.post("/me/watchlist", { movieId });
	return response.data; // { message, movie }
}

// Eliminar película de la watchlist del usuario autenticado
export async function removeMovieFromWatchlistService(movieId) {
	return api.delete(`/me/watchlist/${movieId}`);
}

