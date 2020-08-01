import React, { useState } from 'react';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../App.css';

const RatingDropDownButton = ( {handleItemClick} ) => {
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);


    return(
        <ButtonDropdown color="secondary" size="sm" isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                Rate
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem  onClick={e => handleItemClick(e, 5)}>
                    5
                </DropdownItem>
                <DropdownItem onClick={e => handleItemClick(e, 4)}>
                    4
                </DropdownItem>
                <DropdownItem  onClick={e => handleItemClick(e, 3)}>
                    3
                </DropdownItem>
                <DropdownItem  onClick={e => handleItemClick(e, 2)}>
                    2
                </DropdownItem>
                <DropdownItem  onClick={e => handleItemClick(e, 1)}>
                    1
                </DropdownItem>
            </DropdownMenu>
        </ButtonDropdown>
    )
}

export default RatingDropDownButton;