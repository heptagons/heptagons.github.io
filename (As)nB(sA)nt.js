const _AsnBsAnt = (svg, w, h, P)=> {
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
	svg.g(null, g1, ()=> {
		svg.g(null, g2, ()=> {
			svg.g(null, g21, ()=> {
				for (let i=0; i < 6; i++)
					svg.line(null, { x1:P[i].x, y1:P[i].y, x2:P[i+1].x, y2:P[i+1].y })
			})
			svg.g(null, g22, ()=> {
				svg.line(null, { x1:P[6].x, y1:P[6].y, x2:P[0].x, y2:P[0].y })
			})
			svg.g(null, g23, ()=> {
				P.forEach((p,i) => {
					const attrs = { cx:p.x, cy:p.y, r:0.1 }
					if (i==0) attrs.fill = "#080";
					if (i==3) attrs.fill = "#08f";
					svg.circle(null, attrs)
				})
			})
		})
	})
}

const As3BsA3t = (svg, w, h, p, q)=> {
	const i = p / (q || 0.001)
	const A = 5*Math.PI / (i + 6)
	const A1 = 1*A
	const A2 = 2*A - 1*Math.PI
	const A3 = 3*A
	const a = { x: Math.cos(A1), y: Math.sin(A1) }
	const b = { x: Math.cos(A2), y: Math.sin(A2) }
	const c = { x: Math.cos(A3), y: Math.sin(A3) }
	const P = [
		{ x:0                    , y:0               }, // P1
		{ x:1*a.x                , y:a.y             }, // P2
		{ x:1*a.x + 1*b.x        , y:a.y + b.y       }, // P3
		{ x:1*a.x + 1*b.x + 1*c.x, y:a.y + b.y + c.y }, // P4
		{ x:1*a.x + 1*b.x + 2*c.x, y:a.y + b.y       }, // P5
		{ x:1*a.x + 2*b.x + 2*c.x, y:a.y             }, // P6
		{ x:2*a.x + 2*b.x + 2*c.x, y:0               }  // P7
	]
	// d1 = P5.x - P3.x = 2*c.x = 2cos(3A) = 2(4u^3 - 3u)


	_AsnBsAnt(svg, w, h, P)
}

const AsnBsAnt_card = (xml, h, wh, t, footer, n)=> {
	const svg = new XML()
	const onclick = `javascript:AsnBsAnt_card_new(3, ${wh}, ${h.p}, ${h.q});`
	const sss = { 
		width:wh, height:wh, xmlns:"http://w3.org/2000/svg",
		onclick: onclick
	}
	svg.svg(null, sss, ()=> {
		switch (n) {
			case 3:
				As3BsA3t(svg, wh, wh, h.p, h.q)
				break;
		}
	})
	xml.span("c", { }, ()=> {
		xml.div("case", {}, ()=> {
			if (t)   xml.div(null, {}, t);
			if (h.c) xml.div("r", {}, `r<sub>${h.c}</sub> = ${h.p}/${h.q}`);
			if (h.A) xml.div("A", {}, `A/&pi; = ${h.A.p}/${h.A.q}`);
			if (h.B) xml.div("B", {}, `B/&pi; = ${h.B.p}/${h.B.q}`);
			xml.div(null, {}, ()=> {
				xml.append(svg)
			})
			if (footer)
				xml.div(null, { style:`max-width:${wh}px` }, footer)
		})
	})
	return ()=> {
	}
}

const AsnBsAnt_card_new = (n, wh, p, q)=> {
	const svg = new XML()
	const sss = { width:wh, height:wh, xmlns:"http://w3.org/2000/svg" }
	svg.svg(null, sss, ()=> {
		switch (n) {
			case 3:
				As3BsA3t(svg, wh, wh, p, q)
				break;
		}
	})
	const name = `As${n}BsA${n}t_${p}_${q}.svg`
	const text = svg.get().join("\n")
	//window.open("",`As${n}BsA${n}t_${p}_${q}.svg`).document.write(text)

	const blob = new Blob([ text ], { type: 'image/svg+xml' })
	const url = URL.createObjectURL(blob)
    var link = document.createElement('a');
    link.href = url
    link.setAttribute('download', name)
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
}
