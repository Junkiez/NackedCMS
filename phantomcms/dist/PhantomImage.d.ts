import React from "react";
interface PhantomImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src: string | {
        src: string;
        setSrc: Function;
    };
}
export default function PhantomImage({ src, ...args }: PhantomImageProps): React.ReactElement;
export {};
