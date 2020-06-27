# Non Profit Devs

A website where non profit developers and non profit organizations can meet.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) bla bla bla...

## Collaboration

If you want to help improve this website, be my guest, you can pick any issue from github, for bugs I'm creating a new branch bug/\<number of the issue\> and for enhancements I'm creating a branch feat/\<number of the issue\> and once that is solved merged into dev and branch deleted.

If you want to help but don't know how to contribute to an open source project you can read [this](https://dev.to/janessatran/a-beginner-s-guide-to-contributing-to-open-source-4fen) or [this](https://opensource.guide/how-to-contribute/) or even filing a bug/enhancement already helps a ton!

Footnote: before commiting any changes run `yarn format`, let's keep this tidy and clean :smile:

For anyone going deep into this, that needs access to the backend, it lives [here](https://github.com/jenaro94/non-profit-devs-back) for more information, our [slack](https://join.slack.com/t/nonprofitdevs/shared_invite/zt-fd7sjx0l-9vf9TRTA~4lfCiG78LRJuw)

## Translations

Translations are managed with [`react-i18next`](https://react.i18next.com/). Key catalogs live in the `src/translations` directory, as JSON files named as the language they offer translations for.

```
|__ src
|   |__ translations
|   |   |__ en.json
|   |   |__ es.json
|   |__ i18n.js
```

Once a translation is complete, it must be registered in the `src/i18n.js` file as a resource:

```js
const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};
```

Finally, for a user to be able to switch languages, the new language must be added to the `ALL_LANGUAGES` definition in the `Language` UI component:

```js
const ALL_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];
```

---

# Non Profit Devs

Un sitio web donde pueden reunirse desarrolladores sin fines de lucro y organizaciones sin fines de lucro.

Este proyecto se inició con [Create React App](https://github.com/facebook/create-react-app) bla bla bla ...

## Colaboración

Si desea ayudar a mejorar este sitio web, sea mi invitado, puede elegir cualquier issue de github, para bugs estoy creando una nueva rama bug/\<número del issue \> y para mejoras estoy creando una rama feat/\<número del problema\> y una vez que se resuelve, se fusiona en dev y se elimina la rama.

Si desea ayudar pero no sabe cómo contribuir a un proyecto de código abierto, puede leer [esto](https://dev.to/janessatran/a-beginner-s-guide-to-contributing-to-open-source-4fen) o [esto](https://opensource.guide/how-to-contribute/) o incluso presentar un error / mejora ya ayuda muchísimo!

Nota al pie: antes de confirmar cualquier cambio, ejecute `yarn format`, mantengamos esto ordenado y limpio :smile:

Para cualquiera que profundice en esto, que necesita acceso al backend, vive [aquí](https://github.com/jenaro94/non-profit-devs-back) para mas informacion en nuestro [slack](https://join.slack.com/t/nonprofitdevs/shared_invite/zt-fd7sjx0l-9vf9TRTA~4lfCiG78LRJuw)

## Traducciones

Las traducciones se gestionan utilizando [`react-i18next`](https://react.i18next.com/). Los catálogos de texto están en el directorio `src/translations` en forma de archivos JSON nombrados por el código de cada idioma.

```
|__ src
|   |__ translations
|   |   |__ en.json
|   |   |__ es.json
|   |__ i18n.js
```

Cuando una traducción está completa, se la debe registrar en el archivo `src/i18n.js` como un recurso:

```js
const resources = {
  en: {
    translation: en,
  },
  es: {
    translation: es,
  },
};
```

Por último, para que las personas usuarias utilicen el idioma en el sitio, se debe registrar el idioma en `ALL_LANGUAGES`, en el componente `Language`:

```js
const ALL_LANGUAGES = [
  { code: 'en', label: 'English' },
  { code: 'es', label: 'Español' },
];
```
