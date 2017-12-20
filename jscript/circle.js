window.onload = function () {
  var canvas = document.getElementById('canvas');
  var clear = document.getElementById('clear');
  var draw = canvas.getContext('2d');
  var obj = {x1:0,y1:0,r:0,cc:0};
  var shapes = [];

  clear.addEventListener("click",clearCanvas);
  canvas.addEventListener("mousedown",checkCanvas);
  canvas.addEventListener("dblclick",deleteShape);


  //On mouse down check if shape is detected and move it or else draw another shape
  function checkCanvas(event) {
    console.log("MouseDown");
    var sIndex = -1;
    var sDrag = false;
    var a = mx = event.clientX-canvas.offsetLeft;
    var b = my = event.clientY- canvas.offsetTop;
    if(shapes.length>0){
      for (var i = 0; i < shapes.length; i++) {
        var flag = calculateRadius(i,mx,my);
        if (flag === true) {
          sIndex = i;
          sDrag = true;
        }
      }
    }
    if(sDrag == true) {
      canvas.onmousemove = function (event) {
        event.preventDefault();
        var cx = event.clientX - canvas.offsetLeft - a;
        var cy = event.clientY - canvas.offsetTop - b;
        moveCircle(cx,cy,shapes,sIndex,obj);
        a = event.clientX-canvas.offsetLeft;
        b = event.clientY-canvas.offsetTop;
      }
      canvas.onmouseup = function () {
        canvas.onmousemove = null;
        sDrag = false;
      }
    } else{
      var color = randomColorCode();
        canvas.onmousemove = function (event){
          event.preventDefault();
          var cx = event.clientX - canvas.offsetLeft;
          var cy = event.clientY - canvas.offsetTop;
          draw.clearRect(0,0,canvas.width,canvas.height);
          reDraw();
          drawCircle(mx,my,cx,cy,color);
        }
      canvas.onmouseup = function (event) {
        canvas.onmousemove = null;
          if (event.clientX - canvas.offsetLeft != mx && event.clientY - canvas.offsetTop != my) {
            shapes.push(obj);
            console.log(shapes);
        }
      }
    }
  }


    function calculateRadius(i,mx,my) {
      var s = shapes[i];
      var pDistance = Math.round(Math.sqrt(Math.pow((s.x1-mx),2) + Math.pow((s.y1-my),2)));
      console.log(pDistance);
      console.log(s.r);
      if (s.r >= pDistance) {
        return true;
      }else {
        return false;
  }
};


  function drawCircle(mx,my,cx,cy,color) {
    var r = (Math.round(Math.sqrt(Math.pow((cx-mx),2) + Math.pow((cy-my),2))))/2;
    obj = {x1:cx,y1:cy,r,cc:color};
    draw.fillStyle = color;
    draw.beginPath();
    draw.arc(obj.x1,obj.y1,r,0,2 * Math.PI);
    draw.fill();
  };


  function moveCircle(x,y,s,cv,o) {
    s[cv].x1 += x;
    s[cv].y1 += y;
    draw.clearRect(0,0,canvas.width,canvas.height);
    reDraw();
  }

  function randomColorCode() {
    var x = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';
    return x;
  };

  function deleteShape(event) {
    var mx = event.clientX - canvas.offsetLeft;
    var my = event.clientY - canvas.offsetTop;
    var f = false;
    var index = null;
    if(shapes.length>0){
    for (var i = 0; i < shapes.length; i++) {
      var f = calculateRadius(i,mx,my);
      if (f){
        index = i;
        }
      }
      shapes.splice(index,1);
      reDraw();
    };
  };

  function reDraw() {
    draw.clearRect(0,0,canvas.width,canvas.height);
    if(shapes.length>0){
      for (var i = 0; i < shapes.length; i++) {
        var obj = shapes[i];
        draw.fillStyle = obj.cc;
        draw.beginPath();
        draw.arc(obj.x1,obj.y1,obj.r,0,2 * Math.PI);
        draw.fill();
      }
    }
  };


  function clearCanvas() {
    draw.clearRect(0,0,canvas.width,canvas.height);
    shapes = [];
  };
};
