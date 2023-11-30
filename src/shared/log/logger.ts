import winston from "./winston";

class Logger {
	static environment:string = process.env.ENVIRONMENT;
	static log(
		{level,status,message,idTrace}:
		{level: any,
		 status?: number,
		 message: string,
		 idTrace: string}) {
		winston.log(level, {env:Logger.environment,
			status:status,message:message,idTrace:idTrace});
	}
}

export default Logger;
