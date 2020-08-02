import React, { useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody} from 'reactstrap';
import '../App.css';

const Preview = ( {name, content} ) => {
    const [modal, setModal] = useState(false);
    const toggle = () => setModal(!modal);

    return(
        <div>
            <Button size='sm' color='info' onClick={toggle}>Preview</Button>
            <Modal isOpen={modal} toggle={toggle}>
                <ModalHeader toggle={toggle}>Previewing: {name}</ModalHeader>
                <ModalBody>
                   <div>Summary from source...</div>
                   <div>{content}</div>
                </ModalBody>
             </Modal>
        </div>  
    )
}

export default Preview;