var appConfig = {
	pluginService: {
		enabled: true,
		url: "/plugins",
	},
	logLevel: "info",
	theme: {
		isLight: true,
		tokens: {
			backgroundColors: {
				colorBackgroundPrimary: "#E50914",
				// colorBackgroundNeutralWeakest: "rgb(229,9,20)",
				// colorBackgroundBrandStrong: "rgb(229,9,20)",
				colorBackgroundPrimaryStronger: "#E50914",
				colorBackgroundDestructive: "#E50914",
				colorBackgroundDestructiveStronger: "#f40612",
			},
			borderColors: {
				colorBorderPrimary: "#E50914",
			},
			textColors: {
				colorTextLink: "#E50914",
			},
		},
		componentThemeOverrides: {
			MainHeader: {
				Container: {
					background: "#000",
					color: "#fff",
				},
			},
			MessageBubble: {
				background: "#E50914",
			},
		},
	},
};

// netflix red - rgb(229,9,20) or #E50914
// netflix grey - rgb(34,31,31) or #221F1F
// netflix light grey - rgb(245,245,241) or #F5F5F1
