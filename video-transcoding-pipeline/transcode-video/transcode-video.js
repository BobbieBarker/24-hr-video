'use strict';
const AWS = require('aws-sdk');
const { join, dropLast, split, compose, takeLast, any, equals, head } = require('ramda');
const { Observable } = require('rxjs');

const elasticTranscoder = new AWS.ElasticTranscoder({ region: 'us-east-1' });

const bucketInstance = new AWS.S3(); 

const validExtensions = ['mp4', 'avi', 'mov'];
const getOutputKey = compose(join('.'), dropLast(1), split('.'));
const getExtension = compose(head, takeLast(1), split('.'));

exports.handler = function({ Records: [{ s3: { object: { key } } }] }, context, callback) {

  //the input file may have spaces so replace them with '+'
  const sourceKey = decodeURIComponent(key.replace(/\+/g, ' '));

  //remove the extension
  const outputKey = getOutputKey(sourceKey);

  const transCoderPayload = {
    PipelineId: '1497324959789-xqcx9k',
    Input: { Key: sourceKey },
    Outputs: [
      { Key: outputKey + '-1080p' + '.mp4', PresetId: '1351620000001-000001' },
      { Key: outputKey + '-720p' + '.mp4', PresetId: '1351620000001-000010' },
      { Key: outputKey + '-web-720p' + '.mp4', PresetId: '1351620000001-100070'}
    ]
  };

  
  if (any(equals(getExtension(sourceKey)), validExtensions)) {
    return  elasticTranscoder.createJob(transCoderPayload, function(error, data) {
      if (error) {
        return callback(error);
      }
    });
  }
  
  bucketInstance.deleteObject({ Bucket: 'serverless-video-upload2', Key: sourceKey }, (err, data) => {
    if (err) {
      return callback(err);
    }
  });
};
