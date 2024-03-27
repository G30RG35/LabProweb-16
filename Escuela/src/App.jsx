import React, { Suspense, useEffect, useState } from "react";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { PrivateRoutes } from "./router/PrivateRoutes";
import { PublicRoutes } from "./router/PublicRoutes";

function App() {

  const [router, setRouter] = useState(null);

  useEffect(() => {
    setRouter(createBrowserRouter([
      ...(true ? PrivateRoutes() : PublicRoutes()),
   ]));
  }, [])

  return (
    <>
    {
        router === null
        ? <Suspense>Cargando...</Suspense>
        : <RouterProvider router={router}  />
      }
    </>
  );
}

export default App;
