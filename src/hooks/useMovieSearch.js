//#region ----------- IMPORTS ------------
import { useState } from "react";
import { getMoviesBySearch } from "../services/movieService";
//#endregion ------------ IMPORTS ------------

export default function useMovieSearch() {
	const [results, setResults] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [total, setTotal] = useState(0);

	const searchMovies = async (filters, page = 1, limit = 12) => {
		setLoading(true);
		setError(null);
		try {
			const data = await getMoviesBySearch({ ...filters, page, limit });
			setResults(data.movies);
			setTotal(data.total);
			return data;
		} catch (e) {
			// Uso el error del backend sino uno genérico
			if (e.response?.data?.message) {
				setError(e.response.data.message);
			} else {
				setError("ERROR: No se pudo buscar películas");
			}
			setResults([]);
			setTotal(0);
		} finally {
			setLoading(false);
		}
	};

	return { results, total, loading, error, searchMovies };
}
