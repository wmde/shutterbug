# shutterbug

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

## How to add screenshots (actual image content)
:information_source: The screenshots that get served by shutterbug need to be created with another application (see [banner-screenshots repo](https://github.com/wmde/banner-screenshots) ). With the banner-screenshots application you can generate the screenshot images and a metadata file (`metadata_summary.json`) which sums up their content.

On your local machine, copy the content (image directory + metadata file) of the `/banner-shots/` directory from the banner-screenhots repository
into the `public/screenshots/` directory of the shutterbug repository.
