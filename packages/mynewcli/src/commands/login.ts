import {Command, flags} from '@oclif/command'
import cli from 'cli-ux'
const { prompt } = require('enquirer');
 class MyCommand extends Command {
//   async run() {
//     // just prompt for input
//     const name = await cli.prompt('What is your name?')

//     // mask input after enter is pressed
//     const secondFactor = await cli.prompt('What is your two-factor token?', {type: 'mask'})

//     // hide input while typing
//     const password = await cli.prompt('What is your password?', {type: 'hide'})

//     this.log(`You entered: ${name}, ${secondFactor}, ${password}`)
//   }

static description = "describe the command here";

static flags = {
  // add --version flag to show CLI version
  version: flags.version({ char: "v" }),
  help: flags.help({ char: "h" }),
  // flag with a value (-n, --name=VALUE)
  name: flags.string({
    char: "n",
    description: "name to print"
  }),
  // flag with no value (-f, --force)
  force: flags.boolean({ char: "f" })
};

static args = [{ name: "file" }];
static strict = false;
async run() {
  const { args, flags } = this.parse(MyCommand);

  console.log("flags.name ", flags.name, typeof flags.name);
  if (typeof flags.name === "undefined") {
    flags.name = await prompt({
      type: "input",
      name: "name",
      message: "What is your name?"
    })
      .then(({ name }: { name: string }) => name)
      .catch(console.error)
      .finally(() =>
        console.log("You can specify this with the --name flag in future")
      );
  }
  const name = flags.name || "world";
  this.log(`hello  ${name} from ./src/index.ts`);
}



}

export = MyCommand
