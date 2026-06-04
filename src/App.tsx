import { type ReactElement } from "react";
import { RouterProvider } from "@tanstack/react-router";
import { router } from "@/routes/router";

function App(): ReactElement {
  return <RouterProvider router={router} />;
}

export default App;
