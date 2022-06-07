function openDB(dbName, version = 1) {
    return new Promise((resolve, reject) => {
      var indexedDB =
        window.indexedDB ||
        window.mozIndexedDB ||
        window.webkitIndexedDB ||
        window.msIndexedDB;
      let db;
      // 打开数据库，若没有则会创建
      const request = indexedDB.open("User", version);
      request.onsuccess = function (event) {
        db = event.target.result; 
        resolve(db);
      };
      request.onerror = function (event) {
        reject("获取数据失败")
      };
      // 数据库有更新时候的回调
      request.onupgradeneeded = function (event) {
        db = event.target.result; 
        var objectStore;
        if (!db.objectStoreNames.contains('userInfo')) {
            objectStore = db.createObjectStore('userInfo', {keyPath: 'username'});
            objectStore.createIndex("password", "password", { unique: false });
        }
      };
    });
  }

  function closeDB(db){
    if(db){
      db.close();
    }
  }

  export {openDB,closeDB}