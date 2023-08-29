import { API_KEY } from '$env/static/private';
import { Hypicle, Player } from 'hypicle';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const client = new Hypicle(API_KEY);
	const uuid = await getUUIDByName(params.name);
	console.log(`UUID of player ${params.name} is ${uuid}`);
	const player = new Player(client, uuid);

	const stats = player.getStats();
	const bedwarsStats = await stats.getBedwars().get();

	return {
		name: params.name,
		bedwars: bedwarsStats
	};
};

async function getUUIDByName(name: string) {
	console.log(`fetching from https://api.mojang.com/users/profiles/minecraft/${name}`);
	const response = await fetch(`https://api.mojang.com/users/profiles/minecraft/${name}`);
	console.log('mojang response is ', response);
	const json = await response.json();
	console.log('mojang json is ', json);
	return json.id as string;
	// return (await response.json()).id as string;
}
