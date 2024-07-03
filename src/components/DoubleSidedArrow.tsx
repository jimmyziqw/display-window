// function customArrow( fx, fy, fz, ix, iy, iz, thickness, color)
// {
// 	var material = new THREE.MeshLambertMaterial( {color: color} );
	
// 	var length = Math.sqrt( (ix-fx)**2 + (iy-fy)**2 + (iz-fz)**2 );
	
// 	var body = new THREE.Mesh( ARROW_BODY, material );
// 		body.scale.set( thickness, thickness, length-10*thickness );
		
// 	var head = new THREE.Mesh( ARROW_HEAD, material );
// 		head.position.set( 0, 0, length );
// 		head.scale.set( 3*thickness, 3*thickness, 10*thickness );
	
// 	var arrow = new THREE.Group( );
// 		arrow.position.set( ix, iy, iz );
// 		arrow.lookAt( fx, fy, fz );	
// 		arrow.add( body, head );
	
// 	return arrow;
// }