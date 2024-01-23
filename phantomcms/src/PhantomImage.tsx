"use client";
import React, {useState, useRef} from "react";

// @ts-ignore
interface PhantomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | { src: string, setSrc: Function }
}

export default function PhantomImage({src, ...args}: PhantomImageProps): React.ReactElement {
    const text = useRef<HTMLInputElement | null>(null);
    const [editor, setEditor] = useState(false);
    const [imageSrc, setImageSrc] = useState('');
    return typeof src === "string" ? <img {...args} src={src} alt={args.alt || ''}/> :
        <>
            <img {...args} src={imageSrc || src.src} onClick={() => setEditor(!editor)} alt={args.alt}/>
            {editor && <div style={{position: "absolute", zIndex: "50"}}>
                <input defaultValue={src.src} style={{
                    width: "200px",
                    backgroundColor: '#efe',
                    height: "30px",
                    borderRadius: "8px",
                    color: 'gray'
                }} type="text" ref={text} placeholder="new image url|path"/>
                <br/>
                <button style={{
                    width: "200px",
                    backgroundColor: '#7c7',
                    height: "30px",
                    borderRadius: "8px",
                    color: 'black'
                }} onClick={() => {
                    if (text.current) {
                        src.setSrc(text.current.value);
                        setImageSrc(text.current.value);
                    }
                }}>Set
                </button>
            </div>}
        </>
}
