import { library } from '@fortawesome/fontawesome-svg-core';
import { faTwitter, faFacebookF, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { Container } from '@mui/material';
import ModalFooter from '../ModalFooter';

library.add(faTwitter, faFacebookF, faInstagram);

export default function Footer (){
  
    return(
        <footer className="footer">
        <Container>
    
          <div className="copyright-box">
            <p className="footer-copyright">© 2023 Beetroot. All Rights Reserved.</p>
            <ModalFooter />          
          </div>
          
        </Container>
      </footer>
    )
}
