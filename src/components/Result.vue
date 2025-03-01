<script setup>
import {onMounted, reactive, ref} from "vue";
import * as echarts from "echarts";

const finalResult = JSON.parse(localStorage.getItem("finalResult"))
const scores = reactive([]);
const gaugeChartRef = ref(null);
const barChartRef = ref(null);
let improveSituations = ref(null);


for (const key in finalResult.results) {
  if (key != "OverallScore") {
    scores.push(finalResult.results[key]);
  }
}

onMounted(() => {
  if (gaugeChartRef.value) {
    const gaugeChart = echarts.init(gaugeChartRef.value);

    const gaugeChartOption = {
      series: [
        {
          type: "gauge",
          startAngle: 200,
          endAngle: -20,
          min: 0,
          max: 5,
          splitNumber: 5,
          radius: "100%",
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
            length: 10,
            lineStyle: {color: "#34495e"}
          },
          splitLine: {
            length: 15,
            lineStyle: {color: "#34495e", width: 2}
          },
          axisLabel: {
            fontSize: 20,
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
            formatter: function (value) {
              return `📊 امتیاز شاخص: ${value.toFixed(1)}`;
            },
            fontSize: 18,
            fontWeight: "bold",
            fontFamily: "BYekan",
            color: "#2c3e50",
            offsetCenter: [0, "60%"],
            textShadowColor: "rgba(0, 0, 0, 0.3)",
          },
          data: [{value: finalResult.results.OverallScore}],
        }
      ]
    };

    gaugeChart.setOption(gaugeChartOption);
    window.addEventListener("resize", () => gaugeChart.resize());
  }

  if (barChartRef.value) {
    const barChart = echarts.init(barChartRef.value);

    const barChartOption = {
      title: {
        text: "تحلیل شاخص‌های فروش و مارکتینگ",
        left: "center",
        textStyle: {
          fontFamily: "BYekan",
          fontSize: 18,
          fontWeight: "bold",
          color: "#2c3e50"
        },
        subtextStyle: {
          fontFamily: "BYekan",
          fontSize: 18,

          color: "#7f8c8d"
        }
      },
      tooltip: {
        trigger: "axis",
        axisPointer: {type: "shadow"}
      },
      grid: {
        left: "200px",
        right: "200px",
        top: "80px",
        bottom: "40px"
      },
      xAxis: {
        type: "value",
        max: 5,
        axisLine: {show: true},
        splitLine: {show: true}
      },
      yAxis: {
        type: "category",
        textStyle: {
          fontsize: 20
        },
        data: [
          "فعالیت‌های صادراتی",
          "شناخت بازار هدف",
          "سوابق فروش",
          "روش‌های فروش و مارکتینگ",
          "کانال‌های توزیع و فروش",
          "سهم بازار",
          "برندینگ"
        ],
        axisLabel: {
          textStyle: {
            fontFamily: "BYekan",
            fontSize: 18,
            color: "#34495e",
          },
          options: {
            layout: {
              paddingRight: 20,
            }
          }
        }
      },
      series: [
        {
          name: "مقدار",
          type: "bar",
          data: [
            finalResult.results.ExportActivities,
            finalResult.results.TargetMarketKnowledge,
            finalResult.results.SalesHistory,
            finalResult.results.MarketingandSalesStrategy,
            finalResult.results.DistributionandSalesChannels,
            finalResult.results.MarketShare,
            finalResult.results.Branding
          ],
          barWidth: 25,
          itemStyle: {
            color: function (params) {
              let value = params.value;
              let colorScale = [
                {threshold: 0, color: "#c0392b"},
                {threshold: 1, color: "#e67e22"},
                {threshold: 2, color: "#ffe32f"},
                {threshold: 3, color: "#2ac56b"},
                {threshold: 4, color: "#208f4f"}
              ];
              for (let i = colorScale.length - 1; i >= 0; i--) {
                if (value >= colorScale[i].threshold) {
                  return new echarts.graphic.LinearGradient(1, 0, 0, 0, [
                    {offset: 1, color: colorScale[i].color}
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
            fontSize: 18,
            fontWeight: "bold",
            formatter: function (params) {
              return params.value.toFixed(2);
            },
            fontFamily: "BYekan"
          }
        }
      ]
    };

    barChart.setOption(barChartOption);
    window.addEventListener("resize", () => barChart.resize());
  }
});

fetch("/improveSituation.json").then((res) => res.json())
  .then((resData) => {
      improveSituations.value = resData.sales_and_marketing
    }
  )

function setIndex(index) {
  if (scores[index] >= 0 && scores[index] < 1) {
    return 1;
  } else if (scores[index] >= 1 && scores[index] < 2) {
    return 2;
  } else if (scores[index] >= 2 && scores[index] < 3) {
    return 3;
  } else if (scores[index] >= 3 && scores[index] < 4) {
    return 4;
  } else if (scores[index] >= 4 && scores[index] <= 5) {
    return 5;
  }
}

</script>

<template>
  <div class="main">
    <div class="logo">
      <img src="../assets/logo.png" alt="">
    </div>
    <h2> گزارش عارضه یابی فروش و مارکتینگ <br> <span>شرکت {{ finalResult.company.name }}</span></h2>
    <div class="textAndChart">
      <p>
        رقابت شدید و سرعت تغییرات در بازارها و روندهای پیش بینی نشده اقتصادی باعث شده تا اهمیت توجه
        به
        بازاریابی و فروش نسبت به چند سال گذشته دو چندان گردد. لزوم برنامه ریزی منظم و رعایت اصول
        بازاریابی و فروش از عوامل حیاتی حفظ و نگه داشت جایگاه کسب و کارها در دنیای امروز است. باتوجه
        به اهمیت این واحد، لازم است معیار های استاندارد برای سنجش فرآیندهای فروش و مارکتینگ طراحی و
        وضعیت چگونگی انجام کار هر یک مشخص شود.
        KPI های فروش شاخص‌های برجسته‌ای هستند که به یک رهبر فروش، مدیر فروش و تیم فروش کمک می‌کنند
        تا
        میزان پیشرفت خود را در رسیدن به اهداف فروش و اهداف سازمانی تعیین کنند. یک واحد فروش موفق، به
        داده‌های فروش صحیح دسترسی دارد. با استفاده از KPI، بخش فروش شما می‌تواند:
        <br>
        • پیشرفت خود را در دستیابی به اهداف پیگیری کند.
        <br>
        • فرآیند شناسایی، جذب و نگهداشت مشتریان خود را بهینه کند.
        <br>
        • بهبود جریان درآمد را عملی کند.

      </p>
      <div class="gaugeChart" ref="gaugeChartRef"></div>
    </div>
    <div class="charts">
      <div class="barChart" ref="barChartRef"></div>
    </div>

    <h2 style="color: #0056b3">پیشنهاداتی برای بهبود عملکرد</h2>
    <div class="improveSituation" v-for="(improveSituation , index) in improveSituations"
         :key="index">
      <h4>{{ improveSituation[0] }}</h4>
      <pre>
        {{ improveSituation[setIndex(index)] }}
      </pre>
      <hr style="height: 2px; background-color: black">

    </div>
    <p class="finalText">
      شما میتوانید برای دریافت راهنمایی بیشتر و استفاده از نظرات تخصصی مشاوران فروش و مارکتینگ شرکت
      دانش بنیان شبکه نوآوری آرمانی با شماره های
      <a href="tel:+982332300357">32300357-023</a>
      یا
      <br>
      <a href="tel:+989046504331">09046504331</a>
      تماس حاصل نمایید.
    </p>
  </div>
</template>

<style scoped>
@font-face {
  font-family: BYekan;
  src: url("./../assets/BYekan+.ttf");
}

.main {
  width: 80%;
  min-width: 300px;
  height: auto;
  background-color: #ffffff;
  border-radius: 15px;
  box-shadow: 0 0 20px 1px rgba(0, 0, 0, 0.2);
  box-sizing: border-box;
  padding: 5vh 5vw;
  position: relative;
  margin: 5vh auto;
}

.main span {
  font-size: 18px;
}

.main .logo {
  width: 100%;
  height: 16vh;
  display: flex;
  justify-content: start;
}

.main .logo img {
  width: 10%;
  height: 100%;
}

.main p {
  width: 50%;
  text-align: justify;
}

.main .textAndChart {
  width: 100%;
  display: flex;
  margin-bottom: 15vh;
}

.main .charts {
  direction: ltr;
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.main .gaugeChart {
  width: 35vw;
  margin: 0 auto;
}

.main .barChart {
  width: 100%;
  height: 500px;
  margin: 0 auto;
}

.main h3 {
  color: #0056b3;
}

.main .improveSituation pre {
  font-family: "B Yekan", cursive;
  white-space: pre-wrap;
  word-wrap: break-word;
}

.main .finalText {
  width: 100%;
  text-align: center;
}

.main .finalText a {
  color: black;
  text-decoration: none;
}

@media screen and (max-width: 768px) {
  .main {
    width: 90%;
    padding: 4vh 4vw;
  }

  .main p {
    width: 100%;
  }

  .main .textAndChart {
    flex-direction: column;
    align-items: center;
    gap: 5vh;
  }

  .main .gaugeChart {
    width: 80%;
  }

  .main .barChart {
    height: 250px;
  }

  .main .finalText {
    text-align: center;
  }
}

@media screen and (max-width: 1024px) {
  .main {
    width: 80%;
  }

  .main .textAndChart {
    flex-direction: column;
  }

  .main .gaugeChart {
    width: 40vw;
  }
}

</style>
