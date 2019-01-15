import _ from 'lodash';
import CONSTANT from 'constant/index';
import Storage from './localstorage';
import 'abortcontroller-polyfill/dist/polyfill-patch-fetch';
// import History from './history';
// import Emitter from './emitter';

interface IFetchOptions {
    url: string,
    method: string,
    headers?: HeadersInit,
    body?: Blob | Int8Array | Int16Array | Int32Array | Uint8Array | Uint16Array | Uint32Array | Uint8ClampedArray | Float32Array | Float64Array | DataView | ArrayBuffer | FormData | string | null,
    cache?: RequestCache,
    timeout?: number,
    dataType?: string
}

interface IReqHeader {
    [key: string]: any
}

export interface IActionsConfig {
    [key: string]: IActionConfig
}

interface IActionConfig {
    domain?: string,
    url?: string | ((...args: any[]) => string),
    method?: string,
    headers?: IReqHeader | ((...args: any[]) => IReqHeader),
    dataType?: string,
    timeout?: number,
    transformResult?: Function
}

export class FetchService {

    static options = () => ({
        method: 'post',
        dataType: 'json',
        headers: {
            'content-type': 'application/json; charset=utf-8',
            'utoken': Storage.get(CONSTANT.USER_ACCESS_TOKEN_KEY) || '',
            'lang': Storage.get(CONSTANT.INTL_LANG_KEY) || 'zh'
        },
        cache: 'no-cache',
        timeout: 60 * 1000
    })

    static request(opts: IFetchOptions) {
        try {
            const controller = new AbortController();
            const options = Object.assign({}, this.options(), opts);
            const req = new Request(options.url, {
                method: options.method,
                headers: Object.assign({}, this.options().headers, opts.headers),
                body: options.body,
                cache: options.cache,
                signal: controller.signal
            });
            return new Promise((resolve, reject) => {
                fetch(req).then((response) => {
                    if (response.ok) {
                        let result;
                        if (options.dataType === 'json') {
                            result = response.json();
                        } else {
                            result = response.text();
                        }
                        Object.assign(result, {
                            cancel: () => {
                                controller.abort();
                            }
                        });
                        resolve(result);
                    } else {
                        reject(response.statusText);
                    }
                }).catch((error) => {
                    reject(error);
                });
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }

    static timeout(timeout: number) {
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                reject(new Error('REQUEST TIMEOUT'));
            }, timeout);
        });
    }
}

export class ActionConfig {

    /**
     * create action
     *
     * @author HUANGE
     * @static
     * @param {IActionsConfig} actionConfig
     * @param {*} context
     */
    static createAction(actionConfig: IActionsConfig, context: any) {
        for (const key in actionConfig) {
            const config = actionConfig[key];
            if (!_.isEmpty(config)) {
                context[key] = (...args: any[]) => {
                    const url = this.transformUrl(config, args);
                    const headers = this.transformHeader(config, args);
                    const body = this.transformBody(config, args);
                    return new Promise((resolve, reject) => {
                        FetchService.request({
                            url,
                            headers,
                            body,
                            method: config.method || 'post',
                        }).then((res) => {
                            // 校验标准数据返回
                            if (_.isObject(res) && _.has(res, 'code')) {
                                if (res['code'] === 0) {
                                    resolve(res['data'] ? res['data'] : res);
                                } else {
                                    reject(res);
                                }
                            } else if (_.has(res, 'error')) {
                                reject(res);
                            } else if (_.has(res, 'data')) {
                                resolve(res['data']);
                            } else {
                                resolve(res);
                            }
                        }, err => reject(err));
                    });
                };
            }
        }
    }

    static transformUrl(config: IActionConfig, args: any[]) {
        let reqUrl = '';
        if (_.isFunction(config.url)) {
            reqUrl = config.url(args);
        } else {
            reqUrl = config.url || '';
        }
        let params = reqUrl.match(/(:[^{:&/|_}]*)/g);
        if (_.isArray(params) && !_.isEmpty(params)) {
            params.map((param: string, idx: number) => {
                reqUrl = reqUrl.replace(param, args[idx]);
            });
        }
        if (!_.isEmpty(config.domain)) {
            reqUrl = config.domain + reqUrl;
        }
        return reqUrl;
    }

    static transformHeader(config: IActionConfig, args: any[]) {
        let headers: IReqHeader = {};
        if (_.isFunction(config.headers)) {
            headers = config.headers(args);
        } else if (config.headers) {
            headers = config.headers;
        }
        return headers;
    }

    static transformBody(config: IActionConfig, args: any[]) {
        if (config.method === 'get') {
            return null;
        }
        let body = args[0];
        if (!(body instanceof Blob) &&
            !(body instanceof Int8Array) &&
            !(body instanceof Int16Array) &&
            !(body instanceof Int32Array) &&
            !(body instanceof Uint8Array) &&
            !(body instanceof Uint16Array) &&
            !(body instanceof Uint32Array) &&
            !(body instanceof Uint8ClampedArray) &&
            !(body instanceof Float32Array) &&
            !(body instanceof Float64Array) &&
            !(body instanceof DataView) &&
            !(body instanceof ArrayBuffer) &&
            !(body instanceof FormData)) {
            body = JSON.stringify(body);
        }
        return body;
    }
}


