import {Box} from "@mui/material";
import React, {useEffect, useRef, useState} from "react";

export function MovingSquid() {
    const containerRef = useRef<HTMLDivElement>(null);
    const [position, setPosition] = useState(0);
    const directionRef = useRef(1)
    const pausedRef = useRef<boolean>(false);
    const gifWidth = 30;
    useEffect(() => {
        const interval = setInterval(() => {
            if (!containerRef.current) return;
            if (pausedRef.current) return;
            const containerWidth = containerRef.current.offsetWidth;
            const maxPosition = containerWidth - gifWidth;
            setPosition(prev => {
                let next = prev + directionRef.current  * 2;
                if (next <= 0 || next >= maxPosition) {
                    directionRef.current = -directionRef.current;
                }
                return next;
            });
        }, 50);

        return () => clearInterval(interval);
    }, []);

    return (
        <Box
            ref={containerRef}
            sx={{
                position: "relative",
                width: "100%",
                overflow: "hidden",
            }}
        >
            <Box component={'a'} href={'https://github.com'}>
                <Box
                    component="img"
                    src="/image/github-loading.gif"
                    alt=""
                    width={gifWidth}
                    onMouseEnter={() => {
                        console.log('pause true')
                        pausedRef.current = true;
                    }}
                    onMouseLeave={() => {
                        console.log('pause false')
                        pausedRef.current = false;
                    }}
                    sx={{
                        position: "absolute",
                        top: 0,
                        left: `${position}px`,
                        transform: directionRef.current === -1 ? "scaleX(1)" : "scaleX(-1)",
                    }}
                />
            </Box>

        </Box>
    );

}

