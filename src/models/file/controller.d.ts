/// <reference types="mongoose" />
declare const _exports: {
    schema: import("mongoose").Model<any, any>;
    getAll(): Promise<{
        success: boolean;
        data: any;
    }>;
    get(id: number): Promise<{
        success: boolean;
        data: any;
    }>;
    getBy(query: any): Promise<{
        success: boolean;
        data: any;
    }>;
    add(data: any): Promise<{
        success: boolean;
        data: any;
    }>;
    set(id: number, data: any): Promise<{
        success: boolean;
        data: any;
    }>;
    remove(id: any): Promise<{
        success: boolean;
        data?: undefined;
    } | {
        success: boolean;
        data: any;
    }>;
};
export = _exports;
