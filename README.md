# Therapy UI

Shadcn-style registry for the Therapy website UI.

This repository is a source-code registry, not a compiled component package.
Install items with the `shadcn` CLI and the files are copied into your app using
your local `components.json` aliases.

## Install

Install the full set:

```bash
bunx shadcn@latest add geraldbahati/therapy-ui/therapy-ui
```

Install one component:

```bash
bunx shadcn@latest add geraldbahati/therapy-ui/button
bunx shadcn@latest add geraldbahati/therapy-ui/filter-controls
```

If your project already has shadcn's default `lib/utils.ts`, pass
`--overwrite` or answer yes when the CLI asks whether to replace it.

Available items:

- `therapy-ui`
- `theme`
- `button`
- `autocomplete-field`
- `chip-list`
- `filter-controls`
- `icons`
- `search-field`
- `button-variants`
- `utils`

## Development

```bash
bun install
bun run check
```

`bun run build` validates `registry.json` and writes built registry payloads to
`public/r`.

## Usage Notes

- Components are copied to the consumer project's configured `@ui` alias.
- Utilities are copied to the configured `@lib` alias.
- The `theme` item installs the Therapy color tokens and CSS helpers used by
  the components.
