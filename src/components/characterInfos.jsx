import React from 'react';
import "../style/characterInfos.css";

export default function CharacterInfos(props) {
    const { jobStyle, allInfos } = props;

    //console.log(jobStyle);

    if (!jobStyle.portrait && !jobStyle.name && !jobStyle.server) {
        return null;
    }


    return (
        <div className={`characterInfos ${jobStyle.position}`} style={{color: `rgb(${jobStyle.infosColor.r}, ${jobStyle.infosColor.g}, ${jobStyle.infosColor.b}, ${jobStyle.infosColor.a})`}}>
            {jobStyle.portrait? <img className='characterInfo' src={`${allInfos.Avatar}`} />: ''}
            {jobStyle.name? <p className='characterInfo'>{allInfos.Name}</p>: ''}
            {jobStyle.server? <p className='characterInfo'>{allInfos.Server}</p>: ''}
        </div>
    )
}