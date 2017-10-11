$().ready(function(){
    //highlight page
    $links = $("nav a");
    var location = (window.location.href);
    for(i = 0; i < $links.length; i++){
        $href = $($links[i]).attr("href");
        if(location.indexOf($href) != -1){
            $($links[i]).addClass("here");
            $("body").attr("id", $($links[i]).text());
        }
    }

    //prepareSlideshow
    $slideshow = $("<div id='slideshow'></div>");
    $frame = $("<img id='frame' src='images/frame.gif'/>");
    $slideshow.append($frame);
    $pre = $("<img id='preview' alt='Preview images' src='images/slideshow.gif'/>");
    $slideshow.append($pre);
    $("#intro").after($slideshow);

    $links = $("a");
    for(i = 0; i < $links.length; i++){
        $links[i].onmouseover = function(){
            $destination = $(this).attr("href");
            if($destination.indexOf("index.html") != -1){
                moveElement("preview", 0, 0, 5);
            }
            if($destination.indexOf("about.html") != -1){
                moveElement("preview", -150, 0, 5);
            }
            if($destination.indexOf("photos.html") != -1){
                moveElement("preview", -300, 0, 5);
            }
            if($destination.indexOf("live.html") != -1){
                moveElement("preview", -450, 0, 5);
            }
            if($destination.indexOf("contact.html") != -1){
                moveElement("preview", -600, 0, 5);
            }
        };
    }

    /**********about page *********/
    //prepareInternalNav
    $links = $("article nav a");
    for(i = 0; i < $links.length; i++){
        $linkHref = $($links[i]).attr("href");
        $sectionId = $linkHref.split("#")[1];
        $($linkHref).css("display", "none");
        $links[i].destination = $sectionId;
        $($links[i]).click(function(){
            showSection(this.destination);
            return false;
        });
    }

    /*******photos.html *****/
    //preparePlaceholder
    $img = $("<img id='placeholder' src='images/placeholder.gif' alt='My image Gallery'/>");
    $p = $("<p id='description'>Choose an image</p>");
    $("#imagegallery").after($p).after($img);
    //prepareGallery
    $links = $("#imagegallery a");
    for(i = 0; i < $links.length; i++){
        $($links[i]).click(function(){
            return showPic($(this));
        });
    }

    /*******live.html *****/
    //stripeTables
    $tables = $("table");
    for(i = 0; i < $tables.length; i++){
        $rows = $("table tr");
        var odd = false;
        for(j = 0; j < $rows.length; j++){
            if(odd) {
                $($rows[j]).addClass("odd");
                odd = false;
            } else {
                odd = true;
            }
        }
    }
    //highlight rows
    $rows = $("tr");
    for(i = 0; i < $rows.length; i++) {
        $rows[i].oldClassName = $rows[i].className;
        $($rows[i]).hover(function(){
            $(this).addClass("highlight");
        }
            ,function(){
                this.className = this.oldClassName;
            });
    }
});

//For this function I need to do some research
function moveElement(elementID, final_x, final_y, interval) {
    var elem = document.getElementById(elementID);
    if(!elem){
        return false;
    }
    if(elem.movement) {
        clearTimeout(elem.movement);
    }
    if(!elem.style.left){
        elem.style.left = "0px";
    }
    if(!elem.style.top){
        elem.style.top = "0px";
    }
    var xpos = parseInt(elem.style.left);
    var ypos = parseInt(elem.style.top);
    if(xpos == final_x && ypos == final_y){
        return true;
    }
    if(xpos < final_x){
        var dist = Math.ceil((final_x - xpos)/10);
        xpos += dist;
    }
    if(xpos > final_x){
        var dist = Math.ceil((xpos - final_x)/10);
        xpos -= dist;
    }
    if(ypos < final_y){
        var dist = Math.ceil((final_y - ypos)/10);
        ypos += dist;
    }
    if(ypos > final_y){
        var dist = Math.ceil((ypos - final_y)/10);
        ypos -= dist;
    }
    elem.style.left = xpos + "px";
    elem.style.top = ypos + "px";
    var repeat = "moveElement('" + elementID + "'," + final_x + "," + final_y
                + "," + interval + ")";
    elem.movement = setTimeout(repeat, interval);
}

//showSection
function showSection($id) {
    $sections = $("section");
    for( i = 0; i < $sections.length; i++) {
        if($($sections[i]).attr("id") != $id) {
            $($sections[i]).css("display", "none");
        } else {
            $($sections[i]).css("display", "block");
        }
    }
}

//whichPic
function showPic($whichPic) {
    $href = $whichPic.attr("href");
    $("#placeholder").attr("src", $href);
    $("#description").text($whichPic.attr("title"));
    return false;
}