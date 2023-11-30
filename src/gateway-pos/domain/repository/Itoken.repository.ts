/**
 * Commune repository interface for Token
 */

interface ITokenRepository {
	find(token:string): Promise<any>;
	create(param:Record<string, any>): Promise<any>;
}

export default ITokenRepository;
