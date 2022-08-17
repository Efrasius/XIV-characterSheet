import React from 'react';

export default function CharacterInfos(props) {
    const { jobStyle, allInfos } = props;

    return (
        <div>{allInfos.Name}</div>
    )
}