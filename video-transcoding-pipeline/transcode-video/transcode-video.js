'use strict';

const AWS = require('aws-sdk');
const { join, dropLast, split, compose, takeLast, any, equals, head } = require('ramda');
const { Observable } = require('rxjs');

const elasticTranscoder = new AWS.ElasticTranscoder({ region: 'us-east-1' });
const createTranscoderJob = Observable.bindNodeCallback(elasticTranscoder.createJob.bind(elasticTranscoder));

const bucketInstance = new AWS.S3();
const deleteBucketObject = Observable.bindNodeCallback(bucketInstance.deleteObject.bind(bucketInstance));

const validExtensions = ['mp4', 'avi', 'mov'];
const getOutputKey = compose(join('.'), dropLast(1), split('.'));
const getExtension = compose(head, takeLast(1), split('.'));

const createTranscoderPayload = sourceKey => {
  const outputKey = getOutputKey(sourceKey);
  return {
    PipelineId: '1497324959789-xqcx9k',
    Input: { Key: sourceKey },
    Outputs: [
      { Key: `${outputKey}-1080p.mp4`, PresetId: '1351620000001-000001' },
      { Key: `${outputKey}-720p.mp4`, PresetId: '1351620000001-000010' },
      { Key: `${outputKey}-web-720p.mp4`, PresetId: '1351620000001-100070' },
      { Key: `${outputKey}-1080p.webm`, PresetId: '1351620000001-000001' },
      { Key: `${outputKey}-720p.webm`, PresetId: '1351620000001-000010' },
      { Key: `${outputKey}-web-720p.webm`, PresetId: '1351620000001-100070' }
    ]
  }
}

exports.handler = ({ Records: [{ s3: { object: { key } } }] }, context, callback) => {
  Observable.of(key)
  .map(key => decodeURIComponent(key.replace(/\+/g, ' ')))
  .switchMap(sourceKey => {
    return any(equals(getExtension(sourceKey)), validExtensions)
      ? createTranscoderJob(createTranscoderPayload(sourceKey))
      : deleteBucketObject({ Bucket: 'serverless-video-upload2', Key: sourceKey })
  })
  .subscribe(() => callback(), error => callback(error));
}