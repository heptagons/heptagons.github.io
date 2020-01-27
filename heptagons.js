
const HeptagonSides = function(xml, N, W1, H1, CT)
{
	this.lines = (G, A, AT)=> {
		const lines = { 
			stroke:"#abc", "stroke-width":1, 
			"font-size":"12px", 
			"dominant-baseline": "middle" 
		}
		xml.g(null, lines, ()=> {
			SvgPolygon.horizontalLines(xml, N, W1, H1, G)
			const u = "s"
			SvgPolygon.verticalLines(xml, N, W1, H1, CT, A, AT)
		})
	}

	this.cards = (stroke, t, polygons)=> {
		polygons.forEach(p => {
			card(p.x, p.y, p.p, p.q, p.c, stroke, t)
		})
		xml.g(null, { fill:stroke}, ()=> {
			polygons.forEach(p => {
				const y = p.p / (p.p + p.q)
				xml.circle(null, { cx:T3(y), cy:Y(y), r:4 })
			})
		})
	}

	this.d1_curve = (max)=> {
		const dots = []
		for (let p=0;  p <= max; p++)
			dots.push({ x: T1(p / max), y: Y(p / max) })
		return dots
	}
	this.d2_curve = (max)=> {
		const dots = []
		for (let p=0;  p <= max; p++)
			dots.push({ x: T2(p / max), y: Y(p / max) })
		return dots
	}
	this.d3_curve = (max)=> {
		const dots = []
		for (let p=0;  p <= max; p++)
			dots.push({ x: T3(p / max), y: Y(p / max) })
		return dots
	}

	const card = (x, y, p, q, c, stroke, tt)=> {
		const t = `translate(${x},${y})`
		const g = { transform:t, "font-size":"12px", "text-anchor":"middle"}
		const a = 10*c - p
		const b = p
		const d = 12*c - p
		xml.g(null, g, ()=> {
			xml.Rect(0,0,60,90,null,{ 
				fill:"#fff", stroke:stroke, "stroke-width":1.5
			})
			As3BsA3t(xml, 60, 60, p, q)
			xml.text(null, { x:30, y:70, fill:"#000" }, `r = ${p}/${q}`)
			xml.text(null, { x:30, y:82, fill:CT }, `t = ${tt}s`)
		})
	}

	const Y = (y)=> N + H1*y
	const T1 = (y)=> {
		const A = Math.PI*(1 - y)/(6/5 - y)
		const u = Math.cos(A)
		const t = 2*(4*u*u*u - 3*u)
		return N + W1*(t + 3) / 6
	}
	const T2 = (y)=> {
		const A = Math.PI*(1 - y)/(6/5 - y)
		const u = Math.cos(A)
		const t = 2*(4*u*u*u - 2*u*u - 3*u + 1)
		return N + W1*(t + 3) / 6
	}
	const T3 = (y)=> {
		const A = Math.PI*(1 - y)/(6/5 - y)
		const u = Math.cos(A)
		const t = 2*(4*u*u*u - 2*u*u - 2*u + 1)
		return N + W1*(t + 3) / 6
	}
}

const heptagons_ts_graph = function(id, G, cd1, cd2, cd3)
{
	const M = 20, N = 40, W1=400, H1=500;
	const A = [ -3, -2, -1, 0, 1, 2, 3 ]
	const AT = [ "", `-2`, `-1`, "0", `+1`, `+2`, "" ]
	const Y = (y)=> N + H1*y
	const T = (y)=> {
		const A = Math.PI*(1 - y)/(6/5 - y)
		const u = Math.cos(A)
		const t = 2*(4*u*u*u - 2*u*u - 2*u + 1)
		return N + W1*(t + 3) / 6
	}

	const xml = new XML()
	const hs = new HeptagonSides(xml, N, W1, H1, cd3)
	const d1 = hs.d1_curve(120)
	const d2 = hs.d2_curve(120)
	const d3 = hs.d3_curve(120)
	const sss = { width:4*M+W1, height:3*M+H1, xmlns:"http://w3.org/2000/svg" }
	xml.svg(null, sss, ()=> {
		xml.g(null, { transform:"translate(0.5 0.5)" }, ()=> {
			hs.lines(G, A, AT)

			const t1 = { stroke:cd1, "stroke-width":1, fill:"none"}
			xml.g(null, t1, ()=> {
				const p = d1.map(r => `${r.x},${r.y}`)
				xml.polyline(null, { points:p.join(",") })
			})

			const t2 = { stroke:cd2, "stroke-width":1, fill:"none"}
			xml.g(null, t2, ()=> {
				const p = d2.map(r => `${r.x},${r.y}`)
				xml.polyline(null, { points:p.join(",") })
			})

			const t3 = { stroke:cd3, "stroke-width":3, fill:"none"}
			xml.g(null, t3, ()=> {
				const p = d3.map(r => `${r.x},${r.y}`)
				xml.polyline(null, { points:p.join(",") })
			})
		})
	})
	xml.id(id)
}

