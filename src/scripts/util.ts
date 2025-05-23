/**
 * Check if WebGPU is available and quit/show error if not
 */
export function quitIfWebGPUNotAvailable(
  adapter: GPUAdapter | null,
  device: GPUDevice | null
): void {
  if (!navigator.gpu) {
    document.body.innerHTML = `
      <div style="color: red; font-weight: bold; text-align: center; padding: 2rem;">
        WebGPU is not supported in your browser.<br>
        Try using Chrome or Edge 113+.
      </div>
    `;
    throw new Error('WebGPU not supported');
  }

  if (!adapter || !device) {
    document.body.innerHTML = `
      <div style="color: red; font-weight: bold; text-align: center; padding: 2rem;">
        Failed to initialize WebGPU adapter or device.<br>
        Try using Chrome or Edge 113+ with WebGPU enabled.
      </div>
    `;
    throw new Error('WebGPU adapter or device initialization failed');
  }
} 