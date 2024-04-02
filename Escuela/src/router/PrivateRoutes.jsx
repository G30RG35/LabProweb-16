import { Crud } from "../Componentes/Crud/Crud";
import { Error404 } from "../Paginas/Error404/Error404";
import { Perfil } from "../Paginas/Perfil/Perfil";

export const PrivateRoutes = () => {
  return [
    {
      children: [
        {
          path: "/perfil",
          element: <Perfil />,
        },
        {
            path: "/crud",
            element: <Crud />,
          },
        {
          path: "*",
          element: <Error404/>,
        }
      ],
    },
  ];
};
