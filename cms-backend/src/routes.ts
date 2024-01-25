import { Request as ExRequest, Response as ExResponse, Router } from 'express';
import swaggerUi from "swagger-ui-express";
import * as tsoaRoutes from './routes/routes';

const routes = Router();

routes.use("/docs", swaggerUi.serve, async (_req: ExRequest, res: ExResponse) => {
  return res.send(
    swaggerUi.generateHTML(await import('./swagger/swagger.json'))
  );
});

tsoaRoutes.RegisterRoutes(routes);

export default routes;