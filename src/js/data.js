/**
 * Data management module for Anchor Platform
 * Handles data storage, retrieval, and validation
 */

class DataManager {
  constructor() {
    this.storageKey = 'AnchorPlatformData';
    this.data = this.loadData();
    this.init();
  }

  init() {
    this.setupDataValidation();
    this.setupAutoSave();
    this.setupDataExport();
  }

  loadData() {
    try {
      const stored = localStorage.getItem(this.storageKey);
      return stored ? JSON.parse(stored) : this.getDefaultData();
    } catch (error) {
      console.error('Error loading data:', error);
      return this.getDefaultData();
    }
  }

  getDefaultData() {
    return {
      agency: {
        name: '',
        id: '',
        contact: '',
        email: '',
        phone: '',
        size: '',
        systemType: '',
        dataClassification: '',
        fipsCategory: '',
        assessmentFramework: '',
        maturityModel: '',
        targetStart: '',
        targetEnd: '',
        scope: '',
        constraints: ''
      },
      questionnaire: {
        responses: {},
        score: 0,
        podAssignment: '',
        complexityScore: 0
      },
      mapping: {
        controls: [],
        evidence: [],
        gaps: []
      },
      risk: {
        findings: [],
        poam: [],
        overallScore: 0
      },
      assessment: {
        status: 'not_started',
        startDate: null,
        endDate: null,
        assessor: '',
        notes: []
      },
      metadata: {
        lastModified: new Date().toISOString(),
        version: '1.0',
        completedSections: []
      }
    };
  }

  saveData() {
    try {
      this.data.metadata.lastModified = new Date().toISOString();
      localStorage.setItem(this.storageKey, JSON.stringify(this.data));
      return true;
    } catch (error) {
      console.error('Error saving data:', error);
      return false;
    }
  }

  setupAutoSave() {
    // Auto-save every 30 seconds
    setInterval(() => {
      this.saveData();
    }, 30000);

    // Save on page unload
    window.addEventListener('beforeunload', () => {
      this.saveData();
    });
  }

  setupDataValidation() {
    // Validation schemas for different data types
    this.schemas = {
      agency: {
        required: ['name', 'contact', 'email'],
        email: ['email'],
        phone: ['phone']
      },
      questionnaire: {
        required: ['responses'],
        minResponses: 10
      },
      risk: {
        required: ['findings'],
        maxFindings: 50
      }
    };
  }

