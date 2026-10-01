import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<SignUp />}></Route>
    <Route path="/login" element={<LogIn />}></Route>
    <Route path="/home" element={<Home />}></Route>
    </>
  )
);


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App