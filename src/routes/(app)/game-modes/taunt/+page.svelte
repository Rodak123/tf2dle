<script>
	import * as Card from '$lib/components/ui/card';
	import WinterDecore from '$lib/features/theme/components/winter/WinterDecore.svelte';
	import { Canvas } from '@threlte/core';
	import Scene from './Scene.svelte';

</script>

<div class="grid gap-4">
	<Card.Root class="relative">
		<Card.Header>
			<div class="flex justify-between">
				<div>
					<Card.Title>Taunt (beta)</Card.Title>
					<Card.Description>Guess today's taunt</Card.Description>
				</div>
			</div>
		</Card.Header>
		<Card.Content>
			<WinterDecore />
			<div class="scene-height">
				<Canvas>
					<Scene enableZoom={true}/>
				</Canvas>
			</div>
		</Card.Content>
	</Card.Root>
</div>


<style scoped>
    .scene-height {
        height: min(40vh, 400px);
    }
</style>
