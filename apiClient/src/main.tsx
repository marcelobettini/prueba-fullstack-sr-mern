import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext.tsx';
import { ProtectedRoute } from './components/ProtectedRoute.tsx';
import { AdminRoute } from './components/AdminRoute.tsx';
import Home from './pages/Home.tsx';
import DashBoard from './pages/DashBoard.tsx';
import Register from './pages/Register.tsx';
import Login from './pages/Login.tsx';
import CategoryForm from './components/CategoryForm.tsx';
import ThemeForm from './components/ThemeForm.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>

          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Rutas protegidas */}
          <Route element={<ProtectedRoute />}>
            <Route path="/home" element={<Home />} />
          </Route>

          {/* Rutas solo para admin */}
          <Route element={<AdminRoute />}>

            <Route path="/admin" element={<DashBoard />}>
              <Route index element={<h2>Agregue categorias o temas</h2>} />
              <Route path='categories' element={<CategoryForm />} />
              <Route path='themes' element={<ThemeForm />} />
            </Route>
          </Route>
          <Route
            path="*"
            element={
              <main style={{ padding: "1rem" }}>
                {" "}
                <p>Not Found 👮‍♀️</p>{" "}
              </main>
            }
          />

        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
