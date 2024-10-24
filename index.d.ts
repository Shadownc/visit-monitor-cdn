interface VisitMonitorConfig {
    apiUrl?: string;
  }
  
  declare class VisitMonitor {
    constructor(config?: VisitMonitorConfig);
    init(): void;
    logVisit(): void;
  }
  
  export default VisitMonitor;
  