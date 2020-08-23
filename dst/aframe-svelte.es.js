const SVELTE_CACHE = {};
const SVELTE_GATHER = {};

function registerSvelte(key, svelte) {
	SVELTE_CACHE[key] = svelte;
}

function registerGather(key, gather) {
	SVELTE_GATHER[key] = gather;
}

AFRAME.registerComponent('svelte', {
	multiple: true,
	schema: {
		props: {
			// pass props to svelte component
			default: {},
			parse(value) {
				switch (typeof value) {
					case 'string':
						return JSON.parse(value)
					default:
						return value
				}
			},
			serialize(value) {
				return JSON.stringify(value)
			},
		},
		// the svelte component
		component: {
			parse(value) {
				return SVELTE_CACHE[value]
			},
			serialize(value) {
				return value.name
			},
		},
		// fn to run to gather props
		gather: {
			parse(value) {
				return SVELTE_GATHER[value]
			},
			serialize(value) {
				return value.name
			},
			default: function () {
				return this.data.props
			},
		},
	},
	update() {
		this.remove();
		if (this.data.component) {
			// let parent nodes/etc settle
			requestAnimationFrame(() => {
				this.svelte = new this.data.component({
					target: this.el,
					props: this.data.gather.call(this),
				});
			});
		}
	},
	remove() {
		if (this.svelte) {
			this.svelte.$destroy();
			delete this.svelte;
		}
	},
});

export { registerGather, registerSvelte };
