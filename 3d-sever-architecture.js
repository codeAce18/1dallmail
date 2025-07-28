// ===== 3D SERVER ARCHITECTURE DISPLAY =====

// Import necessary libraries
const THREE = window.THREE
const gsap = window.gsap

class ServerArchitecture3D {
  constructor(containerId) {
    this.container = document.getElementById(containerId)
    this.scene = null
    this.camera = null
    this.renderer = null
    this.controls = null
    this.servers = []
    this.connections = []
    this.particles = []
    this.currentView = "overview"
    this.animationId = null

    this.init()
  }

  init() {
    this.showLoading()
    this.setupScene()
    this.setupCamera()
    this.setupRenderer()
    this.setupControls()
    this.setupLights()
    this.createServerArchitecture()
    this.setupEventListeners()
    this.animate()
    this.hideLoading()
  }

  showLoading() {
    const loading = document.createElement("div")
    loading.className = "loading-3d"
    loading.id = "loading-3d"
    loading.innerHTML = `
      <div class="loading-spinner"></div>
      <div>Initializing 3D Architecture...</div>
    `
    this.container.appendChild(loading)
  }

  hideLoading() {
    const loading = document.getElementById("loading-3d")
    if (loading) {
      setTimeout(() => {
        loading.remove()
      }, 1000)
    }
  }

  setupScene() {
    this.scene = new THREE.Scene()
    this.scene.background = new THREE.Color(0x02042a)

    // Add fog for depth
    this.scene.fog = new THREE.Fog(0x02042a, 10, 100)
  }

  setupCamera() {
    this.camera = new THREE.PerspectiveCamera(75, this.container.offsetWidth / this.container.offsetHeight, 0.1, 1000)
    this.camera.position.set(0, 10, 20)
  }

