import {
  FunctionComponent,
  ReactElement
} from 'react'
import {Spinner} from 'react-bootstrap'
const Loader: FunctionComponent = (): ReactElement => (
  <Spinner
    animation='border'
    role='status'
    style={{
      width: '100px',
      height: '100px',
      margin: 'auto',
      display: 'block'
    }}
  />
)
export default Loader