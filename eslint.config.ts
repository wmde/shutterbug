import eslint from '@eslint/js';
import { globalIgnores } from 'eslint/config'
import pluginVue from 'eslint-plugin-vue'
import pluginVitest from '@vitest/eslint-plugin'
import { configureVueProject, defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'

configureVueProject( {
	tsSyntaxInTemplates: true,
	scriptLangs: [ 'ts', 'js' ],
	allowComponentTypeUnsafety: true,
} )

export default defineConfigWithVueTs(
	{
		name: 'app/files-to-lint',
		files: [ '**/*.{vue,ts,mts,tsx}' ],
	},

	globalIgnores( [ '**/dist/**', '**/dist-ssr/**', '**/coverage/**' ] ),

	eslint.configs.recommended,
	...pluginVue.configs[ 'flat/essential' ],
	vueTsConfigs.recommended,

	{
		...pluginVitest.configs.recommended,
		files: [ 'src/**/__tests__/*' ],
	},
)
