import type { ImportMap } from 'https://deno.land/x/importmap@0.2.0/mod.ts';
import { Command } from 'https://deno.land/x/cliffy@v0.24.0/command/mod.ts';

const command = new Command()
	.name('source_vendor_import_map_fix_up')
	.description('Temporary solution to fix up the generated vendor import map with a source import map.')
	.option(
		'--source-import-map=[path-to-json-file]',
		'import map file name of what was passed into \'deno vendor --import-map=[HERE]\').',
		{ required: true, default: 'import_map.json' },
	)
	.option(
		'--vendor-import-map=[path-to-json-file]',
		'import map file name of what \'deno vendor\' generated.',
		{ required: true, default: 'vendor/import_map.json' },
	)
	.option('-w, --write', 'write output to --vendor-import-map');

try {
	const cmdResult = await command.parse(Deno.args);
	const sourceImportMapFilePath = cmdResult.options.sourceImportMap.toString();
	const vendorImportMapFilePath = cmdResult.options.vendorImportMap.toString();
	const writeToVendor = !!cmdResult.options.write;

	const sourceImportMap: ImportMap = JSON.parse(await Deno.readTextFile(sourceImportMapFilePath));
	const vendorImportMap: ImportMap = JSON.parse(await Deno.readTextFile(vendorImportMapFilePath));

	if (sourceImportMap.imports && vendorImportMap.imports && vendorImportMap.scopes) {
		for (const [sourceImportKey, sourceImportValue] of Object.entries(sourceImportMap.imports)) {
			if (
				!sourceImportKey || !sourceImportValue || sourceImportValue.startsWith('.') || sourceImportValue.startsWith('/')
			) {
				continue;
			}
			let sourceImportOriginScopeKey;
			try {
				const origin = new URL(sourceImportValue).origin;
				if (!origin || origin == 'null') continue;
				sourceImportOriginScopeKey = vendorImportMap.imports[`${origin}/`];
			} catch (err) {
				continue;
			}
			if (!sourceImportOriginScopeKey) continue;
			const vendorOriginScope = vendorImportMap.scopes[sourceImportOriginScopeKey];
			if (!vendorOriginScope) continue;

			// This is where `deno vendor` currently puts things
			const vendorMappedValue = vendorOriginScope[sourceImportKey];
			// If we have a vendored source import in the wrong place, fix it up.
			if (!vendorMappedValue) continue;

			// Set the source import to the vendor mapped one (Should workd with --no-remote).
			vendorImportMap.imports[sourceImportKey] = vendorMappedValue;

			// Then cleanup the location of erroneous scopes that should have been imports.
			delete vendorOriginScope[sourceImportKey];
			if (Object.keys(vendorOriginScope).length == 0) {
				delete vendorImportMap.scopes[sourceImportOriginScopeKey];
			}
		}

		const json = JSON.stringify(vendorImportMap, null, 2);
		if (writeToVendor) {
			await Deno.writeTextFile(vendorImportMapFilePath, json);
		} else {
			await Deno.stdout.write(new TextEncoder().encode(json));
		}
	}
} catch (err) {
	command.showHelp();
	throw err;
}
