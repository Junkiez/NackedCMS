"use strict";
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
exports.PhantomCMS = exports.PhantomImage = void 0;
var react_1 = __importStar(require("react"));
function PhantomImage(_a) {
    var src = _a.src, args = __rest(_a, ["src"]);
    var text = (0, react_1.useRef)(null);
    var _b = (0, react_1.useState)(false), editor = _b[0], setEditor = _b[1];
    var _c = (0, react_1.useState)(''), imageSrc = _c[0], setImageSrc = _c[1];
    return typeof src === "string" ? react_1.default.createElement("img", __assign({}, args, { alt: args.alt || '' })) :
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
exports.PhantomImage = PhantomImage;
function PhantomCMS(storage, db) {
    this.getContent = function (key) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, storage.getItem(key)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    this.useContent = function (key) {
        var _this = this;
        var _a = (0, react_1.useState)(null), data = _a[0], setData = _a[1];
        (0, react_1.useEffect)(function () {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var _a, e_1;
                return __generator(this, function (_b) {
                    switch (_b.label) {
                        case 0:
                            _b.trys.push([0, 2, , 3]);
                            _a = setData;
                            return [4 /*yield*/, storage.getItem(key)];
                        case 1:
                            _a.apply(void 0, [_b.sent()]);
                            return [3 /*break*/, 3];
                        case 2:
                            e_1 = _b.sent();
                            console.error(e_1);
                            return [3 /*break*/, 3];
                        case 3: return [2 /*return*/];
                    }
                });
            }); })();
        }, []);
        return data;
    };
    function isURL(str) {
        var urlRegex = /^(https?:\/\/)?([\w-]+(\.[\w-]+)+\/?)|localhost(\d{1,5})?(\/\S*)?$/;
        return urlRegex.test(str);
    }
    function isImagePath(str) {
        var imageRegex = /\.(jpeg|jpg|gif|png|bmp)$/i;
        return imageRegex.test(str);
    }
    function areObjectsEqual(obj1, obj2) {
        var keys1 = Object.keys(obj1);
        var keys2 = Object.keys(obj2);
        if (keys1.length !== keys2.length) {
            return false;
        }
        for (var _i = 0, keys1_1 = keys1; _i < keys1_1.length; _i++) {
            var key = keys1_1[_i];
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
        var keys = path.split('.');
        var value = obj;
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            if (value && typeof value === 'object' && key in value) {
                value = value[key];
            }
            else {
                return undefined;
            }
        }
        return value;
    }
    function setValueByPath(obj, path, newValue) {
        var keys = path.split('.');
        var current = obj;
        for (var i = 0; i < keys.length - 1; i++) {
            var key = keys[i];
            if (!current[key] || typeof current[key] !== 'object') {
                current[key] = {};
            }
            current = current[key];
        }
        current[keys[keys.length - 1]] = newValue;
    }
    this.useFantomEdit = function (key, defaultEdit, imageEdit) {
        var _this = this;
        if (defaultEdit === void 0) { defaultEdit = false; }
        if (imageEdit === void 0) { imageEdit = false; }
        var _a = (0, react_1.useState)(defaultEdit), editable = _a[0], setEditable = _a[1];
        var _b = (0, react_1.useState)(db[key]), data = _b[0], setData = _b[1];
        var inJsx = (0, react_1.useRef)(null);
        var previousBuffer = (0, react_1.useRef)(null);
        var changeBuffer = (0, react_1.useRef)({});
        (0, react_1.useEffect)(function () {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                var prevData;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0: return [4 /*yield*/, storage.getItem(key)];
                        case 1:
                            prevData = _a.sent();
                            if (prevData && areObjectsEqual(prevData, db[key])) {
                                setData(prevData);
                                changeBuffer.current = prevData;
                            }
                            else {
                                changeBuffer.current = db[key];
                            }
                            return [2 /*return*/];
                    }
                });
            }); })();
        }, []);
        var addXPathToObjectValues = function (obj, currentPath) {
            if (currentPath === void 0) { currentPath = ''; }
            var _loop_1 = function (key_1) {
                if (obj.hasOwnProperty(key_1)) {
                    var value = obj[key_1];
                    var newPath_1 = currentPath === '' ? key_1 : "".concat(currentPath, ".").concat(key_1);
                    if (typeof value === 'object' && value !== null) {
                        addXPathToObjectValues(value, newPath_1);
                    }
                    else if (changeBuffer.current) {
                        var text = getValueByPath(changeBuffer.current, newPath_1);
                        if (imageEdit && typeof text === "string" && isImagePath(text)) {
                            obj[key_1] = {
                                src: text,
                                setSrc: function (value) {
                                    setValueByPath(changeBuffer.current, newPath_1, value);
                                }
                            };
                        }
                        else if (typeof text === "string") {
                            obj[key_1] = isURL(text) || isImagePath(text) ?
                                text :
                                react_1.default.createElement("p", { contentEditable: true, onBlur: function (e) {
                                        setValueByPath(changeBuffer.current, newPath_1, e.target.textContent);
                                    } }, text);
                        }
                    }
                }
            };
            for (var key_1 in obj) {
                _loop_1(key_1);
            }
            return obj;
        };
        var memoWrapper = function () {
            var current = JSON.stringify(changeBuffer.current);
            if (inJsx.current && previousBuffer.current === current) {
                return inJsx.current;
            }
            previousBuffer.current = current;
            return inJsx.current = addXPathToObjectValues(JSON.parse(current));
        };
        (0, react_1.useEffect)(function () {
            (function () { return __awaiter(_this, void 0, void 0, function () {
                return __generator(this, function (_a) {
                    if (editable) {
                        setData(memoWrapper());
                    }
                    else {
                        if (changeBuffer.current) {
                            storage.setItem(key, changeBuffer.current);
                            setData(changeBuffer.current);
                        }
                    }
                    return [2 /*return*/];
                });
            }); })();
        }, [editable]);
        return [data, editable, setEditable];
    };
}
exports.PhantomCMS = PhantomCMS;
