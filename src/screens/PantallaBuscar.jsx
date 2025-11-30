//#region ----------- IMPORTS ------------
import { StyleSheet, Text, View } from "react-native";
import ButtonPrimary from "../components/general/ButtonPrimary";
import SearchField from "../components/search/SearchField";
import { useForm, Controller } from "react-hook-form";
import useMovieSearch from "../hooks/useMovieSearch";
import { useState } from "react";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
//import { searchSchema } from "../forms/search.schema";
import { useTranslation } from "react-i18next";
//#endregion ----------- IMPORTS ------------

const PantallaBuscar = ({ route, navigation }) => {
	const { t } = useTranslation();

	//#region SCHEMA YUP
	// Helper para transformar "" en null
	const normalizeEmptyStringToNull = (value, originalValue) => {
		if (originalValue === "") return null;
		return value;
	};

	// Método personalizado para que al menos se complete uno de los campos
	function atLeastOneOf(list, t) {
		return this.test({
			name: "atLeastOneOf",
			message: t("validation.at_least_one"),
			exclusive: true,
			params: { keys: list.join(", ") },
			test: (value) => value != null && list.some((f) => !!value[f]),
		});
	}
	// Agrego el método a Yup
	if (!Yup.object.prototype.atLeastOneOf) {
		Yup.addMethod(Yup.object, "atLeastOneOf", function (list) {
			return atLeastOneOf.call(this, list, t);
		});
	}

	const searchSchema = Yup.object()
		.shape({
			title: Yup.string().transform(normalizeEmptyStringToNull).max(100, t("validation.title_max")).nullable(),
			actor: Yup.string().transform(normalizeEmptyStringToNull).max(100, t("validation.actor_max")).nullable(),
			genre: Yup.string().transform(normalizeEmptyStringToNull).max(50, t("validation.genre_max")).nullable(),
			language: Yup.string()
				.transform(normalizeEmptyStringToNull)
				.matches(/^[a-z]{2}$/, t("validation.language_pattern"))
				.nullable(),
			year: Yup.string()
				.transform(normalizeEmptyStringToNull)
				.matches(/^\d{4}$/, t("validation.year_pattern"))
				.nullable(),
		})
		.atLeastOneOf(["title", "actor", "genre", "language", "year"]);
	//#endregion SCHEMA YUP

	const {
		control,
		handleSubmit,
		watch,
		reset,
		formState: { errors, isValid },
	} = useForm({
		resolver: yupResolver(searchSchema),
		mode: "onChange",
		criteriaMode: "all",
		defaultValues: {
			title: null,
			actor: null,
			genre: null,
			language: null,
			year: null,
		},
	});

	const { results, total, loading, error, searchMovies } = useMovieSearch();

	const [searching, setSearching] = useState(false);

	const onSubmit = async (data) => {
		setSearching(true);
		const res = await searchMovies(data);
		setSearching(false);
		navigation.navigate("PantallaResultadosBusqueda", {
			results: res?.movies || [],
			total: res?.total || 0,
			filters: data,
		});
		reset();
	};

	return (
		<View style={styles.content}>
			<Text style={styles.title}>{t("search.search_title")}</Text>

			{/* Título */}
			<Controller
				control={control}
				name="title"
				render={({ field: { onChange, value } }) => (
					<SearchField
						label={t("search.title")}
						placeholder={t("search.title_placeholder")}
						value={value}
						onChangeText={onChange}
						error={!!errors.title}
					/>
				)}
			/>
			{errors.title && <Text style={styles.error}>{errors.title.message}</Text>}

			{/* Actor */}
			<Controller
				control={control}
				name="actor"
				render={({ field: { onChange, value } }) => (
					<SearchField
						label={t("search.actor")}
						placeholder={t("search.actor_placeholder")}
						value={value}
						onChangeText={onChange}
						error={!!errors.actor}
					/>
				)}
			/>
			{errors.actor && <Text style={styles.error}>{errors.actor.message}</Text>}

			{/* Género */}
			<Controller
				control={control}
				name="genre"
				render={({ field: { onChange, value } }) => (
					<SearchField
						label={t("search.genre")}
						placeholder={t("search.genre_placeholder")}
						value={value}
						onChangeText={onChange}
						error={!!errors.genre}
					/>
				)}
			/>
			{errors.genre && <Text style={styles.error}>{errors.genre.message}</Text>}

			{/* Idioma original */}
			<Controller
				control={control}
				name="language"
				render={({ field: { onChange, value } }) => (
					<SearchField
						label={t("search.original_language")}
						placeholder={t("search.original_language_placeholder")}
						value={value}
						onChangeText={onChange}
						error={!!errors.language}
						autoCapitalize="none"
					/>
				)}
			/>
			{errors.language && <Text style={styles.error}>{errors.language.message}</Text>}

			{/* Año de lanzamiento */}
			<Controller
				control={control}
				name="year"
				render={({ field: { onChange, value } }) => (
					<SearchField
						label={t("search.release_year")}
						placeholder={t("search.release_year_placeholder")}
						value={value}
						onChangeText={onChange}
						keyboardType="numeric"
						error={!!errors.year}
					/>
				)}
			/>
			{errors.year && <Text style={styles.error}>{errors.year.message}</Text>}

			{/* Error global del schema */}
			{errors[""] && <Text style={styles.error}>{errors[""].message}</Text>}

			{/* Botón */}
			<ButtonPrimary
				title={searching ? t("generic.loading") : t("search.search_button")}
				style={styles.button}
				onPress={handleSubmit(onSubmit)}
				disabled={!isValid || searching}
			/>
			{error && <Text style={styles.error}>{error}</Text>}
		</View>
	);
};

export default PantallaBuscar;

const styles = StyleSheet.create({
	content: {
		flex: 1,
		paddingHorizontal: 24,
		paddingTop: 18,
	},
	title: {
		fontSize: 18,
		fontWeight: "600",
		marginBottom: 18,
		color: "#222",
	},
	button: {
		marginTop: 24,
		width: "100%",
	},
	error: {
		color: "red",
		fontSize: 13,
		marginBottom: 4,
		marginLeft: 4,
	},
});

