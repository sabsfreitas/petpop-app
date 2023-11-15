$(document).ready(function() {
    $("#menu-sanduiche-1").on("click", function() {
        $(".sidebar").css("display", "flex");
    });

    $("#menu-sanduiche-2").on("click", function() {
        $(".sidebar").css("display", "none");
    });
});
