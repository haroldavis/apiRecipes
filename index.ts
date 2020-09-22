import 'reflect-metadata'


import { startServer } from './app'

async function main(){
    connect()
    await startServer()
    
}

main()