import Header from '../components/header'
import SheetForm from '../components/sheetForm'
import React from 'react';

function SheetGenerator() {
    return (
        <div>
            <Header  pageTitle="Générateur de fiche"/>
            <section className="sheetForm">
                <SheetForm />
            </section>
        </div>
    )
}

export default SheetGenerator;