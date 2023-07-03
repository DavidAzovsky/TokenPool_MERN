
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import RefreshIcon from '@mui/icons-material/Refresh';
import { useProSidebar } from "react-pro-sidebar";

function AppHeader() {

    const { collapseSidebar, toggleSidebar, collapsed, broken } = useProSidebar();
    const onClick = () => {
        location.reload(true);
    }

    return <AppBar position="sticky" sx={styles.appBar}>
        <Toolbar >
            <Box
                component={'img'}
                sx={styles.appLogo}
                src="/src/assets/sample-logo.png" />
            <Box
                sx={{ flexGrow: 1 }} />
            <IconButton title="Notifications" color="secondary" onClick={onClick}>
                <RefreshIcon />
            </IconButton>
        </Toolbar>
    </AppBar>;
}

/** @type {import("@mui/material").SxProps} */
const styles = {
    appBar: {
        bgcolor: 'neutral.main'
    },
    appLogo: {
        borderRadius: 2,
        width: 150,
        marginLeft: 2,
        cursor: 'pointer'
    }
}

export default AppHeader;