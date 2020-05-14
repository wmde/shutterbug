module.exports = {
	chainWebpack: config => {
		// Avoid copying local screenshots when building,
		// see https://github.com/vuejs/vue-cli/issues/2231
		config.plugin('copy').tap(options => {
			options[0][0].ignore.push('screenshots/**/*');
			return options;
		});
	}
}
