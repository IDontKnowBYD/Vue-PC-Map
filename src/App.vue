<template>
  <div id="app">
    <h1 class="heading">青岛旅游地图</h1>
    <div class="aside">
      <div class="com">
        <p class="title">青岛热门景点</p>
        <a v-for="n in pop" :href="n.href">{{n.add}}</a>
      </div>
      <div class="com">
        <p class="title">青岛旅游工具</p>
        <a v-for="n in tool" :href="n.href">{{n.fun}}</a>
      </div>
      <div class="com">
        <p class="title">青岛旅游预订</p>
        <a v-for="n in books" :href="n.href">{{n.book}}</a>
      </div>
      <div class="com">
        <p class="title">青岛旅游指南</p>
        <a v-for="n in guides" :href="n.href">{{n.guide}}</a>
      </div>
    </div>
    <div class="container">
      <div class="soform">
        <div id="stop">
          <a v-on:click="fchs(0)" :class="{ st: search }">搜索</a>
          <a v-on:click="fchs(1)" :class="{ st: bus }">公交</a>
          <a v-on:click="fchs(2)" :class="{ st: car }">驾驶</a>
          <a v-on:click="fchs(3)" :class="{ st: walk }">步行</a>
        </div>
        <div id="sfoot">
          <div v-if="search">
            <input type="text" v-model="keySearch">
            <button v-on:click="searchAtt()">查找</button>
          </div>
          <div v-if="bus">
            <span>从</span>
            <input type="text" v-model="staBus">
            <span>到</span>
            <input type="text" v-model="endBus">
            <button v-on:click="searchBus()">查找</button>
          </div>
          <div v-if="car">
            <span>从</span>
            <input type="text" v-model="staCar">
            <span>到</span>
            <input type="text" v-model="endCar">
            <button v-on:click="searchCar()">查找</button>
          </div>
          <div v-if="walk">
            <span>从</span>
            <input type="text" v-model="staWalk">
            <span>到</span>
            <input type="text" v-model="endWalk">
            <button v-on:click="searchWalk()">查找</button>
          </div>
        </div>
      </div>
      <div class="com">
        <p class="title">青岛旅游地图</p>
        <baidu-map center="青岛" mapType="BMAP_HYBRID_MAP" @ready="setDistanceToolInstance">
          <bm-view class="map"></bm-view>
          <bm-scale :offset="{width: 95, height: 20}"></bm-scale>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_LEFT" :offset="{width: 12, height: 70}"></bm-navigation>
          <bm-panorama anchor="BMAP_ANCHOR_TOP_LEFT"></bm-panorama>
          <bm-overview-map anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :isOpen="true" ></bm-overview-map>
           <bm-traffic v-if="traffic" :predictDate="{weekday: weekday, hour: hours}"></bm-traffic>
          <bm-control anchor="BMAP_ANCHOR_TOP_RIGHT" :offset="{width: 7, height: 7}">
            <button @click="openDistanceTool">测距离</button>
            <button @click="measureArea">测面积</button>
            <button @click="trafficTool">交通图</button>
            <button @click="interestTool">兴趣点</button>
            <button><a href="src/test.html">瓦片图</a></button>
          </bm-control>
          <bm-local-search v-if="search" :keyword="keyword" :auto-viewport="true"></bm-local-search>
          <bm-transit v-if="bus" :start="startB" :end="endB" :auto-viewport="true" :selectFirstResult="true"></bm-transit>
          <bm-driving v-if="car" :start="startC" :end="endC" startCity="青岛" endCity="青岛" :auto-viewport="true" :selectFirstResult="true"></bm-driving></bm-driving>
          <bm-walking v-if="walk" :start="startW" :end="endW" :auto-viewport="true" :selectFirstResult="true"></bm-walking>
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_LEFT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
          <div v-if="interest">
            <bm-info-window :position="{lng: 120.601677, lat: 36.195942}" title="介绍" :show="infoWindowL.show" @close="infoWindowClose(infoWindowL)" @open="infoWindowOpen(infoWindowL)">
              <p v-text="infoWindowL.contents"></p>
              <button @click="gothere('崂山')">到这去</button>
              <a href="https://baike.baidu.com/item/%E5%B4%82%E5%B1%B1/125288?fr=aladdin">详情</a>
            </bm-info-window>
            <bm-marker :position="{lng: 120.601677, lat: 36.195942}" :dragging="true" @click="infoWindowOpen(infoWindowL)">
              <bm-label content="崂山" :labelStyle="{color: 'red', fontSize : '10px'}" :offset="{width: -3, height: 30}"/>
            </bm-marker>
            <bm-info-window :position="{lng: 120.32659, lat: 36.065436}" title="介绍" :show="infoWindowZ.show" @close="infoWindowClose(infoWindowZ)" @open="infoWindowOpen(infoWindowZ)">
              <p v-text="infoWindowZ.contents"></p>
              <button @click="gothere('栈桥')">到这去</button>
              <a href="https://baike.baidu.com/item/%E9%9D%92%E5%B2%9B%E6%A0%88%E6%A1%A5/1752440?fromtitle=%E6%A0%88%E6%A1%A5&fromid=13828723">详情</a>
            </bm-info-window>
            <bm-marker :position="{lng: 120.32659, lat: 36.065436}" :dragging="true" @click="infoWindowOpen(infoWindowZ)">
              <bm-label content="栈桥" :labelStyle="{color: 'red', fontSize : '10px'}" :offset="{width: -3, height: 30}"/>
            </bm-marker>
            <bm-info-window :position="{lng: 120.505219, lat: 36.101068}" title="介绍" :show="infoWindowS.show" @close="infoWindowClose(infoWindowS)" @open="infoWindowOpen(infoWindowS)">
              <p v-text="infoWindowS.contents"></p>
              <button @click="gothere('石老人')">到这去</button>
              <a href="https://baike.baidu.com/item/%E7%9F%B3%E8%80%81%E4%BA%BA/1019038?fr=aladdin">详情</a>
            </bm-info-window>
            <bm-marker :position="{lng: 120.505219, lat: 36.101068}" :dragging="true" @click="infoWindowOpen(infoWindowS)">
              <bm-label content="石老人" :labelStyle="{color: 'red', fontSize : '10px'}" :offset="{width: -10, height: 30}"/>
            </bm-marker>
            <bm-info-window :position="{lng: 120.391662, lat: 36.067567}" title="介绍" :show="infoWindowW.show" @close="infoWindowClose(infoWindowW)" @open="infoWindowOpen(infoWindowW)">
              <p v-text="infoWindowW.contents"></p>
              <button @click="gothere('五四广场')">到这去</button>
              <a href="https://baike.baidu.com/item/%E4%BA%94%E5%9B%9B%E5%B9%BF%E5%9C%BA">详情</a>
            </bm-info-window>
            <bm-marker :position="{lng: 120.391662, lat: 36.067567}" :dragging="true" @click="infoWindowOpen(infoWindowW)">
              <bm-label content="五四广场" :labelStyle="{color: 'red', fontSize : '10px'}" :offset="{width: -15, height: 30}"/>
            </bm-marker>
            <bm-info-window :position="{lng: 120.509449, lat: 36.206037}" title="介绍" :show="infoWindowY.show" @close="infoWindowClose(infoWindowY)" @open="infoWindowOpen(infoWindowY)">
              <p v-text="infoWindowY.contents"></p>
              <button @click="gothere('世园会')">到这去</button>
              <a href="https://baike.baidu.com/item/%E4%B8%AD%E5%9B%BD2014%E5%B9%B4%E9%9D%92%E5%B2%9B%E4%B8%96%E7%95%8C%E5%9B%AD%E8%89%BA%E5%8D%9A%E8%A7%88%E4%BC%9A?fromtitle=%E9%9D%92%E5%B2%9B%E4%B8%96%E5%9B%AD%E4%BC%9A&fromid=7947987">详情</a>
            </bm-info-window>
            <bm-marker :position="{lng: 120.509449, lat: 36.206037}" :dragging="true" @click="infoWindowOpen(infoWindowY)">
              <bm-label content="世园会" :labelStyle="{color: 'red', fontSize : '10px'}" :offset="{width: -10, height: 30}"/>
            </bm-marker>
          </div>
        </baidu-map>
      </div>
    </div>
  </div>