const heptagons_t_graph = function(id)
{
	const M = 20, N = 40, W1=400, H1=500;
	const A = [ -3, -2, -1, 0, 1, 2, 3 ]
	const AT = [ "", `-2`, `-1`, "t = 0", `+1`, `+2`, "" ]

	const G = [ 
		[0,10],[4,6],[5,5],[6,4],[8,2],
		[17,3],[9,1],[28,2],[29,1],[10,0]
	]
	const CT = "#f80"
	const Y = (y)=> N + H1*y
	const T = (y)=> {
		const A = Math.PI*(1 - y)/(6/5 - y)
		const u = Math.cos(A)
		const t = 2*(4*u*u*u - 2*u*u - 2*u + 1)
		return N + W1*(t + 3) / 6
	}

	const xml = new XML()
	const hs = new HeptagonSides(xml, N, W1, H1, CT)
	const sss = { width:4*M+W1, height:3*M+H1, xmlns:"http://w3.org/2000/svg" }
	xml.svg(null, sss, ()=> {
		xml.g(null, { transform:"translate(0.5 0.5)" }, ()=> {
			hs.lines(G, A, AT)
			const t = { stroke:CT, "stroke-width":3, fill:"none"}
			xml.g(null, t, ()=> {
				const d3 = hs.d3_curve(120)
				const p = d3.map(r => `${r.x},${r.y}`)
				xml.polyline(null, { points:p.join(",") })
			})
			// t = 0
			hs.cards("#000", "0", [
				{ x:185, y:60,  p: 4, q:6, c:1 },
				{ x:185, y:305, p: 9, q:1, c:1 },
				{ x:55,  y:430, p:28, q:2, c:2 }
			])
			// t = 1
			hs.cards("#f00", 1, [
				{ x:278, y:160, p: 5, q:5, c:1 },
				{ x:278, y:355, p:17, q:3, c:2 },
				{ x:160, y:440, p:29, q:1, c:3 },
			])
			// t = 2
			hs.cards("#840", 2, [
				{ x:377, y:125, p: 6, q:4, c:1 },
				{ x:377, y:240, p: 8, q:2, c:1 },
				{ x:377, y:445, p:10, q:0, c:1 }
			])
		})
	})
	xml.id(id)
}




const heptagonAnglesSvg = function(id)
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


const subD = (n)=> `d<sub>${n}</sub>`
const subX = (n)=> `X<sub>${n}</sub>`


