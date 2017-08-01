'use strict';
const AWS = require('aws-sdk');

const elasticTranscoder = new AWS.ElasticTranscoder({
    region: 'us-east-1'
});

const handler = function({ Records: [{ s3: { object: { key } } }] }, context, callback){

  //the input file may have spaces so replace them with '+'
  var sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));

  //remove the extension
  var outputKey = sourceKey.split('.')[0];

  var params = {
      PipelineId: '1497324959789-xqcx9k',
      Input: { Key: sourceKey },
      Outputs: [{
            Key: outputKey + '-1080p' + '.mp4',
            PresetId: '1351620000001-000001' //Generic 1080p
          },
          {
            Key: outputKey + '-720p' + '.mp4',
            PresetId: '1351620000001-000010' //Generic 720p
          },
          {
            Key: outputKey + '-web-720p' + '.mp4',
            PresetId: '1351620000001-100070' //Web Friendly 720p
          }
      ]};

  elasticTranscoder.createJob(params, function(error, data){
      if (error){
          callback(error);
      }
  });
};

module.exports.handler = handler;
