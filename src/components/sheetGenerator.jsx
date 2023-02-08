import React, { useState, useEffect } from 'react';
import '../style/sheetGenerator.css'
//import SheetEditor from './sheetEditor';
import JobList from './jobList';
import JobForm from './jobForm';



export default function SheetGenerator() {
    const [lodestoneId, setLodestoneId] = useState("");
    const [err, setErr] = useState("");
    const [iconPath, setIconPath] = useState("Set1/");
    const [jobArray, setJobArray] = useState([]);
    const [pvpArray, setPvpArray] = useState([]);
    const [formParams, setFormParams] = useState({ background: false, lvlColor: false, infosColor: false })
    const [jobStyle, setJobStyle] = useState({ portrait: false, name: false, server: false, position: 'top', lvlColor: '', infosColor: '' });
    const [bgColor, setBgColor] = useState({});
    const [displayForm, setDisplayForm] = useState(false);


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
                            //console.log(typeof data.Character.ClassJobs)
                            setJobArray(data.Character);
                            setDisplayForm(true);
                            //generateImg();
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


    }, [])

    return (
        <div>
            <form className="myForm">
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
            <div className='jobs'>
                {displayForm?<JobList jobList={jobArray.ClassJobs} allInfos={jobArray} iconPath={iconPath} jobStyle={jobStyle} setJobStyle={setJobStyle} bgColor={bgColor} />: ''}
                {displayForm?<JobForm formParams={formParams} setFormParams={setFormParams} jobStyle={jobStyle} setJobStyle={setJobStyle} bgColor={bgColor} setBgColor={setBgColor} />: ''}
            </div>
            {/*<div className="editor">
                <SheetEditor />
            </div>*/}
        </div>
    )
}