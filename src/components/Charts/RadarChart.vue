<script setup>
import * as echarts from "echarts";
import { onMounted, ref, watch } from "vue";

const props = defineProps(["keys" , "values"]);

const radarChartRef = ref(null);

const drawRadarChart = () => {
  if (radarChartRef.value) {
    const radarChart = echarts.init(radarChartRef.value);

    const options = {
      title: {
        text: "تحلیل شاخص‌ها",
        left: "center",
        textStyle: {
          fontFamily: "BYekan",
          fontSize: 20,
          fontWeight: "bold",
          color: "#2c3e50"
        }
      },
      tooltip: {
        trigger: "item"
      },
      radar: {
        shape: 'polygon',
        radius: '60%',
        indicator: props.keys.map(key => ({
          name: key,
          max: 5
        })),
        axisName: {
          color: '#34495e',
          fontFamily: "BYekan",
          fontSize: 14,
          overflow: 'break'
        },
        splitLine: {
          lineStyle: {
            color: ['#ddd', '#ccc', '#bbb', '#aaa', '#888']
          }
        }
      },
      series: [
        {
          name: 'امتیازدهی شاخص‌ها',
          type: 'radar',
          data: [
            {
              value: props.values,
              name: 'امتیاز',
              areaStyle: {
                color: 'rgba(46, 204, 113, 0.3)'
              },
              lineStyle: {
                width: 3,
                color: '#2ecc71'
              },
              itemStyle: {
                color: '#27ae60'
              }
            }
          ]
        }
      ]
    };

    radarChart.setOption(options);
    window.addEventListener("resize", () => radarChart.resize());
  }
};

onMounted(drawRadarChart);

watch(() => [props.values, props.keys], drawRadarChart);
</script>

<template>
  <div ref="radarChartRef" style="width: 100%; height: 500px;"></div>
</template>

<style scoped>

</style>
