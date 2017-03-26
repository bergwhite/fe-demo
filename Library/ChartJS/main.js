// 定义一个对象用来存储图表数据

var data = {
  // 分类数据
  labels: ['狗','兔','猫'],
  // 分组信息
  datasets: [
    // 第一组信息
    {
      // 第一组信息的标题
      label: '小明家的',
      // 第一组信息的数值
      data: [85,88,86],
      // 第一组信息的背景颜色
      backgroundColor: [
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 99, 132, 0.5)',
        'rgba(255, 99, 132, 0.5)'
      ],
      // 第一组信息的边框颜色
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)',
        'rgba(255,99,132,1)'
      ],
      // 第一组信息的边框宽度
      borderWidth: 1
    },
    // 第二组信息
    {
      label: '小红家的',
      data: [85,88,96],
      backgroundColor: [
        'rgba(54, 162, 235, 0.5)',
        'rgba(54, 162, 235, 0.5)',
        'rgba(54, 162, 235, 0.5)'
      ],
      borderColor: [
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(54, 162, 235, 1)'
      ],
      borderWidth: 1
    }
  ]
}

// 获取画布元素的2d内容
var ctx = document.getElementById('tryChart').getContext('2d')

// 创建一个图表对象
// 传入画布元素以及图表数据
var tryChart = new Chart( ctx, {
  type: 'bar',
  data: data,
  options: {
    responsive: true
  }
})