const H60 = function()
{
	this.typesIntersections = {
		"1":     `${subD(1)} = 0, II<sub>1</sub>`,
		"1,2":   `${subX(1)}`,
		"2":     `d<sub>2</sub> = 0`,
		"2,3":   `${subX(2)}`,
		"3":     `d<sub>3</sub> = 0`,
		"3,4":   `0 < d<sub>3</sub> < 2, B < &pi;`,
		"4":     `d<sub>3</sub> = 2, B = &pi;`,
		"4,5":   `2&pi; > B > &pi;`,
		"5":     `${subD(1)} = 0, II<sub>1</sub>, K<sub>1</sub>`,
		"5,6":   `${subX(1)}, ${subX(3)}`,
		"6":     `${subX(1)}, ${subX(3)}, K<sub>2</sub>`,
		"6,7":   `${subX(1)}, ${subX(3)}, ${subX(4)}, ${subX(5)}`,
		"7":     `d<sub>2</sub> = 0, K<sub>3</sub>`,
		"7,8":   `${subX(2)}`,
		"8":     `d<sub>3</sub> = 0, d<sub>4</sub> = 0, ${subD(1)} = 2`,
		"8,9":   `d<sub>3</sub> < 0, ${subX(6)}`,
		"9":     `d<sub>3</sub> = 0, ${subX(6)}`,
		"9,10":  `${subX(6)}, ${subX(2)}`,
		"10":    `${subX(6)}, ${subX(2)}, K<sub>3</sub>`,
		"10,11": `${subX(6)}, ${subX(2)}, ${subX(3)}, ${subX(4)}`,
		"11":    `${subX(6)}, ${subX(2)}, ${subX(3)}, ${subX(4)}, K<sub>5</sub>`,
		"11,12": `${subX(6)}, ${subX(2)}, ${subX(3)}, ${subX(4)}, ${subX(5)}, ${subX(7)}`,
		"12":    `${subX(6)}, ${subX(2)}, ${subX(3)}, ${subX(4)}, ${subX(5)}, ${subX(7)}, ${subD(1)} = 0, II<sub>1</sub>`,
		"12,13": `${subX(6)}, ${subX(2)}, ${subX(3)}, ${subX(4)}, ${subX(5)}, ${subX(7)}, ${subX(8)}, ${subX(1)}`,
		"13":    "?",
		"13,14": "?",
		"14":    "?"
	}

	this.types = [ // 27 types, 14 degenerated [x], 13 groups [x,x+1]
		// p, q, type                 p, q, type
		[  0,10, 1] /* D1  */, [  1, 9, "1,2"],  // NS1
		[  2, 8, 2] /* D2  */, [  3, 7, "2,3"],  // NS2
		[  4, 6, 3] /* D3  */, [  5, 5, "3,4"],  // Convex {7}
		[  6, 4, 4] /* D4  */, [  7, 3, "4,5"],  // Concave
		[  8, 2, 5] /* D5  */, [ 25, 5, "5,6"],  // NS3
		[ 42, 8, 6] /* D6  */, [ 17, 3, "6,7"],  // NS4 {7/2}
		[ 26, 4, 7] /* D7  */, [ 35, 5, "7,8"],  // NS5
		[  9, 1, 8] /* D8  */, [ 37, 3, "8,9"],  // NS6
		[ 28, 2, 9] /* D9  */, [ 47, 3, "9,10"], // NS7
		[ 19, 1,10] /* D10 */, [143, 7,"10,11"], // NS8
		[287,13,11] /* D11 */, [115, 5,"11,12"], // NS9
		[ 48, 2,12] /* D12 */, [ 29, 1,"12,13"], // NS10 {7/3}
		[ 49, 1,13] /* D13 */, [ 59, 1,"13,14"], // NS11
		[ 10, 0,14] // D14
	]

	this.YB = this.types.filter((f,i)=> { return i%2==0 })
	this.YG = [
		{ t:"Non Simple 1",  max:4  }, //  D1- D2
		{ t:"Non Simple 2",  max:4  }, //  D2- D3
		{ t:"Convex",        max:5  }, //  D3- D4
		{ t:"Concave",       max:5  }, //  D4- D5
		{ t:"Non Simple 3",  max:20 }, //  D5- D6
		{ t:"Non Simple 4",  max:20 }, //  D6- D7
		{ t:"Non Simple 5",  max:20 }, //  D7- D8
		{ t:"Non Simple 6",  max:30 }, //  D8- D9
		{ t:"Non Simple 7",  max:30 }, //  D9-D10
		{ t:"Non Simple 8",  max:60 }, // D10-D11
		{ t:"Non Simple 9",  max:60 }, // D11-D12
		{ t:"Non Simple 10", max:60 }, // D12-D13
		{ t:"Non Simple 11", max:60 }, // D13-D14
	]
	this.YBreduced = this.YB.filter(f => { return f[0]+f[1] <= 20})
	this.YGreduced = [
		[1,9, "NS 1"],     //  D1 -- D2  : 0,10 -  2,8 => 1,9
		[3,7, "NS 2"],     //  D2 -- D3  : 2,8  -  4,6 => 3,7
		[5,5, "Convex"],   //  D3 -- D4  : 4,6  -  6,4 => 5,5
		[7,3, "Concave"],  //  D4 -- D5  : 6,4  -  8,2 => 7,3
		[17,3,"NS 3-5"],   //  D5 -- D8  : 8,2  -  9,1 => 1,1
		[37,3,"NS 6-7"],   //  D8 -- D10 : 18,2 - 19,1 => 18.5/1.5
		[39,1, "NS 8-11"], // D10 -- D14 : 19,1 - 20,0 => 19.5/0.5
	]

	const S = 2*3*2*5 // 60
	const array = []
	const min = 0, max = 10 * S
	for (let p=min; p <= max; p++) {
		const q = max - p
		let f = 1
		let c = 0
		if (p % 60 == 0) { c =  1; f = 60; } else
		if (p % 30 == 0) { c =  2; f = 30; } else
		if (p % 20 == 0) { c =  3; f = 20; } else
		if (p % 15 == 0) { c =  4; f = 15; } else
		if (p % 12 == 0) { c =  5; f = 12; } else
		if (p % 10 == 0) { c =  6; f = 10; } else
		if (p %  6 == 0) { c = 10; f =  6; } else
		if (p %  5 == 0) { c = 12; f =  5; } else
		if (p %  4 == 0) { c = 15; f =  4; } else
		if (p %  3 == 0) { c = 20; f =  3; } else
		if (p %  2 == 0) { c = 30; f =  2; } else
		if (p %  1 == 0) { c = 60; f =  1; }
		const P = p/f
		const Q = q/f
		const A = { p: Q , q: (P + 6*Q)/5 }
		const B = { p: P , q: (P + 6*Q)/5 }
		array.push({ i:p, p:P, q:Q, c:c, A:A, B:B })
	}

	this.array = ()=> { return array }

	this.single = (p, q)=> {
		const a = array.filter(d => { return d.p == p && d.q == q })
		return a.length ? a[0] : {}
	}
	this.group = (p1, q1, p2, q2)=> {
		const first = this.single(p1, q1)
		const last  = this.single(p2, q2)
		return array.filter(d => { return d.i > first.i && d.i < last.i })
	}
}




