import { API_KEY } from '$env/static/private';
import { Hypicle, Player } from 'hypicle';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params, fetch }) => {
	const client = new Hypicle(API_KEY);
	const uuid = await getUUIDByName(params.name, fetch);
	console.log(`UUID of player ${params.name} is ${uuid}`);
	const player = new Player(client, uuid);

	const stats = player.getStats();
	const bedwarsStats = await stats.getBedwars().get();

	return {
		name: params.name,
		bedwars: bedwarsStats
	};
};

async function getUUIDByName(
	name: string,
	fetch: (input: RequestInfo | URL, init?: RequestInit | undefined) => Promise<Response>
) {
	const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`);
	return (await response.json()).id as string;
}
