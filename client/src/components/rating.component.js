import React, { useState } from 'react';
import {ButtonDropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import '../App.css';

const RatingDropDownButton = () => {
    const [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);

    return(
        <ButtonDropdown color="secondary" size="sm" isOpen={dropdownOpen} toggle={toggle}>
            <DropdownToggle caret>
                Rate
            </DropdownToggle>
            <DropdownMenu>
                <DropdownItem>
                    5
                </DropdownItem>
                <DropdownItem>
                    4
                </DropdownItem>
                <DropdownItem>
                    3
                </DropdownItem>
                <DropdownItem>
                    2
                </DropdownItem>
                <DropdownItem>
                    1
                </DropdownItem>
            </DropdownMenu>
        </ButtonDropdown>
    )
}

export default RatingDropDownButton;