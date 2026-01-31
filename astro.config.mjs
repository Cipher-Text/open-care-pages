import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://open-care.example',
  integrations: [tailwind({ applyBaseStyles: false })]
});
