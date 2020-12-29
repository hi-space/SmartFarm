<template>
    <div class="vx-row">
        <div class="w-1/2">
            <cctv-player :src=cctv_url_1></cctv-player>
        </div>

        <div class="w-1/2">
            <cctv-player :src=cctv_url_2></cctv-player>
        </div>

        <div class="w-1/2">
            <cctv-player :src=cctv_url_3></cctv-player>
        </div>

        <div class="w-1/2">
            <cctv-player :src=cctv_url_4></cctv-player>
        </div>
    </div>
</template>

<script>
import CCTVPlayer from './cctv-player/CCTVPlayer.vue'

export default {
    components: {
        'cctv-player': CCTVPlayer
    },
    data() {
        return {
            cctv_url_1: "http://vjs.zencdn.net/v/oceans.mp4",
            cctv_url_2: "http://vjs.zencdn.net/v/oceans.mp4",
            cctv_url_3: "http://vjs.zencdn.net/v/oceans.mp4",
            cctv_url_4: "http://vjs.zencdn.net/v/oceans.mp4",
        }
    }
}
</script>
