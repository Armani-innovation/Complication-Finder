<!--<script setup>-->
<!--import * as echarts from "echarts";-->
<!--import {onMounted, ref} from "vue";-->

<!--const barChartRef = ref(null);-->

<!--const props = defineProps(["values" , "keys"])-->

<!--onMounted(() => {-->
<!--  if (barChartRef.value) {-->
<!--    const barChart = echarts.init(barChartRef.value);-->

<!--    const barChartOption = {-->
<!--      title: {-->
<!--        text: "تحلیل شاخص‌ها",-->
<!--        left: "center",-->
<!--        textStyle: {-->
<!--          fontFamily: "BYekan",-->
<!--          fontSize: 18,-->
<!--          fontWeight: "bold",-->
<!--          color: "#2c3e50"-->
<!--        },-->
<!--        subtextStyle: {-->
<!--          fontFamily: "BYekan",-->
<!--          fontSize: 18,-->

<!--          color: "#7f8c8d"-->
<!--        }-->
<!--      },-->
<!--      tooltip: {-->
<!--        trigger: "axis",-->
<!--        axisPointer: {type: "shadow"}-->
<!--      },-->
<!--      grid: {-->
<!--        left: "200px",-->
<!--        right: "200px",-->
<!--        top: "80px",-->
<!--        bottom: "40px"-->
<!--      },-->
<!--      xAxis: {-->
<!--        type: "value",-->
<!--        max: 5,-->
<!--        axisLine: {show: true},-->
<!--        splitLine: {show: true}-->
<!--      },-->
<!--      yAxis: {-->
<!--        type: "category",-->
<!--        textStyle: {-->
<!--          fontsize: 20-->
<!--        },-->
<!--        data: props.keys,-->
<!--        axisLabel: {-->
<!--          textStyle: {-->
<!--            fontFamily: "BYekan",-->
<!--            fontSize: 18,-->
<!--            color: "#34495e",-->
<!--          },-->
<!--          overflow: "break"-->
<!--        }-->
<!--      },-->
<!--      series: [-->
<!--        {-->
<!--          name: "مقدار",-->
<!--          type: "bar",-->
<!--          data: props.values,-->
<!--          barWidth: 25,-->
<!--          itemStyle: {-->
<!--            color: function (params) {-->
<!--              let value = params.value;-->
<!--              let colorScale = [-->
<!--                {threshold: 0, color: "#c0392b"},-->
<!--                {threshold: 1, color: "#e67e22"},-->
<!--                {threshold: 2, color: "#ffe32f"},-->
<!--                {threshold: 3, color: "#2ac56b"},-->
<!--                {threshold: 4, color: "#208f4f"}-->
<!--              ];-->
<!--              for (let i = colorScale.length - 1; i >= 0; i&#45;&#45;) {-->
<!--                if (value >= colorScale[i].threshold) {-->
<!--                  return new echarts.graphic.LinearGradient(1, 0, 0, 0, [-->
<!--                    {offset: 1, color: colorScale[i].color}-->
<!--                  ]);-->
<!--                }-->
<!--              }-->
<!--              return "#bdc3c7";-->
<!--            },-->
<!--            shadowBlur: 5,-->
<!--            shadowColor: "rgba(0, 0, 0, 0.2)",-->
<!--            shadowOffsetX: 3,-->
<!--            shadowOffsetY: 3-->
<!--          },-->
<!--          label: {-->
<!--            show: true,-->
<!--            position: "right",-->
<!--            color: "#2c3e50",-->
<!--            fontSize: 18,-->
<!--            fontWeight: "bold",-->
<!--            formatter: function (params) {-->
<!--              return params.value.toFixed(2);-->
<!--            },-->
<!--            fontFamily: "BYekan"-->
<!--          }-->
<!--        }-->
<!--      ]-->
<!--    };-->

<!--    barChart.setOption(barChartOption);-->
<!--    window.addEventListener("resize", () => barChart.resize());-->
<!--  }-->
<!--})-->
<!--</script>-->

