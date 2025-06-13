import {Stack, Typography} from "@mui/material";
import React, {useEffect} from "react";

function BlinkTitle({title}: { title: string }) {
    const [opacity, setOpacity] = React.useState(1);
    useEffect(() => {
        setInterval(() => {
            setOpacity((prevOpacity) => (prevOpacity - 0.7) < 0.000001 ? 1 : 0.7);
        }, 10)
    }, [])

    return <Stack direction={'row'} width={'100%'} justifyContent={'center'}>
        <Typography
            fontFamily={'Geo'}
            sx={{
                opacity: opacity,
                textShadow: '0 0 15px rgba(0,255,0,0.9)',
                borderColor: '#ccf8bd'
            }}
            fontSize={"42px"}>
            {title}
        </Typography>
    </Stack>
}

export default BlinkTitle;