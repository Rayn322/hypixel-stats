import { API_KEY } from '$env/static/private';
import { Hypicle, Player } from 'hypicle';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const client = new Hypicle(API_KEY);
	const uuid = await getUUIDByName(params.name);
	const player = new Player(client, uuid);

	const stats = player.getStats();
	const bedwarsStats = await stats.getBedwars().get();

	return {
		name: params.name,
		bedwars: bedwarsStats
	}
};

async function getUUIDByName(name: string) {
	const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`);
	return (await response.json()).id as string;
}
