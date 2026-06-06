import { createBrowserRouter } from "react-router";
import { LandingPage } from "./components/LandingPage";
import { DemoPage } from "./components/DemoPage";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: LandingPage,
  },
  {
    path: "/demo",
    Component: DemoPage,
  },
]);
