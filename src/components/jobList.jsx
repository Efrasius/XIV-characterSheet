import React, { useState, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import { SketchPicker } from 'react-color';
import JobWrapper from "./jobWrapper";
import CharacterInfos from "./characterInfos"
import "../style/jobList.css";

export default function JobList(props) {
    const [jobStyle, setJobStyle] = useState({ name: false, server: false, lvlColor: '', infosColor: '' });
    const [formParams, setFormParams] = useState({ background: false, lvlColor: false, infosColor: false })
    const [bgColor, setBgColor] = useState({});

    const { jobList } = props;
    const { iconPath } = props;
    const { allInfos } = props;

    const jobs = {'tank': [], 'heal': [], 'physicDps': [], 'rangeDps': [], 'magicDps': [], 'craft': [], 'farm': []};


    useEffect(() => {
    }, [])


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

    function changeBackground(color, event) {
        setBgColor(color.rgb);
    }

    function handleChange(color, event) {
        let picker = event.target.closest(".colorPicker");

        if (picker.classList.contains("levelPicker"))
            setJobStyle(currValue => ({ ...currValue, lvlColor: color.rgb }))
        else if (picker.classList.contains("infosPicker"))
            setJobStyle(currValue => ({ ...currValue, infosColor: color.rgb }))
    }

    return (
        <div className={`jobList`} id='jobList'>
            <div className={`sheetImg`} id='sheetImg' style={{background: `rgb(${bgColor.r}, ${bgColor.g}, ${bgColor.b}, ${bgColor.a})`, color: `rgb(${jobStyle.lvlColor.r}, ${jobStyle.lvlColor.g}, ${jobStyle.lvlColor.b}, ${jobStyle.lvlColor.a})`}}>
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
                    <input id='background' name='background' type='checkbox' checked={jobStyle.background} onChange={(e) => setFormParams(currValue => ({ ...currValue, background: e.target.checked }))} />
                    <SketchPicker id="background" className={`colorPicker ${formParams.background? '': 'none'}`} color={bgColor} onChange={changeBackground} />
                </div>
                <div className='formLabeled'>
                    <label className='formLabel' htmlFor='lvlColor'>Couleur des niveaux</label>
                    <input id='lvlColor' name='lvlColor' type='checkbox' checked={formParams.lvlColor} onChange={(e) => setFormParams(currValue => ({ ...currValue, lvlColor: e.target.checked }))} />
                    <SketchPicker id="lvlColorPicker" className={`colorPicker levelPicker ${formParams.lvlColor? '': 'none'}`} color={jobStyle.lvlColor} onChange={handleChange} />
                </div>
                <div className='formLabeled'>
                    <label className='formLabel' htmlFor='infosColor'>Couleur des infos</label>
                    <input id='infosColor' name='infosColor' type='checkbox' checked={formParams.infosColor} onChange={(e) => setFormParams(currValue => ({ ...currValue, infosColor: e.target.checked }))} />
                    <SketchPicker id="infosColorPicker" className={`colorPicker infosPicker ${formParams.infosColor? '': 'none'}`} color={jobStyle.infosColor} onChange={handleChange} />
                </div>
                <input type="submit" className="formSubmit" value="Télécharger Ma fiche !" onClick={generateImg} />
            </form>
        </div>
    );
}