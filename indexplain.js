import {word_list_js} from "./words.js"; 

function get_location(int) {
    return({'x': int % 5 + 1, 'y': Math.floor(int / 5) + 1})
};

test

function update_board() {
    for (var i = 0; i < document.getElementsByTagName("td").length; i++) {
        board[i]['letter'] = document.getElementsByTagName("td")[i].innerText;
        board[i]['background'] = document.getElementsByTagName("td")[i].style.backgroundColor;
    };
};

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
        vars[key] = value;
    });
    return vars;
};

var m_w = 123456789;
var m_z = 987654321;
var mask = 0xffffffff;

function seed(i) {
    m_w = (123456789 + i) & mask;
    m_z = (987654321 - i) & mask;
}

function random() {
    m_z = (36969 * (m_z & 65535) + (m_z >> 16)) & mask;
    m_w = (18000 * (m_w & 65535) + (m_w >> 16)) & mask;
    var result = ((m_z << 16) + (m_w & 65535)) >>> 0;
    result /= 4294967296;
    return result;
}

function shuffle(array) {
    let shuffle_int = random();
    array.sort(() => shuffle_int - 0.5);
};

var currnet_location;
var elements_selected = [];
var location_hist = [];
var word_list = word_list_js.split(" ");
const correct_sound = new Audio('correct.mp3');
var board = {
    "0": {"letter": "", "background": "white"},
    "1": {"letter": "", "background": "white"},
    "2": {"letter": "", "background": "white"},
    "3": {"letter": "", "background": "white"},
    "4": {"letter": "", "background": "white"},
    "5": {"letter": "", "background": "white"},
    "6": {"letter": "", "background": "white"},
    "7": {"letter": "", "background": "white"},
    "8": {"letter": "", "background": "white"},
    "9": {"letter": "", "background": "white"},
    "10": {"letter": "", "background": "white"},
    "11": {"letter": "", "background": "white"},
    "12": {"letter": "", "background": "white"},
    "13": {"letter": "", "background": "white"},
    "14": {"letter": "", "background": "white"},
    "15": {"letter": "", "background": "white"},
    "16": {"letter": "", "background": "white"},
    "17": {"letter": "", "background": "white"},
    "18": {"letter": "", "background": "white"},
    "19": {"letter": "", "background": "white"},
    "20": {"letter": "", "background": "white"},
    "21": {"letter": "", "background": "white"},
    "22": {"letter": "", "background": "white"},
    "23": {"letter": "", "background": "white"},
    "24": {"letter": "", "background": "white"},
};

function tile_click(element, i) {

    for (var cheati = 0; cheati < document.getElementsByTagName("td").length; cheati++) {
        if (document.getElementsByTagName("td")[cheati].innerText != board[cheati]['letter'] || document.getElementsByTagName("td")[cheati].style.backgroundColor != board[cheati]['background']) {
            document.getElementsByTagName("td")[cheati].innerText = board[cheati]['letter'];
            document.getElementsByTagName("td")[cheati].style.backgroundColor = board[cheati]['background'];

        };
    };   

    if (location_hist.length == 0 && element.style.backgroundColor != "rgb(48, 219, 100)") {
        currnet_location = get_location(i);
        element.style.backgroundColor = "rgb(49, 165, 247)";
        location_hist.push(currnet_location);
        elements_selected.push(element);
        current_word += element.innerText;
        console.log(currnet_location);
        console.log(current_word);
    } else {
        if (element.style.backgroundColor == "rgb(49, 165, 247)") {
            if (currnet_location['y'] == get_location(i)['y'] && currnet_location['x'] == get_location(i)['x']) {
                currnet_location = get_location(i);
                element.style.backgroundColor = "white";
                // remove the last item from location_hist
                console.log(currnet_location);
                location_hist.pop();
                elements_selected.pop();
                currnet_location = location_hist[location_hist.length - 1];
                // remove the last letter from current_word
                current_word = current_word.substring(0, current_word.length - 1);
                console.log(current_word);
            };
        } else if(element.style.backgroundColor != "rgb(48, 219, 100)") {
            if (Math.abs(currnet_location['y'] - get_location(i)['y']) < 2 && Math.abs(currnet_location['x'] - get_location(i)['x']) < 2) {
                currnet_location = get_location(i);
                location_hist.push(currnet_location);
                elements_selected.push(element);
                element.style.backgroundColor = "rgb(49, 165, 247)";
                current_word += element.innerText;
                console.log(currnet_location);
                console.log(current_word);
            };
        };
    };
    update_board();
};

var dice = ["AAAFRS","AAEEEE","AAFIRS","ADENNN","AEEEEM","AEEGMU","AEGMNN","AFIRSY","BJKQXZ","CCENST","CEIILT","CEILPT","CEIPST","DDHNOT","DHHLOR","DHLNOR","DHLNOR","EIIITT","EMOTTT","ENSSSU","FIPRSY","GORRVW","IPRRRY","NOOTUW","OOOTTU"];
var current_word = ""
var custom_code = false;
var url_args;
var random_seed;

