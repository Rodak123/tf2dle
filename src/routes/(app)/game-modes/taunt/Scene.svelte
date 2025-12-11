<script lang="ts">
  import { Model, type GetSceneFunction } from '$lib/components/ui/model';
  import { T } from '@threlte/core'
  import { OrbitControls } from '@threlte/extras'
  import type { OrbitControls as OrbitControlsImpl } from 'three/examples/jsm/controls/OrbitControls.js';
  import { Group, Vector3 } from 'three';

  export let rotateSpeed: number = 0.3;
  export let zoomToCursor: boolean = false;
  export let zoomSpeed: number = 1;
  
  export let enableDamping: boolean = false;

  export let autoRotate: boolean = false;
  export let enableZoom: boolean = false;
  export let showGrid: boolean = false;

  export let modelUrl: string;

  let controls: OrbitControls;
  let getModelScene: GetSceneFunction = () => undefined;

  $: modelScene = getModelScene();

  $: if (modelScene && controls) {
    centerAndFrameModel(modelScene, controls);
  }

  // not using scene, because I couldn't get it to center automatically
  const centerAndFrameModel = (scene: Group, controlsInstance: OrbitControls) => {
    const threeControls = controlsInstance.ref as OrbitControlsImpl;
    
    const offset: Vector3 = new Vector3(0, 0.75, 0);

    threeControls.target.set(offset.x, offset.y, offset.z);

    threeControls.update();
  };
  
</script>

<T.PerspectiveCamera
  makeDefault
  fov={10}
  position={[0, 0, 10]}
>
  <OrbitControls
    bind:this={controls}
    {enableDamping}
    {autoRotate}
    {rotateSpeed}
    {zoomToCursor}
    {zoomSpeed}
    {enableZoom}
  >
  </OrbitControls>
</T.PerspectiveCamera>

{#if showGrid}
  <T.GridHelper args={[10, 10]} />
{/if}

<Model 
  url={modelUrl}
  bind:getScene={getModelScene}
/>