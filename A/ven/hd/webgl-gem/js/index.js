"use strict";
      (function() {
        var controls,
            scene,
            camera,
            renderer,
            directionalLight1,
            directionalLight2,
            stats,
            ambient;
            // urls,
            // cubemap,
            // shader,
            // shaderMaterial,
            // skybox;

        var triangles = [],
            AMBIENT_COLOR = 0x536DFE,
            DIRECTIONAL_COLOR_1 = 0x607D8B,
            DIRECTIONAL_COLOR_2 = 0xFFA000,
            FOG_COLOR = 0x333333,
            TRIANGLE_COUNT = 100,//500,
            TRIANGLE_INDEX = 0;

        function render() {
          requestAnimationFrame( render );
          animate();

          stats.update();
          renderer.render( scene, camera );
        }

        function animate() {
          var minVelocity = 1600,//200,
              maxVelocity = 15; //15

          controls.update();

          TRIANGLE_INDEX = 0;

          for (; TRIANGLE_INDEX < TRIANGLE_COUNT; TRIANGLE_INDEX++) {
            if (triangles[TRIANGLE_INDEX].isReverse) {
              triangles[TRIANGLE_INDEX].rotation.y += Math.random() * 0.1;
              triangles[TRIANGLE_INDEX].rotation.x += Math.random() * 0.1;
            } else {
              triangles[TRIANGLE_INDEX].rotation.y -= Math.random() * 0.1;
              triangles[TRIANGLE_INDEX].rotation.x -= Math.random() * 0.1;
            }

            if (triangles[TRIANGLE_INDEX].position.y < -500) {
              triangles[TRIANGLE_INDEX].position.x = ( Math.random() - 0.5 ) * 1000;
              triangles[TRIANGLE_INDEX].position.y = ( Math.random() - 0.5 ) * 1000;
              triangles[TRIANGLE_INDEX].position.y = 500;
              triangles[TRIANGLE_INDEX.velocity] = Math.random() * ( maxVelocity - minVelocity + 1 ) + minVelocity;
            } else {
              triangles[TRIANGLE_INDEX].position.y -= triangles[TRIANGLE_INDEX].velocity;
            }

            // triangles[TRIANGLE_INDEX].updateMatrix();
          }
        }

        function onWindowResize() {
          camera.aspect = window.innerWidth / window.innerHeight;
          camera.updateProjectionMatrix();

          renderer.setSize( window.innerWidth, window.innerHeight );
        }

        function newTriangle(triangles, scene) {
          var radiusTop = 0,
              maxRadius = 5,
              minRadius = 20,
              radiusBottom = ( Math.random() * ( maxRadius - minRadius + 1 ) + minRadius ),
              height = 20,
              maxSides = 5,
              minSides = 3,
              sidesBottom = Math.floor( Math.random() * ( maxSides - minSides + 1 ) + minSides ),
              sidesTop = 1,
              geometry,
              material,
              mesh,
              isReverse = Math.random() >= 0.5,
              minVelocity = 2,
              maxVelocity = 15,
              velocity = Math.random() * ( maxVelocity - minVelocity + 1 ) + minVelocity;

          geometry = new THREE.CylinderGeometry( radiusTop, radiusBottom, height, sidesBottom, sidesTop );
          material =  new THREE.MeshLambertMaterial( { color: 0x333333, shading: THREE.FlatShading } );

          mesh = new THREE.Mesh( geometry, material );

          mesh.position.x = ( Math.random() - 0.5 ) * 1000;
          mesh.position.y = ( Math.random() - 0.5 ) * 1000;
          mesh.position.z = ( Math.random() - 0.5 ) * 1000;

          mesh.isReverse = isReverse;
          mesh.velocity = velocity;

          if (isReverse) {
            mesh.rotation.y += Math.random() * 0.1;
            mesh.rotation.x += Math.random() * 0.1;
          } else {
            mesh.rotation.y -= Math.random() * 0.1;
            mesh.rotation.x -= Math.random() * 0.1;
          }

          mesh.updateMatrix();
          // mesh.matrixAutoUpdate = false;

          scene.add( mesh );
          triangles.push( mesh );
        }

        window.addEventListener( 'resize', onWindowResize, false );

        THREE.ImageUtils.crossOrigin = '';
        THREE.TextureLoader.crossOrigin = '';

        scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2( FOG_COLOR, 0.002 );

        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
        camera.position.set( 0, -500, 0 );
        camera.lookAt( new THREE.Vector3(0, 500, 0) );

        controls = new THREE.OrbitControls(camera);
        controls.damping = 100000.2; //0.2;

        for (; TRIANGLE_INDEX < TRIANGLE_COUNT; TRIANGLE_INDEX++) {
          newTriangle(triangles, scene);
        }

        renderer = new THREE.WebGLRenderer( { antialias: false } );
        renderer.setClearColor( scene.fog.color );
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );
        document.body.appendChild( renderer.domElement );

        ambient = new THREE.AmbientLight( AMBIENT_COLOR );
        scene.add(ambient);

        directionalLight1 = new THREE.DirectionalLight( DIRECTIONAL_COLOR_1 );
        directionalLight1.position.set( 1, 1, 1 );

        scene.add( directionalLight1 );

        directionalLight2 = new THREE.DirectionalLight( DIRECTIONAL_COLOR_2 );
        directionalLight2.position.set( -1, -1, -1 );

        scene.add( directionalLight2 );

        stats = new Stats();
        stats.domElement.style.position = 'absolute';
        stats.domElement.style.top = '0px';
        stats.domElement.style.right = '0px';
        stats.domElement.style.zIndex = 100;
        document.body.appendChild( stats.domElement );

        render();
      })();