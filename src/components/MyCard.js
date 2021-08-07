import React, { useState, useEffect } from 'react';
import { Card, Icon, Image } from 'semantic-ui-react';
import { useHistory } from "react-router";
import load from "./loader.gif";

function MyCard() {
    const [login, setLogin] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage, setItemsPerPage] = useState(6);

    const handleClick = (event) => {
        setCurrentPage(Number(event.target.id));
    }

    const handlePrev = () => {
        setCurrentPage(currentPage-1);
    }

    const handleNext = () => {
        setCurrentPage(currentPage+1);
    }

    const apiUrl = "https://api.github.com/organizations";
    const pages = []
    for(let i=1; login!=null && i <= Math.ceil(login.length / itemsPerPage); i++){
        pages.push(i);
    } 

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    const renderPagination = pages.map((pageNumber) => {
        return(
            <li key={pageNumber} id={pageNumber} onClick={handleClick}
            className={currentPage === pageNumber ? 'active' : null}>
                {pageNumber}
            </li>
        )
    })

    useEffect(() => {
        fetch(apiUrl)
            .then(response => response.json())
            .then(response => {
                //console.log(response);
                setLogin(response);
            })
    }, []);

    let history = useHistory();

    return (
    <div>
        { login ?
        (<div>
        <div className="orgcard">
                {login && login.slice(indexOfFirstItem, indexOfLastItem).map((loginName, index) => {
                    return (
                        <Card key={index} className="org_card">
                            <Image src={loginName.avatar_url} wrapped ui={false} />
                            <Card.Content>
                                <h3 className="loginName">{loginName.login}</h3>
                                <Card.Meta>
                                    <span className='date'>{loginName.id}</span>
                                </Card.Meta>
                            </Card.Content>
                            <Card.Content extra>
                                <button onClick={() => {
                                    history.push({
                                        pathname: "/orgInfo",
                                        state: { detail: loginName.url }
                                    })
                                }
                                }
                                    className="cardInfobtn">
                                    <Icon name="user" /> More info
                                </button>
                            </Card.Content>
                        </Card>
                    )
                })
            } 
        </div><div className="pagination">
            <ul className="pageNumbers">
                <li><button onClick={handlePrev}>Prev</button></li>
                {renderPagination}
                <li><button onClick={handleNext}>Next</button></li>
                </ul>
            </div>
            <br/><br/>
        </div>) : <div className="load"><img src={load} alt="Loading..." className="loader"/></div>
        }
    </div>
    );
}

export default MyCard;
