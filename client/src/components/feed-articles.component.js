import React, { useState } from 'react';
import { Table, Button, ButtonDropdown, DropdownItem, DropdownToggle, DropdownMenu} from 'reactstrap';
import '../App.css';


const FeedTable = ({ articles}) => {
    const  [dropdownOpen, setOpen] = useState(false);
    const toggle = () => setOpen(!dropdownOpen);

    return(
        <Table>
            <thead>
                <tr>
                    <td>News Feed</td>
                    <td colSpan="2">Filter</td>
                    <td colSpan="2">Sort</td>
                </tr>
            </thead>
            <tbody>
             {(articles.length > 0) ? articles.map( (article, i) => {
                   return (
                    <tr key={i}>
                        <td>{ article.name }</td>
                        <td>{ article.date}</td>
                        <td><Button color="primary" size="sm" onClick={() => window.open(`${article.url}`, "_blank")}>Read</Button></td>
                        <td><Button color="info" size="sm">Preview</Button></td>
                        <td><ButtonDropdown color="secondary" size="sm" isOpen={dropdownOpen} toggle={toggle}>
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
                        </td>
                    </tr>
                   )
               }) : <tr><td colSpan="5">Loading Data...</td></tr>}
                         
            </tbody>
        </Table>
    );
}

export default FeedTable;