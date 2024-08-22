export interface ReportInterface {
  url:        string;
  timestamp:  string;
  violations: ViolationInterface[];
}

export interface ViolationInterface {
  id:          string;
  description: string;
  impact:      string | null | undefined;
  tags:        string[];
  help:        string;
  helpUrl:     string;
  elements:    ElementInterface[];
}

export interface ElementInterface {
  source:         string;
  failureSummary: string | undefined;
}
