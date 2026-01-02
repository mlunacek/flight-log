// NavRail.js
// Wrapper that chooses Mobile vs Desktop implementation.

import React from "react";
import MobileNavRail from "./MobileNavRail";
import DesktopNavRail from "./DesktopNavRail";

export default function NavRail(props) {
    const { mobile = false } = props;
    return mobile ? <MobileNavRail {...props} /> : <DesktopNavRail {...props} />;
}