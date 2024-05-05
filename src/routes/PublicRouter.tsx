import { Outlet } from "react-router-dom";

import React from 'react'

const PublicRouter = () => {
  return (
    <div>
      <div>PublicRouter</div>
      <Outlet />  // Añadir esto para que renderice los componentes hijos
    </div>
  )
}


export default PublicRouter;