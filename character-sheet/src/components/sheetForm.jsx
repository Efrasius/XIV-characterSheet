import React, { useState } from 'react';
import '../style/sheetForm.css'
import {Dropzone, FileItem} from "@dropzone-ui/react"

function SheetForm() {
    const [lodestoneId, setLodestoneId] = useState("");
    const [mainJob, setmainJob] = useState("");
    const [err, setErr] = useState("");

    //dropzoneUI setup
    const [files, setFiles] = React.useState([]);
    const updateFiles = (incommingFiles) => {
    setFiles(incommingFiles);
  };

    const launchApi = async (event) => {
        event.preventDefault();

        if ({lodestoneId} === "") {
            alert("Veuillez entrer l'id lodestone de votre personnage")
        } else {
            try {
                fetch(`https://xivapi.com/character/${lodestoneId}`)
                    .then(response => response.json())
                    .then(data => console.log(data.Character.ClassJobs))
            }
            catch (err) {
                setErr(err.message);
                console.log("erreur lors du fetch : ", err);
            }
        }
    }

    return (
        <form className="myForm" onSubmit={launchApi}>
            <div className="formLabeled">
                <label className="formLabel" htmlFor="lodestoneId">Lodestone ID</label>
                <input id="lodestoneId" className="formInput" name="lodestoneId" value={lodestoneId} onChange={(e) => setLodestoneId(e.target.value)} type="text" />
            </div>
            <div className="formLabeled">
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
            </div>
            <div className="formLabeled">
                <label className="formLabel" htmlFor="formImage">Image du personnage</label>
                <Dropzone accept="image/*" localization="FR-fr" maxFiles="1" onChange={updateFiles} value={files}>
                    {files.map((file) => (
                        <FileItem {...file} preview />
                    ))}
                </Dropzone>
            </div>
            <input type="submit" className="formSubmit" value="Générer Ma fiche !" onClick={launchApi} />
        </form>
    )
}

export default SheetForm;