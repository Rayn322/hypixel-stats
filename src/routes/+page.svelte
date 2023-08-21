<script lang="ts">
	import { goto } from '$app/navigation';

	let name = '';

	function navigate() {
		goto(`/${name}`);
	}
</script>

<form class="flex flex-col items-start gap-2" on:submit|preventDefault={navigate}>
	<label for="name">Give Minecraft name</label>
	<input
		class="rounded border border-gray-400 bg-transparent"
		type="text"
		name="name"
		id="name"
		bind:value={name}
	/>
	<button class="rounded border border-gray-400 p-2" type="submit">Submit</button>
</form>
