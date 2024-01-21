import {useEffect, useState, useRef} from "react";

export function PhantomCMS(storage, db) {

    this.getContent = async function (key) {
        return await storage.getItem(key);
    }

    this.useContent = function (key) {
        const [data, setData] = useState(null);

        useEffect(() => {
            (async ()=>{
                try {
                    setData(await storage.getItem(key));
                } catch (e) {
                    console.error(e);
                }
            })();
        },[])

        return data;
    }

    function areObjectsEqual(obj1, obj2) {
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
                if (!areObjectsEqual(obj1[key], obj2[key])) {
                    return false;
                }
            }
        }

        return true;
    }

    function getValueByPath(obj, path) {
        const keys = path.split('.');
        let value = obj;

        for (const key of keys) {
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            } else {
                return undefined;
            }
        }

        return value;
    }

    function setValueByPath(obj, path, newValue) {
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
    }

    this.useFantomEdit = function (key, defaultEdit=false) {
        const [editable, setEditable] = useState(defaultEdit);
        const [data, setData] = useState(db[key]);
        const inJsx = useRef(null);
        const changeBuffer = useRef(null);

        useEffect(() => {
            (async () => {
                const prevData = await storage.getItem(key);
                if (prevData && areObjectsEqual(prevData, db[key])) {
                    setData(prevData);
                    changeBuffer.current = prevData;
                } else {
                    changeBuffer.current = db[key];
                }
            })()
        }, []);

        const addXPathToObjectValues = (obj, currentPath = '') => {
            for (const key in obj) {
                if (obj.hasOwnProperty(key)) {
                    const value = obj[key];
                    const newPath = currentPath === '' ? key : `${currentPath}.${key}`;

                    if (typeof value === 'object' && value !== null) {
                        addXPathToObjectValues(value, newPath);
                    } else {
                        obj[key] = <p contentEditable="plaintext-only" onBlur={e => {
                            setValueByPath(changeBuffer.current, newPath, e.target.innerHTML);
                        }}>{getValueByPath(changeBuffer.current, newPath)}</p>;
                    }
                }
            }
            return obj;
        }

        const memoWrapper = () => {
            if (inJsx.current) {
                return inJsx.current;
            }
            return inJsx.current = addXPathToObjectValues(JSON.parse(JSON.stringify(changeBuffer.current)));
        }

        useEffect(() => {
            (async () => {
                if (editable) {
                    setData(memoWrapper());
                } else {
                    if (changeBuffer.current) {
                        await storage.setItem(key, changeBuffer.current);
                        setData(changeBuffer.current);
                    }
                }
            })()
        }, [editable]);


        return [data, editable, setEditable];
    }

}
