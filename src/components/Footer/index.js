import React from 'react';
import {Container} from "reactstrap"
import './footer.scss'

export default function Footer() {
  return (
    <>
      <Container className='footer-index' fluid>
        <Container>
          <span>Copyright &copy; Proshop Created by Alvin, 2022</span>
        </Container>
      </Container>
    </>
  );
}
