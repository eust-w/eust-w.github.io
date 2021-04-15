window.addEventListener('load', function() {
   document.getElementById("fullscreen").addEventListener("click", function OnFullScreen() {
      var c = document.getElementsByTagName("canvas")[0];
      (c.requestFullscreen || c.webkitRequestFullScreen || c.mozRequestFullScreen).call(c);
   }, false);
}, false);

document.addEventListener("fullscreenchange", ToggleFullScreen);
document.addEventListener("webkitfullscreenchange", ToggleFullScreen);

var _canvas = {};
function ToggleFullScreen(event) {
   var c = document.getElementsByTagName("canvas")[0];
   if (!(document.webkitIsFullScreen || document.mozFullScreen || document.msFullscreenElement)) {
      c.width = _canvas.width;
      c.height = _canvas.height;
      gl.viewport(0, 0, c.width, c.height);
   }
   else {
      _canvas.width = c.width;
      _canvas.height = c.height;
      c.width = window.screen.width;
      c.height = window.screen.height;
      gl.viewport(0, 0, c.width, c.height);
      (c.requestFullscreen || c.webkitRequestFullScreen || c.mozRequestFullScreen).call(c);
   }
}

var Preloader;
(function() {
   "use strict";

   Preloader = function()
   {
      this.images = [];
      return this;
   };
   
   Preloader.prototype =
   {
      images: null,
      callback: null,
      counter: 0,
      
      addImage: function addImage(img, url)
      {
         var me = this;
         img.url = url;
         img.onload = function()
         {
            me.counter++;
            if (me.counter === me.images.length)
            {
               me.callback.call(me);
            }
         };
         this.images.push(img);
      },
      
      onLoadCallback: function onLoadCallback(fn)
      {
         this.counter = 0;
         this.callback = fn;
         for (var i=0, j=this.images.length; i<j; i++)
         {
            this.images[i].src = this.images[i].url;
         }
      }
   };
})();
