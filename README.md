# Non Profit Devs

A website where non profit developers and non profit organizations can meet.

## Monorepo Structure

This project is organized as a monorepo containing:

- **`frontend/`** - React SPA (Vite + React)
- **`backend/`** - Rails API with GraphQL
- **`docs/`** - API documentation

## Getting Started

This monorepo uses [Bun](https://bun.sh) workspaces for package management.

### Installation

```bash
bun install
```

### Frontend

```bash
bun run dev:frontend
bun run build:frontend
bun run serve:frontend
```

Or work directly in the frontend workspace:

```bash
cd frontend
bun start
```

### Backend

See [backend/README.md](./backend/README.md) for setup instructions.

### API Documentation

API documentation is available in [docs/api/](./docs/api/).

### TypeScript & GraphQL

The frontend uses manual TypeScript types for GraphQL operations. GraphQL Codegen is configured but currently disabled due to Apollo Client version compatibility. To enable automatic type generation:

```bash
cd frontend
npm install --save-dev @graphql-codegen/cli @graphql-codegen/typescript @graphql-codegen/typescript-operations @graphql-codegen/typescript-react-apollo
npm run generate  # Generate types from schema
```

Configuration is in `frontend/codegen.ts`.

## 🚀 Deployment

This application is configured for production deployment using [Kamal](https://kamal-deploy.org/).

### Quick Deploy

1. **Set up 1Password** (if not already done):
   ```bash
   # Install 1Password CLI if needed
   op signin  # Authenticate with 1Password

   # Create vault item "Non-Profit Devs" with:
   # - KAMAL_REGISTRY_PASSWORD: your Docker registry password
   # - RAILS_MASTER_KEY: copy from backend/config/master.key
   ```

2. **Configure Deployment**:
   Edit `config/deploy.yml` with your server IP and domain.

3. **Deploy**:
   ```bash
   ./deploy.sh  # Automated deployment script
   ```

### Manual Deployment

See [backend/README.md](./backend/README.md#deployment-with-kamal) for detailed deployment instructions.

### Requirements

- Linux server with Docker
- Domain name pointing to server IP
- Docker Hub account (or other registry)

## Collaboration

If you want to help improve this website, be my guest, you can pick any issue from github, for bugs I'm creating a new branch bug/\<number of the issue\> and for enhancements I'm creating a branch feat/\<number of the issue\> and once that is solved merged into dev and branch deleted.

If you want to help but don't know how to contribute to an open source project you can read [this](https://dev.to/janessatran/a-beginner-s-guide-to-contributing-to-open-source-4fen) or [this](https://opensource.guide/how-to-contribute/) or even filing a bug/enhancement already helps a ton!

Footnote: before commiting any changes run `cd frontend && bun run format`, let's keep this tidy and clean :smile:

For more information, our [slack](https://join.slack.com/t/nonprofitdevs/shared_invite/zt-fd7sjx0l-9vf9TRTA~4lfCiG78LRJuw)

## Translations

Translations are managed with [`react-i18next`](https://react.i18next.com/). Key catalogs live in the `frontend/src/translations` directory, as JSON files named as the language they offer translations for.

```
|__ frontend
|   |__ src
|   |   |__ translations
|   |   |   |__ en.json
|   |   |   |__ es.json
|   |   |__ i18n.js
```

Once a translation is complete, it must be registered in the `frontend/src/i18n.js` file as a resource:

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

## Estructura del Monorepo

Este proyecto está organizado como un monorepo que contiene:

- **`frontend/`** - SPA de React (Vite + React)
- **`backend/`** - API de Rails con GraphQL
- **`docs/`** - Documentación de la API

## Comenzando

Este monorepo usa [Bun](https://bun.sh) workspaces para la gestión de paquetes.

### Instalación

```bash
bun install
```

### Frontend

```bash
bun run dev:frontend
bun run build:frontend
bun run serve:frontend
```

O trabaja directamente en el workspace del frontend:

```bash
cd frontend
bun start
```

### Backend

Ver [backend/README.md](./backend/README.md) para instrucciones de configuración.

### Documentación de la API

La documentación de la API está disponible en [docs/api/](./docs/api/).

## Colaboración

Si desea ayudar a mejorar este sitio web, sea mi invitado, puede elegir cualquier issue de github, para bugs estoy creando una nueva rama bug/\<número del issue \> y para mejoras estoy creando una rama feat/\<número del problema\> y una vez que se resuelve, se fusiona en dev y se elimina la rama.

Si desea ayudar pero no sabe cómo contribuir a un proyecto de código abierto, puede leer [esto](https://dev.to/janessatran/a-beginner-s-guide-to-contributing-to-open-source-4fen) o [esto](https://opensource.guide/how-to-contribute/) o incluso presentar un error / mejora ya ayuda muchísimo!

Nota al pie: antes de confirmar cualquier cambio, ejecute `cd frontend && bun run format`, mantengamos esto ordenado y limpio :smile:

Para mas informacion en nuestro [slack](https://join.slack.com/t/nonprofitdevs/shared_invite/zt-fd7sjx0l-9vf9TRTA~4lfCiG78LRJuw)

## Traducciones

Las traducciones se gestionan utilizando [`react-i18next`](https://react.i18next.com/). Los catálogos de texto están en el directorio `frontend/src/translations` en forma de archivos JSON nombrados por el código de cada idioma.

```
|__ frontend
|   |__ src
|   |   |__ translations
|   |   |   |__ en.json
|   |   |   |__ es.json
|   |   |__ i18n.js
```

Cuando una traducción está completa, se la debe registrar en el archivo `frontend/src/i18n.js` como un recurso:

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
