"use strict";
"use client";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importStar(require("react"));
function PhantomImage(_a) {
    var src = _a.src, args = __rest(_a, ["src"]);
    var text = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(false), editor = _b[0], setEditor = _b[1];
    var _c = (0, react_1.useState)(''), imageSrc = _c[0], setImageSrc = _c[1];
    return typeof src === "string" ? react_1.default.createElement("img", __assign({}, args, { src: src, alt: args.alt || '' })) :
        react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("img", __assign({}, args, { src: imageSrc || src.src, onClick: function () { return setEditor(!editor); }, alt: args.alt })),
            editor && react_1.default.createElement("div", { style: { position: "absolute", zIndex: "50" } },
                react_1.default.createElement("input", { defaultValue: src.src, style: {
                        width: "200px",
                        backgroundColor: '#efe',
                        height: "30px",
                        borderRadius: "8px",
                        color: 'gray'
                    }, type: "text", ref: text, placeholder: "new image url|path" }),
                react_1.default.createElement("br", null),
                react_1.default.createElement("button", { style: {
                        width: "200px",
                        backgroundColor: '#7c7',
                        height: "30px",
                        borderRadius: "8px",
                        color: 'black'
                    }, onClick: function () {
                        if (text.current) {
                            src.setSrc(text.current.value);
                            setImageSrc(text.current.value);
                        }
                    } }, "Set")));
}
exports.default = PhantomImage;
