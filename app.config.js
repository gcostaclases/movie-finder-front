// app.config.js
export default {
	expo: {
		name: "movie-finder",
		slug: "movie-finder",
		owner: "gcostaclases",
		icon: "./assets/Movie-Finder-Icon.png",
		android: {
			package: "com.tuempresa.clase",
			softwareKeyboardLayoutMode: "pan",
		},
		ios: { bundleIdentifier: "com.tuempresa.clase" },
		// ⛔️ OJO: NO pongas "@notifee/react-native" acá.
		plugins: [
			// opcional, recomendado para SDKs de Android:
			[
				"expo-build-properties",
				{
					android: { compileSdkVersion: 34, targetSdkVersion: 34 },
				},
			],
			"expo-localization",
		],
		extra: {
			eas: {
				projectId: "2d3b9f08-79dd-4fb7-bd02-1215732fc54d",
			},
		},
	},
};
