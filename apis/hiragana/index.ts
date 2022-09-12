import { DefineMethods } from "aspida";

export type Methods = DefineMethods<{
  post: {
    reqBody: {
      app_id: string;
      sentence: string;
      output_type: string;
    };

    resBody: {
      request_id: string;
      output_type: string;
      converted: string;
    };
  };
}>;
