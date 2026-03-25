let scene, camera, renderer;
let worldObjects = [];

function initGame(world) {
  // إنشاء المشهد والكاميرا
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // التحكم بالكاميرا
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  camera.position.set(0,5,10);
  controls.update();

  // أرضية بسيطة
  const planeGeometry = new THREE.PlaneGeometry(50,50);
  const planeMaterial = new THREE.MeshStandardMaterial({color:0x444444});
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -Math.PI/2;
  scene.add(plane);

  // إضاءة
  const ambientLight = new THREE.AmbientLight(0xffffff,0.7);
  scene.add(ambientLight);
  const dirLight = new THREE.DirectionalLight(0xffffff,1);
  dirLight.position.set(5,10,5);
  scene.add(dirLight);

  // إضافة عناصر حسب العالم
  loadWorld(world);

  // حلقة الرسوم
  function animate(){
    requestAnimationFrame(animate);
    worldObjects.forEach(obj=>{
      obj.rotation.y += 0.01;
    });
    renderer.render(scene,camera);
  }
  animate();
}

function loadWorld(world){
  worldObjects = [];
  if(world === 'cars'){
    // سيارات
    for(let i=0;i<5;i++){
      const carGeo = new THREE.BoxGeometry(1,0.5,2);
      const carMat = new THREE.MeshStandardMaterial({color:Math.random()*0xffffff});
      const car = new THREE.Mesh(carGeo, carMat);
      car.position.set(Math.random()*10-5,0.25,Math.random()*10-5);
      scene.add(car);
      worldObjects.push(car);
    }
  }
  else if(world === 'eagle'){
    // النسر
    const eagleGeo = new THREE.ConeGeometry(0.5,1,4);
    const eagleMat = new THREE.MeshStandardMaterial({color:0xffaa00});
    const eagle = new THREE.Mesh(eagleGeo, eagleMat);
    eagle.position.set(0,1,0);
    scene.add(eagle);
    worldObjects.push(eagle);
  }
  else if(world === 'sea'){
    // البحار
    const waterGeo = new THREE.PlaneGeometry(20,20,32,32);
    const waterMat = new THREE.MeshStandardMaterial({color:0x3399ff,side:THREE.DoubleSide});
    const water = new THREE.Mesh(waterGeo,waterMat);
    water.rotation.x = -Math.PI/2;
    scene.add(water);
    worldObjects.push(water);
  }
  else if(world === 'forest'){
    // الغابات
    for(let i=0;i<5;i++){
      const treeGeo = new THREE.CylinderGeometry(0,0.5,2,8);
      const treeMat = new THREE.MeshStandardMaterial({color:0x228B22});
      const tree = new THREE.Mesh(treeGeo,treeMat);
      tree.position.set(Math.random()*10-5,1,Math.random()*10-5);
      scene.add(tree);
      worldObjects.push(tree);
    }
  }
  else if(world === 'city'){
    // المدن
    for(let i=0;i<5;i++){
      const buildingGeo = new THREE.BoxGeometry(1,Math.random()*3+1,1);
      const buildingMat = new THREE.MeshStandardMaterial({color:0x888888});
      const building = new THREE.Mesh(buildingGeo,buildingMat);
      building.position.set(Math.random()*10-5,building.geometry.parameters.height/2,Math.random()*10-5);
      scene.add(building);
      worldObjects.push(building);
    }
  }
}

// ربط مع startScreen
function startWorld(world){
  document.getElementById('startScreen').style.display='none';
  document.getElementById('shopScreen').style.display='block';
  initGame(world);
}
