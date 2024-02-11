import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Picker from '@emoji-mart/react'

const EmojiPicker = (props: any) => {
    const [selectedEmoji, setSelectedEmoji] = useState();
    const [isShowPicker, setIsShowPicker] = useState(false);

    useEffect(() => {
        setSelectedEmoji(props.icon)
    }, [props.icon]);
    const selecteEmoji = (e: any) => {
        setSelectedEmoji(e.native);
    }
    const showPicker = () => setIsShowPicker(!isShowPicker);
    return (
        <Box sx={{ position: 'relative', width: 'max-content' }}>
            <Typography
                variant="h3"
                fontWeight="700"
                sx={{ cursor: 'pointer' }}
                onClick={showPicker}
            >
                {selectedEmoji}
            </Typography>
            <Box sx={{
                display: isShowPicker ? 'block' : 'none',
                position: 'absolute',
                top: '100%',
                zIndex: '9999'
            }}>
                <Picker onClickOutside={() => showPicker()} onEmojiSelect={selecteEmoji} />
            </Box>
        </Box>
    );
};

export default EmojiPicker;