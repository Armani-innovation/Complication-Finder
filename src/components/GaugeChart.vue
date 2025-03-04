<!--<script setup>-->
<!--import * as echarts from "echarts";-->
<!--import {onMounted, ref} from "vue";-->

<!--const props = defineProps(["value"])-->

<!--const gaugeChartRef = ref(null);-->

<!--onMounted(()=>{-->
<!--  if (gaugeChartRef.value) {-->
<!--    const gaugeChart = echarts.init(gaugeChartRef.value);-->

<!--    const gaugeChartOption = {-->
<!--      series: [-->
<!--        {-->
<!--          type: "gauge",-->
<!--          startAngle: 200,-->
<!--          endAngle: -20,-->
<!--          min: 0,-->
<!--          max: 5,-->
<!--          splitNumber: 5,-->
<!--          radius: "100%",-->
<!--          axisLine: {-->
<!--            lineStyle: {-->
<!--              width: 15,-->
<!--              color: [-->
<!--                [0.2, "#e74c3c"],-->
<!--                [0.4, "#e67e22"],-->
<!--                [0.6, "#ffe32f"],-->
<!--                [0.8, "#2ac56b"],-->
<!--                [1, "#208f4f"]-->
<!--              ]-->
<!--            }-->
<!--          },-->
<!--          axisTick: {-->
<!--            length: 10,-->
<!--            lineStyle: {color: "#34495e"}-->
<!--          },-->
<!--          splitLine: {-->
<!--            length: 15,-->
<!--            lineStyle: {color: "#34495e", width: 2}-->
<!--          },-->
<!--          axisLabel: {-->
<!--            fontSize: 20,-->
<!--            fontWeight: "bold",-->
<!--            fontFamily: "BYekan",-->
<!--            color: "#34495e"-->
<!--          },-->
<!--          pointer: {-->
<!--            width: 5,-->
<!--            length: "70%",-->
<!--            itemStyle: {-->
<!--              color: "#2c3e50",-->
<!--              shadowBlur: 5,-->
<!--              shadowColor: "rgba(0, 0, 0, 0.2)",-->
<!--              shadowOffsetX: 2,-->
<!--              shadowOffsetY: 2-->
<!--            }-->
<!--          },-->
<!--          detail: {-->
<!--            formatter: function (value) {-->
<!--              return `📊 امتیاز شاخص: ${value.toFixed(2)}`;-->
<!--            },-->
<!--            fontSize: 18,-->
<!--            fontWeight: "bold",-->
<!--            fontFamily: "BYekan",-->
<!--            color: "#2c3e50",-->
<!--            offsetCenter: [0, "60%"],-->
<!--            textShadowColor: "rgba(0, 0, 0, 0.3)",-->
<!--          },-->
<!--          data: [{value: props.value}],-->
<!--        }-->
<!--      ]-->
<!--    };-->

<!--    gaugeChart.setOption(gaugeChartOption);-->
<!--    window.addEventListener("resize", () => gaugeChart.resize());-->
<!--  }-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--  <div class="gaugeChart" ref="gaugeChartRef"></div>-->
<!--</template>-->

<!--<style scoped>-->

<!--</style>-->


<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps(["value"]);

const gaugeChartRef = ref(null);
let gaugeChart = null;

function getResponsiveGaugeOption() {
  const containerWidth = gaugeChartRef.value?.offsetWidth || 400;
  const dynamicFontSize = Math.max(12, containerWidth / 25);

  return {
    series: [
      {
        type: "gauge",
        startAngle: 200,
        endAngle: -20,
        min: 0,
        max: 5,
        splitNumber: 5,
        radius: containerWidth < 500 ? "80%" : "100%",
        axisLine: {
          lineStyle: {
            width: 15,
            color: [
              [0.2, "#e74c3c"],
              [0.4, "#e67e22"],
              [0.6, "#ffe32f"],
              [0.8, "#2ac56b"],
              [1, "#208f4f"]
            ]
          }
        },
        axisTick: {
          length: 8,
          lineStyle: { color: "#34495e" }
        },
        splitLine: {
          length: 12,
          lineStyle: { color: "#34495e", width: 2 }
        },
        axisLabel: {
          fontSize: dynamicFontSize,
          fontWeight: "bold",
          fontFamily: "BYekan",
          color: "#34495e"
        },
        pointer: {
          width: 5,
          length: "70%",
          itemStyle: {
            color: "#2c3e50",
            shadowBlur: 5,
            shadowColor: "rgba(0, 0, 0, 0.2)",
            shadowOffsetX: 2,
            shadowOffsetY: 2
          }
        },
        detail: {
          formatter: value => `📊 امتیاز شاخص: ${value.toFixed(2)}`,
          fontSize: dynamicFontSize * 0.8,
          fontWeight: "bold",
          fontFamily: "BYekan",
          color: "#2c3e50",
          offsetCenter: containerWidth < 500 ? [0, "40%"] : [0, "60%"],
          textShadowColor: "rgba(0, 0, 0, 0.3)"
        },
        data: [{ value: props.value }]
      }
    ]
  };
}

function initGaugeChart() {
  if (gaugeChartRef.value) {
    gaugeChart = echarts.init(gaugeChartRef.value);
    gaugeChart.setOption(getResponsiveGaugeOption());
  }
}

let resizeTimer = null;
function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (gaugeChart) {
      gaugeChart.resize();
      gaugeChart.setOption(getResponsiveGaugeOption());
    }
  }, 300);
}

watch(() => props.value, (newValue) => {
  if (gaugeChart) {
    gaugeChart.setOption({
      series: [{ data: [{ value: newValue }] }]
    });
  }
});

onMounted(() => {
  initGaugeChart();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (gaugeChart) {
    gaugeChart.dispose();
    gaugeChart = null;
  }
});
</script>

<template>
  <div class="gaugeChart" ref="gaugeChartRef"></div>
</template>

<style scoped>
.gaugeChart {
  width: 100%;
  height: 300px;
}
</style>
