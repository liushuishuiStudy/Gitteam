import http from "../http-common";

class UploadFilesService {
  upload(file, onUploadProgress,_id) {
    let formData = new FormData();

    formData.append("file", file);

    return http.post("/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data"
      },
      params:{userid:_id},
      onUploadProgress
    });
  }

  delete(name){
    return http.delete(`/delete/${name}`);
  }

  getFiles() {
    return http.get("/loadAll");
  }
}

export default new UploadFilesService();