var clickable = true;

document.getElementsByClassName("btn-check")[0].addEventListener("click", function() {
    if (clickable == true) {
        clickable = false; 

        for (var cheati = 0; cheati < document.getElementsByTagName("td").length; cheati++) {
            if (document.getElementsByTagName("td")[cheati].innerText != board[cheati]['letter'] || document.getElementsByTagName("td")[cheati].style.backgroundColor != board[cheati]['background']) {
                document.getElementsByTagName("td")[cheati].innerText = board[cheati]['letter'];
                document.getElementsByTagName("td")[cheati].style.backgroundColor = board[cheati]['background'];
    
            };
        };  

        if (word_list.includes(current_word.toLowerCase()) && current_word.length > 2) {
            console.log("Valid Word")
            for (var i = 0; i < elements_selected.length; i++) {
                elements_selected[i].style.backgroundColor = "#30db64";
            };
            correct_sound.play();
        } else {
            console.log("Invalid Word")
            for (var i = 0; i < elements_selected.length; i++) {
                elements_selected[i].style.backgroundColor = "#d14747";
            };
            setTimeout(function(){ 
                for (var i = 0; i < elements_selected.length; i++) {
                    elements_selected[i].style.backgroundColor = "white";
                };
            }, 200);
        };
        location_hist = [];
        current_word = "";
        setTimeout(function(){ elements_selected = []; clickable = true; update_board(); }, 200);
    };
});

document.getElementsByClassName("btn-reset")[0].addEventListener("click", function() {
    location_hist = [];
    current_word = "";
    elements_selected = [];
    clickable = true;
    dice = ["AAAFRS","AAEEEE","AAFIRS","ADENNN","AEEEEM","AEEGMU","AEGMNN","AFIRSY","BJKQXZ","CCENST","CEIILT","CEILPT","CEIPST","DDHNOT","DHHLOR","DHLNOR","DHLNOR","EIIITT","EMOTTT","ENSSSU","FIPRSY","GORRVW","IPRRRY","NOOTUW","OOOTTU"];
    if (getUrlVars()['board'] != undefined) {
        console.log("Custom Board");
        console.log(getUrlVars()['board']);
        url_args = getUrlVars()['board'];
        random_seed = url_args;
        seed(random_seed);
    } else {
        random_seed = Math.ceil(Math.random() * 10000000);
        seed(random_seed);
        console.log(random_seed);
    }
    shuffle(dice);
    for (var i = 0; i < document.getElementsByTagName("td").length; i++) {
        let random_int = Math.ceil(random() * 6);
        let random_letter = dice[i].substring(random_int - 1, random_int)
        document.getElementsByTagName("td")[i].innerText = random_letter;
        document.getElementsByTagName("td")[i].style.backgroundColor = "white";

        board[i]['letter'] = document.getElementsByTagName("td")[i].innerHTML;
        board[i]['background'] = document.getElementsByTagName("td")[i].style.backgroundColor;
    };
});

document.getElementsByClassName("btn-play")[0].addEventListener("click", function() {
    document.getElementsByClassName("introduction")[0].style.visibility = "hidden";
    document.getElementsByClassName("btn-play")[0].style.visibility = "hidden";
    document.getElementsByClassName("board")[0].style.visibility = "visible";
    document.getElementsByClassName("btn-reset")[0].style.visibility = "visible";
    document.getElementsByClassName("btn-copy")[0].style.visibility = "visible";

    if (getUrlVars()['board'] != undefined) {
        console.log("Custom Board");
        console.log(getUrlVars()['board']);
        url_args = getUrlVars()['board'];
        random_seed = url_args;
        seed(random_seed);
    } else {
        random_seed = Math.ceil(Math.random() * 10000000);
        seed(random_seed);
        console.log(random_seed);
    }
    shuffle(dice);
    for (var i = 0; i < document.getElementsByTagName("td").length; i++) {
        let random_int = Math.ceil(random() * 6);
        let random_letter = dice[i].substring(random_int - 1, random_int)
        document.getElementsByTagName("td")[i].innerText = random_letter;
        document.getElementsByTagName("td")[i].style.backgroundColor = "white";
        
        // check if element is clicked
        document.getElementsByTagName("td")[i].addEventListener("click", tile_click.bind(null, document.getElementsByTagName("td")[i], i), false);

        board[i]['letter'] = document.getElementsByTagName("td")[i].innerHTML;
        board[i]['background'] = document.getElementsByTagName("td")[i].style.backgroundColor;
    };
});


document.getElementsByClassName("btn-copy")[0].addEventListener("click", function() {
    console.log(window.location.origin + "?board=" + random_seed);
    navigator.clipboard.writeText(window.location.origin + "?board=" + random_seed);
});

console.log("Loaded " + word_list.length + " words");
console.log("Loaded index.js");
