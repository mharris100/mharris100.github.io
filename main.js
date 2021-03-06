setTimeout(function(){document.getElementById("title").src = "images/title.png"}, 4000)

var planet_count = 1;
var highscore = 1;
var last_score = "None"

$("#scorebox").html("&nbspEarths Eaten: " + planet_count + "&nbsp&nbsp&nbsp&nbsp&nbsp Highscore:  " + highscore + "&nbsp&nbsp&nbsp&nbsp&nbsp Last score: "+last_score)


document.body.style.cursor = 'none';


var directions = [ [4, 1], [3,2], [3, 3], [2, 3],[ 1, 4],
                     [-4, 1], [-3,2], [-3, 3], [-2, 3],[-1, 4],
                     [-4, -1], [-3,-2], [-3, -3], [-2, -3],[-1, -4],
                     [4, -1], [3,-2], [3,- 3], [2, -3],[1,- 4]];

////////Function that creates a new enemy planet
function newplanet(){

    var newplanet = document.createElement("img");
    newplanet.className = "planet";

    //////Randomly select a planet type
    var r = Math.random()*100;
    if (r < 10){
        newplanet.style.height = "100px"
        newplanet.style.width = "100px"
        newplanet.sun = true
        newplanet.src = "images/sun.png"}
    else if (r < 15){
        newplanet.style.height = "50px"
        newplanet.style.width = "50px"
        newplanet.src = "images/death_star.png"
    }
    else if (r < 25){
        newplanet.style.height = "20px"
        newplanet.style.width = "20px"
        newplanet.src = "images/pluto.png"
    }
    else if (r < 35){
        newplanet.style.height = "65px"
        newplanet.style.width = "65px"
        newplanet.jupiter = true
        newplanet.src = "images/jupiter.png"
    }
    else if (r < 50){
        newplanet.src = "images/neptune.png"
    }
    else if (r < 70){
        newplanet.src = "images/venis.png"
    }
    else if (r < 90){
        newplanet.src = "images/mars.png"
    }
    else if (r < 95){
        newplanet.src = "images/mercury.png"
    }
    else if (r <100){
        newplanet.style.height = "25px"
        newplanet.style.width = "25px"
        newplanet.src = "images/moon.png"
    }


    var frame = document.getElementById("frame");
    height = frame.clientHeight;
    width = frame.clientWidth;

    random_y = Math.random() * (height-150) ;
    random_x = (((Math.random() * (width-150)))*2)/5;


    /////put it on opposite side of cursor/////
    if (  parseInt($("#cursor").css("left")) < 500  ){
        newplanet.style.top = random_y + "px";
        newplanet.style.left = 550 + random_x + "px";
    }
    else {
        newplanet.style.top = 50 + random_y + "px";
        newplanet.style.left = 50 + random_x + "px";
    }

    frame.appendChild(newplanet);
    newplanet.direction = directions[Math.floor(Math.random() * 20)].slice(0);
};


/////Function that starts the first earth//////
function startearth(){
    var new_earth = document.createElement("img");
    new_earth.id = "earth";
    new_earth.src ="images/earth.png"
    var frame = document.getElementById("frame");

    height = frame.clientHeight;
    width = frame.clientWidth;

    random_y = (Math.random() * (height-150));
    random_x = (Math.random() * (width-150));
    new_earth.style.top = 50 + random_y + "px";
    new_earth.style.left = 50 + random_x + "px";
    frame.appendChild(new_earth);
}
function newearth(){
    height = frame.clientHeight;
    width = frame.clientWidth;

    random_y = (Math.random() * (height-150));
    random_x = (Math.random() * (width-150));
    $("#earth").css("top",  50 + random_y );
    $("#earth").css("left",  50 + random_x );
};


newplanet()
startearth()
newearth()

document.addEventListener("mousemove",
    function(event) {
        var cursor_x = event.clientX;
        var cursor_y = event.clientY;

        var cursor = $("#cursor")
        var cursor_height = parseInt(cursor.css("height"));

        var frame_width = parseInt($("#frame").css("width"));
        var frame_height = parseInt($("#frame").css("height"));
        var frame_left = parseInt($("#frame").css("left"));
        var frame_top = parseInt($("#frame").css("top"));

        /////////only allow cursor in the frame///////
        if (cursor_x > frame_left + 10 & cursor_x < frame_left + frame_width  ){
        cursor.css("left",cursor_x - (cursor_height/2) )
        }

        if (cursor_y > frame_top  + 10 & cursor_y < frame_top + frame_height  ){
        cursor.css("top", cursor_y - (cursor_height/2) )
        }

        earth_touch()
    }
);