  validateData(section, data) {
    const schema = this.schemas[section];
    if (!schema) return { valid: true, errors: [] };

    const errors = [];

    // Check required fields
    if (schema.required) {
      schema.required.forEach(field => {
        if (!data[field] || data[field] === '') {
          errors.push(`${field} is required`);
        }
      });
    }

    // Check email format
    if (schema.email && data.email) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(data.email)) {
        errors.push('Invalid email format');
      }
    }

    // Check phone format
    if (schema.phone && data.phone) {
      const phoneRegex = /^[\d\s\-\(\)\+]+$/;
      if (!phoneRegex.test(data.phone)) {
        errors.push('Invalid phone format');
      }
    }

    // Check minimum responses
    if (schema.minResponses && data.responses) {
      const responseCount = Object.keys(data.responses).length;
      if (responseCount < schema.minResponses) {
        errors.push(`Minimum ${schema.minResponses} responses required`);
      }
    }

    return {
      valid: errors.length === 0,
      errors: errors
    };
  }

  // Agency data methods
  updateAgencyData(data) {
    const validation = this.validateData('agency', data);
    if (!validation.valid) {
      throw new Error(validation.errors.join(', '));
    }

    this.data.agency = { ...this.data.agency, ...data };
    return this.saveData();
  }

  getAgencyData() {
    return this.data.agency;
  }

  // Questionnaire methods
  updateQuestionnaireResponse(questionId, response) {
    if (!this.data.questionnaire.responses) {
      this.data.questionnaire.responses = {};
    }
    
    this.data.questionnaire.responses[questionId] = response;
    this.calculateQuestionnaireScore();
    return this.saveData();
  }

  calculateQuestionnaireScore() {
    const responses = this.data.questionnaire.responses;
    const scoringWeights = {
      'agency_size': { 'Small': 2, 'Medium': 5, 'Large': 8 },
      'it_complexity': { 'Simple': 2, 'Moderate': 6, 'Complex': 10 },
      'sensitive_data': { 'PII': 3, 'Financial': 4, 'CJI': 5, 'PHI': 4, 'FTI': 6 },
      'ot_ics': { 'No': 0, 'Limited': 5, 'Full': 8 },
      'siem': { 'Dedicated': 0, 'Shared': 3, 'None': 8 },
      'irp_tested': { 'Yes': 0, 'Plan exists': 5, 'No': 8 },
      'cmmi_level': { '0': 0, '1': 1, '2': 3, '3': 5, '4': 7, '5': 9 }
    };

    let totalScore = 0;
    Object.entries(responses).forEach(([question, answer]) => {
      const weights = scoringWeights[question];
      if (weights && weights[answer]) {
        totalScore += weights[answer];
      }
    });

    this.data.questionnaire.complexityScore = totalScore;
    this.data.questionnaire.podAssignment = this.assignPod(totalScore);
    this.data.questionnaire.score = totalScore;
  }

  assignPod(score) {
    if (score >= 40) return 'Large';
    if (score >= 25) return 'Medium';
    return 'Small';
  }

  getQuestionnaireData() {
    return this.data.questionnaire;
  }

  // NIST CSF mapping methods
  updateMappingData(mappingData) {
    this.data.mapping = { ...this.data.mapping, ...mappingData };
    return this.saveData();
  }

  getMappingData() {
    return this.data.mapping;
  }

  addControl(control) {
    if (!this.data.mapping.controls) {
      this.data.mapping.controls = [];
    }
    
    this.data.mapping.controls.push({
      id: Date.now().toString(),
      ...control,
      createdAt: new Date().toISOString()
    });
    
    return this.saveData();
  }

  updateControl(controlId, updates) {
    const index = this.data.mapping.controls.findIndex(c => c.id === controlId);
    if (index !== -1) {
      this.data.mapping.controls[index] = {
        ...this.data.mapping.controls[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return this.saveData();
    }
    return false;
  }

  deleteControl(controlId) {
    this.data.mapping.controls = this.data.mapping.controls.filter(c => c.id !== controlId);
    return this.saveData();
  }

  // Risk assessment methods
  addRiskFinding(finding) {
    if (!this.data.risk.findings) {
      this.data.risk.findings = [];
    }
    
    this.data.risk.findings.push({
      id: Date.now().toString(),
      ...finding,
      createdAt: new Date().toISOString(),
      status: 'open'
    });
    
    this.calculateOverallRiskScore();
    return this.saveData();
  }

  updateRiskFinding(findingId, updates) {
    const index = this.data.risk.findings.findIndex(f => f.id === findingId);
    if (index !== -1) {
      this.data.risk.findings[index] = {
        ...this.data.risk.findings[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      this.calculateOverallRiskScore();
      return this.saveData();
    }
    return false;
  }

  deleteRiskFinding(findingId) {
    this.data.risk.findings = this.data.risk.findings.filter(f => f.id !== findingId);
    this.calculateOverallRiskScore();
    return this.saveData();
  }

  calculateOverallRiskScore() {
    const findings = this.data.risk.findings || [];
    if (findings.length === 0) {
      this.data.risk.overallScore = 0;
      return;
    }

    const totalScore = findings.reduce((sum, finding) => {
      return sum + (finding.score || 0);
    }, 0);

    this.data.risk.overallScore = Math.round(totalScore / findings.length);
  }

  getRiskData() {
    return this.data.risk;
  }

  // POA&M methods
  addPoamItem(item) {
    if (!this.data.risk.poam) {
      this.data.risk.poam = [];
    }
    
    this.data.risk.poam.push({
      id: Date.now().toString(),
      ...item,
      createdAt: new Date().toISOString(),
      status: 'open'
    });
    
    return this.saveData();
  }

  updatePoamItem(itemId, updates) {
    const index = this.data.risk.poam.findIndex(p => p.id === itemId);
    if (index !== -1) {
      this.data.risk.poam[index] = {
        ...this.data.risk.poam[index],
        ...updates,
        updatedAt: new Date().toISOString()
      };
      return this.saveData();
    }
    return false;
  }

  deletePoamItem(itemId) {
    this.data.risk.poam = this.data.risk.poam.filter(p => p.id !== itemId);
    return this.saveData();
  }

  getPoamData() {
    return this.data.risk.poam || [];
  }

  // Assessment methods
  updateAssessmentStatus(status) {
    this.data.assessment.status = status;
    if (status === 'in_progress' && !this.data.assessment.startDate) {
      this.data.assessment.startDate = new Date().toISOString();
    }
    if (status === 'completed') {
      this.data.assessment.endDate = new Date().toISOString();
    }
    return this.saveData();
  }

  addAssessmentNote(note) {
    if (!this.data.assessment.notes) {
      this.data.assessment.notes = [];
    }
    
    this.data.assessment.notes.push({
      id: Date.now().toString(),
      content: note,
      timestamp: new Date().toISOString(),
      author: 'System'
    });
    
    return this.saveData();
  }

  getAssessmentData() {
    return this.data.assessment;
  }

  // Data export methods
  setupDataExport() {
    // Export to JSON
    this.exportToJson = () => {
      const dataStr = JSON.stringify(this.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `cyber-assess-${this.data.agency.name || 'assessment'}-${new Date().toISOString().split('T')[0]}.json`;
      link.click();
      
      URL.revokeObjectURL(url);
    };

    // Export to CSV
    this.exportToCsv = () => {
      const csv = this.convertToCsv();
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = `cyber-assess-${this.data.agency.name || 'assessment'}-${new Date().toISOString().split('T')[0]}.csv`;
      link.click();
      
      URL.revokeObjectURL(url);
    };
  }

  convertToCsv() {
    const findings = this.data.risk.findings || [];
    const headers = ['ID', 'Finding', 'Function', 'Likelihood', 'Impact', 'Score', 'Priority', 'Status'];
    const rows = findings.map(f => [
      f.id,
      f.finding,
      f.function,
      f.likelihood,
      f.impact,
      f.score,
      f.priority,
      f.status
    ]);
    
    return [headers, ...rows].map(row => row.join(',')).join('\n');
  }

  // Data import methods
  importData(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      
      reader.onload = (e) => {
        try {
          const importedData = JSON.parse(e.target.result);
          const validation = this.validateImportedData(importedData);
          
          if (validation.valid) {
            this.data = { ...this.data, ...importedData };
            this.saveData();
            resolve(true);
          } else {
            reject(new Error(validation.errors.join(', ')));
          }
        } catch (error) {
          reject(new Error('Invalid file format'));
        }
      };
      
      reader.onerror = () => reject(new Error('Error reading file'));
      reader.readAsText(file);
    });
  }

  validateImportedData(data) {
    const errors = [];
    
    if (!data.agency) errors.push('Missing agency data');
    if (!data.questionnaire) errors.push('Missing questionnaire data');
    if (!data.risk) errors.push('Missing risk data');
    
    return {
      valid: errors.length === 0,
      errors: errors
    };
  }

  // Data cleanup
  clearData() {
    if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
      this.data = this.getDefaultData();
      this.saveData();
      return true;
    }
    return false;
  }

  // Get summary statistics
  getDataSummary() {
    return {
      agencyName: this.data.agency.name || 'Not specified',
      questionnaireScore: this.data.questionnaire.score || 0,
      podAssignment: this.data.questionnaire.podAssignment || 'Not assigned',
      totalFindings: (this.data.risk.findings || []).length,
      openFindings: (this.data.risk.findings || []).filter(f => f.status === 'open').length,
      totalPoamItems: (this.data.risk.poam || []).length,
      assessmentStatus: this.data.assessment.status,
      lastModified: this.data.metadata.lastModified
    };
  }
}
