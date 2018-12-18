function turnblue(index) {
    var a = null
    switch (index) {
        case 1:a = document.getElementById('first');break;
        case 2:a = document.getElementById('second');break;
        case 3:a = document.getElementById('third');break;
        case 4:a = document.getElementById('fourth');break;
    }
    a.src = 'images/blue.png'
}

function turngreen(index) {
    var a = null
    switch (index) {
        case 1:a = document.getElementById('first');break;
        case 2:a = document.getElementById('second');break;
        case 3:a = document.getElementById('third');break;
        case 4:a = document.getElementById('fourth');break;
    }
    a.src = 'images/green.png'
}

function turnorange(index) {
    var a = null
    switch (index) {
        case 1:a = document.getElementById('first');break;
        case 2:a = document.getElementById('second');break;
        case 3:a = document.getElementById('third');break;
        case 4:a = document.getElementById('fourth');break;
    }
    a.src = 'images/orange.png'
}

function turnred(index) {
    var a = null
    switch (index) {
        case 1:a = document.getElementById('first');break;
        case 2:a = document.getElementById('second');break;
        case 3:a = document.getElementById('third');break;
        case 4:a = document.getElementById('fourth');break;
    }
    a.src = 'images/red.png'
}

function gotofirework() {
    let first,second,third,fourth;

    let a = document.getElementById('first');
    if(/blue/.test(a.src)){
        first = 'blue'
    }else if(/green/.test(a.src)){
        first = 'green'
    }else if(/orange/.test(a.src)){
        first = 'orange'
    }else if(/red/.test(a.src)){
        first = 'red'
    }

    let b = document.getElementById('second');
    if(/blue/.test(b.src)){
        second = 'blue'
    }else if(/green/.test(b.src)){
        second = 'green'
    }else if(/orange/.test(b.src)){
        second = 'orange'
    }else if(/red/.test(b.src)){
        second = 'red'
    }

    let c = document.getElementById('third');
    if(/blue/.test(c.src)){
        third = 'blue'
    }else if(/green/.test(c.src)){
        third = 'green'
    }else if(/orange/.test(c.src)){
        third = 'orange'
    }else if(/red/.test(c.src)){
        third = 'red'
    }

    let d = document.getElementById('fourth');
    if(/blue/.test(d.src)){
        fourth = 'blue'
    }else if(/green/.test(d.src)){
        fourth = 'green'
    }else if(/orange/.test(d.src)){
        fourth = 'orange'
    }else if(/red/.test(d.src)){
        fourth = 'red'
    }

    console.log(first + second + third + fourth)

    // 打开新的窗口
    window.location.href=`firework/firework.html?first=${first}&second=${second}&third=${third}&fourth=${fourth}`;
}