  setupRenderer() {
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
    })
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight)
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    this.renderer.shadowMap.enabled = true
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap
    this.container.appendChild(this.renderer.domElement)
  }

  setupControls() {
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement)
    this.controls.enableDamping = true
    this.controls.dampingFactor = 0.05
    this.controls.maxDistance = 50
    this.controls.minDistance = 5
    this.controls.maxPolarAngle = Math.PI / 2
  }

  setupLights() {
    // Ambient light
    const ambientLight = new THREE.AmbientLight(0x404040, 0.3)
    this.scene.add(ambientLight)

    // Main directional light
    const directionalLight = new THREE.DirectionalLight(0xd4af37, 1)
    directionalLight.position.set(10, 10, 5)
    directionalLight.castShadow = true
    directionalLight.shadow.mapSize.width = 2048
    directionalLight.shadow.mapSize.height = 2048
    this.scene.add(directionalLight)

    // Point lights for dramatic effect
    const pointLight1 = new THREE.PointLight(0xd4af37, 0.5, 30)
    pointLight1.position.set(-10, 5, 10)
    this.scene.add(pointLight1)

    const pointLight2 = new THREE.PointLight(0xe5e5e5, 0.3, 25)
    pointLight2.position.set(10, -5, -10)
    this.scene.add(pointLight2)
  }

  createServerArchitecture() {
    this.createCentralDomain()
    this.createServers()
    this.createConnections()
    this.createSecurityLayer()
    this.createDataFlow()
  }

  createCentralDomain() {
    // Central domain hub
    const geometry = new THREE.CylinderGeometry(2, 2, 1, 8)
    const material = new THREE.MeshPhongMaterial({
      color: 0xd4af37,
      emissive: 0xd4af37,
      emissiveIntensity: 0.2,
      transparent: true,
      opacity: 0.9,
    })

    this.centralDomain = new THREE.Mesh(geometry, material)
    this.centralDomain.position.set(0, 0, 0)
    this.centralDomain.castShadow = true
    this.centralDomain.userData = {
      type: "domain",
      name: "company.com",
      info: "Central Domain Hub - Single Point of Truth",
    }
    this.scene.add(this.centralDomain)

    // Domain glow effect
    const glowGeometry = new THREE.CylinderGeometry(2.5, 2.5, 1.2, 8)
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.1,
    })
    const glow = new THREE.Mesh(glowGeometry, glowMaterial)
    this.centralDomain.add(glow)
  }

  createServers() {
    const serverPositions = [
      { x: -8, y: 0, z: 8, name: "Executive Server" },
      { x: 8, y: 0, z: 8, name: "Department Server" },
      { x: -8, y: 0, z: -8, name: "Security Server" },
      { x: 8, y: 0, z: -8, name: "Backup Server" },
      { x: 0, y: 0, z: 12, name: "AI Management Server" },
      { x: 0, y: 0, z: -12, name: "Analytics Server" },
    ]

    serverPositions.forEach((pos, index) => {
      const server = this.createServer(pos.x, pos.y, pos.z, pos.name, index)
      this.servers.push(server)
      this.scene.add(server)
    })
  }

  createServer(x, y, z, name, index) {
    const group = new THREE.Group()

    // Server body
    const geometry = new THREE.BoxGeometry(2, 3, 1)
    const material = new THREE.MeshPhongMaterial({
      color: 0xe5e5e5,
      emissive: 0x0a0e3f,
      emissiveIntensity: 0.1,
    })

    const server = new THREE.Mesh(geometry, material)
    server.castShadow = true
    server.receiveShadow = true
    group.add(server)

    // Server lights (status indicators)
    for (let i = 0; i < 3; i++) {
      const lightGeometry = new THREE.SphereGeometry(0.1, 8, 8)
      const lightMaterial = new THREE.MeshBasicMaterial({
        color: i === 0 ? 0x00ff00 : 0xd4af37,
        emissive: i === 0 ? 0x00ff00 : 0xd4af37,
        emissiveIntensity: 0.5,
      })
      const light = new THREE.Mesh(lightGeometry, lightMaterial)
      light.position.set(-0.7 + i * 0.7, 1, 0.6)
      group.add(light)
    }

    // Server antenna
    const antennaGeometry = new THREE.CylinderGeometry(0.05, 0.05, 1, 8)
    const antennaMaterial = new THREE.MeshPhongMaterial({ color: 0xd4af37 })
    const antenna = new THREE.Mesh(antennaGeometry, antennaMaterial)
    antenna.position.set(0, 2, 0)
    group.add(antenna)

    group.position.set(x, y, z)
    group.userData = {
      type: "server",
      name: name,
      index: index,
      info: `${name} - Processing ${Math.floor(Math.random() * 1000)}+ emails/min`,
    }

    return group
  }

  createConnections() {
    this.servers.forEach((server) => {
      const connection = this.createConnection(this.centralDomain.position, server.position)
      this.connections.push(connection)
      this.scene.add(connection)
    })
  }

  createConnection(start, end) {
    const points = [new THREE.Vector3(start.x, start.y, start.z), new THREE.Vector3(end.x, end.y, end.z)]

    const geometry = new THREE.BufferGeometry().setFromPoints(points)
    const material = new THREE.LineBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.6,
      linewidth: 2,
    })

    return new THREE.Line(geometry, material)
  }

  createSecurityLayer() {
    // Security shield around the architecture
    const geometry = new THREE.SphereGeometry(15, 32, 32)
    const material = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      transparent: true,
      opacity: 0.05,
      wireframe: true,
    })

    this.securityLayer = new THREE.Mesh(geometry, material)
    this.securityLayer.userData = {
      type: "security",
      name: "Security Perimeter",
      info: "256-bit Encryption Layer - Dynamic Key Rotation",
    }
    this.scene.add(this.securityLayer)
  }

  createDataFlow() {
    // Create animated data particles
    for (let i = 0; i < 50; i++) {
      const particle = this.createDataParticle()
      this.particles.push(particle)
      this.scene.add(particle)
    }
  }

  createDataParticle() {
    const geometry = new THREE.SphereGeometry(0.1, 8, 8)
    const material = new THREE.MeshBasicMaterial({
      color: 0xd4af37,
      emissive: 0xd4af37,
      emissiveIntensity: 0.3,
    })

    const particle = new THREE.Mesh(geometry, material)

    // Random starting position
    particle.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 30)

    // Random velocity
    particle.userData = {
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.1,
        (Math.random() - 0.5) * 0.05,
        (Math.random() - 0.5) * 0.1,
      ),
      life: Math.random() * 100,
    }

    return particle
  }

  setupEventListeners() {
    // View control buttons
    document.querySelectorAll(".control-btn").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const view = e.target.dataset.view
        this.switchView(view)

        // Update active button
        document.querySelectorAll(".control-btn").forEach((b) => b.classList.remove("active"))
        e.target.classList.add("active")
      })
    })

    // Mouse interaction for tooltips
    this.renderer.domElement.addEventListener("mousemove", (event) => {
      this.onMouseMove(event)
    })

    // Window resize
    window.addEventListener("resize", () => {
      this.onWindowResize()
    })
  }

  switchView(view) {
    this.currentView = view

    // Hide all info panels
    document.querySelectorAll(".info-panel").forEach((panel) => {
      panel.style.display = "none"
    })

    // Show current info panel
    document.getElementById(`info-${view}`).style.display = "block"

    // Animate camera and objects based on view
    switch (view) {
      case "overview":
        this.animateToOverview()
        break
      case "security":
        this.animateToSecurity()
        break
      case "routing":
        this.animateToRouting()
        break
      case "scaling":
        this.animateToScaling()
        break
    }
  }

  animateToOverview() {
    gsap.to(this.camera.position, {
      x: 0,
      y: 10,
      z: 20,
      duration: 2,
      ease: "power2.inOut",
    })

    // Reset all objects to normal state
    this.servers.forEach((server) => {
      gsap.to(server.scale, { x: 1, y: 1, z: 1, duration: 1 })
    })

    gsap.to(this.securityLayer.material, { opacity: 0.05, duration: 1 })
  }

  animateToSecurity() {
    gsap.to(this.camera.position, {
      x: 5,
      y: 15,
      z: 15,
      duration: 2,
      ease: "power2.inOut",
    })

    // Highlight security layer
    gsap.to(this.securityLayer.material, { opacity: 0.2, duration: 1 })
    gsap.to(this.securityLayer.rotation, { y: "+=6.28", duration: 10, repeat: -1, ease: "none" })
  }

  animateToRouting() {
    gsap.to(this.camera.position, {
      x: -10,
      y: 5,
      z: 10,
      duration: 2,
      ease: "power2.inOut",
    })

    // Animate connections
    this.connections.forEach((connection, index) => {
      gsap.to(connection.material, {
        opacity: 1,
        duration: 0.5,
        delay: index * 0.1,
        yoyo: true,
        repeat: -1,
      })
    })
  }

  animateToScaling() {
    gsap.to(this.camera.position, {
      x: 0,
      y: 20,
      z: 25,
      duration: 2,
      ease: "power2.inOut",
    })

    // Show scaling animation
    this.servers.forEach((server, index) => {
      gsap.to(server.scale, {
        x: 1.2,
        y: 1.2,
        z: 1.2,
        duration: 1,
        delay: index * 0.2,
        yoyo: true,
        repeat: -1,
      })
    })
  }

  onMouseMove(event) {
    const mouse = new THREE.Vector2()
    const rect = this.renderer.domElement.getBoundingClientRect()

    mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1

    const raycaster = new THREE.Raycaster()
    raycaster.setFromCamera(mouse, this.camera)

    const intersects = raycaster.intersectObjects(this.scene.children, true)

    if (intersects.length > 0) {
      const object = intersects[0].object
      if (object.userData && object.userData.info) {
        this.showTooltip(event, object.userData)
      }
    } else {
      this.hideTooltip()
    }
  }

  showTooltip(event, userData) {
    let tooltip = document.getElementById("server-tooltip")
    if (!tooltip) {
      tooltip = document.createElement("div")
      tooltip.id = "server-tooltip"
      tooltip.className = "server-tooltip"
      document.body.appendChild(tooltip)
    }

    tooltip.innerHTML = `<strong>${userData.name}</strong><br>${userData.info}`
    tooltip.style.left = event.clientX + 10 + "px"
    tooltip.style.top = event.clientY - 10 + "px"
    tooltip.classList.add("visible")
  }

  hideTooltip() {
    const tooltip = document.getElementById("server-tooltip")
    if (tooltip) {
      tooltip.classList.remove("visible")
    }
  }

  onWindowResize() {
    this.camera.aspect = this.container.offsetWidth / this.container.offsetHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(this.container.offsetWidth, this.container.offsetHeight)
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate())

    // Update controls
    this.controls.update()

    // Animate central domain
    if (this.centralDomain) {
      this.centralDomain.rotation.y += 0.01
    }

    // Animate servers
    this.servers.forEach((server, index) => {
      server.rotation.y += 0.005 * (index + 1)
    })

    // Animate security layer
    if (this.securityLayer) {
      this.securityLayer.rotation.y += 0.002
      this.securityLayer.rotation.x += 0.001
    }

    // Animate data particles
    this.particles.forEach((particle) => {
      particle.position.add(particle.userData.velocity)
      particle.userData.life--

      if (particle.userData.life <= 0) {
        // Reset particle
        particle.position.set((Math.random() - 0.5) * 30, (Math.random() - 0.5) * 10, (Math.random() - 0.5) * 30)
        particle.userData.life = 100
      }
    })

    // Render the scene
    this.renderer.render(this.scene, this.camera)
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId)
    }

    if (this.renderer) {
      this.renderer.dispose()
    }


    this.scene.traverse((object) => {
      if (object.geometry) object.geometry.dispose()
      if (object.material) {
        if (Array.isArray(object.material)) {
          object.material.forEach((material) => material.dispose())
        } else {
          object.material.dispose()
        }
      }
    })
  }
}


document.addEventListener("DOMContentLoaded", () => {

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Initialize 3D display
        window.serverArchitecture3D = new ServerArchitecture3D("server-architecture-3d")
        observer.unobserve(entry.target)
      }
    })
  })

  const innovationSection = document.getElementById("innovation")
  if (innovationSection) {
    observer.observe(innovationSection)
  }
})

// Performance monitoring
function addPerformanceIndicators() {
  const container = document.querySelector(".architecture-3d-container")
  if (!container) return

  const overlay = document.createElement("div")
  overlay.className = "performance-overlay"
  overlay.innerHTML = `
    <div class="perf-indicator">
        <div class="perf-dot"></div>
        <span>システム稼働中</span>
    </div>
    <div class="perf-indicator">
        <div class="perf-dot"></div>
        <span>AIルーティング稼働中</span>
    </div>
    <div class="perf-indicator">
        <div class="perf-dot"></div>
        <span>セキュリティレイヤー正常</span>
    </div>

    `

  container.appendChild(overlay)
}

// Add performance indicators after a delay
setTimeout(addPerformanceIndicators, 2000)
