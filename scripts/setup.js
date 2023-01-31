const arg = process.argv[2];
const fs = require('fs');
const path = require('path');
switch (arg) {
    case('-d'):
    case('--dev'):
        fs.createReadStream(path.join(__dirname, '..','environments','dev.env')).pipe(fs.createWriteStream(path.join(__dirname,'..', '.env')));
        break;
    case('-nd'):
    case('--new-dev'):
        fs.createReadStream(path.join(__dirname,'..','environments', 'new-dev.env')).pipe(fs.createWriteStream(path.join(__dirname,'..', '.env')));
        break;
    case('-l'):
    case('--local'):
        fs.createReadStream(path.join(__dirname, '..','environments','local.env')).pipe(fs.createWriteStream(path.join(__dirname,'..', '.env')));
        break;
    case('-ld'):
    case('--localdev'):
    console.log('PATH', path.resolve(__dirname))
        fs.createReadStream(path.join(__dirname, '..','environments','localdev.env')).pipe(fs.createWriteStream(path.join(__dirname,'..', '.env')));
        break;
    case('-lp'):
    case('--localprod'):
        fs.createReadStream(path.join(__dirname, '..','environments','localprod.env')).pipe(fs.createWriteStream(path.join(__dirname,'..', '.env')));
        break;
    case('-p'):
    case('--prod'):
        fs.createReadStream(path.join(__dirname, '..','environments','prod.env')).pipe(fs.createWriteStream(path.join(__dirname,'..', '.env')));
        break;
    default:
        console.log(`
            Help: \n
            -d/--dev:          Use Dev Config\n
            -l/--local:        Use Local Config\n
            -ld/--localdev:    Use Local Development Config\n
            -lp/--localprod    Use Local Production Config\n
            -p/--prod          Use Production Config
        `);
}

