<template>
     <div class="vx-row">
            <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="EyeIcon"
                  statistic="36.9k"
                  statisticTitle="Views" />
            </div>

            <div class="vx-col w-1/2 md:w-1/3 xl:w-1/6">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="MessageSquareIcon"
                  statisticTitle="Comments"
                  statistic="12k"
                  color="success" />
            </div>
     </div>

</template>

<script>
import StatisticsCardLine from '@/views/components/statistics-cards/StatisticsCardLine.vue'

export default {
    components: {
        StatisticsCardLine
    },
}
</script>
