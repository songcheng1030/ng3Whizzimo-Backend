# Docker
## Windows
 - Follow the linked guide to keep WSL2 from allocating all of your memory to docker: https://medium.com/@lewwybogus/how-to-stop-wsl2-from-hogging-all-your-ram-with-docker-d7846b9c5b37

## Using docker-compose
1. From the root of the project run `docker-compose up` 

# No Docker  
## SSL Setup
### Windows
1. Download the appropriate exe from: https://slproweb.com/products/Win32OpenSSL.html
2. Install
3. Make sure to add the install location bin folder uri (ie: C:\OpenSSL-Win64\bin) to your path
4. navigate to ng3whizzimo-Backend
5. run the command: openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
6. run the command: openssl rsa -in keytmp.pem -out key.pem
### Linux
1. navigate to ng3whizzimo-Backend
2. run the command: openssl req -x509 -newkey rsa:2048 -keyout keytmp.pem -out cert.pem -days 365
3. run the command: openssl rsa -in keytmp.pem -out key.pem
### OSX
1. navigate to ng3whizimo-Backend
2. run the command: openssl genrsa -des3 -passout pass:x -out keytmp.pem 2048
3. run the command: openssl rsa -passin pass:x -in keytmp.pem -out key.pem
4. run the command: openssl req -new -key key.pem -out server.csr
5. run the command: openssl x509 -req -sha256 -days 365 -in server.csr -signkey key.pem -out cert.pem
### Copy
1. Copy existing dev certs from dev-certs folder to root of project (These could possibly be expired.)

## Basic Environment Setup
1. Install NodeJS
2. Run command `yarn global add typescript`
3. Run `yarn install` command.

## Server Local Setup
1. Download config.ts file and copy it to the root folder.
2. Download whizzimodevFirebaseData.json and copied it to the root folder.
3. Download whizzimoseed.gz
4. Download WhizzimoDevGCloudKey.json
5. Install MongoDb on to your computer.
6. run the command: yarn db:seed (local) or yarn db:seed:dev or yarn db:seed:prod
7. run the command: yarn db:all
8. run the command: yarn server

## Server Remote Setup
1. Install Nodejs
2. Install forever `yarn global add forever`
3. Install forever-service `yarn global add forever-service`

### API Endpoints
- Once the server is up and running navigate to localhost:8080/docs

### Config Setup
The environments folder at the root of this project should contain the following files depending on what environments you
wish to work in. A sample of the variables necessary are in the sample.env file.
- dev.env: runs against the remote dev db, dev auth0 and dev stripe, this is for deployment to the dev server.
- local.env: runs against a local dev db, dev auth0 and dev stripe
- localdev.env: runs against a remote dev db, dev auth0 and dev stripe
- localprod.env: runs against a local prod db, prod auth0 and prod stripe
- prod.env: runs against the production db, prod auth0 and prod stripe, this is for deployment to the production server

  
