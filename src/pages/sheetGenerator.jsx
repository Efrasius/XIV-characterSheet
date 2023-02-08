import Header from '../components/header'
import SheetGenerator from '../components/sheetGenerator'
import React from 'react';

function SheetForm() {
    return (
        <div>
            <Header  pageTitle="Générateur de fiche"/>
            <section className="sheetForm">
                <SheetGenerator />
            </section>
        </div>
    )
}

export default SheetForm;