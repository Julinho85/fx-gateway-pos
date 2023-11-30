/**
 * Commune repository interface for TC
 */

interface ITCRepository {
	find(card_number:string): Promise<any>;
	create(param:Record<string, any>): Promise<any>;
	exists(card_number:string): Promise<any>;
}

export default ITCRepository;
