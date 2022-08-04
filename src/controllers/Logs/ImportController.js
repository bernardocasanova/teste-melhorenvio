import { resolve } from 'path';
import fs from 'fs';
import readline from 'readline';

import Request from '../../models/Request';

class ImportController {
  /**
   * Import requests from requests log file
   * @param object req is an object containing information about the HTTP request
   * @param object In response to req, you use res to send back the desired HTTP response.
   *
   * @return json message
   */
  import = async (_req, res) => {
    const filepath = resolve(__dirname, '../', '../', 'extras', 'logs', 'logs.txt');
    const requests = [];

    const lineReader = readline.createInterface({
      input: fs.createReadStream(filepath),
    });

    lineReader.on('line', (request) => {
      requests.push(this.transformRequestData(JSON.parse(request)));
    });

    lineReader.on('close', async () => {
      await this.splitRequestsToSave(requests);
      res.status(200).json({ message: 'Import successful!' });
    });
  };

  splitRequestsToSave = async (requests) => {
    const splitSize = 2000;
    let newRequests = [];

    requests.forEach((request) => {
      newRequests.push(request);
      if (newRequests.length === splitSize) {
        this.saveSplitedRequests(newRequests);
        newRequests = [];
      }
    });
  };

  saveSplitedRequests = async (requests) => {
    await new Request(requests).store();
  };

  /**
   * Transform each request from log file
   *
   * @param object with request
   * @return object
   */
  transformRequestData = (request) => ({
    consumer_id: request.authenticated_entity.consumer_id.uuid,
    service_id: request.service.id,
    service_name: request.service.name,
    url: request.request.url,
    size: request.request.size,
    headers_host: request.request.headers.host,
    latency_proxy: request.latencies.proxy,
    latency_kong: request.latencies.kong,
    latency_request: request.latencies.request,
  });
}

export default new ImportController();
