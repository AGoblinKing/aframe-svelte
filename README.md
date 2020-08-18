# aframe-svelte

Ever want to load a svelte component in aframe as a component? No? Well I did it anyhow.

![](./docs/img/hmm.gif)

## API

```js
multiple: true,
schema: {
	props: {
		// pass props to svelte component
		default: {},
	},
	// the svelte component
	component: {},
	// fn to run to gather props
	gather: {
		default() {
			return this.data.props
		},
	},
},
```

## Quick Start

[REPL Example](https://svelte.dev/repl/82076000aeec4606be934ad88b22efa9?version=3.24.1)

FancyWidget.svelte

```svelte
<script>
export let parent
</script>

Your parent is a {typeof parent}
```

Consumer of Fancy and Svelte

```svelte
<script>
	import FancyWidget from './FancyWidget.svelte'
</script>

<a-mixin svelte="{{component: FancyWidget, gather: () => ({ parent: this.el.object3D.parent }) }}" />
```

## Usage

### [goblin-life](https://goblin.life/)

Used for instantiating remote entity mixins in [goblin.life](https://goblin.life)!

### Playlist

- [Spotify](https://open.spotify.com/playlist/37i9dQZF1E8U06Q5kJyehH?si=1-KQhYu9RvmUDCnFXCAwlw)
