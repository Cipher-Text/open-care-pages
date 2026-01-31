# Deployment

This project builds static pages with Astro and can be deployed to any static host.

## Build

```sh
npm run build
```

Output is generated in `dist/`.

## Preview locally

```sh
npm run preview
```

## Static hosting options

### Generic static host

1) Run `npm run build`
2) Upload the contents of `dist/`

### Netlify

- Build command: `npm run build`
- Publish directory: `dist`

### Vercel

- Framework preset: Astro
- Build command: `npm run build`
- Output directory: `dist`

## Environment variables

This project does not require environment variables by default.
