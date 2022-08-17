import React from 'react';
import "../style/characterInfos.css";

export default function CharacterInfos(props) {
    const { jobStyle, allInfos } = props;

    //console.log(jobStyle);


    return (
        <div className='characterInfos' style={{color: `rgb(${jobStyle.infosColor.r}, ${jobStyle.infosColor.g}, ${jobStyle.infosColor.b}, ${jobStyle.infosColor.a})`}}>
            {jobStyle.name? <p className='characterInfo'>{allInfos.Name}</p>: ''}
            {jobStyle.server? <p className='characterInfo'>{allInfos.Server}</p>: ''}
        </div>
    )
}