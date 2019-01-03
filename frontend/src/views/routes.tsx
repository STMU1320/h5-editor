export interface route {
  path: string;
  name: string;
  exact?: boolean;
}

const routes: Array<route> = [
  {
    path: '/',
    name: 'Editor',
    exact: true
  },
  {
    path: '/preview/',
    name: 'Preview'
  }
]

export default routes;