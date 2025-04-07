import {
  FunctionComponent,
  PropsWithChildren,
  ReactElement
} from 'react'
import {
  Container,
  Row,
  Col
} from 'react-bootstrap'
const FormContainer: FunctionComponent<PropsWithChildren> = ({children}): ReactElement => (
  <Container>
    <Row className='justify-content-md-center'>
      <Col
        xs={12}
        md={6}
      >
        {children}
      </Col>
    </Row>
  </Container>
)
export default FormContainer