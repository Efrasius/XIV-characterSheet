import React, { useState, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import JobWrapper from "./jobWrapper";
import CharacterInfos from "./characterInfos"
import "../style/jobList.css";

export default function JobList(props) {
    const [jobStyle, setJobStyle] = useState({ background: 'none', name: false, server: false });

    const { jobList } = props;
    const { iconPath } = props;
    const { allInfos } = props;

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

    function generateImg(e) {
        e.preventDefault();
        setTimeout(() => {
            let node = document.getElementById('sheetImg');

            if (node !== null) {
                htmlToImage.toPng(node)
                    .then(dataUrl => {
                        const link = document.createElement('a')

                        link.download = 'liste-des-jobs.png'
                        link.href = dataUrl
                        link.click()
                    })
                    .catch(function (error) {
                        console.error('oops, something went wrong!', error);
                    });
            }
        }, 500)

    }

    return (
        <div className={`jobList`} id='jobList'>
            <div className={`sheetImg ${jobStyle.background}`} id='sheetImg'>
                <CharacterInfos jobStyle={jobStyle} allInfos={allInfos} />
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
            </div>
            <form className='jobForm'>
                <h2>Infos</h2>
                <div className='formLabeled'>
                    <label className='formLabel' htmlFor='name'>Nom du Personnage</label>
                    <input id='name' name='name' type='checkbox' checked={jobStyle.name} onChange={(e) => setJobStyle(currValue => ({ ...currValue, name: e.target.checked }))} />
                </div>
                <div className='formLabeled'>
                    <label className='formLabel' htmlFor='server'>Serveur</label>
                    <input id='server' name='server' type='checkbox' checked={jobStyle.server} onChange={(e) => setJobStyle(currValue => ({ ...currValue, server: e.target.checked }))} />
                </div>
                

                <h2>Style</h2>
                <div className='formLabeled'>
                    <label className='formLabel' htmlFor='background'>Fond liste de jobs</label>
                    <select id='background' name='background' value={jobStyle.background} onChange={(e) => setJobStyle(currValue => ({ ...currValue, background: e.target.value }))}>
                        <option value="white">Blanc</option>
                        <option value="black">Noir</option>
                        <option value="none">Aucun</option>
                    </select>
                </div>
                <input type="submit" className="formSubmit" value="Télécharger Ma fiche !" onClick={generateImg} />
            </form>
        </div>
    );
}