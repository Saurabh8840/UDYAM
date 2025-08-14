export interface FormField {
    id: string;
    label: string;
    type: string;
    validation: string;
}
export interface FormSchema {
    step1: FormField[];
    step2: FormField[];
}
export declare const formSchema: FormSchema;
export declare const normalizeInput: (payload: Record<string, string>) => {
    [x: string]: string;
};
//# sourceMappingURL=formSchema.d.ts.map