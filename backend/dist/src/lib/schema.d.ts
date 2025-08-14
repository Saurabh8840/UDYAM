export type Field = {
    id: string;
    label: string;
    type: string;
    validation: string;
};
export type Schema = {
    step1: Field[];
    step2: Field[];
};
export declare function getSchema(): Schema;
export declare function getRegex(pattern: string): RegExp;
export declare function refreshSchema(): void;
//# sourceMappingURL=schema.d.ts.map