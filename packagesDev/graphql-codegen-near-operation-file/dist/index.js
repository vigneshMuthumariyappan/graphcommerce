"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.preset = exports.resolveDocumentImports = void 0;
const path_1 = require("path");
const add_1 = __importDefault(require("@graphql-codegen/add"));
const graphql_1 = require("graphql");
const env_1 = require("./directive/env");
const injectable_1 = require("./directive/injectable");
const resolve_document_imports_1 = require("./resolve-document-imports");
Object.defineProperty(exports, "resolveDocumentImports", { enumerable: true, get: function () { return resolve_document_imports_1.resolveDocumentImports; } });
const utils_1 = require("./utils");
function isFragment(documentFile) {
    let name = false;
    if (!documentFile.document)
        return name;
    (0, graphql_1.visit)(documentFile.document, {
        FragmentDefinition: () => {
            name = true;
        },
    });
    return name;
}
function isDocument(documentFiles) {
    return !documentFiles.every(isFragment);
}
exports.preset = {
    buildGeneratesSection: (options) => {
        options.documents = (0, env_1.envDirective)(options.documents);
        if (options.presetConfig.injectables) {
            options.documents = (0, injectable_1.injectableDirective)(options.documents);
        }
        const schemaObject = options.schemaAst ?? (0, graphql_1.buildASTSchema)(options.schema, options.config);
        const baseDir = options.presetConfig.cwd ?? process.cwd();
        const extension = options.presetConfig.extension ?? '.generated.ts';
        const folder = options.presetConfig.folder ?? '';
        const importTypesNamespace = options.presetConfig.importTypesNamespace ?? 'Types';
        const { importAllFragmentsFrom } = options.presetConfig;
        const { baseTypesPath } = options.presetConfig;
        if (!baseTypesPath) {
            throw new Error(`Preset "near-operation-file" requires you to specify "baseTypesPath" configuration and point it to your base types file (generated by "typescript" plugin)!`);
        }
        const shouldAbsolute = !baseTypesPath.startsWith('~');
        const pluginMap = {
            ...options.pluginMap,
            add: add_1.default,
        };
        const sources = (0, resolve_document_imports_1.resolveDocumentImports)(options, schemaObject, {
            baseDir,
            generateFilePath(location) {
                const newFilePath = (0, utils_1.defineFilepathSubfolder)(location, folder);
                return (0, utils_1.appendExtensionToFilePath)(newFilePath, extension);
            },
            schemaTypesSource: {
                path: shouldAbsolute ? (0, path_1.join)(options.baseOutputDir, baseTypesPath) : baseTypesPath,
                namespace: importTypesNamespace,
            },
            typesImport: options.config.useTypeImports ?? false,
        });
        return sources.map(({ importStatements, externalFragments, fragmentImports, documents, ...source }) => {
            let fragmentImportsArr = fragmentImports;
            if (importAllFragmentsFrom) {
                fragmentImportsArr = fragmentImports.map((t) => {
                    const newImportSource = typeof importAllFragmentsFrom === 'string'
                        ? { ...t.importSource, path: importAllFragmentsFrom }
                        : importAllFragmentsFrom(t.importSource, source.filename);
                    return {
                        ...t,
                        importSource: newImportSource || t.importSource,
                    };
                });
            }
            const isDoc = isDocument(documents);
            const isRelayOptimizer = !!Object.keys(pluginMap).find((plugin) => plugin.includes('relay-optimizer-plugin'));
            const plugins = [
                // TODO/NOTE I made globalNamespace include schema types - is that correct?
                ...(options.config.globalNamespace
                    ? []
                    : importStatements.map((importStatement) => ({ add: { content: importStatement } }))),
                ...options.plugins.filter((pluginOptions) => !isRelayOptimizer ||
                    isDoc ||
                    !Object.keys(pluginOptions).includes('typed-document-node')),
            ];
            const config = {
                ...options.config,
                // This is set here in order to make sure the fragment spreads sub types
                // are exported from operations file
                exportFragmentSpreadSubTypes: true,
                namespacedImportName: importTypesNamespace,
                externalFragments,
                fragmentImports: fragmentImportsArr,
            };
            return {
                ...source,
                documents,
                plugins,
                pluginMap,
                config,
                schema: options.schema,
                schemaAst: schemaObject,
                // skipDocumentsValidation: true,
            };
        });
    },
};
exports.default = exports.preset;