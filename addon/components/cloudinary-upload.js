import Ember from 'ember';
import config from '../config/environment';

export default Ember.Component.extend({
  tagName: 'input',
  name: 'file',
  classNames: ['cloudinary-fileupload'],
  attributeBindings: ['name', 'type', 'accept'],
  type: 'file',
  accept: null,
  cloudinaryImage: null,
  uploadPreset: null,

  setupUpload: function() {
    var _this = this;
    var controller = this.get('controller');

    this.$().unsigned_cloudinary_upload(
      this.get('uploadPreset'), {
        cloud_name: config.CLOUDINARY_NAME
      }, {
        disableImageResize: false,
        imageMaxWidth: 1000,
        imageMaxHeight: 1000,
        acceptFileTypes: /(\.|\/)(gif|jpe?g|png|bmp|ico)$/i,
        maxFileSize: 5000000 // 5MB
      }
    );

    this.$().bind('fileuploaddone', function (e, data) {
      console.log(data.result)
      _this.set('cloudinaryImage', data.result);
    });
  }.on('didInsertElement')
});
