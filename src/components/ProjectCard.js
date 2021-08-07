import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const ProjectCard = () => {
    const [url, setUrl] = useState("");
    const [mydata, setData] = useState("");

    const location = useLocation();
    useEffect(() => {
        setUrl(location.state.detail);

        fetch(url)
            .then(response => response.json())
            .then(response => {
                console.log(response);
                setData(response);
            })
    }, [location, url]);

    return (
        <div>
            <div className="grid-container">
                <div className="profile_img">
                    <img src={mydata.avatar_url} alt="User's Avatar" className="pimg" />
                </div>
                <div className="profile_data">
                    <p className="orgname">{mydata.login}</p>
                    <span className="orgid">{mydata.id}</span><br />
                    <span className="orgtype">{mydata.type}</span>

                    <div className="subgrid">
                        <div className="column">
                            Followers:<br />
                            {mydata.followers}
                        </div>
                        <div className="column">
                            Following:<br />
                            {mydata.following}
                        </div>
                        <div className="column">
                            Public Gists:<br />
                            {mydata.public_gists}
                        </div>
                    </div>

                    <span className="profile_info">
                        Created date: {mydata.created_at}
                    </span><br />

                    <span className="profile_info">
                        Public repositories: {mydata.public_repos}
                    </span><br />

                    {mydata.has_organization_projects && mydata.has_repository_projects ?
                        <span className="profile_info">
                            Has repository and organization projects.
                        </span>
                        : <span className="profile_info">
                            Does not have repository and organization projects.
                    </span>
                    }
                    <br />
                    <span className="profile_info">
                        <a href={mydata.html_url} target="_blank" className="link">
                            Click here to view github profile
                    </a>
                    </span>
                </div>
                <br />
            </div>
            <a href="/" className="page link">Previous page</a>
        </div>
    )
}
export default ProjectCard