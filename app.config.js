// app.config.js
export default {
	expo: {
		name: "movie-finder",
		slug: "movie-finder",
		android: { package: "com.tuempresa.clase" },
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
	},
};
