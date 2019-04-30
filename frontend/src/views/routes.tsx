export interface route {
  path: string;
  name: string;
  exact?: boolean;
}

const routes: Array<route> = [
  {
    path: '/',
    name: 'Home',
    exact: true
  },
  {
    path: '/editor/:id?',
    name: 'Editor',
    exact: true
  }
]

export default routes;