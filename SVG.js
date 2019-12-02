const fs = require("fs")

module.exports = function()
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
		fs.writeFile(filename, r.join("\n"), (err)=> {
		    if (err)
		        return console.log(err);
		    console.log(`file ${filename} saved!`)
		})
		r.forEach(r => { console.log(r)	})
	}

	this.it = (w, h)=> {
		svg(w, h, ()=> {
			it_1(50, 50)
		})
	}

	this.case = (w, h, i)=> {
		svg(w, h, ()=> {
			case_1(w/4, h/4, i)
		})
	}

	const CASES = [
		0, 2/3., 1, 3/2., 4, 17/3., 9, 14, 29
	]

	const svg = (w, h, text)=> {
		xml("svg", {
			xmlns:  "http://www.w3.org/2000/svg",
			width:  w,
			height: h
		})
		text()
		xml("/svg")
	}

	const case_1 = (x,y,I)=> {
		const nd = I.split("/")
		const num = parseInt(nd[0])
		const den = parseInt(nd[1] || 1)
		const i = num / den
		console.log("i", i)
		const A = 5*Math.PI / (i + 6)
		const x1 = Math.cos(1*A)
		const x2 = Math.cos(2*A - 1*Math.PI)
		const x3 = Math.cos(3*A)// - 2*Math.PI)
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
		const s = parseInt(x*0.7)
		const points = P.map(P => {
			return `${s*P.x},${s*P.y}`
		})
		xml("g", { transform:`translate(${x},${y})` })

		xml("g", { stroke:"#888", "stroke-opacity":0.5, fill:"none", "stroke-width":2 })
		xml("polyline", { points:points.join(" ") }, true)
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
		const DY = 12
		const I = "#888"
		it_1_x(X, DX, I)
		it_1_y(Y, DY, I)
		it_curve(DX, DY)
		it_special(DX, DY)
		xml("/g")
	}

	const it_1_x = (X, DX, I)=> {
		xml("g", { stroke:I, "stroke-width":2 })
		xml("line", { x1:0, y1:-25, x2:0, y2:600}, true)
		xml("/g")
		xml("g", { stroke:"#f80", "stroke-width":0.5 })
		X.forEach(x => { xml("line", { x1:DX*x+.5, y1:0, x2:DX*x+.5, y2:600}, true) })
		xml("/g")
		xml("g", { "font-size":"12px","text-anchor":"middle", "dominant-baseline":"middle" })
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
		xml("g", { "font-size":"12px","text-anchor":"end", "dominant-baseline":"middle" })
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
			fill:"#f00", "font-size":"12px", 
			"text-start":"start", "dominant-baseline":"hanging"		
		})
		CASES.forEach((i,j) => {
			const t = heptagonT(i)
			xml("circle", { cx:t*DX, cy:i*DY, r:4 }, true)
			xml("text", { x:t*DX+6, y:i*DY+3 }, true, j+1)
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



