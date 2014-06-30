(function(){
  var layers    = [],
  docWidth  = window.innerWidth,
  docHeight = window.innerHeight;

  window.onresize = function() {
    docWidth  = window.innerWidth;
    docHeight = window.innerHeight;
  };

  // Public Methods

  // Add an object to the list of things to parallax
  plaxify = function (element, params){
    var layer    = {"xRange":0,"yRange":0,"invert":false},
    position = element.getBoundingClientRect();

    for(var param in params){
      if(layer[param]===0){
        layer[param] = params[param];
      }
    }
    layer.obj    = element;
    layer.startX = position.left;
    layer.startY = position.top;

    if(layer.invert === false){
      layer.startX -= Math.floor(layer.xRange/2);
      layer.startY -= Math.floor(layer.yRange/2);
    } else {
      layer.startX += Math.floor(layer.xRange/2);
      layer.startY += Math.floor(layer.yRange/2);
    }
    layers.push(layer);
  };

  plax = {
    listLayers: function(){
      console.log(layers);
    },
    enable: function(){
      document.onmousemove = function(e){
        var x      = e.pageX,
        y      = e.pageY,
        hRatio = Math.round((x/docWidth)*100)/100,
        vRatio = Math.round((y/docHeight)*100)/100;
        layers.map(function(layer,index) {
          if(layer.invert !== true){
            layer.obj.style.left = layer.startX + (layer.xRange*hRatio) + "px";
            layer.obj.style.top = layer.startY + (layer.yRange*vRatio) + "px";
          } else {
            layer.obj.style.left = layer.startX - (layer.xRange*hRatio) + "px";
            layer.obj.style.top = layer.startY - (layer.yRange*vRatio) + "px";
          }
        });
      };
    },
    disable: function(){
      clearTimeout(timer);
    }
  };

})();

