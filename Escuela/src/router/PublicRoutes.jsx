import { Login } from "../Paginas/Login/Login";
import { Eventos } from "../Paginas/Eventos/Eventos";

export const PublicRoutes = () => {

  return [
    {
    //   element: <PublicRoutesLayout />,
      children: [
        {
          path: "/eventos",
          element: <Eventos/> ,
        },

        {
          path: "*",
          element: <Login />,
        },
      ],
    },
  ];
};