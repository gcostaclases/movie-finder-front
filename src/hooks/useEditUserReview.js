//#region ----------- IMPORTS ------------
import { useState } from "react";
import { useDispatch } from "react-redux";
import { editUserReview } from "../services/userService";
import { updateUserReview } from "../store/slices/userSlice";
import { updateMovieReview } from "../store/slices/movieSlice";
//#endregion ------------ IMPORTS ------------

export default function useEditUserReview() {
	const dispatch = useDispatch();

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const editReview = async (reviewId, { rating, comment }) => {
		setLoading(true);
		setError(null);
		setSuccess(false);
		try {
			const updated = await editUserReview(reviewId, { rating, comment });
			dispatch(updateUserReview(updated));
			dispatch(updateMovieReview(updated));
			setSuccess(true);
			return updated;
		} catch (e) {
			// Uso el error del backend sino uno genérico
			if (e.response?.data?.message) {
				setError(e.response.data.message);
			} else {
				setError("ERROR: No se pudo editar la reseña");
			}
		} finally {
			setLoading(false);
		}
	};

	return { editReview, loading, error, success };
}

