/**
 * NyayaAI API Client
 * Connects directly to the FastAPI backend (http://localhost:8000/api/v1)
 * with automatic fallback to local client mocks for seamless offline demonstration.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api/v1';

export async function fetchHealth() {
  try {
    const res = await fetch(`${API_BASE_URL}/health`);
    if (!res.ok) throw new Error('Health check failed');
    return await res.json();
  } catch (err) {
    return { status: 'fallback', message: 'Using local in-memory dataset' };
  }
}

export async function fetchDocuments() {
  try {
    const res = await fetch(`${API_BASE_URL}/documents`);
    if (!res.ok) throw new Error('Failed to fetch documents');
    return await res.json();
  } catch (err) {
    console.warn('Backend offline, using fallback data:', err.message);
    return null;
  }
}

export async function fetchDocumentById(docId) {
  try {
    const res = await fetch(`${API_BASE_URL}/documents/${docId}`);
    if (!res.ok) throw new Error('Document not found');
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function analyzeDocument(docData) {
  try {
    const res = await fetch(`${API_BASE_URL}/documents/analyze`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(docData)
    });
    if (!res.ok) throw new Error('Analysis failed');
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function sendChatQuery(query, documentId) {
  try {
    const res = await fetch(`${API_BASE_URL}/chat/query`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, documentId })
    });
    if (!res.ok) throw new Error('Chat failed');
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function fetchBareActs(category) {
  try {
    const url = category ? `${API_BASE_URL}/citations/acts?category=${encodeURIComponent(category)}` : `${API_BASE_URL}/citations/acts`;
    const res = await fetch(url);
    if (!res.ok) throw new Error('Failed to fetch acts');
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function fetchLandmarkCases() {
  try {
    const res = await fetch(`${API_BASE_URL}/citations/cases`);
    if (!res.ok) throw new Error('Failed to fetch cases');
    return await res.json();
  } catch (err) {
    return null;
  }
}

export async function fetchExportMemo(docId) {
  try {
    const res = await fetch(`${API_BASE_URL}/export/memo/${docId}`);
    if (!res.ok) throw new Error('Failed to export memo');
    return await res.json();
  } catch (err) {
    return null;
  }
}
