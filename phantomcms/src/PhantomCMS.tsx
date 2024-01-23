import React, {useEffect, useState, useRef} from "react";

export default function PhantomCMS<T = any>(this: any, storage: {
    getItem: (arg0: string) => PromiseLike<any>;
    setItem: (arg0: string, arg1: any) => void;
}, db: { [key: string]: T }) {

    return {
        getContent: async function (key: string) {
            return await storage.getItem(key);
        },
        useContent: function (key: string) {
            const [data, setData] = useState(null);

            useEffect(() => {
                (async () => {
                    try {
                        setData(await storage.getItem(key));
                    } catch (e) {
                        console.error(e);
                    }
                })();
            }, [])

            return data;
        },
        isURL: function (str: string) {
            const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)|localhost(\d{1,5})?(\/\S*)?$/;
            return urlRegex.test(str);
        },

        isImagePath: function (str: string) {
            const imageRegex = /\.(jpeg|jpg|gif|png|bmp)$/i;
            return imageRegex.test(str);
        },

        areObjectsEqual: function (obj1: any, obj2: any) {
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
        getValueByPath: function (obj: T, path: string): any | undefined {
            const keys = path.split('.');
            let value: any = obj;

            for (const key of keys) {
                if (value && typeof value === 'object' && key in value) {
                    value = value[key];
                } else {
                    return undefined;
                }
            }

            return value;
        },
        setValueByPath: function (obj: any, path: string, newValue: any) {
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
        useFantomEdit: function (key: string, defaultEdit = false, imageEdit = false): [data: typeof db[typeof key], editable: boolean, setEditable: React.Dispatch<React.SetStateAction<boolean>>] {
            const [editable, setEditable] = useState<boolean>(defaultEdit);
            const [data, setData] = useState(db[key]);
            const inJsx = useRef<any | null>(null);
            const previousBuffer = useRef<string | null>(null);
            const changeBuffer = useRef<typeof db[typeof key] | null>(null);

            useEffect(() => {
                (async () => {
                    const prevData = await storage.getItem(key);
                    if (prevData && this.areObjectsEqual(prevData, db[key])) {
                        setData(prevData);
                        changeBuffer.current = prevData;
                    } else {
                        changeBuffer.current = db[key];
                    }
                })()
            }, []);

            const addXPathToObjectValues = (obj: any, currentPath = '') => {
                for (const key in obj) {
                    if (obj.hasOwnProperty(key)) {
                        const value = obj[key];
                        const newPath = currentPath === '' ? key : `${currentPath}.${key}`;

                        if (typeof value === 'object' && value !== null) {
                            addXPathToObjectValues(value, newPath);
                        } else if (changeBuffer.current) {
                            const text = this.getValueByPath(changeBuffer.current, newPath);
                            if (imageEdit && typeof text === "string" && this.isImagePath(text)) {
                                obj[key] = {
                                    src: text,
                                    setSrc: (value: string) => {
                                        this.setValueByPath(changeBuffer.current, newPath, value);
                                    }
                                }
                            } else if (typeof text === "string") {
                                obj[key] = this.isURL(text) || this.isImagePath(text) ?
                                    text :
                                    <p contentEditable onBlur={e => {
                                    this.setValueByPath(changeBuffer.current, newPath, e.target.textContent);
                                }}>
                                {text}
                                </p>;
                            }
                        }
                    }
                }
                return obj;
            }

            const memoWrapper = () => {
                const current = JSON.stringify(changeBuffer.current);
                if (inJsx.current && previousBuffer.current === current) {
                    return inJsx.current;
                }
                previousBuffer.current = current;
                return inJsx.current = addXPathToObjectValues(JSON.parse(current));
            }

            useEffect(() => {
                (async () => {
                    if (editable) {
                        setData(memoWrapper());
                    } else {
                        if (changeBuffer.current) {
                            storage.setItem(key, changeBuffer.current);
                            setData(changeBuffer.current);
                        }
                    }
                })()
            }, [editable]);


            return [data, editable, setEditable];
        },
    }
}
