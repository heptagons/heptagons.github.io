const horizontalLinesSvg = ($, N, W, H, G)=> {
	const gs = (cb)=> {
		G.forEach(r => { cb(N + H*(r[0]/(r[0] + r[1])), r) })
	}
	$.g(null, {}, ()=> {
		gs(y => $.line("", { x1:N, y1:y, x2:N+W, y2:y }))
	})
	$.g(null, { "text-anchor": "end", fill:"#888", stroke:"none" }, ()=> {
		const x = N-6
		$.text("", { x:x, y:N-N/2 }, `y`)
		gs((y,r) => $.text("", { x:x, y:y }, `${r[0]}/${r[0]+r[1]}`))
	})
	$.g(null, { "text-anchor": "start", fill:"#000", stroke:"none" }, ()=> {
		const xr = W+N+8
		$.text("", { x:xr, y:N-N/2 }, `r`)
		gs((y,r) => $.text("", { x:xr, y:y }, `${r[0]}/${r[1]}`))
	})
}

const verticalLinesSvg = ($, N, W, H, color, A, T)=> {
	$.g(null, { "text-anchor": "middle", fill:color }, ()=> {
		A.forEach((x,i) => {
			const xx = N + W*(x-A[0])/(A.length - 1)
			$.line("", { x1:xx, y1:N, x2:xx, y2:N+H })
			$.text("", { x:xx, y:N-8, stroke:"none" }, T[i])
		})
	})
}

const anglesSvg = function(id)
{
	const $ = new XML()
	const M = 20, N = 40, W1=400, H1=500;
	const XX = [ 0, 1, 2, 3, 4, 5 ]
	const G = [ [0,10],[5,5],[6,4],[8,2],[17,3],[29,1],[10,0]]

	const A = (x)=> N + (W1*(1.0 - x)/(1.2 - x)) / 5
	const B = (x)=> N + (W1*(x)/(1.2 - x)) / 5
	const Y = (x)=> N + H1*x

	const dots = []
	for (let p=0; p <= 60; p++) {
		dots.push({ 
			y: Y(p / 60), 
			a: A(p / 60), 
			b: B(p / 60), 
			d: (p==51) ? "2" : (p==58) ? "4" : null 
		})
	}
	const angles = (color, u)=> {
		const T = [ "", "1&pi;", "2&pi;", "3&pi;", "4&pi;", "5&pi;"]
		verticalLinesSvg($, N, W1, H1, color, XX, T)
		$.g(null, { "stroke-width":3, "text-anchor":"middle"}, ()=> {
			dots.forEach((d,p)=> {
				if (d.d) {
					const L = { x1:d.a, y1:d.y, x2:d.b, y2:d.y, stroke:color }
					const T = { x:(d.b+d.a)/2, y:d.y-8, stroke:"none", fill:color }
					$.line("", L)
					$.text("", T, `B - A = ${d.d}&pi;`)
				}
			})
		})
	}
	const lines = ()=> {
		const lines = { 
			stroke:"#abc", "stroke-width":1, 
			"font-size":"12px", 
			"dominant-baseline": "middle" 
		}
		$.g(null, lines, ()=> {
			horizontalLinesSvg($, N, W1, H1, G)
			angles("#80f", "&pi;")
		})
	}
	const heptagon = (x, y, p, q, c)=> {
		const T = `translate(${x},${y})`
		const g = { transform:T, "font-size":"12px", "text-anchor":"middle"}
		const a = 10*c - p
		const b = p
		const d = 12*c - p
		$.g(null, g, ()=> {
			$.Rect(0,0,80,120,null,{ fill:"#fff", stroke:"#f00"} )
			As3BsA3t($, 80, 80, p, q)
			$.text(null, { x:40, y: 90, fill:"#000" }, `r = ${p}/${q}`)
			$.text(null, { x:40, y:102, fill:"#0c0" }, `A/&pi; = ${a}/${d}`)
			$.text(null, { x:40, y:114, fill:"#08f" }, `B/&pi; = ${b}/${d}`)
		})
	}
	const sss = { width:4*M+W1, height:3*M+H1, xmlns:"http://w3.org/2000/svg" }
	$.svg(null, sss, ()=> {
		$.g(null, { transform:"translate(0.5 0.5)" }, ()=> {
			lines()
			const curve = { "stroke-width":3, fill:"none"}
			$.g(null, curve, ()=> {
				const a = dots.map(r => `${r.a},${r.y}`)
				const b = dots.map(r => `${r.b},${r.y}`)
				$.polyline(null, { points:a.join(","), stroke:"#0d0" })
				$.polyline(null, { points:b.join(","), stroke:"#08f" })
			})
			heptagon(115, 160,  5, 5, 1)
			heptagon(245, 335, 17, 3, 2)
			heptagon(350, 385, 29, 1, 3)
			$.g(null, { fill:"#f00" }, ()=> {
				$.circle(null, { cx:B( 5/10), cy:Y( 5/10), r:4 })
				$.circle(null, { cx:B(17/20), cy:Y(17/20), r:4 })
				$.circle(null, { cx:B(29/30), cy:Y(29/30), r:4 })
			})
		})
	})
	$.id(id)
}


