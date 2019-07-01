<template>
    <div>
        <!--floor one area-->
        <div class="floor">
            <div class="floor-title">{{floorTitle}}</div>
            <div class="floor-anomaly" >
                <div class="floor-one"><img :src="floorData0.image" width="100%" @click=" goGoodsInfo(floorData0.goodsId)" /></div>
                <div>
                    <div class="floor-two"><img :src="floorData1.image" width="100%" @click=" goGoodsInfo(floorData1.goodsId)" /></div>
                    <div><img :src="floorData2.image" width="100%"  @click=" goGoodsInfo(floorData2.goodsId)"/></div>
                </div>
            </div>
            <div class="floor-rule">
                <div v-for="(item ,index) in floorData.slice(3)" :key="index">
                    <img :src="item.image" width="100%" @click=" goGoodsInfo(item.goodsId)"/>
                </div>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        props:['floorData','floorTitle'],
        data() {
            return {
                floorData0:{},
                floorData1:{},
                floorData2:{},
            }
        },
        created(){
            //这里写得不到数据，应为数据是延迟返回的
            
        },
        methods:{
            goGoodsInfo(id){
            console.log(id)

    //   this.$router.push({name:"Goods",params:{goodsId:id}})

            }
        },
        watch:{
            floorData:function(val){
                // console.log(this.floorData)
                this.floorData0=this.floorData[0]
                this.floorData1=this.floorData[1]
                this.floorData2=this.floorData[2]
            }
        }

    }
</script>

<style>
 @import "../../assets/css/FloorComponent.css";
</style>