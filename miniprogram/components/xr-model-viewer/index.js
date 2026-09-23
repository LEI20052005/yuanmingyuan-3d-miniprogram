// components/xr-model-viewer/index.js
// xr-frame 3D 模型查看器组件
// 功能：加载 GLB 模型，支持单指旋转、双指缩放、自动旋转、加载进度上报
Component({
  properties: {
    modelUrl: {
      type: String,
      value: ''
    },
    artifactName: {
      type: String,
      value: '文物修复'
    },
    width: {
      type: Number,
      value: 375
    },
    height: {
      type: Number,
      value: 600
    }
  },

  data: {},

  lifetimes: {
    ready() {
      // xr-frame 场景实例（通过 selectComponent 获取）
      this.sceneEl = null;
      // 模型节点
      this.modelNode = null;
      // 旋转/缩放参数
      this.rotX = -10;          // 初始俯仰角（度）
      this.rotY = 0;            // 初始水平角（度）
      this.scaleVal = 1;        // 模型缩放
      this.touchMode = 0;       // 0=无触摸 1=单指 2=双指
      this.lastX = 0;
      this.lastY = 0;
      this.lastDist = 0;
      this.autoRotate = true;   // 是否自动旋转
      // 等待场景可用后再获取元素
      setTimeout(() => {
        this.initScene();
      }, 100);
    }
  },

  methods: {
    initScene() {
      try {
        this.sceneEl = this.selectComponent('#scene');
      } catch (e) {
        console.warn('xr-scene 获取失败', e);
      }
    },

    // 资源加载完成
    handleAssetsLoaded(event) {
      const detail = (event && event.detail) || {};
      const errors = detail.errors;
      if (errors && errors.length) {
        console.error('模型加载失败', errors);
        this.triggerEvent('loaderror', { message: '模型加载失败', errors });
      } else {
        console.log('模型加载成功');
        this.getModelNode();
        this.triggerEvent('loaded');
      }
    },

    // 资源加载进度
    handleAssetsProgress(event) {
      const detail = (event && event.detail) || {};
      const progress = detail.progress || 0;
      this.triggerEvent('progress', { progress });
    },

    getModelNode() {
      if (!this.sceneEl) return;
      try {
        this.modelNode = this.sceneEl.getElementById('model-node');
        // 应用初始旋转
        this.applyTransform();
      } catch (e) {
        console.warn('获取模型节点失败', e);
      }
    },

    // ============ 触摸交互 ============
    onTouchStart(e) {
      const touches = (e && e.touches) || [];
      if (!touches.length) return;
      // 用户触摸时暂停自动旋转
      this.autoRotate = false;

      if (touches.length === 1) {
        this.touchMode = 1;
        this.lastX = touches[0].clientX;
        this.lastY = touches[0].clientY;
      } else if (touches.length >= 2) {
        this.touchMode = 2;
        this.lastDist = this.getDistance(touches);
      }
    },

    onTouchMove(e) {
      const touches = (e && e.touches) || [];
      if (!touches.length) return;

      // 单指旋转
      if (this.touchMode === 1 && touches.length === 1) {
        const dx = touches[0].clientX - this.lastX;
        const dy = touches[0].clientY - this.lastY;
        this.rotY += dx * 0.4;
        this.rotX = Math.max(-80, Math.min(80, this.rotX + dy * 0.4));
        this.lastX = touches[0].clientX;
        this.lastY = touches[0].clientY;
        this.applyTransform();
      }
      // 双指缩放
      else if (this.touchMode >= 2 && touches.length >= 2) {
        const dist = this.getDistance(touches);
        if (this.lastDist > 0) {
          this.scaleVal *= this.lastDist / dist;
          this.scaleVal = Math.max(0.3, Math.min(5, this.scaleVal));
        }
        this.lastDist = dist;
        this.applyTransform();
      }
    },

    onTouchEnd(e) {
      this.touchMode = ((e && e.touches) || []).length;
      if (this.touchMode === 0) {
        this.autoRotate = true; // 松手后恢复自动旋转
      }
    },

    onTouchCancel() {
      this.touchMode = 0;
      this.autoRotate = true;
    },

    // 每帧自动旋转
    onTick() {
      if (this.autoRotate && this.modelNode) {
        this.rotY += 0.4;
        this.applyTransform();
      }
    },

    getDistance(touches) {
      return Math.sqrt(
        (touches[0].clientX - touches[1].clientX) ** 2 +
        (touches[0].clientY - touches[1].clientY) ** 2
      );
    },

    applyTransform() {
      const node = this.modelNode;
      if (!node) return;
      try {
        node.setAttribute('rotation', { x: this.rotX, y: this.rotY, z: 0 });
        node.setAttribute('scale', { x: this.scaleVal, y: this.scaleVal, z: this.scaleVal });
      } catch (e) {
        // 节点尚未就绪时忽略
      }
    }
  }
});
