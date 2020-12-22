<template>
    <div id="demo-basic-card">
        <div class="vx-row">
           


            <!-- OVERLAY CARD 2 -->
            <div class="vx-col w-full lg:w-1/3 sm:w-1/2 mb-base">
                <vx-card class="overlay-card overflow-hidden">
                    <template slot="no-body">
                        <img :src="card_8.overlay_img" alt="user-profile-cover" class="responsive blur-1">
                        <div class="card-overlay text-white">
                            <div class="flex flex-col justify-between h-full">
                                <div class="text-center mt-8 w-full">
                                    <h3 class="text-white mb-2 tracking-wide">{{ card_8.weather }}</h3>
                                    <p class="mb-6">{{ card_8.place_name }}</p>
                                    <div class="flex justify-around">
                                        <feather-icon :icon="card_8.weather_icon" svgClasses="w-24 h-24 text-white" />
                                        <h2 class="text-white text-big">{{ card_8.temperature }} <sup class="text-2xl">o</sup> </h2>
                                    </div>
                                </div>
                                <div class="text-center w-full">
                                    <div
                                      class="flex justify-between px-8 mb-8 text-xl"
                                      v-for="meta in card_8.meta"
                                      :key="meta.label">
                                        <span>{{ meta.label }}</span>
                                        <span>{{ meta.value }}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </template>
                </vx-card>
            </div>

            <!-- CONTENT CARD - ICONS -->
            <div class="vx-col w-full lg:w-1/3 sm:w-1/2 mb-base">
                <vx-card :title="card_9.title" :subtitle="card_9.subtitle" v-if="card_9.title">
                    <template slot="actions">
                        <feather-icon icon="MoreVerticalIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
                    </template>
                    <img :src="card_9.img" alt="content-img" class="responsive rounded-lg">
                    <div class="flex mt-6 flex-wrap">
                        <span class="flex mr-6">
                          <feather-icon class="cursor-pointer" icon="ThumbsUpIcon" svgClasses="text-success stroke-current h-6 w-6" />
                          <span class="ml-2">{{ card_9.meta.likes }}</span>
                        </span>
                        <span class="flex mr-6">
                          <feather-icon class="cursor-pointer" icon="MessageSquareIcon" svgClasses="text-primary stroke-current h-6 w-6" />
                          <span class="ml-2">{{ card_9.meta.comments }}</span>
                        </span>
                        <span class="flex mr-6">
                          <feather-icon class="cursor-pointer" icon="ThumbsDownIcon" svgClasses="text-danger stroke-current h-6 w-6" />
                          <span class="ml-2">{{ card_9.meta.dislikes }}</span>
                        </span>
                    </div>
                </vx-card>
            </div>

            <div class="vx-col w-full lg:w-2/3 mb-base">
                <vx-card class="overflow-hidden">
                    <template slot="no-body">
                        <video-player ref="player" class="media-video-player card-video" :options="playerOptions" />
                    </template>
                </vx-card>
            </div>

            <!-- ACTIVITY TIMELINE -->
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 mb-base">
                <vx-card title="Activity Timeline">
                    <vx-timeline :data="timelineData"></vx-timeline>
                </vx-card>
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 mb-base">
                <vx-card title="Contact Form">
                    <vs-input placeholder="Name" class="w-full mb-4" v-model="name" />
                    <vs-input placeholder="Email" type="email" class="w-full mb-4" v-model="email" />
                    <vs-textarea label="Message" v-model="msg" />
                    <vs-button class="mr-4" @click="name = email = msg =''">Submit</vs-button>
                    <vs-button type="border" color="warning" @click="name = email = msg =''" class="mt-3">Cancel</vs-button>
                </vx-card>
            </div>
        </div>

    </div>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import { videoPlayer }     from 'vue-video-player'
import VxTimeline          from '@/components/timeline/VxTimeline.vue'
import 'video.js/dist/video-js.css'


export default{
  components: {
    VuePerfectScrollbar,
    videoPlayer,
    VxTimeline
  },
  data () {
    return {
      // card 1
      card_1: {},
      card_2: {},
      card_3: {},
      card_4: {},
      card_5: {},
      card_6: {},
      card_7: {},
      card_8: {
        "overlay_img": "https://d279m997dpfwgl.cloudfront.net/wp/2017/12/weather_album-art-1000x1000.jpg",
        "weather": "Snowy",
        "place_name": "Seoul",
        "weather_icon": "CloudSnowIcon",
        "temperature": "-6",
        "meta": [
          
          {
            "label": "Humidity",
            "value": "60%"
          },
          {
            "label": "Wind",
            "value": "4823km/h"
          }
        ]        
      },

      chatLog: [],
      chatMsgInput: '',

      card_9: {},

      timelineData: [
        {
          color : 'primary',
          icon  : 'PlusIcon',
          title : 'New Task Added',
          desc  : 'Bonbon macaroon jelly beans gummi bears jelly lollipop apple',
          time  : '25 Days Ago'
        },
        {
          color : 'warning',
          icon  : 'AlertCircleIcon',
          title : 'Task Update Found',
          desc  : 'Cupcake gummi bears soufflé caramels candy',
          time  : '15 Days Ago'
        },
        {
          color : 'success',
          icon  : 'CheckIcon',
          title : 'Task Finished',
          desc  : 'Candy ice cream cake. Halvah gummi bears',
          time  : '20 mins ago'
        }
      ],

      name  : '',
      email : '',
      msg   : '',

      playerOptions: {},
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  computed: {
    scrollbarTag () { return this.$store.getters.scrollbarTag }
  },
  mounted () {
    const scroll_el = this.$refs.chatLogPS.$el || this.$refs.chatLogPS
    scroll_el.scrollTop = this.$refs.chatLog.scrollHeight
  },
  created () {
    // Card 1
    this.$http.get('/api/users/pixinvent/product/1')
      .then((response) => { this.card_1 = response.data })
      .catch((error)   => { console.log(error) })
  }
}
</script>

<style lang="scss">
#demo-basic-card {
    .overlay-card {
        .vx-card__collapsible-content {
            max-height: 485px;
        }
    }

    .chat-card-log {
        height: 360px;

        .chat-sent-msg {
            background-color: #f2f4f7 !important;
        }
    }

    .card-video {
        .video-js {
            height: 370px;
        }
    }
}
</style>
