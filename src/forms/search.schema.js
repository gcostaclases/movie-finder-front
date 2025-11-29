import * as Yup from "yup";

// Agrego el método personalizado para que al menos se complete uno de los campos al objeto Yup
Yup.addMethod(Yup.object, "atLeastOneOf", function (list) {
	return this.test({
		name: "atLeastOneOf",
		message: "Completá al menos un campo para buscar.",
		exclusive: true,
		params: { keys: list.join(", ") },
		test: (value) => value != null && list.some((f) => !!value[f]),
	});
});

// Helper para transformar "" en null
const normalizeEmptyStringToNull = (value, originalValue) => {
	if (originalValue === "") return null;
	return value;
};

export const searchSchema = Yup.object()
	.shape({
		title: Yup.string().transform(normalizeEmptyStringToNull).max(100, "El título es muy largo").nullable(),
		actor: Yup.string().transform(normalizeEmptyStringToNull).max(100, "El nombre del actor es muy largo").nullable(),
		genre: Yup.string().transform(normalizeEmptyStringToNull).max(50, "El género es muy largo").nullable(),
		language: Yup.string()
			.transform(normalizeEmptyStringToNull)
			.matches(/^[a-z]{2}$/, "Debe ser un código de idioma de 2 letras (ej: es, en)")
			.nullable(),
		year: Yup.string()
			.transform(normalizeEmptyStringToNull)
			.matches(/^\d{4}$/, "Debe ser un año de 4 dígitos")
			.nullable(),
	})
	.atLeastOneOf(["title", "actor", "genre", "language", "year"]);
