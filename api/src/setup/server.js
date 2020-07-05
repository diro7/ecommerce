// Imports
import express from 'express'

// App Imports
import setupLoadModules from './load-modules'
import setupGraphQL from './graphql'
import setupUpload from './upload'

// Create express server
const server = express()

// Setup load modules
setupLoadModules(server)

// Setup uploads
setupUpload(server)

// Setup GraphQL
setupGraphQL(server)

export default server;
