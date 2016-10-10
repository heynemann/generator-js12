import yargs from 'yargs'
import pjson from '../package.json'

//import startCmd from './cmd/start'

export default yargs
  .usage('<%= packageName %> - <%= description %>')
  .demand(1)
  .showHelpOnFail(true, 'Specify --help for available options')
  //.command(startCmd)
  .help()
  .version(() => pjson.version)
  .strict()
  .argv
