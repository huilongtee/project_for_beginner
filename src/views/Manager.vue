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
        <el-menu :default-openeds="['info']" :collapseTransition="false" :collapse="isCollapse" router background-color="#001529"
          text-color="rgba(255,255,255,0.65)" active-text-color="#fff" style="border:none;" :default-active="$route.path">
          <el-menu-item index="/home">
            <i class="el-icon-s-home"></i>
            <span slot="title">Home</span>
          </el-menu-item>

          <el-submenu index="info" v-if="currentUser.role === 'admin'">
            <template slot="title">
              <i class="el-icon-house"></i>
              <span>Information Management</span>
            </template>
            <el-menu-item index="/user">User</el-menu-item>
            <el-menu-item index="/element">Element</el-menu-item>
            <el-menu-item index="/news">News</el-menu-item>
          </el-submenu>



        </el-menu>
      </el-aside>

      <el-container>
        <!-- header -->
        <el-header>
          <i :class="collapseIcon" style="font-size: 26px;" @click="handleCollapse"></i>
          <el-breadcrumb seperator-class="el-icon-arrow-right" style="margin-left: 20px;">
            <el-breadcrumb-item>Dashboard</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: $router.path }"> {{$route.meta.name}}</el-breadcrumb-item>

          </el-breadcrumb>

          <div style="flex: 1; width: 0;display: flex;align-items: center; justify-content: end;">
            <el-dropdown placement="bottom">
              <div style="display: flex;align-items: center;">
                <i style="font-size: 26px; color: black; margin:0 10px;" @click="handleFullScreen"
                  :class="iconFullScreen"></i>

                <img :src="currentUser.avatar|| 'https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png' " style="border-radius: 50%; width: 40px; height: 40px; margin:0 10px;"
                  alt="">
                <span style="margin-left: 5px;">{{ currentUser.name }}</span>
              </div>


              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="$router.push('/person')">Personal Information</el-dropdown-item>
                <el-dropdown-item @click.native="$router.push('/password')">Change Password</el-dropdown-item>
                <el-dropdown-item @click.native="logout">Logout</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>

          </div>
        </el-header>
        <!-- main section  -->
        <el-main>
          <!-- show children element by using <router-view/> -->
          <router-view @update:user="updateUser" />
          <!-- <div style="display: flex; ">
            <el-card style="width: 20%; margin-right: 10px;">
              <div class="clearfix" slot="header">
                <span>Buttons</span>
              </div>
              <div>
                <div style="margin-top: 20px;">
                  <div style="margin: 10px 0;"><strong>Theme color</strong></div>
                  <el-button type="primary">Button</el-button>
                  <el-button type="success">Button</el-button>
                  <el-button type="warning">Button</el-button>
                  <el-button type="danger">Button</el-button>
                  <el-button type="info">Button</el-button>
                </div>
              </div>
            </el-card>

            <el-card style="width: 80%;">
              <div class="clearfix" slot="header">
                <span>User Information</span>
                <div>
                  <el-table :data="users" >
                    <el-table-column label="Id" prop="id"></el-table-column>
                    <el-table-column label="Username" prop="username"></el-table-column>
                    <el-table-column label="Name" prop="name"></el-table-column>
                    <el-table-column label="Address" prop="address"></el-table-column>
                    <el-table-column label="Upload Picture" prop="Upload Picture">
                      <template v-slot="scope">
                        <el-upload class="upload-demo" action="http://localhost:9090/file/upload"
                          :on-success="(row, file, fileList) => handleTableFileUpload(scope.row, file, fileList)"
                          :headers="{ token: currentUser.token }" :show-file-list="false">
                          <el-button type="primary" size="mini">Click to upload </el-button>

                        </el-upload></template>
                    </el-table-column>
                    <el-table-column label="Avatar">
                      <template v-slot="scope">
                        <el-image style="width: 50px; height: 50px;" v-if="scope.row.avatar"
                          :src="scope.row.avatar"></el-image>
                        <div><el-button @click="handlePreview(scope.row.avatar)">Preview</el-button></div>
                      </template>
                    </el-table-column>
                  </el-table>
                </div>
              </div>
            </el-card>
          </div>
            -->
          <!--#################### Single File Uploader Section ####################-->
          <!-- <div style="display: flex; margin: 10px 0;">
            <el-card>
              <div class="clearfix" slot="header">
                <span>Single File Uploader</span>

              </div>
              <div>
                <el-upload class="upload-demo" action="http://localhost:9090/file/upload" :on-success="handleFileUpload"
                  :headers="{ token: currentUser.token }" list-type="picture">
                  <el-button type="primary" size="small">Click to upload </el-button>
                  <div class="el-upload__tip" slot="tip">Only jpg/png files are allowed, up to 20MB</div>
                </el-upload>
              </div>
            </el-card>
          </div> -->
          <!--#################### Single File Uploader Section ####################-->



          <!--#################### Multiple Files Uploader Section ####################-->
          <!-- <div style="display: flex; margin: 10px 0;">
            <el-card>
              <div class="clearfix" slot="header">
                <span>Multiple Files Uploader</span>

              </div>
              <div>
                <el-upload class="upload-demo" action="http://localhost:9090/file/upload"
                  :on-success="handleMultipleFileUpload" :headers="{ token: currentUser.token }" multiple>
                  <el-button type="primary" size="small">Click to upload </el-button>
                  <div class="el-upload__tip" slot="tip">Only jpg/png files are allowed, up to 20MB</div>
                </el-upload>
              </div>
            </el-card>
          </div>
          #################### Multiple Files Uploader Section #################### -->

          <!-- <el-button size="small" type="primary" style="margin:10px 0;" @click="showUrls">Show URLs</el-button> -->

        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// import axios from 'axios';
import request from '@/utils/request';

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
      // users: [],
      currentUser: JSON.parse(localStorage.getItem('honey-user') || '{}'),
      // url: '',
      // urls: [],
    }
  },
  mounted() {
    // axios.get('http://localhost:9090/user/selectAll').then(res => {
    //   this.users = res.data.data

    // })

    // request.get('/user/selectAll').then(res => {
    //   this.users = res.data
    // })
  },
  methods: {
    updateUser(user) {
      //to prevent the user object is the same, 
      // if the user are the same, the avatar will be updated eventhought haven't click update button  
      // JSON.parse(JSON.stringify(user)) will make user totally different
      this.currentUser = JSON.parse(JSON.stringify(user))
    },
    handlePreview(url) {
      window.open(url)
    },
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
    },
    logout() {
      localStorage.removeItem('honey-user')
      this.$router.push('/login')
    },
    // handleFileUpload(response, file, fileList) {

    //   this.fileList = fileList
    // },
    // handleMultipleFileUpload(response, file, fileList) {
    //   // put ? to solve the problem of red screen
    //   this.urls = fileList.map(item => item.response?.data)
    // },
    // showUrls() {
    //   console.log(this.urls);
    // },
    // handleTableFileUpload(row, file, fileList) {
    //   console.log(row)

    //   console.log(file)
    //   console.log(fileList)
    //   row.avatar = file.response.data
    //   //trigger update
    //   request.put('/user/update', row).then(res => {
    //     if (res.code === '200') {
    //       this.$message.success("Upload successfully")
    //     } else {
    //       this.$message.error(res.msg)
    //     }
    //   })

    // }
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
