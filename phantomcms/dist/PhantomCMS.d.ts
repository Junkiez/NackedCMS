import React from "react";
export default function PhantomCMS<T = any>(this: any, storage: {
    getItem: (arg0: string) => PromiseLike<any>;
    setItem: (arg0: string, arg1: any) => void;
}, db: {
    [key: string]: T;
}): {
    getContent: (key: string) => Promise<any>;
    useContent: (key: string) => null;
    isURL: (str: string) => boolean;
    isImagePath: (str: string) => boolean;
    areObjectsEqual: (obj1: any, obj2: any) => boolean;
    getValueByPath: (obj: T, path: string) => any | undefined;
    setValueByPath: (obj: any, path: string, newValue: any) => void;
    useFantomEdit: (key: string, defaultEdit?: boolean, imageEdit?: boolean) => [data: T, editable: boolean, setEditable: React.Dispatch<React.SetStateAction<boolean>>];
};
