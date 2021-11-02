var Service = require('node-windows').Service;

// Create a new service object
var svc = new Service({
  name:'Postgres Server',
  description: 'The nodejs.org example web server.',
  script: 'D:\\Pak Mehran\\github\\eventmanagement\\dist\\distServer.js',
  execPath: 'D:\\Pak Mehran\\github\\eventmanagement\\node_modules\\.bin\\node',
  nodeOptions: [
    '--harmony',
    '--max_old_space_size=4096'
  ]
  //, workingDirectory: '...'
});

// Listen for the "install" event, which indicates the
// process is available as a service.
svc.on('install',function(){
  svc.start();
});

svc.install();