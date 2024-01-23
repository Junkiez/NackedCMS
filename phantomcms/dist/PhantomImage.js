"use client";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
import React, { useState, useRef } from "react";
export default function PhantomImage(_a) {
    var { src } = _a, args = __rest(_a, ["src"]);
    const text = useRef(null);
    const [editor, setEditor] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    return typeof src === "string" ? React.createElement("img", Object.assign({}, args, { src: src, alt: args.alt || '' })) :
        React.createElement(React.Fragment, null,
            React.createElement("img", Object.assign({}, args, { src: imageSrc || src.src, onClick: () => setEditor(!editor), alt: args.alt })),
            editor && React.createElement("div", { style: { position: "absolute", zIndex: "50" } },
                React.createElement("input", { defaultValue: src.src, style: {
                        width: "200px",
                        backgroundColor: '#efe',
                        height: "30px",
                        borderRadius: "8px",
                        color: 'gray'
                    }, type: "text", ref: text, placeholder: "new image url|path" }),
                React.createElement("br", null),
                React.createElement("button", { style: {
                        width: "200px",
                        backgroundColor: '#7c7',
                        height: "30px",
                        borderRadius: "8px",
                        color: 'black'
                    }, onClick: () => {
                        if (text.current) {
                            src.setSrc(text.current.value);
                            setImageSrc(text.current.value);
                        }
                    } }, "Set")));
}
