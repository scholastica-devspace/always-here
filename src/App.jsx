import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path="/" element={<SignUp />}></Route>
    <Route path="/login" element={<LogIn />}></Route>
    </>
  )
);


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App