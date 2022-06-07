<template>
    <div class="quick-entry">
        <div style="height: 40px; line-height: 60px; margin-left: 30px">
          快捷入口
        </div>
        <el-divider></el-divider>
        <el-row>
          <!-- span	栅格占据的列数 -->
          <el-col :span="2" v-for="(entry, index) in entryList" :key="index">
            <div
              @click="routerjump(entry.route)"
              class="grid-content bg-purple quick-entry-list"
              :style="entry.bg"
            >
              <i :class="entry.icon"></i>
              <div>{{ entry.title }}</div>
            </div>
          </el-col>
        </el-row>
      </div>
</template>

<script>
import { mapState} from "vuex";
export default {
    methods:{ 
        routerjump(route) {
        this.$router.push(route);
        }
    },
    computed: {
    ...mapState({
      entryList: (store) => {
        return store.home.entryList;
      },
    })
  },
}
</script>

<style scoped>

.el-row {
  display: flex;
  justify-content: space-between;
}


.el-col {
  text-align: center;
}

.quick-entry {
  background-color: white;
  border: 1px grey solid;
  position: absolute;
  top: 380px;
  left: 320px;
  right: 20px;
  height: 240px;
}

.quick-entry-list {
  border-radius: 12px;
}
</style>