const sidesSvg = function(id)
{
	const $ = new XML()
	const M = 20, N = 40, W1=400, H1=500;
	const A = [ -3, -2, -1, 0, 1, 2, 3 ]
	const G = [ 
		[0,10],[4,6],[5,5],[6,4],[8,2],
		[17,3],[9,1],[28,2],[29,1],[10,0]
	]
	const CT = "#f80"
	const T = (y)=> {
		const A = Math.PI*(1 - y)/(1.2 - y)
		const x1 = Math.cos(1*A)
		const x2 = -Math.cos(2*A)//Math.cos(2*A - 1*Math.PI)
		const x3 = Math.cos(3*A)
		const t = 2*(x1 + x2 + x3)
		return N + W1*(t + 3) / 6
	}
	const Y = (y)=> N + H1*y

	const lines = ()=> {
		const lines = { 
			stroke:"#abc", "stroke-width":1, 
			"font-size":"12px", 
			"dominant-baseline": "middle" 
		}
		$.g(null, lines, ()=> {
			horizontalLinesSvg($, N, W1, H1, G)
			sides("s")
		})
	}
	const sides = (u)=> {
		const T = [ "", "-2s", "-1s", "t = 0", "+1s", "+2s", ""]
		verticalLinesSvg($, N, W1, H1, CT, A, T)
	}
	const heptagon = (x, y, p, q, c)=> {
		const t = `translate(${x},${y})`
		const g = { transform:t, "font-size":"12px", "text-anchor":"middle"}
		const a = 10*c - p
		const b = p
		const d = 12*c - p
		$.g(null, g, ()=> {
			$.Rect(0,0,80,110,null,{ fill:"#fff", stroke:"#f00"} )
			As3BsA3t($, 80, 80, p, q)
			$.text(null, { x:40, y: 90, fill:"#000" }, `r = ${p}/${q}`)
			$.text(null, { x:40, y:102, fill:CT }, `t = 1s`)
		})
	}
	const dots = []
	for (let p=0;  p <= 120; p++) {
		dots.push({ 
			x: T(p / 120), 
			y: Y(p / 120)
		})
	}
	const sss = { width:4*M+W1, height:3*M+H1, xmlns:"http://w3.org/2000/svg" }
	$.svg(null, sss, ()=> {
		const t = { stroke:CT, "stroke-width":3, fill:"none"}
		$.g(null, { transform:"translate(0.5 0.5)" }, ()=> {
			lines()
			$.g(null, t, ()=> {
				const p = dots.map(r => `${r.x},${r.y}`)
				$.polyline(null, { points:p.join(",") })
			})
			heptagon(320, 170,  5, 5, 1)
			heptagon(215, 345, 17, 3, 2)
			heptagon(120, 420, 29, 1, 3)
			$.g(null, { fill:"#f00" }, ()=> {
				$.circle(null, { cx:T( 5/10), cy:Y( 5/10), r:4 })
				$.circle(null, { cx:T(17/20), cy:Y(17/20), r:4 })
				$.circle(null, { cx:T(29/30), cy:Y(29/30), r:4 })
			})
		})
	})
	$.id(id)
}



