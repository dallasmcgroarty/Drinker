(function (window) {
  'use strict';
  var App = window.App || {};

  function RemoteDataStore (url) {
    if (!url) {
      throw new Error('No remote URL supplied.');
    }

    this.serverURL = url;
  }

  RemoteDataStore.prototype.add = function (key, val) {
    $.post(this.serverURL, val, function (serverResponse) {
      console.log(serverResponse);
    });
  };

  RemoteDataStore.prototype.getAll = function (cb) {
    $.get(this.serverURL, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.get = function (key, cb) {
    $.get(this.serverURL + '/' + key, function (serverResponse) {
      console.log(serverResponse);
      cb(serverResponse);
    });
  };

  RemoteDataStore.prototype.remove = function (key) {
    $.ajax(this.serverURL + '/' + key, {
      type: 'DELETE'
    });
  };
  App.RemoteDataStore = RemoteDataStore;
  window.App = App;
})(window);
