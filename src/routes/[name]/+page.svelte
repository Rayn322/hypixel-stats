<script lang="ts">
	import Stat from '$lib/Stat.svelte';

	export let data;

	let armedBedsBroken: number = 0;
	getArmedBedsBroken();

	async function getArmedBedsBroken() {
		const bw = await data.bedwars;
		// @ts-expect-error
		armedBedsBroken = bw?.four_four_armed_beds_broken_bedwars ?? 0;
	}

	function decipherRecord(name: string) {
		// example record bridging_distance_30:elevation_NONE:angle_STRAIGHT:
		name = name.toLowerCase().replaceAll('_', ' ').replaceAll(':', ', ').trim();
		// get rid of last comma
		name = name.slice(0, -1);

		// idk what copilot did here
		name = name.replace(/\w\S*/g, (w) => w.replace(/^\w/, (c) => c.toUpperCase()));

		return name;
	}
</script>

<div class="space-y-4">
	<Stat name="Name" value={data.name} />
	{#await data.bedwars}
		<p class="font-bold">Loading...</p>
	{:then bw}
		{#if bw}
			{@const voidKDR = bw.void_kills_bedwars / bw.void_deaths_bedwars}
			{@const voidFKDR = bw.void_final_kills_bedwars / bw.void_final_deaths_bedwars}

			<div>
				<Stat name="Experience" value={bw.Experience} />
			</div>

			<div>
				<Stat name="Void Kills" value={bw.void_kills_bedwars} />
				<Stat name="Void Deaths" value={bw.void_deaths_bedwars} />
				<Stat name="Void KDR" value={voidKDR.toFixed(2)} />
			</div>

			<div>
				<Stat name="Void Final Kills" value={bw.void_final_kills_bedwars} />
				<Stat name="Void Final Deaths" value={bw.void_final_deaths_bedwars} />
				<Stat name="Void FKDR" value={voidFKDR.toFixed(2)} />
			</div>

			<div>
				<Stat name="Armed Beds Broken" value={armedBedsBroken} />
				<Stat name="Armed Beds Lost" value={bw.four_four_armed_beds_lost_bedwars} />
			</div>

			<div>
				<Stat
					name="Doubles Explosion Final Deaths"
					value={bw.eight_two_entity_explosion_final_deaths_bedwars}
				/>
			</div>

			{#if bw.practice}
				<div>
					<Stat
						name="Blocks Placed in Bridging Practice"
						value={bw.practice.bridging.blocks_placed}
					/>
					<Stat
						name="Blocks Placed in Fireball Jumping Practice"
						value={bw.practice.fireball_jumping.blocks_placed}
					/>
				</div>

				<div>
					{#each Object.keys(bw.practice.records) as key}
						{@const record = bw.practice.records[key]}
						<Stat name={decipherRecord(key)} value={record / 1000 + ' seconds'} />
					{/each}
				</div>
			{/if}
		{:else}
			<p>Bedwars stats not found</p>
		{/if}
	{/await}

	<a href="/" class="inline-block rounded border border-gray-400 p-2">Back</a>
</div>
