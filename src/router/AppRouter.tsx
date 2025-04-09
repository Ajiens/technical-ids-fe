import Layout from '@/Layout';
import HomePage from '@/views/HomePage';
import { Routes, Route, Navigate } from 'react-router-dom';

interface AppRouterProps {
  page: string;
}

const AppRouter: React.FC<AppRouterProps> = ({ page }) => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <Layout>
            <HomePage />
          </Layout>
        }
      />
      <Route
        path="/about"
        element={
          <Layout>
            <div>Ini About</div>
          </Layout>
        }
      />
      {/* Redirect fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};

export default AppRouter;
