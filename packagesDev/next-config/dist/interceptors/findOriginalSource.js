"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOriginalSource = void 0;
const path_1 = __importDefault(require("path"));
const swc_1 = require("./swc");
function parseAndFindExport(resolved, findExport, resolve) {
    if (!resolved?.source)
        return undefined;
    const ast = (0, swc_1.parseSync)(resolved.source);
    for (const node of ast.body) {
        if (node.type === 'ExportDeclaration') {
            switch (node.declaration.type) {
                case 'ClassDeclaration':
                case 'FunctionDeclaration':
                    if (node.declaration.identifier.value === findExport)
                        return resolved;
                    break;
                case 'VariableDeclaration':
                    for (const declaration of node.declaration.declarations) {
                        if (declaration.type === 'VariableDeclarator') {
                            if (declaration.id.type === 'Identifier') {
                                if (declaration.id.value === findExport)
                                    return resolved;
                            }
                            else {
                                console.log(declaration);
                            }
                        }
                    }
                    break;
            }
        }
    }
    for (const node of ast.body) {
        if (node.type === 'ExportAllDeclaration') {
            const isRelative = node.source.value.startsWith('.');
            if (isRelative) {
                const d = resolved.dependency === resolved.denormalized
                    ? resolved.dependency.substring(0, resolved.dependency.lastIndexOf('/'))
                    : resolved.dependency;
                const newPath = path_1.default.join(d, node.source.value);
                const resolveResult = resolve(newPath, { includeSources: true });
                // eslint-disable-next-line no-continue
                if (!resolveResult)
                    continue;
                const newResolved = parseAndFindExport(resolveResult, findExport, resolve);
                if (newResolved && resolved.dependency !== newResolved.dependency)
                    return newResolved;
            }
        }
    }
    return undefined;
}
function findOriginalSource(plug, resolved, resolve) {
    if (!resolved?.source)
        return {
            resolved: undefined,
            error: new Error(`Could not resolve ${plug.targetModule}`),
        };
    const newResolved = parseAndFindExport(resolved, plug.targetExport, resolve);
    if (!newResolved) {
        return {
            resolved: undefined,
            error: new Error(`Can not find ${plug.targetModule}#${plug.sourceExport} for plugin ${plug.sourceModule}`),
        };
    }
    return { resolved: newResolved, error: undefined };
}
exports.findOriginalSource = findOriginalSource;
