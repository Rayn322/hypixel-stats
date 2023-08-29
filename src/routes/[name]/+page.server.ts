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
	const response = await fetch(`https://playerdb.co/api/player/minecraft/${name}`);
	console.log('status is', response.status);
	console.log('headers are', response.headers);
	console.log('response is', response);
	const json = await response.json();
	console.log('mojang json is', json);
	return json.data.player.id as string;
	// return (await response.json()).id as string;
}
