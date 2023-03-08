const { v4: uuidv4 } = require('uuid');

const loadFile = ( files = '', extensions = [ 'jpg', 'jpeg', 'png' ] ) => {

    return new Promise( ( resolve, reject ) => {

        const { file } = files;

        const [ fileName, fileExtension ] = file.name.split('.');

        if( !extensions.includes( fileExtension ) ) {
            reject('Invalid file extension');
        }

        file.name = `${ uuidv4() }.${ fileExtension }`;

        resolve( file );

    })

}

module.exports = loadFile;