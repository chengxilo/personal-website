import {Typography} from "@mui/material";
import React, {useEffect} from "react";

export function ToBeContinue() {
    const [dotCount, setDotCount] = React.useState<number>(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setDotCount(prev => (prev + 1) % 6);
        }, 1000);

        return () => clearInterval(interval); // Clean up on unmount
    }, []);

    const text = "to be continue" + ".".repeat(dotCount + 1);

    return (
        <Typography width="100%" textAlign="right">
            {text}
        </Typography>
    );

}