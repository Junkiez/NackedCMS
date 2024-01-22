import {useEffect, useState, useRef} from "react";

export function PhantomImage(props) {
    const text = useRef(null);
    const [editor, setEditor] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    return typeof props.src === "string" ? <img {...props}/> :
        <>
            <img {...props} src={imageSrc || props.src.src} onClick={()=>setEditor(!editor)}/>
            {editor && <div style={{position:"absolute", zIndex: "50"}}>
                <input defaultValue={props.src.src} style={{width:"200px",backgroundColor:'#efe', height: "30px", borderRadius:"8px",color:'gray'}} type="text" ref={text} placeholder="new image url|path"/>
                <br/>
            <button style={{width:"200px", backgroundColor:'#7c7', height: "30px", borderRadius:"8px",color:'black'}} onClick={() =>{
                props.src.setSrc(text.current.value);
                setImageSrc(text.current.value);
            }}>Set</button></div>}
        </>
}

export function PhantomCMS(storage, db) {

    this.getContent = async function (key) {
        return await storage.getItem(key);
    }

    this.useContent = function (key) {
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
    }

    function isURL(str) {
        const urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)|localhost([\d]{1,5})?(\/[^\s]*)?$/;
        return urlRegex.test(str);
    }

    function isImagePath(str) {
        const imageRegex = /\.(jpeg|jpg|gif|png|bmp)$/i;
        return imageRegex.test(str);
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

    this.useFantomEdit = function (key, defaultEdit = false, imageEdit = false) {
        const [editable, setEditable] = useState(defaultEdit);
        const [data, setData] = useState(db[key]);
        const inJsx = useRef(null);
        const previousBuffer = useRef(null);
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
                        const text = getValueByPath(changeBuffer.current, newPath);
                        if(imageEdit && isImagePath(text)){
                            obj[key] = {
                                src: text,
                                setSrc: (value)=>{
                                    setValueByPath(changeBuffer.current, newPath, value);
                                }
                            }
                        } else {
                            obj[key] = isURL(text) || isImagePath(text) ?
                                text :
                                <p contentEditable="plaintext-only" onBlur={e => {
                                    setValueByPath(changeBuffer.current, newPath, e.target.textContent);
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
                        await storage.setItem(key, changeBuffer.current);
                        setData(changeBuffer.current);
                    }
                }
            })()
        }, [editable]);


        return [data, editable, setEditable];
    }

}
