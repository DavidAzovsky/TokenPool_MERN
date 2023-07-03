import { Route, Routes } from 'react-router-dom';
import Analytics from '../containers/Analytics/Analytics';

const AppRoutes = () => {
    return <Routes>
        <Route path='/' element={<Analytics />} />
    </Routes>
};

export default AppRoutes;