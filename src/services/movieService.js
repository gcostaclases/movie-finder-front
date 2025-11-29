import api from "../api/axios";

// Traer películas paginadas
export async function getMovies(page = 1, limit = 12) {
	const response = await api.get("/movies", {
		params: { page, limit },
	});
	return response.data; // { movies, total, page, limit }
}

// Traer detalle de una película por ID
export async function getMovieById(id) {
	const response = await api.get(`/movies/${id}`);
	return response.data; // Devuelve el objeto película
}

// Traer availability de una película
export async function getMovieAvailability(movieId) {
	const response = await api.get(`/movies/${movieId}/availability`);
	return response.data.availability; // Devuelve el array de availability
}

// Buscar películas por distintos criterios
export async function getMoviesBySearch({ title, actor, genre, language, year, page = 1, limit = 12 }) {
	const response = await api.get("/movies/search", {
		params: {
			title,
			actor,
			genre,
			language,
			year,
			page,
			limit,
		},
	});
	return response.data; // { movies, total, page, limit }
}

