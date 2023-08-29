import { API_KEY } from '$env/static/private';
import { Hypicle, Player } from 'hypicle';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	try {
		const client = new Hypicle(API_KEY);
		const { name, uuid } = await getPlayerByName(params.name);
		const player = new Player(client, uuid);

		const stats = player.getStats();
		const bedwarsStats = await stats.getBedwars().get();

		return {
			name,
			bedwars: bedwarsStats
		};
	} catch (error) {
		console.error(error);
		return {
			name: 'Not found',
			bedwars: null
		};
	}
};

async function getPlayerByName(name: string) {
	const response = await fetch(`https://playerdb.co/api/player/minecraft/${name}`);
	const json = await response.json();
	return {
		uuid: json.data.player.id as string,
		name: json.data.player.username as string
	};
}
