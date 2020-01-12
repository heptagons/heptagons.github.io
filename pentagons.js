const As2BsA2t = ($g, w, h, p, q)=> {
	const i = p / (q || 0.001)
	const A = 5*Math.PI / (i + 6)
	const A1 = 1*A
	const A2 = 2*A - 1*Math.PI
	const A3 = 3*A
	const a = { x: Math.cos(A1), y: Math.sin(A1) }
	const b = { x: Math.cos(A2), y: Math.sin(A2) }
	const c = { x: Math.cos(A3), y: Math.sin(A3) }
	const P = [
		{ x:0                    , y:0               },
		{ x:1*a.x                , y:a.y             },
		{ x:1*a.x + 1*b.x        , y:a.y + b.y       },
		{ x:1*a.x + 1*b.x + 1*c.x, y:a.y + b.y + c.y },
		{ x:1*a.x + 1*b.x + 2*c.x, y:a.y + b.y       },
		{ x:1*a.x + 2*b.x + 2*c.x, y:a.y             },
		{ x:2*a.x + 2*b.x + 2*c.x, y:0               }
	]
	const X = { min:Number.MAX_VALUE, max:-Number.MAX_VALUE }
	const Y = { min:Number.MAX_VALUE, max:-Number.MAX_VALUE }
	P.forEach(p => {
		if (X.min > p.x) X.min = p.x;
		if (X.max < p.x) X.max = p.x;
		if (Y.min > p.y) Y.min = p.y;
		if (Y.max < p.y) Y.max = p.y;
	})
	const xm = (X.max + X.min) / 2
	const ym = (Y.max + Y.min) / 2
	const diff = Math.max(Math.abs(X.max - X.min), Math.abs(Y.max - Y.min))
	const S = 0.8 * Math.min(w,h) / diff
	const g1  = { transform:`translate(${w/2},${h/2})`}
	const g2  = { transform:`translate(${-S*xm},${+S*ym}) scale(${S} ${-S})` }
	const g21 = { stroke:"#888", "stroke-opacity":0.5, "stroke-width":0.05 }
	const g22 = { stroke:"#f80", "stroke-opacity":0.5, "stroke-width":0.05 }
	const g23 = { fill:"#0d0", "fill-opacity":0.5 }
	$g.g(null, g1, ()=> {
		$g.g(null, g2, ()=> {
			$g.g(null, g21, ()=> {
				for (let i=0; i < 6; i++)
					$g.line(null, { x1:P[i].x, y1:P[i].y, x2:P[i+1].x, y2:P[i+1].y })
			})
			$g.g(null, g22, ()=> {
				$g.line(null, { x1:P[6].x, y1:P[6].y, x2:P[0].x, y2:P[0].y })
			})
			$g.g(null, g23, ()=> {
				P.forEach((p,i) => {
					const attrs = { cx:p.x, cy:p.y, r:0.1 }
					if (i==3) attrs.fill = "#08f";
					$g.circle(null, attrs)
				})
			})
		})
	})
}

