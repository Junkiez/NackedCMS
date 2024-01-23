var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import React, { useEffect, useState, useRef } from "react";
export default function PhantomCMS(storage, db) {
    return {
        getContent: function (key) {
            return __awaiter(this, void 0, void 0, function* () {
                return yield storage.getItem(key);
            });
        },
        useContent: function (key) {
            const [data, setData] = useState(null);
            useEffect(() => {
                (() => __awaiter(this, void 0, void 0, function* () {
                    try {
                        setData(yield storage.getItem(key));
                    }
                    catch (e) {
                        console.error(e);
                    }
                }))();
            }, []);
            return data;
        },
        isURL: function (str) {
            const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)|localhost(\d{1,5})?(\/\S*)?$/;
            return urlRegex.test(str);
        },
        isImagePath: function (str) {
            const imageRegex = /\.(jpeg|jpg|gif|png|bmp)$/i;
            return imageRegex.test(str);
        },
        areObjectsEqual: function (obj1, obj2) {
            const keys1 = Object.keys(obj1);
            const keys2 = Object.keys(obj2);
            if (keys1.length !== keys2.length) {
                return false;
            }
            for (const key of keys1) {
                if (!keys2.includes(key)) {
                    return false;
                }
                if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
                    if (!this.areObjectsEqual(obj1[key], obj2[key])) {
                        return false;
                    }
                }
            }
            return true;
        },
        getValueByPath: function (obj, path) {
            const keys = path.split('.');
            let value = obj;
            for (const key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                }
                else {
                    return undefined;
                }
            }
            return value;
        },
        setValueByPath: function (obj, path, newValue) {
            const keys = path.split('.');
            let current = obj;
            for (let i = 0; i < keys.length - 1; i++) {
                const key = keys[i];
                if (!current[key] || typeof current[key] !== 'object') {
                    current[key] = {};
                }
                current = current[key];
            }
            current[keys[keys.length - 1]] = newValue;
        },
        useFantomEdit: function (key, defaultEdit = false, imageEdit = false) {
            const [editable, setEditable] = useState(defaultEdit);
            const [data, setData] = useState(db[key]);
            const inJsx = useRef(null);
            const previousBuffer = useRef(null);
            const changeBuffer = useRef(null);
            useEffect(() => {
                (() => __awaiter(this, void 0, void 0, function* () {
                    const prevData = yield storage.getItem(key);
                    if (prevData && this.areObjectsEqual(prevData, db[key])) {
                        setData(prevData);
                        changeBuffer.current = prevData;
                    }
                    else {
                        changeBuffer.current = db[key];
                    }
                }))();
            }, []);
            const addXPathToObjectValues = (obj, currentPath = '') => {
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const value = obj[key];
                        const newPath = currentPath === '' ? key : `${currentPath}.${key}`;
                        if (typeof value === 'object' && value !== null) {
                            addXPathToObjectValues(value, newPath);
                        }
                        else if (changeBuffer.current) {
                            const text = this.getValueByPath(changeBuffer.current, newPath);
                            if (imageEdit && typeof text === "string" && this.isImagePath(text)) {
                                obj[key] = {
                                    src: text,
                                    setSrc: (value) => {
                                        this.setValueByPath(changeBuffer.current, newPath, value);
                                    }
                                };
                            }
                            else if (typeof text === "string") {
                                obj[key] = this.isURL(text) || this.isImagePath(text) ?
                                    text :
                                    React.createElement("p", { contentEditable: true, onBlur: e => {
                                            this.setValueByPath(changeBuffer.current, newPath, e.target.textContent);
                                        } }, text);
                            }
                        }
                    }
                }
                return obj;
            };
            const memoWrapper = () => {
                const current = JSON.stringify(changeBuffer.current);
                if (inJsx.current && previousBuffer.current === current) {
                    return inJsx.current;
                }
                previousBuffer.current = current;
                return inJsx.current = addXPathToObjectValues(JSON.parse(current));
            };
            useEffect(() => {
                (() => __awaiter(this, void 0, void 0, function* () {
                    if (editable) {
                        setData(memoWrapper());
                    }
                    else {
                        if (changeBuffer.current) {
                            storage.setItem(key, changeBuffer.current);
                            setData(changeBuffer.current);
                        }
                    }
                }))();
            }, [editable]);
            return [data, editable, setEditable];
        },
    };
}
