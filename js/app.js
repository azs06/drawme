var color = $(".selected").css("background-color");
var $canvas = $("canvas");
var context = $canvas[0].getContext("2d");
var lastEvent;
var mouseDown = false;
var mode = 'pen';
$("#cimage").hide();
$(".controls").on("click","li",function(){
$(this).siblings().removeClass("selected");
$(this).addClass("selected");
color = $(this).css("background-color");
strokeColor();
});

$("#revealColorSelect").click(function(){
changeColor();
$("#colorSelect").toggle();
});

function changeColor(){
var r = $("#red").val()
var g = $("#green").val()
var b = $("#blue").val()
$("#newColor").css("background-color","rgb("+ r +","+ g +","+ b +")");
}

$("input[type=range]").change(changeColor);

$("#addNewColor").click(function(){
  var $newColor = $("<li></li>");
  $newColor.css("background-color",$("#newColor").css("background-color"));
  $(".controls ul").append($newColor);
  $newColor.click();
});
$('.toggle-eraser').click(function(){
mode = 'eraser';
$('#onecanvas').addClass('eraser');
});
$('.toggle-pen').click(function(){
mode = 'pen';
$('#onecanvas').removeClass('eraser');
});
$canvas.mousedown(function(e){
lastEvent=e;
mouseDown = true;
}).mousemove(function(e){
  if(mouseDown) {
       if(lastEvent.offsetX == undefined){ // this works for Firefox
        lastEventposX = lastEvent.pageX-$canvas.offset().left;
        lastEventposY = lastEvent.pageY-$canvas.offset().top;
      } else {
        lastEventposX = lastEvent.offsetX;
        lastEventposY = lastEvent.offsetY;
      }

      if(e.offsetX == undefined){ // this works for Firefox
        xpos = e.pageX-$canvas.offset().left;
        ypos = e.pageY-$canvas.offset().top;
      } else {
        xpos = e.offsetX;
        ypos = e.offsetY;
      }

    context.beginPath();
    context.moveTo(lastEventposX, lastEventposY);
    context.lineTo(xpos, ypos);
    if(mode == 'pen'){
       context.strokeStyle = color;
       context.globalCompositeOperation = "source-over";
    }
    else if(mode == 'eraser'){
      context.globalCompositeOperation = "destination-out";
      context.strokeStyle = "rgba(0,0,0,1)";
    }

    context.stroke();
    lastEvent = e;
  }
}).mouseup(function(){
mouseDown = false;
}).mouseleave(function(){
$canvas.mouseup();
});
$("#clear").click(function(){
mode = 'pen';
context.globalCompositeOperation = "source-over";
context.clearRect(0, 0, $canvas.width(), $canvas.height());
});
$('.reset').click(function(){
$('.colors').val('0');
$('#newColor').css('background-color', 'rgb(0,0,0)');
});
$('.closecolor').click(function(){
$('#colorSelect').toggle();
});

function strokeSize(){
  var stroke = $("#strokesize").val();
  context.lineWidth = stroke;
}
function strokeColor(){
  $(".strokebox").css({
    'background-color' : color
  });
}
$("#strokesize").change(function(){
strokeSize();
var strokecir = $("#strokesize").val();
$("#box").width(strokecir);
$("#box").height(strokecir);
});
strokeColor();
$('#saveimg').popover();
