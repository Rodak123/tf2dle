import Root from './model.svelte';

export type GetSceneFunction = () => THREE.Group | undefined;

type Props = {
    url: string;
    getScene: GetSceneFunction;
};

export {
    Root,
    type Props,
    //
    Root as Model,
};