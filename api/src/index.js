import server from './server';
import { PORT, NODE_ENV } from './config/env';

// Start server
console.info('SETUP - Starting server..')

server.listen(PORT, (error) => {
  if (error) {
    console.error('ERROR - Unable to start server.')
  } else {
    console.info(`INFO - Server started on http://localhost:${ PORT } [${ NODE_ENV }]`)
  }
})
export default server;



