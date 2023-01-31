import {injectable} from "inversify";
import {bundle} from "../../db";
import IBundleBase from "../../shared/IBundleBase";
const ObjectId = require('bson-objectid');

@injectable()
class BundleMongoDao implements IBundleBase {
    create(data: any): Promise<any> {
        return bundle.insert(data);
    }

    delete(id: string): Promise<any> {
        return bundle.remove({_id: ObjectId(id)})
    }

    get(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pipeline = [
                { $match: { "_id": ObjectId(id) }},
                { $lookup: {from: "bundleContent", localField: "code", foreignField: "bundleCode", as: "bundles" } },
            ];

            bundle
                .aggregate(pipeline)
                .then((result:any) => {
                    const values = result || [];
                    resolve(values[0]);
                })
                .catch((error:any) => reject(error));
        });
    }

    getByCode(code: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pipeline = [
                { $match: { "code": code }},
                { $lookup: {from: "bundleContent", localField: "code", foreignField: "bundleCode", as: "bundles" } },
            ];

            bundle
                .aggregate(pipeline)
                .then((result:any) => resolve(result.length === 0 ? null : result[0]))
                .catch((error:any) => reject(error));
        });
    }

    getMany(id: string): Promise<any> {
        return new Promise((resolve, reject) => {
            const pipeline = [
                { $match: { "ownerKey": id }},
                { $lookup: {from: "bundleContent", localField: "code", foreignField: "bundleCode", as: "content" } },
                { $lookup: {from: "course", localField: "content.contentId", foreignField: "_id", as: "courses"}},
                { $lookup: {from: "workbook", localField: "content.contentId", foreignField: "_id", as: "workbooks"}},
                { $lookup: {from: "settings", localField: "content.contentId", foreignField: "_id", as: "settings"}},
            ];

            bundle
                .aggregate(pipeline)
                .then((results:any[]) => {
                    results = results || [];
                    results = results.map((result: any) => {
                        result.contentNames = result.courses.concat(result.workbooks).concat(result.settings)
                            .map((content: any) => {
                                return content ? (content.courseName || content.name) : "";
                            });

                        delete result.content;
                        delete result.courses;
                        delete result.workbooks;
                        delete result.settings;

                        return result;
                    });

                    resolve(results);
                })
                .catch((error:any) => {
                    reject(error)
                });
        });
    }

    update(id: string, data: any): Promise<any> {
        return new Promise((resolve, reject) => {
            bundle.update({_id: ObjectId(id)}, {$set: data})
                .then((result: any) => {
                    resolve(result)
                })
                .catch((error: any) => {
                    reject(error);
                });
        });
    }



}

export {BundleMongoDao};
