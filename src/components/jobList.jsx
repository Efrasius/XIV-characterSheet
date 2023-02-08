import React, { useState, useEffect } from 'react';
import JobWrapper from "./jobWrapper";
import CharacterInfos from "./characterInfos"
import "../style/jobList.css";

export default function JobList(props) {
    const { jobStyle, setJobStyle, bgColor, jobList, iconPath, allInfos } = props;

    const jobs = {'tank': [], 'heal': [], 'physicDps': [], 'rangeDps': [], 'magicDps': [], 'craft': [], 'farm': []};

    if (!jobList || !jobList.length || !iconPath)
        return (null);

    function parse() {
        jobList.forEach(job => {
            let jobName = job.Name.split(" / ")[1];
            let imgPath = iconPath + jobName + '.png'

            if (jobName === "paladin" || jobName === "warrior" || jobName === "dark knight" || jobName === "gunbreaker") {
                jobs.tank.push({ "jobName": jobName, "imgPath": imgPath, "level": job.Level });
            }
            else if (jobName === "white mage" || jobName === "scholar" || jobName === "astrologian" || jobName === "sage") {
                jobs.heal.push({ "jobName": jobName, "imgPath": imgPath, "level": job.Level });
            }
            else if (jobName === "monk" || jobName === "dragoon" || jobName === "ninja" || jobName === "samurai" || jobName === "reaper") {
                jobs.physicDps.push({ "jobName": jobName, "imgPath": imgPath, "level": job.Level });
            }
            else if (jobName === "bard" || jobName === "machinist" || jobName === "dancer") {
                jobs.rangeDps.push({ "jobName": jobName, "imgPath": imgPath, "level": job.Level });
            }
            else if (jobName === "black mage" || jobName === "summoner" || jobName === "red mage" || jobName === "blue mage") {
                jobs.magicDps.push({ "jobName": jobName, "imgPath": imgPath, "level": job.Level });
            }
            else if (jobName === "carpenter" || jobName === "blacksmith" || jobName === "armorer" || jobName === "goldsmith" || jobName === "leatherworker" || jobName === "weaver" || jobName === "alchemist" || jobName === "culinarian") {
                jobs.craft.push({ "jobName": jobName, "imgPath": imgPath, "level": job.Level });
            }
            else
                jobs.farm.push({ "jobName": jobName, "imgPath": imgPath, "level": job.Level });
        })
    }
    parse();

    return (
        <div className={`jobList`} id='jobList'>
            <div className={`sheetImg`} id='sheetImg' style={{background: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`, color: `rgb(${jobStyle.lvlColor.r}, ${jobStyle.lvlColor.g}, ${jobStyle.lvlColor.b}, ${jobStyle.lvlColor.a})`}}>
                {jobStyle.position==='top'?<CharacterInfos jobStyle={jobStyle} allInfos={allInfos} />: ''}
                <div className="jobType">
                    <JobWrapper jobs={jobs.tank} iconPath={iconPath} />
                    <JobWrapper jobs={jobs.heal} iconPath={iconPath} />
                </div>
                <div className='jobType'>
                    <JobWrapper jobs={jobs.physicDps} iconPath={iconPath} />
                    <JobWrapper jobs={jobs.rangeDps} iconPath={iconPath} />
                    <JobWrapper jobs={jobs.magicDps} iconPath={iconPath} />
                </div>
                <div className='jobType'>
                    <JobWrapper jobs={jobs.craft} iconPath={iconPath} />
                    <JobWrapper jobs={jobs.farm} iconPath={iconPath} />
                </div>
                {jobStyle.position==='bottom'?<CharacterInfos jobStyle={jobStyle} allInfos={allInfos} />: ''}
            </div>
        </div>
    );
}