"use client";

import React, {useEffect, useId, useState} from "react";

interface SvgIconProps {
    name: string;
    localImage?: string;
    url?: string;
    width?: number | string;
    height?: number | string;
    className?: string;
    fill?: string;
}

const SvgIcon: React.FC<SvgIconProps> = ({
                                             name,
                                             localImage,
                                             url,
                                             width = 100,
                                             height = 100,
                                             className = "",
                                             fill = "currentColor",
                                         }) => {

       const uniqueId = useId();
       const maskId = `${name}-mask-${uniqueId}`;
    return (
        <svg
            className={`img-fluid  ${className}`}
            viewBox="0 0 100 100"
            width={width}
            height={height}
            preserveAspectRatio="none"
        >
            <defs>
                <mask id={maskId} x="0" y="0" width="100" height="100">
                    {localImage ? (
                        <image
                            className="img-fluid"
                            href={`/assets/svg/${localImage}`}
                            x="0"
                            y="0"
                            width="100"
                            height="100"
                        />
                    ) : url ? (
                        <image
                            className="img-fluid"
                            href={url}
                            x="0"
                            y="0"
                            width="100"
                            height="100"
                        />
                    ) : null}
                </mask>
            </defs>

            <rect
                x="0"
                y="0"
                width="100"
                height="100"
                style={{stroke: "none", fill}}
                mask={`url(#${maskId})`}
            />
        </svg>
    );
};

export default SvgIcon;
