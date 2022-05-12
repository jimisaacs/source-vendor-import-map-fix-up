# source_vendor_import_map_fix_up

```sh
Usage: source_vendor_import_map_fix_up

Description:

  Temporary solution to fix up the generated vendor import map with a source import map.

Options:

  -h, --help                                - Show this help.
  --source-import-map  [path-to-json-file]  - import map file name of what was passed into 'deno vendor --import-map=[HERE]').  (required, Default: "src/import_map.json")
  --vendor-import-map  [path-to-json-file]  - import map file name of what 'deno vendor' generated.                             (required, Default: "vendor/import_map.json")
  -w, --write                               - write output to --vendor-import-map
```

## Example

Generate files under `./vendor`, including the `./vendor/import_map.json` file:
```sh
deno vendor --import-map=src/import_map.json main.ts
```

Fix up the file `./vendor/import_map.json` file in place with `--write`:
```sh
deno run --allow-read --allow-write source_vendor_import_map_fix_up.ts --source-import-map=src/import_map.json --vendor-import-map=vendor/import_map.json --write
```

If your import map locations match the defaults, this should work:
```sh
deno run --allow-read --allow-write source_vendor_import_map_fix_up.ts --write
```
