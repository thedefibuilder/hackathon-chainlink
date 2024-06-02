export type TAuditFindingResponse = {
  function_code: string;
  vulnerabilities: [
    {
      start_line: number;
      end_line: number;
      detail: string;
      severity: string;
      title: string;
      recommendation: string;
      certainty_score: number;
    },
  ];
};

export type TUniquenessResponse = {
  status: number;
  score: number;
};

export type TAddEmbeddingResponse = {
  status: number;
  detail: string;
};

export const mockAuditRequestIds = [29, 31, 28, 29, 31, 28];

export const aiAuditorBackendURL = "http://34.207.219.122";
