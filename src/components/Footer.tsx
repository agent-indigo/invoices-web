import {
  FunctionComponent,
  ReactElement
} from 'react'
const Footer: FunctionComponent = (): ReactElement => (
  <footer className="bg-secondary text-white text-center py-3">
    {new Date().toLocaleDateString()}
  </footer>
)
export default Footer