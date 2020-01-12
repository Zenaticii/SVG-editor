
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

