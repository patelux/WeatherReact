// import { useSyncExternalStore, useState } from 'react';
// import UserInfo from '../components/UserInfo/UserInfo';
import photo from '../images/photo4.webp';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';


export default function Contacts() {
    return (
        <div className='contacts'>
            <div className='container'>
                <div className="team-title">
                    this app developed by
                </div>
                <div className="team-item">
                    <img src={photo} alt="" className="person-image" />
                    <div className="team-unit">
                        <h3 className="person-name">Levenets Natalia</h3>
                        <p className="person-position">FrontEnd Developer</p>
                    </div>
                </div>

                <div class="contacts_wrapper">
                    <div class="contact_tel">
                        <a href="tel:+380503022650" class="contact_link_phone">
                        <span><FontAwesomeIcon icon={faPhone}/></span>+38 0503022650
                        </a>
                    </div>
                    <div class="contact_email">
                        <a href="mailto:montichello@service.com" class="contact_link_email">
                        <span><FontAwesomeIcon icon={faEnvelope} /></span>patelux@gmail.com
                        </a>
                    </div>
                </div>
 
                <div className="team-link">
                    with 
                        <a href="https://beetroot.academy/" className='beetroot' target="_blank" rel="noopener noreferrer">Beetroot</a>
                    full support
                </div>

            </div>
        </div>
    )
}