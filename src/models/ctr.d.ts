declare function _exports(Model: mongo.Model<any, any>): {
    schema: mongo.Model<any, any>;
    getAll(): Promise<{
        success: boolean;
        data: any;
    }>;
    /**
     *
     * @param {Number} id
     */
    get(id: number): Promise<{
        success: boolean;
        data: any;
    }>;
    /**
     *
     * @param {mongo.FilterQuery} query
     */
    getBy(query: any): Promise<{
        success: boolean;
        data: any;
    }>;
    /**
     *
     * @param {Object} data
     */
    add(data: any): Promise<{
        success: boolean;
        data: any;
    }>;
    /**
     *
     * @param {Number} id
     * @param {Object} data
     */
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
import mongo = require("mongoose");
