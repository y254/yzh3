<template>
<div class="manage">
    <yz-header>栏目管理</yz-header>
<div class="content">
    <div class="active">
          <h3>点击删除一下频道</h3>
        <div class="list">
            <span class="item" v-for="item in activeList" :key="item.id" @click="delTab(item.id)">{{item.name}}</span>
        </div>
    </div>

    <div class="deactive">
        <h3>点击添加一下频道</h3>
        <div class="list">
            <span class="item" v-for="item in deactiveList" :key="item.id" @click="addTab(item.id)">{{item.name}}</span>
        </div>
    </div>
</div>
</div>
</template>

<script>
export default {
  data () {
    return {
      // 存放激活的栏目
      activeList: [],
      // 存放未激活的栏目
      deactiveList: []
    }
  },
  async created () {
    const activeList = JSON.parse(localStorage.getItem('activeList'))
    const deactiveList = JSON.parse(localStorage.getItem('deactiveList'))
    if (activeList) {
      this.activeList = activeList
      this.deactiveList = deactiveList
      return
    }
    const res = await this.$axios.get('/category')
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.activeList = data
      console.log(this.activeList)
    }
  },
  methods: {
    delTab (id) {
      if (this.activeList.length <= 4) return
      // 点击删除那个频道,如果数据中里的索引号等于删除的那个就
      const index = this.activeList.findIndex(item => item.id === id)
      // 往未激活的栏目中添加
      this.deactiveList.push(this.activeList[index])
      // 删除激活中的这个栏目
      this.activeList.splice(index, 1)
    },
    addTab (id) {
      // 点击添加那个频道,如果数据中里的索引号等于添加的那个就
      const index = this.deactiveList.findIndex(item => item.id === id)
      // 往激活的栏目中添加
      this.activeList.push(this.deactiveList[index])
      // 删除未激活中的这个栏目
      this.deactiveList.splice(index, 1)
    }
  },
  watch: {
    activeList: {
      deep: true,
      handler: function (value) {
        localStorage.setItem('activeList', JSON.stringify(this.activeList))
        localStorage.setItem('deactiveList', JSON.stringify(this.deactiveList))
      }
    }
  }
}
</script>

<style lang="less" soped>
.content {
    padding: 10px;
   .active,.deactive {
       h3 {
           font-size: 14px;
           font-weight: 400;
           margin: 10px 0;
       }
       .list {
           padding-left: 2px;
           .item {
               display: inline-block;
               width: 60px;
               height: 30px;
               background-color: #eee;
               text-align: center;
               line-height: 30px;
               margin: 5px;
               border: 1px solid #ccc;
               font-size: 16px;

            }
        }
   }
}
</style>