const pentagonSidesSvg = function(id)
{
	const $ = new XML()
	const M = 20, N = 40, W1=400, H1=500;
	const A = [ -3, -2, -1, 0, 1, 2, 3 ]

	const G = [ 
		[0,1],
		[1,2],[3,0],  // t=0 y=1/3, y=3/3
		[3,3],[11,1], // t=1 y=3/6, y=11/12
		[2,1],[5,1]   // t=2 y=2/3, y=5/6
	]
	const CT = "#f80"
	const T = (y)=> {
		const A = Math.PI*(1 - y)/(4/3 - y)
		const u = Math.cos(A)
		const t = 2*(- 2*u*u + u + 1)
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
			SvgPolygon.horizontalLines($, N, W1, H1, G)
			sides("s")
		})
	}
	const sides = (u)=> {
		SvgPolygon.verticalLines($, N, W1, H1, CT, A, 
			[ "", "-2", "-1", "t = 0", "+1", "+2", ""]
		)
	}
	const pentagon = (x, y, p, q, c, stroke, T)=> {
		const t = `translate(${x},${y})`
		const g = { transform:t, "font-size":"12px", "text-anchor":"middle"}
		const a = 2*3*c - p
		const b = p
		const d = 2*4*c - p
		$.g(null, g, ()=> {
			$.Rect(0,0,80,110,null,{ 
				fill:"#fff", stroke:stroke, "stroke-width":1.5
			})
			As2BsA2t($, 80, 80, p, q)
			$.text(null, { x:40, y: 90, fill:"#000" }, `r = ${p}/${q}`)
			$.text(null, { x:40, y:102, fill:CT }, `t = ${T}s`)
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
			// t = 0
			//pentagon(185,  60,  4, 6, 1, "#000", "0")
			//pentagon(185, 305,  9, 1, 1, "#000", "0")
			$.g(null, { fill:"#000"}, ()=> {
				$.circle(null, { cx:T( 1/3), cy:Y( 1/3), r:4 })
				$.circle(null, { cx:T( 3/3), cy:Y( 3/3), r:4 })
			})

			// t = 1
			//pentagon(270, 100,  5, 5, 1, "#f00", 1)
			//pentagon(270, 330, 17, 3, 2, "#f00", 1)
			$.g(null, { fill:"#f00" }, ()=> {
				$.circle(null, { cx:T(  3/6), cy:Y( 3/6), r:4 })
				$.circle(null, { cx:T(11/12), cy:Y(11/12), r:4 })
			})

			// t = 2
			//pentagon(355,  90,  6, 4, 1, "#840", 2)
			//pentagon(355, 205,  8, 2, 1, "#840", 2)
			$.g(null, { fill:"#840" }, ()=> {
				$.circle(null, { cx:T( 2/3), cy:Y( 2/3), r:4 })
				$.circle(null, { cx:T( 5/6), cy:Y( 5/6), r:4 })
			})

		})
	})
	$.id(id)
}


const pentagonAnglesSvg = function(id)
{
	const $ = new XML()
	const M = 20, N = 40, W1=400, H1=500;
	const XX = [ 0, 1, 2, 3 ]
	const G = [ [0,6],[3,3],[4,2],[8,1],[11,1],[6,0]]

	const K = 4/3.0
	const A = (x)=> N + (W1*(1.0 - x)/(K - x)) / 3
	const B = (x)=> N + (W1*(x)/(K - x)) / 3
	const Y = (x)=> N + H1*x

	const dots = []
	for (let p=0; p <= 60; p++) {
		dots.push({ 
			y: Y(p / 60), 
			a: A(p / 60), 
			b: B(p / 60), 
			d: (p==55) ? "2" : null 
		})
	}
	const angles = (color, u)=> {
		const T = [ "", "1&pi;", "2&pi;", "3&pi;" ]
		SvgPolygon.verticalLines($, N, W1, H1, color, XX, T)
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
			SvgPolygon.horizontalLines($, N, W1, H1, G)
			angles("#80f", "&pi;")
		})
	}
	const pentagon = (x, y, p, q, c)=> {
		const T = `translate(${x},${y})`
		const g = { transform:T, "font-size":"12px", "text-anchor":"middle"}
		const a = 10*c - p
		const b = p
		const d = 12*c - p
		$.g(null, g, ()=> {
			$.Rect(0,0,80,120,null,{ fill:"#fff", stroke:"#f00"} )
			As2BsA2t($, 80, 80, p, q)
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
			//heptagon(115, 160,  5, 5, 1)
			//heptagon(245, 335, 17, 3, 2)
			//heptagon(350, 385, 29, 1, 3)
			$.g(null, { fill:"#f00" }, ()=> {
				$.circle(null, { cx:B(  3/6), cy:Y( 3/6), r:4 })
				$.circle(null, { cx:B(11/12), cy:Y(11/12), r:4 })
			})
		})
	})
	$.id(id)
}


