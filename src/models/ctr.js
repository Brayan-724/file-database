const mongo = require("mongoose");

/**
 * 
 * @param {mongo.Model} Model 
 */
module.exports = function(Model) {
    const exp = {};

    exp.schema = Model;

    // GETTERS
        exp.getAll = async () => {
            try {
                return {
                    success: true,
                    data: await Model.find()
                }
            } catch(e) {
                return {
                    success: false,
                    data: e
                }
            }
        }

        /**
         * 
         * @param {Number} id 
         */
        exp.get = async (id) => {
            try {
                return {
                    success: true,
                    data: await Model.findById(id)
                }
            } catch(e) {
                return {
                    success: false,
                    data: e
                }
            }
        }

        /**
         * 
         * @param {mongo.FilterQuery} query 
         */
        exp.getBy = async (query) => {
            try {
                return {
                    success: true,
                    data: await Model.find(query)
                }
            } catch(e) {
                return {
                    success: false,
                    data: e
                }
            }
        }
    
    // SETTERS
        /**
         * 
         * @param {Object} data 
         */
        exp.add = async (data) => {
            const m = new Model(data);
            try {
                await m.save();
                return {
                    success: true,
                    data: m
                }
            } catch(e) {
                return {
                    success: false,
                    data: e
                }
            }
        }

        /**
         * 
         * @param {Number} id 
         * @param {Object} data 
         */
        exp.set = async (id, data) => {
            try {
                return {
                    success: true,
                    data: await Model.findByIdAndUpdate(id, data)
                }
            } catch (e) {
                return {
                    success: false,
                    data: e
                }
            }
        }
    
    // REMOVERS
        exp.remove = async (filter) => {
            try {
                await Model.deleteMany(filter);
                return {
                    success: true
                }
            } catch (e) {
                return {
                    success: false,
                    data: e
                }
            }
        }

    return exp;
}