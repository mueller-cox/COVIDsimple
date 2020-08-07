import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import '../App.css';

const Preview = ( {name, content} ) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return(
        <div>
            <Button className='preview-article' size='sm' onClick={toggle}>Preview</Button>
            <Modal isOpen={modal} toggle={toggle} size='lg'>
                <ModalHeader className='preview-heading' toggle={toggle}>Previewing: {name}</ModalHeader>
                <ModalBody>
                   <div className='summary-heading'>Summary provided by source...</div>
                   <div fluid>{content}</div>
                </ModalBody>
             </Modal>
        </div>  
    )
}

export default Preview;