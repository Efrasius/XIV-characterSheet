import React from 'react';

export default function JobType(props) {
    const { jobs } = props;
    const { iconPath } = props;

    return (
        <div className="jobWrapper">
            {jobs.map((val, key) => {
                return (<div className="job" key={key}>
                    <img className="jobIcon" src={require("../images/" + iconPath + val.jobName + ".png")} alt={val.jobName} />
                    <p className="lvl">{val.level}</p>
                 </div>)
            })}
        </div>
    )
}