# visit-monitor

## 引入 JS 使用

### 1. HTML 结构
```html
<div id="visit-counter" class="visit-counter">统计数据加载中...</div>
```

### 2. 引入 JS
```html
<script src="https://unpkg.com/visit-monitor@latest/dist/visit-monitor.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/visit-monitor@latest/dist/visit-monitor.min.js"></script>
```

### 3. 使用
```html
<script>
    document.addEventListener('DOMContentLoaded', () => {
        const monitor = new VisitMonitor({
            apiUrl: '自己部署的api地址/api/log-visit',
        });

        monitor.onUpdate((pv, uv) => {
            const counterElement = document.getElementById('visit-counter');
            counterElement.innerHTML = `
                <span>访问次数：<strong>${pv}</strong></span> |
                <span>访客数量：<strong>${uv}</strong></span>
            `;
        });

        monitor.init();
    });
</script>
```

---

## 在 Vue 中使用

### 1. 安装
```bash
npm i visit-monitor
```

### 2. 使用
```vue
<template>
  <div class="visit-counter">
    <slot :pvCount="pvCount" :uvCount="uvCount">
      <template v-if="!pvCount && !uvCount">统计数据加载中...</template>
      <template v-else>
        <span>访问次数：<strong>{{ pvCount }}</strong></span> |
        <span>访客数量：<strong>{{ uvCount }}</strong></span>
      </template>
    </slot>
  </div>
</template>

<script setup>
import VisitMonitor from "visit-monitor";

const pvCount = ref();
const uvCount = ref();

onMounted(() => {
    const monitor = new VisitMonitor({
        apiUrl: "自己部署的api地址/api/log-visit",
    });

    monitor.onUpdate((pv, uv) => {
        pvCount.value = pv;
        uvCount.value = uv;
    });

    monitor.init();
});
</script>
```

---

## 在 React 中使用

### 1. 安装
```bash
npm install visit-monitor
```

### 2. 使用
```javascript
// VisitCounter.jsx
import React, { useEffect, useState } from 'react';
import VisitMonitor from 'visit-monitor';

const VisitCounter = () => {
    const [pvCount, setPvCount] = useState(null);
    const [uvCount, setUvCount] = useState(null);

    useEffect(() => {
        const monitor = new VisitMonitor({
            apiUrl: '自己部署的api地址/api/log-visit',
        });

        monitor.onUpdate((pv, uv) => {
            setPvCount(pv);
            setUvCount(uv);
        });

        monitor.init();
    }, []);

    return (
        <div className="visit-counter">
            {pvCount === null && uvCount === null ? (
                <span>统计数据加载中...</span>
            ) : (
                <>
                    <span>访问次数：<strong>{pvCount}</strong></span> |
                    <span>访客数量：<strong>{uvCount}</strong></span>
                </>
            )}
        </div>
    );
};

export default VisitCounter;
```

---

## NPM 使用淘宝源发布问题

### 解决方法：临时使用官方源登录并发布

```bash
npm login --registry=https://registry.npmjs.org/
npm publish --registry=https://registry.npmjs.org/
```
