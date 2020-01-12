
document.addEventListener('DOMContentLoaded', app);
function app() {
    //Model
    const svg = document.querySelector('svg');
    // const canvas = document.querySelector('canvas');
    const selectie = document.querySelector('#selectie');
    const elemente = document.querySelector('#elemente');

    let inDesenare = false;
    let mx, my = 0;
    let x1, y1 = 0;

    //2.Desenare
    function desenare() {

        if (inDesenare) {
            setareCoordonate(selectie, x1, y1, mx, my);
            selectie.style.display = 'block';
        } else {
            selectie.style.display = 'none';
        }
        requestAnimationFrame(desenare);
    }
    desenare();


    //4,Tratare  evenimente
    svg.addEventListener('mousedown', e => {
        if (e.button === 0) {
            inDesenare = true;
            x1 = mx;
            y1 = my;
        }
    });
    svg.addEventListener('mouseup', e => {
        if (e.button === 0) {//vezi unde pui acolada de aici
            inDesenare = false;
        }
        const rect = document.createElementNS(
            "http://www.w3.org/2000/svg", "rect");
        setareCoordonate(rect, x1, y1, mx, my);
        elemente.append(rect);


        rect.addEventListener('contextmenu', e => {
            e.preventDefault();
            console.log(e.target);


        })

    });

    svg.addEventListener('mousemove', e => {
        mx = e.clientX - svg.getBoundingClientRect().left;
        my = e.clientY - svg.getBoundingClientRect().top;
    });
}

function setareCoordonate(elem, x1, y1, x2, y2) {
    elem.setAttributeNS(null, 'x', Math.min(x1, x2));
    elem.setAttributeNS(null, 'y', Math.min(y1, y2));
    elem.setAttributeNS(null, 'width', Math.abs(x1 - x2));
    elem.setAttributeNS(null, 'height', Math.abs(y1 - y2));
}

function drawCircle() {
    let svgns = "http://www.w3.org/2000/svg",
        container = document.getElementById('cont');
    for (let x = 0; x < 500; x += 50) {
        for (let y = 0; y < 300; y += 50) {
            const circle = document.createElementNS(svgns, 'circle');
            circle.setAttributeNS(null, 'cx', x);
            circle.setAttributeNS(null, 'cy', y);
            circle.setAttributeNS(null, 'r', 50);
            circle.setAttributeNS(null, 'style', 'fill: none; stroke: blue; stroke-width: 1px;' );
            container.appendChild(circle);
        }
    }
}
//document.getElementById('circle').addEventListener("click",drawCircle);
var mousedownonelement = false;

window.getlocalmousecoord = function (svg, evt) {
    var pt = svg.createSVGPoint();
    pt.x = evt.clientX;
    pt.y = evt.clientY;
    var localpoint = pt.matrixTransform(svg.getScreenCTM().inverse());
    localpoint.x = Math.round(localpoint.x);
    localpoint.y = Math.round(localpoint.y);
    return localpoint;
};

window.createtext = function (localpoint, svg) {
    var myforeign = document.createElementNS('http://www.w3.org/2000/svg', 'foreignObject')
    var textdiv = document.createElement("div");
    var textnode = document.createTextNode("Click to edit");
    textdiv.appendChild(textnode);
    textdiv.setAttribute("contentEditable", "true");
    textdiv.setAttribute("width", "auto");
    myforeign.setAttribute("width", "100%");
    myforeign.setAttribute("height", "100%");
    myforeign.classList.add("foreign"); //to make div fit text
    textdiv.classList.add("insideforeign"); //to make div fit text
    textdiv.addEventListener("mousedown", elementMousedown, false);
    myforeign.setAttributeNS(null, "transform", "translate(" + localpoint.x + " " + localpoint.y + ")");
    svg.appendChild(myforeign);
    myforeign.appendChild(textdiv);

};

function elementMousedown(evt) {
    mousedownonelement = true;
}


$(('#Capa_1')).click(function (evt) {
    var svg = document.getElementById('Capa_1');
    var localpoint = getlocalmousecoord(svg, evt);
    if (!mousedownonelement) {
        createtext(localpoint, svg);
    } else {
        mousedownonelement = false;
    }
});