var renderer;
var splines = [];
function doFlux() {
	var WebGLCanvas = document.getElementById("perlin_noise");
	var viewPortWidth = window.innerWidth;
	var viewPortHeight = window.innerHeight;
	var	canvasWrapWidth = WebGLCanvas.clientWidth;
	var canvasWidth = canvasWrapWidth;
	var canvasHeight = Math.min(viewPortHeight-40, canvasWrapWidth) *.65;	
console.log(canvasWrapWidth, canvasWidth, canvasHeight)	
	//WebGLCanvas.style.width = canvasWidth+"px";
	//WebGLCanvas.style.height = canvasHeight+"px";	
	WebGLCanvas.innerHTML = "";
console.log(renderer)
	if(!renderer) {
console.log("hyar")		
		var renderer = new THREE.WebGLRenderer({ antialias: true, alpha:true });
		renderer.setClearColor( 0x000000, 0 );
		renderer.setSize(canvasWidth, canvasHeight);
		renderer.shadowMap.type = THREE.PCFSoftShadowMap;
		WebGLCanvas.appendChild( renderer.domElement );
	}
	renderer.setPixelRatio( window.devicePixelRatio > 1 ? 2 : 1 );
	var scene = new THREE.Scene();
	var camera = new THREE.PerspectiveCamera(
	  45,
	  canvasWidth / canvasHeight,
	  1,
	  1000
	);
	camera.position.z = 60;
	var length = 30;
	var mouseJump = {
	  x: 0,
	  y: 0
	};
	var offset = 0;
	function Spline() {
        this.geometry = new THREE.BufferGeometry();
        this.color = Math.floor(Math.random() * 80 + 180);
        var vertices = [];
        var colors = [];
        for (var j = 0; j < 180; j++) {
          var x = j / 180 * length * 2 - length;
          var y = 0;
          var z = 0;
          vertices.push(x, y, z);
      
          var color = new THREE.Color("hsl(" + (j * 0.6 + this.color) + ",70%,70%)");
          colors.push(color.r, color.g, color.b);
        }
        this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
        this.geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      
        this.material = new THREE.LineBasicMaterial({
          vertexColors: THREE.VertexColors
        });
        this.mesh = new THREE.Line(this.geometry, this.material);
        this.speed = (Math.random() + 0.1) * 0.0002;
        scene.add(this.mesh);
      }      
	var isMouseDown = false;
	var prevA = 0;
    function render(a) {
        requestAnimationFrame(render);
        for (var i = 0; i < splines.length; i++) {
            var positions = splines[i].geometry.attributes.position.array;
            var colors = splines[i].geometry.attributes.color.array;
            for (var j = 0; j < positions.length; j += 3) {
            var vector = new THREE.Vector3(positions[j], positions[j + 1], positions[j + 2]);
            vector.y = noise.simplex2(j * 0.05 + i - offset, a * splines[i].speed) * 8;
            vector.z = noise.simplex2(positions[j] * 0.05 + i, a * splines[i].speed) * 8;
            vector.y *= 1 - Math.abs(positions[j] / length);
            vector.z *= 1 - Math.abs(positions[j] / length);
            positions[j + 1] = vector.y;
            positions[j + 2] = vector.z;
        
            var color = new THREE.Color("hsl(" + (j * 0.6 + splines[i].color) + ",70%,70%)");
            colors[j] = color.r;
            colors[j + 1] = color.g;
            colors[j + 2] = color.b;
            }
            splines[i].geometry.attributes.position.needsUpdate = true;
            splines[i].geometry.attributes.color.needsUpdate = true;
        }
        
        scene.rotation.x = a * 0.0003;
        if (isMouseDown) {
            mouseJump.x += 0.001;
            if (a - prevA > 100) {
            updateColor();
            prevA = a;
            }
        } else {
            mouseJump.x -= 0.001;
        }
        mouseJump.x = Math.max(0, Math.min(0.07, mouseJump.x));
        offset += mouseJump.x;
        renderer.render(scene, camera);
        }
        
	var splines = [];
	for (var i = 0; i < 12; i++) splines.push(new Spline());
	function onResize() {
	  camera.updateProjectionMatrix();
	}
    function updateColor() {
        for (var i = 0; i < splines.length; i++) {
          var hue = (splines[i].color - offset * 10) % 360;
          hue = hue < 0 ? hue + 360 : hue; // Ensure hue is within the range [0, 360]
          var geometry = splines[i].mesh.geometry; // Access the geometry property of the mesh
          for (var j = 0; j < geometry.attributes.position.array.length; j += 3) {
            var newColor = new THREE.Color("hsl(" + (j * 0.6 + hue) + ",70%,70%)");
            geometry.attributes.color.array[j] = newColor.r;
            geometry.attributes.color.array[j + 1] = newColor.g;
            geometry.attributes.color.array[j + 2] = newColor.b;
          }
          geometry.attributes.color.needsUpdate = true;
        }
      }
           
	function onMouseDown(event) {
        var rect = WebGLCanvas.getBoundingClientRect();
        var mouseX = event.clientX - rect.left;
        var mouseY = event.clientY - rect.top;
    
        if (mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY <= canvasHeight) {
          isMouseDown = true;
          event.preventDefault(); // Prevent text selection on drag
        }
      }
	function onMouseUp(event) {
	  // Check if the mouse up occurred within the animation box
      var rect = WebGLCanvas.getBoundingClientRect();
      var mouseX = event.clientX - rect.left;
      var mouseY = event.clientY - rect.top;
    
      if (mouseX >= 0 && mouseX <= canvasWidth && mouseY >= 0 && mouseY <= canvasHeight) {
        isMouseDown = false;
        event.preventDefault(); // Prevent text selection on drag
      }
    }

	window.addEventListener( "resize", onResize);
	window.addEventListener( "keydown", onMouseDown);
	document.body.addEventListener( "mousedown", onMouseDown);
	document.body.addEventListener( "mouseup", onMouseUp);
	document.body.addEventListener( "touchstart", onMouseDown);
	document.body.addEventListener( "touchend", onMouseUp);
	requestAnimationFrame(render);
    window.addEventListener("resize", function() {
        console.log("ress");
        if (Math.abs(canvasWrapWidth - WebGLCanvas.clientWidth) > 20 || Math.abs(viewPortHeight - window.innerHeight) > 20) {
            doFlux();
        }
    });
        
}

doFlux();