function distance_formula(planet_x, planet_y, cursor_x , cursor_y){
    return Math.sqrt(  Math.pow(planet_x - cursor_x, 2)  +   Math.pow(planet_y - cursor_y, 2)   );
    }

function planetmove(){
    var planets = $(".planet")
    var frame_height = parseInt($("#frame").css("height"));
    var frame_width = parseInt($("#frame").css("width"));


    ////////Handel movement and direction of enemy planets////////////////
    planets.each(function(){
        var planet_width = parseInt($(this).css("width"));
        var planet_top = parseInt($(this).css("top"));
        var planet_left = parseInt($(this).css("left"));

        ///////Check if enemy planets touch side. If so change it's direction//////////
        if (planet_top > frame_height - planet_width){
            this.direction[1] = this.direction[1] * (-1)}
        if (planet_top <= 0){
            this.direction[1] = this.direction[1] * (-1)}
        if ( planet_left > frame_width - planet_width){
            this.direction[0] = this.direction[0] * (-1)}
        if (planet_left <= 0){
            this.direction[0] = this.direction[0] * (-1)}

        ///////////Move the enemy planets/////////////////
        this.style.left = planet_left + this.direction[0] ;
        this.style.top=  planet_top + this.direction[1] ;




        ///////////Check if cursor touched an enemy planet///////////
        var cursor = document.getElementById("cursor");
        var cursor_radius =  16;

        var cursor_x = parseInt(cursor.style.left) + cursor_radius -125;
        var cursor_y = parseInt(cursor.style.top) + cursor_radius - 60;

        var planet_radius = (parseInt($(this).css("width"))/2);

        //////adjust the imperfect hitboxes
        if(this.sun){

            var planet_x = planet_left + 2 *planet_radius -45;
            var planet_y = planet_top + 2 *planet_radius-45;
        }
        else if(this.jupiter){
            var planet_x = planet_left + 2 *planet_radius -30;
            var planet_y = planet_top + 2 *planet_radius-30;
        }
        else{
            var planet_x = planet_left + 2 *planet_radius -15;
            var planet_y = planet_top + 2 *planet_radius-15;
        }

        if ((distance_formula( planet_x, planet_y, cursor_x, cursor_y ) - (planet_radius + cursor_radius)) < 0){

            $('#frame').html('');
            last_score = planet_count;
            if (planet_count>highscore){
                highscore = planet_count
            }
            planet_count = 1;

            document.getElementById("scorebox").innerHTML = "&nbspEarths Eaten: " + planet_count + "&nbsp&nbsp&nbsp&nbsp&nbsp Highscore:  " + highscore + "&nbsp&nbsp&nbsp&nbsp&nbsp Last score: " + last_score
            startearth()
            newplanet()
        }
    })

};

////////function that check if you touched the earth////////
function earth_touch(){
    var cursor = $("#cursor")
    var cursor_radius =  (parseInt(cursor.css("width"))/2)

    var cursor_x = parseInt(cursor.css("left")) + cursor_radius - parseInt($("#frame").css("left"));
    var cursor_y = parseInt(cursor.css("top")) + cursor_radius - parseInt($("#frame").css("top"));

    var earth_radius = (parseInt($("#earth").css("width"))/2);
    var earth_left = parseInt($("#earth").css("left"))
    var earth_top = (parseInt($("#earth").css("top")))

    var earth_x = earth_left + 2 * earth_radius -15;
    var earth_y = earth_top + 2*earth_radius -15;

    if ((distance_formula( earth_x, earth_y, cursor_x, cursor_y ) - (earth_radius + cursor_radius)) < 0){
        newearth()
        planet_count += 1
        $("#scorebox").html("&nbspEarths Eaten: " + planet_count + "&nbsp&nbsp&nbsp&nbsp&nbsp Highscore:  " + highscore + "&nbsp&nbsp&nbsp&nbsp&nbsp Last score: " + last_score)
        newplanet()
    }
}

setInterval(planetmove , 30)
