<template>
  <div>
    <el-container>
      <!-- sidebar -->
      <el-aside :width="asideWidth" style=" min-height: 100vh;  background-color: #001529;">
        <div
          style="height: 60px; line-height: 60px;  color: white; display: flex; align-items: center; justify-content: center;">
          <img src="@/assets/logo.png" alt="" style="width: 40px; height: 40px;">

          <transition name="el-fade-in-linear">
            <span class="logoTitle" v-show="!isCollapse">Honey 2023</span>
          </transition>

        </div>
        <el-menu :collapseTransition="false" :collapse="isCollapse" router background-color="#001529"
          text-color="rgba(255,255,255,0.65)" active-text-color="#fff" style="border:none;" :default-active="$route.path">
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">Dashboard</span>
          </el-menu-item>

          <el-submenu>
            <template slot="title">
              <i class="el-icon-house"></i>
              <span>Information Management</span>
            </template>
            <el-menu-item index="">User Information</el-menu-item>
            <el-menu-item index="">Admin Information</el-menu-item>
            <el-menu-item index="Element">Element</el-menu-item>
            <el-menu-item index="/">Dashboard </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>

      <el-container>
        <!-- header -->
        <el-header>
          <i :class="collapseIcon" style="font-size: 26px;" @click="handleCollapse"></i>
          <el-breadcrumb seperator-class="el-icon-arrow-right" style="margin-left: 20px;">
            <el-breadcrumb-item>User Information</el-breadcrumb-item>
            <el-breadcrumb-item>Admin Information</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/Element' }">Element</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/' }">Dashboard</el-breadcrumb-item>

          </el-breadcrumb>

          <div style="flex: 1; width: 0;display: flex;align-items: center; justify-content: end;">
            <el-dropdown placement="bottom">
              <div style="display: flex;align-items: center;">
                <i style="font-size: 26px; color: black;" @click="handleFullScreen" :class="iconFullScreen"></i>

                <img src="@/assets/logo.png" style="width: 40px; height: 40px;" alt="">
                <span style="margin-left: 5px;">Administrator</span>
              </div>


              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>Personal Information</el-dropdown-item>
                <el-dropdown-item>Settings</el-dropdown-item>
                <el-dropdown-item>Logout</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </div>
        </el-header>
        <!-- main section  -->
        <el-main>

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>

export default {
  name: 'HomeView',
  components: {
  },
  data() {
    return {
      isCollapse: false,//not collapse
      asideWidth: '250px',
      collapseIcon: 'el-icon-s-fold',
      iconFullScreen: 'fa-solid fa-maximize',
      isFullScreen: false,
      // <i class="fa-solid fa-minimize"></i>
    }
  },
  methods: {
    handleCollapse() {
      this.isCollapse = !this.isCollapse,
        this.asideWidth = this.isCollapse ? '64px' : '250px'
      this.collapseIcon = this.isCollapse ? 'el-icon-s-unfold' : 'el-icon-s-fold'
    },
    handleFullScreen() {
      if (!this.isFullScreen) {
        document.documentElement.requestFullscreen()
        this.isFullScreen = true

      } else {
        document.exitFullscreen()
        this.isFullScreen = false

      }
      this.iconFullScreen = this.isFullScreen ? 'fa-solid fa-minimize' : 'fa-solid fa-maximize'
    }
  }
}
</script>

<style>
.el-menu--inline {
  background-color: #000c17 !important;
}

.el-menu--inline .el-menu-item {
  background-color: #000c17 !important;
  padding-left: 49px !important;
}

.el-menu-item:hover,
.el-submenu__title:hover {
  color: #fff !important;
}

.el-submenu__title:hover i {
  color: #fff !important;
}

.el-menu-item.is-active {
  background-color: #1890ff !important;
  border-radius: 5px !important;
  width: calc(100% - 8px);
  margin-left: 4px;
}

.el-menu-item.is-active i,
.el-menu-item.is-active .el-tooltip {
  margin-left: -4px;
}

.el-menu-item,
.el-submenu__title {
  height: 40px !important;
  line-height: 40px !important;
}

.el-submenu .el-menu-item {
  min-width: 0 !important;
}

.el-menu--inline .el-menu-item.is-active {
  padding-left: 45px !important;
}

.el-aside {
  transition: width .3s;
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
}

.logoTitle {
  transition: all 0.3s;
  margin-left: 5px;
  font-size: 20px;
}

.el-header {
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
  display: flex;
  align-items: center;

}
</style>
