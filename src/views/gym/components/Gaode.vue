<template>
  <div ref="wrapRef" :style="{ height, width }"></div>
</template>
<script lang="ts">
  import { defineComponent, ref, nextTick, unref, onMounted } from 'vue';

  import { useScript } from '/@/hooks/web/useScript';

  const A_MAP_URL = 'https://webapi.amap.com/maps?v=2.0&key=3d34a78642a6d5fd2e80361e2d8b29e9';

  export default defineComponent({
    name: 'AMap',
    props: {
      width: {
        type: String,
        default: '100%',
      },
      height: {
        type: String,
        default: 'calc(100vh - 78px)',
      },
      x: {
        type: String,
      },
      y: {
        type: String,
      },
    },
    setup(props) {
      const wrapRef = ref<HTMLDivElement | null>(null);
      const { toPromise } = useScript({ src: A_MAP_URL });

      async function initMap() {
        await toPromise();
        await nextTick();
        const wrapEl = unref(wrapRef);
        if (!wrapEl) return;
        const AMap = (window as any).AMap;
        let xx = parseFloat(props.x);
        let yy = parseFloat(props.y);

        var map = new AMap.Map(wrapEl, {
          zoom: 15,
          center: [xx, yy],
          viewMode: '3D',
        });

        var marker = new AMap.Marker({
          position: map.getCenter(), //标记的位置坐标
          title: '',
          zoom: 15,
        });

        map.add(marker); //将创建好的marker放到地图上面
      }

      onMounted(() => {
        initMap();
      });

      return { wrapRef };
    },
  });
</script>
