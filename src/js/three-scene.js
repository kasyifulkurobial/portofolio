/* ==========================================================================
   ADVANCED THREE.JS 3D SCENE & CINEMATIC CAMERA SYSTEM
   Immersive WebGL Experience inspired by julio-modern.vercel.app:
   1. Quantum Gyroscope Core & Gimbal Rings (Hero / Intro)
   2. Dynamic Cyber Wave Grid Horizon
   3. 3D Odoo Enterprise ERP Architecture Hub with Glowing Conduit Splines (Experience)
   4. 3D Holographic Project Showcase Carousel (Projects)
   5. 3D Interactive Neural Constellation with Mouse Gravity Physics (Skills)
   6. Volumetric Starfield & Cyber Dust
   7. Interactive Click Shockwaves & Kinetic Spark Emitters
   8. 6-Waypoint Cinematic Camera Flight with Chapter Lighting Shifts
   ========================================================================== */

import * as THREE from 'three';

export class ThreeScene {
    constructor(canvasId = 'webgl-canvas') {
        this.canvas = document.getElementById(canvasId);
        if (!this.canvas) return;

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            50,
            window.innerWidth / window.innerHeight,
            0.1,
            1000
        );

        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            alpha: true,
            antialias: true,
            powerPreference: 'high-performance'
        });

        this.mouse = {
            x: 0,
            y: 0,
            targetX: 0,
            targetY: 0,
            vx: 0,
            vy: 0,
            prevX: 0,
            prevY: 0
        };

        this.scroll = {
            progress: 0,
            currentSection: 0
        };

        this.clock = new THREE.Clock();

        // 6 Cinematic Camera Waypoints (matching Chapters)
        this.cameraWaypoints = [
            // Chapter 0: Home / Intro (Spotlight on Quantum Core)
            { pos: new THREE.Vector3(0, 0, 16.5), look: new THREE.Vector3(1.2, 0, 0), lightColor: 0xff9933 },
            // Chapter 1: About (Camera shifts left, re-framing Kas's profile & core)
            { pos: new THREE.Vector3(-5.2, 1.2, 14.5), look: new THREE.Vector3(0.5, 0, 0), lightColor: 0xffaa44 },
            // Chapter 2: Experience (Camera zooms toward 3D Odoo Enterprise ERP Hub)
            { pos: new THREE.Vector3(4.8, -1.2, 13.0), look: new THREE.Vector3(0, -0.5, -1), lightColor: 0xff7722 },
            // Chapter 3: Projects (Camera frames the 3D Hologram Project Carousel)
            { pos: new THREE.Vector3(0, -3.2, 12.0), look: new THREE.Vector3(0, -1.0, -2), lightColor: 0x38bdf8 },
            // Chapter 4: Skills (Camera glides high to view the Neural Constellation)
            { pos: new THREE.Vector3(0, 5.2, 13.5), look: new THREE.Vector3(0, 1.5, -1), lightColor: 0xffc68a },
            // Chapter 5: Contact (Warm sunset ember vortex)
            { pos: new THREE.Vector3(0, 0.5, 15.0), look: new THREE.Vector3(0, 0, 0), lightColor: 0xff5d2e }
        ];

        this.camTargetPos = new THREE.Vector3(0, 0, 16.5);
        this.camTargetLook = new THREE.Vector3(1.2, 0, 0);
        this.camCurrentLook = new THREE.Vector3(1.2, 0, 0);

        this.shockwaves = [];
        this.sparkParticles = [];
        this.conduitPulses = [];

        this.init();
    }

    init() {
        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        this.renderer.setPixelRatio(dpr);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
        this.renderer.toneMappingExposure = 1.3;

        this.camera.position.set(0, 0, 16.5);

        // Lighting System
        this.ambientLight = new THREE.AmbientLight(0x070b14, 3.8);
        this.scene.add(this.ambientLight);

        // Dynamic Primary Key Light (Solar Amber)
        this.keyLight = new THREE.PointLight(0xff9933, 85, 60);
        this.keyLight.position.set(10, 8, 12);
        this.scene.add(this.keyLight);

        // Secondary Fill Light (Deep Copper)
        this.copperLight = new THREE.PointLight(0xff5d2e, 65, 50);
        this.copperLight.position.set(-12, -7, 10);
        this.scene.add(this.copperLight);

        // Rim Light for edge definition (Cyan Titanium)
        this.rimLight = new THREE.PointLight(0x38bdf8, 50, 45);
        this.rimLight.position.set(0, 12, -6);
        this.scene.add(this.rimLight);

        // BUILD MULTIPLE 3D VISUAL STRUCTURES
        this.createStarfield();
        this.createWaveGrid();
        this.createQuantumCore();
        this.createOdooEnterpriseHub();
        this.createProjectCarousel();
        this.createNeuralConstellation();

        // Listeners
        window.addEventListener('resize', this.onResize.bind(this));
        window.addEventListener('mousemove', this.onMouseMove.bind(this));
        window.addEventListener('scroll', this.onScroll.bind(this), { passive: true });
        window.addEventListener('click', this.onClick.bind(this));

        this.onResize();
        this.animate();
    }

    /* --------------------------------------------------------------------------
       1. Dynamic Volumetric Starfield & Cosmic Dust (3,500 Particles)
       -------------------------------------------------------------------------- */
    createStarfield() {
        const count = 3500;
        const positions = new Float32Array(count * 3);
        const colors = new Float32Array(count * 3);
        const scales = new Float32Array(count);
        this.starVelocities = new Float32Array(count * 3);

        const colorAmber = new THREE.Color(0xff9933);
        const colorCopper = new THREE.Color(0xff5d2e);
        const colorCyan = new THREE.Color(0x38bdf8);
        const colorTitanium = new THREE.Color(0xffffff);
        const colorDim = new THREE.Color(0x1e293b);

        for (let i = 0; i < count; i++) {
            const i3 = i * 3;
            const radius = 8 + Math.random() * 42;
            const theta = THREE.MathUtils.randFloatSpread(360);
            const phi = THREE.MathUtils.randFloatSpread(360);

            positions[i3] = radius * Math.sin(theta) * Math.cos(phi);
            positions[i3 + 1] = (Math.random() - 0.5) * 75;
            positions[i3 + 2] = radius * Math.cos(theta) - 10;

            this.starVelocities[i3] = (Math.random() - 0.5) * 0.004;
            this.starVelocities[i3 + 1] = (Math.random() - 0.5) * 0.004;
            this.starVelocities[i3 + 2] = (Math.random() - 0.5) * 0.004;

            const r = Math.random();
            let c = colorDim;
            if (r > 0.88) c = colorAmber;
            else if (r > 0.72) c = colorCopper;
            else if (r > 0.55) c = colorCyan;
            else if (r > 0.25) c = colorTitanium;

            colors[i3] = c.r;
            colors[i3 + 1] = c.g;
            colors[i3 + 2] = c.b;

            scales[i] = Math.random() * 2.8 + 0.6;
        }

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
        geometry.setAttribute('scale', new THREE.BufferAttribute(scales, 1));

        // Soft Radial Glow Texture
        const canvas = document.createElement('canvas');
        canvas.width = 32;
        canvas.height = 32;
        const ctx = canvas.getContext('2d');
        const grad = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        grad.addColorStop(0, 'rgba(255,255,255,1)');
        grad.addColorStop(0.2, 'rgba(255,210,150,0.9)');
        grad.addColorStop(0.6, 'rgba(255,120,40,0.25)');
        grad.addColorStop(1, 'rgba(0,0,0,0)');
        ctx.fillStyle = grad;
        ctx.fillRect(0, 0, 32, 32);

        const texture = new THREE.CanvasTexture(canvas);

        const material = new THREE.PointsMaterial({
            size: 0.62,
            map: texture,
            vertexColors: true,
            transparent: true,
            opacity: 0.88,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        });

        this.starfield = new THREE.Points(geometry, material);
        this.scene.add(this.starfield);
    }

    /* --------------------------------------------------------------------------
       2. Dynamic Cyber Wave Grid (Horizon Landscape)
       -------------------------------------------------------------------------- */
    createWaveGrid() {
        const size = 65;
        const divisions = 50;
        this.gridGeometry = new THREE.PlaneGeometry(size, size, divisions, divisions);
        this.gridGeometry.rotateX(-Math.PI / 2);

        const gridMaterial = new THREE.MeshBasicMaterial({
            color: 0xff7728,
            wireframe: true,
            transparent: true,
            opacity: 0.18,
            blending: THREE.AdditiveBlending
        });

        this.gridMesh = new THREE.Mesh(this.gridGeometry, gridMaterial);
        this.gridMesh.position.set(0, -9.5, -4);
        this.scene.add(this.gridMesh);
    }

    /* --------------------------------------------------------------------------
       3. Quantum Gyroscope Core & Gimbal Rings (Hero / Intro)
       -------------------------------------------------------------------------- */
    createQuantumCore() {
        this.coreGroup = new THREE.Group();

        // Inner Crystalline Dodecahedron
        const dodecGeo = new THREE.DodecahedronGeometry(2.2, 0);
        const dodecMat = new THREE.MeshPhysicalMaterial({
            color: 0x111625,
            emissive: 0xff5d2e,
            emissiveIntensity: 0.45,
            metalness: 0.85,
            roughness: 0.2,
            wireframe: false,
            transparent: true,
            opacity: 0.82
        });
        this.innerDodec = new THREE.Mesh(dodecGeo, dodecMat);
        this.coreGroup.add(this.innerDodec);

        // Outer Icosahedron Wireframe
        const icoGeo = new THREE.IcosahedronGeometry(3.6, 1);
        const icoWireGeo = new THREE.WireframeGeometry(icoGeo);
        const icoMat = new THREE.LineBasicMaterial({
            color: 0xff9933,
            transparent: true,
            opacity: 0.5,
            blending: THREE.AdditiveBlending
        });
        this.outerIco = new THREE.LineSegments(icoWireGeo, icoMat);
        this.coreGroup.add(this.outerIco);

        // Core Glowing Vertex Nodes
        const vertMat = new THREE.PointsMaterial({
            color: 0xffe6cc,
            size: 0.32,
            transparent: true,
            opacity: 0.95,
            blending: THREE.AdditiveBlending
        });
        this.corePoints = new THREE.Points(icoGeo, vertMat);
        this.coreGroup.add(this.corePoints);

        // Ring 1: Primary Gimbal Torus (Amber)
        const ring1Geo = new THREE.TorusGeometry(4.9, 0.04, 16, 140);
        const ring1Mat = new THREE.MeshBasicMaterial({
            color: 0xff9933,
            transparent: true,
            opacity: 0.72,
            blending: THREE.AdditiveBlending
        });
        this.ring1 = new THREE.Mesh(ring1Geo, ring1Mat);
        this.ring1.rotation.x = Math.PI / 3;
        this.coreGroup.add(this.ring1);

        // Ring 2: Orthogonal Gimbal Torus (Copper Gold)
        const ring2Geo = new THREE.TorusGeometry(5.7, 0.03, 16, 140);
        const ring2Mat = new THREE.MeshBasicMaterial({
            color: 0xff5d2e,
            transparent: true,
            opacity: 0.52,
            blending: THREE.AdditiveBlending
        });
        this.ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
        this.ring2.rotation.y = Math.PI / 4;
        this.ring2.rotation.z = Math.PI / 6;
        this.coreGroup.add(this.ring2);

        // Ring 3: Outer Horizon Torus (Cyan Contrast)
        const ring3Geo = new THREE.TorusGeometry(6.6, 0.02, 16, 140);
        const ring3Mat = new THREE.MeshBasicMaterial({
            color: 0x38bdf8,
            transparent: true,
            opacity: 0.35,
            blending: THREE.AdditiveBlending
        });
        this.ring3 = new THREE.Mesh(ring3Geo, ring3Mat);
        this.ring3.rotation.x = -Math.PI / 4;
        this.coreGroup.add(this.ring3);

        // 4 Orbiting Satellite Beacons
        this.satellites = [];
        const satGeo = new THREE.SphereGeometry(0.14, 16, 16);
        const satColors = [0xff9933, 0xff5d2e, 0x38bdf8, 0xffc68a];

        for (let i = 0; i < 4; i++) {
            const satMat = new THREE.MeshBasicMaterial({
                color: satColors[i],
                transparent: true,
                opacity: 0.9
            });
            const sat = new THREE.Mesh(satGeo, satMat);
            sat.userData = {
                radius: 5.0 + i * 0.7,
                speed: 0.7 + i * 0.28,
                angle: (i * Math.PI * 2) / 4,
                tilt: (i * Math.PI) / 3
            };
            this.coreGroup.add(sat);
            this.satellites.push(sat);
        }

        this.coreGroup.position.set(4.6, 0.4, 0);
        this.scene.add(this.coreGroup);
    }

    /* --------------------------------------------------------------------------
       4. 3D Odoo Enterprise ERP Architecture Hub (Chapter 02: Experience)
       -------------------------------------------------------------------------- */
    createOdooEnterpriseHub() {
        this.odooGroup = new THREE.Group();

        // Central Odoo ERP Enterprise Core
        const coreGeo = new THREE.OctahedronGeometry(1.6, 0);
        const coreMat = new THREE.MeshStandardMaterial({
            color: 0x1f142e,
            emissive: 0x714b67, // Odoo signature purple/gold accent
            emissiveIntensity: 0.85,
            roughness: 0.2,
            metalness: 0.9,
            wireframe: false
        });
        this.odooCoreMesh = new THREE.Mesh(coreGeo, coreMat);
        this.odooGroup.add(this.odooCoreMesh);

        // Outer Wireframe Cage
        const cageGeo = new THREE.WireframeGeometry(coreGeo);
        const cageMat = new THREE.LineBasicMaterial({
            color: 0xffaa33,
            transparent: true,
            opacity: 0.75,
            blending: THREE.AdditiveBlending
        });
        const cageMesh = new THREE.LineSegments(cageGeo, cageMat);
        cageMesh.scale.set(1.2, 1.2, 1.2);
        this.odooCoreMesh.add(cageMesh);

        // 5 Satellite ERP Modules: Sales, Inventory, Accounting, Manufacturing, Webhooks
        const moduleData = [
            { name: 'Sales & CRM', color: 0xff9933, offset: new THREE.Vector3(3.2, 1.8, 0.5) },
            { name: 'Inventory & Barcode', color: 0xff5d2e, offset: new THREE.Vector3(-3.2, 1.4, -0.5) },
            { name: 'Accounting & Tax', color: 0x10b981, offset: new THREE.Vector3(2.5, -2.2, 1.0) },
            { name: 'Manufacturing (MRP)', color: 0x38bdf8, offset: new THREE.Vector3(-2.6, -2.0, -0.8) },
            { name: 'API & Integration', color: 0xa855f7, offset: new THREE.Vector3(0, 3.4, -1.2) }
        ];

        this.odooSatellites = [];
        this.conduitSplines = [];

        const satGeo = new THREE.BoxGeometry(0.55, 0.55, 0.55);

        moduleData.forEach((mod, idx) => {
            const satMat = new THREE.MeshStandardMaterial({
                color: 0x111625,
                emissive: mod.color,
                emissiveIntensity: 0.75,
                roughness: 0.3,
                metalness: 0.8
            });

            const satMesh = new THREE.Mesh(satGeo, satMat);
            satMesh.position.copy(mod.offset);

            // Orbit Ring around Module
            const orbRingGeo = new THREE.RingGeometry(0.42, 0.48, 24);
            const orbRingMat = new THREE.MeshBasicMaterial({
                color: mod.color,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.45
            });
            const orbRing = new THREE.Mesh(orbRingGeo, orbRingMat);
            orbRing.rotation.x = Math.PI / 2;
            satMesh.add(orbRing);

            satMesh.userData = {
                baseOffset: mod.offset.clone(),
                freq: 1.0 + idx * 0.25,
                amp: 0.28,
                color: mod.color
            };

            this.odooGroup.add(satMesh);
            this.odooSatellites.push(satMesh);

            // Glowing Curved Spline Conduits Connecting Core to Modules
            const midPoint = new THREE.Vector3().addVectors(new THREE.Vector3(0, 0, 0), mod.offset).multiplyScalar(0.5);
            midPoint.z += 1.0; // Arch outward

            const curve = new THREE.QuadraticBezierCurve3(
                new THREE.Vector3(0, 0, 0),
                midPoint,
                mod.offset
            );

            const points = curve.getPoints(30);
            const splineGeo = new THREE.BufferGeometry().setFromPoints(points);
            const splineMat = new THREE.LineBasicMaterial({
                color: mod.color,
                transparent: true,
                opacity: 0.35,
                blending: THREE.AdditiveBlending
            });
            const splineMesh = new THREE.Line(splineGeo, splineMat);
            this.odooGroup.add(splineMesh);

            this.conduitSplines.push({ curve, mesh: splineMesh, color: mod.color });

            // Traveling Pulse Packet
            const pulseGeo = new THREE.SphereGeometry(0.08, 12, 12);
            const pulseMat = new THREE.MeshBasicMaterial({
                color: 0xffffff,
                transparent: true,
                opacity: 0.95
            });
            const pulseMesh = new THREE.Mesh(pulseGeo, pulseMat);
            this.odooGroup.add(pulseMesh);
            this.conduitPulses.push({
                curve,
                mesh: pulseMesh,
                progress: idx * 0.2
            });
        });

        this.odooGroup.position.set(5.2, -0.6, -1.0);
        this.scene.add(this.odooGroup);
    }

    /* --------------------------------------------------------------------------
       5. 3D Holographic Project Showcase Carousel (Chapter 03: Projects)
       -------------------------------------------------------------------------- */
    createProjectCarousel() {
        this.projectGroup = new THREE.Group();

        // 8 Project Hologram Pedestals arranged in an arc
        const count = 8;
        this.projectMonoliths = [];

        for (let i = 0; i < count; i++) {
            const angle = (i / (count - 1) - 0.5) * Math.PI * 0.9;
            const radius = 6.2;

            const x = Math.sin(angle) * radius;
            const z = Math.cos(angle) * radius - 6.5;
            const y = -1.2 + Math.sin(i * 1.2) * 0.4;

            const monolithGeo = new THREE.CylinderGeometry(0.35, 0.45, 1.8, 6);
            const monolithMat = new THREE.MeshStandardMaterial({
                color: 0x0c1222,
                emissive: 0x38bdf8,
                emissiveIntensity: 0.35,
                metalness: 0.8,
                roughness: 0.3,
                transparent: true,
                opacity: 0.75
            });

            const monolith = new THREE.Mesh(monolithGeo, monolithMat);
            monolith.position.set(x, y, z);
            monolith.rotation.y = -angle;

            // Wireframe accent on monolith
            const wireGeo = new THREE.WireframeGeometry(monolithGeo);
            const wireMat = new THREE.LineBasicMaterial({
                color: 0xff9933,
                transparent: true,
                opacity: 0.45,
                blending: THREE.AdditiveBlending
            });
            const wireMesh = new THREE.LineSegments(wireGeo, wireMat);
            monolith.add(wireMesh);

            // Floating 3D Diamond / Crystal atop each pedestal
            const diamondGeo = new THREE.OctahedronGeometry(0.24, 0);
            const diamondMat = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0xff9933 : 0x38bdf8,
                wireframe: true
            });
            const diamond = new THREE.Mesh(diamondGeo, diamondMat);
            diamond.position.y = 1.3;
            monolith.add(diamond);

            monolith.userData = {
                baseY: y,
                angle,
                diamond,
                index: i
            };

            this.projectGroup.add(monolith);
            this.projectMonoliths.push(monolith);
        }

        this.projectGroup.position.set(0, -2.5, -2);
        this.scene.add(this.projectGroup);
    }

    /* --------------------------------------------------------------------------
       6. 3D Interactive Neural Constellation (Chapter 04: Skills)
       -------------------------------------------------------------------------- */
    createNeuralConstellation() {
        this.neuralGroup = new THREE.Group();

        const skillNodesData = [
            { name: 'Odoo 17/18', pos: new THREE.Vector3(-3.2, 4.0, 1.0), color: 0xff9933, size: 0.28 },
            { name: 'Python', pos: new THREE.Vector3(3.5, 4.8, -0.5), color: 0xffc68a, size: 0.25 },
            { name: 'PostgreSQL', pos: new THREE.Vector3(4.2, 2.0, 1.2), color: 0x38bdf8, size: 0.26 },
            { name: 'Docker', pos: new THREE.Vector3(-4.0, 1.8, -0.5), color: 0x60a5fa, size: 0.22 },
            { name: 'Next.js', pos: new THREE.Vector3(0.5, 5.8, 1.5), color: 0xffffff, size: 0.24 },
            { name: 'Laravel', pos: new THREE.Vector3(-1.8, 2.8, -1.8), color: 0xff5d2e, size: 0.22 },
            { name: 'FastAPI', pos: new THREE.Vector3(2.2, 3.2, 2.2), color: 0x10b981, size: 0.20 },
            { name: 'Linux / Nginx', pos: new THREE.Vector3(-0.8, 4.6, -1.0), color: 0xf59e0b, size: 0.21 },
            { name: 'Redis', pos: new THREE.Vector3(1.6, 6.2, -1.5), color: 0xef4444, size: 0.19 },
            { name: 'Git & CI/CD', pos: new THREE.Vector3(-2.5, 5.8, 0.5), color: 0xa855f7, size: 0.20 }
        ];

        this.skillNodes = [];
        const sphereGeo = new THREE.SphereGeometry(1, 16, 16);

        skillNodesData.forEach((data, index) => {
            const mat = new THREE.MeshBasicMaterial({
                color: data.color,
                transparent: true,
                opacity: 0.92
            });

            const node = new THREE.Mesh(sphereGeo, mat);
            node.scale.setScalar(data.size);
            node.position.copy(data.pos);

            // Concentric Energy Ring
            const ringGeo = new THREE.RingGeometry(1.4, 1.65, 24);
            const ringMat = new THREE.MeshBasicMaterial({
                color: data.color,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.4
            });
            const ring = new THREE.Mesh(ringGeo, ringMat);
            ring.rotation.x = Math.PI / 2;
            node.add(ring);

            node.userData = {
                basePos: data.pos.clone(),
                freq: 0.75 + index * 0.18,
                amp: 0.32 + index * 0.05,
                ring
            };

            this.neuralGroup.add(node);
            this.skillNodes.push(node);
        });

        // Dynamic Connecting Lines
        const lineMat = new THREE.LineBasicMaterial({
            color: 0xff9933,
            transparent: true,
            opacity: 0.22,
            blending: THREE.AdditiveBlending
        });

        const linePoints = [];
        for (let i = 0; i < skillNodesData.length; i++) {
            for (let j = i + 1; j < skillNodesData.length; j++) {
                if (skillNodesData[i].pos.distanceTo(skillNodesData[j].pos) < 5.2) {
                    linePoints.push(skillNodesData[i].pos);
                    linePoints.push(skillNodesData[j].pos);
                }
            }
        }

        const lineGeo = new THREE.BufferGeometry().setFromPoints(linePoints);
        this.constellationLines = new THREE.LineSegments(lineGeo, lineMat);
        this.neuralGroup.add(this.constellationLines);

        this.neuralGroup.position.set(0, 1.0, 0);
        this.scene.add(this.neuralGroup);
    }

    /* --------------------------------------------------------------------------
       7. Interactive Shockwaves & Spark Emitter on Click
       -------------------------------------------------------------------------- */
    onClick(e) {
        // Expand Dual Shockwave Rings
        const ringGeo = new THREE.RingGeometry(0.3, 0.5, 36);
        const ringMat = new THREE.MeshBasicMaterial({
            color: 0xff9933,
            transparent: true,
            opacity: 0.9,
            side: THREE.DoubleSide,
            blending: THREE.AdditiveBlending
        });

        const shock = new THREE.Mesh(ringGeo, ringMat);
        const normX = (e.clientX / window.innerWidth) * 2 - 1;
        const normY = -(e.clientY / window.innerHeight) * 2 + 1;

        shock.position.set(normX * 8.5, normY * 5.5, 2.5);
        shock.userData = { scale: 1, life: 1 };
        this.scene.add(shock);
        this.shockwaves.push(shock);

        // Burst 14 Kinetic Sparks
        for (let i = 0; i < 14; i++) {
            const sparkGeo = new THREE.SphereGeometry(0.04, 8, 8);
            const sparkMat = new THREE.MeshBasicMaterial({
                color: i % 2 === 0 ? 0xff9933 : 0xff5d2e,
                transparent: true,
                opacity: 1
            });
            const spark = new THREE.Mesh(sparkGeo, sparkMat);
            spark.position.copy(shock.position);

            const angle = (i / 14) * Math.PI * 2;
            const speed = 0.08 + Math.random() * 0.12;
            spark.userData = {
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                vz: (Math.random() - 0.5) * 0.08,
                life: 1.0
            };

            this.scene.add(spark);
            this.sparkParticles.push(spark);
        }
    }

    onMouseMove(e) {
        this.mouse.targetX = (e.clientX / window.innerWidth) * 2 - 1;
        this.mouse.targetY = -(e.clientY / window.innerHeight) * 2 + 1;

        this.mouse.vx = this.mouse.targetX - this.mouse.prevX;
        this.mouse.vy = this.mouse.targetY - this.mouse.prevY;
        this.mouse.prevX = this.mouse.targetX;
        this.mouse.prevY = this.mouse.targetY;
    }

    onScroll() {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const currentScroll = window.scrollY || window.pageYOffset;
        this.scroll.progress = totalHeight > 0 ? Math.min(Math.max(currentScroll / totalHeight, 0), 1) : 0;
    }

    setChapter(sectionIndex) {
        this.scroll.currentSection = sectionIndex;
        const wp = this.cameraWaypoints[sectionIndex] || this.cameraWaypoints[0];
        this.camTargetPos.copy(wp.pos);
        this.camTargetLook.copy(wp.look);

        if (this.keyLight && wp.lightColor) {
            this.keyLight.color.setHex(wp.lightColor);
        }
    }

    onResize() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(width, height);
        this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

        if (width < 768) {
            if (this.coreGroup) {
                this.coreGroup.position.set(0, 2.0, -3.5);
                this.coreGroup.scale.set(0.68, 0.68, 0.68);
            }
            if (this.odooGroup) {
                this.odooGroup.position.set(0, 0, -4.5);
                this.odooGroup.scale.set(0.75, 0.75, 0.75);
            }
        } else {
            if (this.coreGroup) {
                this.coreGroup.position.set(4.6, 0.4, 0);
                this.coreGroup.scale.set(1, 1, 1);
            }
            if (this.odooGroup) {
                this.odooGroup.position.set(5.2, -0.6, -1.0);
                this.odooGroup.scale.set(1, 1, 1);
            }
        }
    }

    /* --------------------------------------------------------------------------
       Animation Engine & Real-Time Physics Loop
       -------------------------------------------------------------------------- */
    animate() {
        requestAnimationFrame(this.animate.bind(this));

        const time = this.clock.getElapsedTime();

        // 1. Mouse Fluid Lerp
        this.mouse.x += (this.mouse.targetX - this.mouse.x) * 0.05;
        this.mouse.y += (this.mouse.targetY - this.mouse.y) * 0.05;

        // 2. Cinematic Camera Flight
        this.camera.position.x += (this.camTargetPos.x + this.mouse.x * 0.8 - this.camera.position.x) * 0.045;
        this.camera.position.y += (this.camTargetPos.y + this.mouse.y * 0.6 - this.camera.position.y) * 0.045;
        this.camera.position.z += (this.camTargetPos.z - this.camera.position.z) * 0.045;

        this.camCurrentLook.x += (this.camTargetLook.x - this.camCurrentLook.x) * 0.045;
        this.camCurrentLook.y += (this.camTargetLook.y - this.camCurrentLook.y) * 0.045;
        this.camCurrentLook.z += (this.camTargetLook.z - this.camCurrentLook.z) * 0.045;
        this.camera.lookAt(this.camCurrentLook);

        // 3. Quantum Core Motion
        if (this.coreGroup) {
            this.innerDodec.rotation.x = time * 0.16;
            this.innerDodec.rotation.y = time * 0.24;

            this.outerIco.rotation.x = -time * 0.12;
            this.outerIco.rotation.y = time * 0.18;
            this.corePoints.rotation.copy(this.outerIco.rotation);

            this.ring1.rotation.z = time * 0.20;
            this.ring2.rotation.y = time * 0.14;
            this.ring3.rotation.x = -Math.PI / 4 + time * 0.10;

            this.satellites.forEach(sat => {
                const u = sat.userData;
                const angle = time * u.speed + u.angle;
                sat.position.x = Math.cos(angle) * u.radius;
                sat.position.z = Math.sin(angle) * u.radius;
                sat.position.y = Math.sin(angle * 1.6) * (u.radius * 0.35);
            });
        }

        // 4. Dynamic Cyber Wave Grid Undulation
        if (this.gridGeometry) {
            const posAttr = this.gridGeometry.attributes.position;
            for (let i = 0; i < posAttr.count; i++) {
                const u = posAttr.getX(i);
                const v = posAttr.getY(i);
                const wave = Math.sin(u * 0.22 + time * 1.5) * Math.cos(v * 0.22 + time * 1.3) * 0.72;
                posAttr.setZ(i, wave);
            }
            posAttr.needsUpdate = true;
        }

        // 5. Odoo Architecture Hub Rotation & Conduit Pulses
        if (this.odooGroup) {
            this.odooCoreMesh.rotation.y = time * 0.3;
            this.odooCoreMesh.rotation.x = Math.sin(time * 0.4) * 0.2;

            this.odooSatellites.forEach(sat => {
                const u = sat.userData;
                sat.position.y = u.baseOffset.y + Math.sin(time * u.freq) * u.amp;
                sat.position.x = u.baseOffset.x + Math.cos(time * u.freq * 0.8) * (u.amp * 0.4);
                sat.rotation.y = time * 0.6;
            });

            // Advance Pulse Packets along Conduit Splines
            this.conduitPulses.forEach(pulse => {
                pulse.progress += 0.012;
                if (pulse.progress > 1) pulse.progress = 0;
                const pt = pulse.curve.getPoint(pulse.progress);
                pulse.mesh.position.copy(pt);
            });
        }

        // 6. Project Monoliths Bobbing & Rotation
        if (this.projectGroup) {
            this.projectMonoliths.forEach(mono => {
                const u = mono.userData;
                mono.position.y = u.baseY + Math.sin(time * 1.2 + u.index) * 0.15;
                if (u.diamond) {
                    u.diamond.rotation.y = time * 0.8;
                    u.diamond.rotation.x = time * 0.4;
                }
            });
        }

        // 7. Neural Constellation Physics & Mouse Gravity
        if (this.skillNodes) {
            this.skillNodes.forEach(node => {
                const u = node.userData;
                node.position.y = u.basePos.y + Math.sin(time * u.freq) * u.amp;
                node.position.x = u.basePos.x + Math.cos(time * u.freq * 0.7) * (u.amp * 0.5);

                // Mouse Gravity Well in 3D
                const dx = (this.mouse.x * 6) - node.position.x;
                const dy = (this.mouse.y * 4 + 3) - node.position.y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 4.0 && dist > 0.1) {
                    node.position.x += (dx / dist) * 0.035;
                    node.position.y += (dy / dist) * 0.035;
                }

                if (u.ring) {
                    u.ring.rotation.z = time * 0.4;
                }
            });
        }

        // 8. Starfield Drift
        if (this.starfield) {
            this.starfield.rotation.y = time * 0.015 + this.mouse.x * 0.06;
            this.starfield.rotation.x = Math.sin(time * 0.03) * 0.02 - this.mouse.y * 0.05;
        }

        // 9. Shockwave Rings Update
        for (let i = this.shockwaves.length - 1; i >= 0; i--) {
            const shock = this.shockwaves[i];
            shock.userData.scale += 0.28;
            shock.userData.life -= 0.032;
            shock.scale.set(shock.userData.scale, shock.userData.scale, 1);
            shock.material.opacity = shock.userData.life;

            if (shock.userData.life <= 0) {
                this.scene.remove(shock);
                shock.geometry.dispose();
                shock.material.dispose();
                this.shockwaves.splice(i, 1);
            }
        }

        // 10. Sparks Update
        for (let i = this.sparkParticles.length - 1; i >= 0; i--) {
            const spark = this.sparkParticles[i];
            spark.position.x += spark.userData.vx;
            spark.position.y += spark.userData.vy;
            spark.position.z += spark.userData.vz;
            spark.userData.life -= 0.028;
            spark.material.opacity = spark.userData.life;

            if (spark.userData.life <= 0) {
                this.scene.remove(spark);
                spark.geometry.dispose();
                spark.material.dispose();
                this.sparkParticles.splice(i, 1);
            }
        }

        this.renderer.render(this.scene, this.camera);
    }
}
