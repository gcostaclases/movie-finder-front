//#region ----------- IMPORTS ------------
import { useState } from "react";
import { useDispatch } from "react-redux";
import { deleteUserReview } from "../services/userService";
import { removeUserReview } from "../store/slices/userSlice";
import { removeMovieReview } from "../store/slices/movieSlice";
//#endregion ------------ IMPORTS ------------

export default function useDeleteUserReview() {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const deleteReview = async (reviewId) => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			await deleteUserReview(reviewId);
			dispatch(removeUserReview(reviewId));
			dispatch(removeMovieReview(reviewId));
			setSuccess(true);
			return true;
		} catch (e) {
			// Uso el error del backend sino uno genérico
			if (e.response?.data?.message) {
				setError(e.response.data.message);
			} else {
				setError("ERROR: No se pudo eliminar la reseña");
			}
			return false;
		} finally {
			setLoading(false);
		}
	};

	return { deleteReview, loading, error, success };
}

