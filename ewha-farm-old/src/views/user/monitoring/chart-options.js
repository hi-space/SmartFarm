export default {
    revenuechartOptions: {
        chart: {
            toolbar: {
                show: false
            },
            dropShadow: {
                enabled: true,
                top: 5,
                left: 0,
                blur: 4,
                opacity: 0.10
            }
        },
        stroke: {
            curve: 'smooth',
            dashArray: [0, 8],
            width: [4, 2]
        },
        grid: {
            borderColor: '#e7e7e7'
        },
        legend: {
            show: false
        },
        colors: ['#F97794', '#b8c2cc'],
        fill: {
            type: 'gradient',
            gradient: {
                shade: 'dark',
                inverseColors: false,
                gradientToColors: ['#7367F0', '#b8c2cc'],
                shadeIntensity: 1,
                type: 'horizontal',
                opacityFrom: 1,
                opacityTo: 1,
                stops: [0, 100, 100, 100]
            }
        },
        markers: {
            size: 0,
            hover: {
                size: 5
            }
        },
        xaxis: {
            labels: {
                style: {
                    cssClass: 'text-grey fill-current'
                }
            },
            axisTicks: {
                show: false
            },
            categories: ['01', '05', '09', '13', '17', '21', '26', '31'],
            axisBorder: {
                show: false
            }
        },
        yaxis: {
            tickAmount: 5,
            labels: {
                style: {
                    cssClass: 'text-grey fill-current'
                },
                formatter(val) {
                    return val > 999 ? `${(val / 1000).toFixed(1)}k` : val
                }
            }
        },
        tooltip: {
            x: {
                show: false
            }
        }
    }
}