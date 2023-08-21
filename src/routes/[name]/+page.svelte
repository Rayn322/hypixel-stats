<script lang="ts">
	import Stat from '$lib/Stat.svelte';

	export let data;

	// @ts-expect-error
	const armedBedsBroken: number = data.bedwars?.four_four_armed_beds_broken_bedwars;
</script>

<div class="space-y-4">
	<Stat name="Name" value={data.name} />
	{#if data.bedwars}
		{@const bw = data.bedwars}
		{@const voidKDR = bw.void_kills_bedwars / bw.void_deaths_bedwars}
		{@const voidFKDR = bw.void_final_kills_bedwars / bw.void_final_deaths_bedwars}

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
	{:else}
		<p>Bedwars stats not found</p>
	{/if}

	<a href="/" class="inline-block rounded border border-gray-400 p-2">Back</a>
</div>
