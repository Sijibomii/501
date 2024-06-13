import * as React from "react";

function NavIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink">
        <rect width="56" height="56" fill="url(#pattern0_25_33)"/>
        <defs>
        <pattern id="pattern0_25_33" patternContentUnits="objectBoundingBox" width="1" height="1">
        <use xlinkHref="#image0_25_33" transform="scale(0.0111111)"/>
        </pattern>
        <image id="image0_25_33" width="90" height="90" xlinkHref="data:image/png;base64,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"/>
        </defs>
    </svg>
    );
}

export default NavIcon;