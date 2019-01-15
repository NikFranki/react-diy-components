/**
 * 设置本地存储内容
 * 
 * @author LiHuan
 * @param {string} key 
 * @param {*} value 
 * @returns 
 */
const set = (key: string, value: any) => {
    if (window.localStorage) {
        localStorage.setItem(key, JSON.stringify(value));
        return true;
    }
    return false;
}

/**
 * 获取本地存储里的内容
 * 
 * @param {any} key 
 * @returns 
 * 
 * @memberOf LocalstorageService
 */
const get = (key: string) => {
    if (window.localStorage) {
        const data = localStorage.getItem(key);
        if (data && data !== "undefined") {
            return JSON.parse(data);
        }
    }
    return '';
}

/**
 * 移除本地存储里的内容
 * 
 * @author LiHuan
 * @param {string} key 
 * @returns 
 */
const remove = (key: string) => {
    if (window.localStorage) {
        localStorage.removeItem(key);
        return true;
    }
    return false;
}

const clear = () => {
    if (window.localStorage) {
        localStorage.clear();
        return true;
    }
    return false;
}

export default {
    get,
    set,
    remove,
    clear
}