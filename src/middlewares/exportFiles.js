import * as json2csv from 'json2csv';
import * as fs from 'fs';
import { resolve } from 'path';

class ExportFiles {
  /**
   * Generate requests per consumer report
   *
   * @return void
   */
  async exportRequestsByConsumer(requests) {
    const fields = [
      'host',
      'quantity',
    ];
    const filename = 'RequestsByConsumer.csv';
    await this.createCsv(requests, fields, filename);
  }

  /**
   * Generate requests per service report
   *
   * @return void
   */
  async exportRequestsByService(requests) {
    const fields = [
      'service_name',
      'quantity',
    ];
    const filename = 'RequestsByService.csv';
    await this.createCsv(requests, fields, filename);
  }

  /**
   * Generate average time per service
   *
   * @return void
   */
  async exportAverageTimeService(requests) {
    const fields = [
      'service_name',
      'latency_request',
      'latency_kong',
      'latency_proxy',
    ];
    const filename = 'AverageTimeService.csv';
    await this.createCsv(requests, fields, filename);
  }

  /**
   * @param array requests with database records
   * @param array fields headers to csv file
   * @param string $filename File name
   *
   * @return string report .csv file created location
   */
  async createCsv(requests, fields, filename) {
    const opts = { fields };
    const csv = await json2csv.parse(requests, opts);
    const filepath = resolve(__dirname, '../', 'extras', 'exports', filename);

    fs.writeFile(filepath, csv, (err) => {
      if (err) throw err;
    });

    return filepath;
  }
}

export default new ExportFiles();
