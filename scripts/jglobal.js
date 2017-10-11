$().ready(function(){
    //highlight page
    $links = $("nav a");
    console.log($links.length);
    var location = (window.location.href);
    console.log(location);
    for(i = 0; i < $links.length; i++){
        $href = $($links[i]).attr("href");
        console.log($href);
        if(location.indexOf($href) != -1){
            $($links[i]).addClass("here");
            $("body").attr("id", $($links[i]).text());
        }
    }
});

//prepareGallery
$().ready(function(){
    $links = $("#imagegallery ~ a");
    for(i = 0; i < $links.length; i++){
        $($links[i]).click(function(){
            return showPic(this);
        });
    }
});

//preparePlaceholder
$().ready(function(){
    $img = $("<img id='placeholder' src='images/placeholder.gif' alt='My image Gallery'/>");
    $p = $("<p id='description'>Choose an image</p>");
    $("#imagegallery").after($p).after($img);
});

//whichPic
function showPic($whichPic) {
    $href = $whichPic.attr("href");
    $("#placeholder").attr("src", $href);
    $("#description").text($whichPic.attr("title"));
    return false;
}

//prepareSlideshow
$().ready(function() {
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
});

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

//prepareInternalNav
$().ready(function() {
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
});

//stripeTables
$().ready(function(){
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
});

//highlight rows
$().ready(function(){
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

