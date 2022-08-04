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
}

export default new ExportController();
