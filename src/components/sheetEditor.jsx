import 'tui-image-editor/dist/tui-image-editor.css';
import ImageEditor from '@toast-ui/react-image-editor';
import React from 'react';

const myTheme = {
  // Theme object to extends default dark theme.
};

const locale_fr_FR = {
    Shape: 'Ajouter des formes',
    Filter: 'Filtres',
    Grayscale: 'Noir et blanc',
    Blur: 'Flou',
    Emboss: 'Bosseler',
    Mask: 'Ajouter une image',
    Text: 'Ajouter du texte',
    Crop: 'Découper',
    Download: 'Générer fiche',
    Load: 'Changer fond'
}

const SheetEditor = () => (
  <ImageEditor
    includeUI={{
      loadImage: {
        path: 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
        name: 'SampleImage',
      },
      locale: locale_fr_FR,
      theme: myTheme,
      menu: ['shape', 'filter', 'mask', 'text', 'crop', 'icon'],
      initMenu: 'filter',
      uiSize: {
        width: '1000px',
        height: '700px',
      },
      menuBarPosition: 'top',
    }}
    cssMaxHeight={500}
    cssMaxWidth={700}
    selectionStyle={{
      cornerSize: 20,
      rotatingPointOffset: 70,
    }}
    usageStatistics={true}
  />
);

export default SheetEditor;