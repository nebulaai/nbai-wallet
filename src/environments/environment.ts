// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
let isPro = false;
export const environment = {
  production: isPro, 

  network: (isPro?"https://api.nbai.io":"http://192.168.88.217:8545"),
  apiUrl: (isPro?"https://api1.nbai.io":'http://192.168.88.217:8093'),
  scanUrl: (isPro?"https://scan.nbai.io/#/":'http://192.168.88.216:8080/NBAITestExploer/#/')
  
};
