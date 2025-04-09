import {BrowserRouter as Router} from 'react-router-dom';
import AppRouter from '@/router/AppRouter';
import { useState } from 'react';

const App = () => {
  const [page, setPage] = useState("home");
  
  return (
    <Router>
      <AppRouter page={page} />
    </Router>
  )
}

export default App