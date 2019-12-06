#! /usr/bin/node

const SVG = require("./SVG")

const heptagonT = (i)=> {
	const A = 5*Math.PI / (i + 6)
	const c1 = Math.cos(1*A)
	const c2 = Math.cos(2*A - 1*Math.PI)
	const c3 = Math.cos(3*A)// - 2*Math.PI)
	return 2*(c1 + c2 + c3)
}

const n = [ 
	0, .1, 0.145, .2, .3, .4, .5, .66666, .7, .8, .9, 1, 1.5, 2, 3, 4, 5, 5.66666666, 6, 7, 8, 9, 
	10, 11, 12, 13, 14, 15, 16, 17, 18, 19,
	20, 21, 22, 23, 24, 25, 26, 27, 28, 29,
	//30, 40, 50, 100, 500
]

const print = ()=> {
	n.forEach(n => {
		console.log(n, heptagonT(n))
	})
}

const options =
[
	{ 
		n:"print",
		c: print,
		d: "Print curve points"
	}, {
		n:"it",
		c: ()=> {
			const svg = new SVG()
			svg.it(200, 500)
			svg.save("auto/it.svg")
		},
		d: "Create it.svg graph file"
	}, {
		n:"case_n_d",
		c: (p)=> {
			const svg = new SVG()
			svg.case(p[1])
			const file = p[1].replace("/","_")
			svg.save(`auto/case-${file}.svg`)
		},
		d: "Create case_n_d.svg heptagon file"
	}
]

const args = process.argv.slice(2)
let found = false
options.forEach(opt => {
	if (opt.n == args[0]) {
		found = true
		opt.c(args)
	}
})
if (!found) {
	const use = [
		"Use: node AsAsAsBsAsAsAt.js [option]",
		"  options:"
	]
	options.forEach(opt => {
		use.push(`    ${opt.n} - ${opt.d}`   )
	})
	console.log(use.join("\n"))
}