<!--<template>-->
<!--  <div class="barChart" ref="barChartRef"></div>-->
<!--</template>-->

<!--<style scoped>-->

<!--</style>-->


<script setup>
import * as echarts from "echarts";
import { onMounted, onUnmounted, ref, watch } from "vue";

const props = defineProps(["values", "keys"]);
const barChartRef = ref(null);
let barChart = null;

function getResponsiveBarChartOption() {
  const containerWidth = barChartRef.value?.offsetWidth || 600;
  const dynamicFontSize = Math.max(12, containerWidth / 30);

  return {
    title: {
      text: "تحلیل شاخص‌ها",
      left: "center",
      textStyle: {
        fontFamily: "BYekan",
        fontSize: dynamicFontSize * 0.5,
        fontWeight: "bold",
        color: "#2c3e50"
      },
      subtextStyle: {
        fontFamily: "BYekan",
        fontSize: dynamicFontSize * 0.5,
        color: "#7f8c8d"
      }
    },
    tooltip: {
      trigger: "axis",
      axisPointer: { type: "shadow" }
    },
    grid: {
      left: containerWidth < 768 ? "20px" : "200px",
      right: containerWidth < 768 ? "20px" : "200px",
      top: "80px",
      bottom: "40px"
    },
    xAxis: {
      type: "value",
      max: 5,
      axisLine: { show: true },
      splitLine: { show: true },
      axisLabel: {
        fontSize: dynamicFontSize * 0.5,
        fontFamily: "BYekan"
      }
    },
    yAxis: {
      type: "category",
      data: props.keys,
      axisLabel: {
        fontFamily: "BYekan",
        fontSize: dynamicFontSize * 0.5,
        color: "#34495e",
        overflow: "break"
      }
    },
    series: [
      {
        name: "مقدار",
        type: "bar",
        data: props.values,
        barWidth: Math.max(15, dynamicFontSize * 0.5),
        itemStyle: {
          color: function (params) {
            let value = params.value;
            let colorScale = [
              { threshold: 0, color: "#c0392b" },
              { threshold: 1, color: "#e67e22" },
              { threshold: 2, color: "#ffe32f" },
              { threshold: 3, color: "#2ac56b" },
              { threshold: 4, color: "#208f4f" }
            ];
            for (let i = colorScale.length - 1; i >= 0; i--) {
              if (value >= colorScale[i].threshold) {
                return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                  { offset: 1, color: colorScale[i].color }
                ]);
              }
            }
            return "#bdc3c7";
          },
          shadowBlur: 5,
          shadowColor: "rgba(0, 0, 0, 0.2)",
          shadowOffsetX: 3,
          shadowOffsetY: 3
        },
        label: {
          show: true,
          position: "right",
          color: "#2c3e50",
          fontSize: dynamicFontSize * 0.5,
          fontWeight: "bold",
          fontFamily: "BYekan",
          formatter: (params) => params.value.toFixed(2)
        }
      }
    ]
  };
}

function initBarChart() {
  if (barChartRef.value) {
    barChart = echarts.init(barChartRef.value);
    barChart.setOption(getResponsiveBarChartOption());
  }
}

let resizeTimer = null;
function handleResize() {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (barChart) {
      barChart.resize();
      barChart.setOption(getResponsiveBarChartOption());
    }
  }, 300);
}

watch(() => [props.values, props.keys], () => {
  if (barChart) {
    barChart.setOption(getResponsiveBarChartOption());
  }
}, { deep: true });

onMounted(() => {
  initBarChart();
  window.addEventListener("resize", handleResize);
});

onUnmounted(() => {
  window.removeEventListener("resize", handleResize);
  if (barChart) {
    barChart.dispose();
    barChart = null;
  }
});
</script>

<template>
  <div class="barChart" ref="barChartRef"></div>
</template>

<style scoped>
.barChart {
  width: 100%;
  height: 400px;
}

@media (max-width: 768px) {
  .barChart {
    height: 300px;
  }
}
</style>
