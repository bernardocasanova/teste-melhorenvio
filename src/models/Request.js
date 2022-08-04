import mongoose from 'mongoose';

import ExportFiles from '../middlewares/exportFiles';

const Schema = new mongoose.Schema({
  consumer_id: { type: String },
  service_id: { type: String },
  service_name: { type: String },
  url: { type: String },
  size: { type: Number },
  headers_host: { type: String },
  latency_proxy: { type: Number },
  latency_kong: { type: Number },
  latency_request: { type: Number },
});

const RequestModel = mongoose.model('Request', Schema);

export default class Request {
  constructor(body) {
    this.body = body;
  }

  async store() {
    await RequestModel.create(this.body);
  }

  /**
   * Get requests per consumer from database
   *
   * @return array with requests per consumer
   */
  async getRequestsByConsumer() {
    const requests = await RequestModel.aggregate([
      {
        $group: {
          _id: { consumer_id: '$consumer_id' },
          host: {
            $first: '$headers_host',
          },
          quantity: { $sum: 1 },
        },
      },
    ]);
    return requests;
  }

  /**
   * Get requests per service from database
   *
   * @return array with requests per service
   */
  async getRequestsByService() {
    const requests = await RequestModel.aggregate([
      {
        $group: {
          _id: {
            id: '$service_id',
          },
          service_name: {
            $first: '$service_name',
          },
          quantity: { $sum: 1 },
        },
      },
    ]);
    return requests;
  }

  /**
   * Get avarage time per service from database
   *
   * @return array with avarage time per service
   */
  async getAvgServiceRequests() {
    const requests = await RequestModel.aggregate([
      {
        $group: {
          _id: {
            id: '$service_id',
          },
          service_name: {
            $first: '$service_name',
          },
          latency_request: { $avg: '$latency_request' },
          latency_kong: { $avg: '$latency_kong' },
          latency_proxy: { $avg: '$latency_proxy' },
        },
      },
    ]);
    return requests;
  }

  /**
   * Generate and save all reports
   *
   * @return void
   */
  async generateAndSaveReports() {
    await ExportFiles.exportRequestsByConsumer(await this.getRequestsByConsumer());
    await ExportFiles.exportRequestsByService(await this.getRequestsByService());
    await ExportFiles.exportAverageTimeService(await this.getAvgServiceRequests());
  }
}
