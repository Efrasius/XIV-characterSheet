import React, { useState } from 'react';
import '../style/sheetForm.css'

function SheetForm() {
    const [lodestoneId, setLodestoneId] = useState("");
    const [mainJob, setmainJob] = useState("");



    function launchApi(event) {
        event.preventDefault();

        console.log(lodestoneId, mainJob);
    }

    return (
        <form className="myForm" onSubmit={launchApi}>
            <div className="formLabeled">
                <label className="formLabel" htmlFor="lodestoneId">Lodestone ID</label>
                <input id="lodestoneId" className="formInput" name="lodestoneId" value={lodestoneId} onChange={(e) => setLodestoneId(e.target.value)} type="text" />
            </div>
            <div className="formLabeled">
                <label className="formLabel" htmlFor="mainJob">Main Job</label>
                <input id="mainJob" className="formInput" name="mainJob" value={mainJob} onChange={(e) => setmainJob(e.target.value)} type="text" />
            </div>
            <div className="formLabeled">
                <label className="formLabel" htmlFor="formImage">Image du personnage</label>
                <input id="formImage" className="formInput" name="formImage" type="file" />
            </div>
            <input type="submit" className="formSubmit" value="Générer Ma fiche !" onClick={launchApi} />
        </form>
    )
}

export default SheetForm;