const isBrowser = typeof window !== 'undefined';

class VisitMonitor {
  constructor(config = {}) {
    this.apiUrl = config.apiUrl || 'https://example.com/api/log-visit';
    this.pvCount = 0;
    this.uvCount = 0;
    this.updateCallback = null;
  }

  getOrCreateVisitorId() {
    let visitorId = localStorage.getItem('visitor_id');
    if (!visitorId) {
      visitorId = 'visitor_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('visitor_id', visitorId);
    }
    return visitorId;
  }

  logVisit() {
    if (!isBrowser) {
      console.warn('Not running in a browser environment');
      return;
    }

    console.log(`Using API URL: ${this.apiUrl}`); // 检查 API URL

    const url = window.location.href;
    const visitorId = this.getOrCreateVisitorId();

    fetch(this.apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Visitor-ID': visitorId,
      },
      body: JSON.stringify({ url }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('访问记录成功:', data);
        this.pvCount = data.pvCount;
        this.uvCount = data.uvCount;
        this.triggerUpdate(); // 通知更新
      })
      .catch((error) => {
        console.error('访问记录出错:', error);
        this.pvCount = 'N/A';
        this.uvCount = 'N/A';
        this.triggerUpdate();
      });
  }

  onUpdate(callback) {
    this.updateCallback = callback;
  }

  triggerUpdate() {
    if (typeof this.updateCallback === 'function') {
      this.updateCallback(this.pvCount, this.uvCount);
    }
  }

  init() {
    if (!isBrowser) return;

    window.addEventListener('load', () => {
      this.logVisit();
    });
  }
}

export default VisitMonitor;