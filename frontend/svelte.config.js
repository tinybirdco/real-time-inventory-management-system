import adapter from '@sveltejs/adapter-auto';
import preprocess from 'svelte-preprocess';

import { preprocessMeltUI } from '@melt-ui/pp';
import sequence from 'svelte-sequential-preprocessor';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  kit: {
    adapter: adapter()
  },

  preprocess: sequence([
    preprocess({
      postcss: true
    }),
    preprocessMeltUI()
  ])
};

export default config;
