import React, { useState, useEffect } from 'react';
import * as htmlToImage from 'html-to-image';
import { SketchPicker } from 'react-color';
import { faPaintBrush } from "@fortawesome/free-solid-svg-icons";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../style/jobForm.css";


export default function JobForm(props) {
    const { formParams, setFormParams, jobStyle, setJobStyle, bgColor, setBgColor } = props;

    function generateImg(e) {
        e.preventDefault();
        setTimeout(() => {
            let node = document.getElementById('sheetImg');

            if (node !== null) {
                htmlToImage.toPng(node)
                    .then(dataUrl => {
                        const link = document.createElement('a')

                        link.download = 'mySheet.png'
                        link.href = dataUrl
                        link.click()
                    })
                    .catch(function (error) {
                        console.error('oops, something went wrong!', error);
                    });
            }
        }, 500)

    }

    function portraitUpload(e) {
        console.log(e.target.files[0]);

        if (!e.target.files[0]) {
            setJobStyle(currValue => ({ ...currValue, portrait: '' }));
        } else
            setJobStyle(currValue => ({ ...currValue, portrait: URL.createObjectURL(e.target.files[0]) }));

    }

    function deletePortrait(e) {
        

        document.querySelector('#portrait').value = '';
        setJobStyle(currValue => ({ ...currValue, portrait: '' }));
    }

    function changeBackground(color, event) {
        setBgColor(color.rgb);
    }

    function handleChange(color, event) {
        let picker = event.target.closest(".colorPicker");
        if (!picker) {
            return;
        }
        console.log(color.rgb);

        if (picker.classList.contains("levelPicker"))
            setJobStyle(currValue => ({ ...currValue, lvlColor: color.rgb }))
        else if (picker.classList.contains("infosPicker"))
            setJobStyle(currValue => ({ ...currValue, infosColor: color.rgb }))
    }

    function resetColor() {
        setJobStyle(currValue => ({ ...currValue, lvlColor: {r: 0, g: 0, b: 0, a:1}, infosColor: {r: 0, g: 0, b: 0, a:1} }))
        setBgColor({r: 0, g: 0, b: 0, a:0});
    }

    useEffect(() => {
        function handleClickOutside(event) {
            if (!event.target.closest('.colorPicker') && !event.target.closest('svg')) {
                setFormParams(false);
            }
        }

        document.addEventListener("click", handleClickOutside);
    }, [])

    return (
        <div>
            <form className='jobForm'>
                <div className='jobInputs'>
                    <h2>Infos</h2>
                    <div className='formLabeled formStyle'>
                        <label className='formLabel' htmlFor='portrait'>Portrait</label>
                        <input id='portrait' name='portrait' type='file' accept='image/*'  onChange={portraitUpload} />
                        {jobStyle.portrait? <FontAwesomeIcon className='delete' icon={faX} onClick={deletePortrait} />: ''}
                    </div>
                    <div className='formLabeled formStyle'>
                        <label className='formLabel' htmlFor='name'>Nom du Personnage</label>
                        <input id='name' name='name' type='checkbox' checked={jobStyle.name} onChange={(e) => setJobStyle(currValue => ({ ...currValue, name: e.target.checked }))} />
                    </div>
                    <div className='formLabeled formStyle'>
                        <label className='formLabel' htmlFor='server'>Serveur</label>
                        <input id='server' name='server' type='checkbox' checked={jobStyle.server} onChange={(e) => setJobStyle(currValue => ({ ...currValue, server: e.target.checked }))} />
                    </div>
                    <div className='formLabeled formStyle'>
                        <label className='formLabel' htmlFor='position'>Position</label>
                        <select id="position" name="position" className="formInput" value={jobStyle.position} onChange={(e) => setJobStyle(currValue => ({ ...currValue, position: e.target.value }))}>
                            <option value="top">Haut</option>
                            <option value="bottom">Bas</option>
                        </select>
                    </div>

                    <h2>Couleurs</h2>
                    <div className='formLabeled formStyle'>
                        <label className='formLabel' htmlFor='background'>Fond liste de jobs</label>
                        <FontAwesomeIcon className={`paletteIcon ${formParams.background? 'rotate': ''}`} icon={faPaintBrush} onClick={(e) => formParams.background? setFormParams(currValue => ({ ...currValue, background: false })): setFormParams(currValue => ({ ...currValue, background: true }))} />
                        <SketchPicker id="background" className={`colorPicker ${formParams.background? '': 'none'}`} color={bgColor} onChange={changeBackground} />
                    </div>
                    <div className='formLabeled formStyle'>
                        <label className='formLabel' htmlFor='lvlColor'>Couleur des niveaux</label>
                        <FontAwesomeIcon className={`paletteIcon ${formParams.lvlColor? 'rotate': ''}`} icon={faPaintBrush} onClick={(e) => formParams.lvlColor? setFormParams(currValue => ({ ...currValue, lvlColor: false })): setFormParams(currValue => ({ ...currValue, lvlColor: true }))} />
                        <SketchPicker id="lvlColorPicker" className={`colorPicker levelPicker ${formParams.lvlColor? '': 'none'}`} color={jobStyle.lvlColor} onChange={handleChange} />
                    </div>
                    <div className='formLabeled formStyle'>
                        <label className='formLabel' htmlFor='infosColor'>Couleur des infos</label>
                        <FontAwesomeIcon className={`paletteIcon ${formParams.infosColor? 'rotate': ''}`} icon={faPaintBrush} onClick={(e) => formParams.infosColor? setFormParams(currValue => ({ ...currValue, infosColor: false })): setFormParams(currValue => ({ ...currValue, infosColor: true }))} />
                        <SketchPicker id="infosColorPicker" className={`colorPicker infosPicker ${formParams.infosColor? '': 'none'}`} color={jobStyle.infosColor} onChange={handleChange} />
                    </div>
                    <div className='buttonWrapper'>
                        <button className="colorReset" type="button" onClick={resetColor}>Reset</button>
                    </div>

                </div>
                <input type="submit" id="lvlFormSubmit" className="formSubmit" value="Télécharger Ma fiche !" onClick={generateImg} />
            </form>
        </div>
    )
}