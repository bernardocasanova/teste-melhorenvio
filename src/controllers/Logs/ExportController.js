import Request from '../../models/Request';

class ExportController {
  /**
   * Exports requests from database
   * @param object req is an object containing information about the HTTP request
   * @param object In response to req, you use res to send back the desired HTTP response.
   *
   * @return json message
   */
  export = async (_req, res) => {
    await new Request().generateAndSaveReports();
    res.status(200).json({ message: 'Export successful!' });
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

export default new ExportController();
