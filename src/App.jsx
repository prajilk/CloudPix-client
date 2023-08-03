import { Route, Routes } from "react-router-dom"
import PageLoading from "./components/loading/PageLoading"
import Error404 from "./components/error/Error404";
import { Suspense, lazy } from "react"

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

function App() {

  return (
    <Suspense fallback={<PageLoading />}>
      <Routes>
        <Route path="*" element={<Error404 />} />
        <Route path="/" exact element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Suspense>
  )
}

export default App
