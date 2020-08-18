AFRAME.registerComponent('svelte', {
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
	init() {
		// let parent nodes/etc settle
		requestAnimationFrame(() => {
			this.svelte = new this.data.component({
				target: this.el,
				props: this.data.gather.call(this),
			})
		})
	},
	remove() {
		this.svelte.$destroy()
		delete this.svelte
	},
})
