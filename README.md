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

## Install

```sh
> deno install --allow-read --allow-write https://deno.land/x/source_vendor_import_map_fix_up/source_vendor_import_map_fix_up.ts
```

Then you can use like this:
```sh
> source_vendor_import_map_fix_up --source-import-map=src/import_map.json --vendor-import-map=vendor/import_map.json --write
```

If you do not want to install and run on-demand, then in the following example, anywhere you see `source_vendor_import_map_fix_up`, replace it with:
```
> deno run --allow-read --allow-write https://deno.land/x/source_vendor_import_map_fix_up/source_vendor_import_map_fix_up.ts
```

## Example


First, lets clone this repo and go into the example:
```sh
> git clone git@github.com:jimisaacs/source_vendor_import_map_fix_up.git
> cd source_vendor_import_map_fix_up/example
```

Make sure the server can run in dev mode:
```sh
> deno task dev
```

Expected output is:
```
This server is up and running on http://localhost:8080/
```

Then, once in the example directory, run `deno vendor`, and generate files under `./vendor`, including the `./vendor/import_map.json` file:
```sh
> deno vendor --import-map=src/import_map.json main.ts
```

Then, fix up the file `./vendor/import_map.json` file in place with `--write`:
```sh
> source_vendor_import_map_fix_up --write
```

Now lets make sure the server can run in prod mode:
```sh
> deno task prod
```

Expected output is still:
```
This server is up and running on http://localhost:8080/
```
