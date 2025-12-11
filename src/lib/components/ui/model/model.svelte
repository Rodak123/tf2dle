<script lang="ts">
    import { type Props } from '.';
    import { T } from '@threlte/core';
    import { useGltf, useGltfAnimations } from '@threlte/extras';
    import * as THREE from 'three';

    type $$Props = Props;
    export let url: $$Props['url'];
    export let getScene: $$Props['getScene'];

    const gltf = useGltf(url);
    const { actions } = useGltfAnimations(gltf);

    let helper: THREE.SkeletonHelper;

    $: if ($gltf) {
        getScene = () => $gltf?.scene;
        helper = new THREE.SkeletonHelper($gltf.scene);
        
        (helper.material as THREE.LineBasicMaterial).linewidth = 3;

        $gltf.scene.traverse((child: any) => {
            if (child.isMesh) {
                child.visible = false;
            }
        });
    }

    $: if ($gltf && $actions) {
        const firstAnim = Object.values($actions)[0];
        if (firstAnim) firstAnim.play();
    }
</script>

{#if $gltf}
    <T is={$gltf.scene} />
    
    {#if helper}
        <T is={helper} />
    {/if}
{/if}