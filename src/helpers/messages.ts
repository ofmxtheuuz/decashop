import * as chalk from 'chalk';

export function server(message: string) {
    console.log(chalk.default.blue("[Server] ") + message);
}

export function database(message: string) {
    console.log(chalk.default.green("[Database] ") + message);
}

export function error(error: string) {
    console.log(chalk.default.red("[Error] ") + error);
}