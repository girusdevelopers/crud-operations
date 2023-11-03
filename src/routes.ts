import HomeRoute from '@routes/index.route';

import messageRoutes from "@/routes/message.route"

import userRoutes from '@/routes/users.routes'




const routes = [
  {
    path: '/',
    func: HomeRoute,
  },
  {

    path: '/message',
    func: messageRoutes,
  },
  {
    path: '/user',
    func: userRoutes,
  }

];

export default routes;
