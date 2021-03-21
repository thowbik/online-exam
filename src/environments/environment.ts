// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
declare var require: any;
export const environment = {
   appVersion: require('../../package.json').version,
   loginApiBaseUrl: 'https://emislogin.tnschools.gov.in/emis_login/api/ATSLlogin',
   // loginApiBaseUrl: 'https://emislogin.tnschools.gov.in/emis_login/api/login',
   // loginApiBaseUrl: 'http://13.232.216.80/emis_login/api/ATSLlogin',
   // loginApiBaseUrl: 'http://13.232.216.80/emis_login/api/ATSLlogin',
   externalSaveUrl: 'https://kx01iv1acl.execute-api.ap-south-1.amazonaws.com/Prd-SQSTEST/gshighschlstcount',
   loginAuthorization : 'EMIS@2019_api',
   // apiBaseUrl: 'http://localhost/emis-code',
   apiBaseUrl: 'http://rte.tnschools.gov.in',
   //  apiBaseUrl: 'http://13.232.216.80',
    //apiBaseUrl: 'http://15.206.4.200/',
   authorization : 'EMIS_web@2019_api',
   production: false,
   environment: 'LOCAL',
   showEnvironment: true
};
