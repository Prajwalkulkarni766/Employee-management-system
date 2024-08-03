import * as React from 'react';
import Box from '@mui/material/Box';
import Fab from '@mui/material/Fab';

export default function FloatingActionButton({ onClick, icon: Icon }) {
    return (
        <Box
            sx={{
                position: 'fixed',
                bottom: 16,
                right: 16,
                zIndex: 1200,
            }}
        >
            <Fab aria-label="close" onClick={onClick}>
                <Icon />
            </Fab>
        </Box>
    );
}
