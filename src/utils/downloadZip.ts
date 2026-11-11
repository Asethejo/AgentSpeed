/**
 * Utility to download the complete AgentSpend codebase as a ZIP archive.
 */
export async function downloadAgentSpendZip(onProgress?: (status: string) => void) {
  try {
    if (onProgress) onProgress('Fetching agentspend.zip...');

    // Attempt direct download from /agentspend.zip
    const response = await fetch('/agentspend.zip');
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: Failed to fetch prebuilt zip`);
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'agentspend.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    window.URL.revokeObjectURL(url);

    if (onProgress) onProgress('Download initiated!');
    return true;
  } catch (err) {
    console.warn('Direct fetch failed, falling back to window location or direct anchor:', err);
    // Direct link fallback
    const link = document.createElement('a');
    link.href = '/agentspend.zip';
    link.setAttribute('download', 'agentspend.zip');
    link.target = '_blank';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    return true;
  }
}
