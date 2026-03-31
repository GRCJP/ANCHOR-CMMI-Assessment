class AWSAPI {
  constructor() {
    // Use runtime config injected by the page, then env var, then fallback
    this.apiBase = (typeof window !== 'undefined' && window.ANCHOR_API_URL)
      || 'https://rdrg014y4j.execute-api.us-east-1.amazonaws.com/prod';
    this.auth = window.anchorAuth;
  }

  async getAssessments() {
    try {
      const response = await fetch(`${this.apiBase}/data`, {
        method: 'POST',
        headers: this.auth.getAuthHeaders(),
        body: JSON.stringify({
          action: 'getAssessments',
          userId: this.auth.getCurrentUserId()
        })
      });
      
      const result = await response.json();
      return result.success ? result.data : [];
    } catch (error) {
      console.error('Error fetching assessments:', error);
      return [];
    }
  }

  async saveAssessment(assessmentData) {
    try {
      const response = await fetch(`${this.apiBase}/data`, {
        method: 'POST',
        headers: this.auth.getAuthHeaders(),
        body: JSON.stringify({
          action: 'saveAssessment',
          data: assessmentData,
          assessmentId: assessmentData.id,
          userId: this.auth.getCurrentUserId()
        })
      });
      
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error saving assessment:', error);
      return false;
    }
  }

  async uploadFile(file, assessmentId) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = async (e) => {
        try {
          const base64Data = e.target.result.split(',')[1];
          
          const response = await fetch(`${this.apiBase}/upload`, {
            method: 'POST',
            headers: this.auth.getAuthHeaders(),
            body: JSON.stringify({
              fileName: file.name,
              fileType: file.type,
              fileSize: file.size,
              assessmentId: assessmentId,
              userId: this.auth.getCurrentUserId(),
              fileData: base64Data
            })
          });
          
          const result = await response.json();
          resolve(result);
        } catch (error) {
          reject(error);
        }
      };
      reader.readAsDataURL(file);
    });
  }

  async getEvidence(assessmentId) {
    try {
      const response = await fetch(`${this.apiBase}/data`, {
        method: 'POST',
        headers: this.auth.getAuthHeaders(),
        body: JSON.stringify({
          action: 'getEvidence',
          assessmentId: assessmentId,
          userId: this.auth.getCurrentUserId()
        })
      });
      
      const result = await response.json();
      return result.success ? result.data : [];
    } catch (error) {
      console.error('Error fetching evidence:', error);
      return [];
    }
  }

  async sendNotification(to, templateName, templateData) {
    try {
      const response = await fetch(`${this.apiBase}/email`, {
        method: 'POST',
        headers: this.auth.getAuthHeaders(),
        body: JSON.stringify({
          to: to,
          templateName: templateName,
          templateData: templateData
        })
      });
      
      const result = await response.json();
      return result.success;
    } catch (error) {
      console.error('Error sending notification:', error);
      return false;
    }
  }

  async logActivity(action, section, details = {}) {
    try {
      const activityData = {
        action: action,
        section: section,
        userId: this.auth.getCurrentUserId(),
        timestamp: new Date().toISOString(),
        details: details
      };

      const response = await fetch(`${this.apiBase}/activity`, {
        method: 'POST',
        headers: this.auth.getAuthHeaders(),
        body: JSON.stringify({
          action: 'logActivity',
          data: activityData
        })
      });
      
      return response.ok;
    } catch (error) {
      console.error('Error logging activity:', error);
      return false;
    }
  }
}

// Export for use in other modules
if (typeof module !== 'undefined' && module.exports) {
  module.exports = AWSAPI;
} else {
  window.AWSAPI = AWSAPI;
}
