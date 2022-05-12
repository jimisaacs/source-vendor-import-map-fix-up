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


First, lets clone this repo, go into the example, and make sure the eerver can run in dev mode:
```sh
> git clone git@github.com:jimisaacs/source_vendor_import_map_fix_up.git
> cd source_vendor_import_map_fix_up/example
> deno task dev
```

Expected output is:
```
This server is up and running on http://localhost:8080/
```

Then, still in the example directory, run `deno vendor`, and generate files under `./vendor`, including the `./vendor/import_map.json` file:
```sh
> deno vendor --import-map=src/import_map.json main.ts
```

### Now take a moment to look at the diff

This is the source import map that we passed to `deno vendor --import-map=[HERE]`:
```json
{
  "imports": {
    "oak": "https://deno.land/x/oak@v10.5.1/mod.ts",
    "react": "https://esm.sh/react@17",
    "react-dom/server": "https://esm.sh/react-dom@17/server"
  }
}
```

This is the vendor import map that was generated `./vendor/import_map.json`:
```json
{
  "imports": {
    "https://cdn.esm.sh/": "./cdn.esm.sh/",
    "https://deno.land/": "./deno.land/",
    "https://esm.sh/": "./esm.sh/",
    "https://raw.githubusercontent.com/": "./raw.githubusercontent.com/"
  },
  "scopes": {
    "./cdn.esm.sh/": {
      "/v78/react@17.0.2/deno/react.js": "./cdn.esm.sh/v78/react@17.0.2/deno/react.js"
    },
    "./deno.land/": {
      "oak": "./deno.land/x/oak@v10.5.1/mod.ts"
    },
    "./esm.sh/": {
      "react": "./esm.sh/react@17.js",
      "react-dom/server": "./esm.sh/react-dom@17/server.js"
    }
  }
}
```

Then finally execute `deno task source_vendor_import_map_fix_up` for the following output, which is the fixed up import map. See what it did?
```json
{
  "imports": {
    "https://cdn.esm.sh/": "./cdn.esm.sh/",
    "https://deno.land/": "./deno.land/",
    "https://esm.sh/": "./esm.sh/",
    "https://raw.githubusercontent.com/": "./raw.githubusercontent.com/",
    "oak": "./deno.land/x/oak@v10.5.1/mod.ts",
    "react": "./esm.sh/react@17.js",
    "react-dom/server": "./esm.sh/react-dom@17/server.js"
  },
  "scopes": {
    "./cdn.esm.sh/": {
      "/v78/react@17.0.2/deno/react.js": "./cdn.esm.sh/v78/react@17.0.2/deno/react.js"
    }
  }
}
```


### Finalize

So then, fix up `./vendor/import_map.json` in place with `--write`:
```sh
> deno task source_vendor_import_map_fix_up --write
```

So then we can make sure the server can still run in prod mode (notice the `--no-remote` in the task config):
```sh
> deno task prod
```

Expected output is still:
```
This server is up and running on http://localhost:8080/
```
