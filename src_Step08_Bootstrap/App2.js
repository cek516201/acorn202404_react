// src/App2.js

import 'bootstrap/dist/css/bootstrap.css'
import { Alert, Container } from 'react-bootstrap';


function App2() {

    return (
        <Container>
            <h3>react bootstrap 활용</h3>
            <AlertSample/>
        </Container>
    );
}

function AlertSample() {
    return (
      <>
        {[
          'primary',
          'secondary',
          'success',
          'danger',
          'warning',
          'info',
          'light',
          'dark',
        ].map((variant) => (
          <Alert key={variant} variant={variant}>
            This is a {variant} alert—check it out!
          </Alert>
        ))}
      </>
    );
  }


 
export default App2;