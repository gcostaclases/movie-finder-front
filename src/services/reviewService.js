import api from "../api/axios";

// Crear una nueva reseña
export async function addReview({ movieId, rating, comment }) {
	const response = await api.post("/reviews", {
		movieId,
		rating,
		comment,
	});
	return response.data;
}

// // Obtener reseñas de una película
// export async function getReviewsByMovie(movieId) {
// 	const response = await api.get(`/reviews/movies/${movieId}`);
// 	return response.data.reviews;
// }

// Obtener reseñas de una película con paginación
export async function getReviewsByMovie(movieId, page = 1, limit = 1000) {
	const response = await api.get(`/reviews/movies/${movieId}`, {
		params: { page, limit },
	});
	return response.data.reviews; // { reviews, total, page, limit }
}

