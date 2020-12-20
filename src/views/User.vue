<template>
  <div>
    <div v-if="currentFile" class="progress">
      <div
          class="progress-bar progress-bar-info progress-bar-striped"
          role="progressbar"
          :aria-valuenow="progress"
          aria-valuemin="0"
          aria-valuemax="100"
          :style="{ width: progress + '%' }"
      >
        {{ progress }}%
      </div>
    </div>
    <div class="card">
      <label class="btn btn-default">
        <input type="file" ref="file" @change="selectFile" />
      </label>

      <button
          class="btn btn-success"
          :disabled="!selectedFiles"
          @click="upload"
      >
        Upload
      </button>
    </div>

    <div class="alert alert-light" role="alert">{{ message }}</div>


    <table class="table">
      <thead class="thead-dark">
      <tr>
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">URL</th>
        <th scope="col">Action</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(file, index) in fileInfos" :key="index" >

        <th scope="row">{{ index + 1 }}</th>
        <td>{{ file.name }}</td>
        <td>
          <a :href="file.url">下载</a>
        </td>

        <td>
          <button
              class="btn btn-danger"
              @click="removeElement(index, file.name)"
          >
            删除
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import UploadService from "../services/UploadFilesService";
import axios from "axios";
export default {
  name: "upload-files",
  data() {
    return {
      userid:"66",
      selectedFiles: undefined,
      currentFile: undefined,
      progress: 0,
      message: "",

      fileInfos: [],
    };
  },
  methods: {
    selectFile() {
      this.selectedFiles = this.$refs.file.files;
    },
    toupload() {
      this.currentFile = this.selectedFiles.item(0);
      axios.post({
        url:'http://localhost:8081/user/upload',
        method: 'post',
        data:this.currentFile,
        headers:{
          'Content-Type':'multipart/form-data'
        }
      })
          .then(res=>{
            if(res){
              this.successMessage();
            }
            else{
              this.errorMessage();
            }
          })
    },
    todownload() {
      /*axios.get({'http://localhost:8081/user/download',
      {params:{filename:"file.name"}})
          .then(res=>{
            if(res){
              this.successMessage();
            }
            else{
              this.errorMessage();
            }
          })*/
    },
    errorMessage() {
      this.$message({
        showClose: true,
        message: '账号或密码错误，请检查！',
        type: 'error'
      });
    },
    successMessage() {
      this.$message({
        showClose: true,
        message: '上传成功',
        type: 'error'
      });
    },
    upload() {
      this.progress = 0;
      this.currentFile = this.selectedFiles.item(0);
      UploadService.upload(this.currentFile, (event) => {
        this.progress = Math.round((100 * event.loaded) / event.total);
      },this.userid)
          .then((response) => {
            this.message = response.data.message;
            return UploadService.getFiles();
          })
          .then((files) => {
            this.fileInfos = files.data;
          })
          .catch(() => {
            this.progress = 0;
            this.message = "Could not upload the file!";
            this.currentFile = undefined;
          });

      this.selectedFiles = undefined;
    },

    removeElement(index, fileName) {
      UploadService.delete(fileName).then((response) => {
        if (response.data === true) {
          this.fileInfos.splice(index, 1);
        } else {
          this.message = "Delete file was failed";
        }
      });
    },
  },
  mounted() {
    UploadService.getFiles().then((response) => {
      this.fileInfos = response.data;
    });
  },
};
</script>