</template>

<script>
import DistanceTool from 'bmaplib.distancetool'
import './static/js/AreaTool_min'
export default {
  data () {
    return {
      week: '7123456',
      search: true,
      bus: false,
      car: false,
      walk: false,
      traffic: false,
      interest: false,
      keySearch: '',
      keyword: '',
      staBus: '',
      endBus: '',
      staCar: '',
      endCar: '',
      staWalk: '',
      endWalk: '',
      startB: '',
      startC: '',
      startW: '',
      endB: '',
      endC: '',
      endW: '',
      pop: [
        {
          add: '崂山',
          href: 'https://baike.baidu.com/item/%E5%B4%82%E5%B1%B1/125288?fr=aladdin'
        },
        {
          add: '栈桥',
          href: 'https://baike.baidu.com/item/%E9%9D%92%E5%B2%9B%E6%A0%88%E6%A1%A5/1752440?fromtitle=%E6%A0%88%E6%A1%A5&fromid=13828723'
        },
        {
          add: '八大关',
          href: 'https://baike.baidu.com/item/%E5%85%AB%E5%A4%A7%E5%85%B3/1170054'
        },
        {
          add: '五四广场',
          href: 'https://baike.baidu.com/item/%E4%BA%94%E5%9B%9B%E5%B9%BF%E5%9C%BA'
        },
        {
          add: '第一海水浴场',
          href: 'https://baike.baidu.com/item/%E9%9D%92%E5%B2%9B%E7%AC%AC%E4%B8%80%E6%B5%B7%E6%B0%B4%E6%B5%B4%E5%9C%BA?fromtitle=%E7%AC%AC%E4%B8%80%E6%B5%B7%E6%B0%B4%E6%B5%B4%E5%9C%BA&fromid=2060809'
        },
        {
          add: '奥帆中心',
          href: 'https://baike.baidu.com/item/%E9%9D%92%E5%B2%9B%E5%9B%BD%E9%99%85%E5%B8%86%E8%88%B9%E4%B8%AD%E5%BF%83/3342320'
        },
        {
          add: '鲁迅公园',
          href: 'https://baike.baidu.com/item/%E9%B2%81%E8%BF%85%E5%85%AC%E5%9B%AD/30361'
        },
        {
          add: '石老人',
          href: 'https://baike.baidu.com/item/%E7%9F%B3%E8%80%81%E4%BA%BA/1019038?fr=aladdin'
        },
        {
          add: '天幕城',
          href: 'https://baike.baidu.com/item/%E5%A4%A9%E5%B9%95%E5%9F%8E'
        },
        {
          add: '劈柴院',
          href: 'https://baike.baidu.com/item/%E5%8A%88%E6%9F%B4%E9%99%A2'
        }
      ],
      tool: [
        {
          fun: '青岛电子地图',
          href: ''
        },
        {
          fun: '青岛火车时刻表',
          href: 'http://huoche.cncn.com/train-%C7%E0%B5%BA'
        },
        {
          fun: '青岛汽车时刻表',
          href: 'http://qiche.cncn.com/changtu-%C7%E0%B5%BA'
        },
        {
          fun: '青岛公交查询',
          href: 'http://bus.cncn.com/qingdao'
        },
        {
          fun: '青岛天气预报',
          href: 'http://tianqi.cncn.com/qingdao'
        }
      ],
      books: [
        {
          book: '青岛酒店预定',
          href: 'http://jiudian.cncn.com/qingdao',
        },
        {
          book: '青岛旅游线路',
          href: 'http://qingdao.cncn.com/xianlu/',
        },
        {
          book: '青岛旅行社',
          href: 'http://qingdao.cncn.com/lvxingshe/',
        },
        {
          book: '青岛订票',
          href: 'http://qingdao.cncn.com/dingpiao/',
        },
        {
          book: '青岛定房',
          href: 'http://qingdao.cncn.com/dingfang/',
        },
        {
          book: '青岛租车',
          href: 'http://qingdao.cncn.com/zuche/',
        },
      ],
      guides: [
        {
          guide: '青岛旅游景点',
          href: 'http://qingdao.cncn.com/jingdian/'
        },
        {
          guide: '青岛旅游攻略',
          href: 'http://qingdao.cncn.com/lvyougonglue/'
        },
        {
          guide: '青岛美食',
          href: 'http://qingdao.cncn.com/meishi/'
        },
        {
          guide: '青岛特产',
          href: 'http://qingdao.cncn.com/techan/'
        },
        {
          guide: '青岛风景图片',
          href: 'http://qingdao.cncn.com/photo/'
        },
      ],
      infoWindowL: {
        show: false,
        contents: '崂山，国务院首批国家级重点风景名胜区。'
      },
      infoWindowZ: {
        show: false,
        contents: '栈桥，青岛海滨风景区。'
      },
      infoWindowS: {
        show: false,
        contents: '石老人，国家旅游度假区。'
      },
      infoWindowW: {
        show: false,
        contents: '五四广场，标志性雕塑“五月的风”'
      },
      infoWindowY: {
        show: false,
        contents: '世园会，世界园艺博览会'
      }
    }
  },
  computed: {
    weekday: function () {
      return this.week.charAt(new Date().getDay())
    },
    hours: function () {
      return new Date().getHours()
    }
  },
  unmount () {
    distanceTool && distanceTool.close()
    measureAreaTool && measureAreaTool.close()
  },
  methods: {
    searchAtt: function() {
      this.keyword = this.keySearch;
    },
    searchBus: function() {
      this.startB = this.staBus;
      this.endB = this.endBus;
    },
    searchCar: function() {
      this.startC = this.staCar;
      this.endC = this.endCar;
    },
    searchWalk: function() {
      this.startW = this.staWalk;
      this.endW = this.endWalk;
    },
    fchs: function(n){
      this.search = false;
      this.bus = false;
      this.car = false;
      this.walk = false;
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
          this.walk = true;
          break;
      }
    },
    setDistanceToolInstance ({map}) {
      this.distanceTool = new DistanceTool(map, {lineStroke : 2}) 
      this.measureAreaTool = createMeasureAreaTool(map)
    },
    openDistanceTool (e) {
      const {distanceTool} = this
      distanceTool && distanceTool.open()
    },
    measureArea (e) {
      const {measureAreaTool} = this
      measureAreaTool && measureAreaTool.open();
    },
    trafficTool () {
      this.traffic = !this.traffic;
    },
    interestTool () {
       this.interest = !this.interest;
    },
    infoWindowClose (infoWindow) {
      infoWindow.show = false
    },
    infoWindowOpen (infoWindow) {
      infoWindow.show = true
    },
    gothere (str) {
      this.fchs(1);
      this.endBus = str;
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
  padding-right: 30px;
  color: #555;
  cursor: pointer;
}
#stop a.st {
  font-weight: bold;
  color: #f91;
}
#sfoot input {
  height: 32px;
  padding: 0 10px;
  margin-right: 8px;
  border: 1px solid #ddd;
  outline: none;
}
#sfoot button {
  height: 34px;
  width: 144px;
  color: #fff;
  line-height: 32px;
  margin-top: 10px;
  border: 1px solid #f91;
  border-radius: 3px;
  font-size: 14px;
  cursor: pointer;
  background: #f91;
}
#sfoot span {
  font-size: 14px;
}
.com {
  overflow: auto;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}
.title {
  padding: 10px;
  margin: 0px;
  background-color: #f4f4f4;
}
.com a{
  width: 100px;
  display: inline-block;
  margin: 7px 8px;
  font-size: 14px;
  color: #555;
  cursor: pointer;
  text-decoration: none;
}
.com button {
  cursor: pointer;
}
.com button a{
  margin: 0px;
  padding: 0px;
  width: 40px;
  font-size: 10px;
  color: #000;
}
.map {
  width: 688px;
  height: 500px;
  padding: 20px;
}
.aside {
  width: 250px;
  float: right;
}

</style>
