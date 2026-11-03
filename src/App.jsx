import {
  createRoutesFromElements,
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import Home from "./pages/Home";
import Message from "./pages/Message";
import Notification from "./pages/Notification";
import Setting from "./pages/Setting";
import RootLayout from "./components/RootLayout";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/signin" element={<SignUp />}></Route>
      <Route path="/login" element={<LogIn />}></Route>

      <Route path="/dashboard" element={<RootLayout />}>
        <Route path="home" element={<Home />}></Route>
        <Route path="message" element={<Message />}></Route>
        <Route path="notification" element={<Notification />}></Route>
        <Route path="setting" element={<Setting />}></Route>
      </Route>

    </>
  )
);


const App = () => {
  return (
    <RouterProvider router={router} />
  )
}

export default App