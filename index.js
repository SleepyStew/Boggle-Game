// import a list of words from a file seperated by lines
function get_words() {
    var words = [];
    var file = new XMLHttpRequest();
    file.open("GET", "words.txt", false);
    file.onreadystatechange = function() {
        if (file.readyState === 4) {
            if (file.status === 200 || file.status == 0) {
                words = file.responseText.split("\n");
            };
        };
    };
    file.send(null);
    return words;
};

function get_location(int) {
    return({'x': int % 5 + 1, 'y': Math.floor(int / 5) + 1})
}

var currnet_location;
var elements_selected = [];
var location_hist = [];
const word_list = get_words();
var found_words = [];

function tile_click(element, i) {
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
};

var dice = ["AAAFRS","AAEEEE","AAFIRS","ADENNN","AEEEEM","AEEGMU","AEGMNN","AFIRSY","BJKQXZ","CCENST","CEIILT","CEILPT","CEIPST","DDHNOT","DHHLOR","DHLNOR","DHLNOR","EIIITT","EMOTTT","ENSSSU","FIPRSY","GORRVW","IPRRRY","NOOTUW","OOOTTU"];
var current_word = ""

for (var i = 0; i < document.getElementsByTagName("td").length; i++) {
    let random = Math.ceil(Math.random() * 6);
    let random_letter = dice[i].substring(random - 1, random)
    document.getElementsByTagName("td")[i].innerText = random_letter;
    
    // check if element is clicked
    document.getElementsByTagName("td")[i].addEventListener("click", tile_click.bind(null, document.getElementsByTagName("td")[i], i), false);
};

var clickable = true;

document.getElementsByClassName("btn-check")[0].addEventListener("click", function() {
    if (clickable == true) {
        clickable = false;
        if (word_list.includes(current_word.toLowerCase() + "\r") && !found_words.includes(current_word.toLowerCase()) && current_word.length > 2) {
            console.log("Valid Word")
            found_words.push(current_word.toLowerCase());
            for (var i = 0; i < elements_selected.length; i++) {
                elements_selected[i].style.backgroundColor = "#30db64";
            };
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
        setTimeout(function(){ elements_selected = []; clickable = true; }, 200);
    };
});

document.getElementsByClassName("btn-reset")[0].addEventListener("click", function() {
    location.reload();
});

console.log(word_list);
console.log("Loaded index.js");