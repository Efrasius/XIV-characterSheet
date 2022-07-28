import React, { useState, useEffect } from 'react';
import '../style/sheetForm.css'
import SheetEditor from './sheetEditor';
import JobList from './jobList';
import * as htmlToImage from 'html-to-image';
import toPng from 'html-to-image';



function SheetForm() {
    const [lodestoneId, setLodestoneId] = useState("");
    const [mainJob, setmainJob] = useState("Paladin");
    const [err, setErr] = useState("");
    const [iconPath, setIconPath] = useState("Set1/");
    //const [showStyle, setShowStyle] = useState("");
    const [jobArray, setJobArray] = useState([]);
    const [jobComp, setJobComp] = useState("");



    const launchApi = async (event) => {
        event.preventDefault();

        if (lodestoneId.length === 0) {
            alert("Veuillez entrer l'id lodestone de votre personnage")
        } else {
            try {
                fetch(`https://xivapi.com/character/${lodestoneId}`)
                    .then(response => response.json())
                    .then(data => {
                        if (data.Error !== true) {
                            setJobArray(data.Character.ClassJobs);
                        }
                        else {
                            alert("Erreur lors de la récupération des informations. Vérifiez l'id.")
                        }
                    })
            }
            catch (error) {
                setErr(error.message);
                console.log("erreur lors du fetch : ", err);
            }

        }
    }

    useEffect(() => {
        setTimeout(() => {
            let node = document.getElementById('jobList');

            console.log(node);
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
        
    })

    return (
        <div>
            <form className="myForm" onSubmit={launchApi}>
                <div className="formLabeled">
                    <label className="formLabel" htmlFor="lodestoneId">Lodestone ID</label>
                    <input id="lodestoneId" className="formInput" name="lodestoneId" value={lodestoneId} onChange={(e) => setLodestoneId(e.target.value)} type="text" />
                </div>
                {/*<div className="formLabeled">
                    <label className="formLabel" htmlFor="mainJob">Main Job</label>
                    <select id="mainJob" name="mainJob" className="formInput" value={mainJob} onChange={(e) => setmainJob(e.target.value)}>
                        <option value="Paladin">Paladin</option>
                        <option value="Guerrier">Guerrier</option>
                        <option value="chevalier-noir">Chevalier Noir</option>
                        <option value="pistosabreur">Pistosabreur</option>
                        <option value="mage-blanc">Mage Blanc</option>
                        <option value="erudit">Erudit</option>
                        <option value="astromancien">Astromancien</option>
                        <option value="sage">Sage</option>
                        <option value="moine">Moine</option>
                        <option value="chevalier-dragon">Chevalier Dragon</option>
                        <option value="ninja">Ninja</option>
                        <option value="samourai">Samouraï</option>
                        <option value="faucheur">Faucheur</option>
                        <option value="barde">Barde</option>
                        <option value="machiniste">Machiniste</option>
                        <option value="danseur">Danseur</option>
                        <option value="mage-noir">Mage Noir</option>
                        <option value="invocateur">Invocateur</option>
                        <option value="mage-rouge">Mage Rouge</option>
                        <option value="mage-bleu">Mage Bleu</option>
                        <option value="menuisier">Menuisier</option>
                        <option value="forgeron">Forgeron</option>
                        <option value="armurier">Armurier</option>
                        <option value="orfevre">Orfèvre</option>
                        <option value="tanneur">Tanneur</option>
                        <option value="couturier">Couturier</option>
                        <option value="alchimiste">Alchimiste</option>
                        <option value="cuisinier">Cuisinier</option>
                        <option value="mineur">Mineur</option>
                        <option value="botaniste">Botaniste</option>
                        <option value="pecheur">Pêcheur</option>
                    </select>
                </div>*/}
                <input type="submit" className="formSubmit" value="Générer Ma fiche !" onClick={launchApi} />
            </form>
            <div className="jobImg"></div>
            <JobList jobList={jobArray} iconPath={iconPath} />
            <div className="editor">
                <SheetEditor />
            </div>
        </div>
    )
}

export default SheetForm;