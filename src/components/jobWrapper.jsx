import React from 'react';

export default function JobWrapper(props) {
    const { jobs, iconPath } = props;



    return (
        <div className="jobWrapper">
            {jobs.length?jobs.map((val, key) => {
                return (<div className="job" key={key}>
                    <img className="jobIcon" src={require("../images/" + iconPath + val.jobName + ".png")} alt={val.jobName} />
                    <p className="lvl">{val.level}</p>
                 </div>)
            }):''}
        </div>
    )
}