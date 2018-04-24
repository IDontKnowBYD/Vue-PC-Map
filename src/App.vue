<template>
  <div id="app">
    <h1 class="heading">青岛旅游地图</h1>
    <div class="container">
      <div class="soform">
        <div id="stop">
          <a v-on:click="fchs(0)" :class="{ st: search }">搜索</a>
          <a v-on:click="fchs(1)" :class="{ st: bus }">公交</a>
          <a v-on:click="fchs(2)" :class="{ st: car }">驾驶</a>
          <a v-on:click="fchs(3)" :class="{ st: around }">周边</a>
        </div>
        <div id="sfoot">
          <div v-if="search">
            <p>0</p>
          </div>
          <div v-if="bus">
            <p>1</p>
          </div>
          <div v-if="car">
            <p>2</p>
          </div>
          <div v-if="around">
            <p>3</p>
          </div>
        </div>
      </div>
      <div class="com">
        <p class="title">青岛旅游地图</p>
        <baidu-map class="bm-view" center="青岛" mapType="BMAP_HYBRID_MAP">
      
      
        </baidu-map>
      </div>
      <div class="com">
        <p class="title">青岛热门景点</p>
        <a v-for="n in pop" :href="n.href">{{n.add}}</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data () {
    return {
      search: true,
      bus: false,
      car: false,
      around: false,
      pop: [
        {
          add: '山东泰山',
          href: 'https://baike.baidu.com/item/%E6%B3%B0%E5%B1%B1/5447?fr=aladdin'
        },
        {
          add: '山东泰山',
          href: 'https://baike.baidu.com/item/%E6%B3%B0%E5%B1%B1/5447?fr=aladdin'
        },
        {
          add: '山东泰山',
          href: 'https://baike.baidu.com/item/%E6%B3%B0%E5%B1%B1/5447?fr=aladdin'
        },
        {
          add: '山东泰山',
          href: 'https://baike.baidu.com/item/%E6%B3%B0%E5%B1%B1/5447?fr=aladdin'
        },
        {
          add: '山东泰山',
          href: 'https://baike.baidu.com/item/%E6%B3%B0%E5%B1%B1/5447?fr=aladdin'
        },
        {
          add: '山东泰山',
          href: 'https://baike.baidu.com/item/%E6%B3%B0%E5%B1%B1/5447?fr=aladdin'
        },
        {
          add: '山东泰山',
          href: 'https://baike.baidu.com/item/%E6%B3%B0%E5%B1%B1/5447?fr=aladdin'
        },
        {
          add: '山东泰山',
          href: 'https://baike.baidu.com/item/%E6%B3%B0%E5%B1%B1/5447?fr=aladdin'
        },
        {
          add: '山东泰山',
          href: 'https://baike.baidu.com/item/%E6%B3%B0%E5%B1%B1/5447?fr=aladdin'
        },
        {
          add: '山东泰山',
          href: 'https://baike.baidu.com/item/%E6%B3%B0%E5%B1%B1/5447?fr=aladdin'
        }
      ]
    }
  },
  methods: {
    fchs: function(n){
      this.search = false;
      this.bus = false;
      this.car = false;
      this.around = false;
      switch (n){
        case 0:
          this.search = true;
          break;
        case 1:
          this.bus = true;
          break;
        case 2:
          this.car = true;
          break;
        case 3:
          this.around = true;
          break;
      }
    }
  }
}
</script>

<style>
#app {
  width: 1000px;
  margin: auto;
}
.heading {
  padding: 10px;
  border-left: 5px solid #00bd4e;
  border-bottom: 1px solid #dddddd;
}
.container {
  width: 730px;
}
.soform {
  padding: 20px;
  margin-bottom: 23px;
  border: 1px solid #ddd;
  background-color: #f4f4f4;
}
#stop a {
  padding-right: 10px;
  color: #555;
  cursor: pointer;
}
#stop a.st {
  font-weight: bold;
  color: #f91;
}
.com {
  margin-bottom: 20px;
  border: 1px solid #ddd;
}
.title {
  padding: 10px;
  margin: 0px;
  background-color: #f4f4f4;
}
.com a{
  display: inline-block;
  margin: 15px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  text-decoration: none;
}
.bm-view {
  width: 688px;
  height: 500px;
  padding: 20px;
}

</style>
