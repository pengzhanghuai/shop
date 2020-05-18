<template>
    <div>
        <router-view></router-view>
        <v-tab></v-tab>
    </div>
</template>

<script>
import vTab from "../views/Tabbar"
export default {
    components:{
        vTab
    }
}   
</script>

<style>

</style>