"use strict";

const SVG = function()
{
	const r = []

	const xml = (e, attrs, end, text)=> {
		const cols = []
		cols.push(e)
		if (attrs) {
			Object.keys(attrs).forEach(k => {
				cols.push(`${k}="${attrs[k]}"`)
			})
		}
		const tail = (!end) ? ">" : (!text) ? "/>" : `>${text}</${e}>`
		r.push(`<${cols.join(" ")}${tail}`)
	}

	this.save = (filename)=> {
		const fs = require("fs")
		fs.writeFile(filename, r.join("\n"), (err)=> {
		    if (err)
		        return console.log(err);
		    console.log(`file ${filename} saved!`)
		})
		r.forEach(r => { console.log(r)	})
	}

	this.it = (w, h)=> {
		r.length = 0
		svg(w, h, ()=> {
			it_1(50, 50)
		})
		return r
	}

	this.case = (i)=> {
		const w = 200
		const h = 200
		svg(w, h, ()=> {
			case_1(w, h, i)
		})
	}

	this.caseSvg = (w, h, i)=> {
		r.length = 0
		svg(w, h, ()=> {
			case_1(w, h, i)
		})
		return r
	}

	const svg = (w, h, text)=> {
		xml("svg", {
			xmlns:  "http://www.w3.org/2000/svg",
			width:  w,
			height: h
		})
		text()
		xml("/svg")
	}

	const case_1 = (w, h, I)=> {
		const nd = I.split("/")
		const num = parseInt(nd[0])
		const den = nd.length == 1 ? 1 : parseInt(nd[1]) || 0.001
		const i = num / den
		const A = 5*Math.PI / (i + 6)
		const x1 = Math.cos(1*A)
		const x2 = Math.cos(2*A - 1*Math.PI)
		const x3 = Math.cos(3*A)
		const y1 = Math.sin(1*A)
		const y2 = Math.sin(2*A - 1*Math.PI)
		const y3 = Math.sin(3*A)

		const P = [
			{ x: 0               , y:0        },
			{ x:x1               , y:y1       },
			{ x:x1+x2            , y:y1+y2    },
			{ x:x1+x2+x3         , y:y1+y2+y3 },
			{ x:x1+x2+x3+x3      , y:y1+y2    },
			{ x:x1+x2+x3+x3+x2   , y:y1       },
			{ x:x1+x2+x3+x3+x2+x1, y:0        }
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
		xml("g", { transform:`translate(${w/2},${h/2})`})
		xml("g", { transform:`translate(${-S*xm},${+S*ym}) scale(${S} ${-S})` })

		xml("g", { stroke:"#f00", "stroke-opacity":0.5, "stroke-width":0.05 })
		for (let i=0; i < 6; i++)
			xml("line", { x1:P[i].x, y1:P[i].y, x2:P[i+1].x, y2:P[i+1].y }, true)
		xml("/g")
		xml("g", { stroke:"#f80", "stroke-opacity":0.5, "stroke-width":0.05 })
		xml("line", { x1:P[6].x, y1:P[6].y, x2:P[0].x, y2:P[0].y }, true)
		xml("/g")

		xml("g", { fill:"#0d0", "fill-opacity":0.5 })
		P.forEach((p,i) => {
			const attrs = { cx:p.x, cy:p.y, r:0.1 }
			if (i==3)
				attrs.fill = "#08f"
			xml("circle", attrs, true)
		})
		xml("/g")

		xml("/g")
		xml("/g")
	}


	const it_1 = (x, y)=> {
		xml("g", { transform:`translate(${x},${y})`, "font-family":"sans-serif" })
		const X = [ 1, 2 ]
		const DX = 50
		const Y = [ 
			1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15,
			16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 
			29, 30, 31, 32, 33, 34, 35, 36, 37
		]
		const DY = 40
		const I = "#888"
		it_1_x(X, DX, I, 1600)
		it_1_y(Y, DY, I)
		it_curve(DX, DY)
		it_special(DX, DY)
		xml("/g")
	}

	const it_1_x = (X, DX, I, y2)=> {
		xml("g", { stroke:I, "stroke-width":2 })
		xml("line", { x1:0, y1:-25, x2:0, y2:y2 }, true)
		xml("/g")
		xml("g", { stroke:"#f80", "stroke-width":0.5 })
		X.forEach(x => { xml("line", { x1:DX*x+.5, y1:0, x2:DX*x+.5, y2:y2 }, true) })
		xml("/g")
		xml("g", { "font-size":"15px","text-anchor":"middle", "dominant-baseline":"middle" })
		xml("text", { x:0, y:-25-7, fill:I, "font-size":"14px" }, true, "i")
		X.forEach(x => {
			xml("text", { x: DX*x+.5, y: -7, fill:"#f80" }, true, x)
		})
		xml("/g")
	}

	const it_1_y = (Y, DY, I)=> {
		xml("g", { stroke:"#f80", "stroke-width":2 })
		xml("line", { x1:-25, y1:0, x2:150, y2:0}, true)
		xml("/g")
		xml("g", { stroke:I, "stroke-width":0.5 })
		Y.forEach(y => { xml("line", { x1:0, y1:DY*y+.5, x2:150, y2:DY*y+.5}, true) })
		xml("/g")
		xml("g", { "font-size":"15px","text-anchor":"end", "dominant-baseline":"middle" })
		xml("text", { x:-25-7, y:0, fill:"#f80", "font-size":"14px" }, true, "t")
		Y.forEach(y => {
			xml("text", { x:-7, y:DY*y, fill:I }, true, y)
		})
		xml("/g")
	}

	const it_curve = (DX, DY)=> {
		const points = []
		for (let i=0; i < 40; i += 0.1) {
			const t = heptagonT(i)
			points.push(`${t*DX},${i*DY}`)
		}
		xml("g", { stroke:"#123", fill:"none", "stroke-width":2 })
		xml("polyline", { points:points.join(" ") }, true)
		xml("/g")
	}

	const it_special = (DX, DY)=> {
		xml("g", { 
			fill:"#07d", "font-size":"15px", 
			"text-start":"start", "dominant-baseline":"hanging"		
		})

		const B = { 
			"4/6" : { B:"4/8", y:-4 },
			"5/5" : { B:"5/7", y:-4 },
			"6/4" : { B:"6/6", y:-4 },
			"8/2" : { B:"8/4"  },
			"17/3": { B:"17/7" },
			"9/1" : { B:"9/3"  },
			"28/2": { B:"28/8" },
			"19/1": { B:"19/5" },
			"29/1": { B:"29/7" } 
		}

		const CASES = []
		for (let j=0; j <= 60; j++) {
			const doRow = (div, fill, end)=> {
				const d = { n: j/div, d: (60-j)/div }
				const b = B[`${d.n}/${d.d}`]
				CASES.push({ i:d.n / (d.d || 0.001), b:b, fill:fill } )
			}
			if (j%6==0) { doRow(6,"#f00") } else
			if (j%6==2) { doRow(2,"#08f") } else
			if (j%6==3) { doRow(3,"#0d0") } else
			if (j%6==4) { doRow(2,"#08f", true) }
		}
		CASES.forEach(c => {
			const t = heptagonT(c.i)
			xml("circle", { cx:t*DX, cy:c.i*DY, r:3, fill:c.fill }, true)
			if (c.b) {
				const y = c.b.y || 1
				xml("text", { x:t*DX+3, y:c.i*DY+y*3 }, true, c.b.B)
			}
		})
		xml("/g")
	}

	const heptagonT = (i)=> {
		const A = 5*Math.PI / (i + 6)
		const x1 = Math.cos(1*A)
		const x2 = Math.cos(2*A - 1*Math.PI)
		const x3 = Math.cos(3*A)// - 2*Math.PI)
		return 2*(x1 + x2 + x3)
	}
}

if (typeof exports !== 'undefined') {
    if (typeof module !== 'undefined' && module.exports) {
    	exports = module.exports = SVG
    }
    exports.SVG = SVG
}

const XML = function()
{
	const r = []
	const $ = (e, clazz, attrs, end, text)=> {
		const cols = []
		cols.push(e)
		if (clazz)
			cols.push(`class=${clazz}`)
		if (attrs)
			Object.keys(attrs).forEach(k => { 
				cols.push(`${k}="${attrs[k]}"`) 
			})
		const tail = (!end) ? ">" : (!text) ? "/>" : `>${text}</${e}>`
		r.push(`<${cols.join(" ")}${tail}`)
	}
	const $$ = (e, c, attrs, C) => { 
		$(e, c, attrs)
		C()
		$(`/${e}`) 
	}
	const $$$ = (e, c, attrs, C)=> {  
		if (typeof C === "function") return $$(e, c, attrs, C);
		$ (e,   c, attrs, true, C) 
	}
	this.id = (id)=> {
		document.getElementById(id).innerHTML = r.join("\n")
	}
	this.circle = (c, attrs)   => {  $("circle", c, attrs, true)    }
	this.text   = (c, attrs, t)=> {  $("text",   c, attrs, true, t) }
	this.line   = (c, attrs)   => {  $("line",   c, attrs, true)    }
	this.style  = (c, attrs, t)=> {  $("style",  c, attrs, true, t) }

	this.g      = (c, attrs, C)=> { $$("g",      c, attrs, C) }
	this.svg    = (c, attrs, C)=> { $$("svg",    c, attrs, C) }
	this.defs   = (c, attrs, C)=> { $$("defs",   c, attrs, C) }

	this.b      = (c, attrs, C)=> { $$$("b",    c, attrs, C) }
	this.span   = (c, attrs, C)=> { $$$("span", c, attrs, C) }
	this.div    = (c, attrs, C)=> { $$$("div",  c, attrs, C) }
	this.dl     = (c, attrs, C)=> { $$$("dl",   c, attrs, C) }
	this.dt     = (c, attrs, C)=> { $$$("dt",   c, attrs, C) }
	this.dd     = (c, attrs, C)=> { $$$("dd",   c, attrs, C) }
	this.h2     = (c, attrs, C)=> { $$$("h2",   c, attrs, C) }
}



