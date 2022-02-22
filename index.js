const int_to_x_and_y_map = {
    0: {"x": 1, "y": 1},
    1: {"x": 2, "y": 1},
    2: {"x": 3, "y": 1},
    3: {"x": 4, "y": 1},
    4: {"x": 5, "y": 1},
    5: {"x": 1, "y": 2},
    6: {"x": 2, "y": 2},
    7: {"x": 3, "y": 2},
    8: {"x": 4, "y": 2},
    9: {"x": 5, "y": 2},
    10: {"x": 1, "y": 3},
    11: {"x": 2, "y": 3},
    12: {"x": 3, "y": 3},
    13: {"x": 4, "y": 3},
    14: {"x": 5, "y": 3},
    15: {"x": 1, "y": 4},
    16: {"x": 2, "y": 4},
    17: {"x": 3, "y": 4},
    18: {"x": 4, "y": 4},
    19: {"x": 5, "y": 4},
    20: {"x": 1, "y": 5},
    21: {"x": 2, "y": 5},
    22: {"x": 3, "y": 5},
    23: {"x": 4, "y": 5},
    24: {"x": 5, "y": 5}
}

var currnet_location;

var location_hist = [];

function tile_click(element, i) {
    if (location_hist.length == 0) {
        currnet_location = int_to_x_and_y_map[i];
        if (element.style.backgroundColor == "rgb(49, 165, 247)") {
            element.style.backgroundColor = "white";
            location_hist.pop();
        } else {
            element.style.backgroundColor = "rgb(49, 165, 247)";
            location_hist.push(currnet_location);
            current_word += element.innerText;
            console.log(currnet_location);
            console.log(current_word);
        };
        current_word += element.innerText;
    } else {
        if (element.style.backgroundColor == "rgb(49, 165, 247)") {
            if (currnet_location['y'] == int_to_x_and_y_map[i]['y'] && currnet_location['x'] == int_to_x_and_y_map[i]['x']) {
                currnet_location = int_to_x_and_y_map[i];
                element.style.backgroundColor = "white";
                // remove the last item from location_hist
                console.log(currnet_location);
                location_hist.pop();
                currnet_location = location_hist[location_hist.length - 1];
                // remove the last letter from current_word
                current_word = current_word.substring(0, current_word.length - 1);
                console.log(current_word);
            };
        } else {
            if (Math.abs(currnet_location['y'] - int_to_x_and_y_map[i]['y']) < 2 && Math.abs(currnet_location['x'] - int_to_x_and_y_map[i]['x']) < 2) {
                currnet_location = int_to_x_and_y_map[i];
                location_hist.push(currnet_location);
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


document.getElementsByClassName("btn-check")[0].addEventListener("click", function() {
    console.log("Button Clicked")
    for (var i = 0; i < document.getElementsByTagName("td").length; i++) {
        document.getElementsByTagName("td")[i].style.backgroundColor = "white";
        current_word = "";
        // clear location_hist
        location_hist = [];
        
    };
});

console.log("Loaded index.js");
