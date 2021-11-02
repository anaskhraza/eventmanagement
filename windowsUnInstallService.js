var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Postgres Server',
  description: 'The nodejs.org example web server.',
  script: 'D:\\Pak Mehran\\github\\eventmanagement\\distServer.js',
  //, workingDirectory: '...'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('uninstall',function(){
    console.log('Uninstall complete.');
    console.log('The service exists: ',svc.exists);
  });
  
  // Uninstall the service.
svc.uninstall();